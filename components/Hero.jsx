// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";
// // import countries from "world-countries";
// // import { Changa_One } from "next/font/google";
// // import {useEffect } from "react";
// // import GlossyButton from "./GlossyButton";


// // // Pre-process countries (flag + name + dialCode)
// // const countryOptions = countries.map((c) => ({
// //   code: c.cca2,
// //   name: c.name.common,
// //   dialCode: c.idd?.root
// //     ? `${c.idd.root}${c.idd.suffixes ? c.idd.suffixes[0] : ""}`
// //     : "",
// //   flag: String.fromCodePoint(
// //     ...[...c.cca2.toUpperCase()].map((ch) => ch.charCodeAt(0) + 127397)
// //   ),
// // }));

// // const countryPhoneCodes = {AF: "+93",AL: "+355",DZ: "+213",AS: "+1-684",AD: "+376",AO: "+244",AI: "+1-264",AG: "+1-268",AR: "+54", AM: "+374",AW: "+297",
// //   AU: "+61",AT: "+43",AZ: "+994",BS: "+1-242",BH: "+973",BD: "+880",BB: "+1-246",BY: "+375",
// //   BE: "+32",BZ: "+501",BJ: "+229",BM: "+1-441",BT: "+975",BO: "+591",BA: "+387",BW: "+267",
// //   BR: "+55",IO: "+246",BN: "+673",BG: "+359",BF: "+226",BI: "+257",KH: "+855",CM: "+237",
// //   CA: "+1",CV: "+238",KY: "+1-345",CF: "+236",TD: "+235",CL: "+56",CN: "+86",CX: "+61",CC: "+61",
// //   CO: "+57",KM: "+269",CD: "+243",CG: "+242",CK: "+682",CR: "+506",CI: "+225",HR: "+385",CU: "+53",
// //   CY: "+357",CZ: "+420",DK: "+45",DJ: "+253",DM: "+1-767",DO: "+1-809", // also +1-829TP: "+670",
// //   EC: "+593",EG: "+20",SV: "+503",GQ: "+240",ER: "+291",EE: "+372",ET: "+251",FK: "+500",
// //   FO: "+298",FJ: "+679",FI: "+358",FR: "+33",GF: "+594",PF: "+689",TF: "+262",GA: "+241",
// //   GM: "+220",GE: "+995",DE: "+49",GH: "+233",GI: "+350",GB: "+44",GR: "+30",GL: "+299",GD: "+1-473",
// //   GP: "+590",
// //   GU: "+1-671",
// //   GT: "+502",
// //   GN: "+224",
// //   GW: "+245",
// //   GY: "+592",
// //   HT: "+509",
// //   HM: "+672",
// //   VA: "+39",
// //   HN: "+504",
// //   HK: "+852",
// //   HU: "+36",
// //   IS: "+354",
// //   IN: "+91",
// //   ID: "+62",
// //   IR: "+98",
// //   IQ: "+964",
// //   IE: "+353",
// //   IL: "+972",
// //   IT: "+39",
// //   JM: "+1-876",
// //   JP: "+81",
// //   JO: "+962",
// //   KZ: "+7",
// //   KE: "+254",
// //   KI: "+686",
// //   KP: "+850",
// //   KR: "+82",
// //   KW: "+965",
// //   KG: "+996",
// //   LA: "+856",
// //   LV: "+371",
// //   LB: "+961",
// //   LS: "+266",
// //   LR: "+231",
// //   LY: "+218",
// //   LI: "+423",
// //   LT: "+370",
// //   LU: "+352",
// //   MO: "+853",
// //   MK: "+389",
// //   MG: "+261",
// //   MW: "+265",
// //   MY: "+60",
// //   MV: "+960",
// //   ML: "+223",
// //   MT: "+356",
// //   MH: "+692",
// //   MQ: "+596",
// //   MR: "+222",
// //   MU: "+230",
// //   YT: "+269",
// //   MX: "+52",
// //   FM: "+691",
// //   MD: "+373",
// //   MC: "+377",
// //   MN: "+976",
// //   MS: "+1-664",
// //   MA: "+212",
// //   MZ: "+258",
// //   MM: "+95",
// //   NA: "+264",
// //   NR: "+674",
// //   NP: "+977",
// //   NL: "+31",
// // };


