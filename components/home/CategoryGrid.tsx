"use client";
import { useRouter } from "next/navigation";

import { ChevronRight } from "lucide-react";

export default function CategorySection() {

  const router = useRouter();
  const categories = [
    {
      name: 'HEADPHONES',
      image: '/images/shared/desktop/image-category-thumbnail-headphones.png',
      link: '/headphones'
    },
    {
      name: 'SPEAKERS',
      image: '/images/shared/desktop/image-category-thumbnail-speakers.png',
      link: '/speakers'
    },
    {
      name: 'EARPHONES',
      image: '/images/shared/desktop/image-category-thumbnail-earphones.png',
      link: '/earphones'
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-3 lg:gap-8">
          {categories.map((category) => (
            <div key={category.name} className="bg-off-white rounded-lg relative pt-24 pb-6 px-6 text-center group cursor-pointer">
              {/* Product Image */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-36 h-36 ">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Category Name */}
              <h6 className="font-bold uppercase mb-4 mt-8">
                {category.name}
              </h6>
              
              {/* Shop Link */}
              <a 
                onClick={() => router.push(category.link)}
                className="inline-flex items-center gap-3 text-[13px] font-bold tracking-[1px] uppercase opacity-50 hover:opacity-100 hover:text-raw-sienna transition-all group"
              >
                SHOP
                <ChevronRight size={16} className="text-raw-sienna" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}