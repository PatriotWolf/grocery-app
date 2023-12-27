import { faker } from '@faker-js/faker';

export const seedDB = async () => {
  const createUser = () => {
    return {
      name: faker.commerce.productName(),
      brand: faker.company.name(),
      image: faker.image.urlLoremFlickr({
        category: 'eletronic',
        height: 400,
        width: 400,
      }),
      barcode: Math.floor(Math.random() * 9000000000) + 100000000000,
    };
  };

  const productData = new Array(40).fill(undefined).map(createUser);
  return productData;
};
