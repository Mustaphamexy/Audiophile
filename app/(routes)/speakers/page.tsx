"use client";

import React from "react";
import CategoryGrid from "@/components/home/CategoryGrid";
import AboutSection from "@/components/home/AboutSection";

import { useRouter } from "next/navigation";

const headphonesProducts = [
  {
    id: 1,
    name: "ZX9 SPEAKER",
    isNew: true,
    description:
      "Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
    image: "/images/shared/desktop/Speaker-zx9.png",
    slug: "/product//xx99-mark-two-headphones",
  },
  {
    id: 2,
    name: "ZX7 SPEAKER",
    isNew: false,
    description:
      "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
    image: "/images/shared/desktop/Speaker-zx7.png",
    slug: "/product/xx99-mark-one-headphones",
  },
];

export default function HeadphonesPage() {
  const router = useRouter();

  return (
    <main className="font-manrope">
      {/* Category Header */}
      <section className="bg-very-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-0">
          <div className="py-8 md:py-24 lg:py-24 text-center">
            <h2 className="text-white font-bold uppercase ">SPEAKERS</h2>
          </div>
        </div>
      </section>

      {/* Products List */}
      <section className="bg-white py-16 md:py-24 lg:py-40">
        <div className="space-y-24 md:space-y-32 lg:space-y-40">
          {headphonesProducts.map((product, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={product.id}
                className="max-w-7xl mx-auto px-6 md:px-10 lg:px-0"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-32 items-center`}
                >
                  {/* Product Image */}
                  <div
                    className={`${isReversed ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <div className="bg-off-white rounded-lg overflow-hidden p-8 md:p-12 lg:p-14">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-contain max-h-[300px] md:max-h-[350px] lg:max-h-[560px]"
                      />
                    </div>
                  </div>

                  {/* Product Content */}
                  <div
                    className={`text-center lg:text-left ${isReversed ? "lg:order-1" : "lg:order-2"}`}
                  >
                    {product.isNew && (
                      <p className="text-raw-sienna text-sm uppercase mb-4 md:mb-6 font-normal">
                        NEW PRODUCT
                      </p>
                    )}
                    <h2 className="font-bold uppercase mb-6 md:mb-8 max-w-md mx-auto lg:mx-0">
                      {product.name}
                    </h2>
                    <p className="text-very-dark/50 text-sm mb-6 md:mb-10">
                      {product.description}
                    </p>
                    <button
                      onClick={() => router.push(product.slug)}
                      className="btn-primary"
                    >
                      SEE PRODUCT
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <CategoryGrid />
      <AboutSection />
    </main>
  );
}
