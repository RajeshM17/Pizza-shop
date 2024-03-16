import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  moveStage,
  updateTotalDelivered,
  updateTotalTimeTaken,
} from '../store/actions';
import { Order } from '../store/types';
import toast from 'react-hot-toast';
import { formatTime } from '../utility/utils';
import {
  LARGE_SIZE_ORDER_MAKING_TIME_IN_MIN,
  MEDIUM_SIZE_ORDER_MAKING_TIME_IN_MIN,
  SMALL_SIZE_ORDER_MAKING_TIME_IN_MIN,
  TIMER_DURATION_IN_MS,
} from '../models/constants';
import { OrderSizeCategory, OrderStages } from '../models/enums';

interface PizzaCardProps {
  order: Order;
  stage: string;
}

const PizzaCard = ({ order, stage }: PizzaCardProps) => {
  const { size, id, stageTime } = order;

  const dispatch = useDispatch();
  const [highlight, setHighlight] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(0);
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (stage !== OrderStages.OrderPicked) {
      timer = setInterval(() => {
        const currentTime = Date.now();
        const stageDelay = (currentTime - stageTime) / 60000; // Convert to minutes
        const maxDelay =
          size === OrderSizeCategory.Small
            ? SMALL_SIZE_ORDER_MAKING_TIME_IN_MIN
            : size === OrderSizeCategory.Medium
            ? MEDIUM_SIZE_ORDER_MAKING_TIME_IN_MIN
            : LARGE_SIZE_ORDER_MAKING_TIME_IN_MIN; // Based on pizza size
        intervalRef.current = intervalRef.current + 1;
        dispatch(
          updateTotalTimeTaken({
            orderId: id,
            intervalTime: intervalRef.current,
          })
        );

        setHighlight(stageDelay > maxDelay);
        setElapsedTime(currentTime - stageTime);
      }, TIMER_DURATION_IN_MS);
    }
    return () => clearInterval(timer);
  }, [dispatch, id, order.stage, size, stage, stageTime]);

  const handleNext = () => {
    const nextStage =
      stage === OrderStages.OrderPlaced
        ? OrderStages.OrderInMaking
        : stage === OrderStages.OrderInMaking
        ? OrderStages.OrderReady
        : OrderStages.OrderPicked;

    dispatch(
      moveStage({
        orderId: id,
        nextStage,
        intervalTime: intervalRef.current - 1,
      })
    );
    if (nextStage === OrderStages.OrderPicked) {
      dispatch(updateTotalDelivered());
      toast.success('Order has been picked.');
    }
  };

  return (
    <div
      className={`shadow-md border border-1 border-slate-300 shadow-slate-500 rounded-lg  mb-4 my-3 flex flex-col items-center px-2 py-4 ${
        highlight ? 'bg-red-500 text-white' : ''
      }`}
    >
      <h3 className='text-sm  mb-2'>Order {id}</h3>
      {stage !== OrderStages.OrderPicked ? (
        <p>{formatTime(elapsedTime)}</p>
      ) : (
        <p>Total: {formatTime(order.totalTimeTaken)}</p>
      )}
      <div className='flex gap-2 mt-4'>
        <button
          onClick={handleNext}
          disabled={stage === OrderStages.OrderPicked}
          className='bg-indigo-500 hover:bg-indigo-700 text-xs text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {stage === order.stage && stage === OrderStages.OrderPicked
            ? 'Picked'
            : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default PizzaCard;
