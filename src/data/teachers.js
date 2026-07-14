// Teacher profile data for the "Meet Our Teachers" section.
//
// `about`, `philosophy`, `qualifications`, `subjects`, `expertise` and
// `experience` are taken from each teacher's official "Know Your Teacher"
// poster (public/teachers/<slug>.png). The circular `image` avatars were
// cropped from those posters (public/teachers/avatars/<slug>.png).
//
// ⚠️ PLACEHOLDER FIELDS — not present on the posters. Replace with real values:
//    `rating`, `students`, `languages`
//
// To add / edit a teacher, just add an object here — the UI is fully
// data-driven and needs no code changes.

const BASE = [
  {
    id: "khushi-chaubey",
    name: "Khushi Chaubey",
    designation: "Virtual Instructor",
    image: "/teachers/avatars/khushi-chaubey.webp",
    poster: "/teachers/khushi-chaubey.png",
    subject: "Science, English & Maths",
    subjects: ["Science", "English", "Maths"],
    experience: "1.5+ yrs",
    tagline: "Makes tough topics fun, easy and exciting.",
    qualifications: ["B.Sc — Gold Medalist (Zoology, Botany & Chemistry)"],
    about:
      "Hi, I'm Khushi. I love making learning fun, easy and exciting for students! I teach Science, English and Maths in a simple way with real-life examples, so tough topics feel much easier. My classes are friendly, interactive and full of questions, laughs and learning.",
    philosophy:
      "Every student learns best when they feel supported, understood and encouraged. With the right guidance and clear concepts, learning becomes enjoyable, meaningful and successful.",
    expertise: [
      "Interactive Teaching Methods",
      "Student Confidence Building",
      "Strong Fundamental Teaching",
      "Teaching & Mentorship",
    ],
    languages: ["English", "Hindi"],
    rating: 4.9,
    students: "120+",
  },
  {
    id: "arfa-zainab",
    name: "Arfa Zainab",
    designation: "Virtual Instructor",
    image: "/teachers/avatars/arfa-zainab.webp",
    poster: "/teachers/arfa-zainab.png",
    subject: "Biology & Science",
    subjects: ["Biology", "Science", "Biotechnology"],
    experience: "1 yr",
    tagline: "Learning that's interactive, real and beyond exams.",
    qualifications: ["B.Sc — Biotechnology, Genetics & Biochemistry"],
    about:
      "I'm Arfa, currently pursuing a BSc in Biotechnology and Genetics, and I see learning as more than just marks — it's about understanding life and thinking deeply. My teaching style is interactive and real, where I explain concepts in a way that actually makes sense, not just for exams.",
    philosophy:
      "What I enjoy most about teaching is helping someone finally 'get it' and watching their confidence grow.",
    expertise: [
      "Advanced Concept Simplification",
      "Problem-Solving Techniques",
      "Time Management",
      "Teaching & Mentorship",
    ],
    languages: ["English", "Hindi"],
    rating: 4.8,
    students: "60+",
  },
  {
    id: "ruchi-arya",
    name: "Ruchi Arya",
    designation: "Virtual Instructor",
    image: "/teachers/avatars/ruchi-arya.webp",
    poster: "/teachers/ruchi-arya.png",
    subject: "Science & Maths",
    subjects: ["Science", "Mathematics"],
    experience: "15+ yrs",
    tagline: "Making science simple through real-life, inquiry-based learning.",
    qualifications: [
      "Masters in Microbiology",
      "B.Ed — Science & Mathematics",
    ],
    about:
      "Hi! I am a passionate and dynamic Science educator with over 15 years of experience teaching primary and middle school students. I enjoy making science concepts simple, engaging and easy to understand through real-life examples and interactive inquiry-based learning.",
    philosophy:
      "Every mind is born with a different ability of learning. I strongly believe in understanding the young mind's needs and supporting them with clear concepts and right guidance — this makes learning comfortable and enjoyable.",
    expertise: [
      "Advanced Concept Simplification",
      "Problem-Solving Techniques",
      "Time Management",
      "Teaching & Mentorship",
    ],
    languages: ["English", "Hindi"],
    rating: 4.9,
    students: "500+",
  },
  {
    id: "shahar-banu",
    name: "Shahar Banu S",
    designation: "Virtual Instructor",
    image: "/teachers/avatars/shahar-banu.webp",
    poster: "/teachers/shahar-banu.png",
    subject: "Science & Biology",
    subjects: ["Science", "Biology", "Botany"],
    experience: "6 yrs",
    tagline: "Concept-focused teaching that builds clarity & confidence.",
    qualifications: ["MSc Botany", "BSc.Ed"],
    about:
      "My teaching style is concept-focused and structured, with a strong emphasis on clarity, application and exam performance. I use regular assessments and targeted practice to improve student outcomes, breaking down complex topics into simple ideas.",
    philosophy:
      "Good teaching is not about covering the syllabus, but making sure students truly understand it. Clarity builds confidence, and confident students perform better.",
    expertise: [
      "Advanced Concept Simplification",
      "Problem-Solving Techniques",
      "Time Management",
      "Teaching & Mentorship",
    ],
    languages: ["English", "Hindi"],
    rating: 4.8,
    students: "200+",
  },
  {
    id: "shalini-mahadik",
    name: "Shalini Mahadik",
    designation: "Virtual Instructor",
    image: "/teachers/avatars/shalini-mahadik.webp",
    poster: "/teachers/shalini-mahadik.png",
    subject: "Chemistry & Science",
    subjects: ["Chemistry", "Science"],
    experience: "5+ yrs",
    tagline: "Turns every question into a new door to discovery.",
    qualifications: ["MSc — Organic Chemistry"],
    about:
      "Passionate and dedicated educator with a strong focus on creating engaging, student-centered learning experiences. Skilled in designing interactive lessons aligned with curriculum standards, I strive to build confidence, creativity and critical thinking in every learner.",
    philosophy:
      "I believe learning should feel like discovery, not pressure — where every question opens a new door. My goal is to guide students to think independently, grow confidently and enjoy the journey of learning.",
    expertise: [
      "Advanced Concept Simplification",
      "Problem-Solving Techniques",
      "Time Management",
      "Teaching & Mentorship",
    ],
    languages: ["English", "Hindi"],
    rating: 4.9,
    students: "180+",
  },
  {
    id: "shraddha-kamat",
    name: "Shraddha Kamat",
    designation: "Virtual Instructor",
    image: "/teachers/avatars/shraddha-kamat.webp",
    poster: "/teachers/shraddha-kamat.png",
    subject: "English & Communication",
    subjects: ["English", "Communication Skills", "Public Speaking"],
    experience: "12+ yrs",
    tagline: "Grammar, public speaking & real communication skills.",
    qualifications: [
      "Post Graduate in Human Resource",
      "Certified — Effective Business Communication, IIM Bangalore",
      "Certified — TTT+ Training, IIT Roorkee",
    ],
    about:
      "Hi! I am a passionate English and Communication Skills educator with 12+ years of experience teaching learners of all age groups. I specialize in grammar, public speaking and practical communication skills through interactive and personalized sessions.",
    philosophy:
      "Students learn best when they feel supported and confident. With clear and simple teaching, learning becomes easy and enjoyable.",
    expertise: [
      "Advanced Concept Simplification",
      "Problem-Solving Techniques",
      "Time Management",
      "Teaching & Mentorship",
    ],
    languages: ["English", "Hindi"],
    rating: 4.9,
    students: "400+",
  },
  {
    id: "diana-pereira",
    name: "Diana Pereira",
    designation: "Virtual Instructor",
    image: "/teachers/avatars/diana-pereira.webp",
    poster: "/teachers/diana-pereira.png",
    subject: "Maths & Vedic Math",
    subjects: ["Mathematics", "Vedic Math"],
    experience: "5+ yrs",
    year: "Year 1–8",
    tagline: "Simplifying tricky concepts, sparking curiosity.",
    qualifications: ["B.Com, B.Ed", "Specialized Training in Vedic Math"],
    about:
      "My biggest strengths as a teacher are making learning engaging, simplifying tricky concepts and adapting lessons to suit different learning styles. I love creating a classroom where curiosity thrives and students feel confident to participate.",
    philosophy:
      "Helping students understand new concepts, build confidence and achieve their goals — seeing their progress, curiosity and success makes teaching truly rewarding and fulfilling.",
    expertise: [
      "Individualized Instructions",
      "Assessment & Progress Tracking",
      "Concept Simplification",
      "Teaching & Mentorship",
    ],
    languages: ["English", "Hindi"],
    rating: 4.8,
    students: "150+",
  },
  {
    id: "gitartha-dutta",
    name: "Gitartha Dutta",
    designation: "Virtual Instructor",
    image: "/teachers/avatars/gitartha-dutta.webp",
    poster: "/teachers/gitartha-dutta.png",
    subject: "Science & Maths",
    subjects: ["Mathematics", "Science", "Biology", "Physics", "Chemistry"],
    experience: "5 yrs",
    year: "Year 5–12",
    tagline: "Turning tricky concepts into lightbulb moments.",
    qualifications: ["MSc — Chemistry"],
    about:
      "My superpowers in the classroom are turning tricky concepts into lightbulb moments, building genuine connections with students and adapting on the fly to different learning styles. I thrive with great teaching resources and technology that helps bring lessons to life.",
    philosophy:
      "The most fulfilling part of teaching for me is the impact it creates. I love watching learners progress from confusion to clarity — knowing that my guidance can make learning easier and more enjoyable is what motivates me the most.",
    expertise: [
      "Individualized Instructions",
      "Assessment & Progress Tracking",
      "Concept Simplification",
      "Teaching & Mentorship",
    ],
    languages: ["English", "Hindi"],
    rating: 4.9,
    students: "220+",
  },
  {
    id: "preksha-sharma",
    name: "Preksha Sharma",
    designation: "Virtual Instructor",
    image: "/teachers/avatars/preksha-sharma.webp",
    poster: "/teachers/preksha-sharma.png",
    subject: "English & Japanese",
    subjects: ["English", "Japanese"],
    experience: "5+ yrs",
    year: "Year 4–8",
    tagline: "Fun, game-based language learning (JLPT / NAT ready).",
    qualifications: ["Diploma in Corporate Social Responsibility"],
    about:
      "I can train students for Japanese N5 and help them prepare for the JLPT and NAT examinations. I love teaching in a fun, interactive way through games, conversations and engaging activities that make learning enjoyable.",
    philosophy:
      "I believe learning should feel exciting, not stressful. I create a classroom where students feel comfortable asking questions, making mistakes and trying again — building confidence while enjoying the journey of learning.",
    expertise: [
      "Individualized Instructions",
      "Assessment & Progress Tracking",
      "Interactive Teaching Methods",
      "Teaching & Mentorship",
    ],
    languages: ["English", "Japanese", "Hindi"],
    rating: 4.9,
    students: "140+",
  },
  {
    id: "ridhima",
    name: "Ridhima",
    designation: "Virtual Instructor",
    image: "/teachers/avatars/ridhima.webp",
    poster: "/teachers/ridhima.png",
    subject: "Science & Chemistry",
    subjects: ["Science", "Chemistry"],
    experience: "5+ yrs",
    year: "Year 1–12",
    tagline: "Patient, empathetic teaching for that 'Aha!' moment.",
    qualifications: ["Bachelors of Education"],
    about:
      "The best part of teaching is witnessing that magical 'Aha!' moment when a concept finally clicks for a student. My greatest strengths are patience, acceptance, emotional stability and mental resilience — helping me support every learner with empathy.",
    philosophy:
      "I believe the best classrooms are filled with smiles, questions and little 'I got it!' moments. When students enjoy learning, they naturally become more curious, confident and eager to keep exploring.",
    expertise: [
      "Individualized Instructions",
      "Assessment & Progress Tracking",
      "Student Confidence Building",
      "Teaching & Mentorship",
    ],
    languages: ["English", "Hindi"],
    rating: 4.8,
    students: "160+",
  },
  {
    id: "rupanshi-kalra",
    name: "Rupanshi Kalra",
    designation: "Virtual Instructor",
    image: "/teachers/avatars/rupanshi-kalra.webp",
    poster: "/teachers/rupanshi-kalra.png",
    subject: "Maths, English & Economics",
    subjects: ["Mathematics", "English", "Economics", "Sociology"],
    experience: "5+ yrs",
    year: "Year 1–8",
    tagline: "Lessons that become conversations — let's figure it out!",
    qualifications: ["Masters in Economics"],
    about:
      "I love turning lessons into conversations, questions and exciting 'Let's figure it out together!' moments. My strengths are clear communication, keeping students engaged and adapting to every child's learning style.",
    philosophy:
      "I love watching students grow from saying 'I don't know' to confidently saying 'I can do this!'. Every small breakthrough, curious question and proud smile makes teaching incredibly rewarding.",
    expertise: [
      "Individualized Instructions",
      "Assessment & Progress Tracking",
      "Interactive Teaching Methods",
      "Teaching & Mentorship",
    ],
    languages: ["English", "Hindi"],
    rating: 4.9,
    students: "170+",
  },
  {
    id: "muniba-elahi",
    name: "Muniba Elahi",
    designation: "Virtual Instructor",
    image: "/teachers/avatars/muniba-elahi.webp",
    poster: "/teachers/muniba-elahi.png",
    subject: "English & Phonics",
    subjects: ["English", "Phonics", "Literature"],
    experience: "5+ yrs",
    year: "Year 9–12",
    tagline: "Turning challenging concepts into engaging lessons.",
    qualifications: [
      "Master's in English Language & Literature",
      "Master's in Psychology",
      "Certified Phonics Teacher, B.Ed",
    ],
    about:
      "What I enjoy most about teaching is seeing students grow in confidence and realizing that they are capable of more than they thought. I love turning challenging concepts into simple, engaging lessons and watching those 'aha!' moments happen.",
    philosophy:
      "I love making difficult concepts easy, keeping learning engaging, and growing through collaboration, feedback and new ideas to support every student.",
    expertise: [
      "Individualized Instructions",
      "Assessment & Progress Tracking",
      "Student Confidence Building",
      "Teaching & Mentorship",
    ],
    languages: ["English", "Hindi", "Urdu"],
    rating: 4.9,
    students: "190+",
  },
];