// // //StatCard Component
// // const StatCard = ({ iconSrc, value, label }) => (
// //   <div className="flex items-center space-x-3">
// //     <div className="bg-[#F9D4AB] p-2 rounded-full">
// //       <Image src={iconSrc} alt={label} width={28} height={28} />
// //     </div>
// //     <div>
// //       <p className="text-xl md:text-2xl font-bold text-[#1D2026]">{value}</p>
// //       <p className="text-xs md:text-sm text-[#4E5566]">{label}</p>
// //     </div>
// //   </div>
// // );

// // export default function Hero() {
// //   const [phone, setPhone] = useState("");
// //   const [country, setCountry] = useState("+370");
// //   const [error, setError] = useState("");
// //   const [userCountryCode , setUserCountryCode] = useState("+1") ;

// //   const getUserCountryPhoneCode = async()=>{
// //     const response = await fetch('https://iplocate.io/api/lookup?apikey=0e7ca4b669dc85fbc604c1776a93d3e5') ;
// //     const data = await response.json() ;
// //     setUserCountryCode(countryPhoneCodes[data.country_code]) ;
// //   }

// //   getUserCountryPhoneCode() ;

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!phone.match(/^[0-9]{6,15}$/)) {
// //       setError("Please enter a valid phone number.");
// //       return;
// //     }
// //     setError("");
// //     // TODO: connect API / handle form
// //   };

// //   const navigate = useRouter();

// //   const handleForm= (()=>{
// //     if(phone.match(/^[0-9]{6,15}$/))
// //     navigate.push("https://forms.gle/csc94GLG3tEDit6N6") ;
// //   })


// // // highlight options for title
// // // const highlightOptions = [
// // //   { text: "SATs.", color: "#FFD700" },
// // //   { text: "ICAS.", color: "#ff8800ff" },
// // //   { text: "NAPLAN.", color: "#FF1493" },
// // // ];

// // // const [highlight, setHighlight] = useState(highlightOptions[0]);


// // // useEffect(() => {
// // //   const random = Math.floor(Math.random() * highlightOptions.length);
// // //   setHighlight(highlightOptions[random]);
// // // }, []);

// // const highlightOptions = [
// //   { text: "SATs.", color: "#FFD700" },
// //   { text: "ICAS.", color: "#ff8800ff" },
// //   { text: "NAPLAN.", color: "#FF1493" },
// // ];

// // const [highlightIndex, setHighlightIndex] = useState(0);

// // useEffect(() => {
// //   const interval = setInterval(() => {
// //     setHighlightIndex((prevIndex) => (prevIndex + 1) % highlightOptions.length);
// //   }, 7000); // every 7 sec

// //   return () => clearInterval(interval); // cleanup on unmount
// // }, []);

// // const highlight = highlightOptions[highlightIndex];

// //   return (
// //     <div  id="home" className="relative w-full overflow-hidden">
// //       {/* Content */}
// //       <div className="relative grid mt-0 px-4 sm:px-10 grid-cols-1 lg:grid-cols-2 gap-x-8 items-center">
// //         {/* Left Column */}
// //         <div className="space-y-8 md:space-y-10 flex flex-col justify-center pt-5 ">
// //           <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight font-quicksand">
// //             <span>Smart Learning, Smarter Results –From School to </span>
// //               <span style={{ color: highlight.color }}>{highlight.text}</span>
// //           </h1>

// //           {/* Phone Form */}
// //           <form
// //             className="bg-[#EDE8E1] p-6 rounded-xl shadow-md max-w-xl flex flex-col gap-3"
// //             onSubmit={handleSubmit}
// //           >
// //             <label
// //               className="text-xl text-[#494e5e] font-medium mb-1"
// //               htmlFor="phone"
// //             >
// //               Experience Smarter Learning – <label className="text-md text-[#FF8C00]">First Class is Free!</label>
// //             </label>
// //             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
// //               <div className="flex items-center justify-center flex-grow px-4 py-2 rounded-lg focus:ring-[#FF8C00] focus:border-[#FF8C00] text-sm outline-none">
// //                 <div className="text-black text-center pt-2 w-10 h-10 bg-white rounded-s-lg border-e border-[#E0E0E0]">{userCountryCode}</div>
// //                 <input id="phone" type="tel" placeholder="Phone number"
// //                   value={phone} onChange={(e) => setPhone(e.target.value)}
// //                   className="flex-grow px-4 py-2.5 rounded-e-lg text-sm outline-none"
// //                 />
// //               </div>
              
// //               <GlossyButton
// //               onClick={handleForm}
// //                 type="submit"
// //                 // className="px-6 py-2 bg-gradient-to-r from-[#FFC93C] to-[#FF8C00] hover:from-[#E6AE2C] hover:to-[#CC7000] text-white rounded-full font-bold text-sm shadow-md transition-colors duration-300 hover:scale-105"
// //               >
// //                 Try a Free Class
// //               </GlossyButton>
// //             </div>
// //             {error && <p className="text-red-500 text-xs">{error}</p>}
// //           </form>

// //           {/* Stats */}
// //           <div className="flex flex-wrap gap-6 md:gap-8 pt-0">
// //             <StatCard
// //               iconSrc="/CircleWavyCheck.png"
// //               value="100k"
// //               label="Learners"
// //             />
// //             <StatCard
// //               iconSrc="/GlobeHemisphereWest.png"
// //               value="10+"
// //               label="Country Language"
// //             />
// //             <StatCard
// //               iconSrc="/Users.png"
// //               value="99.9%"
// //               label="Success Rate"
// //             />
// //           </div>
// //         </div>

// //         {/* Right Column */}
// //         <div className="relative flex justify-center items-center mt-10 lg:mt-20">
// //           <Image
// //           // hero Image
// //             src="/newheroimg.png"
// //             alt="Happy students showing A+ grade"
// //             width={800}
// //             height={800}
// //             className="max-w-full h-full"
// //             priority
// //             sizes="(max-width: 768px) 100vw, 50vw"
// //           />

// //           {/* Members Card */}
// //           <div className="absolute bottom-32 -translate-y-2 right-24 bg-white p-3 rounded-full shadow-lg flex items-center space-x-2 border-2 border-white animate-float">
// //             <span className="font-bold text-[#1D2026] text-lg">500k+</span>
// //             <span className="text-[#4E5566] text-xs">Members</span>
// //             <div className="flex -space-x-3">
// //               <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-[#FFD700] flex items-center justify-center">
// //                 <Image src="/Users.png" alt="User icon" width={20} height={20} />
// //               </div>
// //               <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-[#FF8D28] flex items-center justify-center">
// //                 <Image
// //                   src="/CircleWavyCheck.png"
// //                   alt="Verified icon"
// //                   width={20}
// //                   height={20}
// //                 />
// //               </div>
// //               <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-[#FF6636] flex items-center justify-center">
// //                 <Image
// //                   src="/GlobeHemisphereWest.png"
// //                   alt="Globe icon"
// //                   width={20}
// //                   height={20}
// //                 />
// //               </div>
// //             </div>
// //           </div>





// //           {/* Floating Logos with Animations */}
// //           <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 z-10 animate-float1">
// //             <Image
// //               src="/floating-icons/star.png"
// //               alt="Star icon"
// //               width={100}
// //               height={100}
// //             />
// //           </div>
// //           <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 z-10 animate-float1">
// //             <Image
// //               src="/floating-icons/book.png"
// //               alt="Book icon"
// //               width={100}
// //               height={100}
// //             />
// //           </div>
// //           <div className="absolute bottom-32 left-0 translate-x-1/4 translate-y-1/4 z-10 animate-float1">
// //             <Image
// //               src="/floating-icons/graph.png"
// //               alt="Graph icon"
// //               width={100}
// //               height={100}
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Inline Animations */}
// //       <style jsx global>{`
// //         @keyframes float1 {
// //           0%,
// //           100% {
// //             transform: translate(0, 0);
// //           }
// //           50% {
// //             transform: translate(-10px, 12px) scale(1.08);
// //           }
// //         }
// //         @keyframes float2 {
// //           0%,
// //           100% {
// //             transform: translate(0, 0);
// //           }
// //           50% {
// //             transform: translate(14px, -10px) scale(1.05);
// //           }
// //         }
// //         @keyframes float3 {
// //           0%,
// //           100% {
// //             transform: translate(0, 0);
// //           }
// //           50% {
// //             transform: translate(-8px, 10px) scale(1.07);
// //           }
// //         }
// //           @keyframes float4 {
// //           0%,
// //           100% {
// //             transform: translate(0, 0);
// //           }
// //           50% {
// //             transform: translate(-10px, 12px) scale(1.08);
// //           }
// //         }
// //         .animate-float1 {
// //           animation: float1 4s ease-in-out infinite;
// //         }
// //         .animate-float2 {
// //           animation: float2 5s ease-in-out infinite;
// //         }
// //         .animate-float3 {
// //           animation: float3 6s ease-in-out infinite;
// //         }
// //           .animate-float4 {
// //           animation: float3 6s ease-in-out infinite;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }






// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import countries from "world-countries";
// import { useEffect } from "react";
// import GlossyButton from "./GlossyButton";

// // Pre-process countries (flag + name + dialCode)
// const countryOptions = countries.map((c) => ({
//   code: c.cca2,
//   name: c.name.common,
//   dialCode: c.idd?.root
//     ? `${c.idd.root}${c.idd.suffixes ? c.idd.suffixes[0] : ""}`
//     : "",
//   flag: String.fromCodePoint(
//     ...[...c.cca2.toUpperCase()].map((ch) => ch.charCodeAt(0) + 127397)
//   ),
// }));

// const countryPhoneCodes = {
//   AF: "+93", AL: "+355", DZ: "+213", AS: "+1-684", AD: "+376", AO: "+244", 
//   AI: "+1-264", AG: "+1-268", AR: "+54", AM: "+374", AW: "+297", AU: "+61", 
//   AT: "+43", AZ: "+994", BS: "+1-242", BH: "+973", BD: "+880", BB: "+1-246", 
//   BY: "+375", BE: "+32", BZ: "+501", BJ: "+229", BM: "+1-441", BT: "+975", 
//   BO: "+591", BA: "+387", BW: "+267", BR: "+55", IO: "+246", BN: "+673", 
//   BG: "+359", BF: "+226", BI: "+257", KH: "+855", CM: "+237", CA: "+1", 
//   CV: "+238", KY: "+1-345", CF: "+236", TD: "+235", CL: "+56", CN: "+86", 
//   CX: "+61", CC: "+61", CO: "+57", KM: "+269", CD: "+243", CG: "+242", 
//   CK: "+682", CR: "+506", CI: "+225", HR: "+385", CU: "+53", CY: "+357", 
//   CZ: "+420", DK: "+45", DJ: "+253", DM: "+1-767", DO: "+1-809", EC: "+593", 
//   EG: "+20", SV: "+503", GQ: "+240", ER: "+291", EE: "+372", ET: "+251", 
//   FK: "+500", FO: "+298", FJ: "+679", FI: "+358", FR: "+33", GF: "+594", 
//   PF: "+689", TF: "+262", GA: "+241", GM: "+220", GE: "+995", DE: "+49", 
//   GH: "+233", GI: "+350", GB: "+44", GR: "+30", GL: "+299", GD: "+1-473", 
//   GP: "+590", GU: "+1-671", GT: "+502", GN: "+224", GW: "+245", GY: "+592", 
//   HT: "+509", HM: "+672", VA: "+39", HN: "+504", HK: "+852", HU: "+36", 
//   IS: "+354", IN: "+91", ID: "+62", IR: "+98", IQ: "+964", IE: "+353", 
//   IL: "+972", IT: "+39", JM: "+1-876", JP: "+81", JO: "+962", KZ: "+7", 
//   KE: "+254", KI: "+686", KP: "+850", KR: "+82", KW: "+965", KG: "+996", 
//   LA: "+856", LV: "+371", LB: "+961", LS: "+266", LR: "+231", LY: "+218", 
//   LI: "+423", LT: "+370", LU: "+352", MO: "+853", MK: "+389", MG: "+261", 
//   MW: "+265", MY: "+60", MV: "+960", ML: "+223", MT: "+356", MH: "+692", 
//   MQ: "+596", MR: "+222", MU: "+230", YT: "+269", MX: "+52", FM: "+691", 
//   MD: "+373", MC: "+377", MN: "+976", MS: "+1-664", MA: "+212", MZ: "+258", 
//   MM: "+95", NA: "+264", NR: "+674", NP: "+977", NL: "+31"
// };

