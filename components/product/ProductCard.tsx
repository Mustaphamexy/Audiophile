"use client";
import { useRouter } from "next/navigation";


export function ProdutCard ({ products }: { products: any[] }) {
  const router = useRouter();

  
  return (
    <section className="bg-white pb-12 md:pb-20 lg:pb-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-0">
        <h3 className="font-bold uppercase text-center mb-10 md:mb-14 lg:mb-16">
          YOU MAY ALSO LIKE
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-3 lg:gap-8">
          {products.map((product: any) => (
            <div key={product.slug} className="text-center">
              {/* Product Image */}
              <div className="bg-off-white rounded-lg overflow-hidden mb-8 p-8">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain max-h-[200px]"
                />
              </div>

              {/* Product Name */}
              <h5 className="font-bold uppercase mb-8 tracking-[1.7px]">
                {product.name}
              </h5>

              {/* See Product Button */}
               <button
                onClick={() => router.push(`/product/${product.slug}`)}
                className="btn-primary"
              >
                SEE PRODUCT
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}