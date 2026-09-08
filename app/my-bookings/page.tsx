"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Loader2, Calendar, Users, CreditCard, Ship, Plane, Building, Map, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/");
    }

    if (status === "authenticated") {
      fetchBookings();
    }
  }, [status]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'FLIGHT': return <Plane className="h-5 w-5 text-blue-500" />;
      case 'HOTEL': return <Building className="h-5 w-5 text-indigo-500" />;
      case 'CRUISE': return <Ship className="h-5 w-5 text-cyan-500" />;
      case 'TOUR': return <Map className="h-5 w-5 text-emerald-500" />;
      default: return <CreditCard className="h-5 w-5 text-gray-500" />;
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow flex items-center justify-center pt-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow pt-28 pb-12 bg-muted/30">
        <div className="container max-w-[1200px] mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl font-serif font-bold mb-8">My Bookings</h1>

            {bookings.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground mb-6">You haven't made any bookings yet.</p>
                  <a href="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Start Exploring
                  </a>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden border-l-4 border-l-primary">
                    <div className="flex flex-col md:flex-row">
                      <div className="grow p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-muted p-3 rounded-full">
                              {getIcon(booking.itemType)}
                            </div>
                            <div>
                              <CardTitle className="text-xl mb-1">{booking.itemName || booking.cruiseName}</CardTitle>
                              <CardDescription>
                                {booking.confirmationCode ? `Confirmation: ${booking.confirmationCode}` : `Booking ID: ${booking.id.substring(0,8)}`}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'} className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}>
                              {booking.status.toUpperCase()}
                            </Badge>
                            <Badge variant={booking.paymentStatus === 'paid' ? 'default' : 'outline'} className={booking.paymentStatus === 'paid' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : ''}>
                              {booking.paymentStatus.toUpperCase()}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/50">
                          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{booking.date ? format(new Date(booking.date), 'PPP') : 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <CreditCard className="h-4 w-4" />
                            <span>{booking.currency === 'INR' ? '₹' : (booking.currency === 'USD' ? '$' : '£')}{booking.totalAmount}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <ShieldCheck className="h-4 w-4" />
                            <span>{booking.paymentMethod || 'Razorpay'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
