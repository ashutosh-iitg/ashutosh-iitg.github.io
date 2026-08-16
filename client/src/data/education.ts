export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  location: string;
  note?: string;
}

export const education: EducationEntry[] = [
  {
    institution: "Indian Institute of Technology Guwahati",
    degree: "Bachelor of Technology in Engineering Physics",
    period: "Jul 2016 — Jun 2020",
    location: "Assam, India",
    note: "CGPA 7.76/10.0",
  },
];
