export const GRADE_LABELS: Record<string, string> = {
  "9": "9th grade (early high school)",
  "10": "10th grade",
  "11": "11th grade",
  "12": "12th grade (planning next steps soon)",
  college: "college or gap year",
};

export const GRADE_OPTIONS = [
  { value: "9", label: "9th grade" },
  { value: "10", label: "10th grade" },
  { value: "11", label: "11th grade" },
  { value: "12", label: "12th grade" },
  { value: "college", label: "College / gap year" },
] as const;
