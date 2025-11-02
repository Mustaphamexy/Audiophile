import React from 'react';
import { Check } from 'lucide-react';

interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Order Summary Component
interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
  onSubmit: () => void;
  isSubmitting?: boolean; 
}

export function OrderSummary({
  cartItems,
  subtotal,
  shipping,
  vat,
  grandTotal,
  onSubmit,
  isSubmitting = false 
}: OrderSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg p-6 md:p-8 sticky top-8">
        <h3 className="text-h6 font-bold uppercase mb-8 tracking-[1.3px]">
          SUMMARY
        </h3>

        {/* Cart Items */}
        <div className="space-y-6 mb-8 max-h-60 overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.slug} className="flex items-center gap-4">
              <div className="w-16 h-16 bg-off-white rounded-lg shrink-0">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-bold">
                  {item.name.split(' ').slice(0, 2).join(' ')}
                </p>
                <p className="text-[14px] text-very-dark/50 font-bold">
                  $ {item.price.toLocaleString()}
                </p>
              </div>
              <p className="text-[15px] text-very-dark/50 font-bold">
                x{item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-2 mb-8">
          <div className="flex justify-between">
            <p className="text-sm text-very-dark/50 uppercase">TOTAL</p>
            <p className="text-h6 font-bold">$ {subtotal.toLocaleString()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-very-dark/50 uppercase">SHIPPING</p>
            <p className="text-h6 font-bold">$ {shipping}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-very-dark/50 uppercase">VAT (INCLUDED)</p>
            <p className="text-h6 font-bold">$ {vat.toLocaleString()}</p>
          </div>
        </div>

        {/* Grand Total */}
        <div className="flex justify-between mb-8">
          <p className="text-sm text-very-dark/50 uppercase">GRAND TOTAL</p>
          <p className="text-h6 font-bold text-raw-sienna">
            $ {grandTotal.toLocaleString()}
          </p>
        </div>

        {/* Submit Button */}
        <button 
          onClick={onSubmit}
          disabled={isSubmitting || cartItems.length === 0}
          className={`w-full btn-primary flex items-center justify-center gap-2 ${
            isSubmitting || cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              PROCESSING...
            </>
          ) : (
            'CONTINUE & PAY'
          )}
        </button>

        {/* Empty cart message */}
        {cartItems.length === 0 && (
          <p className="text-center text-very-dark/50 text-sm mt-3">
            Your cart is empty
          </p>
        )}
      </div>
    </div>
  );
}