import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
}