// //StatCard Component
// const StatCard = ({ iconSrc, value, label }) => (
//   <div className="flex items-center space-x-3">
//     <div className="bg-[#F9D4AB] p-2 rounded-full">
//       <Image src={iconSrc} alt={label} width={28} height={28} />
//     </div>
//     <div>
//       <p className="text-xl md:text-2xl font-bold text-[#1D2026]">{value}</p>
//       <p className="text-xs md:text-sm text-[#4E5566]">{label}</p>
//     </div>
//   </div>
// );

// export default function Hero() {
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const [userCountryCode, setUserCountryCode] = useState("+1");
//   const router = useRouter();

//   useEffect(() => {
//     const getUserCountryPhoneCode = async () => {
//       try {
//         const response = await fetch('https://iplocate.io/api/lookup?apikey=0e7ca4b669dc85fbc604c1776a93d3e5');
//         const data = await response.json();
//         setUserCountryCode(countryPhoneCodes[data.country_code] || "+1");
//       } catch (error) {
//         console.error("Failed to fetch country code:", error);
//         setUserCountryCode("+1");
//       }
//     };
    
//     getUserCountryPhoneCode();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!phone.match(/^[0-9]{6,15}$/)) {
//       setError("Please enter a valid phone number.");
//       return;
//     }
//     setError("");
//     router.push("https://forms.gle/csc94GLG3tEDit6N6");
//   };

