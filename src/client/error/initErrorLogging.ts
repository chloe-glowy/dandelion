let initialized = false;

export default function initErrorLogging(): void {
  if (!initialized) {
    console.log('Initializing error logging');
  }
  initialized = true;
}
