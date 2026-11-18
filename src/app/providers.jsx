import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store.js";

// Provider makes the store available to every component below it.
export default function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
}