//   const highlightOptions = [
//     { text: "SATs.", color: "#FFD700" },
//     { text: "ICAS.", color: "#ff8800ff" },
//     { text: "NAPLAN.", color: "#FF1493" },
//   ];

//   const [highlightIndex, setHighlightIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setHighlightIndex((prevIndex) => (prevIndex + 1) % highlightOptions.length);
//     }, 7000); // every 7 sec

//     return () => clearInterval(interval); // cleanup on unmount
//   }, [highlightOptions.length]);

//   const highlight = highlightOptions[highlightIndex];

//   return (
//     <div id="home" className="relative w-full overflow-hidden">
//       {/* Content */}
//       <div className="relative grid mt-0 px-4 sm:px-10 grid-cols-1 lg:grid-cols-2 gap-x-8 items-center">
//         {/* Left Column */}
//         <div className="space-y-8 md:space-y-10 flex flex-col justify-center pt-5">
//           <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
//             <span>Smart Learning, Smarter Results –From School to </span>
//             <span style={{ color: highlight.color }}>{highlight.text}</span>
//           </h1>

//           {/* Phone Form */}
//           <form
//             className="bg-[#EDE8E1] p-6 rounded-xl shadow-md max-w-xl flex flex-col gap-3"
//             onSubmit={handleSubmit}
//           >
//             <label
//               className="text-xl text-[#494e5e] font-medium mb-1"
//               htmlFor="phone"
//             >
//               Experience Smarter Learning – <span className="text-md text-[#FF8C00]">First Class is Free!</span>
//             </label>
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
//               <div className="flex items-center justify-center flex-grow rounded-lg overflow-hidden">
//                 <div className="text-black text-center pt-2 w-16 h-12 bg-white border-e border-[#E0E0E0] flex items-center justify-center">
//                   {userCountryCode}
//                 </div>
//                 <input 
//                   id="phone" 
//                   type="tel" 
//                   placeholder="Phone number"
//                   value={phone} 
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="flex-grow px-4 py-2.5 text-sm outline-none h-12"
//                 />
//               </div>
              
//               <GlossyButton
//                 type="submit"
//                 className="h-12"
//               >
//                 Try a Free Class
//               </GlossyButton>
//             </div>
//             {error && <p className="text-red-500 text-xs">{error}</p>}
//           </form>

