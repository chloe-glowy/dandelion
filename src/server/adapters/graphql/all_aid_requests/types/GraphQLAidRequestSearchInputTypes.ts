import { schemaComposer } from 'graphql-compose';

export type Filter = {
  iAmWorkingOnIt?: boolean | null | undefined;
  completed?: boolean | null | undefined;
  search?: string | null | undefined;
};

export type GraphQLAidRequestSearchInputType = {
  filter: Filter;
  after: string | null | undefined;
  first: number;
};

const FilterType = schemaComposer.createInputTC({
  fields: {
    completed: 'Boolean',
    iAmWorkingOnIt: 'Boolean',
    search: 'String',
  },
  name: 'AidRequestFilterInput2',
});

export const GraphQLAidRequestSearchInputArgs = {
  after: 'String',
  filter: FilterType,
  first: 'Int',
};
