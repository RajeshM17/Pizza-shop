import {
  OrderBaseCategory,
  OrderSizeCategory,
  OrderStages,
  OrderTypeCategory,
} from '../models/enums';
import {
  ADD_ORDER,
  CANCEL_ORDER,
  MOVE_STAGE,
  UPDATE_TOTAL_DELIVERED,
  UPDATE_TOTAL_TIME_TAKEN,
} from './actions/types';

export interface Order {
  type: OrderTypeCategory;
  size: OrderSizeCategory;
  base: OrderBaseCategory;
  id: number;
  stage: OrderStages;
  stageTime: number;
  totalTimeTaken: number;
}

export interface OrderState {
  orders: Order[];
  totalDelivered: number;
}

export interface MoveStagePayload {
  orderId: number;
  nextStage: OrderStages;
  intervalTime: number;
}

export interface UpdateTotalTimePayload {
  orderId: number;
  intervalTime: number;
}

interface AddOrderAction {
  type: typeof ADD_ORDER;
  payload: Order;
}

interface MoveStageAction {
  type: typeof MOVE_STAGE;
  payload: MoveStagePayload;
}

interface CancelOrderAction {
  type: typeof CANCEL_ORDER;
  payload: number;
}

interface UpdateTotalDeliveredAction {
  type: typeof UPDATE_TOTAL_DELIVERED;
}

interface UpdateTotalTimeTakenAction {
  type: typeof UPDATE_TOTAL_TIME_TAKEN;
  payload: UpdateTotalTimePayload;
}

export type ActionTypes =
  | AddOrderAction
  | MoveStageAction
  | CancelOrderAction
  | UpdateTotalDeliveredAction
  | UpdateTotalTimeTakenAction;

export type RootState = OrderState;
