import * as React from 'react';
import { View } from 'react-native';
import PinnedInputStore from 'src/client/global/pinned_input/PinnedInputStore';
import useIsLargeScreen from 'src/client/screen_size/useIsLargeScreen';

type Props = {
  children: React.ReactElement;
  isFocused: boolean;
};

export default function PinToBottomWhenFocused({
  children,
  isFocused,
}: Props): JSX.Element {
  const isLargeScreen = useIsLargeScreen();
  const shouldPinToBottom = isFocused && !isLargeScreen;
  React.useEffect(() => {
    PinnedInputStore.update({
      render: shouldPinToBottom ? () => children : undefined,
    });
  }, [children, isFocused, isLargeScreen]);
  return shouldPinToBottom ? <View /> : children;
}
