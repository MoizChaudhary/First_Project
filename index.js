// /**
//  * @format
//  */
// import 'react-native-gesture-handler';
// import 'react-native-reanimated';
// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import {AppRegistry, LogBox} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/Redux/store.ts'; // Adjust the path based on your directory structure
LogBox.ignoreAllLogs(true);

function MainApp() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => MainApp);
