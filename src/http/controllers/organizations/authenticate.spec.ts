import { app } from '@/app'
import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server)
      .post('/organizations')
      .send({
        name: 'Seu Cãopanheiro',
        email: 'johndoe@example.com',
        cep: '36504000',
        uf: 'MG',
        city: 'Ubá',
        street: 'Rua Adolfo Pereira Cortez',
        district: 'São Domingos',
        number: 1071,
        additionalAddress: 'casa A',
        phone: '32988009938',
        password: '123456',
      })
      .expect(201)

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'johndoe@example.com',
        password: '123456',
      })
      .expect(200)

    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'johndoee@example.com',
        password: '123456',
      })
      .expect(400)

    expect(response.body.message).toEqual('Invalid credentials.')
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'johndoe@example.com',
        password: '1234567',
      })
      .expect(400)

    expect(response.body.message).toEqual('Invalid credentials.')
  })
})
