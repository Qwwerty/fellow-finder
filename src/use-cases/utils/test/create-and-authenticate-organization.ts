import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  const organization = await prisma.organization.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '00000000',
      uf: 'MG',
      city: 'city test',
      street: 'street test',
      district: 'district test',
      number: 9999,
      additional_address: 'additional address test',
      phone: '00000000000',
      password_hash: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'johndoe@example.com',
      password: '123456',
    })
    .expect(200)

  const { token } = authResponse.body

  return { token, organizationId: organization.id }
}
