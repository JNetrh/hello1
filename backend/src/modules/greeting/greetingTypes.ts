// import { User } from '../../../common/apiModels';

import { User } from '@prisma/client';

export interface GreetingDataSource {
  getGreeting(id: string): Promise<User | null>;
}
