export interface Review {
  id: number;
  name: string;
  role: string;
  type: "learners" | "parents" | "teachers";
  date: string;
  rating: number;
  source: "Website" | "Google" | "Trustpilot";
  text: string;
  link: string;
  profilePic: string;
  handle?: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Aiden Smith",
    role: "Learner",
    type: "learners",
    date: "Feb 12, 2026",
    rating: 5,
    source: "Website",
    text: "**The SAT prep here is incredible!** My **math score jumped by 150 points** in just a few weeks. The mentors really know their stuff.",
    link: "/reviews/aiden-smith",
    profilePic: "/images/reviews/ethan.jpg",
    handle: "@aiden_sat"
  },
  {
    id: 2,
    name: "Sophia Johnson",
    role: "Learner",
    type: "learners",
    date: "Feb 10, 2026",
    rating: 5,
    source: "Google",
    text: "I used to struggle with ACT Science, but the **strategies I learned at SuperSheldon made it so much easier**. **Highly recommend!**",
    link: "/reviews/sophia-j",
    profilePic: "/images/reviews/charlotte.jpg",
    handle: "@sophia_act"
  },
  {
    id: 3,
    name: "Robert Davis",
    role: "Parent",
    type: "parents",
    date: "Feb 08, 2026",
    rating: 5,
    source: "Trustpilot",
    text: "**My son's confidence in Math has sky-rocketed.** The **1:1 mentorship is a game changer** for busy parents in the US.",
    link: "/reviews/robert-d",
    profilePic: "/images/reviews/daniel.jpg",
    handle: "@robert_d_dad"
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Parent",
    type: "parents",
    date: "Feb 05, 2026",
    rating: 4.5,
    source: "Website",
    text: "Excellent platform. The **transition to the US curriculum was seamless**, and the **quality of teaching is top-notch**.",
    link: "/reviews/emma-w",
    profilePic: "/images/reviews/emily.jpg",
    handle: "@emma_parent"
  },
  {
    id: 5,
    name: "Michael Brown",
    role: "Teacher",
    type: "teachers",
    date: "Feb 01, 2026",
    rating: 5,
    source: "Google",
    text: "As a mentor, I love how the platform **enables a deep connection with students**. The curriculum is **perfectly aligned with US standards**.",
    link: "/reviews/michael-b",
    profilePic: "/images/reviews/liam.png",
    handle: "@michael_mentor"
  },
  {
    id: 6,
    name: "Mrs. Divya",
    role: "Parent of Kiaan",
    type: "parents",
    date: "Apr 12, 2025",
    rating: 5,
    source: "Website",
    text: "He has had the best Math classes at SuperSheldon — the progress and confidence he has gained are amazing!",
    link: "#",
    profilePic: "/k1b.png",
    handle: "@mrs_divya"
  },
  {
    id: 7,
    name: "Mrs. Riya",
    role: "Parent of Ananya, Year 5",
    type: "parents",
    date: "Nov 23, 2024",
    rating: 5,
    source: "Website",
    text: "SuperSheldon's Math classes have been outstanding — Ananya truly enjoys learning and has shown great improvement.",
    link: "#",
    profilePic: "/k2g.png",
    handle: "@mrs_riya"
  },
  {
    id: 8,
    name: "Alex",
    role: "Year 4 Student, Australia",
    type: "learners",
    date: "Jan 15, 2025",
    rating: 5,
    source: "Website",
    text: "I joined SuperSheldon a couple of months ago and I'm really happy with my teacher — kind and patient, and explains Maths and English so I understand.",
    link: "#",
    profilePic: "/k4b.png",
    handle: "@alex_y4"
  },
  {
    id: 9,
    name: "David Mitchell",
    role: "Parent of Class 5 Student",
    type: "parents",
    date: "Apr 12, 2025",
    rating: 5,
    source: "Website",
    text: "SuperSheldon transformed how my son sees Math. He used to hate it, but now he runs to his laptop for the lessons. The gamified approach really works wonders!",
    link: "#",
    profilePic: "/new-site/testimonials/avatar_1_david.png",
    handle: "@david_m"
  },
  {
    id: 10,
    name: "Ayesha R.",
    role: "Year 10 Student",
    type: "learners",
    date: "Jul 2, 2025",
    rating: 5,
    source: "Website",
    text: "The combination of videos, practice tasks, and certificates really boosted my confidence. I actually look forward to every class now!",
    link: "#",
    profilePic: "/new-site/testimonials/avatar_2_ayesha.png",
    handle: "@ayesha_r"
  },
  {
    id: 11,
    name: "Kathy Vance",
    role: "Homeschooling Mom",
    type: "parents",
    date: "Nov 23, 2024",
    rating: 5,
    source: "Website",
    text: "I was looking for a curriculum that adapts to my child's pace. SuperSheldon's adaptive learning path is exactly what we needed. The progress reports are detailed and helpful.",
    link: "#",
    profilePic: "/new-site/testimonials/avatar_3_kethy.png",
    handle: "@kathy_v"
  },
  {
    id: 12,
    name: "Thomas Adebayo",
    role: "High School Senior",
    type: "learners",
    date: "Jan 15, 2025",
    rating: 5,
    source: "Website",
    text: "The coding modules are fantastic. I actually built my first app after just two weeks! It feels less like studying and more like building cool stuff.",
    link: "#",
    profilePic: "/new-site/testimonials/avatar_4_thomas.png",
    handle: "@thomas_a"
  },
  {
    id: 13,
    name: "Mr. Jenkins",
    role: "Science Teacher",
    type: "teachers",
    date: "Mar 10, 2025",
    rating: 5,
    source: "Website",
    text: "I recommend SuperSheldon to all my students for extra practice. The visual explanations for complex science concepts are better than any textbook I've seen.",
    link: "#",
    profilePic: "/new-site/testimonials/avatar_1_david.png",
    handle: "@mr_jenkins"
  }

];
