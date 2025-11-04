"use client";
import { useRouter } from "next/navigation";


export default function HeroSection() {

    const router = useRouter();
const slug = "xx99-mark-two-headphones";

  const handleClick = () => {
    router.push(`/product/${slug}`);
  };
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -top-10 lg:-top-30  ">
        <img
          src="/images/desktop/Hero-image-Phone.png"
          alt="XX99 Mark II Headphones"
          className="w-full h-full object-cover lg:hidden"
        />
        
        {/* Desktop Image */}
        <img
          src="/images/desktop/image-hero.png"
          alt="XX99 Mark II Headphones"
          className="hidden lg:block w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center lg:justify-start h-screen px-6 md:px-10 lg:px-0 max-w-7xl mx-auto  ">
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <p className="text-white/50 text-sm tracking-[10px] uppercase mb-6 font-normal">
            NEW PRODUCT
          </p>
          <h1 className="text-white font-bold uppercase mb-6 max-w-md text-4xl md:text-5xl lg:text-6xl">
            XX99 MARK II HEADPHONES
          </h1>
          <p className="text-white/75 text-sm  mb-10 max-w-sm">
            Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
          </p>
          <button onClick={handleClick} className="btn-primary hover:btn-primary:hover">SEE PRODUCT</button>
        </div>
      </div>
    </section>
  );
}