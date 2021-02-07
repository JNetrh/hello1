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

// https://notiz.dev/blog/dockerizing-nestjs-with-prisma-and-postgresql#tldr-multi-stage-dockerfile
