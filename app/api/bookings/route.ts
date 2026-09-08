import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    const body = await request.json();
    const { 
      itemType, 
      itemId, 
      itemName, 
      name, 
      email, 
      phone, 
      date, 
      guests, 
      totalAmount,
      userId 
    } = body;

    if (!itemType || !itemId || !itemName || !name || !email || !date || !guests) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Determine the relation to set based on itemType
    const bookingData: any = {
      userId: userId || (session?.user as any)?.id || null,
      itemType,
      itemName,
      name,
      email,
      phone,
      date: new Date(date),
      guests: parseInt(guests.toString(), 10),
      totalAmount: parseFloat(totalAmount),
      status: 'pending',
      paymentStatus: 'pending'
    };

    if (itemType === 'CRUISE') {
      // bookingData.cruiseId = itemId; // Commented out to prevent foreign key errors with mock data
      bookingData.cruiseName = itemName; // For legacy compatibility
    } else if (itemType === 'HOTEL') {
      // bookingData.hotelId = itemId; // Commented out to prevent foreign key errors with mock data
    } else if (itemType === 'TOUR') {
      // bookingData.tourId = itemId; // Commented out to prevent foreign key errors with mock data
    } else if (itemType === 'TRANSFER') {
      // bookingData.transferId = itemId; // Commented out to prevent foreign key errors with mock data
    } else if (itemType === 'FLIGHT') {
       // Since Flight is not a table yet, we just store it in itemName and itemType
    }

    const booking = await prisma.booking.create({
      data: bookingData
    });

    return NextResponse.json({ 
      success: true, 
      data: booking 
    });

  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: bookings });
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
