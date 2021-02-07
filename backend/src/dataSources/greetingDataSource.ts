import { PrismaClient, User } from '@prisma/client';
import { DataSource } from 'apollo-datasource';

import { GreetingDataSource } from '../modules/greeting/greetingTypes';

// import dummy from './greetingDataSource.json';

class DummyGreetingDataSource extends DataSource implements GreetingDataSource {
  prisma = new PrismaClient();

  async getGreeting(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    return user;
    // return Promise.resolve(dummy.filter((d) => d.id.toString() === id));
  }
}

export default DummyGreetingDataSource;
