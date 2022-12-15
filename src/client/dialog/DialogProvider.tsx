import * as React from 'react';
import DialogStore from 'src/client/dialog/DialogStore';
import useStore from 'src/client/store/useStore';

type Props = {
  children: JSX.Element;
};

export default function DialogProvider({ children }: Props): JSX.Element {
  const { render } = useStore(DialogStore);
  return render == null ? (
    children
  ) : (
    <>
      {children}
      {render()}
    </>
  );
}
