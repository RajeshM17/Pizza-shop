import {
  ADD_ORDER,
  MOVE_STAGE,
  CANCEL_ORDER,
  UPDATE_TOTAL_DELIVERED,
  UPDATE_TOTAL_TIME_TAKEN,
} from './types';
import { Order, MoveStagePayload, UpdateTotalTimePayload } from '../types';

export const addOrder = (order: Order) => ({
  type: ADD_ORDER,
  payload: order,
});

export const moveStage = (payload: MoveStagePayload) => ({
  type: MOVE_STAGE,
  payload,
});

export const cancelOrder = (orderId: number) => ({
  type: CANCEL_ORDER,
  payload: orderId,
});

export const updateTotalDelivered = () => ({
  type: UPDATE_TOTAL_DELIVERED,
});

export const updateTotalTimeTaken = (payload: UpdateTotalTimePayload) => ({
  type: UPDATE_TOTAL_TIME_TAKEN,
  payload,
});
