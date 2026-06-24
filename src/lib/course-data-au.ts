export interface Chapter {
  title: string;
  description?: string;
}

export interface PricingPlan {
  title: string;
  price: string;
  duration: string;
  features: string[];
  description?: string;
  tag?: string;
  isRecommended?: boolean;
}

export interface Course {
  id: string;
  title: string;
  desc: string;
  img: string;
  type: string;
  categ: string;
  topics: number;
  duration: string;
  chapters: Chapter[];
  pricing?: PricingPlan[];
  level?: string;
  benefits?: string[];
  resourcesCount?: number;
  lastUpdated?: string;
}

const defaultChapters: Chapter[] = [
  { 
    title: "Introduction and Overview", 
    description: "Welcome to the course! We'll start by outlining our goals and the fundamental roadmap for your learning journey." 
  },
  { 
    title: "Fundamental Concepts", 
    description: "Establish a strong base by mastering the core principles and essential building blocks of the subject." 
  },
  { 
    title: "Advanced Techniques", 
    description: "Move beyond the basics and learn sophisticated methods to handle complex scenarios efficiently." 
  },
  { 
    title: "Problem Solving Strategies", 
    description: "Develop a toolkit of systematic approaches to dismantle and solve even the most challenging problems." 
  },
  { 
    title: "Practice Lab 1", 
    description: "Apply what you've learned in a hands-on environment with guided exercises and real-time feedback." 
  },
  { 
    title: "Real-world Applications", 
    description: "See your knowledge in action as we explore how these concepts drive solutions in modern industry." 
  },
  { 
    title: "Case Studies and Analysis", 
    description: "Analyze detailed examples of success and failure to deepen your practical understanding of the core theory." 
  },
  { 
    title: "Mid-Term Review", 
    description: "Check your progress, solidify your understanding, and address any lingering questions before moving forward." 
  },
  { 
    title: "Advanced Workshop", 
    description: "Engage in intensive deep-dives into specialized topics designed for high-performance learners." 
  },
  { 
    title: "Final Conclusion", 
    description: "Synthesize everything you've learned into a comprehensive framework for future success." 
  }
];

const defaultPricing: PricingPlan[] = [
  {
    title: "Basic Pack",
    price: "A$360",
    duration: "/ 24 classes",
    features: [
      "Perfect for getting started",
      "Access to 24 interactive lessons",
      "Weekly quizzes & assessments",
      "Email support from teachers"
    ],
    description: "A solid foundation to start your learning journey.",
    tag: "Starter"
  },
  {
    title: "Standard Pack",
    price: "A$672",
    duration: "/ 48 classes",
    features: [
      "Most popular choice for steady progress",
      "Access to 48 interactive lessons",
      "Priority email support",
      "Detailed progress tracking"
    ],
    isRecommended: true,
    description: "Ideal for students committed to consistent improvement.",
    tag: "Best Value"
  },
  {
    title: "Premium Pack",
    price: "A$1152",
    duration: "/ 96 classes",
    features: [
      "Comprehensive year-round learning",
      "Access to 96 interactive lessons",
      "1-on-1 performance review session",
      "VIP community access"
    ],
    description: "The ultimate package for complete exam mastery.",
    tag: "Elite"
  }
];

