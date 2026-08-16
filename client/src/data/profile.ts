export interface SocialLink {
  label: string;
  handle: string;
  url: string;
}

/**
 * Canonical profile data for the site.
 * NOTE: never add a phone number here (PLAN.md §2, open item #5).
 */
export interface Profile {
  name: string;
  firstName: string;
  handle: string;
  tagline: string;
  location: string;
  email: string;
  resumePath: string;
  socials: SocialLink[];
}

export const profile: Profile = {
  name: "Ashutosh Kumar Mandal",
  firstName: "Ashutosh",
  handle: "ashutosh-iitg",
  tagline: "Senior AI Engineer — Applied Generative AI, Agentic Systems & ML Platforms",
  location: "Bengaluru, India",
  email: "ashutosh.iitg.16@gmail.com",
  resumePath: "/resume.pdf",
  socials: [
    {
      label: "GitHub",
      handle: "ashutosh-iitg",
      url: "https://github.com/ashutosh-iitg",
    },
    {
      label: "LinkedIn",
      handle: "ashutosh-iitg",
      url: "https://www.linkedin.com/in/ashutosh-iitg",
    },
    {
      label: "Email",
      handle: "ashutosh.iitg.16@gmail.com",
      url: "mailto:ashutosh.iitg.16@gmail.com",
    },
  ],
};
