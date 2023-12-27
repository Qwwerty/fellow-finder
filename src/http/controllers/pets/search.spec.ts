import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/use-cases/utils/test/create-and-authenticate-organization'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a pet by city', async () => {
    const { organizationId } = await createAndAuthenticateOrganization(app)

    await prisma.pet.create({
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

    const petsResponse = await request(app.server)
      .get('/pets')
      .query({ uf: 'MG', city: 'city test' })
      .expect(200)

    expect(petsResponse.body.pets).toEqual([
      expect.objectContaining({ name: 'Alfredo' }),
    ])
  })
})
