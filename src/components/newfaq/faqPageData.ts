// Comprehensive FAQ content for the dedicated /faq help-center page.
// Kept separate from ../faqData.ts (which powers the shorter on-home
// <NSFAQ/> accordion) so the home page stays concise while this page can
// be exhaustive. Same shape: { title, subtitle, faqs: [{ question, answer }] }.
export type FaqItem = { question: string; answer: string };
export type FaqSection = { title: string; subtitle: string; faqs: FaqItem[] };

export const faqSections: FaqSection[] = [
  {
    title: "Getting Started",
    subtitle: "New to SuperSheldon? Start here.",
    faqs: [
      {
        question: "How do I enrol my child in a SuperSheldon course?",
        answer:
          "You can enrol in a few minutes. Book a free trial class through our website, pick the program that fits your child's year and exam goal, and our team will confirm a schedule that works for you. No long forms or upfront commitment required.",
      },
      {
        question: "Is there a free trial class available?",
        answer:
          "Yes. We offer a free, no-obligation trial class so you and your child can experience a real session, meet a teacher, and see our teaching style before enrolling. You can book one anytime from the 'Try a Free Class' button.",
      },
      {
        question: "What happens during the free trial class?",
        answer:
          "During the trial, our teacher assesses your child's current level, walks through a sample lesson, and shows how our interactive, exam-focused approach works. Afterwards you'll receive feedback and a recommended learning pathway.",
      },
      {
        question: "What age groups and year levels do you cover?",
        answer:
          "Our programs are tailored for students from Year 3 to Year 12, covering early foundation levels right through to advanced exam preparation for NAPLAN, ICAS, Selective School, and HSC across Australia.",
      },
      {
        question: "Does my child need prior experience before joining?",
        answer:
          "Not at all. Our courses adapt to each student's current level—whether they're a complete beginner or already advanced. The trial class helps us place your child at the right starting point.",
      },
      {
        question: "How soon can classes begin after signing up?",
        answer:
          "In most cases classes can start within a few days of your trial, once we've matched your child with a suitable teacher and agreed on a weekly schedule.",
      },
    ],
  },
  {
    title: "Class Experience",
    subtitle: "Understand how our classes work day to day.",
    faqs: [
      {
        question: "How are SuperSheldon classes conducted?",
        answer:
          "Classes are 100% online and highly interactive—either one-on-one or in small groups—with real exam-style practice, live discussion, and engaging activities that keep students focused.",
      },
      {
        question: "What is the difference between one-on-one and small group classes?",
        answer:
          "One-on-one classes are fully personalised to your child's pace and weak areas. Small group classes keep numbers low so every student still gets attention, while adding peer discussion and healthy motivation. We'll recommend the best fit during your trial.",
      },
      {
        question: "How long is each class and how often are they held?",
        answer:
          "Most sessions run around 45–60 minutes, typically once or twice a week depending on the program and how close the exam is. We'll design a cadence that suits your child's routine and goals.",
      },
      {
        question: "Is there any homework or outside practice required?",
        answer:
          "Yes. To maximise results, students are given structured practice tasks and mock papers between classes. These reinforce learning and simulate real exam conditions so progress compounds week over week.",
      },
      {
        question: "What if my child misses a class?",
        answer:
          "Just let us know in advance and we'll reschedule the session where possible. Missed content is also covered through the notes and worksheets we share after each class.",
      },
      {
        question: "Can students ask questions during class?",
        answer:
          "Absolutely. Our classes are built around interaction—students are encouraged to ask questions, work through problems live with the teacher, and get instant feedback rather than passively watching.",
      },
      {
        question: "How many students are in a small group class?",
        answer:
          "Group sizes are deliberately kept small so each student receives meaningful individual attention and no one gets left behind.",
      },
    ],
  },
  {
    title: "Courses & Exams",
    subtitle: "NAPLAN, ICAS, Selective School, HSC and curriculum details.",
    faqs: [
      {
        question: "Which exams and programs do you prepare students for?",
        answer:
          "We specialise in NAPLAN, ICAS, Selective School entry exams, and HSC, alongside core Maths and English tutoring from Year 3 to Year 12. Each program is exam-specific and aligned to the Australian curriculum.",
      },
      {
        question: "How is the curriculum structured?",
        answer:
          "Each course is broken into clear units and chapters that build progressively. Students move from foundational concepts to advanced, exam-style application, with regular checkpoints to confirm mastery before moving on.",
      },
      {
        question: "Do you follow the Australian curriculum?",
        answer:
          "Yes. Our content is aligned with the Australian curriculum and the specific requirements of each target exam, so classroom learning and exam preparation reinforce each other.",
      },
      {
        question: "Can my child prepare for more than one exam at a time?",
        answer:
          "Yes. Many students prepare for overlapping goals—such as Selective School and NAPLAN—at once. We build a combined plan that manages workload sensibly so your child isn't overwhelmed.",
      },
      {
        question: "Do you provide practice papers and mock exams?",
        answer:
          "Yes. Students receive exam-style practice papers and full mock exams under realistic conditions, followed by detailed feedback so they know exactly what to improve.",
      },
      {
        question: "Which subjects do you cover?",
        answer:
          "Our core focus is Maths and English, plus the specific reasoning and writing skills tested in ICAS, Selective, and NAPLAN exams. HSC students receive subject-specific support aligned to their courses.",
      },
      {
        question: "How do you tailor the course to my child's goals?",
        answer:
          "After the trial assessment we build a personalised learning pathway around your child's target exam, current level, and timeline, then adjust it as they progress.",
      },
    ],
  },
  {
    title: "Teachers & Learning",
    subtitle: "Meet the people guiding your child's journey.",
    faqs: [
      {
        question: "Who are the SuperSheldon teachers?",
        answer:
          "Our teachers are qualified specialists with years of experience preparing students for Australian exams. They're selected for both subject expertise and their ability to make learning engaging for children.",
      },
      {
        question: "How will teachers support my child's exam preparation?",
        answer:
          "Teachers provide personalised feedback, exam strategies, and targeted, exam-focused practice. They track each student's strengths and gaps and adapt every session accordingly.",
      },
      {
        question: "How do teachers handle difficult or complex topics?",
        answer:
          "Teachers break complex topics into simple, easy-to-understand steps and provide extra practice until the concept is fully mastered—never rushing ahead before your child is ready.",
      },
      {
        question: "Will my child have the same teacher each week?",
        answer:
          "We aim for consistency by matching your child with a regular teacher who gets to know their learning style, which builds trust and momentum over time.",
      },
      {
        question: "Can I request a different teacher if it's not the right fit?",
        answer:
          "Yes. If the match isn't working, just contact our team and we'll arrange a more suitable teacher. Your child's comfort and progress come first.",
      },
      {
        question: "How do teachers keep young students engaged online?",
        answer:
          "Through interactive activities, live problem-solving, encouragement, and a supportive pace. Sessions are designed to feel active and rewarding rather than like a lecture.",
      },
      {
        question: "Do parents get updates on their child's progress?",
        answer:
          "Yes. Teachers share regular feedback and notes on progress so you always know how your child is doing and where they're improving.",
      },
    ],
  },
  {
    title: "Pricing & Scheduling",
    subtitle: "Fees, payments, and flexible timings.",
    faqs: [
      {
        question: "How much do the courses cost?",
        answer:
          "Pricing depends on the program, year level, and whether you choose one-on-one or small group classes. Book a free trial and our team will share a clear, transparent quote tailored to your child's plan—no hidden fees.",
      },
      {
        question: "Are there any hidden charges?",
        answer:
          "No. We believe in transparent pricing. The fee we quote covers your classes and learning materials, so there are no surprise costs later.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We support convenient online payment options. Our team will walk you through the available methods and any instalment plans when you enrol.",
      },
      {
        question: "Can I pay monthly instead of all at once?",
        answer:
          "Yes, flexible payment options are available for most programs. Speak with our team and we'll set up a plan that works for your family.",
      },
      {
        question: "How flexible is the class schedule?",
        answer:
          "Very flexible. Because classes are online, we work around your child's school routine and time zone to find slots that fit—including evenings and weekends where available.",
      },
      {
        question: "Can I reschedule or cancel a class if needed?",
        answer:
          "Yes. Parents can easily reschedule or cancel classes with advance notice, so your child's preparation stays on track around family and school commitments.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "We're committed to a fair experience. Please review our refund policy or contact our support team, and we'll be happy to explain the options for your situation.",
      },
    ],
  },
  {
    title: "Technology & Privacy",
    subtitle: "Setup, devices, safety, and data protection.",
    faqs: [
      {
        question: "What devices or software are needed for classes?",
        answer:
          "A laptop or tablet with a stable internet connection, Zoom (or our online classroom platform), and a headset is all that's required. We'll help you get set up before the first class.",
      },
      {
        question: "Do I need any technical experience to get started?",
        answer:
          "No technical experience is needed. Our platform is simple to join with a single link, and our team guides you through the setup so the first class runs smoothly.",
      },
      {
        question: "What internet speed is recommended?",
        answer:
          "A standard home broadband connection is sufficient for smooth video and audio. If connectivity ever drops, the teacher will help your child rejoin quickly.",
      },
      {
        question: "How is my child's data and privacy protected?",
        answer:
          "We strictly follow international privacy standards. All student data is securely stored, and class environments are fully protected so your child learns in a safe space.",
      },
      {
        question: "Are the online classes safe for young children?",
        answer:
          "Yes. Classes are held in secure, private virtual rooms with vetted teachers, and our safeguarding practices are designed specifically with young learners in mind.",
      },
      {
        question: "Can I get a recording of the classes for my child?",
        answer:
          "To maintain student privacy and a safe class environment, we do not share class recordings. Instead, detailed notes and practice worksheets are provided after every class so nothing is lost.",
      },
      {
        question: "Will my personal information be shared with third parties?",
        answer:
          "No. Your personal and payment details are kept confidential and are never sold or shared with unrelated third parties. See our Privacy Policy for full details.",
      },
    ],
  },
];
