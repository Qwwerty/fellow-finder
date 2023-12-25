import crypto from 'node:crypto'
import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? crypto.randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independence: data.independence,
      space: data.space,
      organization_id: data.organization_id,
      is_adopted: false,
    }

    this.items.push(pet)

    return pet
  }
}
