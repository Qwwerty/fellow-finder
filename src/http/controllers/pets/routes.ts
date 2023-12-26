import { FastifyInstance } from 'fastify'
import { get } from './get'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', get)

  /** Authenticated */
  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
