import { calculateScore } from '../lib/calculateScore'

describe('PR Calculator', () => {
  it('calculates high score for ideal candidate', () => {
    const result = calculateScore({
      age: 30,
      monthlyIncome: 15000,
      nationality: 'malaysia',
      yearsInSingapore: 5,
      maritalStatus: 'sg_spouse',
      educationLevel: 'masters',
      industry: 'tech',
      workPassType: 'ep',
      communityInvolvement: 'active',
      childrenInLocalSchool: true,
    })

    // Max possible: 15+20+12+10+10+5+15+5+5+5 = 102
    expect(result.score).toBeGreaterThanOrEqual(80)
    expect(result.category).toBe('Highly Likely')
  })

  it('calculates low score for less ideal candidate', () => {
    const result = calculateScore({
      age: 55,
      monthlyIncome: 2000,
      nationality: 'others',
      yearsInSingapore: 0,
      maritalStatus: 'none',
      educationLevel: 'other',
      industry: 'other',
      workPassType: 'other',
      communityInvolvement: 'none',
      childrenInLocalSchool: false,
    })

    // 2+0+0+3+0+2+0+1+0+0 = 8
    expect(result.score).toBeLessThan(30)
    expect(result.category).toBe('Unlikely')
  })

  it('calculates moderate score for average candidate', () => {
    const result = calculateScore({
      age: 32,
      monthlyIncome: 6000,
      nationality: 'india',
      yearsInSingapore: 2,
      maritalStatus: 'none',
      educationLevel: 'bachelors',
      industry: 'finance',
      workPassType: 'ep',
      communityInvolvement: 'none',
      childrenInLocalSchool: false,
    })

    // 12+12+10+10+5+4+0+5+0+0 = 58
    expect(result.score).toBeGreaterThanOrEqual(45)
    expect(result.score).toBeLessThan(80)
    expect(['Moderate Chance', 'Likely']).toContain(result.category)
  })

  it('scores age brackets correctly', () => {
    const baseInput = {
      monthlyIncome: 6000,
      nationality: 'others',
      yearsInSingapore: 3,
      maritalStatus: 'none' as const,
      educationLevel: 'bachelors',
      industry: 'other',
      workPassType: 'ep',
      communityInvolvement: 'none',
      childrenInLocalSchool: false,
    }

    const young = calculateScore({ ...baseInput, age: 25 })
    const mid = calculateScore({ ...baseInput, age: 35 })
    const older = calculateScore({ ...baseInput, age: 48 })

    expect(young.score).toBeGreaterThan(mid.score)
    expect(mid.score).toBeGreaterThan(older.score)
  })

  it('scores income brackets correctly', () => {
    const baseInput = {
      age: 30,
      nationality: 'others',
      yearsInSingapore: 3,
      maritalStatus: 'none' as const,
      educationLevel: 'bachelors',
      industry: 'other',
      workPassType: 'ep',
      communityInvolvement: 'none',
      childrenInLocalSchool: false,
    }

    const high = calculateScore({ ...baseInput, monthlyIncome: 15000 })
    const mid = calculateScore({ ...baseInput, monthlyIncome: 7000 })
    const low = calculateScore({ ...baseInput, monthlyIncome: 2000 })

    expect(high.score).toBeGreaterThan(mid.score)
    expect(mid.score).toBeGreaterThan(low.score)
  })

  it('gives bonus for children in local schools', () => {
    const baseInput = {
      age: 35,
      monthlyIncome: 8000,
      nationality: 'china',
      yearsInSingapore: 3,
      maritalStatus: 'sg_spouse' as const,
      educationLevel: 'masters',
      industry: 'tech',
      workPassType: 'ep',
      communityInvolvement: 'some',
    }

    const withSchool = calculateScore({ ...baseInput, childrenInLocalSchool: true })
    const withoutSchool = calculateScore({ ...baseInput, childrenInLocalSchool: false })

    expect(withSchool.score).toBe(withoutSchool.score + 5)
  })

  it('returns details for each scoring category', () => {
    const result = calculateScore({
      age: 30,
      monthlyIncome: 8000,
      nationality: 'malaysia',
      yearsInSingapore: 3,
      maritalStatus: 'none',
      educationLevel: 'bachelors',
      industry: 'tech',
      workPassType: 'ep',
      communityInvolvement: 'active',
      childrenInLocalSchool: false,
    })

    // Should have details for all 9 scoring categories (no children bonus)
    expect(result.details.length).toBe(9)
  })
})
