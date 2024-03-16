import React from 'react';
import { useSelector } from 'react-redux';
import PizzaCard from './PizzaCard';
import { RootState, Order } from '../store/types';
import { OrderStages } from '../models/enums';

const PizzaStages = () => {
  const orders = useSelector((state: RootState) => state.orders);

  const sortedOrders = orders.slice().sort((a: Order, b: Order) => {
    return (
      (a.stageTime - b.stageTime) /
        (a.stage === OrderStages.OrderPlaced
          ? 1
          : a.stage === OrderStages.OrderInMaking
          ? 2
          : a.stage === OrderStages.OrderReady
          ? 3
          : 4) -
      (b.stageTime - b.stageTime) /
        (b.stage === OrderStages.OrderPlaced
          ? 1
          : b.stage === OrderStages.OrderInMaking
          ? 2
          : b.stage === OrderStages.OrderReady
          ? 3
          : 4)
    );
  });

  return (
    <div className='m-2 grid grid-cols-4 rounded-lg border-2 min-h-[97vh] max-h-[97vh] overflow-scroll'>
      <div className='border-r-2'>
        <h2 className='text-sm font-bold text-center p-2 border-b-2 bg-slate-300'>
          Order Placed
        </h2>
        <div className='m-3'>
          {sortedOrders
            .filter((order) => order.stage === OrderStages.OrderPlaced)
            .map((order) => {
              return (
                <PizzaCard
                  key={order.id}
                  order={order}
                  stage={OrderStages.OrderPlaced}
                />
              );
            })}
        </div>
      </div>
      <div className='border-r-2 '>
        <h2 className='text-sm font-bold text-center p-2 border-b-2 bg-slate-300'>
          Order in Making
        </h2>
        <div className='m-3'>
          {sortedOrders
            .filter((order) => order.stage === OrderStages.OrderInMaking)
            .map((order) => (
              <PizzaCard
                key={order.id}
                order={order}
                stage={OrderStages.OrderInMaking}
              />
            ))}
        </div>
      </div>
      <div className='border-r-2'>
        <h2 className='text-sm font-bold text-center p-2 border-b-2 bg-slate-300'>
          Order Ready
        </h2>
        <div className='m-3'>
          {sortedOrders
            .filter((order) => order.stage === OrderStages.OrderReady)
            .map((order) => (
              <PizzaCard
                key={order.id}
                order={order}
                stage={OrderStages.OrderReady}
              />
            ))}
        </div>
      </div>
      <div className='border-r-2 '>
        <h2 className='text-sm font-bold text-center p-2 border-b-2 bg-slate-300'>
          Order Picked
        </h2>
        <div className='m-3'>
          {sortedOrders
            .filter((order) => order.stage === OrderStages.OrderPicked)
            .map((order) => (
              <PizzaCard
                key={order.id}
                order={order}
                stage={OrderStages.OrderPicked}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PizzaStages;
