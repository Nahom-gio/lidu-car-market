export type InventoryStatus = "just-arrived" | "low-stock" | "sold-out" | "available";

export interface Car {
  id: string;
  name: string;
  brand: string;
  make?: string;
  model?: string;
  trim?: string;
  variant?: string;
  packageNote?: string;
  category: string;
  year: number;
  bodyType?: string;
  bodyStructure?: string;
  dimensions?: string;
  wheelbase?: string;
  engine: string;
  condition?: string;
  powerOutput?: string;
  hp: string;
  torque: string;
  mileage: string;
  transmission: string;
  drivetrain: string;
  fuelType: string;
  fuelConsumption?: string;
  topSpeed: string;
  acceleration: string;
  seats: number;
  color: string;
  interior: string;
  optionNote?: string;
  batteryStatus?: string;
  batteryType?: string;
  batteryCapacity?: string;
  rangeKm?: string;
  chargingTime?: string;
  plateNumber?: string;
  commissionNote?: string;
  contactPhone?: string;
  description: string;
  images: string[];
  highlights: string[];
  priceBirr: string;
  cashPriceBirr?: string;
  bankPriceBirr?: string;
  downPaymentBirr?: string;
  monthlyPaymentBirr?: string;
  financingAvailable?: boolean;
  importYear: number;
  dutyPaid: boolean;
  kmDriven: number;
  cityLocation: string;
  marketNote: string;
  inventoryStatus?: InventoryStatus;
}

