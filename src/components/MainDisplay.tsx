import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder } from '../store/actions';
import { Order, RootState } from '../store/types';
import toast from 'react-hot-toast';
import { formatTime } from '../utility/utils';
import { OrderStages } from '../models/enums';

const MainDisplay = () => {
  const { orders, totalDelivered } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const handleCancel = (order: Order) => {
    if (
      order.stage !== OrderStages.OrderReady &&
      order.stage !== OrderStages.OrderPicked
    ) {
      dispatch(cancelOrder(order.id));
      toast.error('Order has been canceled.');
    }
  };

  return (
    <div className='m-2 rounded-lg border-2 p-2'>
      <div className='font-semibold p-1'>Main Section</div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg border border-1 border-slate-300 min-h-[380px] max-h-[380px] overflow-scroll'>
        <table className='w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400 '>
          <caption className='text-left m-2'>
            Orders in Progress: {orders.length - totalDelivered}
          </caption>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Order Id
              </th>
              <th scope='col' className='px-6 py-3'>
                Stage
              </th>
              <th scope='col' className='px-6 py-3'>
                Total Time Spent
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((order) => order.stage !== OrderStages.OrderPicked)
              .map((order, index) => {
                return (
                  <tr
                    key={order.id}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                  >
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                    >
                      {order.id}
                    </th>
                    <td className='px-6 py-4'>{order.stage}</td>
                    <td className='px-6 py-4'>
                      {formatTime(order.totalTimeTaken)}
                    </td>
                    <td>
                      {order.stage !== OrderStages.OrderReady && (
                        <button
                          onClick={() => handleCancel(order)}
                          className='py-1 px-3 bg-red-500 text-white rounded'
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr className='font-semibold text-gray-900 dark:text-white'>
              <th scope='row' className='px-6 py-3 text-base'>
                Total Orders Delivered
              </th>
              <td className='px-6 py-3'>{totalDelivered}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MainDisplay;