export const coursesData: Record<string, Course[]> = {
  "Test Prep": [
    {
      id: "selective-prep",
      title: "Selective School Exam Prep",
      desc: "Comprehensive preparation for Selective High School and Scholarship entry exams, covering Reading, Writing, Mathematical Reasoning and Thinking Skills.",
      img: "/course/y9selacc.jpg",
      type: "Exam Prep",
      categ: "Elite",
      topics: 10,
      duration: "12 Weeks",
      chapters: [
        {
          title: "Introduction to Selective & Scholarship Exams",
          description: "Understand the selective entry test format, scoring, and what assessors are looking for on the day."
        },
        {
          title: "Reading: Core Strategies",
          description: "Learn to identify main ideas, tone, and evidence-based answers in complex reading passages."
        },
        {
          title: "Writing & Language Conventions",
          description: "Master grammar, punctuation, and persuasive techniques to ace the writing component of the exam."
        },
        {
          title: "Mathematical Reasoning: Algebra",
          description: "Focus on linear equations, patterns, and number relationships that form the core of the reasoning section."
        },
        {
          title: "Problem Solving & Data Analysis",
          description: "Master ratios, percentages, and data interpretation from charts and graphs."
        },
        {
          title: "Thinking Skills & Logic",
          description: "Tackle abstract reasoning, deduction, and non-routine problems with confidence."
        },
        {
          title: "Geometry & Measurement",
          description: "Review essential properties of shapes, area, perimeter, and spatial reasoning commonly tested."
        },
        {
          title: "Time Management Techniques",
          description: "Maximise your efficiency under strict time limits with smart question-selection strategies."
        },
        {
          title: "Full Mock Test & Review",
          description: "Take a timed practice test under realistic conditions, followed by a detailed diagnostic review."
        },
        {
          title: "Final Test Day Strategies",
          description: "Final tips on time management, stress reduction, and what to expect on your big day."
        }
      ],
      pricing: defaultPricing,
      level: "Intermediate to Advanced",
      resourcesCount: 15,
      lastUpdated: "12/03/2026"
    },
    {
      id: "naplan-prep",
      title: "NAPLAN Prep",
      desc: "Full coverage of Reading, Writing, Language Conventions, and Numeracy for the NAPLAN assessment (Years 3, 5, 7 & 9).",
      img: "/course/y9naplangm.jpg",
      type: "Exam Prep",
      categ: "Advanced",
      topics: 10,
      duration: "10 Weeks",
      chapters: [
        {
          title: "NAPLAN Overview & Test Format",
          description: "Understand the NAPLAN structure, timing, and how the online adaptive test works to your advantage."
        },
        {
          title: "Language Conventions: Grammar & Punctuation",
          description: "Deep dive into grammar rules, sentence structure, and conventions of standard written English."
        },
        {
          title: "Language Conventions: Spelling",
          description: "Build spelling accuracy with proven strategies for the words most commonly tested."
        },
        {
          title: "Numeracy: Number & Algebra",
          description: "Review essential number sense, patterns, and algebraic thinking for the numeracy paper."
        },
        {
          title: "Numeracy: Measurement & Geometry",
          description: "Master measurement, shapes, and spatial reasoning concepts frequently encountered on the test."
        },
        {
          title: "Numeracy: Statistics & Probability",
          description: "Tackle data interpretation, chance, and graph-reading questions with ease."
        },
        {
          title: "Reading: Comprehension Strategies",
          description: "Improve your ability to skim effectively and pinpoint critical details across various text genres."
        },
        {
          title: "Writing: Narrative Texts",
          description: "Learn structured approaches to planning and crafting engaging narrative responses under time pressure."
        },
        {
          title: "Writing: Persuasive Texts",
          description: "Master the logic, structure, and language techniques behind high-scoring persuasive writing."
        },
        {
          title: "Full NAPLAN Practice Test",
          description: "Simulate a real NAPLAN testing environment to build stamina and identify remaining weak spots."
        }
      ],
      pricing: defaultPricing,
      level: "Intermediate",
      resourcesCount: 12,
      lastUpdated: "10/03/2026"
    }
  ],
  "General Academics": [
    {
      id: "math-foundations",
      title: "Master Math for School and Exam",
      desc: "From core fundamentals to advanced problem solving, tailored to your year level.",
      img: "/math.jpeg",
      type: "Math",
      categ: "Foundational",
      topics: 10,
      duration: "Ongoing",
      chapters: [
        { 
          title: "Number Sense & Operations", 
          description: "Master the fundamentals of numbers, including place value, operations, and basic number theory." 
        },
        { 
          title: "Algebraic Thinking Basics", 
          description: "Learn to identify patterns and use variables to solve simple equations and expressions." 
        },
        { 
          title: "Geometry Essentials", 
          description: "Explore the properties of 2D and 3D shapes, area, perimeter, and volume calculations." 
        },
        { 
          title: "Measurement & Data Analysis", 
          description: "Learn how to collect, organize, and interpret data using various charts and statistical tools." 
        },
        { 
          title: "Ratio & Proportional Reasoning", 
          description: "Understand relationships between quantities and solve real-world problems using ratios." 
        },
        { 
          title: "The Number System Deep Dive", 
          description: "Explore integers, fractions, decimals, and percentages in greater detail for advanced math." 
        },
        { 
          title: "Expressions & Equations", 
          description: "Master the art of manipulating algebraic expressions and solving multi-step equations." 
        },
        { 
          title: "Functions & Modeling", 
          description: "Learn how to use mathematical functions to model and understand real-world phenomena." 
        },
        { 
          title: "Statistics & Probability", 
          description: "Explore the laws of chance and learn how to make predictions based on data distributions." 
        },
        { 
          title: "Final Math Mastery Challenge", 
          description: "A comprehensive assessment designed to test your understanding of all course topics." 
        }
      ],
      pricing: defaultPricing,
      level: "Beginner to Intermediate",
      resourcesCount: 20,
      lastUpdated: "15/03/2026"
    },
    {
      id: "english-proficiency",
      title: "Master English for School and Exam",
      desc: "Developing critical reading and analytical writing skills for academic success.",
      img: "/english.jpeg",
      type: "English",
      categ: "Mastery",
      topics: 10,
      duration: "Ongoing",
      chapters: [
        { 
          title: "Reading Comprehension Foundations", 
          description: "Develop core strategies for understanding main ideas, details, and context in diverse texts." 
        },
        { 
          title: "Literary Analysis Techniques", 
          description: "Learn how to analyze themes, characters, and stylistic choices in literature." 
        },
        { 
          title: "Informational Text Mastery", 
          description: "Master the skills needed to extract and evaluate information from non-fiction and academic sources." 
        },
        { 
          title: "Grammar & Punctuation Excellence", 
          description: "Polish your writing by mastering the rules and nuances of English grammar and punctuation." 
        },
        { 
          title: "Sentence Structure & Variation", 
          description: "Improve the flow and impact of your writing with advanced sentence design techniques." 
        },
        { 
          title: "Essay Planning & Organization", 
          description: "Learn systematic approaches to brainstorming, outlining, and structuring effective essays." 
        },
        { 
          title: "Creative Writing Workshop", 
          description: "Unleash your imagination and explore various genres and styles of creative expression." 
        },
        { 
          title: "Research & Citation Standards", 
          description: "Master the art of finding credible sources and citing them correctly in academic work." 
        },
        { 
          title: "Critical Thinking & Argument", 
          description: "Develop the ability to construct, analyze, and refute logical arguments in your writing." 
        },
        { 
          title: "Final Portfolio Review", 
          description: "Compile and present your best work from the course for final evaluation and feedback." 
        }
      ],
      pricing: defaultPricing,
      level: "All Levels",
      resourcesCount: 18,
      lastUpdated: "14/03/2026"
    }
  ]
};
