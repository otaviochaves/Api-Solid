import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'
import { PrimasGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyUseCase() {
  const gymsRepository = new PrimasGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}
