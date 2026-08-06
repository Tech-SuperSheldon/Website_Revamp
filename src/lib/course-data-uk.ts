// Full UK course catalog data, used by /uk/new-courses (listing + detail
// pages). Course content (id/title/img/desc/chapters) is copied verbatim
// from src/components/UKHome/uk-course-data.ts (the lean teaser dataset
// /uk's course tree uses) so both pages show the same UK exam courses
// (GCSE, iGCSE, 11+, A-Level, Common Entrance, SATs, etc.). This file adds
// the richer fields (categ, and optional pricing/benefits/level/etc.) that
// the full listing/detail UI needs — mirroring how course-data-au.ts is a
// richer superset of the AU homepage's lean course-data.ts.

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
  sales?: number;
  rating?: number;
}

export const years = [
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12",
  "Year 13",
  "Year 14",
];

const CH_7_8PLUS: Chapter[] = [
  { title: "Reading Comprehension: Understanding and interpreting texts" },
  { title: "Creative Writing: Writing narratives and descriptions" },
  { title: "Grammar and Punctuation: Using commas, apostrophes, and conjunctions" },
  { title: "Vocabulary Building: Expanding word choices and understanding synonyms" },
  { title: "Mental Arithmetic: Quick recall of addition, subtraction, multiplication, and division facts" },
  { title: "Problem Solving: Applying mathematical concepts to real-life scenarios" },
  { title: "Reasoning: Logical thinking and pattern recognition" },
  { title: "Verbal Reasoning: Understanding and reasoning using concepts framed in words" },
  { title: "Non-Verbal Reasoning: Identifying patterns and relationships in visual data" },
  { title: "Interview Techniques: Developing communication skills for interviews" },
];

const CH_9PLUS: Chapter[] = [
  { title: "Advanced Reading Comprehension: Analyzing and interpreting complex texts" },
  { title: "Essay Writing: Structuring and writing detailed essays" },
  { title: "Grammar and Syntax: Understanding complex sentence structures" },
  { title: "Mathematical Reasoning: Solving multi-step problems" },
  { title: "Fractions, Decimals, and Percentages: Converting between them and solving related problems" },
  { title: "Measurement: Understanding and converting units of measurement" },
  { title: "Geometry: Exploring angles, symmetry, and properties of shapes" },
  { title: "Data Analysis: Interpreting data from charts and graphs" },
  { title: "Verbal Reasoning: Advanced understanding and application" },
  { title: "Non-Verbal Reasoning: Complex pattern recognition and analysis" },
];

const CH_10PLUS: Chapter[] = [
  { title: "Critical Reading: Evaluating and critiquing texts" },
  { title: "Persuasive Writing: Crafting arguments and persuasive essays" },
  { title: "Advanced Grammar: Mastery of complex grammatical structures" },
  { title: "Problem Solving: Tackling challenging mathematical problems" },
  { title: "Algebra: Introduction to basic algebraic concepts" },
  { title: "Ratio and Proportion: Understanding and applying ratios and proportions" },
  { title: "Geometry: Exploring properties of 3D shapes and their nets" },
  { title: "Statistics: Analyzing and interpreting statistical data" },
  { title: "Verbal Reasoning: High-level reasoning and comprehension" },
  { title: "Non-Verbal Reasoning: Advanced spatial and pattern reasoning" },
];

const CH_11PLUS: Chapter[] = [
  { title: "Reading Comprehension: Deep analysis and interpretation of texts" },
  { title: "Creative and Persuasive Writing: Writing for different purposes and audiences" },
  { title: "Grammar and Punctuation: Mastery of all punctuation and grammatical rules" },
  { title: "Advanced Mathematics: Complex problem-solving and reasoning" },
  { title: "Algebra and Number Theory: Understanding and applying algebraic concepts" },
  { title: "Geometry: Advanced study of shapes, angles, and spatial reasoning" },
  { title: "Statistics and Probability: Analyzing data and understanding probability" },
  { title: "Verbal Reasoning: High-level comprehension and reasoning" },
  { title: "Non-Verbal Reasoning: Complex pattern and logic problems" },
  { title: "Interview and Presentation Skills: Preparing for school interviews and presentations" },
];

const CH_KS2_KS3: Chapter[] = [
  { title: "Advanced Reading Comprehension: Analyzing complex texts" },
  { title: "Essay Writing: Structuring and writing detailed essays" },
  { title: "Grammar and Syntax: Mastery of complex sentence structures" },
  { title: "Mathematical Reasoning: Solving multi-step problems" },
  { title: "Algebra: Understanding and applying algebraic concepts" },
  { title: "Geometry: Exploring properties of shapes and angles" },
  { title: "Statistics and Probability: Analyzing data and understanding probability" },
  { title: "Verbal Reasoning: High-level reasoning and comprehension" },
  { title: "Non-Verbal Reasoning: Complex pattern recognition and analysis" },
  { title: "Study Skills: Developing effective study habits and techniques" },
];

