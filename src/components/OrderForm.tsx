import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../store/actions';
import { Order, RootState } from '../store/types';
import toast from 'react-hot-toast';
import {
  OrderBaseCategory,
  OrderSizeCategory,
  OrderStages,
  OrderTypeCategory,
} from '../models/enums';

const OrderForm = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState<OrderTypeCategory>(OrderTypeCategory.Veg);
  const [size, setSize] = useState<OrderSizeCategory>(OrderSizeCategory.Small);
  const [base, setBase] = useState<OrderBaseCategory>(OrderBaseCategory.Thin);
  const orders = useSelector((state: RootState) => state.orders);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let filteredOrders = orders.filter(
      (order) => order.stage !== OrderStages.OrderPicked
    );
    if (filteredOrders.length < 10) {
      dispatch(addOrder({ type, size, base } as Order));
      toast.success('Order has been placed.');
      setType(OrderTypeCategory.Veg);
      setSize(OrderSizeCategory.Small);
      setBase(OrderBaseCategory.Thin);
    } else {
      toast('Not taking any order for now.');
    }
  };

  return (
    <div className='m-2 rounded-lg border-2'>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded gap-4 text-sm p-3'
      >
        <div className='flex justify-between'>
          <div>
            <label
              htmlFor='type'
              className='block text-gray-700 font-bold mb-2'
            >
              Type
            </label>
            <div className='flex'>
              <div className='flex items-center mr-4'>
                <input
                  id={OrderTypeCategory.Veg}
                  type='radio'
                  name='type'
                  value={OrderTypeCategory.Veg}
                  checked={type === OrderTypeCategory.Veg}
                  onChange={() => setType(OrderTypeCategory.Veg)}
                  className='form-radio h-3 w-3 text-indigo-600'
                />
                <label
                  htmlFor={OrderTypeCategory.Veg}
                  className='ml-2 block text-gray-700'
                >
                  Veg
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id={OrderTypeCategory.NonVeg}
                  type='radio'
                  name='type'
                  value={OrderTypeCategory.NonVeg}
                  checked={type === OrderTypeCategory.NonVeg}
                  onChange={() => setType(OrderTypeCategory.NonVeg)}
                  className='form-radio h-3 w-3 text-indigo-600'
                />
                <label
                  htmlFor={OrderTypeCategory.NonVeg}
                  className='ml-2 block text-gray-700'
                >
                  {OrderTypeCategory.NonVeg}
                </label>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor='size'
              className='block text-gray-700 font-bold mb-2'
            >
              Size
            </label>
            <div className='flex'>
              <div className='flex items-center mr-4'>
                <input
                  id={OrderSizeCategory.Small}
                  type='radio'
                  name='size'
                  value={OrderSizeCategory.Small}
                  checked={size === OrderSizeCategory.Small}
                  onChange={() => setSize(OrderSizeCategory.Small)}
                  className='form-radio h-3 w-3 text-indigo-600'
                />
                <label
                  htmlFor={OrderSizeCategory.Small}
                  className='ml-2 block text-gray-700'
                >
                  {OrderSizeCategory.Small}
                </label>
              </div>
              <div className='flex items-center mr-4'>
                <input
                  id={OrderSizeCategory.Medium}
                  type='radio'
                  name='size'
                  value={OrderSizeCategory.Medium}
                  checked={size === OrderSizeCategory.Medium}
                  onChange={() => setSize(OrderSizeCategory.Medium)}
                  className='form-radio h-3 w-3 text-indigo-600'
                />
                <label
                  htmlFor={OrderSizeCategory.Medium}
                  className='ml-2 block text-gray-700'
                >
                  {OrderSizeCategory.Medium}
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id={OrderSizeCategory.Large}
                  type='radio'
                  name='size'
                  value={OrderSizeCategory.Large}
                  checked={size === OrderSizeCategory.Large}
                  onChange={() => setSize(OrderSizeCategory.Large)}
                  className='form-radio h-3 w-3 text-indigo-600'
                />
                <label
                  htmlFor={OrderSizeCategory.Large}
                  className='ml-2 block text-gray-700'
                >
                  {OrderSizeCategory.Large}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 mt-3'>
          <div className=''>
            <div>
              <label
                htmlFor='base'
                className='block text-gray-700 font-bold mb-2'
              >
                Base
              </label>
              <div className='flex'>
                <div className='flex items-center mr-4'>
                  <input
                    id={OrderBaseCategory.Thin}
                    type='radio'
                    name='base'
                    value={OrderBaseCategory.Thin}
                    checked={base === OrderBaseCategory.Thin}
                    onChange={() => setBase(OrderBaseCategory.Thin)}
                    className='form-radio h-3 w-3 text-indigo-600'
                  />
                  <label
                    htmlFor={OrderBaseCategory.Thin}
                    className='ml-2 block text-gray-700'
                  >
                    {OrderBaseCategory.Thin}
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    id={OrderBaseCategory.Thick}
                    type='radio'
                    name='base'
                    value={OrderBaseCategory.Thick}
                    checked={base === OrderBaseCategory.Thick}
                    onChange={() => setBase(OrderBaseCategory.Thick)}
                    className='form-radio h-3 w-3 text-indigo-600'
                  />
                  <label
                    htmlFor={OrderBaseCategory.Thick}
                    className='ml-2 block text-gray-700'
                  >
                    Thick
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-2 pl-4'>
            <button
              type='submit'
              className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default OrderForm;
