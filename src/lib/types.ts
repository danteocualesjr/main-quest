export type EducationLevel =
  | "high_school"
  | "certificate"
  | "associate"
  | "bachelor"
  | "master"
  | "doctorate";

export type GrowthOutlook = "much_faster" | "faster" | "average" | "slower";

export interface Career {
  id: string;
  title: string;
  category: string;
  tagline: string;
  summary: string;
  dayInLife: string[];
  salaryMin: number;
  salaryMax: number;
  salaryMedian: number;
  growthOutlook: GrowthOutlook;
  growthPercent: number;
  education: EducationLevel;
  educationLabel: string;
  timeToEntry: string;
  interests: string[];
  strengths: string[];
  avoids: string[];
  skillsToBuild: string[];
  relatedIds: string[];
  aliases: string[];
}

export interface PathInput {
  goal: string;
  gradeLevel?: string;
}

export interface DiscoverInput {
  likes: string;
  strengths: string;
  weaknesses: string;
  gradeLevel?: string;
}

export interface CareerMatch {
  career: Career;
  score: number;
  reasons: string[];
}

export interface PathStep {
  phase: string;
  title: string;
  description: string;
  actions: string[];
}

export interface CareerPath {
  career: Career;
  steps: PathStep[];
  gaps: string[];
  encouragement: string;
}

export interface ExploreFilters {
  query?: string;
  category?: string;
  minSalary?: number;
  education?: EducationLevel;
  growth?: GrowthOutlook;
}

export const GROWTH_LABELS: Record<GrowthOutlook, string> = {
  much_faster: "Much faster than average",
  faster: "Faster than average",
  average: "About average",
  slower: "Slower than average",
};

export const EDUCATION_LABELS: Record<EducationLevel, string> = {
  high_school: "High school diploma",
  certificate: "Certificate / bootcamp",
  associate: "Associate degree",
  bachelor: "Bachelor's degree",
  master: "Master's degree",
  doctorate: "Doctorate / professional degree",
};

export const CATEGORIES = [
  "Technology",
  "Healthcare",
  "Creative",
  "Business",
  "Education",
  "Science",
  "Trades",
  "Public Service",
] as const;
