import { type ScoreResult } from './types'

type ScoreInput = {
  age: number
  monthlyIncome: number
  nationality: string
  yearsInSingapore: number
  maritalStatus: 'sg_spouse' | 'sg_child' | 'sg_parent' | 'none'
  educationLevel: string
  industry: string
  workPassType: string
  communityInvolvement: string
  childrenInLocalSchool: boolean
}

export function calculateScore(input: ScoreInput): ScoreResult {
  let score = 0
  const details: string[] = []

  // Age scoring (0-15 points)
  // Based on: Most approved applicants are aged 21-40. Under 50 is generally favourable.
  // Singapore's low TFR (0.97) and aging population mean younger applicants are prioritized.
  if (input.age >= 21 && input.age <= 30) {
    score += 15
    details.push("Age 21-30: +15 points (most favourable age range)")
  } else if (input.age >= 31 && input.age <= 35) {
    score += 12
    details.push("Age 31-35: +12 points (highly favourable)")
  } else if (input.age >= 36 && input.age <= 40) {
    score += 9
    details.push("Age 36-40: +9 points (favourable)")
  } else if (input.age >= 41 && input.age <= 45) {
    score += 6
    details.push("Age 41-45: +6 points (moderate)")
  } else if (input.age >= 46 && input.age <= 50) {
    score += 4
    details.push("Age 46-50: +4 points (less favourable)")
  } else {
    score += 2
    details.push("Age below 21 or above 50: +2 points (least favourable)")
  }

  // Monthly Income scoring (0-20 points)
  // Based on: Most successful applicants earn S$6,000-S$10,000+.
  // EP minimum salary from Jan 2026: S$5,600 (non-financial), S$6,200 (financial).
  // No official minimum for PR, but salary is one of the most heavily weighted factors.
  if (input.monthlyIncome >= 15000) {
    score += 20
    details.push("Income ≥S$15,000: +20 points (very strong economic contribution)")
  } else if (input.monthlyIncome >= 10000) {
    score += 16
    details.push("Income S$10,000-S$14,999: +16 points (strong)")
  } else if (input.monthlyIncome >= 6000) {
    score += 12
    details.push("Income S$6,000-S$9,999: +12 points (solid range for approvals)")
  } else if (input.monthlyIncome >= 4500) {
    score += 8
    details.push("Income S$4,500-S$5,999: +8 points (modest)")
  } else if (input.monthlyIncome >= 3000) {
    score += 4
    details.push("Income S$3,000-S$4,499: +4 points (below typical approved range)")
  } else {
    details.push("Income below S$3,000: +0 points (weak)")
  }

  // Education scoring (0-15 points)
  // Based on: ~80% of approved applicants hold graduate or postgraduate qualifications.
  // Degrees from local SG or internationally renowned institutions are viewed most favourably.
  switch (input.educationLevel) {
    case 'phd':
      score += 15
      details.push("PhD: +15 points (highest qualification)")
      break
    case 'masters':
      score += 12
      details.push("Master's degree: +12 points")
      break
    case 'bachelors':
      score += 10
      details.push("Bachelor's degree: +10 points")
      break
    case 'diploma':
      score += 5
      details.push("Diploma/Professional certification: +5 points")
      break
    default:
      details.push("Other education level: +0 points")
  }

  // Industry/Sector scoring (0-10 points)
  // Based on: Tech/AI, Healthcare, Finance, Engineering, Green/Sustainability, and
  // Construction/Manufacturing are aligned with Singapore's national priorities.
  switch (input.industry) {
    case 'tech':
      score += 10
      details.push("Technology/AI/Digital sector: +10 points (high national priority)")
      break
    case 'healthcare':
      score += 10
      details.push("Healthcare/Biomedical sector: +10 points (high national priority)")
      break
    case 'finance':
      score += 10
      details.push("Finance/Fintech sector: +10 points (high national priority)")
      break
    case 'engineering':
      score += 8
      details.push("Engineering sector: +8 points (national priority)")
      break
    case 'green':
      score += 8
      details.push("Green/Sustainability sector: +8 points (national priority)")
      break
    case 'construction':
      score += 6
      details.push("Construction/Manufacturing sector: +6 points")
      break
    case 'education':
      score += 6
      details.push("Education sector: +6 points")
      break
    default:
      score += 3
      details.push("Other sector: +3 points")
  }

  // Years in Singapore (0-10 points)
  // Based on: ICA requires at least ~2 years of residency for PTS scheme.
  // Most successful applicants apply after 2-3 years of continuous employment.
  if (input.yearsInSingapore >= 5) {
    score += 10
    details.push("5+ years in Singapore: +10 points (strong commitment)")
  } else if (input.yearsInSingapore >= 3) {
    score += 8
    details.push("3-4 years in Singapore: +8 points (good track record)")
  } else if (input.yearsInSingapore >= 2) {
    score += 5
    details.push("2 years in Singapore: +5 points (meets minimum recommended)")
  } else if (input.yearsInSingapore >= 1) {
    score += 2
    details.push("1 year in Singapore: +2 points (below recommended)")
  } else {
    details.push("Less than 1 year in Singapore: +0 points (too early to apply)")
  }

  // Nationality scoring (0-5 points)
  // Based on: Certain nationalities have historically higher approval rates.
  // Malaysia, China, and India are the top source countries for SG PRs.
  switch (input.nationality) {
    case 'malaysia':
      score += 5
      details.push("Malaysian nationality: +5 points (top source country, cultural proximity)")
      break
    case 'china':
    case 'india':
      score += 4
      details.push(`${input.nationality === 'china' ? 'PRC Chinese' : 'Indian'} nationality: +4 points (top source country)`)
      break
    case 'asean':
      score += 3
      details.push("Other ASEAN nationality: +3 points (regional ties)")
      break
    default:
      score += 2
      details.push("Other nationality: +2 points")
  }

  // Family ties scoring (0-15 points)
  // Based on: ICA explicitly considers family ties. Having family settled in SG
  // aligns with demographic goals (low TFR of 0.97, aging population).
  switch (input.maritalStatus) {
    case 'sg_spouse':
      score += 15
      details.push("Married to Singaporean/PR: +15 points (strongest family tie)")
      break
    case 'sg_child':
      score += 12
      details.push("Have Singaporean child: +12 points (strong family anchor)")
      break
    case 'sg_parent':
      score += 8
      details.push("Have Singaporean/PR parents: +8 points")
      break
    default:
      details.push("No family ties to Singapore: +0 points")
  }

  // Work Pass Type scoring (0-5 points)
  // Based on: EP holders are the primary PR applicant pool under PTS scheme.
  switch (input.workPassType) {
    case 'ep':
      score += 5
      details.push("Employment Pass holder: +5 points (primary PR pathway)")
      break
    case 'entrepass':
      score += 4
      details.push("EntrePass holder: +4 points")
      break
    case 'spass':
      score += 3
      details.push("S Pass holder: +3 points")
      break
    case 'dp':
      score += 2
      details.push("Dependant's Pass / LTVP holder: +2 points")
      break
    case 'student':
      score += 1
      details.push("Student Pass holder: +1 point")
      break
    default:
      score += 1
      details.push("Other pass type: +1 point")
  }

  // Community Involvement scoring (0-5 points)
  // Based on: ICA assesses ability to "integrate well" and "sink roots."
  // Applicants who join community organisations for 6+ months have higher approval rates.
  switch (input.communityInvolvement) {
    case 'active':
      score += 5
      details.push("Active community involvement (6+ months): +5 points")
      break
    case 'some':
      score += 3
      details.push("Some community involvement: +3 points")
      break
    default:
      details.push("No community involvement: +0 points")
  }

  // Children in local schools bonus (0-5 points, cumulative with family ties)
  // Based on: Enrolling children in local schools is a strong signal of commitment.
  if (input.childrenInLocalSchool) {
    score += 5
    details.push("Children enrolled in local schools: +5 points (strong settlement signal)")
  }

  // Calculate category based on total score (max 100+5 bonus possible)
  // Thresholds based on holistic assessment patterns from approved cases
  let category = "Unlikely"
  if (score >= 80) {
    category = "Highly Likely"
  } else if (score >= 60) {
    category = "Likely"
  } else if (score >= 45) {
    category = "Moderate Chance"
  } else if (score >= 30) {
    category = "Low Chance"
  }

  return {
    score,
    category,
    details
  }
}
