import { FastifyInstance } from 'fastify'
import { get } from './get'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pet/:petId', get)
  app.get('/pets', search)

  /** Authenticated */
  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
