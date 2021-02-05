import { Context } from '../../types';

export default {
  Query: {
    greeting: (
      _: unknown,
      args: {
        id: string;
      },
      context: Context,
    ) => context.dataSources.greeting.getGreeting(args.id),
  },
};
