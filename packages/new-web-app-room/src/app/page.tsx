'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const toggleSign = () => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
    }
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Calculator v3</h1>
      <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full border border-gray-200">
        {/* Display */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-4 border border-gray-200">
          <div className="text-right text-gray-900 text-4xl font-light overflow-hidden">
            {display.length > 9 ? display.slice(0, 9) + '...' : display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={clear}
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 text-xl font-medium rounded-full h-16 transition-colors"
          >
            AC
          </button>
          <button
            onClick={toggleSign}
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 text-xl font-medium rounded-full h-16 transition-colors"
          >
            ±
          </button>
          <button
            onClick={percentage}
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 text-xl font-medium rounded-full h-16 transition-colors"
          >
            %
          </button>
          <button
            onClick={() => inputOperation('÷')}
            className={`text-white text-2xl font-light rounded-full h-16 transition-colors ${
              operation === '÷' ? 'bg-gray-200 text-blue-600 border-2 border-blue-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber('7')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-2xl font-light rounded-full h-16 transition-colors"
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-2xl font-light rounded-full h-16 transition-colors"
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-2xl font-light rounded-full h-16 transition-colors"
          >
            9
          </button>
          <button
            onClick={() => inputOperation('×')}
            className={`text-white text-2xl font-light rounded-full h-16 transition-colors ${
              operation === '×' ? 'bg-gray-200 text-blue-600 border-2 border-blue-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber('4')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-2xl font-light rounded-full h-16 transition-colors"
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-2xl font-light rounded-full h-16 transition-colors"
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-2xl font-light rounded-full h-16 transition-colors"
          >
            6
          </button>
          <button
            onClick={() => inputOperation('-')}
            className={`text-white text-2xl font-light rounded-full h-16 transition-colors ${
              operation === '-' ? 'bg-gray-200 text-blue-600 border-2 border-blue-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            −
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber('1')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-2xl font-light rounded-full h-16 transition-colors"
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-2xl font-light rounded-full h-16 transition-colors"
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-2xl font-light rounded-full h-16 transition-colors"
          >
            3
          </button>
          <button
            onClick={() => inputOperation('+')}
            className={`text-white text-2xl font-light rounded-full h-16 transition-colors ${
              operation === '+' ? 'bg-gray-200 text-blue-600 border-2 border-blue-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputNumber('0')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-2xl font-light rounded-full h-16 col-span-2 transition-colors"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-2xl font-light rounded-full h-16 transition-colors"
          >
            .
          </button>
          <button
            onClick={performCalculation}
            className="bg-green-500 hover:bg-green-600 text-white text-2xl font-light rounded-full h-16 transition-colors"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}











