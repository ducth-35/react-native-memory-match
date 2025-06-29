import React from 'react';
import { Navigations } from './src/navigators';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import GameTest from './src/components/game/GameTest'; // Uncomment for testing
// import AndroidHapticTest from './src/components/game/AndroidHapticTest'; // Uncomment for haptic testing
// import SimpleGameTest from './src/components/game/SimpleGameTest'; // Uncomment for simple testing
// import TimerTest from './src/components/game/TimerTest'; // Uncomment for timer testing
// import TextErrorTest from './src/components/game/TextErrorTest'; // Uncomment for text error testing
// import StoreTest from './src/components/game/StoreTest'; // Uncomment for store testing

const _queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={_queryClient}>
      <Navigations />
    </QueryClientProvider>
  );
}

export default App;
