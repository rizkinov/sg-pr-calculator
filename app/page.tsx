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
  jobType: z.string(),
})

export default function Home() {
  const [result, setResult] = useState<ScoreResult | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 25,
      monthlyIncome: 3000,
      nationality: 'others',
      yearsInSingapore: 1,
      maritalStatus: 'none',
      educationLevel: 'diploma',
      jobType: 'skilled',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const score = calculateScore(values)
    setResult(score)
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Singapore PR Eligibility Calculator
      </h1>
      
      <div className="text-sm text-gray-500 mb-6 text-center">
        This calculator provides an unofficial estimate only. 
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
                    Your current nationality affects your PR application assessment
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
                      <SelectItem value="university">University Degree</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="skilled">Skilled Worker</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                    Having family ties to Singapore citizens or PRs can positively impact your application
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
              <div className="text-3xl font-bold">{result.score}%</div>
              <div className="text-lg font-medium">{result.category}</div>
            </div>
            <div className="text-sm text-gray-600">
              <h3 className="font-medium mb-2">Score Breakdown:</h3>
              <ul className="list-disc pl-5">
                {result.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      <div className="mt-8 text-sm text-gray-500 space-y-4">
        <h3 className="font-semibold text-gray-700">Disclaimer & Sources</h3>
        <p>
          This calculator provides an unofficial assessment based on commonly known factors. 
          The actual PR application process is complex and at the full discretion of the Immigration & Checkpoints Authority (ICA).
        </p>
        
        <div className="space-y-2">
          <p className="font-medium text-gray-600">References:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <a 
                href="https://www.ica.gov.sg/reside/PR/apply" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                ICA Official PR Application Page
              </a>
            </li>
            <li>
              <a 
                href="https://www.mom.gov.sg/passes-and-permits/work-permit-for-foreign-worker" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Ministry of Manpower (MOM) Work Pass Framework
              </a>
            </li>
            <li>
              <a 
                href="https://www.straitstimes.com/singapore/politics/parliament-about-30000-pr-applications-approved-annually-in-past-5-years" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Straits Times: PR Application Statistics
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-gray-600">Important Notes:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>This calculator is for reference only and does not guarantee PR approval</li>
            <li>Actual PR assessment criteria are not publicly disclosed by ICA</li>
            <li>Additional factors like economic conditions and quota policies may affect PR approval</li>
            <li>Scoring system is based on analysis of successful cases and public information</li>
            <li>Always refer to official ICA channels for the most up-to-date requirements</li>
          </ul>
        </div>

        <p className="text-xs">
          Last Updated: February 2025. This tool is for educational purposes only.
        </p>
      </div>
    </main>
  )
} 