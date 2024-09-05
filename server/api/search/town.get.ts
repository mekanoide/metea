import towns from '@/server/data/towns.json' // Asumiendo que tienes un archivo JSON con los municipios

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const searchTerm = query.search || ''

  function normalizeText(txt: string) {
    return txt.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Elimina acentos
  }
  // Filtrar municipios según el término de búsqueda
  const results = towns.filter((town) =>
    normalizeText(town.nombre.toLowerCase()).startsWith(normalizeText(searchTerm))
  )

  const sortedResults = results.sort((a, b) => {
    const aPop: number = parseInt(a.num_hab)
    const bPop: number = parseInt(b.num_hab)
    if (aPop < bPop) return 1
    if (aPop > bPop) return -1
    return 0
  })

  return sortedResults
})
