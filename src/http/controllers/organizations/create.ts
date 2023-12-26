import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cep: z.string().min(8).max(8),
    uf: z.string().min(2).max(2),
    city: z.string(),
    street: z.string(),
    district: z.string(),
    number: z.number().nullable(),
    additionalAddress: z.string().nullable(),
    phone: z.string().min(11).max(11),
    password: z.string().min(6),
  })

  const {
    name,
    email,
    cep,
    uf,
    city,
    street,
    district,
    number,
    additionalAddress,
    phone,
    password,
  } = createOrganizationBodySchema.parse(request.body)

  const createOrganizationUseCase = makeCreateOrganizationUseCase()

  await createOrganizationUseCase.execute({
    name,
    email,
    cep,
    uf,
    city,
    street,
    district,
    number,
    additionalAddress,
    phone,
    password,
  })

  return reply.status(201).send()
}
