import towns from '@@/server/data/towns.json' // Asumiendo que tienes un archivo JSON con los municipios

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const longitude = query.lng as number
  const latitude = query.lat as number

  type Town = {
    latitud: string
    id_old?: string
    url: string
    latitud_dec: number
    altitud: string
    capital: string
    num_hab: string
    zona_comarcal: string
    destacada: string
    nombre: string
    longitud_dec: number
    id: string
    longitud: string
    province?: string
  }

  function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const dLat = lat2 - lat1
    const dLon = lon2 - lon1
    return Math.sqrt(dLat * dLat + dLon * dLon)
  }

  // Función para encontrar el municipio más cercano
  async function findNearestTown(towns: Town[]): Promise<string | null> {
    try {
      let nearestTown: Town | null = null
      let shortestDistance = Infinity

      towns.forEach((town: Town) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          town.latitud_dec,
          town.longitud_dec
        )
        if (distance < shortestDistance) {
          shortestDistance = distance
          nearestTown = town
        }
      })

      if (!nearestTown) {
        return null
      }
      const {id} = nearestTown
      return id
    } catch (error) {
      console.error(error)
    }
  }

  const nearestTownId = await findNearestTown(towns)

  const formatedNearestTownId = nearestTownId?.replace('id', '')

  return formatedNearestTownId
})
