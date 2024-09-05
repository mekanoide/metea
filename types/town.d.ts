export type Province = {
  nombre: string
  id: string
}

export type Town = {
  nombre: string
  num_hab: number
  latitud: string
  longitud: string
  altitud: number
  province: Province
}
