import * as React from 'react';
import EndOfListSpacer from 'src/client/components/EndOfListSpacer';
import AttributionCard from 'src/client/menu/attribution/AttributionCard';
import FeedbackCard from 'src/client/menu/cards/FeedbackCard';
import SupportAppCard from 'src/client/menu/cards/SupportAppCard';
import DebugInfoCard from 'src/client/menu/debug/DebugInfoCard';
import ScrollableScreen from 'src/client/scrollable_screen/ScrollableScreen';
import singleElement from 'src/client/scrollable_screen/singleElement';
import RequireLoggedInScreen from 'src/client/viewer/RequireLoggedInScreen';
import YourAccountMenuCard from 'src/client/viewer/YourAccountMenuCard';
import YourSharingGroupsCard from 'src/client/viewer/YourSharingGroupsCard';

export default function MenuScreen(): JSX.Element {
  return (
    <RequireLoggedInScreen>
      <ScrollableScreen
        configs={[
          singleElement({
            key: 'YourAccountMenuCard',
            render: () => <YourAccountMenuCard />,
          }),
          singleElement({
            key: 'YourSharingGroupsCard',
            render: () => <YourSharingGroupsCard />,
          }),
          singleElement({
            key: 'FeedbackCard',
            render: () => <FeedbackCard />,
          }),
          singleElement({
            key: 'SupportAppCard',
            render: () => <SupportAppCard />,
          }),
          singleElement({
            key: 'AttributionCard',
            render: () => <AttributionCard />,
          }),
          singleElement({
            key: 'DebugInfoCard',
            render: () => <DebugInfoCard />,
          }),
          singleElement({
            key: 'EndOfListSpacer',
            render: () => <EndOfListSpacer />,
          }),
        ]}
      ></ScrollableScreen>
    </RequireLoggedInScreen>
  );
}
