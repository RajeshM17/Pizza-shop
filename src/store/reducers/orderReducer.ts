import { TIMER_DURATION_IN_MS } from '../../models/constants';
import { OrderStages } from '../../models/enums';
import {
  ADD_ORDER,
  CANCEL_ORDER,
  MOVE_STAGE,
  UPDATE_TOTAL_DELIVERED,
  UPDATE_TOTAL_TIME_TAKEN,
} from '../actions/types';
import { ActionTypes, OrderState } from '../types';

const initialState: OrderState = {
  orders: [],
  totalDelivered: 0,
};

const orderReducer = (
  state = initialState,
  action: ActionTypes
): OrderState => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [
          ...state.orders,
          {
            ...action.payload,
            stage: OrderStages.OrderPlaced,
            id: Date.now(),
            stageTime: Date.now(),
            totalTimeTaken: 0,
          },
        ],
      };
    case MOVE_STAGE:
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.id === action.payload.orderId) {
            const currentTime = Date.now();

            return {
              ...order,
              stage: action.payload.nextStage,
              stageTime: currentTime,
              totalTimeTaken: order.totalTimeTaken,
            };
          }
          return order;
        }),
      };
    case CANCEL_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    case UPDATE_TOTAL_DELIVERED:
      return {
        ...state,
        totalDelivered: state.orders.filter(
          (order) => order.stage === OrderStages.OrderInMaking
        ).length,
      };

    case UPDATE_TOTAL_TIME_TAKEN:
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.id === action.payload.orderId) {
            return {
              ...order,
              totalTimeTaken: order.totalTimeTaken + TIMER_DURATION_IN_MS,
            };
          }
          return order;
        }),
      };
    default:
      return state;
  }
};

export default orderReducer;
