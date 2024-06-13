import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able search gym by title', async () => {
    const { token } = await createAndAuthenticateUser(app)
    
  await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Gym Description',
        phone: '1234567890',
        latitude: -21.9751256,
        longitude: -47.9526912,
      })


    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Gym Description',
        phone: '1234567890',
        latitude: -21.9751256,
        longitude: -47.9526912,
      })


    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'JavaScript'
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

     expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
    ])
  })
})
