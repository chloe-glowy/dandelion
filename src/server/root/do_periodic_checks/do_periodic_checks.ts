import executeReminders from 'src/server/adapters/mongodb/collections/aid_request_reminder/executeReminders';
import setTimeoutSafe from 'src/server/to_clean/setTimeoutSafe';

export default function do_periodic_checks(): void {
  setTimeoutSafe('do_periodic_checks', () => {
    try {
      doPeriodicChecksImpl();
    } catch (e) {
      console.error(e);
    }
  });
}

function doPeriodicChecksImpl(): void {
  executeReminders();
}
