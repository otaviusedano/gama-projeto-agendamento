import express from 'express'
import routes from './router'
import './database'

class app {
  constructor() {
    this.server = express()
    this.middlewaves()
    this.routes()
  }

  middlewaves(){
    this.server.use(express.json())
  }

  routes(){
    this.server.use(routes)
  }
}

export default new app().server