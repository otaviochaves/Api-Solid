import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { createCheckInsController } from './create.controller'
import { validateCheckInsController } from './validate.controller'
import { historyCheckInsController } from './history.controller'
import { metricsCheckInsController } from './metrics.controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', historyCheckInsController)
  app.get('/check-ins/metrics', metricsCheckInsController)

  app.post('/gyms/gymId/check-ins', createCheckInsController)
  app.patch('/check-ins/:checkInId', validateCheckInsController)
}