export const cars: Car[] = [
  {
    id: "toyota-land-cruiser-v8-2020",
    name: "Land Cruiser V8",
    brand: "Toyota",
    category: "SUV",
    year: 2020,
    engine: "V8 Turbo Diesel 4.5L",
    hp: "268 HP",
    torque: "650 Nm",
    mileage: "68,000 km",
    transmission: "6-Speed Automatic",
    drivetrain: "Four-Wheel Drive",
    fuelType: "Diesel",
    topSpeed: "210 km/h",
    acceleration: "0-100 in 8.9s",
    seats: 7,
    color: "Pearl White",
    interior: "Beige Leather",
    description:
      "A full-size Land Cruiser V8 with high demand in Addis Ababa for embassy, business, and family use. This unit is duty paid, Addis-registered, and configured for long-distance comfort on Ethiopian roads.",
    images: ["/images/car-suv.jpg", "/images/hero-car.jpg", "/images/car-coupe.jpg"],
    highlights: ["Cool Box", "Rear Entertainment", "KDSS Suspension", "360 Camera"],
    priceBirr: "28,500,000 ETB",
    importYear: 2024,
    dutyPaid: true,
    kmDriven: 68000,
    cityLocation: "Addis Ababa, Bole",
    marketNote: "High resale demand among embassy, NGO, and executive buyers.",
    inventoryStatus: "low-stock",
  },
  {
    id: "toyota-prado-txl-2021",
    name: "Prado TXL",
    brand: "Toyota",
    category: "SUV",
    year: 2021,
    engine: "Turbo Diesel 2.8L",
    hp: "201 HP",
    torque: "500 Nm",
    mileage: "41,500 km",
    transmission: "6-Speed Automatic",
    drivetrain: "Four-Wheel Drive",
    fuelType: "Diesel",
    topSpeed: "175 km/h",
    acceleration: "0-100 in 10.2s",
    seats: 7,
    color: "Silver Metallic",
    interior: "Black Leather",
    description:
      "A facelift Prado TXL that matches current Ethiopian showroom demand. Diesel Prado units are among the most liquid premium SUVs in Addis due to reliability, parts support, and strong resale value.",
    images: ["/images/car-suv.jpg", "/images/car-sports.jpg", "/images/hero-car.jpg"],
    highlights: ["Sunroof", "Crawl Control", "Rear Camera", "Push Start"],
    priceBirr: "15,800,000 ETB",
    importYear: 2024,
    dutyPaid: false,
    kmDriven: 41500,
    cityLocation: "Addis Ababa, Megenagna",
    marketNote: "One of the fastest-moving premium SUVs in the Ethiopian used market.",
  },
  {
    id: "lexus-rx350-2020",
    name: "RX350 F Sport",
    brand: "Lexus",
    category: "SUV",
    year: 2020,
    engine: "V6 Petrol 3.5L",
    hp: "295 HP",
    torque: "370 Nm",
    mileage: "52,300 km",
    transmission: "8-Speed Automatic",
    drivetrain: "All-Wheel Drive",
    fuelType: "Petrol",
    topSpeed: "200 km/h",
    acceleration: "0-100 in 7.7s",
    seats: 5,
    color: "Atomic Silver",
    interior: "Red Leather",
    description:
      "The RX350 remains one of the easiest premium crossovers to sell in Ethiopia. Buyers value its smooth V6, upscale cabin, and manageable operating cost compared with European rivals.",
    images: ["/images/car-suv.jpg", "/images/car-sedan.jpg", "/images/hero-car.jpg"],
    highlights: ["Mark Levinson Audio", "Blind Spot Monitor", "Panoramic Roof", "Power Tailgate"],
    priceBirr: "11,900,000 ETB",
    importYear: 2024,
    dutyPaid: true,
    kmDriven: 52300,
    cityLocation: "Addis Ababa, Sarbet",
    marketNote: "Ideal for family or executive use with strong Lexus resale confidence.",
  },
  {
    id: "nissan-patrol-2019",
    name: "Patrol LE Platinum",
    brand: "Nissan",
    category: "SUV",
    year: 2019,
    engine: "V8 Petrol 5.6L",
    hp: "400 HP",
    torque: "560 Nm",
    mileage: "59,800 km",
    transmission: "7-Speed Automatic",
    drivetrain: "Four-Wheel Drive",
    fuelType: "Petrol",
    topSpeed: "210 km/h",
    acceleration: "0-100 in 6.8s",
    seats: 8,
    color: "Black Obsidian",
    interior: "Tan Leather",
    description:
      "A premium full-size SUV commonly stocked by high-end Addis dealers for buyers who want road presence similar to Land Cruiser models with a more comfort-oriented cabin.",
    images: ["/images/car-suv.jpg", "/images/car-coupe.jpg", "/images/hero-car.jpg"],
    highlights: ["Hydraulic Body Motion Control", "360 Camera", "Rear Screens", "BOSE Audio"],
    priceBirr: "18,700,000 ETB",
    importYear: 2024,
    dutyPaid: true,
    kmDriven: 59800,
    cityLocation: "Addis Ababa, Bole",
    marketNote: "Appeals to buyers cross-shopping Land Cruiser V8 for size and comfort.",
  },
  {
    id: "hyundai-santa-fe-2022",
    name: "Santa Fe Calligraphy",
    brand: "Hyundai",
    category: "SUV",
    year: 2022,
    engine: "Turbo Diesel 2.2L",
    hp: "199 HP",
    torque: "440 Nm",
    mileage: "27,400 km",
    transmission: "8-Speed Automatic",
    drivetrain: "All-Wheel Drive",
    fuelType: "Diesel",
    topSpeed: "205 km/h",
    acceleration: "0-100 in 9.4s",
    seats: 7,
    color: "Glacier White",
    interior: "Black Nappa Leather",
    description:
      "A recent-shape Santa Fe that fits the upper-mid market in Addis. Diesel Santa Fe inventory is increasingly visible as buyers look for newer family SUVs below Prado and V8 price bands.",
    images: ["/images/car-suv.jpg", "/images/hero-car.jpg", "/images/car-sedan.jpg"],
    highlights: ["12.3-inch Cluster", "360 Camera", "Ventilated Seats", "Bose Audio"],
    priceBirr: "10,800,000 ETB",
    importYear: 2025,
    dutyPaid: false,
    kmDriven: 27400,
    cityLocation: "Addis Ababa, CMC",
    marketNote: "A newer-shape diesel SUV for buyers seeking value below Prado pricing.",
    inventoryStatus: "just-arrived",
  },
  {
    id: "range-rover-vogue-2018",
    name: "Range Rover Vogue",
    brand: "Land Rover",
    category: "Luxury",
    year: 2018,
    engine: "V6 Diesel 3.0L",
    hp: "254 HP",
    torque: "600 Nm",
    mileage: "71,200 km",
    transmission: "8-Speed Automatic",
    drivetrain: "All-Wheel Drive",
    fuelType: "Diesel",
    topSpeed: "209 km/h",
    acceleration: "0-100 in 8.2s",
    seats: 5,
    color: "Fuji White",
    interior: "Espresso Leather",
    description:
      "A flagship Range Rover frequently targeted by diplomatic, executive, and luxury-focused buyers in Addis. Diesel Vogue units remain more practical locally than high-output petrol variants.",
    images: ["/images/car-suv.jpg", "/images/car-coupe.jpg", "/images/car-sports.jpg"],
    highlights: ["Meridian Audio", "Soft Close Doors", "Terrain Response", "Panoramic Roof"],
    priceBirr: "21,500,000 ETB",
    importYear: 2024,
    dutyPaid: true,
    kmDriven: 71200,
    cityLocation: "Addis Ababa, Kazanchis",
    marketNote: "Executive-grade luxury SUV for buyers prioritizing presence and comfort.",
    inventoryStatus: "sold-out",
  },
  {
    id: "mercedes-e350-2020",
    name: "E350",
    brand: "Mercedes-Benz",
    category: "Sedan",
    year: 2020,
    engine: "Turbo Petrol 2.0L",
    hp: "299 HP",
    torque: "400 Nm",
    mileage: "36,900 km",
    transmission: "9-Speed Automatic",
    drivetrain: "Rear-Wheel Drive",
    fuelType: "Petrol",
    topSpeed: "250 km/h",
    acceleration: "0-100 in 6.2s",
    seats: 5,
    color: "Obsidian Black",
    interior: "Macchiato Beige",
    description:
      "A clean E-Class suited to executives wanting comfort, brand prestige, and easy daily use in Addis. This segment trades steadily in premium used-car compounds around Bole and Sarbet.",
    images: ["/images/car-sedan.jpg", "/images/hero-car.jpg", "/images/car-coupe.jpg"],
    highlights: ["Burmester Audio", "Ambient Lighting", "360 Camera", "Memory Seats"],
    priceBirr: "12,400,000 ETB",
    importYear: 2024,
    dutyPaid: true,
    kmDriven: 36900,
    cityLocation: "Addis Ababa, Sarbet",
    marketNote: "Strong option for professionals moving up from Camry and ES-class cars.",
  },
  {
    id: "mercedes-s560-2018",
    name: "S560 4MATIC",
    brand: "Mercedes-Benz",
    category: "Luxury",
    year: 2018,
    engine: "V8 Biturbo 4.0L",
    hp: "463 HP",
    torque: "700 Nm",
    mileage: "48,600 km",
    transmission: "9-Speed Automatic",
    drivetrain: "All-Wheel Drive",
    fuelType: "Petrol",
    topSpeed: "250 km/h",
    acceleration: "0-100 in 4.8s",
    seats: 5,
    color: "Selenite Grey",
    interior: "Brown Nappa Leather",
    description:
      "A flagship S-Class for buyers shopping the upper end of the Addis luxury sedan market. These cars appeal to executives seeking comfort, rear-seat status, and top-tier refinement.",
    images: ["/images/car-sedan.jpg", "/images/car-coupe.jpg", "/images/hero-car.jpg"],
    highlights: ["Executive Rear Seats", "Burmester 3D Audio", "Massage Seats", "Night Package"],
    priceBirr: "24,800,000 ETB",
    importYear: 2024,
    dutyPaid: true,
    kmDriven: 48600,
    cityLocation: "Addis Ababa, Bole",
    marketNote: "Flagship luxury sedan with strong status appeal in Addis executive circles.",
    inventoryStatus: "low-stock",
  },
  {
    id: "lexus-es350-2021",
    name: "ES350",
    brand: "Lexus",
    category: "Sedan",
    year: 2021,
    engine: "V6 Petrol 3.5L",
    hp: "302 HP",
    torque: "356 Nm",
    mileage: "29,700 km",
    transmission: "8-Speed Automatic",
    drivetrain: "Front-Wheel Drive",
    fuelType: "Petrol",
    topSpeed: "210 km/h",
    acceleration: "0-100 in 6.8s",
    seats: 5,
    color: "White Pearl",
    interior: "Black Leather",
    description:
      "The ES350 is one of the most realistic premium sedan listings for Ethiopia, balancing comfort, Lexus reliability, and brand strength for professionals upgrading from Camry-class vehicles.",
    images: ["/images/car-sedan.jpg", "/images/hero-car.jpg", "/images/car-electric.jpg"],
    highlights: ["Mark Levinson Audio", "Adaptive Cruise", "Memory Package", "Blind Spot Monitor"],
    priceBirr: "10,600,000 ETB",
    importYear: 2025,
    dutyPaid: true,
    kmDriven: 29700,
    cityLocation: "Addis Ababa, Megenagna",
    marketNote: "Known for reliability and comfort, making it easy to remarket locally.",
  },
  {
    id: "toyota-camry-2023",
    name: "Camry XLE",
    brand: "Toyota",
    category: "Sedan",
    year: 2023,
    engine: "Petrol 2.5L",
    hp: "203 HP",
    torque: "250 Nm",
    mileage: "18,200 km",
    transmission: "8-Speed Automatic",
    drivetrain: "Front-Wheel Drive",
    fuelType: "Petrol",
    topSpeed: "210 km/h",
    acceleration: "0-100 in 8.3s",
    seats: 5,
    color: "Celestial Silver",
    interior: "Ash Leather",
    description:
      "A current-shape Camry with strong appeal in Addis for business owners and families wanting a clean, dependable sedan that still presents well in a premium showroom environment.",
    images: ["/images/car-sedan.jpg", "/images/car-sports.jpg", "/images/hero-car.jpg"],
    highlights: ["Leather Interior", "Adaptive Cruise", "Lane Assist", "Reverse Camera"],
    priceBirr: "8,900,000 ETB",
    importYear: 2025,
    dutyPaid: true,
    kmDriven: 18200,
    cityLocation: "Addis Ababa, Bole",
    marketNote: "Highly practical premium daily driver with broad buyer demand.",
    inventoryStatus: "just-arrived",
  },
  {
    id: "toyota-hilux-double-cab-2022",
    name: "Hilux Double Cab",
    brand: "Toyota",
    category: "Pickup",
    year: 2022,
    engine: "Turbo Diesel 2.8L",
    hp: "201 HP",
    torque: "500 Nm",
    mileage: "33,400 km",
    transmission: "6-Speed Automatic",
    drivetrain: "Four-Wheel Drive",
    fuelType: "Diesel",
    topSpeed: "175 km/h",
    acceleration: "0-100 in 10.7s",
    seats: 5,
    color: "Super White",
    interior: "Black Fabric",
    description:
      "A highly tradable double-cab pickup for contractors, NGOs, agricultural businesses, and buyers needing utility without sacrificing showroom-grade condition and local resale strength.",
    images: ["/images/hero-car.jpg", "/images/car-suv.jpg", "/images/car-sports.jpg"],
    highlights: ["Diff Lock", "Touchscreen Infotainment", "Reverse Camera", "Side Steps"],
    priceBirr: "10,700,000 ETB",
    importYear: 2025,
    dutyPaid: true,
    kmDriven: 33400,
    cityLocation: "Addis Ababa, Lebu",
    marketNote: "High-demand utility pickup for contractors, farms, and business fleets.",
  },
  {
    id: "byd-atto-3-2024",
    name: "Atto 3",
    brand: "BYD",
    category: "Electric",
    year: 2024,
    engine: "Single-Motor Electric",
    hp: "201 HP",
    torque: "310 Nm",
    mileage: "8,900 km",
    transmission: "Single-Speed Automatic",
    drivetrain: "Front-Wheel Drive",
    fuelType: "Electric",
    topSpeed: "160 km/h",
    acceleration: "0-100 in 7.3s",
    seats: 5,
    color: "Surf Blue",
    interior: "Blue and Grey",
    description:
      "A realistic EV listing for the emerging Addis electric market. The Atto 3 is increasingly visible thanks to Chinese EV adoption, lower running costs, and growing buyer curiosity around urban charging use.",
    images: ["/images/car-electric.jpg", "/images/car-suv.jpg", "/images/hero-car.jpg"],
    highlights: ["Blade Battery", "Rotating Display", "Panoramic Roof", "360 Camera"],
    priceBirr: "7,800,000 ETB",
    importYear: 2025,
    dutyPaid: false,
    kmDriven: 8900,
    cityLocation: "Addis Ababa, Bole",
    marketNote: "Emerging EV option for early adopters focused on urban Addis driving.",
    inventoryStatus: "just-arrived",
  },
];

export function getCarById(id: string) {
  return cars.find((car) => car.id === id);
}
