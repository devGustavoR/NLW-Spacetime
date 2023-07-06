import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAT: 'asc',
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverURL: memory.converURL,
        excerpt: memory.content.substring(0, 120).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request) => {
    // const {id} = request.params

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })
    return memory
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverURL: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, isPublic, coverURL } = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        isPublic,
        coverURL,
        userID: 'af3dbb67-abe7-4277-90d8-90f0f58f7670',
      },
    })

    return memory
  })

  app.put('/memories', async () => {})

  app.delete('/memories', async () => {})
}
