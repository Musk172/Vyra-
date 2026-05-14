export type Microgreen = {
  id: string;
  name: string;
  image: string;
  tasteProfile: string;
  dishes: string[];
  benefits: string[];
  vitamins: string[];
  freshness: string;
  color: string;
};

export const microgreens: Microgreen[] = [
  {
    id: 'sunflower',
    name: 'Sunflower',
    image: '/Remove_the_button,_the_heading,_202605141210.jpeg',
    tasteProfile: 'Nutty, Crunchy, Sweet',
    dishes: ['Poha', 'Wraps', 'Smoothies', 'Salads'],
    benefits: ['High protein', 'Boosts immunity', 'Heart healthy'],
    vitamins: ['Vitamin A', 'Vitamin B complex', 'Vitamin E', 'Zinc'],
    freshness: 'Harvested on order',
    color: '#facc15' // yellow-400
  },
  {
    id: 'radish',
    name: 'Radish',
    image: '/Reddish.jpeg',
    tasteProfile: 'Peppery, Crisp, Spicy',
    dishes: ['Chaat', 'Paratha', 'Dosa', 'Sandwiches'],
    benefits: ['Aids digestion', 'Detoxifying', 'Weight management'],
    vitamins: ['Vitamin C', 'Calcium', 'Iron', 'Magnesium'],
    freshness: 'Farm fresh delivery',
    color: '#e879f9' // fuchsia-400
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    image: '/Broccoli..jpeg',
    tasteProfile: 'Mild, Fresh, Earthy',
    dishes: ['Paneer bowls', 'Upma', 'Salads', 'Smoothies'],
    benefits: ['Cancer-fighting properties', 'Reduces inflammation', 'Supports brain health'],
    vitamins: ['Vitamin C', 'Vitamin K', 'Sulforaphane', 'Potassium'],
    freshness: 'Cut fresh to order',
    color: '#4ade80' // green-400
  },
  {
    id: 'pea-shoots',
    name: 'Pea Shoots',
    image: '/P shoot..jpeg',
    tasteProfile: 'Sweet, Tender, Pea-like',
    dishes: ['Wraps', 'Sandwiches', 'Salads', 'Dosa'],
    benefits: ['Rich in antioxidants', 'Regulates blood sugar', 'Eye health'],
    vitamins: ['Vitamin A', 'Vitamin C', 'Folate', 'Iron'],
    freshness: 'Delivered in live soil',
    color: '#86efac' // green-300
  },
  {
    id: 'mustard',
    name: 'Mustard',
    image: '/Mustard.jpeg',
    tasteProfile: 'Zesty, Tender, Spicy',
    dishes: ['Paratha', 'Chaat', 'Wraps', 'Sandwiches'],
    benefits: ['Clears sinuses', 'Anti-inflammatory', 'Metabolism boost'],
    vitamins: ['Vitamin A', 'Vitamin C', 'Vitamin K', 'Manganese'],
    freshness: 'Farm fresh delivery',
    color: '#fde047' // yellow-300
  },
  {
    id: 'basil',
    name: 'Basil',
    image: '/Basil.jpeg',
    tasteProfile: 'Sweet, Delicate, Fragrant',
    dishes: ['Paneer bowls', 'Sandwiches', 'Wraps', 'Salads'],
    benefits: ['Anti-bacterial', 'Reduces stress', 'Improves digestion'],
    vitamins: ['Vitamin K', 'Vitamin A', 'Iron', 'Calcium'],
    freshness: 'Cut fresh to order',
    color: '#34d399' // emerald-400
  },
  {
    id: 'beetroot',
    name: 'Beetroot',
    image: '/Beetroot.jpeg',
    tasteProfile: 'Earthy, Crisp, Sweet',
    dishes: ['Salads', 'Smoothies', 'Wraps', 'Chaat'],
    benefits: ['Improves blood flow', 'Lowers blood pressure', 'Detoxifying'],
    vitamins: ['Folate', 'Manganese', 'Potassium', 'Iron'],
    freshness: 'Delivered in live soil',
    color: '#fb7185' // rose-400
  },
  {
    id: 'fenugreek',
    name: 'Fenugreek',
    image: '/Fenugreek.jpeg',
    tasteProfile: 'Nutty, Tender, Bitter',
    dishes: ['Methi Paratha', 'Chaat', 'Dals', 'Salads'],
    benefits: ['Regulates blood sugar', 'Aids digestion', 'Reduces cholesterol'],
    vitamins: ['Iron', 'Vitamin B6', 'Manganese', 'Magnesium'],
    freshness: 'Harvested on order',
    color: '#84cc16' // lime-500
  }
];
