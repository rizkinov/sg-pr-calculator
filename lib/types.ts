export interface FormData {
  age: number;
  monthlyIncome: number;
  nationality: string;
  yearsInSingapore: number;
  maritalStatus: string;
  educationLevel: string;
  industry: string;
  workPassType: string;
  communityInvolvement: string;
  childrenInLocalSchool: boolean;
}

export interface ScoreResult {
  score: number;
  category: string;
  details: string[];
}
