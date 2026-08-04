import { assetUrl } from "./assetUrl";

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  image: string;
  video?: string;
}


//unused
/** Shared teacher roster — used by NSTeacherCarousel and NSCourseSidebar */
export const teachers: Teacher[] = [
  {
    id: 1,
    name: "Ashita Gunjikar",
    subject: "Mathematics Teacher",
    image: "/course/Teacher1.webp",
    video: assetUrl("/videos/video1.mp4"),
  },
  {
    id: 2,
    name: "Sofia Martinez",
    subject: "English Teacher",
    image: "/course/Teacher2.png",
  },
  {
    id: 3,
    name: "Avishikta Dutta",
    subject: "Chemistry Teacher",
    image: "/course/Teacher3.webp",
  },
  {
    id: 4,
    name: "James Liu",
    subject: "Science Teacher",
    image: "/course/Teacher4.png",
  },
  {
    id: 5,
    name: "Priya Sharma",
    subject: "NAPLAN Specialist",
    image: "/course/Teacher5.webp",
  },
  {
    id: 6,
    name: "Oliver Nguyen",
    subject: "Maths & Physics",
    image: "/course/Teacher6.png",
  },
  {
    id: 7,
    name: "Amelia Chen",
    subject: "English & Writing",
    image: "/course/Teacher7.png",
  },
  {
    id: 8,
    name: "Riya Kapoor",
    subject: "Selective School Prep",
    image: "/course/Teacher8.png",
  },
  {
    id: 10,
    name: "Priyanshi Agrawal",
    subject: "AI/ML Python Teacher",
    image: "/course/Teacher10.webp",
  },
];

/** Named teachers only (those with a non-empty name) */
export const namedTeachers = teachers.filter((t) => t.name.trim() !== "");