//           {/* Stats */}
//           <div className="flex flex-wrap gap-6 md:gap-8 pt-0">
//             <StatCard
//               iconSrc="/CircleWavyCheck.png"
//               value="100k"
//               label="Learners"
//             />
//             <StatCard
//               iconSrc="/GlobeHemisphereWest.png"
//               value="10+"
//               label="Country Language"
//             />
//             <StatCard
//               iconSrc="/Users.png"
//               value="99.9%"
//               label="Success Rate"
//             />
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="relative flex justify-center items-center mt-10 lg:mt-20">
//           <Image
//             src="/newheroimg.png"
//             alt="Happy students showing A+ grade"
//             width={800}
//             height={800}
//             className="max-w-full h-auto"
//             priority
//             sizes="(max-width: 768px) 100vw, 50vw"
//           />

//           {/* Members Card */}
//           <div className="absolute bottom-32 -translate-y-2 right-24 bg-white p-3 rounded-full shadow-lg flex items-center space-x-2 border-2 border-white animate-float">
//             <span className="font-bold text-[#1D2026] text-lg">500k+</span>
//             <span className="text-[#4E5566] text-xs">Members</span>
//             <div className="flex -space-x-3">
//               <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-[#FFD700] flex items-center justify-center">
//                 <Image src="/Users.png" alt="User icon" width={20} height={20} />
//               </div>
//               <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-[#FF8D28] flex items-center justify-center">
//                 <Image
//                   src="/CircleWavyCheck.png"
//                   alt="Verified icon"
//                   width={20}
//                   height={20}
//                 />
//               </div>
//               <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-[#FF6636] flex items-center justify-center">
//                 <Image
//                   src="/GlobeHemisphereWest.png"
//                   alt="Globe icon"
//                   width={20}
//                   height={20}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Floating Logos with Animations */}
//           <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 z-10 animate-float1">
//             <Image
//               src="/floating-icons/star.png"
//               alt="Star icon"
//               width={100}
//               height={100}
//               className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
//             />
//           </div>
//           <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 z-10 animate-float2">
//             <Image
//               src="/floating-icons/book.png"
//               alt="Book icon"
//               width={100}
//               height={100}
//               className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
//             />
//           </div>
//           <div className="absolute bottom-32 left-0 translate-x-1/4 translate-y-1/4 z-10 animate-float3">
//             <Image
//               src="/floating-icons/graph.png"
//               alt="Graph icon"
//               width={100}
//               height={100}
//               className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Inline Animations */}
//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }
//         @keyframes float1 {
//           0%,
//           100% {
//             transform: translate(0, 0);
//           }
//           50% {
//             transform: translate(-10px, 12px) scale(1.08);
//           }
//         }
//         @keyframes float2 {
//           0%,
//           100% {
//             transform: translate(0, 0);
//           }
//           50% {
//             transform: translate(14px, -10px) scale(1.05);
//           }
//         }
//         @keyframes float3 {
//           0%,
//           100% {
//             transform: translate(0, 0);
//           }
//           50% {
//             transform: translate(-8px, 10px) scale(1.07);
//           }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         .animate-float1 {
//           animation: float1 4s ease-in-out infinite;
//         }
//         .animate-float2 {
//           animation: float2 5s ease-in-out infinite;
//         }
//         .animate-float3 {
//           animation: float3 6s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }








"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import countries from "world-countries";
import GlossyButton from "./GlossyButton";
import { useOpenDemoBooking } from "./utils/navigation";

// Pre-process countries (flag + name + dialCode)
const countryOptions = countries.map((c) => ({
  code: c.cca2,
  name: c.name.common,
  dialCode: c.idd?.root
    ? `${c.idd.root}${c.idd.suffixes ? c.idd.suffixes[0] : ""}`
    : "",
  flag: String.fromCodePoint(
    ...[...c.cca2.toUpperCase()].map((ch) => ch.charCodeAt(0) + 127397)
  ),
}));

