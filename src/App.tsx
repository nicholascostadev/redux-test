import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { amountAdded, incremented } from './features/counter/counterSlice';

function App() {
  const [value, setValue] = useState(0);
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(incremented());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(amountAdded(value));
  };

  return (
    <div className="App">
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <div className="flex gap-2 justify-center items-center">
          <div>
            <button
              onClick={handleClick}
              className="border border-black/5 hover:bg-gray-800 bg-gray-700 transition-colors px-2 py-1 rounded-md"
            >
              Click me!
            </button>
          </div>
          <span>Current Count: {count}</span>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                className="bg-gray-800 w-20 focus:outline-none rounded-md p-1"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </form>
          </div>
          <span>Current Count: {count}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
