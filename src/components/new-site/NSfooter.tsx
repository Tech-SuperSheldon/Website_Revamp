"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="relative w-full bg-transparent border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6 py-10">
        {/* Top Section: CTA & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 items-center">
            <div>
                <Link href="/" className="flex items-center gap-3 mb-6">
                     <div className="relative w-28 h-28">
                         <Image 
                            src="/logo.webp" 
                            alt="SuperSheldon" 
                            fill 
                            className="object-contain"
                         />
                     </div>
                </Link>
                <p className="text-slate-600 text-lg max-w-md">
                    Empowering the next generation of genius minds through personalized, 1-to-1 tutoring in English and Maths.
                </p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Subscribe to our newsletter</h3>
                <p className="text-slate-500 mb-4 text-sm">Get the latest educational tips and SuperSheldon updates.</p>
                <div className="flex gap-2">
                    <Input placeholder="Enter your email" className="bg-slate-50 border-slate-200" />
                    <Button size="icon" className="bg-purple-600 hover:bg-purple-700 text-white shrink-0">
                        <ArrowRight size={18} />
                    </Button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-slate-200/60 pt-8">
          
          {/* Column 1: Exams */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3">Programs</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <FooterLink href="#">Primary School Tuition</FooterLink>
              <FooterLink href="#">NAPLAN Exam Preparation</FooterLink>
              <FooterLink href="#">Selective & Scholarship Preparation</FooterLink>
              <FooterLink href="#">HSC English & Maths</FooterLink>
            </ul>
          </div>

           {/* Column 2: Contact */}
           <div>
            <h3 className="font-bold text-slate-900 mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-purple-600" />
                <span className="hover:text-purple-600 cursor-pointer transition-colors">hello@supersheldon.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-purple-600" />
                <span className="hover:text-purple-600 cursor-pointer transition-colors">+44 7700 900000</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-purple-600" />
                <span>London, United Kingdom</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Become a Tutor</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </ul>
          </div>

          {/* Column 4: Legal & Social */}
          <div>
             <h3 className="font-bold text-slate-900 mb-3">Connect</h3>
             <div className="flex gap-2 mb-4">
              <SocialIcon icon={<Facebook size={16} />} href="#" />
              <SocialIcon icon={<Twitter size={16} />} href="#" />
              <SocialIcon icon={<Instagram size={16} />} href="#" />
              <SocialIcon icon={<Linkedin size={16} />} href="#" />
            </div>
             <h3 className="font-bold text-slate-900 mb-2">Legal</h3>
            <ul className="space-y-1 text-sm text-slate-600">
               <FooterLink href="#">Privacy Policy</FooterLink>
               <FooterLink href="#">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200/60 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} SuperSheldon Education Ltd. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
            <span>Accepting new students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-purple-600 transition-colors block">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
    return (
        <Link href={href} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all shadow-sm">
            {icon}
        </Link>
    )
}
