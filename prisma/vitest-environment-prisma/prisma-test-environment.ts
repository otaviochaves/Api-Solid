import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('setup')

    return {
      teardown() {
        console.log('Tearing down')
      },
    }
  },
  transformMode: 'ssr',
}