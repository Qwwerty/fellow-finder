import { app } from '@/app'
import request from 'supertest'
import { describe, beforeAll, afterAll, it } from 'vitest'

describe('Create Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a Organization', async () => {
    await request(app.server)
      .post('/organizations')
      .send({
        name: 'Seu Cãopanheiro',
        email: 'rhalfsouza@hotmail.com',
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
  })
})
