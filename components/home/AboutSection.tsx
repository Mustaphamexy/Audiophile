export default function AboutSection() {
  return (
    <section className="bg-white pb-24 md:pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-32 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h2 className="font-bold uppercase mb-8">
              BRINGING YOU THE <span className="text-raw-sienna">BEST</span> AUDIO GEAR
            </h2>
            <p className="text-very-dark/50 text-sm ">
              Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
              earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration 
              rooms available for you to browse and experience a wide range of our products. Stop by our store 
              to meet some of the fantastic people who make Audiophile the best place to buy your portable 
              audio equipment.
            </p>
          </div>

          {/* Image - Second on mobile, first on desktop */}
          <div className="order-1 lg:order-2 rounded-lg overflow-hidden">
            <img 
              src="/images/shared/desktop/image-best-gear.png" 
              alt="Person enjoying audio gear"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}