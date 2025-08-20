import React from 'react';
import {Navigations} from './src/navigators';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StatusBar} from 'react-native';
// import GameTest from './src/components/game/GameTest'; // Uncomment for testing
// import AndroidHapticTest from './src/components/game/AndroidHapticTest'; // Uncomment for haptic testing
// import SimpleGameTest from './src/components/game/SimpleGameTest'; // Uncomment for simple testing
// import TimerTest from './src/components/game/TimerTest'; // Uncomment for timer testing
// import TextErrorTest from './src/components/game/TextErrorTest'; // Uncomment for text error testing
// import StoreTest from './src/components/game/StoreTest'; // Uncomment for store testing
// import ResponsiveTest from './src/components/game/ResponsiveTest'; // Uncomment for responsive testing
// import TabletGridTest from './src/components/game/TabletGridTest'; // Uncomment for 5x6 grid testing
// import TrueResponsiveTest from './src/components/game/TrueResponsiveTest'; // Uncomment for true responsive testing
// import SimpleResponsiveDebug from './src/components/game/SimpleResponsiveDebug'; // Simple debug test
// import QuickTest from './src/components/game/QuickTest'; // Quick test

const _queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={_queryClient}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F23" />
      <Navigations />
      {/* Uncomment below to test responsive design on tablet */}
      {/* <ResponsiveTest /> */}
      {/* Uncomment below to test 5x6 grid layout on tablet */}
      {/* <TabletGridTest /> */}
      {/* Uncomment below to test TRUE responsive system */}
      {/* <TrueResponsiveTest /> */}
      {/* Quick test */}
      {/* <QuickTest /> */}
    </QueryClientProvider>
  );
}

export default App;
