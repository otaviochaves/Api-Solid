import { SearchGymsUseCase } from '../search-gyms'
import { PrimasGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrimasGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
