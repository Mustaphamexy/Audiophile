'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plus, Minus, Check } from 'lucide-react';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AboutSection from '@/components/home/AboutSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import { ProdutCard } from '@/components/product/ProductCard';
import { ProductFeatures } from '@/components/product/ProductFeatures';
import { ProductGallery } from '@/components/product/ProductGallery';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  // Fetch product from Convex
  const product = useQuery(api.products.getProductBySlug, { slug });
  const [quantity, setQuantity] = useState(1);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  const addToCart = () => {
    if (!product) return;
    
    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    
    const existingItemIndex = cart.findIndex(
      (item: any) => item.slug === product.slug
    );
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    
    setShowAddedToCart(true);
    
    setTimeout(() => {
      setShowAddedToCart(false);
    }, 3000);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (product === undefined) {
    return (
      <main className="font-manrope py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-lg">Loading product...</p>
        </div>
      </main>
    );
  }

  if (product === null) {
    return (
      <main className="font-manrope py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button 
            onClick={() => router.back()}
            className="btn-primary"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="font-manrope">
      {showAddedToCart && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <Check size={20} />
          <span className="font-medium">Added to cart successfully!</span>
        </div>
      )}

      {/* Product Hero Section */}
      <section className="bg-white py-6 md:py-8 lg:py-16">
        <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0">
          {/* Go Back Button */}
          <button 
            onClick={() => router.back()}
            className="text-md text-very-dark/50 hover:text-raw-sienna transition-colors font-medium mb-6 md:mb-8 lg:mb-14"
          >
            Go Back
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-32 items-center">
            {/* Product Image */}
            <div className="bg-off-white rounded-lg overflow-hidden p-8 md:p-12 lg:p-14">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain max-h-[300px] md:max-h-[350px] lg:max-h-[560px]"
              />
            </div>

            {/* Product Details */}
            <div>
              {product.isNew && (
                <p className="text-raw-sienna text-sm tracking-[10px] uppercase mb-4 md:mb-6 font-normal">
                  NEW PRODUCT
                </p>
              )}
              <h2 className="font-bold uppercase mb-6 md:mb-8 max-w-[400px]">
                {product.name}
              </h2>
              <p className="text-very-dark/50 text-[15px] leading-[25px] mb-6 md:mb-8">
                {product.description}
              </p>
              
              {/* Price */}
              <p className="text-md font-bold tracking-[1.3px] mb-8">
                $ {product.price.toLocaleString()}
              </p>

              {/* Quantity and Add to Cart */}
              <div className="flex gap-4">
                <div className="bg-off-white flex items-center">
                  <button 
                    onClick={decrementQuantity}
                    className="px-4 py-4 hover:text-raw-sienna transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 text-[13px] font-bold min-w-10 text-center">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-4 py-4 hover:text-raw-sienna transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={addToCart} 
                  className="btn-primary relative overflow-hidden"
                  disabled={showAddedToCart}
                >
                  {showAddedToCart ? (
                    <span className="flex items-center gap-2">
                      <Check size={18} />
                      ADDED
                    </span>
                  ) : (
                    'ADD TO CART'
                  )}
                </button>
              </div>

              {/* Success message below button */}
              {showAddedToCart && (
                <div className="mt-3 text-green-600 text-sm font-medium flex items-center gap-1 animate-fade-in">
                  <Check size={16} />
                  {quantity} {quantity === 1 ? 'item' : 'items'} added to cart
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ProductFeatures product={product} />
      <ProductGallery gallery={product.gallery} />
      <ProdutCard products={product.others} />
      <CategoryGrid />
      <AboutSection />
    </main>
  );
}