const countryPhoneCodes = {
  AF: "+93", AL: "+355", DZ: "+213", AS: "+1-684", AD: "+376", AO: "+244", 
  AI: "+1-264", AG: "+1-268", AR: "+54", AM: "+374", AW: "+297", AU: "+61", 
  AT: "+43", AZ: "+994", BS: "+1-242", BH: "+973", BD: "+880", BB: "+1-246", 
  BY: "+375", BE: "+32", BZ: "+501", BJ: "+229", BM: "+1-441", BT: "+975", 
  BO: "+591", BA: "+387", BW: "+267", BR: "+55", IO: "+246", BN: "+673", 
  BG: "+359", BF: "+226", BI: "+257", KH: "+855", CM: "+237", CA: "+1", 
  CV: "+238", KY: "+1-345", CF: "+236", TD: "+235", CL: "+56", CN: "+86", 
  CX: "+61", CC: "+61", CO: "+57", KM: "+269", CD: "+243", CG: "+242", 
  CK: "+682", CR: "+506", CI: "+225", HR: "+385", CU: "+53", CY: "+357", 
  CZ: "+420", DK: "+45", DJ: "+253", DM: "+1-767", DO: "+1-809", EC: "+593", 
  EG: "+20", SV: "+503", GQ: "+240", ER: "+291", EE: "+372", ET: "+251", 
  FK: "+500", FO: "+298", FJ: "+679", FI: "+358", FR: "+33", GF: "+594", 
  PF: "+689", TF: "+262", GA: "+241", GM: "+220", GE: "+995", DE: "+49", 
  GH: "+233", GI: "+350", GB: "+44", GR: "+30", GL: "+299", GD: "+1-473", 
  GP: "+590", GU: "+1-671", GT: "+502", GN: "+224", GW: "+245", GY: "+592", 
  HT: "+509", HM: "+672", VA: "+39", HN: "+504", HK: "+852", HU: "+36", 
  IS: "+354", IN: "+91", ID: "+62", IR: "+98", IQ: "+964", IE: "+353", 
  IL: "+972", IT: "+39", JM: "+1-876", JP: "+81", JO: "+962", KZ: "+7", 
  KE: "+254", KI: "+686", KP: "+850", KR: "+82", KW: "+965", KG: "+996", 
  LA: "+856", LV: "+371", LB: "+961", LS: "+266", LR: "+231", LY: "+218", 
  LI: "+423", LT: "+370", LU: "+352", MO: "+853", MK: "+389", MG: "+261", 
  MW: "+265", MY: "+60", MV: "+960", ML: "+223", MT: "+356", MH: "+692", 
  MQ: "+596", MR: "+222", MU: "+230", YT: "+269", MX: "+52", FM: "+691", 
  MD: "+373", MC: "+377", MN: "+976", MS: "+1-664", MA: "+212", MZ: "+258", 
  MM: "+95", NA: "+264", NR: "+674", NP: "+977", NL: "+31"
};

// StatCard Component
const StatCard = ({ iconSrc, value, label }) => (
  <div className="flex items-center space-x-3">
    <div className="bg-[#F9D4AB] p-2 rounded-full">
      <Image src={iconSrc} alt={label} width={28} height={28} />
    </div>
    <div>
      <p className="text-xl md:text-2xl font-bold text-[#1D2026]">{value}</p>
      <p className="text-xs md:text-sm text-[#4E5566]">{label}</p>
    </div>
  </div>
);

