// UK courses listing page. Shows the same UK exam course set (GCSE, iGCSE,
// 11+, A-Level, Common Entrance, SATs, etc.) as /uk/home's course tree
// section, in the fuller searchable/filterable catalog layout used by the
// AU /new-courses page. Data is fully static (no CRM), so no server fetch
// is needed here.
import dynamic from 'next/dynamic';
import { Header } from '@/components/UKHome/UKHomeHeader';
import UKCourseMain from '@/components/newcourseUK/UKCourseMain';

const UKHomePathwayFinderBanner = dynamic(() => import('@/components/UKHome/UKHomePathwayFinderBanner'));
const Footer = dynamic(() => import('@/components/UKHome/UKHomeFooter').then(m => ({ default: m.Footer })));

export const metadata = {
  title: 'Explore Our UK Courses | SuperSheldon UK',
};

export default function UKNewCourses() {
  return (
    <main>
      <Header />
      <UKCourseMain />
      <UKHomePathwayFinderBanner />
      <Footer />
    </main>
  );
}
