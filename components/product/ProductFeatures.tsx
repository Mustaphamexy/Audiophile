import React from 'react';
import { ChevronRight } from 'lucide-react';

// Product Features Component
export function ProductFeatures({ product }: { product: any }) {
  return (
    <section className="bg-white py-12 md:py-20 lg:py-32">
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-32">
          {/* Features */}
          <div className="lg:col-span-2">
            <h3 className="font-bold uppercase mb-6 md:mb-8">
              FEATURES
            </h3>
            <div className="text-very-dark/50 text-[15px] leading-[25px] whitespace-pre-line">
              {product.features}
            </div>
          </div>

          {/* In the Box */}
          <div>
            <h3 className="font-bold uppercase mb-6 md:mb-8">
              IN THE BOX
            </h3>
            <ul className="space-y-2">
              {product.includes.map((item: any, index: number) => (
                <li key={index} className="flex gap-6 text-[15px]">
                  <span className="text-raw-sienna font-bold w-4">{item.quantity}x</span>
                  <span className="text-very-dark/50">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}