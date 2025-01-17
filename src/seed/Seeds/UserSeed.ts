import { UserModel } from '../../Schemas/UserS';
import { faker } from '@faker-js/faker';

const createRandomUser = () => {

return new UserModel({
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email(),
    phone: faker.phone.number().toString(),
    pass: faker.internet.password(),
    //owned
  });
};

export const randomUsers = Array.from({ length: 6 }, createRandomUser);