#!/usr/bin/env node

Error.stackTraceLimit = Infinity;

import debugModule from 'debug';
import http from 'http';
import httpProxy from 'http-proxy';
import { createExpressApp } from 'src/server/root/web_request_listener/express_app';
import environmentIsUsingHotReloading from 'src/shared/to_clean/env/environmentIsUsingHotReloading';
import getEnvironmentVariableAndReturnUndefinedIfNotFound from 'src/shared/to_clean/env/getEnvironmentVariableAndReturnUndefinedIfNotFound';

const ENVIRONMENT_PORT =
  getEnvironmentVariableAndReturnUndefinedIfNotFound('PORT');

export function init(): void {
  const debug = debugModule('server');
  const port = normalizePort(ENVIRONMENT_PORT || '3333');

  const express_app = createExpressApp();
  express_app.set('port', port);

  const server = http.createServer(express_app);

  if (environmentIsUsingHotReloading()) {
    const nodeProxy = new httpProxy({
      target: 'ws://localhost:19006',
      ws: true,
    });
    server.on('upgrade', (request, socket, head) => {
      nodeProxy.ws(request, socket, head);
    });
  }

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  function normalizePort(val: string): number | string | false {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  function onError(error_: Error): void {
    const error = error_ as unknown as Error & {
      syscall: undefined | string;
      code: undefined | string;
    };
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening(): void {
    const addr = server.address();
    const bind =
      typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
    debug('Listening on ' + bind);
  }
}
