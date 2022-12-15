import initErrorLogging from 'src/client/error/initErrorLogging';

initErrorLogging();

export default function ErrorBoundary({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return children;
}
