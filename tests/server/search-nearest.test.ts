import { describe, it, expect } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

describe('/api/search/nearest', async () => {
  await setup({})

  it('devuelve un ID de municipio para coordenadas válidas', async () => {
    // Coordenadas aproximadas de Madrid
    const result = await $fetch('/api/search/nearest?lat=40.4168&lng=-3.7038')
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
    // El ID no debe contener el prefijo "id"
    expect(result).not.toContain('id')
  })

  it('devuelve Madrid para coordenadas del centro de Madrid', async () => {
    const result = await $fetch('/api/search/nearest?lat=40.4168&lng=-3.7038')
    // El ID de Madrid es 28079
    expect(result).toBe('28079')
  })

  it('devuelve error 400 para coordenadas inválidas', async () => {
    try {
      await $fetch('/api/search/nearest?lat=invalid&lng=invalid')
      expect.unreachable('Debería haber lanzado un error')
    } catch (error: any) {
      expect(error.statusCode).toBe(400)
    }
  })

  it('devuelve error 400 cuando faltan coordenadas', async () => {
    try {
      await $fetch('/api/search/nearest')
      expect.unreachable('Debería haber lanzado un error')
    } catch (error: any) {
      expect(error.statusCode).toBe(400)
    }
  })
})
