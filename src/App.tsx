import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { amountAdded, incremented } from './features/counter/counterSlice';
import { dogsApiSlice } from './features/dogs/dogsApiSlice';
import { useFetchBreedsQuery } from './features/dogs/dogsApiSlice';

function App() {
  const [value, setValue] = useState(0);
  const [numDogs, setNumDogs] = useState(10);
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);

  const handleClick = () => {
    dispatch(incremented());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(amountAdded(value));
  };

  return (
    <div className="App">
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
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
        <div className="flex gap-2 justify-center items-center">
          <div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <p>Number of dogs fetched: {data.length}</p>
              <div className="flex items-center justify-center gap-4">
                <p>Dogs to fetch</p>
                <select
                  value={numDogs}
                  onChange={(e) => setNumDogs(Number(e.target.value))}
                  className="bg-gray-800 rounded-md p-1"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Picture</th>
                </tr>
              </thead>
              <tbody>
                {data.map((breed) => (
                  <tr key={breed.id}>
                    <td>{breed.name}</td>
                    <td>
                      <img
                        src={breed.image.url}
                        alt={breed.name}
                        height={250}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <span>Current Count: {count}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
