export function ProductGallery({ gallery }: { gallery: any[] }) {
  return (
    <section className="bg-white pb-12 md:pb-20 lg:pb-40">
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-8">
          {/* Left column - 2 images stacked */}
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-8">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={gallery[0]?.image}
                alt="Product gallery 1"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src={gallery[1]?.image}
                alt="Product gallery 2"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right column - 1 large image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={gallery[2]?.image}
              alt="Product gallery 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}