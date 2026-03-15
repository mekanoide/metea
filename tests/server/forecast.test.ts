import { describe, it, expect } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

describe('/api/forecast/town/[id]', async () => {
  await setup({})

  it('devuelve error 404 para un municipio inexistente', async () => {
    try {
      await $fetch('/api/forecast/town/99999')
      expect.unreachable('Debería haber lanzado un error')
    } catch (error: any) {
      expect(error.statusCode).toBe(404)
    }
  })

  it('devuelve error 400 o 404 para un ID vacío', async () => {
    try {
      await $fetch('/api/forecast/town/')
      expect.unreachable('Debería haber lanzado un error')
    } catch (error: any) {
      expect([400, 404]).toContain(error.statusCode)
    }
  })

  it('incluye datos del municipio en la respuesta para un ID válido', async () => {
    // ID de Madrid: 28079 - este test requiere que la API de AEMET esté disponible
    try {
      const result = await $fetch('/api/forecast/town/28079')
      expect(result).toBeDefined()
      expect(result.town).toBeDefined()
      expect(result.town.nombre).toBe('Madrid')
      expect(result.province).toBeDefined()
    } catch (error: any) {
      // Si la API de AEMET no está disponible, aceptamos errores de conexión
      expect([408, 503]).toContain(error.statusCode)
    }
  })
})
