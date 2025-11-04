'use client';

import React, { useState, useEffect } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import Link from 'next/link';

interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const loadCart = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      }
    };

    loadCart();

    // Listen for storage events to sync across tabs
    const handleStorageChange = () => {
      loadCart();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save cart to localStorage whenever it changes
  const saveCart = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
    setCartItems(items);
    // Dispatch storage event to sync across tabs
    window.dispatchEvent(new Event('storage'));
  };

  const updateQuantity = (slug: string, change: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.slug === slug) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    saveCart(updatedCart);
  };

  const removeItem = (slug: string) => {
    const updatedCart = cartItems.filter(item => item.slug !== slug);
    saveCart(updatedCart);
  };

  const removeAll = () => {
    saveCart([]);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      <div className="fixed top-24 right-6 md:right-10 lg:right-40 w-[90%] md:w-[377px] bg-white rounded-lg shadow-2xl z-50 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-md font-bold tracking-[1.3px] uppercase">
            CART ({cartItems.length})
          </h3>
          <button 
            onClick={removeAll}
            className="text-[15px] text-very-dark/50 hover:text-raw-sienna underline transition-colors"
          >
            Remove all
          </button>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-very-dark/50 mb-4">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.slug} className="flex items-center gap-4">
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-off-white rounded-lg shrink-0">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <p className="text-[15px] font-bold leading-[25px]">
                      {item.name.split(' ').slice(0, 2).join(' ')}
                    </p>
                    <p className="text-[14px] text-very-dark/50 font-bold">
                      $ {item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="bg-off-white flex items-center">
                    <button 
                      onClick={() => updateQuantity(item.slug, -1)}
                      className="px-3 py-2 hover:text-raw-sienna transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-3 text-[13px] font-bold">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.slug, 1)}
                      className="px-3 py-2 hover:text-raw-sienna transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-[15px] text-very-dark/50 uppercase">TOTAL</p>
              <p className="text-md font-bold">
                $ {calculateTotal().toLocaleString()}
              </p>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" onClick={onClose}>
              <button className="w-full btn-primary text-center">
                CHECKOUT
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}