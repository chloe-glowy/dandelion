export type GraphQLUndoAidRequestEditInputArgsType = Readonly<{
  aidRequestID: string;
  historyEventID: string;
}>;

export const GraphQLUndoAidRequestEditInputArgs = {
  aidRequestID: 'String!',
  historyEventID: 'String!',
};