export default function Hero() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [userCountryCode, setUserCountryCode] = useState("+1");
  const router = useRouter();
  const openBokingDemo = useOpenDemoBooking() ;

  useEffect(() => {
    const getUserCountryPhoneCode = async () => {
      try {
        const response = await fetch('https://iplocate.io/api/lookup?apikey=0e7ca4b669dc85fbc604c1776a93d3e5');
        const data = await response.json();
        setUserCountryCode(countryPhoneCodes[data.country_code] || "+1");
      } catch (error) {
        console.error("Failed to fetch country code:", error);
        setUserCountryCode("+1");
      }
    };
    
    getUserCountryPhoneCode();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone.match(/^[0-9]{6,15}$/)) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError("");
    return () => router.push("/demo") ;
  };

  const highlightOptions = [
    { text: "SATs.", color: "#FFD700" },
    { text: "ICAS.", color: "#ff8800ff" },
    { text: "NAPLAN.", color: "#FF1493" },
  ];

  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prevIndex) => (prevIndex + 1) % highlightOptions.length);
    }, 7000); // every 7 sec

    return () => clearInterval(interval); // cleanup on unmount
  }, [highlightOptions.length]);

  const highlight = highlightOptions[highlightIndex];

  return (
    <div id="home" className="relative w-full overflow-hidden pt-24 md:pt-12 lg:pt-12">
      {/* Content */}
      <div className="relative grid mt-0 px-4 sm:px-10 grid-cols-1 lg:grid-cols-2 gap-x-8 items-center">
        {/* Left Column */}
        <div className="space-y-8 md:space-y-10 flex flex-col justify-center pt-5">
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
            <span>Smart Learning, Smarter Results –From School to </span>
            <span style={{ color: highlight.color }}>{highlight.text}</span>
          </h1>

          {/* Phone Form */}
    <form
  className="bg-[#EDE8E1] p-6 rounded-xl shadow-md max-w-xl flex flex-col gap-3"
  onSubmit={(e) => {
    e.preventDefault(); // prevent auto-submit
    if (/^\d{10}$/.test(phone)) {  // simple 10 digit validation
      setError(""); 
      openBokingDemo();
    } else {
      setError("Please enter a valid phone number");
    }
  }}
>
  <label
    className="text-xl text-[#494e5e] font-bold mb-1"
    htmlFor="phone"
  >
    Experience Smarter Learning –{" "}
    <span className="text-md text-[#FF8C00]">First Class is Free!</span>
  </label>

  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
    <div className="flex items-center justify-center flex-grow rounded-lg overflow-hidden">
      <div className="text-black text-center pt-2 w-16 h-12 bg-white border-e border-[#E0E0E0] flex items-center justify-center">
        {userCountryCode}
      </div>
      <input
        id="phone"
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="flex-grow px-4 py-2.5 text-sm outline-none h-12"
      />
    </div>

    <GlossyButton type="submit" className="h-12">
      Try a Free Class
    </GlossyButton>
  </div>

  {error && <p className="text-red-500 text-xs">{error}</p>}
</form>


          {/* Stats */}
          <div className="flex flex-wrap gap-6 md:gap-8 pt-0">
            <StatCard
              iconSrc="/CircleWavyCheck.png"
              value="100k"
              label="Learners"
            />
            <StatCard
              iconSrc="/GlobeHemisphereWest.png"
              value="10+"
              label="Countries"
            />
            <StatCard
              iconSrc="/Users.png"
              value="100%"
              label="Success Rate"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="relative flex justify-center items-center mt-10 lg:mt-20">
          <Image
            src="/newheroimg.png"
            alt="Happy students showing A+ grade"
            width={800}
            height={800}
            className="max-w-full h-auto"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Members Card */}
          <div className="absolute bottom-32 -translate-y-2 right-24 bg-white p-3 rounded-full shadow-lg flex items-center space-x-2 border-2 border-white animate-float">
            <span className="font-bold text-[#1D2026] text-lg">500k+</span>
            <span className="text-[#4E5566] text-xs">Members</span>
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-[#FFD700] flex items-center justify-center">
                <Image src="/Users.png" alt="User icon" width={20} height={20} />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-[#FF8D28] flex items-center justify-center">
                <Image
                  src="/CircleWavyCheck.png"
                  alt="Verified icon"
                  width={20}
                  height={20}
                />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-[#FF6636] flex items-center justify-center">
                <Image
                  src="/GlobeHemisphereWest.png"
                  alt="Globe icon"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>

          {/* Floating Logos with Animations */}
          <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 z-10 animate-float1">
            <Image
              src="/floating-icons/star.png"
              alt="Star icon"
              width={100}
              height={100}
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
            />
          </div>
          <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 z-10 animate-float2">
            <Image
              src="/floating-icons/book.png"
              alt="Book icon"
              width={100}
              height={100}
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
            />
          </div>
          <div className="absolute bottom-32 left-0 translate-x-1/4 translate-y-1/4 z-10 animate-float3">
            <Image
              src="/floating-icons/graph.png"
              alt="Graph icon"
              width={100}
              height={100}
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
            />
          </div>
        </div>
      </div>

      {/* Inline Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-10px, 12px) scale(1.08);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(14px, -10px) scale(1.05);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-8px, 10px) scale(1.07);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float1 {
          animation: float1 4s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 5s ease-in-out infinite;
        }
        .animate-float3 {
          animation: float3 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}