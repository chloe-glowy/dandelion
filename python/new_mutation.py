import argparse
import os

import inflection
from helpers.write_ts import write_ts

"""
To run:

cd python
pipenv install
pipenv run python new_mutation.py --action-name=UndoAidRequestEdit

Notes:

I want to make a SignedSource / Manual Sections pattern. It also would be cool
to make the codegen run based on source code rather than commandline args. So
then I could just run something like `yarn run codegen` or perhaps to start
with `yarn run codegen --action-name=UndoAidRequestEdit` and it would generate
all the needed code.

"""


def create_graphql_adapter(context):
    dirname = 'src/server/adapters/graphql/{action_name}'.format(
        **context)
    context = {**context, 'dirname': dirname}

    write_ts(
        '{dirname}/GraphQL{ActionName}Mutation.ts'.format(**context),
        """
        import {{ GraphQLRootCall }} from 'src/server/adapters/graphql/aid_request_old/helpers/GraphQLRootCall';
        import {{ GraphQL{ActionName}ArgsAdapter }} from '{dirname}/adapters/GraphQL{ActionName}ArgsAdapter';
        import {{ GraphQL{ActionName}ResultAdapter }} from '{dirname}/adapters/GraphQL{ActionName}ResultAdapter';
        import {{
          GraphQL{ActionName}InputArgs,
          GraphQL{ActionName}InputArgsType,
        }} from '{dirname}/types/GraphQL{ActionName}InputTypes';
        import {{
          GraphQL{ActionName}ResponsePayload,
          GraphQL{ActionName}ResponsePayloadProperties,
        }} from '{dirname}/types/GraphQL{ActionName}ResponseTypes';
        import {{ {ActionName}Controller }} from 'src/server/controllers/{action_name}/{ActionName}Controller';

        type Args = GraphQL{ActionName}InputArgsType;
        type ReturnType = GraphQL{ActionName}ResponsePayloadProperties;

        export const {actionName} = GraphQLRootCall.create<Args, ReturnType>({{
          args: GraphQL{ActionName}InputArgs,
          kind: 'mutation',
          name: '{actionName}',
          resolve: async (cc, args): Promise<ReturnType> => {{
            const createAidRequestArgs =
              GraphQL{ActionName}ArgsAdapter.fromGraphQLArgs(args);
            const result = await {ActionName}Controller.execute(
              cc,
              createAidRequestArgs,
            );
            return GraphQL{ActionName}ResultAdapter.toGraphQLResult(result);
          }},
          type: GraphQL{ActionName}ResponsePayload,
        }});
      """.format(**context)
    )
    write_ts(
        '{dirname}/adapters/GraphQL{ActionName}ArgsAdapter.ts'.format(
            **context),
        """
          import {{
            GraphQL{ActionName}InputArgsType,
          }} from '{dirname}/types/GraphQL{ActionName}InputTypes';
          import {{ {ActionName}ControllerArgs }} from 'src/server/controllers/{action_name}/types/{ActionName}ControllerTypes';

          export abstract class GraphQL{ActionName}ArgsAdapter {{
            public static fromGraphQLArgs(args: GraphQL{ActionName}InputArgsType): {ActionName}ControllerArgs {{
              // {todo}
              args;
              throw new Error('GraphQL{ActionName}ArgsAdapter -- Not yet implemented.');
            }}
          }}
        """.format(**context)
    )
    write_ts(
        '{dirname}/adapters/GraphQL{ActionName}ResultAdapter.ts'.format(
            **context),
        """
        import {{ GraphQL{ActionName}ResponsePayloadProperties }} from '{dirname}/types/GraphQL{ActionName}ResponseTypes';
        import {{ {ActionName}ControllerResult }} from 'src/server/controllers/{action_name}/types/{ActionName}ControllerTypes';

        export abstract class GraphQL{ActionName}ResultAdapter {{
          public static toGraphQLResult(result: {ActionName}ControllerResult): GraphQL{ActionName}ResponsePayloadProperties {{
            // {todo}
            result;
            throw new Error('GraphQL{ActionName}ResultAdapter -- Not yet implemented.');
          }}
        }}
        """.format(**context)
    )
    write_ts(
        '{dirname}/types/GraphQL{ActionName}InputTypes.ts'.format(**context),
        """
        import {{ schemaComposer }} from 'graphql-compose';

        export type GraphQL_PlaceholderNestedObject_InputType = Readonly<{{
          // {todo}
          placeholderCustomField: null | undefined;
        }}>;

        export type GraphQL{ActionName}InputArgsType = Readonly<{{
          // {todo}
          placeholderNestedObject: GraphQL_PlaceholderNestedObject_InputType;
          placeholderOptionalArgumentName?: string;
          placeholderRequiredArgumentName: string;
        }}>;

        const GraphQL_PlaceholderNestedObject_Input = schemaComposer.createInputTC({{
          fields: {{
            // {todo}
            placeholderCustomField: 'PlaceholderCustomTypeName',
          }},
          name: 'PlaceholderNestedObject',
        }});

        export const GraphQL{ActionName}InputArgs = {{
          // {todo}
          placeholderNestedObject: GraphQL_PlaceholderNestedObject_Input,
          placeholderOptionalArgumentName: 'String',
          placeholderRequiredArgumentName: 'String!',
        }};

      """.format(**context)
    )
    write_ts(
        '{dirname}/types/GraphQL{ActionName}ResponseTypes.ts'.format(
            **context),
        """
        import {{ schemaComposer }} from 'graphql-compose';
        
        export type GraphQL{ActionName}ResponsePayloadProperties = Readonly<{{
          placeholderValue: string;
        }}>;

        export const GraphQL{ActionName}ResponsePayload =
          schemaComposer.createObjectTC<GraphQL{ActionName}ResponsePayloadProperties>(
            {{
              fields: {{
                placeholderValue: 'String!',
              }},
              name: '{ActionName}ResponsePayload',
            }},
          );
        """.format(**context)
    )


