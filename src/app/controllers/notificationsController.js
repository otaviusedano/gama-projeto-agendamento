import User from "../models/user"
import Notifications from "../schema/notifications"

class NotificationsController {
  async index(req, res) {
    const checkCollaborator = await User.findOne({
      where: { id: req.userId, provider: true }
    })

    if (!checkCollaborator) {
      return res.status(401).json({
        error: "Você não é um colaborador"
      })
    }

    const notifications = await Notifications.find({
      user: req.userId
    }).sort({createdAt: 'desc'}).limit(20)

    return res.status(200).json({
      msg: notifications
    })
  }

  async update(req, res) {

    const notifications = await Notifications.findByIdAndUpdate(
      req.params.id,
      { read: true },
      {upsert: true, new: true}, (err, data) => {
        if (err) return res.status(400).json({error : err})
      }
    ).clone()

    return res.status(200).json({
      msg: notifications
    })
  }
}

export default new NotificationsController()