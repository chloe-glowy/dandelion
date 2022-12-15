import { createExpressApp } from 'src/server/root/web_request_listener/express_app';

let HAS_RUN = false;

export function initScriptEnvironment(): void {
  if (HAS_RUN) {
    return;
  }
  createExpressApp();
  HAS_RUN = true;
}
