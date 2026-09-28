import "react-native-gesture-handler";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import MainNavNavigator from "./navigators/MainNavigator";
import store from "./store";
import { REFRESH_STATUSES_SPAN } from "./constants";
import { wordsLearningActions } from "./store/wordsLearningSlice";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(wordsLearningActions.updateStatuses());
    }, REFRESH_STATUSES_SPAN);

    return () => clearInterval(interval);
  }, [dispatch]);

  return <MainNavNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}