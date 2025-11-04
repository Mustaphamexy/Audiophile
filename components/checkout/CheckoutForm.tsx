'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { OrderConfirmation } from '@/components/checkout/OrderConfirmation';

interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: 'e-money' | 'cash';
  eMoneyNumber: string;
  eMoneyPin: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutForm() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Convex mutation
  const createOrder = useMutation(api.orders.createOrder);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    paymentMethod: 'e-money',
    eMoneyNumber: '',
    eMoneyPin: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Load cart items
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 50;
  const vat = Math.round(subtotal * 0.2);
  const grandTotal = subtotal + shipping + vat;

  // Validation functions
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Invalid email format';
        return '';
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(value.replace(/[\s-]/g, ''))) return 'Invalid phone number';
        return '';
      
      case 'address':
        if (!value.trim()) return 'Address is required';
        if (value.trim().length < 10) return 'Address must be at least 10 characters';
        return '';
      
      case 'zipCode':
        if (!value.trim()) return 'ZIP Code is required';
        if (value.trim().length < 3) return 'Invalid ZIP Code';
        return '';
      
      case 'city':
        if (!value.trim()) return 'City is required';
        return '';
      
      case 'country':
        if (!value.trim()) return 'Country is required';
        return '';
      
      case 'eMoneyNumber':
        if (formData.paymentMethod === 'e-money') {
          if (!value.trim()) return 'e-Money Number is required';
          if (value.trim().length < 9) return 'Invalid e-Money Number';
        }
        return '';
      
      case 'eMoneyPin':
        if (formData.paymentMethod === 'e-money') {
          if (!value.trim()) return 'e-Money PIN is required';
          if (value.trim().length !== 4) return 'PIN must be 4 digits';
        }
        return '';
      
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear submit error when user starts typing
    if (submitError) setSubmitError('');
    
    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate all required fields
    const fieldsToValidate = [
      'name', 'email', 'phone', 'address', 'zipCode', 'city', 'country'
    ];

    if (formData.paymentMethod === 'e-money') {
      fieldsToValidate.push('eMoneyNumber', 'eMoneyPin');
    }

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field as keyof FormData] as string);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    // Prevent duplicate submissions
    if (isSubmitting) return;
    
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setTouched(allTouched);

    if (!validateForm()) {
      setSubmitError('Please fix the errors above before submitting.');
      return;
    }

    // Check if cart is empty
    if (cartItems.length === 0) {
      setSubmitError('Your cart is empty!');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const newOrderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setOrderId(newOrderId);
      
      // Prepare order data for both Convex and email
      const orderData = {
        orderId: newOrderId,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        shippingCity: formData.city,
        shippingZip: formData.zipCode,
        shippingCountry: formData.country,
        paymentMethod: formData.paymentMethod,
        items: cartItems,
        subtotal,
        shipping,
        vat,
        grandTotal,
      };
      
      await createOrder(orderData);
      
      console.log('Order saved to Convex successfully!');
      
      try {
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(orderData),
        });
        
        if (emailResponse.ok) {
          console.log('Confirmation email sent successfully!');
        } else {
          console.error('Email sending failed, but order was saved');
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }
      
      // Show confirmation modal
      setShowConfirmation(true);
      
      // Clear cart
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('storage'));
      
    } catch (error) {
      console.error('Order creation failed:', error);
      setSubmitError('Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="font-manrope bg-off-white min-h-screen py-8">
        <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0">
          {/* Go Back */}
          <button 
            onClick={() => router.back()}
            className="text-[15px] text-very-dark/50 hover:text-raw-sienna transition-colors font-medium mb-6"
          >
            Go Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 bg-white rounded-lg p-6 md:p-12">
              <h1 className="text-h4 md:text-h3 font-bold uppercase mb-8 tracking-[1.15px]">
                CHECKOUT
              </h1>

              {/* Submit Error */}
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm font-medium">{submitError}</p>
                </div>
              )}

              {/* Billing Details */}
              <div className="mb-8">
                <h3 className="text-[13px] font-bold text-raw-sienna tracking-[1px] uppercase mb-4">
                  BILLING DETAILS
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[12px] font-bold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Alexei Ward"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-raw-sienna ${
                        errors.name && touched.name ? 'border-red-500' : 'border-off-white'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-500 text-[12px] mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="alexei@mail.com"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-raw-sienna ${
                        errors.email && touched.email ? 'border-red-500' : 'border-off-white'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="+1 202-555-0136"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-raw-sienna ${
                        errors.phone && touched.phone ? 'border-red-500' : 'border-off-white'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {errors.phone && touched.phone && (
                      <p className="text-red-500 text-[12px] mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-8">
                <h3 className="text-[13px] font-bold text-raw-sienna tracking-[1px] uppercase mb-4">
                  SHIPPING INFO
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[12px] font-bold mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="1137 Williams Avenue"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-raw-sienna ${
                        errors.address && touched.address ? 'border-red-500' : 'border-off-white'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {errors.address && touched.address && (
                      <p className="text-red-500 text-[12px] mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[12px] font-bold mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="10001"
                        disabled={isSubmitting}
                        className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-raw-sienna ${
                          errors.zipCode && touched.zipCode ? 'border-red-500' : 'border-off-white'
                        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                      {errors.zipCode && touched.zipCode && (
                        <p className="text-red-500 text-[12px] mt-1">{errors.zipCode}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="New York"
                        disabled={isSubmitting}
                        className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-raw-sienna ${
                          errors.city && touched.city ? 'border-red-500' : 'border-off-white'
                        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                      {errors.city && touched.city && (
                        <p className="text-red-500 text-[12px] mt-1">{errors.city}</p>
                      )}
                    </div>
                  </div>

                  <div className="md:w-1/2 md:pr-3">
                    <label className="block text-[12px] font-bold mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="United States"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-raw-sienna ${
                        errors.country && touched.country ? 'border-red-500' : 'border-off-white'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {errors.country && touched.country && (
                      <p className="text-red-500 text-[12px] mt-1">{errors.country}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="mb-8">
                <h3 className="text-[13px] font-bold text-raw-sienna tracking-[1px] uppercase mb-4">
                  PAYMENT DETAILS
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="block text-[12px] font-bold">
                    Payment Method
                  </label>

                  <div className="space-y-4">
                    <label className={`flex items-center gap-4 px-6 py-4 border rounded-lg cursor-pointer ${
                      formData.paymentMethod === 'e-money' ? 'border-raw-sienna' : 'border-off-white'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="e-money"
                        checked={formData.paymentMethod === 'e-money'}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="accent-raw-sienna"
                      />
                      <span className="text-[14px] font-bold">e-Money</span>
                    </label>

                    <label className={`flex items-center gap-4 px-6 py-4 border rounded-lg cursor-pointer ${
                      formData.paymentMethod === 'cash' ? 'border-raw-sienna' : 'border-off-white'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="accent-raw-sienna"
                      />
                      <span className="text-[14px] font-bold">Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'e-money' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-[12px] font-bold mb-2">
                        e-Money Number
                      </label>
                      <input
                        type="text"
                        name="eMoneyNumber"
                        value={formData.eMoneyNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="238521993"
                        disabled={isSubmitting}
                        className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-raw-sienna ${
                          errors.eMoneyNumber && touched.eMoneyNumber ? 'border-red-500' : 'border-off-white'
                        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                      {errors.eMoneyNumber && touched.eMoneyNumber && (
                        <p className="text-red-500 text-[12px] mt-1">{errors.eMoneyNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold mb-2">
                        e-Money PIN
                      </label>
                      <input
                        type="text"
                        name="eMoneyPin"
                        value={formData.eMoneyPin}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="6891"
                        maxLength={4}
                        disabled={isSubmitting}
                        className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-raw-sienna ${
                          errors.eMoneyPin && touched.eMoneyPin ? 'border-red-500' : 'border-off-white'
                        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                      {errors.eMoneyPin && touched.eMoneyPin && (
                        <p className="text-red-500 text-[12px] mt-1">{errors.eMoneyPin}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Component */}
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              vat={vat}
              grandTotal={grandTotal}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </main>

      {/* Order Confirmation Modal */}
      <OrderConfirmation
        isOpen={showConfirmation}
        cartItems={cartItems}
        grandTotal={grandTotal}
        orderId={orderId}
      />
    </>
  );
}