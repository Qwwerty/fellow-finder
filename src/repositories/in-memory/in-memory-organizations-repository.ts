import crypto from 'node:crypto'
import { Organization, Prisma } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'

export class InMemoryOrganizationsRepository implements OrganizationRepository {
  items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: data.id ?? crypto.randomUUID(),
      name: data.name,
      email: data.email,
      cep: data.cep,
      address: data.address,
      phone: data.phone,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }
}
