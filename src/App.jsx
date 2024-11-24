import { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [isMatch, setIsMatch] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
    checkEvenA(event.target.value);
  };

  const checkEvenA = (text) => {
    const aCount = (text.match(/a/g) || []).length;
    setIsMatch(aCount % 2 === 0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Even a Checker
        </h1>
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={handleTextChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p
          className={`mt-4 text-center ${
            isMatch ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isMatch
            ? 'The string has an even number of "a"s.'
            : 'The string does not have an even number of "a"s.'}
        </p>
      </div>
    </div>
  );
}

export default App;