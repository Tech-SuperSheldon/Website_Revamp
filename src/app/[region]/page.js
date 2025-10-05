// 1. IMPORT ALL COMPONENTS

// Shared Component (from root 'components' folder)
import Header from '@/components/HeroHeaderNav';
import Footer from '@/components/Footer';

// Regional Component Imports (from 'components/Regional' subfolder)
import UK_Hero from '@/components/Regional/UK_Hero';
import US_Hero from '@/components/Regional/US_Hero';
import ME_Hero from '@/components/Regional/ME_Hero';
import AUS_Hero from '@/components/Regional/AUS_Hero';




// 2. DEFINE THE COMPONENT MAPPING
// Maps the URL segment to the component to be rendered
const RegionComponentMap = {
  uk: { Hero: UK_Hero },
  us: { Hero: US_Hero },
  me: { Hero: ME_Hero },
  aus: { Hero: AUS_Hero },
};


// 3. MAIN PAGE COMPONENT
export default function RegionPage({ params }) {
  // Extract and normalize the region key from the URL (e.g., 'uk', 'us')
  const regionKey = params.region.toLowerCase(); 

  // Look up the components for the current region
  const RegionalComponents = RegionComponentMap[regionKey];

  // --- Handle 404/Unsupported Region ---
  if (!RegionalComponents) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-5xl font-bold text-red-600">404</h1>
        <p className="text-xl mt-3">Region Not Supported: /{regionKey}</p>
        <a href="/" className="mt-6 text-blue-600 hover:underline">Go to Home</a>
      </div>
    );
  }

  // Destructure the specific component to render
  const { Hero: RegionalHero } = RegionalComponents;

  return (
    <>
      {/* Shared Component (Header) */}
      <Header/>

      <main>
        {/* <h1 className="text-4xl font-light mb-8 text-center">
          Welcome to the {regionKey.toUpperCase()} experience!
        </h1> */}
        
        {/* DYNAMICALLY RENDER THE REGIONAL HERO COMPONENT */}
        <RegionalHero /> 
        
        {/* SHARED CONTENT BLOCK (Constant across all regions) */}
        {/* <div className="mt-12 p-6 bg-white border border-gray-200 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-3"></h3>
          <p className="text-gray-700">
            This section contains content that is identical across all four regions.
          </p>
        </div> */}
        
      </main>
      <Footer/>
    </>
  );
}