def create_controller(context):
    dirname = 'src/server/controllers/{action_name}'.format(
        **context)
    context = {**context, 'dirname': dirname}
    write_ts(
        '{dirname}/{ActionName}Controller.ts'.format(**context),
        """
        import {{ CC }} from 'src/server/context_container/public/ContextContainer';
        import {{
          {ActionName}ControllerArgs,
          {ActionName}ControllerResult,
        }} from '{dirname}/types/{ActionName}ControllerTypes';
        import {{ {ActionName}Interactor }} from 'src/server/interactors/{action_name}/{ActionName}Interactor';

        export abstract class {ActionName}Controller {{
          public static async execute(
            cc: CC,
            args: {ActionName}ControllerArgs,
          ): Promise<{ActionName}ControllerResult> {{
            // {todo}
            const result = await {ActionName}Interactor.execute(cc, args);
            result;
            throw new Error('{ActionName}Controller -- Not yet implemented.');
          }}
        }}
        """.format(**context)
    )
    write_ts(
        '{dirname}/types/{ActionName}ControllerTypes.ts'.format(**context),
        """
        import {{ 
          {ActionName}InteractorArgs,
          {ActionName}InteractorResult,
        }} from 'src/server/interactors/{action_name}/types/{ActionName}InteractorTypes';

        export type {ActionName}ControllerArgs = {ActionName}InteractorArgs & {{
          // {todo}
          placeholderArg: string;
        }};

        export type {ActionName}ControllerResult = {ActionName}InteractorResult & {{
          // {todo}
          placeholderResult: string;
        }};

        """.format(**context)
    )


def create_interactor(context):
    dirname = 'src/server/interactors/{action_name}'.format(
        **context)
    context = {**context, 'dirname': dirname}
    write_ts(
        '{dirname}/{ActionName}Interactor.ts'.format(**context),
        """
        import {{ CC }} from 'src/server/context_container/public/ContextContainer';
        import {{
          {ActionName}InteractorArgs,
          {ActionName}InteractorResult,
        }} from '{dirname}/types/{ActionName}InteractorTypes';

        export abstract class {ActionName}Interactor {{
          public static async execute(
            cc: CC,
            args: {ActionName}InteractorArgs,
          ): Promise<{ActionName}InteractorResult> {{
            // {todo}
            cc;
            args;
            throw new Error('{ActionName}Interactor -- Not yet implemented.');
          }}
        }}
        """.format(**context)
    )
    write_ts(
        '{dirname}/types/{ActionName}InteractorTypes.ts'.format(**context),
        """
        export type {ActionName}InteractorArgs = {{
          // {todo}
          placeholderArg: string;
        }};

        export type {ActionName}InteractorResult = {{
          // {todo}
          placeholderResult: string;
        }};
        """.format(**context)
    )


def main():
    os.chdir('..')
    parser = argparse.ArgumentParser()
    parser.add_argument('--action-name', type=str, required=True)
    args = parser.parse_args()

    ActionName = inflection.camelize(args.action_name, True)
    action_name = inflection.underscore(
        ActionName)
    actionName = inflection.camelize(action_name, False)
    todo = 'CODEGEN_TODO[{ActionName}]'.format(ActionName=ActionName)

    context = {
        "ActionName": ActionName,
        "action_name": action_name,
        "actionName": actionName,
        "todo": todo,
    }

    create_graphql_adapter(context)
    create_controller(context)
    create_interactor(context)

    print(
        'Search for {todo} to complete the manual sections.'.format(**context))


if __name__ == '__main__':
    main()
