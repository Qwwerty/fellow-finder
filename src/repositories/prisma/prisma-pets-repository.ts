import { Prisma } from '@prisma/client'
import { PetsRepository, SearchManyProps } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async searchMany({ uf, city, ...queries }: SearchManyProps) {
    const arrayDataEntries = Object.entries(queries).filter(
      ([_, value]) => value,
    )
    const queryPets = Object.fromEntries(arrayDataEntries)

    delete queryPets.uf
    delete queryPets.city

    const organizationsByCity = await prisma.pet.findMany({
      where: {
        ...queryPets,
        organization: {
          uf,
          city,
        },
      },
    })

    return organizationsByCity
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
