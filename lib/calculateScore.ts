import { type ScoreResult } from './types'

type ScoreInput = {
  age: number
  monthlyIncome: number
  nationality: string
  yearsInSingapore: number
  maritalStatus: 'sg_spouse' | 'sg_child' | 'sg_parent' | 'none'
  educationLevel: string
  jobType: string
}

export function calculateScore(input: ScoreInput): ScoreResult {
  let score = 0
  const details: string[] = []

  // Age scoring (0-20 points)
  if (input.age >= 25 && input.age <= 35) {
    score += 20
    details.push("Age between 25-35: +20 points")
  } else if (input.age > 35 && input.age <= 50) {
    score += 10
    details.push("Age between 36-50: +10 points")
  } else {
    score += 5
    details.push("Age below 25 or above 50: +5 points")
  }

  // Income scoring (0-25 points)
  if (input.monthlyIncome >= 8000) {
    score += 25
    details.push("Income ≥$8,000: +25 points")
  } else if (input.monthlyIncome >= 5000) {
    score += 15
    details.push("Income $5,000-$7,999: +15 points")
  } else if (input.monthlyIncome >= 3000) {
    score += 10
    details.push("Income $3,000-$4,999: +10 points")
  } else {
    details.push("Income below $3,000: +0 points")
  }

  // Nationality scoring (0-10 points)
  switch (input.nationality) {
    case 'malaysia':
      score += 10
      details.push("Malaysian nationality: +10 points")
      break
    case 'china':
    case 'india':
      score += 8
      details.push(`${input.nationality === 'china' ? 'PRC Chinese' : 'Indian'} nationality: +8 points`)
      break
    case 'asean':
      score += 6
      details.push("Other ASEAN nationality: +6 points")
      break
    default:
      score += 5
      details.push("Other nationality: +5 points")
  }

  // Years in Singapore (0-10 points)
  if (input.yearsInSingapore >= 5) {
    score += 10
    details.push("5+ years in Singapore: +10 points")
  } else if (input.yearsInSingapore >= 3) {
    score += 5
    details.push("3-4 years in Singapore: +5 points")
  } else {
    details.push(`${input.yearsInSingapore} years in Singapore: +0 points`)
  }

  // Family ties scoring (0-20 points)
  switch (input.maritalStatus) {
    case 'sg_spouse':
      score += 20
      details.push("Married to Singaporean/PR: +20 points")
      break
    case 'sg_child':
      score += 15
      details.push("Have Singaporean child: +15 points")
      break
    case 'sg_parent':
      score += 10
      details.push("Have Singaporean/PR parents: +10 points")
      break
    default:
      details.push("No family ties: +0 points")
  }

  // Education scoring (0-10 points)
  switch (input.educationLevel) {
    case 'university':
      score += 10
      details.push("University degree: +10 points")
      break
    case 'diploma':
      score += 5
      details.push("Diploma: +5 points")
      break
    default:
      details.push("Other education level: +0 points")
  }

  // Job type scoring (0-5 points)
  switch (input.jobType) {
    case 'professional':
      score += 5
      details.push("Professional job: +5 points")
      break
    case 'skilled':
      score += 3
      details.push("Skilled job: +3 points")
      break
    default:
      details.push("Other job type: +0 points")
  }

  // Calculate category
  let category = "Unlikely"
  if (score >= 85) {
    category = "Highly Likely"
  } else if (score >= 65) {
    category = "Likely"
  } else if (score >= 50) {
    category = "Moderate Chance"
  }

  return {
    score,
    category,
    details
  }
} 