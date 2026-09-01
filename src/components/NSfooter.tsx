"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { RollingLink } from "./RollingLink";
import { NSGlobe } from "./NSGlobe";

export function Footer() {
  return (
    <div className="bg-white pt-2 sm:pt-4">
      <motion.footer 
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full bg-[#03215F] rounded-t-[1.5rem] sm:rounded-t-[2.5rem] md:rounded-t-[4rem] flex flex-col pt-4 pb-2 sm:pt-6 md:pt-10 md:pb-6 overflow-hidden shadow-2xl"
      >
        {/* Globe background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {/* <NSGlobe size={600} opacity="opacity-[0.06]" /> */}
        </div>
        <div className="container mx-auto px-4 md:px-6">

          {/* Main Content: Brand | Contact | Links */}
          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-6 mb-4 sm:mb-6 text-white">

              {/* Brand Section */}
              <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:w-[20%] lg:ml-8 flex flex-col items-start"
              >
                  <Link href="/" className="mb-1 block">
                       <div className="relative w-32 h-12 sm:w-40 sm:h-14 md:w-44 md:h-16">
                           <Image
                              src="/logo-footer.png"
                              alt="SuperSheldon"
                              fill
                              className="object-contain object-left"
                           />
                       </div>
                  </Link>
                  <p className="text-white font-medium text-[12px] sm:text-[13px] md:text-[15px] leading-relaxed mb-4">
                      SuperSheldon is a trusted online learning platform offering expert-led exam preparation for Australian students.
                  </p>

                  <div className="flex flex-wrap gap-3">
                      {/* Instagram */}
                      <SocialIcon href="https://www.instagram.com/supersheldon.education/" label="Instagram" color="hover:text-[#E4405F]" icon={
                          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      } />
                      {/* X (Twitter) */}
                      <SocialIcon href="https://x.com/SuperSheldonHQ" label="X" color="hover:text-black" icon={
                          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      } />
                      {/* WhatsApp */}
                      <SocialIcon href="https://wa.me/917974695618" label="WhatsApp" color="hover:text-[#25D366]" icon={
                          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      } />
                      {/* LinkedIn */}
                      <SocialIcon href="https://www.linkedin.com/company/super-sheldon/" label="LinkedIn" color="hover:text-[#0077B5]" icon={
                          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      } />
                      {/* YouTube */}
                      <SocialIcon href="https://www.youtube.com/@SuperSheldon-Education" label="YouTube" color="hover:text-[#FF0000]" icon={
                          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      } />
                      {/* Facebook */}
                      <SocialIcon href="https://www.facebook.com/people/Super-Sheldon/61577387970940/" label="Facebook" color="hover:text-[#1877F2]" icon={
                          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      } />
                  </div>
              </motion.div>

              {/* Contact Info Section */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:w-[22%] flex flex-col"
              >
                  <h4 className="font-bold text-base sm:text-lg text-white mb-4 font-rowdies">Contact</h4>
                  <div className="flex flex-col gap-3 text-[11px] sm:text-[12px] md:text-[13px] text-white font-medium">
                      <div className="flex items-start gap-2">
                          <Phone className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2} />
                          <p><span className="font-bold">Phone:</span> +91 7974695618 / +61 485860132</p>
                      </div>
                      <div className="flex items-start gap-2">
                          <Mail className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2} />
                          <p><span className="font-bold">Email:</span> support@supersheldon.com</p>
                      </div>
                      <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2} />
                          <p><span className="font-bold">Address:</span> Om Chambers 648/A 4th Flr, Binnamangala 1st Stage, Bangalore- 560038, Karnataka, India</p>
                      </div>
                  </div>
              </motion.div>

              {/* Links Section */}
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:w-auto lg:mr-8 grid grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-4 sm:gap-y-6"
              >

                  {/* Column 1: Sitemap */}
                  <div>
                       <h4 className="font-bold text-base sm:text-lg text-white mb-2 sm:mb-4 font-rowdies">Sitemap</h4>
                       <ul className="space-y-1.5 sm:space-y-2 font-medium text-white text-[12px] sm:text-[13px] md:text-[14px]">
                          <li><RollingLink href="/" hoverColor="text-black" baseColor="text-white">Home</RollingLink></li>
                          <li><RollingLink href="/academies" hoverColor="text-black" baseColor="text-white">Academies</RollingLink></li>
                          <li><RollingLink href="/new-testimonial" hoverColor="text-black" baseColor="text-white">Reviews</RollingLink></li>
                          <li><RollingLink href="/new-blogs" hoverColor="text-black" baseColor="text-white">Blogs</RollingLink></li>
                          <li><RollingLink href="/become-a-teacher" hoverColor="text-black" baseColor="text-white">Become a Teacher</RollingLink></li>
                       </ul>
                  </div>

                  {/* Column 2: Learn */}
                  <div>
                       <h4 className="font-bold text-base sm:text-lg text-white mb-2 sm:mb-4 font-rowdies">Learn</h4>
                       <ul className="space-y-1.5 sm:space-y-2 font-medium text-white text-[12px] sm:text-[13px] md:text-[14px]">
                          <li><RollingLink href="/new-courses" hoverColor="text-black" baseColor="text-white">NAPLAN Exam</RollingLink></li>
                          <li><RollingLink href="/new-courses" hoverColor="text-black" baseColor="text-white">ICAS</RollingLink></li>
                          <li><RollingLink href="/new-courses" hoverColor="text-black" baseColor="text-white">HSC</RollingLink></li>
                          <li><RollingLink href="/new-courses" hoverColor="text-black" baseColor="text-white">Selective School</RollingLink></li>
                       </ul>
                  </div>

                  {/* Column 3: Account */}
                  <div>
                       <h4 className="font-bold text-base sm:text-lg text-white mb-2 sm:mb-4 font-rowdies">Account</h4>
                       <ul className="space-y-1.5 sm:space-y-2 font-medium text-white text-[12px] sm:text-[13px] md:text-[14px]">
                          <li><RollingLink href="https://supersheldon.wise.live/" target="_blank" rel="noopener noreferrer" hoverColor="text-black" baseColor="text-white">Sign up</RollingLink></li>
                          <li><RollingLink href="https://supersheldon.wise.live/" target="_blank" rel="noopener noreferrer" hoverColor="text-black" baseColor="text-white">Sign in</RollingLink></li>
                       </ul>
                  </div>

                  {/* Column 4: Information */}
                  <div>
                       <h4 className="font-bold text-base sm:text-lg text-white mb-2 sm:mb-4 font-rowdies">Information</h4>
                       <ul className="space-y-1.5 sm:space-y-2 font-medium text-white text-[12px] sm:text-[13px] md:text-[14px] mb-4">
                          <li><RollingLink href="/faq" hoverColor="text-black" baseColor="text-white">FAQ</RollingLink></li>
                          <li><RollingLink href="/privacy" hoverColor="text-black" baseColor="text-white">Privacy Policy</RollingLink></li>
                          <li><RollingLink href="/terms" hoverColor="text-black" baseColor="text-white">Terms & Conditions</RollingLink></li>
                       </ul>
                  </div>

              </motion.div>

          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="border-t border-white/25 pt-2 sm:pt-4 flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4"
          >
               {/* Left side hidden as requested "do not put designed by" */}
               <div className="hidden md:block"></div> 
               
               <p className="text-white text-[11px] sm:text-[13px] md:text-[15px] font-bold">
                  © SuperSheldon LLP. All rights reserved.
               </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

function SocialIcon({ icon, href, label, color }: { icon: React.ReactNode; href: string; label: string; color: string }) {
    return (
        <Link href={href} aria-label={label} className={`text-white transition-all hover:-translate-y-1 p-1 ${color}`}>
            {icon}
        </Link>
    )
}
