import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import proxy from 'express-http-proxy';
import expressRateLimit from 'express-rate-limit';
import path from 'path';
import { initCCforExpress } from 'src/server/adapters/express/initCCforExpress';
import { initViewerContextForExpress } from 'src/server/adapters/express/initViewerContextForExpress';
import { initGraphQL } from 'src/server/adapters/graphql/GraphQLSchema';
import { initMongoClient } from 'src/server/adapters/mongodb/client';
import { initUserModels } from 'src/server/adapters/mongodb/collections/user/UserModel';
import { getMainPlugins } from 'src/server/root/plugins/getMainPlugins';
import environmentIsUsingHotReloading from 'src/shared/to_clean/env/environmentIsUsingHotReloading';

export function createExpressApp(): ReturnType<typeof express> {
  const rootDirectory = path.normalize(path.join(__dirname, '../../../..'));

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  initCCforExpress(app, getMainPlugins());
  initMongoClient();
  initUserModels(app);
  initViewerContextForExpress(app);
  initGraphQL(app);

  app.use(express.static(path.join(rootDirectory, 'assets')));

  if (environmentIsUsingHotReloading()) {
    app.use(proxy('localhost:19006'));
  } else {
    // Rate limit requests for static files
    const limiter = expressRateLimit({
      // 100 requests per minute
      max: 100,
      windowMs: 1 * 60 * 1000,
    });
    app.use(limiter);

    app.use(express.static(path.join(rootDirectory, 'web-build')));
    app.get('/*', (req, res) =>
      res.sendFile('web-build/index.html', { root: rootDirectory }),
    );
  }

  return app;
}
