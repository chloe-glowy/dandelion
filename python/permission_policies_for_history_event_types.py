from helpers.aid_request_history_event_types import all_history_event_types
from helpers.write_ts import write_ts

# for event_type, event_type_snake_case in all_history_event_types():
#     write_ts(
#         'src/server/entities/private/aid_request/mutations/edit/permission/subtypes/{event_type_snake_case}/AidRequestEditPermissionPolicyFor{event_type}Action.ts'.format(
#             event_type_snake_case=event_type_snake_case,
#             event_type=event_type,
#         ),
#         """import {{ AidRequestEditPermissionPolicyForAction }} from 'src/server/entities/private/aid_request/mutations/edit/permission/AidRequestEditPermissionPolicyForAction';

#       export class AidRequestEditPermissionPolicyFor{event_type}Action extends AidRequestEditPermissionPolicyForAction {{
#         public async canEditAidRequest(): Promise<boolean> {{
#           throw new Error('Not implemented');
#         }}
#       }}
#       """.format(event_type=event_type)
#     )

write_ts(
    'src/server/entities/private/aid_request/mutations/edit/permission/AidRequestEditPermissionPolicyForActionFactory.ts',
    """
  {imports}
  import {{ AidRequestAction }} from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
  import {{ AidRequestEditPermissionPolicyForAction }} from 'src/server/entities/private/aid_request/mutations/edit/permission/AidRequestEditPermissionPolicyForAction';
  import {{ User }} from 'src/server/entities/public/user/User';
  import {{ CC }} from 'src/server/context_container/public/ContextContainer';
  import {{ AidRequest }} from 'src/server/entities/public/aid_request/AidRequest';

  export abstract class AidRequestEditPermissionPolicyForActionFactory {{
    public static create(
      cc: CC,
      user: User,
      aidRequest: AidRequest,
      action: AidRequestAction,
    ): AidRequestEditPermissionPolicyForAction {{
      {event_type_switch}

      throw new Error('AidRequestEditPermissionPolicyForActionFactory -- Unrecognized event type');
    }}
  }}
  """.format(
        imports='\n'.join(
            """import {{ AidRequest{event_type}Action }} from 'src/server/entities/public/aid_request_action/subtypes/{event_type_snake_case}/AidRequest{event_type}Action';
      import {{ AidRequestEditPermissionPolicyFor{event_type}Action }} from 'src/server/entities/private/aid_request/mutations/edit/permission/subtypes/{event_type_snake_case}/AidRequestEditPermissionPolicyFor{event_type}Action';""".format(
                event_type=event_type, event_type_snake_case=event_type_snake_case) for event_type, event_type_snake_case in all_history_event_types()
        ),
        event_type_switch='\n'.join(
            """if (action instanceof AidRequest{event_type}Action) {{\n
        return new AidRequestEditPermissionPolicyFor{event_type}Action(cc, user, aidRequest, action);\n
      }} 
      """.format(event_type=event_type) for event_type, _ in all_history_event_types()
        )
    )
)
