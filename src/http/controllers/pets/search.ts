import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    uf: z.string().min(2).max(2),
    city: z.string(),
    age: z.enum(['PUPPY', 'YOUNG', 'ADULT', 'OLD']).nullable().optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).nullable().optional(),
    energy: z.enum(['LOW', 'MEDIUM', 'HIGH']).nullable().optional(),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']).nullable().optional(),
    space: z.enum(['SMALL', 'MEDIUM', 'BIG']).nullable().optional(),
  })

  const { uf, city, age, size, energy, independence, space } =
    searchPetsQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  try {
    const { pets } = await searchPetsUseCase.execute({
      uf,
      city,
      age: age || null,
      size: size || null,
      energy: energy || null,
      independence: independence || null,
      space: space || null,
    })

    return reply.status(200).send({
      pets,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw new Error()
  }
}
