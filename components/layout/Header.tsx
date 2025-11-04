"use client";

import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartModal from '@/components/cart/CartModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartCount(totalItems);
      } else {
        setCartCount(0);
      }
    };

    // Initial load
    updateCartCount();

    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, [isCartOpen]);

  return (
    <>
      <header className="bg-very-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-white/10">
            <div className="flex items-center justify-between py-8 px-4">
              <button
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>

              <button
                onClick={() => router.push("/")}
                className="text-2xl font-bold cursor-pointer hover:text-raw-sienna transition-colors"
              >
                Audiophile
              </button>

              <nav className="hidden lg:flex space-x-8">
                <button
                  onClick={() => router.push("/")}
                  className="text-sm font-bold uppercase tracking-[2px] hover:text-raw-sienna transition-colors cursor-pointer"
                >
                  Home
                </button>

                <button
                  onClick={() => router.push("/headphones")}
                  className="text-sm font-bold uppercase tracking-[2px] hover:text-raw-sienna transition-colors cursor-pointer"
                >
                  Headphones
                </button>
                
                <button
                  onClick={() => router.push("/speakers")}
                  className="text-sm font-bold uppercase tracking-[2px] hover:text-raw-sienna transition-colors cursor-pointer"
                >
                  Speakers
                </button>
                
                <button
                  onClick={() => router.push("/earphones")}
                  className="text-sm font-bold uppercase tracking-[2px] hover:text-raw-sienna transition-colors cursor-pointer"
                >
                  Earphones
                </button>
              </nav>

              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative cursor-pointer hover:text-raw-sienna transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-raw-sienna text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {isMenuOpen && (
              <div className="lg:hidden py-6 space-y-6 items-center flex flex-col">
                <button
                  onClick={() => {
                    router.push("/");
                    setIsMenuOpen(false);
                  }}
                  className="block text-lg font-bold uppercase tracking-[2px] hover:text-raw-sienna transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    router.push("/headphones");
                    setIsMenuOpen(false);
                  }}
                  className="block text-lg font-bold uppercase tracking-[2px] hover:text-raw-sienna transition-colors"
                >
                  Headphones
                </button>
                <button
                  onClick={() => {
                    router.push("/speakers");
                    setIsMenuOpen(false);
                  }}
                  className="block text-lg font-bold uppercase tracking-[2px] hover:text-raw-sienna transition-colors"
                >
                  Speakers
                </button>
                <button
                  onClick={() => {
                    router.push("/earphones");
                    setIsMenuOpen(false);
                  }}
                  className="block text-lg font-bold uppercase tracking-[2px] hover:text-raw-sienna transition-colors"
                >
                  Earphones
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}