const CH_13PLUS_CASE: Chapter[] = [
  { title: "Advanced Reading Comprehension: Critical analysis of texts" },
  { title: "Creative and Persuasive Writing: Writing for different purposes and audiences" },
  { title: "Grammar and Punctuation: Mastery of all punctuation and grammatical rules" },
  { title: "Advanced Mathematics: Complex problem-solving and reasoning" },
  { title: "Algebra and Number Theory: Understanding and applying algebraic concepts" },
  { title: "Geometry: Advanced study of shapes, angles, and spatial reasoning" },
  { title: "Statistics and Probability: Analyzing data and understanding probability" },
  { title: "Verbal Reasoning: High-level comprehension and reasoning" },
  { title: "Non-Verbal Reasoning: Complex pattern and logic problems" },
  { title: "Interview and Presentation Skills: Preparing for school interviews and presentations" },
];

const CH_GCSE_CORE: Chapter[] = [
  { title: "English Language: Analyzing and writing various text types" },
  { title: "English Literature: Studying and interpreting literary texts" },
  { title: "Mathematics: Advanced problem-solving and reasoning" },
  { title: "Science: Understanding and applying scientific concepts" },
  { title: "Algebra: Mastery of algebraic expressions and equations" },
  { title: "Geometry: Advanced study of shapes, angles, and spatial reasoning" },
  { title: "Statistics and Probability: Analyzing data and understanding probability" },
  { title: "Study Skills: Developing effective study habits and techniques" },
  { title: "Time Management: Managing time effectively for study and revision" },
  { title: "Exam Techniques: Developing strategies for exam success" },
];

const CH_GCSE_ALEVEL: Chapter[] = [
  { title: "English Language: Advanced analysis and writing skills" },
  { title: "English Literature: In-depth study and interpretation of texts" },
  { title: "Mathematics: Complex problem-solving and reasoning" },
  { title: "Science: Advanced understanding and application of scientific concepts" },
  { title: "Algebra: Mastery of complex algebraic expressions and equations" },
  { title: "Geometry: In-depth study of shapes, angles, and spatial reasoning" },
  { title: "Statistics and Probability: Advanced analysis of data and understanding of probability" },
  { title: "Revision Techniques: Effective methods for revising and retaining information" },
  { title: "Mock Exams: Simulating exam conditions to build confidence" },
  { title: "Exam Strategies: Developing techniques to tackle different types of exam questions" },
];

