import crypto from 'node:crypto'
import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  items: Organization[] = []

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: data.id ?? crypto.randomUUID(),
      name: data.name,
      email: data.email,
      cep: data.cep,
      uf: data.uf,
      city: data.city,
      street: data.street,
      district: data.district,
      number: data.number ?? null,
      additional_address: data.additional_address ?? null,
      phone: data.phone,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }
}
