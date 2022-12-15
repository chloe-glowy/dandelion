import { schemaComposer } from 'graphql-compose';

export interface GraphQLAidRequestActionOptionAPIArgsProperties {
  addOrRemove(): Promise<GraphQLAidRequestActionAddOrRemove>;
  actionType(): Promise<GraphQLAidRequestActionType>;
}

export type GraphQLAidRequestActionAddOrRemove = 'Add' | 'Remove';

export type GraphQLAidRequestActionType =
  | 'ChangedWhoIsItFor'
  | 'ChangedWhatIsNeeded'
  | 'Comment'
  | 'Completed'
  | 'Created'
  | 'Deleted'
  | 'WorkingOn';

schemaComposer.createEnumTC(
  `enum AidRequestActionType2 { 
    ChangedWhatIsNeeded
    ChangedWhoIsItFor
    Comment
    Completed 
    Created
    Deleted
    WorkingOn 
  }`,
);

schemaComposer.createEnumTC(
  `enum AidRequestAddOrRemove { 
    Add
    Remove
  }`,
);

export const GraphQLAidRequestActionOptionAPIArgsType =
  schemaComposer.createObjectTC<GraphQLAidRequestActionOptionAPIArgsProperties>(
    {
      fields: {
        actionType: 'AidRequestActionType2!',
        addOrRemove: 'AidRequestAddOrRemove!',
      },
      name: 'AidRequestAction2',
    },
  );
