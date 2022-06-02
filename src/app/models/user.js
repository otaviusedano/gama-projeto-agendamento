import Sequelize, { Model } from "sequelize"

class User extends Model {
  static init(sequelize) {
    super.init({
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncremente: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    }, 
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    provider: {
      type: Sequelize.BOOLEAN,
    }},
    {
      sequelize,
    })
  }
}

export default User