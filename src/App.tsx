import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import MainDisplay from './components/MainDisplay';
import OrderForm from './components/OrderForm';
import PizzaStages from './components/PizzaStages';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Toaster />
      <div className='grid grid-cols-1 md:grid-cols-5'>
        <div className='col-span-2'>
          <OrderForm />
          <MainDisplay />
        </div>
        <div className='col-span-1 md:col-span-3'>
          <PizzaStages />
        </div>
      </div>
    </Provider>
  );
}

export default App;