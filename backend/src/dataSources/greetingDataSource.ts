import { DataSource } from 'apollo-datasource';

import { GreetingDataSource } from '../modules/greeting/greetingTypes';

import dummy from './greetingDataSource.json';

class DummyGreetingDataSource extends DataSource implements GreetingDataSource {
  getGreeting(id: string) {
    return Promise.resolve(dummy.filter((d) => d.id.toString() === id));
  }
}

export default DummyGreetingDataSource;
