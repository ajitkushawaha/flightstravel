import { CreditCard, DollarSign, Award, CalendarClock, Sparkles, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: CreditCard,
    title: "No Card Fee",
    description: "Pay securely without extra charges.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: DollarSign,
    title: "Lowest Price Guarantee",
    description: "Find a better price? We'll match it.",
    color: "bg-orange-100 text-orange-500",
  },
  {
    icon: Award,
    title: "Award Winning Support",
    description: "Travel with confidence 24/7.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: CalendarClock,
    title: "Flexible Booking",
    description: "Change plans? No worries.",
    color: "bg-blue-100 text-blue-500",
  },
  {
    icon: Sparkles,
    title: "Exclusive Deals",
    description: "Extra savings on top brands.",
    color: "bg-teal-100 text-teal-600",
  },
  {
    icon: Users,
    title: "Trusted by Millions",
    description: "Over 3M+ happy travelers.",
    color: "bg-pink-100 text-pink-500",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-10 bg-muted/50">
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Column */}
          <div className="lg:w-1/3 text-left">
            <span className="text-primary font-bold text-xs tracking-widest uppercase mb-2 block">Why Choose Us</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6 leading-tight">
              Why book your holiday packages with us?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We make your travel dreams simple, affordable and hassle-free. From flights to hotels, we've got you covered.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Right Column Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
