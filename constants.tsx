
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'AvianVax Gumboro',
    category: 'Vaccines',
    description: 'High-potency vaccine against Infectious Bursal Disease.',
    dosage: 'Administer via drinking water at 14 days.',
    indication: 'Prevention of IBD in broilers and layers.',
    image: 'https://picsum.photos/seed/vax1/400/300',
    price: 45.99
  },
  {
    id: '2',
    name: 'Tylosin Soluble Powder',
    category: 'Antibiotics',
    description: 'Broad-spectrum antibiotic for Chronic Respiratory Disease (CRD).',
    dosage: '0.5g per liter of drinking water for 3-5 days.',
    indication: 'Treatment of Mycoplasma infections.',
    image: 'https://picsum.photos/seed/anti1/400/300',
    price: 22.50
  },
  {
    id: '3',
    name: 'VitaGrowth Multi-Vitamin',
    category: 'Vitamins',
    description: 'Concentrated vitamin and electrolyte supplement.',
    dosage: '1g per 2 liters of water daily.',
    indication: 'Stress relief and growth promotion.',
    image: 'https://picsum.photos/seed/vit1/400/300',
    price: 15.00
  },
  {
    id: '4',
    name: 'Piperazine Dewormer',
    category: 'Dewormers',
    description: 'Effective against roundworms in poultry.',
    dosage: 'Single dose in water, repeat in 14 days.',
    indication: 'Intestinal parasite control.',
    image: 'https://picsum.photos/seed/worm1/400/300',
    price: 12.99
  }
];
