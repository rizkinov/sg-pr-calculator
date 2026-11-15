// Quick check of the income brackets in lib/calculateScore.ts.
// Run: npx tsx scripts/check-score.ts
//
// Expected points come from the bracket table in README.md. The income score does
// not use MOM's EP qualifying salary, so MOM's thresholds (S$5,600 / S$6,200 before
// 1 Jan 2027, S$6,000 / S$6,600 from 1 Jan 2027, source:
// https://www.mom.gov.sg/passes-and-permits/employment-pass/eligibility) are checked
// here only to show the score stays the same on both sides of 1 Jan 2027.
import assert from 'node:assert/strict'
import { calculateScore } from '../lib/calculateScore'

// Age 30 (15) + bachelors (10) + other sector (3) + 3 years (8) + other nationality (2)
// + no family ties (0) + EP (5) + no community (0) + no school bonus (0) = 43
const base = {
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
const BASE_POINTS = 43

// [monthly income, income points per README]
const cases: Array<[number, number]> = [
  [0, 0],
  [2999, 0],
  [3000, 4],
  [4499, 4],
  [4500, 8],
  [5600, 8], // EP qualifying salary, new applications before 1 Jan 2027
  [5999, 8],
  [6000, 12], // EP qualifying salary, new applications from 1 Jan 2027
  [6200, 12], // financial services, before 1 Jan 2027
  [6600, 12], // financial services, from 1 Jan 2027
  [9999, 12],
  [10000, 16],
  [14999, 16],
  [15000, 20],
]

function scoreAll() {
  return cases.map(([monthlyIncome]) => calculateScore({ ...base, monthlyIncome }))
}

const now = scoreAll()
cases.forEach(([income, points], i) => {
  assert.equal(now[i].score, BASE_POINTS + points, `income S$${income}`)
})

assert.equal(calculateScore({ ...base, monthlyIncome: 15000 }).category, 'Likely') // 63
assert.equal(calculateScore({ ...base, monthlyIncome: 2000 }).category, 'Low Chance') // 43

// Same result with the clock set to 1 Jan 2027 00:00 SGT (16:00 UTC on 31 Dec 2026).
const RealDate = Date
const after = RealDate.UTC(2026, 11, 31, 16, 0, 0)
class FakeDate extends RealDate {
  constructor(...args: ConstructorParameters<typeof Date> | []) {
    if (args.length === 0) super(after)
    else super(...(args as ConstructorParameters<typeof Date>))
  }
  static now() {
    return after
  }
}
globalThis.Date = FakeDate as DateConstructor
try {
  assert.deepEqual(scoreAll(), now)
} finally {
  globalThis.Date = RealDate
}

console.log(`check-score: ${cases.length} income cases OK, same score before and after 1 Jan 2027`)
