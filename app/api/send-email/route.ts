import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    const { data, error } = await resend.emails.send({
      from:
        process.env.NODE_ENV === "production"
          ? "Audiophile <no-reply@yourdomain.com>"
          : "Audiophile <onboarding@resend.dev>",
      to: [orderData.customerEmail],
      subject: `Order Confirmation - ${orderData.orderId}`,
      html: `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order, ${orderData.customerName}!</p>
        <p><strong>Order ID:</strong> ${orderData.orderId}</p>
        <p><strong>Total:</strong> $${orderData.grandTotal}</p>
        <h2>Items:</h2>
        <ul>
          ${orderData.items.map((item: any) => `
            <li>${item.name} - $${item.price} x ${item.quantity}</li>
          `).join('')}
        </ul>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}