export interface Chapter {
  title: string;
  description?: string;
  relevancy?: string;
  category?: string;
}

export interface Persona {
  title: string;
  desc: string;
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
  learningOutcomes?: string[];
  targetAudience?: Persona[];
  testimonial?: { quote: string; author: string };
  stats?: { students: string; rating: string; completion: string };
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
          description: "Understand the NAPLAN structure, timing, and how the online adaptive test works to your advantage.",
          category: "EXAM STRATEGY",
          relevancy: "Knowing the format removes anxiety and lets you focus on content rather than surprises. Students who understand the structure consistently outperform those who don't.",
        },
        {
          title: "Language Conventions: Grammar & Punctuation",
          description: "Deep dive into grammar rules, sentence structure, and conventions of standard written English.",
          category: "LANGUAGE",
          relevancy: "Grammar questions are among the most reliable to improve. Small rule changes produce immediate, measurable score gains — this is where effort pays off fastest.",
        },
        {
          title: "Language Conventions: Spelling",
          description: "Build spelling accuracy with proven strategies for the words most commonly tested.",
          category: "SPELLING",
          relevancy: "Spelling is directly and objectively tested. Drilling the most common patterns secures marks that other students simply leave on the table.",
        },
        {
          title: "Numeracy: Number & Algebra",
          description: "Review essential number sense, patterns, and algebraic thinking for the numeracy paper.",
          category: "NUMERACY",
          relevancy: "Number and algebra underpin nearly every numeracy question. A strong base here accelerates progress across all remaining numeracy modules.",
        },
        {
          title: "Numeracy: Measurement & Geometry",
          description: "Master measurement, shapes, and spatial reasoning concepts frequently encountered on the test.",
          category: "NUMERACY",
          relevancy: "These questions appear in every NAPLAN numeracy paper. Visual reasoning here translates directly to time saved and marks gained on test day.",
        },
        {
          title: "Numeracy: Statistics & Probability",
          description: "Tackle data interpretation, chance, and graph-reading questions with ease.",
          category: "NUMERACY",
          relevancy: "Data questions are growing in frequency. Students who can read a graph or calculate an average quickly gain a decisive time advantage over peers.",
        },
        {
          title: "Reading: Comprehension Strategies",
          description: "Improve your ability to skim effectively and pinpoint critical details across various text genres.",
          category: "READING",
          relevancy: "Strong readers outperform in every NAPLAN domain. The skimming and inference skills built here also lift Writing and Language Conventions results.",
        },
        {
          title: "Writing: Narrative Texts",
          description: "Learn structured approaches to planning and crafting engaging narrative responses under time pressure.",
          category: "WRITING",
          relevancy: "The writing task is NAPLAN's highest-value item. A clear narrative structure — even on an unfamiliar topic — consistently earns top-band marks.",
        },
        {
          title: "Writing: Persuasive Texts",
          description: "Master the logic, structure, and language techniques behind high-scoring persuasive writing.",
          category: "WRITING",
          relevancy: "Persuasive writing rewards structure and vocabulary — both entirely teachable. Students who hook readers early consistently hit Band 7 and above.",
        },
        {
          title: "Full NAPLAN Practice Test",
          description: "Simulate a real NAPLAN testing environment to build stamina and identify remaining weak spots.",
          category: "EXAM PRACTICE",
          relevancy: "Timed practice under real conditions builds stamina, removes nerves, and reveals exactly what to focus on in the final days before your exam.",
        },
      ],
      pricing: defaultPricing,
      level: "Intermediate",
      resourcesCount: 12,
      lastUpdated: "10/03/2026",
      learningOutcomes: [
        "Score in the top NAPLAN bands across all four domains",
        "Write structured narrative and persuasive essays under time pressure",
        "Apply grammar and punctuation rules with automatic precision",
        "Solve numeracy problems across algebra, geometry and data",
        "Read and comprehend complex texts quickly using evidence-finding strategies",
        "Build stamina and confidence through timed full-mock practice",
      ],
      targetAudience: [
        { title: "Year 3–9 NAPLAN Students", desc: "All year levels — content tailored to your specific paper and cohort." },
        { title: "Top-Band Seekers", desc: "Students targeting Band 8+ or a significant jump from their current score." },
        { title: "Structured Learners", desc: "Families who want a teacher-led, systematic approach to exam readiness." },
      ],
      testimonial: {
        quote: "My daughter went from Band 6 to Band 8 in Writing — and topped Numeracy. The structured approach gave her real confidence and a clear game plan for test day.",
        author: "Sunita R., Parent of a Year 7 Student",
      },
      stats: {
        students: "500+",
        rating: "4.8 / 5",
        completion: "92%",
      },
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
  ],
  "Year 2": [
    {
      id: "naplan-2-1",
      title: "ICAS Spark Course",
      desc: "Kickstart your exam journey with the ICAS Spark Course, designed to ignite curiosity and build a strong foundation in test preparation.",
      img: "/course/icas_prep_course.jpg",
      type: "Exam Preparation",
      categ: "Foundational",
      topics: 12,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Understanding Short Stories" },
        { title: "Reading: Finding Information from Pictures & Captions" },
        { title: "Vocabulary: Common Words and Meanings" },
        { title: "Grammar: Nouns, Verbs, and Adjectives" },
        { title: "Grammar: Sentence Building and Punctuation" },
        { title: "Spelling: Simple Patterns and Sight Words" },
        { title: "Writing: Short Narrative with Characters" },
        { title: "Writing: Expressing Opinions with Reasons" },
        { title: "Numeracy: Numbers, Place Value & Addition/Subtraction" },
        { title: "Numeracy: Shapes, Measurement & Simple Graphs" },
      ],
      pricing: defaultPricing,
    },
  ],
  "Year 3": [
    {
      id: "naplan-3-1",
      title: "Naplan Champion Course",
      desc: "Train like a champion with our Naplan Champion Course, helping students master key skills and strategies for exam success.",
      img: "/course/y3naplanchampion.jpg",
      type: "Exam Preparation",
      categ: "Foundational",
      topics: 15,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Finding Information in Short Texts" },
        { title: "Reading: Main Idea & Supporting Detail" },
        { title: "Reading: Making Inferences from Pictures and Captions" },
        { title: "Language: Nouns, Verbs, Adjectives, and Adverbs" },
        { title: "Language: Sentences, Capital Letters & Punctuation" },
        { title: "Spelling: Common Patterns, Blends & Vowels" },
        { title: "Writing: Narrative Basics (Beginning, Middle, End)" },
        { title: "Writing: Persuasive Basics (Opinion + Reasons)" },
        { title: "Numeracy: Place Value, Addition & Subtraction" },
        { title: "Numeracy: Measurement, Time & Simple Graphs" },
      ],
      pricing: defaultPricing,
    },
    {
      id: "naplan-3-2",
      title: "ICAS Smart Prep Course",
      desc: "Get exam-ready with the Naplan Exam Prep Course, focused on boosting confidence and performance through structured practice.",
      img: "/course/y3icassmartprep.jpg",
      type: "Exam Preparation",
      categ: "Foundational",
      topics: 9,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Understanding Fiction & Non-Fiction Passages" },
        { title: "Reading: Vocabulary in Context (Word Meanings)" },
        { title: "Reading: Drawing Inferences from Short Texts" },
        { title: "Language: Sentence Structure & Punctuation Rules" },
        { title: "Language: Grammar – Subject, Predicate & Agreement" },
        { title: "Writing: Short Story with Setting & Characters" },
        { title: "Writing: Persuasive Paragraph (Opinion with Examples)" },
        { title: "Numeracy: Whole Numbers, Addition & Subtraction" },
        { title: "Numeracy: Simple Fractions & Basic Geometry" },
        { title: "Numeracy: Interpreting Charts & Data" },
      ],
      pricing: defaultPricing,
    },
  ],
  "Year 4": [
    {
      id: "naplan-4-1",
      title: "ICAS Challenger Course",
      desc: "Take on new challenges with the ICAS Challenger Course, perfect for students aiming to strengthen problem-solving and critical thinking.",
      img: "/course/y4icas.jpg",
      type: "Exam Preparation",
      categ: "Foundational",
      topics: 16,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Understanding Longer Stories & Articles" },
        { title: "Reading: Identifying Main Ideas and Supporting Details" },
        { title: "Reading: Making Predictions & Drawing Conclusions" },
        { title: "Vocabulary: Synonyms, Antonyms & Context Clues" },
        { title: "Grammar: Complex Sentences, Tenses & Punctuation" },
        { title: "Writing: Narrative Development (Dialogue & Description)" },
        { title: "Writing: Persuasive Writing – Supporting Reasons with Evidence" },
        { title: "Numeracy: Multiplication, Division & Word Problems" },
        { title: "Numeracy: Fractions, Decimals & Measurement" },
        { title: "Numeracy: Data – Graphs, Tables & Simple Probability" },
      ],
      pricing: defaultPricing,
    },
  ],
  "Year 5": [
    {
      id: "naplan-5-1",
      title: "Naplan Progidy Course",
      desc: "Develop advanced skills with the Naplan Prodigy Course, tailored to push high achievers toward exam excellence.",
      img: "/course/y5progidy.jpg",
      type: "Exam Preparation",
      categ: "Advanced",
      topics: 15,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Understanding Informative & Narrative Texts" },
        { title: "Reading: Summarising Main Ideas & Key Details" },
        { title: "Reading: Comparing & Contrasting Information" },
        { title: "Vocabulary: Using Context to Work Out Meanings" },
        { title: "Grammar: Clauses, Conjunctions & Complex Sentences" },
        { title: "Writing: Narrative with Strong Characters & Plot" },
        { title: "Writing: Persuasive Writing – Structured Arguments" },
        { title: "Numeracy: Multiplication, Division & Large Numbers" },
        { title: "Numeracy: Fractions, Decimals & Percentages" },
        { title: "Numeracy: Data, Chance & Measurement Problems" },
      ],
      pricing: defaultPricing,
    },
    {
      id: "naplan-5-2",
      title: "ICAS Challenger Course",
      desc: "Build confidence and mastery with the ICAS Challenger Course, designed to prepare students for higher-level test success.",
      img: "/course/y5icas.jpg",
      type: "Exam Preparation",
      categ: "Advanced",
      topics: 20,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Interpreting Factual, Narrative & Poetic Texts" },
        { title: "Reading: Identifying Author’s Purpose & Audience" },
        { title: "Vocabulary: Advanced Synonyms, Antonyms & Word Usage" },
        { title: "Grammar: Punctuation, Tense Consistency & Sentence Variety" },
        { title: "Writing: Narrative – Building Tension & Resolution" },
        { title: "Writing: Persuasive – Strong Openings & Evidence Use" },
        { title: "Numeracy: Multi-step Word Problems with Mixed Operations" },
        { title: "Numeracy: Geometry – Angles, Symmetry & Transformations" },
        { title: "Numeracy: Probability & Data Interpretation" },
        { title: "Numeracy: Patterns, Sequences & Algebraic Thinking" },
      ],
      pricing: defaultPricing,
    },
    {
      id: "naplan-5-3",
      title: "Opportunity and Scholarship Course",
      desc: "Prepare for scholarship opportunities with a course that sharpens analytical skills and exam readiness.",
      img: "/course/y5scholarship.jpg",
      type: "Exam Preparation",
      categ: "Advanced",
      topics: 12,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Inference & Interpretation of Complex Texts" },
        { title: "Reading: Comparing Viewpoints Across Passages" },
        { title: "Vocabulary: Advanced Idioms, Figurative Language & Nuances" },
        { title: "Grammar: Complex Sentence Structures & Clauses" },
        { title: "Writing: Argumentative Essays – Structuring Logic & Counterpoints" },
        { title: "Writing: Formal & Informal Letters – Tone & Audience" },
        { title: "Numeracy: Multi-step Word Problems with Fractions & Decimals" },
        { title: "Numeracy: Geometry – Volume, Surface Area & Advanced Shapes" },
        { title: "Numeracy: Algebraic Expressions & Simple Equations" },
        { title: "Numeracy: Interpreting Graphs, Charts & Real-life Data" },
      ],
      pricing: defaultPricing,
    },
  ],
  "Year 6": [
    {
      id: "naplan-6-1",
      title: "ICAS Mastermind Course",
      desc: "Challenge your intellect with the ICAS Mastermind Course, focused on advanced concepts and critical reasoning.",
      img: "/course/y6icas.jpg",
      type: "Exam Preparation",
      categ: "Advanced",
      topics: 16,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Identifying Main Ideas in Short Texts" },
        { title: "Reading: Understanding Sequence & Order of Events" },
        { title: "Vocabulary: Synonyms, Antonyms & Contextual Meanings" },
        { title: "Grammar: Subject-Verb Agreement & Simple Tenses" },
        { title: "Writing: Personal Narratives with Clear Structure" },
        { title: "Writing: Informative Paragraphs (Facts & Details)" },
        { title: "Numeracy: Whole Numbers, Place Value & Rounding" },
        { title: "Numeracy: Fractions – Identifying & Comparing" },
        { title: "Numeracy: Shapes – Perimeter & Area Basics" },
        { title: "Numeracy: Reading Tables, Simple Graphs & Charts" },
      ],
      pricing: defaultPricing,
    },
    {
      id: "naplan-6-2",
      title: "Scholarship Builder Course",
      desc: "Lay the foundation for success in competitive exams with the Scholarship Builder Course, crafted for ambitious learners.",
      img: "/course/y6scholarship.jpg",
      type: "Exam Preparation",
      categ: "Advanced",
      topics: 24,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Analysing Informative & Narrative Texts" },
        { title: "Reading: Identifying Author’s Purpose & Audience" },
        { title: "Reading: Comparing & Contrasting Texts" },
        { title: "Vocabulary: Using Context to Interpret Unfamiliar Words" },
        { title: "Grammar: Clauses, Conjunctions & Sentence Structures" },
        { title: "Spelling: Multi-syllabic Words & Common Suffixes/Prefixes" },
        { title: "Writing: Narrative – Character, Setting & Tension" },
        { title: "Writing: Persuasive – Developing Logical Arguments" },
        { title: "Numeracy: Multi-digit Multiplication & Long Division" },
        { title: "Numeracy: Fractions, Decimals, Percentages & Ratios" },
        { title: "Numeracy: Measurement – Area, Volume & Perimeter" },
        { title: "Numeracy: Data Interpretation & Probability" },
      ],
      pricing: defaultPricing,
    },
  ],
  "Year 7": [
    {
      id: "naplan-7-1",
      title: "ICAS Genius Track Course",
      desc: "Unlock your full potential with the ICAS Genius Track Course, guiding students through advanced problem-solving pathways.",
      img: "/course/y7icasgenius.jpg",
      type: "Exam Preparation",
      categ: "Advanced",
      topics: 12,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Understanding Longer Fiction & Non-Fiction Texts" },
        { title: "Reading: Identifying Theme, Mood & Tone" },
        { title: "Vocabulary: Advanced Context Clues & Figurative Language" },
        { title: "Grammar: Clauses, Sentence Variety & Tense Consistency" },
        { title: "Writing: Narrative – Complex Plots & Character Development" },
        { title: "Writing: Persuasive – Evidence, Reasoning & Counterarguments" },
        { title: "Numeracy: Integers, Fractions, Decimals & Percentages" },
        { title: "Numeracy: Ratios, Rates & Proportions" },
        { title: "Numeracy: Algebra – Expressions & Equations" },
        { title: "Numeracy: Geometry, Perimeter, Area & Volume" },
      ],
      pricing: defaultPricing,
    },
    {
      id: "naplan-7-2",
      title: "NAPLAN Progidy Course",
      desc: "Excel in exams with the NAPLAN Prodigy Course, crafted to nurture young minds into high achievers.",
      img: "/course/y7naplanprogidy.jpg",
      type: "Exam Preparation",
      categ: "Advanced",
      topics: 14,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Analysing Fiction, Non-Fiction & Poetry" },
        { title: "Reading: Making Inferences & Interpreting Themes" },
        { title: "Reading: Evaluating Author’s Purpose & Tone" },
        { title: "Vocabulary: Figurative Language, Idioms & Nuanced Meanings" },
        { title: "Grammar: Complex & Compound-Complex Sentences" },
        { title: "Grammar: Punctuation – Colons, Semicolons & Advanced Usage" },
        { title: "Writing: Narrative – Developing Mood & Style" },
        { title: "Writing: Persuasive/Argumentative – Evidence & Counterarguments" },
        { title: "Numeracy: Fractions, Decimals, Percentages & Ratios" },
        { title: "Numeracy: Algebraic Expressions & Linear Equations" },
        { title: "Numeracy: Geometry – Angles, Perimeter, Area & Volume" },
        { title: "Numeracy: Data – Interpreting Graphs, Probability & Statistics" },
      ],
      pricing: defaultPricing,
    },
  ],
  "Year 8": [
    {
      id: "naplan-8-1",
      title: "ICAS Genius Track Course",
      desc: "Pursue academic brilliance with the ICAS Genius Track Course, designed for students ready to take their skills to the next level.",
      img: "/course/y8icasgeniustech.jpg",
      type: "Exam Preparation",
      categ: "Mastery",
      topics: 12,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Literary Texts – Theme, Tone & Perspective" },
        { title: "Reading: Informative Texts – Compare & Contrast Ideas" },
        { title: "Vocabulary: Word Origins, Affixes & Nuances" },
        { title: "Grammar: Punctuation, Passive Voice & Cohesion" },
        { title: "Writing: Narrative – Imagery & Advanced Structure" },
        { title: "Writing: Persuasive – Logical Appeals & Formal Language" },
        { title: "Numeracy: Linear Equations & Coordinate Geometry" },
        { title: "Numeracy: Ratios, Rates & Percentages in Context" },
        { title: "Numeracy: Probability & Data Analysis" },
        { title: "Numeracy: Geometry – Angles, Circles & Symmetry" },
      ],
      pricing: defaultPricing,
    },
  ],
  "Year 9": [
    {
      id: "sat",
      title: "ICAS Olympian Prep Course",
      desc: "Train like an Olympian with our ICAS Olympian Prep Course, tailored to prepare students for international-level competition.",
      img: "/course/y9icasolymp.jpg",
      type: "ICAS Exam",
      categ: "Mastery",
      topics: 24,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Inference & Evaluation of Complex Texts" },
        { title: "Reading: Interpreting Poetry & Figurative Language" },
        { title: "Vocabulary: Contextual Word Meanings in Passages" },
        { title: "Grammar: Active & Passive Voice, Clauses" },
        { title: "Writing: Analytical Essays (Text Response)" },
        { title: "Writing: Summarising & Critical Thinking" },
        { title: "Numeracy: Algebra (Linear, Quadratic Patterns)" },
        { title: "Numeracy: Geometry & Measurement (Volume, Area, Perimeter)" },
        { title: "Numeracy: Data Handling & Probability" },
        { title: "Numeracy: Non-Routine Problem Solving" },
      ],
      pricing: defaultPricing,
    },
    {
      id: "igcse",
      title: "NAPLAN Grand Master Course",
      desc: "Achieve mastery with the NAPLAN Grand Master Course, combining in-depth knowledge and advanced exam strategies.",
      img: "/course/y9naplangm.jpg",
      type: "NAPLAN Exam",
      categ: "Mastery",
      topics: 30,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Analysing Main Ideas, Tone & Purpose" },
        { title: "Reading: Comparing Text Types (Fiction vs Non-Fiction)" },
        { title: "Vocabulary: Advanced Synonyms, Antonyms & Idioms" },
        { title: "Grammar: Sentence Structures, Punctuation & Tenses" },
        { title: "Writing: Persuasive Essays (Strong Arguments)" },
        { title: "Writing: Narrative Essays (Creative Techniques)" },
        { title: "Numeracy: Algebraic Expressions & Equations" },
        { title: "Numeracy: Geometry (Angles, Circles, Coordinate Geometry)" },
        { title: "Numeracy: Probability & Statistics (Graphs, Averages, Data)" },
        { title: "Numeracy: Problem-Solving & Word Problems" },
      ],
      pricing: defaultPricing,
    },
    {
      id: "naplan-9-1",
      title: "Selective Accelerator Program Course",
      desc: "Accelerate your learning with the Selective Accelerator Program, designed to prepare students for competitive entry tests.",
      img: "/course/y9selacc.jpg",
      type: "Exam Preparation",
      categ: "Mastery",
      topics: 32,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Advanced Comprehension (Author’s Viewpoint, Bias)" },
        { title: "Reading: Critical Comparison of Texts" },
        { title: "Vocabulary: Advanced Academic Vocabulary & Usage" },
        { title: "Grammar: Sentence Transformations & Error Correction" },
        { title: "Writing: Extended Persuasive Essays (Counterarguments)" },
        { title: "Writing: Analytical Writing (Evaluating Evidence)" },
        { title: "Numeracy: Algebra (Linear & Quadratic Equations, Inequalities)" },
        { title: "Numeracy: Advanced Geometry (Proofs, Theorems, Circles)" },
        { title: "Numeracy: Probability, Statistics & Data Analysis" },
        { title: "Numeracy: Advanced Problem Solving & Logical Reasoning" },
      ],
      pricing: defaultPricing,
    },
  ],
  "Year 10": [
    {
      id: "naplan-10-1",
      title: "ICAS Grand Master Course",
      desc: "Master challenging concepts with the ICAS Grand Master Course, helping learners reach the peak of their exam performance.",
      img: "/course/y10icasgmnew.jpg",
      type: "Exam Preparation",
      categ: "Mastery",
      topics: 24,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Analysing Themes Across Multiple Texts" },
        { title: "Reading: Author’s Purpose, Bias & Perspective" },
        { title: "Vocabulary: Academic & Subject-specific Language" },
        { title: "Grammar: Complex Constructions & Stylistic Devices" },
        { title: "Writing: Expository Essays – Structure & Clarity" },
        { title: "Writing: Persuasive Essays – Counterarguments & Rhetoric" },
        { title: "Numeracy: Quadratic Equations & Graphs" },
        { title: "Numeracy: Trigonometry – Sine, Cosine & Tangent" },
        { title: "Numeracy: Probability Distributions & Statistics" },
        { title: "Numeracy: Geometry – Circles, Polygons & Proofs" },
      ],
      pricing: defaultPricing,
    },
  ],
  "Year 11": [
    {
      id: "naplan-11-1",
      title: "ICAS Ultimate Scholar Course",
      desc: "Step into academic excellence with the ICAS Ultimate Scholar Course, designed to build confidence and deep understanding.",
      img: "/course/y11icasscholar.jpg",
      type: "Exam Preparation",
      categ: "Elite",
      topics: 24,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Critical Interpretation of Fiction & Non-Fiction" },
        { title: "Reading: Comparative Analysis of Texts" },
        { title: "Vocabulary: Advanced Academic & Technical Terms" },
        { title: "Grammar: Stylistic Choices & Sentence Manipulation" },
        { title: "Writing: Discursive Essays – Balanced Arguments" },
        { title: "Writing: Analytical Essays – Structure & Evidence" },
        { title: "Mathematics: Functions & Graphs" },
        { title: "Mathematics: Trigonometric Identities & Applications" },
        { title: "Mathematics: Calculus – Limits & Differentiation" },
        { title: "Mathematics: Probability & Statistics in Depth" },
      ],
      pricing: defaultPricing,
    },
  ],
  "Year 12": [
    {
      id: "naplan-12-1",
      title: "HSC Mastery Program Course",
      desc: "Conquer final exams with the HSC Mastery Program Course, tailored for students aiming for top results in Year 12.",
      img: "/course/y12hsc.jpg",
      type: "Exam Preparation",
      categ: "Elite",
      topics: 15,
      duration: "22hr 30min",
      chapters: [
        { title: "Reading: Critical & Comparative Study of Texts" },
        { title: "Reading: Evaluating Authorial Intent & Context" },
        { title: "Vocabulary: Academic, Technical & Subject-specific Language" },
        { title: "Grammar: Stylistics, Syntax & Rhetorical Choices" },
        { title: "Writing: Extended Essays – Argument, Style & Structure" },
        { title: "Writing: Creative Writing – Symbolism, Voice & Style" },
        { title: "Mathematics: Advanced Calculus – Differentiation & Integration" },
        { title: "Mathematics: Algebra – Polynomials, Functions & Graphs" },
        { title: "Mathematics: Probability – Random Variables & Distributions" },
        { title: "Mathematics: Statistics – Data Analysis & Inference" },
      ],
      pricing: defaultPricing,
    },
  ],

};
