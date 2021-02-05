import { GreetingDataSource } from '../modules/greeting/greetingTypes';

export type Context = {
  dataSources: {
    greeting: GreetingDataSource;
  };
};
