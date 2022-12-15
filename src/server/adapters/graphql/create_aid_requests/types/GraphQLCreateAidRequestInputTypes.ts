export const GraphQLCreateAidRequestInputArgs = {
  sharingGroupID: 'String!',
  whatIsNeeded: '[String!]!',
  whoIsItFor: 'String',
  whoIsItForMulti: '[String]',
};

export type GraphQLCreateAidRequestInputArgsType = Readonly<{
  sharingGroupID: string;
  whatIsNeeded: string[];
  whoIsItFor?: string;
  whoIsItForMulti?: string[];
}>;
