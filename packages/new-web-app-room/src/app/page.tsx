'use client';

import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Calculator() {
  const { theme, toggleTheme } = useTheme();
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
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <div className="flex items-center gap-4 mb-8">
        <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Calculator v5
        </h1>
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-colors ${
            theme === 'dark' 
              ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
              : 'bg-white hover:bg-gray-50 text-gray-700 shadow-md'
          }`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
      <div className={`rounded-3xl p-6 shadow-2xl max-w-sm w-full border transition-colors ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        {/* Display */}
        <div className={`rounded-2xl p-6 mb-4 border transition-colors ${
          theme === 'dark' 
            ? 'bg-gray-900 border-gray-600' 
            : 'bg-gray-50 border-gray-300'
        }`}>
          <div className={`text-right text-4xl font-light overflow-hidden ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {display.length > 9 ? display.slice(0, 9) + '...' : display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={clear}
            className={`text-xl font-medium rounded-full h-16 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
            }`}
          >
            AC
          </button>
          <button
            onClick={toggleSign}
            className={`text-xl font-medium rounded-full h-16 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
            }`}
          >
            ±
          </button>
          <button
            onClick={percentage}
            className={`text-xl font-medium rounded-full h-16 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
            }`}
          >
            %
          </button>
          <button
            onClick={() => inputOperation('÷')}
            className={`text-2xl font-light rounded-full h-16 transition-colors ${
              operation === '÷' 
                ? theme === 'dark'
                  ? 'bg-gray-700 text-orange-400 border-2 border-orange-400'
                  : 'bg-gray-200 text-orange-600 border-2 border-orange-600'
                : theme === 'dark'
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber('7')}
            className={`text-2xl font-light rounded-full h-16 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className={`text-2xl font-light rounded-full h-16 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className={`text-2xl font-light rounded-full h-16 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            9
          </button>
          <button
            onClick={() => inputOperation('×')}
            className={`text-2xl font-light rounded-full h-16 transition-colors ${
              operation === '×' 
                ? theme === 'dark'
                  ? 'bg-gray-700 text-orange-400 border-2 border-orange-400'
                  : 'bg-gray-200 text-orange-600 border-2 border-orange-600'
                : theme === 'dark'
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber('4')}
            className={`text-2xl font-light rounded-full h-16 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className={`text-2xl font-light rounded-full h-16 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className={`text-2xl font-light rounded-full h-16 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            6
          </button>
          <button
            onClick={() => inputOperation('-')}
            className={`text-2xl font-light rounded-full h-16 transition-colors ${
              operation === '-' 
                ? theme === 'dark'
                  ? 'bg-gray-700 text-orange-400 border-2 border-orange-400'
                  : 'bg-gray-200 text-orange-600 border-2 border-orange-600'
                : theme === 'dark'
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            −
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber('1')}
            className={`text-2xl font-light rounded-full h-16 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className={`text-2xl font-light rounded-full h-16 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className={`text-2xl font-light rounded-full h-16 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            3
          </button>
          <button
            onClick={() => inputOperation('+')}
            className={`text-2xl font-light rounded-full h-16 transition-colors ${
              operation === '+' 
                ? theme === 'dark'
                  ? 'bg-gray-700 text-orange-400 border-2 border-orange-400'
                  : 'bg-gray-200 text-orange-600 border-2 border-orange-600'
                : theme === 'dark'
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputNumber('0')}
            className={`text-2xl font-light rounded-full h-16 col-span-2 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className={`text-2xl font-light rounded-full h-16 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
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
































