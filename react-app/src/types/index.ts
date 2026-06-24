export interface InteractiveTableDish {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export const interactiveDishes: InteractiveTableDish[] = [
  {
    id: 'it1',
    name: 'Croquetas Caseras',
    description: 'Selección de croquetas artesanales de jamón, puchero y boletus.',
    price: '9 €',
    image: 'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260951/unnamed_18_ckvs0l.webp',
    category: 'Entrantes'
  },
  {
    id: 'it2',
    name: 'Solomillo al Whisky',
    description: 'Solomillo ibérico flambeado con salsa al whisky y guarnición.',
    price: '17 €',
    image: 'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260951/unnamed_19_c2jiks.webp',
    category: 'Carnes'
  },
  {
    id: 'it3',
    name: 'Torrijas de la Abuela',
    description: 'Torrijas caramelizadas con canela y helado de vainilla.',
    price: '7 €',
    image: 'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260952/unnamed_23_jmbunf.webp',
    category: 'Postres'
  },
  {
    id: 'it4',
    name: 'Vino de la Casa',
    description: 'Selección de vinos tintos, blancos y rosados de la región.',
    price: '3 €',
    image: 'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260952/unnamed_18_ckvs0l.webp',
    category: 'Bebidas'
  },
  {
    id: 'it5',
    name: 'Jamón Ibérico',
    description: 'Jamón ibérico de bellota cortado a cuchillo con pan tostado.',
    price: '18 €',
    image: 'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260951/unnamed_25_h4vgqs.webp',
    category: 'Entrantes'
  }
];
