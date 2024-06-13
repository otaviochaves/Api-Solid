import { FastifyInstance } from 'fastify'
import { registerController } from './register.controller'
import { authenticateController } from './authenticate.controller'
import { profileController } from './profile.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refreshTokenController } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)
  app.patch('/token/refresh', refreshTokenController)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
