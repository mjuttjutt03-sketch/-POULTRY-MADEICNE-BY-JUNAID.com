
export interface Product {
  id: string;
  name: string;
  category: 'Antibiotics' | 'Vaccines' | 'Vitamins' | 'Dewormers' | 'Probiotics';
  description: string;
  dosage: string;
  indication: string;
  image: string;
  price: number;
}

export interface DiagnosticResult {
  disease: string;
  confidence: number;
  symptoms: string[];
  recommendedTreatments: string[];
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  explanation: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppRoute {
  HOME = 'home',
  SHOP = 'shop',
  DIAGNOSTIC = 'diagnostic',
  EXPERT = 'expert',
  RESOURCES = 'resources'
}
