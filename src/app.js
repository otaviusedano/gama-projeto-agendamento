import express from 'express'
import routes from './router'
import './database'
import path, {resolve} from 'path'


class app {
  constructor() {
    this.server = express()
    this.middlewaves()
    this.routes()
  }

  middlewaves(){
    this.server.use(express.json())
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads' )))
  }

  routes(){
    this.server.use(routes)
  }
}

export default new app().server