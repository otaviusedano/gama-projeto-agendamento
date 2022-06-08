import { Op } from 'sequelize'
import { endOfDay, parseISO, startOfDay } from "date-fns"
import User from "../models/user"
import Appointment from "../models/appointment"

class ScheduleController {
  async index(req, res) {
    
    const checkUser = await User.findOne({
      where: {id: req.userId, provider: true}
    })

    if (!checkUser) {
      return res.status(400).json({
        error: "Este usuário não é um colaborador"
      })
    }

    const {date} = req.query
    const parseDate = parseISO(date)

    const appointments = await Appointment.findOne({
      where: {
        collaborator_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)]
        }
      },
      order: ['date']
    })

    return res.status(200).json({
      msg: appointments
    })
  }
}

export default new ScheduleController()