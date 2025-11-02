import React from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderConfirmationProps {
  isOpen: boolean;
  cartItems: CartItem[];
  grandTotal: number;
  orderId: string;
}

export function OrderConfirmation({
  isOpen,
  cartItems,
  grandTotal,
  orderId
}: OrderConfirmationProps) {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
        <div className="bg-white rounded-lg max-w-[540px] w-full p-8 md:p-12">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-raw-sienna rounded-full flex items-center justify-center mb-6">
            <Check size={32} className="text-white" />
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-h3 font-bold uppercase mb-4 leading-tight">
            THANK YOU<br />FOR YOUR ORDER
          </h2>

          <p className="text-very-dark/50 text-[15px] mb-6">
            You will receive an email confirmation shortly.
          </p>

          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 mb-8 rounded-lg overflow-hidden">
            {/* Items */}
            <div className="bg-off-white p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-white rounded-lg shrink-0">
                  <img 
                    src={cartItems[0]?.image}
                    alt={cartItems[0]?.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-bold">
                    {cartItems[0]?.name.split(' ').slice(0, 2).join(' ')}
                  </p>
                  <p className="text-[14px] text-very-dark/50 font-bold">
                    $ {cartItems[0]?.price.toLocaleString()}
                  </p>
                </div>
                <p className="text-[15px] text-very-dark/50 font-bold">
                  x{cartItems[0]?.quantity}
                </p>
              </div>
              
              {cartItems.length > 1 && (
                <div className="border-t border-very-dark/10 pt-3">
                  <p className="text-[12px] text-very-dark/50 font-bold text-center">
                    and {cartItems.length - 1} other item(s)
                  </p>
                </div>
              )}
            </div>

            {/* Grand Total */}
            <div className="bg-very-dark p-6 flex flex-col justify-center">
              <p className="text-white/50 text-[15px] uppercase mb-2">
                GRAND TOTAL
              </p>
              <p className="text-white text-h6 font-bold">
                $ {grandTotal.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Back to Home Button */}
          <button 
            onClick={handleBackToHome}
            className="w-full btn-primary"
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    </>
  );
}