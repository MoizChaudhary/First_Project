// import { configureStore } from '@reduxjs/toolkit';
// import userInfoReducer  from './slice/userInfo';
// export const store = configureStore({
//     reducer: {
//         userInformation: userInfoReducer, // Use the reducer from the toDoSlice object
//     },
// });
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userSlice from '../Redux/slice/userSlice'
// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;
// Persist configuration
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userSlice'], // Only persist the user slice
  // whitelist: [], // Only persist the user slice
};
const rootReducer = combineReducers({
  userSlice: userSlice,
 
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);