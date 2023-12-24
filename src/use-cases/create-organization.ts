import { OrganizationRepository } from '@/repositories/organization-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

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
    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

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
