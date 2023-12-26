import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(['PUPPY', 'YOUNG', 'ADULT', 'OLD']),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    energy: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    space: z.enum(['SMALL', 'MEDIUM', 'BIG']),
  })

  const { name, about, age, size, energy, independence, space } =
    createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name,
    about,
    age,
    size,
    energy,
    independence,
    space,
    organizationId: request.user.sub,
  })

  return reply.status(201).send()
}
