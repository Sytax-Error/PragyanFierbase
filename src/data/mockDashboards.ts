
import { faker } from '@faker-js/faker';
import type { Dashboard } from '@/store/slices/dashboardSlice';

function createRandomDashboard(): Dashboard {
  // Generate an array of adjectives, then use a Set to ensure uniqueness.
  const randomTags = Array.from(
    { length: faker.number.int({ min: 1, max: 4 }) }, 
    () => faker.commerce.productAdjective()
  );
  const uniqueTags = [...new Set(randomTags)];

  return {
    id: faker.string.uuid(),
    name: faker.commerce.department() + ' Overview',
    description: faker.lorem.sentence(10),
    charts: Array.from({ length: faker.number.int({ min: 2, max: 8 }) }, () => faker.string.uuid()),
    tags: uniqueTags, // Use the unique list of tags.
    owner: faker.person.fullName(),
    lastModified: faker.date.recent().toISOString(),
  };
}

export const mockDashboards: Dashboard[] = Array.from({ length: 12 }, createRandomDashboard);
