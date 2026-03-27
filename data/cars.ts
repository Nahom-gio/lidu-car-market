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

export const cars: Car[] = [];

export function getCarById(id: string) {
  return cars.find((car) => car.id === id);
}
