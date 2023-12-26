import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/use-cases/utils/test/create-and-authenticate-organization'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token, organizationId } =
      await createAndAuthenticateOrganization(app)

    const pet = await prisma.pet.create({
      data: {
        name: 'Alfredo',
        about: 'about test',
        age: 'OLD',
        size: 'MEDIUM',
        energy: 'HIGH',
        independence: 'LOW',
        space: 'MEDIUM',
        organization_id: organizationId,
      },
    })

    const petResponse = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(petResponse.body.pet).toEqual(
      expect.objectContaining({ id: expect.any(String) }),
    )
  })
})
