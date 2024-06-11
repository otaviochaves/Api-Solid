import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const Gym = this.items.find((item) => item.id === id)
    if (!Gym) {
      return null
    }
    return Gym
  }
}
