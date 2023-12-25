import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetUseCase } from './get-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get pet', async () => {
    petsRepository.items.push({
      id: 'pet_fake_id',
      name: 'Alfredo',
      about: 'about test',
      age: 'OLD',
      size: 'MEDIUM',
      energy: 'HIGH',
      independence: 'LOW',
      space: 'MEDIUM',
      organization_id: 'fake_organization_id',
      is_adopted: false,
    })

    const { pet } = await sut.execute({ petId: 'pet_fake_id' })

    expect(pet.id).toEqual('pet_fake_id')
  })

  it('should not be able to get pet already adopted', async () => {
    petsRepository.items.push({
      id: 'pet_fake_id',
      name: 'Alfredo',
      about: 'about test',
      age: 'OLD',
      size: 'MEDIUM',
      energy: 'HIGH',
      independence: 'LOW',
      space: 'MEDIUM',
      organization_id: 'fake_organization_id',
      is_adopted: true,
    })

    await expect(() =>
      sut.execute({ petId: 'pet_fake_id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to get pet with wrong id', async () => {
    await expect(() =>
      sut.execute({ petId: 'pet_fake_id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
