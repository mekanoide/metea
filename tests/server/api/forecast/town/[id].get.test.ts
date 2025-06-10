import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createEvent } from 'h3'
import { useStorage } from '#imports'

// Mock de las dependencias
vi.mock('#imports', () => ({
  useStorage: vi.fn(() => ({
    getItem: vi.fn(),
    setItem: vi.fn()
  })),
  useRuntimeConfig: vi.fn(() => ({
    API_URL: 'http://test-api',
    API_KEY: 'test-key'
  }))
}))

// Mock de $fetch
vi.mock('ofetch', () => ({
  $fetch: vi.fn()
}))

describe('GET /api/forecast/town/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería manejar correctamente cuando la API devuelve datos válidos', async () => {
    const mockForecastData = {
      prediccion: {
        dia: [
          {
            fecha: '2024-03-20',
            temperatura: { maxima: 20, minima: 10 }
          }
        ]
      }
    }

    const mockSunriseData = {
      results: [
        {
          date: '2024-03-20',
          sunrise: '07:00',
          sunset: '19:00'
        }
      ]
    }

    // Mock de las respuestas de la API
    vi.mocked($fetch).mockResolvedValueOnce({ datos: 'http://test-url' })
    vi.mocked($fetch).mockResolvedValueOnce(JSON.stringify([mockForecastData]))
    vi.mocked($fetch).mockResolvedValueOnce(mockSunriseData)

    const event = createEvent({
      context: {
        params: { id: '28079' }
      }
    })

    const response = await defineEventHandler(event)
    expect(response).toBeDefined()
    expect(response.prediccion.dia[0].sunInfo).toBeDefined()
  })

  it('debería manejar correctamente cuando la API devuelve un error', async () => {
    // Mock de error en la API
    vi.mocked($fetch).mockRejectedValueOnce(new Error('API Error'))

    const event = createEvent({
      context: {
        params: { id: '28079' }
      }
    })

    await expect(defineEventHandler(event)).rejects.toThrow()
  })

  it('debería manejar correctamente cuando la API devuelve datos con formato incorrecto', async () => {
    // Mock de datos con formato incorrecto
    vi.mocked($fetch).mockResolvedValueOnce({ datos: 'http://test-url' })
    vi.mocked($fetch).mockResolvedValueOnce('invalid json')

    const event = createEvent({
      context: {
        params: { id: '28079' }
      }
    })

    await expect(defineEventHandler(event)).rejects.toThrow()
  })
}) 