// "use client"
// import React from 'react';
// import { ArrowUp, ArrowRight } from 'lucide-react';

// const UKPromote = () => {
//   return (
//     <div className="bg-gray-50 font-inter min-h-screen py-16 md:py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
          
//           <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            
//             <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">
//               Why Super Sheldon
//             </p>

//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
//               Boost Your UK Exam Odds with a <span className="text-indigo-700">Proven Success Rate</span>
//             </h1>

//             <p className="mt-4 text-lg text-gray-600">
//               Boost Your UK Exam Success with a Proven Track Record
//             </p>

//             <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-8 sm:gap-12">
              
//               <div className="text-center lg:text-left">
//                 <div className="flex items-center justify-center lg:justify-start text-5xl font-bold text-indigo-700">
//                   4x
//                   <ArrowUp className="w-8 h-8 ml-2 text-green-500" />
//                 </div>
//                 <p className="mt-1 text-base text-gray-500">
//                   Increase Chance
//                 </p>
//               </div>

//               <div className="text-center lg:text-left">
//                 <div className="flex items-center justify-center lg:justify-start text-5xl font-bold text-indigo-700">
//                   70%
//                   <ArrowUp className="w-8 h-8 ml-2 text-green-500" />
//                 </div>
//                 <p className="mt-1 text-base text-gray-500">
//                   Admission to top university
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="lg:w-1/2 relative flex justify-center lg:justify-end min-h-[350px] w-full mt-10 lg:mt-0">
//             <div className="absolute top-0 right-0 w-full h-full">
//               <div className="absolute top-10 left-10 w-64 h-80 bg-gray-200 opacity-60 rounded-[30px] transform -rotate-6 shadow-xl hidden md:block" />
//               <div className="absolute top-5 left-5 w-64 h-80 bg-gray-300 opacity-80 rounded-[30px] transform -rotate-3 shadow-2xl hidden md:block" />
//             </div>

//             <div className="relative z-10 w-80 h-[400px] bg-white rounded-[30px] shadow-2xl overflow-hidden border-4 border-white transform hover:scale-[1.02] transition duration-300 ease-in-out">
//               <img
//                 src="https://placehold.co/400x500/3A3A3A/F0F0F0/png?text=YOUR+AI+VIDEO+MOCKUP"
//                 alt="AI Tutor session preview"
//                 className="w-full h-full object-cover"
//                 onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x500/3A3A3A/F0F0F0/png?text=AI+Mockup"; }}
//               />
//               <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-4">
                
//                 <div className="flex justify-end space-x-2 mb-3">
//                   <div className="bg-white/80 backdrop-blur-sm text-[10px] text-gray-800 font-semibold px-2 py-1 rounded-full shadow-md pointer-events-auto">User Intent</div>
//                   <div className="bg-white/80 backdrop-blur-sm text-[10px] text-gray-800 font-semibold px-2 py-1 rounded-full shadow-md pointer-events-auto">Contact</div>
//                 </div>

                

//                 <div className="absolute bottom-4 left-4 right-4 text-white p-2 bg-black/30 backdrop-blur-sm rounded-xl">
//                     <div className="flex items-center space-x-3">
//                         <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center cursor-pointer pointer-events-auto">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 text-indigo-700">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25h15.75M3 12h15.75m-15.75 3.75H18" />
//                             </svg>
//                         </div>
                        
//                         <div className="flex-grow">
//                             <div className="w-full h-1 bg-white/50 rounded-full mb-1">
//                                 <div className="w-[60%] h-full bg-white rounded-full"></div>
//                             </div>
//                             <div className="flex justify-between text-xs font-medium">
//                                 <span>0:06</span>
//                                 <span>0:11</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="mt-20 lg:mt-32 w-full">
//           <div className="bg-indigo-700 hover:bg-indigo-800 transition duration-300 shadow-2xl rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            
//             <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white text-center md:text-left">
//               Access your AI Teacher Session now!
//             </p>

//             <button className="flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-pink-600 hover:bg-pink-700 rounded-xl shadow-lg transition duration-300 transform hover:scale-[1.05] active:scale-[0.98] whitespace-nowrap">
//               book a free session 
//               <ArrowRight className="w-5 h-5 ml-2" />
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default UKPromote;







"use client"
import React from 'react';
import Image from 'next/image';
import { ArrowUp, ArrowRight } from 'lucide-react';

const UKPromote = () => {
  return (
    <div className=" font-inter min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
          
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">
              Why Super Sheldon
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Boost Your UK Exam Odds with a <span className="text-indigo-700">Proven Success Rate</span>
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Boost Your UK Exam Success with a Proven Track Record
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-8 sm:gap-12">
              
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start text-5xl font-bold text-indigo-700">
                  4x
                  <ArrowUp className="w-8 h-8 ml-2 text-green-500" />
                </div>
                <p className="mt-1 text-base text-gray-500">
                  Increase Chance
                </p>
              </div>

              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start text-5xl font-bold text-indigo-700">
                  70%
                  <ArrowUp className="w-8 h-8 ml-2 text-green-500" />
                </div>
                <p className="mt-1 text-base text-gray-500">
                  Admission to top university
                </p>
              </div>
            </div>
          </div>

          {/* Card Section */}
          <div className="lg:w-1/2 relative flex justify-center lg:justify-end min-h-[350px] w-full mt-10 lg:mt-0">
            
            {/* Peek Cards Behind */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {/* Top peek card */}
              <div className="absolute -top-6 left-10 w-64 h-80 hidden md:block transform -rotate-3 shadow-xl z-10">
                <Image
                  src="/"
                  alt="Top Peek Card"
                  fill
                  className="rounded-[30px] object-cover"
                />
              </div>
              {/* Left peek card */}
              <div className="absolute top-10 -left-6 w-64 h-80 hidden md:block transform -rotate-6 shadow-2xl z-20">
                <Image
                  src="/"
                  alt="Left Peek Card"
                  fill
                  className="rounded-[30px] object-cover"
                />
              </div>
            </div>

            {/* Main Card */}
            <div className="relative z-30 w-80 h-[400px] rounded-[30px] shadow-2xl overflow-hidden border-4 border-white transform hover:scale-[1.02] transition duration-300 ease-in-out">
              <Image
                src="/"
                alt="Main Card"
                fill
                className="object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-4">

                
              </div>
            </div>

          </div>
        </div>
        
        <div className="mt-20 lg:mt-32 w-full">
          <div className="bg-indigo-700 hover:bg-indigo-800 transition duration-300 shadow-2xl rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white text-center md:text-left">
              Access your AI Teacher Session now!
            </p>

            <button className="flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-pink-600 hover:bg-pink-700 rounded-xl shadow-lg transition duration-300 transform hover:scale-[1.05] active:scale-[0.98] whitespace-nowrap">
              book a free session 
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UKPromote;
