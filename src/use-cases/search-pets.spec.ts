import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)

    petsRepository.organizations.push({
      id: 'fake_organization_id',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '00000000',
      uf: 'MG',
      city: 'Ubá',
      street: 'street test',
      district: 'district test',
      number: 9999,
      additional_address: '',
      phone: '00000000000',
      password_hash: '123456',
      created_at: new Date(),
    })

    petsRepository.items.push({
      id: 'fake_pet_id',
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
  })

  it('should be able to search for pets by city', async () => {
    const { pets } = await sut.execute({
      uf: 'MG',
      city: 'Ubá',
    })

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Alfredo',
        is_adopted: false,
      }),
    ])
  })

  it('should be able to search pets by age', async () => {
    const { pets } = await sut.execute({
      uf: 'MG',
      city: 'Ubá',
    })

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Alfredo',
        age: 'OLD',
      }),
    ])
  })

  it('should be able to search pets by size', async () => {
    const { pets } = await sut.execute({
      uf: 'MG',
      city: 'Ubá',
    })

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Alfredo',
        size: 'MEDIUM',
      }),
    ])
  })

  it('should be able to search pets by energy', async () => {
    const { pets } = await sut.execute({
      uf: 'MG',
      city: 'Ubá',
    })

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Alfredo',
        energy: 'HIGH',
      }),
    ])
  })

  it('should be able to search pets by space', async () => {
    const { pets } = await sut.execute({
      uf: 'MG',
      city: 'Ubá',
    })

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Alfredo',
        space: 'MEDIUM',
      }),
    ])
  })

  it('should be able to search pets by independence', async () => {
    const { pets } = await sut.execute({
      uf: 'MG',
      city: 'Ubá',
    })

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Alfredo',
        independence: 'LOW',
      }),
    ])
  })
})
