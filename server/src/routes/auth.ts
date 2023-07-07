import { FastifyInstance } from 'fastify'

export async function authRoutes(app: FastifyInstance) {
  // app.post('./register', async (request) => {
  //   const bodySchema = z.object({
  //     code: z.string(),
  //   })
  //   const { code } = bodySchema.parse(request.body)
  //   const accessTokenResponde = await axios.post(
  //     'https://github.com/login/oauth/access_token',
  //     null,
  //     {
  //       params: {
  //         code,
  //         client_id: process.env.GITHUB_CLIENT_ID,
  //         client_secret: process.env.GITHUB_CLIENT_SECRET,
  //       },
  //       headers: {
  //         Accept: 'application/json',
  //       },
  //     },
  //   )
  //   // const { access_token } = accessTokenResponde.data
  //   // return {
  //   //   access_token,
  //   // }
  // })
}
