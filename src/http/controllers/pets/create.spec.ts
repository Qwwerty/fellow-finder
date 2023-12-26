import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/use-cases/utils/test/create-and-authenticate-organization'
import { describe, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Alfredo',
        about: 'about test',
        age: 'OLD',
        size: 'MEDIUM',
        energy: 'HIGH',
        independence: 'LOW',
        space: 'MEDIUM',
      })
      .expect(201)
  })
})
