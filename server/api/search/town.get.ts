import towns from '@/server/data/towns.json' // Asumiendo que tienes un archivo JSON con los municipios
import provinces from '@/server/data/provinces.json'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const searchTerm = (query.search as string) || ''

  type Town = {
    latitud: string
    id_old?: string
    url: string
    latitud_dec: string
    altitud: string
    capital: string
    num_hab: string
    zona_comarcal: string
    destacada: string
    nombre: string
    longitud_dec: string
    id: string
    longitud: string
    province?: string
  }

  function normalizeText(txt: string) {
    return txt.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Elimina acentos
  }

  // Filter towns based on search term
  const results: Town[] = towns.filter((town) =>
    normalizeText(town.nombre.toLowerCase()).startsWith(
      normalizeText(searchTerm.toLowerCase())
    )
  )

  // Add province name to each town
  results.forEach((town) => {
    const province = provinces.find((prov) =>
      prov.id.toLowerCase().includes(town.id.substring(2, 4))
    )
    town.province = province?.nombre
  })

  const sortedResults = results.sort((a, b) => {
    const aPop: number = parseInt(a.num_hab)
    const bPop: number = parseInt(b.num_hab)
    if (aPop < bPop) return 1
    if (aPop > bPop) return -1
    return 0
  })
  console.log('results', results)
  return sortedResults
})
