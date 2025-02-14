import { calculateScore } from '../lib/calculateScore'

describe('PR Calculator', () => {
  it('calculates high score for ideal candidate', () => {
    const result = calculateScore({
      age: 30,
      monthlyIncome: 8000,
      nationality: 'malaysia',
      yearsInSingapore: 5,
      maritalStatus: 'married',
      educationLevel: 'university',
      jobType: 'professional'
    })

    expect(result.score).toBeGreaterThanOrEqual(85)
    expect(result.category).toBe('Highly Likely')
  })

  it('calculates low score for less ideal candidate', () => {
    const result = calculateScore({
      age: 50,
      monthlyIncome: 2000,
      nationality: 'others',
      yearsInSingapore: 1,
      maritalStatus: 'single',
      educationLevel: 'other',
      jobType: 'other'
    })

    expect(result.score).toBeLessThan(50)
    expect(result.category).toBe('Unlikely')
  })
}) 