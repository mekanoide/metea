import towns from '@/server/data/towns.json' // Asumiendo que tienes un archivo JSON con los municipios

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const searchTerm = query.search || ''

  // Filtrar municipios según el término de búsqueda
  const results = towns.filter((town) =>
    town.nombre.toLowerCase().includes(searchTerm)
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
