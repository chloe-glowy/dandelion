import { Resolver, ResolverDefinition } from 'graphql-compose';
import {
  schemaComposer,
  TContext,
} from 'src/server/adapters/graphql/aid_request_old/helpers/schemaComposer';
import { CC } from 'src/server/context_container/public/ContextContainer';

type TSource = unknown;

type Props<TArgs, TReturn> = Readonly<
  Pick<
    ResolverDefinition<TSource, TContext, TArgs>,
    'args' | 'type' | 'name' | 'kind'
  > & {
    resolve: (cc: CC, args: TArgs) => Promise<TReturn>;
  }
>;

export abstract class GraphQLRootCall {
  static create<TArgs, TReturn>(
    props: Props<TArgs, TReturn>,
  ): Resolver<TSource, TContext, TArgs, TReturn> {
    return schemaComposer.createResolver<TSource, TArgs>({
      ...props,
      resolve: async ({ args, context: req }): Promise<TReturn> => {
        return await props.resolve(req.cc, args);
      },
    });
  }
}
