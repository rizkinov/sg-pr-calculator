'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { calculateScore } from '@/lib/calculateScore'
import type { ScoreResult } from '@/lib/types'

const formSchema = z.object({
  age: z.number().min(18).max(80),
  monthlyIncome: z.number().min(0),
  nationality: z.string(),
  yearsInSingapore: z.number().min(0),
  maritalStatus: z.enum(['sg_spouse', 'sg_child', 'sg_parent', 'none']),
  educationLevel: z.string(),
  industry: z.string(),
  workPassType: z.string(),
  communityInvolvement: z.string(),
  childrenInLocalSchool: z.boolean(),
})

export default function Home() {
  const [result, setResult] = useState<ScoreResult | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 30,
      monthlyIncome: 6000,
      nationality: 'others',
      yearsInSingapore: 2,
      maritalStatus: 'none',
      educationLevel: 'bachelors',
      industry: 'other',
      workPassType: 'ep',
      communityInvolvement: 'none',
      childrenInLocalSchool: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const score = calculateScore(values)
    setResult(score)
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2 text-center">
        Singapore PR Eligibility Calculator
      </h1>
      <p className="text-sm text-gray-500 mb-1 text-center">
        Updated for 2026
      </p>

      <div className="text-sm text-gray-500 mb-6 text-center">
        This calculator provides an unofficial estimate based on publicly known assessment factors.
        We do not store your data. Your inputs are processed locally on your device.
      </div>

      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Applicants aged 21-40 are generally most favourable
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Income (SGD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Most successful applicants earn S$6,000-S$10,000+. EP minimum salary from Jan 2026: S$5,600.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="phd">PhD / Doctorate</SelectItem>
                      <SelectItem value="masters">Master&apos;s Degree</SelectItem>
                      <SelectItem value="bachelors">Bachelor&apos;s Degree</SelectItem>
                      <SelectItem value="diploma">Diploma / Professional Certification</SelectItem>
                      <SelectItem value="other">Secondary / Below</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    ~80% of approved applicants hold a graduate or postgraduate qualification
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry / Sector</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="tech">Technology / AI / Digital</SelectItem>
                      <SelectItem value="healthcare">Healthcare / Biomedical</SelectItem>
                      <SelectItem value="finance">Finance / Fintech</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="green">Green / Sustainability</SelectItem>
                      <SelectItem value="construction">Construction / Manufacturing</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Sectors aligned with Singapore&apos;s national priorities (Tech, Healthcare, Finance) are viewed more favourably
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workPassType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Work Pass Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your work pass type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ep">Employment Pass (EP)</SelectItem>
                      <SelectItem value="entrepass">EntrePass</SelectItem>
                      <SelectItem value="spass">S Pass</SelectItem>
                      <SelectItem value="dp">Dependant&apos;s Pass / LTVP</SelectItem>
                      <SelectItem value="student">Student Pass</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    EP holders are the primary applicant pool under the PTS scheme
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Nationality</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your current nationality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="malaysia">Malaysian</SelectItem>
                      <SelectItem value="china">PRC Chinese</SelectItem>
                      <SelectItem value="india">Indian</SelectItem>
                      <SelectItem value="asean">Other ASEAN Countries</SelectItem>
                      <SelectItem value="others">Other Countries</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Malaysia, China, and India are the top source countries for Singapore PRs
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearsInSingapore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years in Singapore</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    ICA recommends at least 2 years of residency. Most successful applicants apply after 2-3 years.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Ties to Singapore</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your family ties" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sg_spouse">Married to Singaporean/PR</SelectItem>
                      <SelectItem value="sg_child">Have Singaporean Child</SelectItem>
                      <SelectItem value="sg_parent">Have Singaporean/PR Parents</SelectItem>
                      <SelectItem value="none">No Family Ties to Singapore</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Family ties to SC/PR strongly impact your application, especially with Singapore&apos;s low fertility rate (0.97 TFR)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="communityInvolvement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Community Involvement</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your level of involvement" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active volunteer / Community organisation member (6+ months)</SelectItem>
                      <SelectItem value="some">Some involvement (occasional volunteering, events)</SelectItem>
                      <SelectItem value="none">No community involvement</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    ICA assesses your ability to &quot;integrate well&quot; and &quot;sink roots&quot; in Singapore
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="childrenInLocalSchool"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Children in Local Schools</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === 'true')}
                    defaultValue={field.value ? 'true' : 'false'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Do you have children in local schools?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No / Not applicable</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Enrolling children in local schools is a strong signal of long-term settlement commitment
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Calculate Eligibility
            </Button>
          </form>
        </Form>
      </Card>

      {result && (
        <Card className="mt-6 p-6">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-bold">{result.score}/105</div>
              <div className={`text-lg font-medium ${
                result.category === 'Highly Likely' ? 'text-green-600' :
                result.category === 'Likely' ? 'text-blue-600' :
                result.category === 'Moderate Chance' ? 'text-yellow-600' :
                result.category === 'Low Chance' ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {result.category}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <h3 className="font-medium mb-2">Score Breakdown:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {result.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className="text-xs text-gray-400 mt-4 p-3 bg-gray-50 rounded">
              <p className="font-medium mb-1">Score Guide:</p>
              <ul className="space-y-0.5">
                <li>80-105: Highly Likely — Very strong profile</li>
                <li>60-79: Likely — Good prospects</li>
                <li>45-59: Moderate Chance — Consider strengthening weaker areas</li>
                <li>30-44: Low Chance — Significant improvements needed</li>
                <li>Below 30: Unlikely — May want to wait and build a stronger profile</li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      <div className="mt-8 text-sm text-gray-500 space-y-4">
        <h3 className="font-semibold text-gray-700">Disclaimer & Sources</h3>
        <p>
          This calculator provides an unofficial assessment based on publicly available information and analysis of approval patterns.
          ICA does not use a published point system — each application is assessed holistically at ICA&apos;s full discretion.
          No calculator can guarantee PR approval or rejection.
        </p>

        <div className="space-y-2">
          <p className="font-medium text-gray-600">Official References:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <a
                href="https://www.ica.gov.sg/reside/PR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                ICA — Becoming a Permanent Resident
              </a>
            </li>
            <li>
              <a
                href="https://www.mom.gov.sg/passes-and-permits"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Ministry of Manpower (MOM) — Work Passes & Permits
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-gray-600">Data & Analysis Sources:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <a
                href="https://tip.com.sg/resource/singapore-pr-approvals-hit-14-year-high-what-the-2025-statistics-mean-for-your-2026-application/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                TIP — Singapore PR Approval Rate 2024 Hits 14-Year High
              </a>
            </li>
            <li>
              <a
                href="https://transformborders.com/pr-application-requirements-singapore/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Transform Borders — Singapore PR Requirements 2026
              </a>
            </li>
            <li>
              <a
                href="https://singaporetopimmigration.sg/does-your-salary-affect-your-singapore-pr-approval/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Singapore Top Immigration — PR Salary Benchmarks
              </a>
            </li>
            <li>
              <a
                href="https://www.hcsimmigration.com/post/singapore-pr-approval-trends-2025-2026-guide-latest-data-what-applicants-should-know"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                HCS Immigration — PR Approval Trends 2025-2026
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-gray-600">Key 2026 Facts:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>35,264 PRs granted in 2024 (14-year high); ~33,000-35,000 granted annually</li>
            <li>Total PR population stable at ~540,000 (replacement model)</li>
            <li>Singapore TFR at historic low of 0.97; median citizen age 43.7</li>
            <li>EP minimum salary from Jan 2026: S$5,600 (S$6,200 for financial sector)</li>
            <li>New REP rules from Dec 2025: 180-day grace period, no reinstatement</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-gray-600">Important Notes:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>This calculator is for reference only and does not guarantee PR approval</li>
            <li>ICA assesses applications holistically — no single factor guarantees approval</li>
            <li>Economic conditions, quota policies, and national priorities may shift</li>
            <li>ICA has no affiliation with any external migration agency or calculator</li>
            <li>Always refer to the official ICA website for the most up-to-date requirements</li>
          </ul>
        </div>

        <p className="text-xs">
          Last Updated: March 2026. This tool is for educational purposes only.
        </p>
      </div>
    </main>
  )
}
