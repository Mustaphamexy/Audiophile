"use client";
import { useRouter } from "next/navigation";

export default function FeaturedProducts() {
  const router = useRouter();

  return (
    <section className="bg-white pb-24 md:pb-24 lg:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-0 space-y-8 md:space-y-12 lg:space-y-12">
        
        {/* ZX9 Speaker */}
        <div className="bg-raw-sienna rounded-lg overflow-hidden relative pt-10">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circles)" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center relative z-10">
            {/* Product Image */}
            <div className="pt-14 md:pt-16 lg:pt-0 flex justify-center">
              <img 
                src="/images/desktop/image-speaker-zx9.png" 
                alt="ZX9 Speaker"
                className="w-32 md:w-lg lg:w-64 h-auto object-contain"
              />
            </div>

            {/* Content */}
            <div className="text-center lg:text-left px-6 lg:px-0 lg:pr-24 pb-14 md:pb-16 lg:pb-0">
              <h2 className="text-white font-bold uppercase mb-6">
                ZX9<br />SPEAKER
              </h2>
              <p className="text-white/75 text-md mb-10 max-w-sm mx-auto lg:mx-0">
                Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
              </p>
              <button
                onClick={() => router.push("/product/zx9-speaker")}
                className="bg-very-dark hover:bg-light-grey hover:text-raw-sienna text-white text-xs font-bold uppercase px-8 py-4 transition-colors"
              >
                SEE PRODUCT
              </button>
            </div>
          </div>
        </div>

        {/* ZX7 Speaker */}
        <div className="relative rounded-lg overflow-hidden h-64">
          <img 
            src="/images/desktop/image-speaker-zx7.png" 
            alt="ZX7 Speaker"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="relative z-10 h-full flex items-center pl-6 md:pl-16 lg:pl-24">
            <div>
              <h4 className="font-bold uppercase mb-8">
                ZX7 SPEAKER
              </h4>
              <button
                onClick={() => router.push("/product/zx7-speaker")}
                className="border-2 border-very-dark bg-transparent hover:bg-very-dark hover:text-white text-very-dark text-xs font-bold uppercase px-8 py-3 transition-colors"
              >
                SEE PRODUCT
              </button>
            </div>
          </div>
        </div>

        {/* YX1 Earphones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-3 lg:gap-8">
          <div className="rounded-lg overflow-hidden h-36 md:h-64">
            <img 
              src="/images/desktop/image-earphones-yx1.png" 
              alt="YX1 Earphones"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="bg-off-white rounded-lg flex items-center px-6 md:px-10 lg:px-24 h-36 md:h-64">
            <div>
              <h4 className="font-bold uppercase mb-8">
                YX1 EARPHONES
              </h4>
              <button
                onClick={() => router.push("/product/yx1-earphones")}
                className="border-2 border-very-dark bg-transparent hover:bg-very-dark hover:text-white text-very-dark text-xs font-bold uppercase px-8 py-3 transition-colors"
              >
                SEE PRODUCT
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
