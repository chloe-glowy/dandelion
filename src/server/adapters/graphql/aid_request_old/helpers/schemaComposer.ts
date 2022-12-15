import { schemaComposer as sc, SchemaComposer } from 'graphql-compose';

export type TContext = Express.Request;

export const schemaComposer = sc as SchemaComposer<TContext>;
