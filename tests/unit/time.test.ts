import { describe, it, expect } from 'vitest'
import { turnTimeto24HourFormat, turnTimeToPercentage } from '../../shared/utils/time'

describe('turnTimeto24HourFormat', () => {
  it('convierte hora AM correctamente', () => {
    expect(turnTimeto24HourFormat('8:30:00 AM')).toBe('8:30')
  })

  it('convierte hora PM correctamente', () => {
    expect(turnTimeto24HourFormat('3:45:00 PM')).toBe('15:45')
  })

  it('convierte medianoche (12:00 AM) correctamente', () => {
    expect(turnTimeto24HourFormat('12:00:00 AM')).toBe('12:00')
  })

  it('convierte mediodía (12:00 PM) correctamente', () => {
    expect(turnTimeto24HourFormat('12:00:00 PM')).toBe('24:00')
  })

  it('convierte inicio del día correctamente', () => {
    expect(turnTimeto24HourFormat('1:00:00 AM')).toBe('1:00')
  })

  it('convierte final del día correctamente', () => {
    expect(turnTimeto24HourFormat('11:59:00 PM')).toBe('23:59')
  })
})

describe('turnTimeToPercentage', () => {
  it('devuelve 0 para medianoche (0:00)', () => {
    expect(turnTimeToPercentage('0:00')).toBe(0)
  })

  it('devuelve 50 para mediodía (12:00)', () => {
    expect(turnTimeToPercentage('12:00')).toBe(50)
  })

  it('devuelve ~25 para las 6:00', () => {
    expect(turnTimeToPercentage('6:00')).toBe(25)
  })

  it('devuelve ~75 para las 18:00', () => {
    expect(turnTimeToPercentage('18:00')).toBe(75)
  })

  it('calcula correctamente un valor intermedio', () => {
    // 8:30 = 510 minutos / 1440 * 100 = 35.416...
    const result = turnTimeToPercentage('8:30')
    expect(result).toBeCloseTo(35.42, 1)
  })
})
