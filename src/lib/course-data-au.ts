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
    price: "$360",
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
    price: "$672",
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
    price: "$1152",
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
      id: "sat-prep",
      title: "Ace the SAT Exam",
      desc: "Comprehensive preparation for the Digital SAT, covering Reading & Writing and Math with advanced strategies.",
      img: "/sat.jpeg",
      type: "Exam Prep",
      categ: "Elite",
      topics: 10,
      duration: "12 Weeks",
      chapters: [
        { 
          title: "Introduction to Digital SAT", 
          description: "Get familiar with the new digital format, scoring systems, and essential test-taking software." 
        },
        { 
          title: "Reading: Core Strategies", 
          description: "Learn to identify main ideas, tone, and evidence-based answers in complex reading passages." 
        },
        { 
          title: "Writing & Language Mechanics", 
          description: "Master grammar, punctuation, and rhetorical skills to ace the writing portion of the exam." 
        },
        { 
          title: "Math: Heart of Algebra", 
          description: "Focus on linear equations, systems, and inequalities that form the core of the SAT Math section." 
        },
        { 
          title: "Problem Solving & Data Analysis", 
          description: "Master ratios, percentages, and data interpretation from charts and graphs." 
        },
        { 
          title: "Passport to Advanced Math", 
          description: "Tackle complex equations, functions, and non-linear expressions with confidence." 
        },
        { 
          title: "Geometry & Trigonometry", 
          description: "Review essential properties of shapes, circles, and trigonometric functions commonly tested." 
        },
        { 
          title: "Expert Calculator Techniques", 
          description: "Maximize your efficiency using the built-in Desmos calculator for complex math problems." 
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
      id: "act-prep",
      title: "Ace the ACT Exam",
      desc: "Full coverage of English, Math, Reading, and Science sections for the ACT exam.",
      img: "/act.jpeg",
      type: "Exam Prep",
      categ: "Advanced",
      topics: 10,
      duration: "10 Weeks",
      chapters: [
        { 
          title: "ACT Overview & Scoring", 
          description: "Understand the ACT structure, timing, and how to leverage the scoring system to your advantage." 
        },
        { 
          title: "English: Usage & Mechanics", 
          description: "Deep dive into grammar rules, sentence structure, and conventions of standard written English." 
        },
        { 
          title: "English: Rhetorical Skills", 
          description: "Learn to evaluate the effectiveness of text through strategy, organization, and style analysis." 
        },
        { 
          title: "Math: Algebra Foundations", 
          description: "Review essential algebra concepts from pre-algebra to intermediate algebra for the ACT." 
        },
        { 
          title: "Math: Geometry & Coordinate Math", 
          description: "Master plane geometry and coordinate geometry concepts frequently encountered on the test." 
        },
        { 
          title: "Math: Advanced Trigonometry", 
          description: "Tackle advanced math topics including trigonometry and complex numbers with ease." 
        },
        { 
          title: "Reading: Key Ideas & Details", 
          description: "Improve your ability to skim effectively and pinpoint critical details in various text genres." 
        },
        { 
          title: "Science: Data Interpretation", 
          description: "Learn systematic approaches to interpreting trends and data from scientific passages." 
        },
        { 
          title: "Science: Scientific Investigation", 
          description: "Master the logic behind experimental design and the evaluation of conflicting viewpoints." 
        },
        { 
          title: "Full ACT Practice Exam", 
          description: "Simulate a real ACT testing environment to build stamina and identify remaining weak spots." 
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
      desc: "From core fundamentals to advanced problem solving, tailored to your grade level.",
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
