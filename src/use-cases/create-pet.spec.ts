import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create pet', async () => {
    const { pet } = await sut.execute({
      name: 'Alfredo',
      about: 'about test',
      age: 'OLD',
      size: 'MEDIUM',
      energy: 'HIGH',
      independence: 'LOW',
      space: 'MEDIUM',
      organizationId: 'fake_organization_id',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
