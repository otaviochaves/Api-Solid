import supertest from 'supertest' // Importa o supertest corretamente
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    await supertest(app.server).post('/users').send({
      name: 'Otávio',
      email: 'otaviochaves@gmail.com',
      password: '123456',
    })

    const authResponse = await supertest(app.server).post('/sessions').send({
      email: 'otaviochaves@gmail.com',
      password: '123456',
    })

    const cookies = authResponse.headers['set-cookie']

    const response = await supertest(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })

    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([expect.stringContaining('refreshToken=')]),
    )
  })
})
