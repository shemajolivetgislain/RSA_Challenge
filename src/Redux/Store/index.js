import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
const middleware = [...getDefaultMiddleware(), thunk];

// if (process.env.NODE_ENV === "development") {
//   middleware.push(logger);
// }

const store = configureStore({
  reducer: {

      },
  middleware,
});

export default store;