export const coursesData: Record<string, Course[]> = {
  "Year 1": [
    {
      id: "y1-earlystart",
      title: "SuperSheldon Early Start",
      type: "Early Skills / Entry Basics",
      categ: "Primary",
      duration: "",
      topics: 19,
      sales: 212,
      rating: 4.7,
      img: "/UK/courses/y11.jpg",
      desc: "An engaging introduction to foundational learning for young learners (Age 5–6). Focuses on early literacy, numeracy, and curiosity-building through interactive learning.",
      chapters: [
        { title: "Number and Place Value: Understanding numbers up to 20, counting forwards and backwards" },
        { title: "Addition and Subtraction: Simple calculations within 20" },
        { title: "Multiplication and Division: Introduction to times tables (2, 5, 10)" },
        { title: "Fractions: Recognizing halves and quarters" },
        { title: "Measurement: Comparing lengths, weights, and capacities" },
        { title: "Geometry: Identifying 2D and 3D shapes" },
        { title: "Position and Direction: Describing movements and turns" },
        { title: "Money: Recognizing coins and notes, simple transactions" },
        { title: "Time: Reading o'clock and half past times" },
        { title: "Data Handling: Simple pictograms and tally charts" },
      ],
    },
  ],
  "Year 2": [
    {
      id: "y2-ks1sats",
      title: "SuperSheldon KS1 SATs Booster",
      type: "KS1 SATs Preparation",
      categ: "Primary",
      duration: "",
      topics: 25,
      sales: 178,
      rating: 4.3,
      img: "/UK/courses/y21.jpg",
      desc: "Targeted preparation for KS1 SATs with engaging exercises in English and Maths to build exam confidence and key skills for future success.",
      chapters: [
        { title: "Reading Comprehension: Understanding simple texts" },
        { title: "Grammar, Punctuation, and Spelling (GaPS): Using capital letters, full stops, and basic punctuation" },
        { title: "Number and Place Value: Counting in steps of 2, 3, and 5 from 0" },
        { title: "Addition and Subtraction: Using number bonds and related subtraction facts" },
        { title: "Multiplication and Division: Recalling and using multiplication and division facts for the 2, 5, and 10 times tables" },
        { title: "Fractions: Recognizing, finding, and naming a half as one of two equal parts of an object, shape, or quantity" },
        { title: "Measurement: Choosing and using appropriate standard units to estimate and measure length/height, mass, temperature, and capacity" },
        { title: "Geometry: Identifying and describing the properties of 2D and 3D shapes, including sides and symmetry" },
        { title: "Statistics: Interpreting and constructing simple pictograms, tally charts, and block diagrams" },
        { title: "Problem Solving: Applying mathematical reasoning to solve problems" },
      ],
    },
  ],
  "Year 3": [
    {
      id: "y3-7plus",
      title: "SuperSheldon 7+ Prep",
      type: "Independent School Entry Preparation",
      categ: "Entrance Prep",
      duration: "",
      topics: 14,
      sales: 239,
      rating: 4.8,
      img: "/UK/courses/y31.jpg",
      desc: "Comprehensive preparation for 7+ entrance exams, focusing on literacy, reasoning, and early problem-solving techniques.",
      chapters: CH_7_8PLUS,
    },
    {
      id: "y3-8plus",
      title: "SuperSheldon 8+ Advantage",
      type: "Independent School Entry Preparation",
      categ: "Entrance Prep",
      duration: "",
      topics: 20,
      sales: 172,
      rating: 4.5,
      img: "/UK/courses/y32.jpg",
      desc: "Designed for students aiming for 8+ independent school entry, this course builds analytical thinking and advanced comprehension skills.",
      chapters: CH_7_8PLUS,
    },
  ],
  "Year 4": [
    {
      id: "y4-9plus",
      title: "SuperSheldon 9+ Mastery",
      type: "Selective Entry Exam Preparation",
      categ: "Entrance Prep",
      duration: "",
      topics: 17,
      sales: 360,
      rating: 4.6,
      img: "/UK/courses/y41.jpg",
      desc: "Advanced preparation for 9+ selective school entry exams with focused modules on comprehension, reasoning, and applied maths.",
      chapters: CH_9PLUS,
    },
  ],
  "Year 5": [
    {
      id: "y5-10plus",
      title: "SuperSheldon 10+ Success",
      type: "Selective School Preparation",
      categ: "Entrance Prep",
      duration: "",
      topics: 29,
      sales: 312,
      rating: 4.9,
      img: "/UK/courses/y61.jpg",
      desc: "Develops advanced problem-solving and reasoning skills to prepare for 10+ selective school exams with confidence and strategy.",
      chapters: CH_10PLUS,
    },
  ],
  "Year 6": [
    {
      id: "y6-11plus",
      title: "SuperSheldon 11+ Success",
      type: "Grammar & Independent School Exam Preparation",
      categ: "Entrance Prep",
      duration: "",
      topics: 28,
      sales: 372,
      rating: 4.5,
      img: "/UK/courses/y61.jpg",
      desc: "Comprehensive preparation for 11+ Grammar and Independent School entrance exams, covering verbal, non-verbal, maths, and English reasoning.",
      chapters: CH_11PLUS,
    },
    {
      id: "y6-ks2sats",
      title: "SuperSheldon KS2 SATs Power",
      type: "SATs Exam Preparation",
      categ: "Entrance Prep",
      duration: "",
      topics: 26,
      sales: 318,
      rating: 4.1,
      img: "/UK/courses/y62.jpg",
      desc: "Focused revision and practice for KS2 SATs, ensuring mastery of key concepts in English, maths, and reasoning for high attainment.",
      chapters: CH_KS2_KS3,
    },
  ],
  "Year 7": [
    {
      id: "y7-foundation",
      title: "SuperSheldon KS3 Foundation Boost",
      type: "KS3 Transition",
      categ: "KS3 & Common Entrance",
      duration: "",
      topics: 16,
      sales: 276,
      rating: 4.4,
      img: "/UK/courses/y71.jpg",
      desc: "Smooth transition from KS2 to KS3 with strong foundations in English, maths, and science through engaging and challenging lessons.",
      chapters: CH_KS2_KS3,
    },
  ],
  "Year 8": [
    {
      id: "y8-13plus",
      title: "SuperSheldon 13+ Common Entrance Mastery",
      type: "13+ Entrance Preparation",
      categ: "KS3 & Common Entrance",
      duration: "",
      topics: 22,
      sales: 315,
      rating: 4.2,
      img: "/UK/courses/y81.jpg",
      desc: "Rigorous preparation for 13+ Common Entrance Exams, focusing on English, maths, and reasoning at an advanced level.",
      chapters: CH_13PLUS_CASE,
    },
    {
      id: "y8-case",
      title: "SuperSheldon 13+ Scholarship Edge (CASE)",
      type: "Scholarship Preparation",
      categ: "KS3 & Common Entrance",
      duration: "",
      topics: 19,
      sales: 224,
      rating: 4.8,
      img: "/UK/courses/y82.jpg",
      desc: "A high-performance course designed for students targeting scholarships or competitive entry exams through analytical depth and mastery.",
      chapters: CH_13PLUS_CASE,
    },
  ],
  "Year 9": [
    {
      id: "y9-progress",
      title: "SuperSheldon KS3 Progress Builder",
      type: "KS3 Consolidation / GCSE Foundation",
      categ: "KS3 & Common Entrance",
      duration: "",
      topics: 21,
      sales: 181,
      rating: 4.3,
      img: "/UK/courses/y91.jpg",
      desc: "Consolidate KS3 learning and begin GCSE foundations with focused modules in core subjects to build confidence for upcoming exams.",
      chapters: CH_KS2_KS3,
    },
  ],
  "Year 10": [
    {
      id: "y10-gcsecore",
      title: "SuperSheldon GCSE Core Prep",
      type: "GCSE Preparation",
      categ: "GCSE & iGCSE",
      duration: "",
      topics: 23,
      sales: 360,
      rating: 4.9,
      img: "/UK/courses/y101.jpg",
      desc: "Strong foundation in GCSE core subjects — English, Maths, and Science — through targeted lessons and structured practice.",
      chapters: CH_GCSE_CORE,
    },
  ],
  "Year 11": [
    {
      id: "y11-fasttrack",
      title: "SuperSheldon GCSE Fast-Track Success",
      type: "GCSE Final Exam Preparation",
      categ: "GCSE & iGCSE",
      duration: "",
      topics: 26,
      sales: 374,
      rating: 4.7,
      img: "/UK/courses/y101.jpg",
      desc: "Final-year revision and accelerated strategies for high GCSE performance with intensive coverage of all major subjects.",
      chapters: CH_GCSE_ALEVEL,
    },
    {
      id: "y11-igcse",
      title: "SuperSheldon iGCSE Global Advantage",
      type: "iGCSE Preparation",
      categ: "GCSE & iGCSE",
      duration: "",
      topics: 29,
      sales: 356,
      rating: 4.8,
      img: "/UK/courses/y101.jpg",
      desc: "Comprehensive iGCSE preparation across subjects with an emphasis on global perspectives, critical thinking, and exam strategies.",
      chapters: CH_GCSE_ALEVEL,
    },
  ],
  "Year 12": [
    {
      id: "y12-as",
      title: "SuperSheldon AS Level Builder",
      type: "AS/A-Level Start",
      categ: "A-Level & Beyond",
      duration: "",
      topics: 18,
      sales: 280,
      rating: 4.4,
      img: "/UK/courses/y101.jpg",
      desc: "Start A-Level journey with foundational modules to ensure a strong understanding of advanced topics and exam readiness.",
      chapters: CH_GCSE_ALEVEL,
    },
  ],
  "Year 13": [
    {
      id: "y13-al",
      title: "SuperSheldon A-Level Success",
      type: "A-Level & University Entrance",
      categ: "A-Level & Beyond",
      duration: "",
      topics: 24,
      sales: 368,
      rating: 4.9,
      img: "/UK/courses/y101.jpg",
      desc: "Final preparation for A-Levels and competitive university entrance exams, including Oxbridge preparation, UCAS applications, and specialist pathways.",
      chapters: CH_GCSE_ALEVEL,
    },
  ],
  "Year 14": [
    {
      id: "y14-special",
      title: "SuperSheldon Specialist Pathways",
      type: "Medicine / Law / Economics & Maths Prep",
      categ: "A-Level & Beyond",
      duration: "",
      topics: 30,
      sales: 380,
      rating: 5.0,
      img: "/UK/courses/y101.jpg",
      desc: "Specialist courses tailored for students preparing for competitive tests such as UCAT, BMAT, LNAT, TMUA, STEP, and MAT, along with bespoke university application guidance.",
      chapters: CH_GCSE_ALEVEL,
    },
  ],
};
