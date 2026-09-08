const fs = require('fs');
const path = require('path');

const libDataDir = path.join(__dirname, '../lib/data');
if (!fs.existsSync(libDataDir)) {
  fs.mkdirSync(libDataDir, { recursive: true });
}

// Helpers
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(1);
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const airlines = ["Emirates", "Qatar Airways", "British Airways", "Etihad Airways", "Lufthansa", "Singapore Airlines", "Delta", "Air France", "KLM"];
const airports = ["LHR", "JFK", "DXB", "SIN", "CDG", "FRA", "AMS", "SYD", "HKG", "NRT", "BKK", "IST"];
const destinations = ["Dubai", "London", "New York", "Singapore", "Paris", "Bangkok", "Tokyo", "Rome", "Bali", "Maldives"];
const hotelNames = ["Grand Plaza", "The Ritz", "Hilton Bay", "Marriott City Center", "Four Seasons", "Waldorf Astoria", "InterContinental", "Sheraton", "Hyatt Regency", "Novotel"];
const cruiseLines = ["Royal Caribbean", "Norwegian Cruise Line", "Carnival", "Princess Cruises", "MSC Cruises", "Celebrity Cruises"];
const cruiseRoutes = ["Mediterranean Grandeur", "Caribbean Hopper", "Alaskan Glacier", "Nordic Fjords", "Bahamas Gateway"];
const discountTexts = ["Get up to 10% OFF", "Get up to 20% OFF", "Get up to 30% OFF", "Get up to 40% OFF", "Get up to 50% OFF", "Special Deal", "Flash Sale"];

// FLIGHTS (30)
const flights = [];
for (let i = 1; i <= 30; i++) {
  const dep = randomItem(airports);
  let arr = randomItem(airports);
  while (arr === dep) arr = randomItem(airports);
  
  flights.push({
    id: `f${i}`,
    airline: randomItem(airlines),
    logo: "https://api.flightstravel.co.uk/uploads/blogImage/1589908956783_imgbritish.jpg", // placeholder for all to be safe
    price: randomInt(200, 1500) + 0.99,
    seatsLeft: randomInt(1, 15),
    destination: randomItem(destinations), // added for flight deals
    discount: randomItem(discountTexts), // added for flight deals
    image: `https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=800&auto=format&fit=crop`, // fake unsplash
    segments: [
      {
        departureCode: dep,
        arrivalCode: arr,
        departureTime: `${String(randomInt(0, 23)).padStart(2, '0')}:${String(randomInt(0, 59)).padStart(2, '0')}`,
        departureDate: `Oct ${randomInt(1, 30)}, 2026`,
        arrivalTime: `${String(randomInt(0, 23)).padStart(2, '0')}:${String(randomInt(0, 59)).padStart(2, '0')}`,
        arrivalDate: `Oct ${randomInt(1, 30)}, 2026`,
        duration: `${randomInt(2, 14)}h ${randomInt(0, 59)}m`,
        stops: randomItem(["DIRECT", "1 STOP", "2 STOPS"])
      }
    ]
  });
}
// Fix first 4 flight images to look good for flight deals
flights[0].image = "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop";
flights[1].image = "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop";
flights[2].image = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop";
flights[3].image = "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/c6/d5/4b.jpg";

// HOTELS (30)
const hotels = [];
for (let i = 1; i <= 30; i++) {
  const p = randomInt(80, 600);
  hotels.push({
    id: `h${i}`,
    title: `${randomItem(hotelNames)} ${randomItem(["Resort", "Hotel", "Suites", "Lodge"])}`,
    location: `${randomItem(destinations)}, City Center`,
    rating: parseFloat(randomFloat(3.5, 5.0)),
    reviews: randomInt(10, 500),
    price: p,
    originalPrice: Math.random() > 0.5 ? p + randomInt(20, 100) : null,
    image: "/hero.png", // fallback image
    icons: ["Bed", "Car", "Wifi"], // we will map these to lucide-react icons in the component
    amenities: ["Free Wifi", "Pool", "Spa", "Gym"]
  });
}

// CRUISES (30)
const cruises = [];
for (let i = 1; i <= 30; i++) {
  const dp = randomInt(400, 3000);
  cruises.push({
    id: `c${i}`,
    nameEn: `${randomItem(cruiseLines)} ${randomItem(["Explorer", "Voyager", "Majesty", "Princess"])}`,
    routeEn: randomItem(cruiseRoutes),
    image: `https://images.unsplash.com/photo-1548574505-5e8d28b86431?q=80&w=800&auto=format&fit=crop`,
    tags: [randomItem(["Best Seller", "Luxury", "Family Friendly", "Romantic"])],
    duration: `${randomInt(3, 14)} Nights`,
    rating: parseFloat(randomFloat(4.0, 5.0)),
    reviews: randomInt(50, 800),
    price: dp,
    originalPrice: dp + randomInt(100, 500)
  });
}
cruises[0].image = "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=800&auto=format&fit=crop";
cruises[2].image = "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop";

const writeModule = (name, data) => {
  const content = `export const ${name} = ${JSON.stringify(data, null, 2)};\n\nexport const getAll${name.charAt(0).toUpperCase() + name.slice(1)} = () => ${name};\nexport const get${name.charAt(0).toUpperCase() + name.slice(1, -1)}ById = (id: string) => ${name}.find(item => item.id === id);\nexport const getFeatured${name.charAt(0).toUpperCase() + name.slice(1)} = (count: number = 4) => ${name}.slice(0, count);\n`;
  fs.writeFileSync(path.join(libDataDir, `${name}.ts`), content);
};

writeModule('flights', flights);
writeModule('hotels', hotels);
writeModule('cruises', cruises);

console.log("Mock data generated successfully in lib/data!");
