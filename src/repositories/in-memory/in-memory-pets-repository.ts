import crypto from 'node:crypto'
import { Organization, Pet, Prisma } from '@prisma/client'
import { PetsRepository, SearchManyProps } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  public organizations: Organization[] = []

  async searchMany(data: SearchManyProps) {
    const organizationsByCity = this.organizations.filter(
      (item) => item.uf === data.uf && item.city === data.city,
    )

    const petsByFilterCity = organizationsByCity
      .map((organization) => {
        return this.items.filter(
          (pet) => pet.organization_id === organization.id,
        )
      })
      .flat()

    const filteredPets = petsByFilterCity.filter((pet) => {
      const age = data.age ? pet.age === data.age : true
      const size = data.size ? pet.size === data.size : true
      const energy = data.energy ? pet.energy === data.energy : true
      const independence = data.independence
        ? pet.independence === data.independence
        : true
      const space = data.space ? pet.space === data.space : true

      return age && size && energy && independence && space
    })

    return filteredPets
  }

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
