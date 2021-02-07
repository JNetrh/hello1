import { PrismaClient, User } from '@prisma/client';
import { DataSource } from 'apollo-datasource';

import { GreetingDataSource } from '../modules/greeting/greetingTypes';

// import dummy from './greetingDataSource.json';

class DummyGreetingDataSource extends DataSource implements GreetingDataSource {
  prisma = new PrismaClient();

  getGreeting(id: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      console.log('hello');
      const user = this.prisma.user
        .findUnique({
          where: {
            id: parseInt(id, 10),
          },
        })
        .then((user) => {
          console.log(user);
          resolve(user);
        })
        .catch(reject);

      console.log({ user });

      return user;
    });
    // return Promise.resolve(dummy.filter((d) => d.id.toString() === id));
  }
  getAllUsers(): Promise<Array<User> | null> {
    return new Promise((resolve, reject) => {
      console.log('hello');
      const user = this.prisma.user
        .findMany()
        .then((users) => {
          console.log(users);
          resolve(users);
        })
        .catch(reject);

      console.log({ user });

      return user;
    });
    // return Promise.resolve(dummy.filter((d) => d.id.toString() === id));
  }
}

export default DummyGreetingDataSource;
