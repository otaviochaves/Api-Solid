import { CreateGymUseCase } from '../create-gym'
import { PrimasGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrimasGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
