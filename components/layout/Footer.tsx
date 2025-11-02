"use client";

import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Footer() {
    const router = useRouter();
  return (
    <footer className="bg-very-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Orange accent line */}
        <div className="h-1 w-[101px] bg-raw-sienna mx-auto md:mx-0" />

        {/* Main content */}
        <div className="pt-12 md:pt-14 lg:pt-[71px] pb-8 md:pb-8 lg:pb-12">
          {/* Top section - Logo and Navigation */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-8 lg:mb-9">
            {/* Logo */}
            <div className="mb-12 md:mb-0 text-center md:text-left">
              <h2 className="text-h4 font-bold tracking-tight">
                Audiophile
              </h2>
            </div>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <nav className="hidden lg:flex space-x-8">
              <a
                href="/"
                className="text-md font-bold uppercase  hover:text-raw-sienna transition-colors"
              >
                HOME
              </a>
              <a
                href="/headphones"
                className="text-md font-bold uppercase  hover:text-raw-sienna transition-colors"
              >
                HEADPHONES
              </a>
              <a
                href="/speakers"
                className="text-md font-bold uppercase  hover:text-raw-sienna transition-colors"
              >
                SPEAKERS
              </a>
              <a
                href="/earphones"
                className="text-md font-bold uppercase  hover:text-raw-sienna transition-colors"
              >
                EARPHONES
              </a>
            </nav>
          </div>

          {/* Mobile/Tablet Navigation - Below logo */}
          <nav className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mb-12 md:mb-8 lg:hidden text-center md:text-left">
            <a
              onClick={() => router.push("/")}
              className="text-md font-bold uppercase  hover:text-raw-sienna transition-colors"
            >
              HOME
            </a>
            <a
              onClick={() => router.push("/headphones")}
              className="text-md font-bold uppercase  hover:text-raw-sienna transition-colors"
            >
              HEADPHONES
            </a>
            <a
              onClick={() => router.push("/speakers")}
              className="text-md font-bold uppercase  hover:text-raw-sienna transition-colors"
            >
              SPEAKERS
            </a>
            <a
                onClick={() => router.push("/earphones")}
              className="text-md font-bold uppercase  hover:text-raw-sienna transition-colors"
            >
              EARPHONES
            </a>
          </nav>

          {/* Description and Social Icons section */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end">
            {/* Description */}
            <div className="max-w-[540px] mb-12 md:mb-20 lg:mb-0 text-center md:text-left">
              <p className="text-[15px] leading-[25px] text-white/50 font-medium">
                Audiophile is an all in one stop to fulfill your audio needs.
                We're a small team of music lovers and sound specialists who are
                devoted to helping you get the most out of personal audio. Come
                and visit our demo facility - we're open 7 days a week.
              </p>
            </div>

            {/* Social icons - Desktop only (positioned at bottom right) */}
            <div className="hidden lg:flex space-x-4">
              <a
                href="#"
                className="hover:text-raw-sienna transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="hover:text-raw-sienna transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="hover:text-raw-sienna transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Bottom section - Copyright and Social (Mobile/Tablet) */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-12 md:mt-8 lg:mt-14">
            {/* Copyright */}
            <p className="text-[15px] font-bold text-white/50 text-center md:text-left mb-12 md:mb-0">
              Copyright 2021. All Rights Reserved
            </p>

            {/* Social icons - Mobile and Tablet */}
            <div className="flex lg:hidden justify-center md:justify-end space-x-4">
              <a
                href="#"
                className="hover:text-raw-sienna transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="hover:text-raw-sienna transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="hover:text-raw-sienna transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
