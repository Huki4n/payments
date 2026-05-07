import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { store } from "./store";
import { Provider } from "react-redux";

export const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
