import createStore from 'src/client/store/createStore';
import ErrorToastEventStream, {
  ErrorToastEventStreamEvent,
} from 'src/client/toast/ErrorToastEventStream';

type ErrorStoreData = {
  errors: ErrorToastEventStreamEvent[];
};

const ErrorToastStore = createStore<ErrorStoreData>({ errors: [] });

ErrorToastEventStream.subscribe((event) => {
  {
    ErrorToastStore.update({
      errors: ErrorToastStore.getValue().errors.concat([event]),
    });
  }
});

export default ErrorToastStore;
