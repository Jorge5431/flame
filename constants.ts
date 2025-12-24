
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'drop-001',
    name: 'DROP 001 - IGNITE TEE',
    category: 'Men',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200',
    description: 'Heavyweight premium cotton. Oversized "Box" fit. Minimal FLAME chest symbol. High-density "IGNITE YOUR HEART" back print.',
    colors: ['Black', 'Off-White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'hoodie-001',
    name: 'SILENT FIRE HOODIE',
    category: 'Men',
    price: 125.00,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    description: '450GSM heavyweight fleece. Minimalist silhouette. Embossed FLAME branding on chest.',
    colors: ['Black', 'Charcoal'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 'pant-001',
    name: 'INTENSITY TROUSERS',
    category: 'Men',
    price: 145.00,
    image: 'https://images.unsplash.com/photo-1551839066-747f7c45cb89?auto=format&fit=crop&q=80&w=800',
    description: 'Straight-leg tailored joggers. Luxury tech-wool blend. Hidden hardware.',
    colors: ['Black'],
    sizes: ['30', '32', '34']
  },
  {
    id: 'cap-001',
    name: 'FLAME LOGO CAP',
    category: 'Accessories',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800',
    description: 'Unstructured six-panel cap. Brushed cotton twill. Tone-on-tone embroidery.',
    colors: ['Black', 'Grey'],
    sizes: ['One Size']
  }
];
