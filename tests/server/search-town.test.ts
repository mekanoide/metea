import { describe, it, expect } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

describe('/api/search/town', async () => {
  await setup({})

  it('devuelve resultados para un término de búsqueda válido', async () => {
    const results = await $fetch('/api/search/town?search=Madrid')
    expect(Array.isArray(results)).toBe(true)
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].nombre).toContain('Madrid')
  })

  it('prioriza resultados que empiezan con el término sobre los que lo contienen', async () => {
    const results = await $fetch('/api/search/town?search=Barce')
    const barcelonaIndex = results.findIndex((t: any) => t.nombre === 'Barcelona')
    // Barcelona debe estar entre los primeros resultados
    expect(barcelonaIndex).toBeGreaterThanOrEqual(0)
    expect(barcelonaIndex).toBeLessThan(5)
  })

  it('búsqueda insensible a acentos', async () => {
    const results = await $fetch('/api/search/town?search=malaga')
    const hasMalaga = results.some((t: any) =>
      t.nombre.toLowerCase().includes('málaga') || t.nombre.toLowerCase().includes('malaga')
    )
    expect(hasMalaga).toBe(true)
  })

  it('ordena resultados por población (mayor primero)', async () => {
    const results = await $fetch('/api/search/town?search=Madrid')
    if (results.length >= 2) {
      const pop1 = parseInt(results[0].num_hab)
      const pop2 = parseInt(results[1].num_hab)
      expect(pop1).toBeGreaterThanOrEqual(pop2)
    }
  })

  it('incluye nombre de provincia en los resultados', async () => {
    const results = await $fetch('/api/search/town?search=Madrid')
    expect(results[0].province).toBeDefined()
    expect(typeof results[0].province).toBe('string')
  })

  it('devuelve array vacío para un término sin coincidencias', async () => {
    const results = await $fetch('/api/search/town?search=xyznonexistent')
    expect(Array.isArray(results)).toBe(true)
    expect(results.length).toBe(0)
  })
})
