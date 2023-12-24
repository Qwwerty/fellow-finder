import { OrganizationRepository } from '@/repositories/organization-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateOrganizationUseCaseRequest {
  name: string
  email: string
  cep: string
  address: string
  phone: string
  password: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationRepository) {}

  async execute({
    name,
    email,
    cep,
    address,
    phone,
    password,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      name,
      email,
      cep,
      address,
      phone,
      password_hash,
    })

    return { organization }
  }
}