// Achievements per teacher (derived from their posters / qualifications).
// Editable — add or reword freely.
const ACHIEVEMENTS = {
  "khushi-chaubey": ["🏅 Gold Medalist — B.Sc", "Fundamentals & confidence specialist"],
  "arfa-zainab": ["Biotechnology & Genetics background", "Interactive, concept-first teaching"],
  "ruchi-arya": ["15+ years teaching experience", "Inquiry-based science expert"],
  "shahar-banu": ["MSc Botany, BSc.Ed", "Exam-focused, results-driven coaching"],
  "shalini-mahadik": ["MSc — Organic Chemistry", "Student-centered lesson design"],
  "shraddha-kamat": [
    "Certified — IIM Bangalore",
    "TTT+ certified — IIT Roorkee",
    "12+ years across all age groups",
  ],
  "diana-pereira": ["Vedic Math specialist", "Adaptive, multi-style teaching"],
  "gitartha-dutta": ["MSc — Chemistry", "Multi-science: Physics, Chemistry, Biology"],
  "preksha-sharma": ["Japanese JLPT / NAT trainer", "Game-based interactive learning"],
  "ridhima": ["Teaches Year 1–12", "Patient, empathetic mentor"],
  "rupanshi-kalra": ["Masters in Economics", "Multi-subject educator"],
  "muniba-elahi": ["Master's in English & Psychology", "Certified Phonics Teacher"],
};

// Attach the rectangular card `portrait` (cropped from the same poster as the
// circular avatar) and the `achievements` list to every teacher.
export const teachers = BASE.map((t) => ({
  ...t,
  portrait: t.image.replace("/avatars/", "/portraits/"),
  achievements: ACHIEVEMENTS[t.id] || [],
}));

export default teachers;
