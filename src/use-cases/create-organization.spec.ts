import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'
import { compare } from 'bcryptjs'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create organization', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '00000000',
      address: 'address test',
      phone: '00000000000',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '00000000',
      address: 'address test',
      phone: '00000000000',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create organization with same email twice', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '00000000',
      address: 'address test',
      phone: '00000000000',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe 2',
        email: 'johndoe@example.com',
        cep: '00000000',
        address: 'address test',
        phone: '00000000000',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
