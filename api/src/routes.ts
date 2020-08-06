import express from 'express'
import ClassesController from './controllers/ClassesControllers'

const routes = express.Router()
const classController = new ClassesController()

routes.post('/classes', classController.create)

export default routes
