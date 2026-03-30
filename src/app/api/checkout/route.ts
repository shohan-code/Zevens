import { NextResponse } from 'next/server';
import { createOrder, Order } from '@/lib/firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerDetails, items, totalAmount } = body;

    // 1. Validate request
    if (!customerDetails || !items || !totalAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Save Order to Firebase Firestore
    const orderData: Omit<Order, 'id'> = {
      customerDetails,
      items,
      totalAmount,
      status: 'pending',
    };
    
    // Save to Firestore and get generated Order ID
    const orderId = await createOrder(orderData);

    // As requested, no automated SMS/Email is sent here. The admin will manually contact the customer.

    return NextResponse.json({ 
      success: true, 
      message: 'Order placed successfully.', 
      orderId 
    });

  } catch (error: any) {
    console.error('Error in checkout API:', error);
    return NextResponse.json({ error: 'Failed to process order', details: error.message }, { status: 500 });
  }
}
