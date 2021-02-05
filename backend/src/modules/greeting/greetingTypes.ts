import { User } from '../../../../common/apiModels';

export interface GreetingDataSource {
  getGreeting(id: string): Promise<User[]>;
}
