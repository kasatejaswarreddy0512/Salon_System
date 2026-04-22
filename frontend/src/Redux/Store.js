import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducers } from "./Auth/reducer";
import { bookingReducer } from "./Booking/reducer";
import { categoryReducers } from "./Category/reducer";
import { chartReducer } from "./Chart/reducer";
import { notificationReducer } from "./Notifications/reducer";
import { paymentReducers } from "./Payment/reducer";
import { reviewReducers } from "./Review/reducer";
import { salonReducers } from "./Salon/reducer";
import { serviceOfferingReducers } from "./SalonService/reducer";

const rootReducer = combineReducers({
  auth: authReducers,
  booking: bookingReducer,
  category: categoryReducers,
  notification: notificationReducer,
  payment: paymentReducers,
  review: reviewReducers,
  salon: salonReducers,
  service: serviceOfferingReducers,
  chart: chartReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
