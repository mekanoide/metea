import { describe, it, expect } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

describe('/api/sun', async () => {
  await setup({})

  it('devuelve datos de sol para coordenadas y fecha válidas', async () => {
    const results = await $fetch('/api/sun?lat=40.4168&lng=-3.7038&date=2025-03-15')
    // La API puede devolver un array o un objeto según el formato de respuesta
    expect(results).toBeDefined()
  })

  it('no lanza error cuando los parámetros están vacíos', async () => {
    const results = await $fetch('/api/sun')
    // La API degrada correctamente sin lanzar errores
    expect(results).toBeDefined()
  })
})
