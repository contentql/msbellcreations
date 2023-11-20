import { _mock } from './_mock';

// ----------------------------------------------------------------------

const NAME = [
  'Cayenne Pepper Salve',
  'Rose Petal Salve',
  'Apple Pie Soap Bars ',
  'Lavendar Goats Milk Soap',
  'Natural Bug Spray',
  'Coffee Sopa Bars-1.5 OZ',
  'Citrus Soap Goats milk',
  'Barbershop Soap Bar',
  'Sandalwood Soap Goats Milk',
  'Eucalyptus Shower Steamers Pack: Eucalyptus Sinus Ease',
  'Natural Headache Soother Blend',
  'Allergy Relief Blend- Easy Breathing',
  'Anxiety Stress Relief Blend',
  'Pain Relief Blend',
  'Fresh Snow Soy Wax Candle 4 Oz',
  'Barbershop Soy Candle',
  'Ray-Ban AviatorAnxiety Stress Relief Inhaler',
  'Headache Soother Inhaler',
  'Easy Breathing Relief Inhaler',
];

export const CATEGORIES = ['Slave', 'Bar', 'Soap', 'Spray', 'Blend', 'Steamers', 'Inhaler'];

const DESCRIPTION = `
<p>Aenean viverra rhoncus pede. Etiam feugiat lorem non metus. Quisque malesuada placerat nisl.</p>

<br/>
<ul>
  <li> Updated with a more matte texture, perfect for casual styling. </li>
  <li> Durable water-repellent coating. </li>
  <li> dsdsds </li>
  <li> dsdsds </li>
  <li> Anti-static lining. </li>
</ul>
<br/>

<p>Living in today’s metropolitan world of cellular phones, mobile computers and other high-tech gadgets is not just hectic but very impersonal. We make money and then invest our time and effort in making more money..</p>
`;

// ----------------------------------------------------------------------

export const _productsTable = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  orderId: `#011120${index + 1}`,
  item: NAME[index],
  deliveryDate: _mock.time(index),
  price: _mock.number.price(index),
  status: ['Completed', 'To Process', 'Cancelled', 'Return'][index] || 'Completed',
}));

export const _productsCarousel = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.productName(index),
  caption: _mock.description(index),
  coverUrl: _mock.image.product(index),
  label: 'Opening Sale Discount 50%',
}));

export const _productsCompare = [
  'Apple iPhone 12 Pro',
  'Apple iPhone 13 Pro',
  'Apple iPhone 14 Pro',
].map((name, index) => ({
  id: _mock.id(index),
  name,
  price: _mock.number.price(index),
  coverUrl: _mock.image.product(4),
  ratingNumber: _mock.number.rating(index),
  details: (index === 0 && [
    'Super Retina XDR (OLED)',
    'Up to 29 hours video playback',
    'A14 Bionic',
    'True Tone',
    'IP68',
    '2017',
  ]) || ['Super Retina XDR (OLED)', '', 'A14 Bionic', '', 'IP68', '2017'],
}));

export const _products = [...Array(19)].map((_, index) => ({
  id: _mock.id(index),
  stock: 100,
  name: NAME[index],
  description: DESCRIPTION,
  category: CATEGORIES[index % 10],
  price: _mock.number.price(index),
  sold: _mock.number.nativeM(index),
  caption: _mock.description(index),
  coverUrl: _mock.image.product(index),
  ratingNumber: _mock.number.rating(index),
  totalReviews: _mock.number.nativeL(index),
  label: ['sale', 'new', 'sale', 'sale'][index] || '',
  priceSale:
    [
      _mock.number.price(1),
      _mock.number.price(2),
      _mock.number.price(3),
      _mock.number.price(4),
      _mock.number.price(5),
    ][index] || 0,
  images: [_mock.image.product(index), _mock.image.product(index), _mock.image.product(index)],
}));
