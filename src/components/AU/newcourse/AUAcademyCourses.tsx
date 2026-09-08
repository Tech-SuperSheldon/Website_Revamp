"use client";

// AU academy pages' course catalogue. Same dataset and card as
// /au/new-courses, so the brochure download and the course detail links
// behave identically.
import { coursesData } from "@/lib/course-data-au";
import AcademyCourseGrid from "@/components/academy/AcademyCourseGrid";
import DownloadBrochureButton from "./DownloadBrochureButton";

export default function AUAcademyCourses() {
  return (
    <AcademyCourseGrid
      groups={coursesData}
      hrefBase="/au/new-courses"
      renderBrochure={(course) => (
        <DownloadBrochureButton course={course} variant="compact" />
      )}
    />
  );
}
