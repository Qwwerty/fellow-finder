import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/InvalidCredentialsError'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '00000000',
      uf: 'MG',
      city: 'city test',
      street: 'street test',
      district: 'district test',
      number: 9999,
      phone: '00000000000',
      password_hash: await hash('123456', 6),
    })

    const { organization } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '00000000',
      uf: 'MG',
      city: 'city test',
      street: 'street test',
      district: 'district test',
      number: 9999,
      phone: '00000000000',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
