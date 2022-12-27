module.exports = {
  env: {
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@chloeglowy/eslint-plugin-no-set-timeout',
    '@chloeglowy/eslint-plugin-restrict-imports',
    '@typescript-eslint',
    'no-relative-import-paths',
    'prettier',
    'react',
    'sort-keys-fix',
  ],
  reportUnusedDisableDirectives: true,
  root: true,
  rules: {
    '@chloeglowy/no-set-timeout/no-set-timeout': ['warn'],
    '@chloeglowy/restrict-imports/restrict-import-folders': [
      'error',
      {
        ignore: ['*.test.ts', '.eslintrc.js'],
        rules: (() => {
          // Foundation
          const CC = 'src/server/context_container/*';
          const LANGUAGE_UTILS = 'src/shared/language_utils/*';

          // # Domain
          // ## Entities
          const ENTITIES = 'src/server/entities/*';
          const ENTITIES_DOMAIN = 'src/server/entities_domain/*';

          // ## Interactors ("Use Case Interactors")
          const INTERACTORS = 'src/server/interactors/*';

          // Interface Adapters
          const PRESENTERS = 'src/server/presenters/*';
          const PRESENTER_UTILS = 'src/shared/presenter_utils/*';
          const CONTROLLERS = 'src/server/controllers/*';

          // Framework Adapters
          const MONGODB = 'src/server/adapters/mongodb/*';
          const EXPRESS = 'src/server/adapters/express/*';
          const GRAPHQL = 'src/server/adapters/graphql/*';
          const ERROR_LOGGER = 'src/server/adapters/error_logger/*';
          const MENTIONS = 'src/server/adapters/mentions/*';

          /**
           * @deprecated This is a stopgap. TODO.
           */
          const NO_RESTRICTION = '*';

          const DEPENDENCY_MAP = [
            // # Foundation
            [CC, []],
            [LANGUAGE_UTILS, []],

            // # Enterprise / Entities
            [ENTITIES, [CC, ENTITIES_DOMAIN]],

            // # Application / Use Cases / Interactors
            [INTERACTORS, [CC, LANGUAGE_UTILS, ENTITIES, ENTITIES_DOMAIN]],

            // # Interface Adapters
            // ## Presenters
            [
              PRESENTERS,
              [CC, LANGUAGE_UTILS, ENTITIES, INTERACTORS, PRESENTER_UTILS],
            ],

            // ## Controllers
            // TODO -- Should Controllers be able to access Presenters?
            [CONTROLLERS, [CC, ENTITIES, INTERACTORS, PRESENTERS]],

            // # Framework Adapters
            [
              MONGODB,
              [
                CC,
                'mongodb',
                'mongoose',
                LANGUAGE_UTILS,
                ENTITIES,
                INTERACTORS,
              ],
            ],
            [EXPRESS, ['express', CC, ENTITIES]],
            [
              GRAPHQL,
              [
                CC,
                'graphql-compose',
                LANGUAGE_UTILS,
                ENTITIES,
                PRESENTERS,
                CONTROLLERS,
              ],
            ],
            [ERROR_LOGGER, [LANGUAGE_UTILS]],
            // TODO Can we do something like ENTITIES_INTERFACES or ENTITIES_PLUGINS
            // so that we can limit how many components have access to the whole
            // entities component?
            [MENTIONS, [ENTITIES, 'src/shared/presenter_utils/mentions/*']],

            // # Not covered
            ['src/client/*', [NO_RESTRICTION]],
            ['src/server/deprecated/*', [NO_RESTRICTION]],
            ['src/server/notifications/*', [NO_RESTRICTION]],
            ['src/server/root/*', [NO_RESTRICTION]],
            ['src/shared/to_clean/*', [NO_RESTRICTION]],
            ['src/server/to_clean/*', [NO_RESTRICTION]],
            ['src/server/scripts/*', [NO_RESTRICTION]],
            ['src/server/testing/*', [NO_RESTRICTION]],
            ['babel.config.js', [NO_RESTRICTION]],
            ['App.tsx', [NO_RESTRICTION]],
            ['index.js', [NO_RESTRICTION]],

            // # Library interfaces that do not use a plugin architecture.
            // TODO should we switch these to use plugins?
            [
              'src/shared/presenter_utils/ago.ts',
              ['javascript-time-ago', 'javascript-time-ago/locale/en.json'],
            ],
            [
              'src/shared/presenter_utils/mentions/*',
              ['diff', 'react-native', 'react'],
            ],

            // Tests
            ['src/server/tests/*', [NO_RESTRICTION]],
          ];

          return DEPENDENCY_MAP.map(([importTo, canImportFrom]) => ({
            canImportFrom: [...canImportFrom, importTo],
            importTo,
          }));
        })(),
      },
    ],
    '@typescript-eslint/no-namespace': ['off'],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      { allowSameFolder: false, prefix: '', rootDir: '' },
    ],
    'prettier/prettier': ['error'],
    'react/jsx-no-duplicate-props': ['error'],
    'react/jsx-no-undef': ['error'],
    'react/jsx-pascal-case': ['error'],
    'react/jsx-sort-props': ['error'],
    'react/no-array-index-key': ['error'],
    'react/no-children-prop': ['error'],
    'sort-keys-fix/sort-keys-fix': ['error'],
  },
};
