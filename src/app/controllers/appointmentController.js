import * as Yup from 'yup'
import { startOfHour, parseISO, isBefore, format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import Appointment from "../models/appointment";
import User from '../models/user';
import File from '../models/file';

import notifications from '../schema/notifications';

class AppointmentController {
  async index(req, res) {
    const {page = 1} = req.query

    const appointment = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null},
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page -1) * 20,
      include: [
        {
          model: User,
          as: 'collaborator',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'photo',
              attributes: ['id', 'path', 'url']
            }
          ]
        }
      ]
    })

    const appointmentIsValid = () => {
      return appointment.length 
        ? appointment 
        : 'Não há mais nenhum agendamento'
    }

    return res.json({
      msg: appointmentIsValid()
    })
  }

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

    const user = await User.findByPk(req.userId)
    const formatDate = format(
      startHour,
      "'dia' dd 'de' MMMM', às' H:mm'h' ",
      { locale: pt }
    )

    await notifications.create({
      content: `Novo Agendamento de ${user.name} para ${formatDate}`,
      user: collaborator_id
    })

    return res.json({
      msg: appointment
    })
  }
}

export default new AppointmentController()