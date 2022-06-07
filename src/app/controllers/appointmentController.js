import * as Yup from 'yup'
import { startOfHour, parseISO, isBefore } from 'date-fns'
import Appointment from "../models/appointment";
import User from '../models/user';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      collaborator_id: Yup.number().required(),
      date: Yup.date().required()
    }) 

    if (!schema.isValidSync(req.body)) {
      return res.status(401).json({
        error: 'Schema inválido'
      })
    }

    const {collaborator_id, date } = req.body

    const isCollaborator = await User.findOne({
      where: {id: collaborator_id, provider: true}
    })

    if (!isCollaborator) {
      return res.status(401).json({
        error: 'Colaborador não encontrado'
      })
    }

    const startHour = startOfHour(parseISO(date))
    const nowHour = new Date()

    if (isBefore(startHour, nowHour)) {
      return res.status(400).json({
        error: 'Horário não disponível'
      })
    }

    const checkViability = await Appointment.findOne({
      where: {
        collaborator_id,
        canceled_at: null,
        date: startHour
      }
    })

    if (checkViability) {
      return res.status(400).json({
        error: 'Horário já agendado, pelo colaborador'
      })
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      collaborator_id,
      date: startHour
    })

    return res.json({
      msg: appointment
    })
  }
}

export default new AppointmentController()