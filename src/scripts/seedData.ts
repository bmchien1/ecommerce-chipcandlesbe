import { AppDataSource } from '../data-source';
import { Category } from '../entities/Category';
import BoxService from '../services/BoxService';
import CardService from '../services/CardService';
import ColorService from '../services/ColorService';
import MoldService from '../services/MoldService';
import ScentService from '../services/ScentService';

const categoryTypes = {
  Box: 1,
  Card: 2,
  Color: 3,
  Mold: 4,
  Scent: 5,
};

const categoriesSeed = [
  { name: 'Gift', entityType: categoryTypes.Box },
  { name: 'Storage', entityType: categoryTypes.Box },
  { name: 'Birthday', entityType: categoryTypes.Card },
  { name: 'Thank You', entityType: categoryTypes.Card },
  { name: 'Red', entityType: categoryTypes.Color },
  { name: 'Blue', entityType: categoryTypes.Color },
  { name: 'Heart', entityType: categoryTypes.Mold },
  { name: 'Circle', entityType: categoryTypes.Mold },
  { name: 'Lavender', entityType: categoryTypes.Scent },
  { name: 'Vanilla', entityType: categoryTypes.Scent },
];

const boxesSeed = [
  {
    name: 'Gift Box Premium',
    description: 'Elegant gift box perfect for special occasions',
    material: 'Cardboard',
    size: '10x8x4 inches',
    capacity: 'Medium',
    cost: '15.99',
    img_url: '/images/boxes/gift-box-premium.jpg',
    categoryName: 'Gift',
  },
  {
    name: 'Simple Storage Box',
    description: 'Basic storage box for everyday use',
    material: 'Cardboard',
    size: '12x10x6 inches',
    capacity: 'Large',
    cost: '8.99',
    img_url: '/images/boxes/simple-storage.jpg',
    categoryName: 'Storage',
  },
];

const cardsSeed = [
  {
    name: 'Birthday Card',
    description: 'Colorful birthday card with warm wishes',
    material: 'Paper',
    size: '5x7 inches',
    design: 'Modern',
    cost: '3.99',
    img_url: '/images/cards/birthday-card.jpg',
    categoryName: 'Birthday',
  },
  {
    name: 'Thank You Card',
    description: 'Elegant thank you card for expressing gratitude',
    material: 'Paper',
    size: '4x6 inches',
    design: 'Classic',
    cost: '2.99',
    img_url: '/images/cards/thank-you-card.jpg',
    categoryName: 'Thank You',
  },
];

const colorsSeed = [
  {
    name: 'Red Dye',
    description: 'Vibrant red color for bold candles',
    material: 'Candle Dye',
    img_url: '/images/colors/red-dye.jpg',
    categoryName: 'Red',
  },
  {
    name: 'Blue Dye',
    description: 'Calming blue color for peaceful candles',
    material: 'Candle Dye',
    img_url: '/images/colors/blue-dye.jpg',
    categoryName: 'Blue',
  },
];

const moldsSeed = [
  {
    name: 'Heart Shape Mold',
    description: 'Perfect heart-shaped mold for romantic candles',
    material: 'Silicone',
    size: '3x3 inches',
    capacity: '2 oz',
    cost: '12.99',
    img_url: '/images/molds/heart-mold.jpg',
    categoryName: 'Heart',
  },
  {
    name: 'Circle Mold Set',
    description: 'Set of circular molds in various sizes',
    material: 'Silicone',
    size: '2-4 inches diameter',
    capacity: '1-4 oz',
    cost: '18.99',
    img_url: '/images/molds/circle-set.jpg',
    categoryName: 'Circle',
  },
];

const scentsSeed = [
  {
    name: 'Lavender Essential Oil',
    description: 'Calming lavender scent for relaxation',
    material: 'Essential Oil',
    intensity: 'Medium',
    capacity: '10ml',
    img_url: '/images/scents/lavender.jpg',
    categoryName: 'Lavender',
  },
  {
    name: 'Vanilla Bean Extract',
    description: 'Warm vanilla scent for cozy atmosphere',
    material: 'Natural Extract',
    intensity: 'Strong',
    capacity: '15ml',
    img_url: '/images/scents/vanilla.jpg',
    categoryName: 'Vanilla',
  },
];

async function seed() {
  await AppDataSource.initialize();
  const categoryRepo = AppDataSource.getRepository(Category);

  // Clear all
  await AppDataSource.query('TRUNCATE "box", "card", "color", "mold", "scent", "category" RESTART IDENTITY CASCADE');

  // Seed categories
  const categories = await categoryRepo.save(categoriesSeed);
  const getCategoryId = (name: string, entityType: number): number => {
    const found = categories.find(c => c.name === name && c.entityType === entityType);
    if (!found) throw new Error(`Category not found for ${name} - ${entityType}`);
    return found.id;
  };

  // Seed boxes
  for (const box of boxesSeed) {
    await BoxService.getInstance().createBox({ ...box, categoryId: getCategoryId(box.categoryName, categoryTypes.Box) });
  }
  // Seed cards
  for (const card of cardsSeed) {
    await CardService.getInstance().createCard({ ...card, categoryId: getCategoryId(card.categoryName, categoryTypes.Card) });
  }
  // Seed colors
  for (const color of colorsSeed) {
    await ColorService.getInstance().createColor({ ...color, categoryId: getCategoryId(color.categoryName, categoryTypes.Color) });
  }
  // Seed molds
  for (const mold of moldsSeed) {
    await MoldService.getInstance().createMold({ ...mold, categoryId: getCategoryId(mold.categoryName, categoryTypes.Mold) });
  }
  // Seed scents
  for (const scent of scentsSeed) {
    await ScentService.getInstance().createScent({ ...scent, categoryId: getCategoryId(scent.categoryName, categoryTypes.Scent) });
  }

  console.log('✅ Seed completed!');
  process.exit(0);
}

if (require.main === module) {
  seed();
} 