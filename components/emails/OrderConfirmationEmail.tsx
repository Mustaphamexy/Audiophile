import React from 'react';

interface OrderConfirmationEmailProps {
  customerName: string;
  orderId: string;
  items: Array<{
    slug: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  grandTotal: number;
  shippingAddress: string;
  shippingCity: string;
  shippingZip: string;
  shippingCountry: string;
}

export function OrderConfirmationEmail({
  customerName,
  orderId,
  items,
  grandTotal,
  shippingAddress,
  shippingCity,
  shippingZip,
  shippingCountry,
}: OrderConfirmationEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ background: '#101010', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ margin: 0 }}>AUDIOPHILE</h1>
        <h2 style={{ margin: '10px 0 0 0' }}>Order Confirmation</h2>
      </div>
      
      <div style={{ background: '#fafafa', padding: '20px' }}>
        <p>Hi {customerName},</p>
        <p>Thank you for your order! We're getting it ready to be shipped.</p>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h3 style={{ margin: '0 0 15px 0' }}>Order #{orderId}</h3>
          
          {items.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <strong>{item.name}</strong><br />
                <span>Qty: {item.quantity}</span>
              </div>
              <div>${(item.price * item.quantity).toLocaleString()}</div>
            </div>
          ))}
          
          <div style={{ borderTop: '1px solid #ddd', paddingTop: '10px', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div><strong>Grand Total</strong></div>
              <div><strong>${grandTotal.toLocaleString()}</strong></div>
            </div>
          </div>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h3 style={{ margin: '0 0 15px 0' }}>Shipping Address</h3>
          <p>
            {customerName}<br />
            {shippingAddress}<br />
            {shippingCity}, {shippingZip}<br />
            {shippingCountry}
          </p>
        </div>
        
        <p>
          <a 
            href={`${process.env.NEXT_PUBLIC_APP_URL}/confirmation/${orderId}`}
            style={{
              display: 'inline-block',
              background: '#D87D4A',
              color: 'white',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '4px',
            }}
          >
            View Your Order
          </a>
        </p>
        
        <p>If you have any questions, contact us at support@audiophile.com</p>
        
        <p>Best regards,<br />The Audiophile Team</p>
      </div>
    </div>
  );
}