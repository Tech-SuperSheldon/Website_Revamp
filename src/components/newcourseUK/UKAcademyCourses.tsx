"use client";

// UK academy pages' course catalogue. Same dataset and card as
// /uk/new-courses, so the brochure download and the course detail links
// behave identically.
import { coursesData } from "@/lib/course-data-uk";
import AcademyCourseGrid from "@/components/academy/AcademyCourseGrid";
import UKDownloadBrochureButton from "./UKDownloadBrochureButton";

export default function UKAcademyCourses() {
  return (
    <AcademyCourseGrid
      groups={coursesData}
      hrefBase="/uk/new-courses"
      renderBrochure={(course) => (
        <UKDownloadBrochureButton course={course} variant="compact" />
      )}
    />
  );
}
