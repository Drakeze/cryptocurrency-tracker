'use client'

import { useState } from 'react'
import page from './page';
const Calculator = () => {
const [display, setDisplay] = useState('0')
const [equation, setEquation] = useState('')
const [prevNumber, setPrevNumber] = useState('')
const [operation, setOperation] = useState('')
const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

const handleNumber = (num: string) => {
    if (display === '0' || shouldResetDisplay) {
    setDisplay(num)
    setShouldResetDisplay(false)
    } else {
    setDisplay(display + num)
    }
}

const handleOperation = (op: string) => {
    if (prevNumber && operation && !shouldResetDisplay) {
    calculate()
    }
    setPrevNumber(display)
    setOperation(op)
    setShouldResetDisplay(true)
    setEquation(`${display} ${op}`)
}

const calculate = () => {
    if (!prevNumber || !operation) return

    const prev = parseFloat(prevNumber)
    const current = parseFloat(display)
    let result = 0

    switch (operation) {
    case '+':
        result = prev + current
        break
    case '-':
        result = prev - current
        break
    case '×':
        result = prev * current
        break
    case '÷':
        result = prev / current
        break
    }

    setDisplay(result.toString())
    setEquation('')
    setPrevNumber('')
    setOperation('')
}

const clear = () => {
    setDisplay('0')
    setEquation('')
    setPrevNumber('')
    setOperation('')
    setShouldResetDisplay(false)
}

const deleteNumber = () => {
    if (display.length > 1) {
    setDisplay(display.slice(0, -1))
    } else {
    setDisplay('0')
    }
}

const handleDecimal = () => {
    if (!display.includes('.')) {
    setDisplay(display + '.')
    }
}

return (
    <div className="w-full max-w-md p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
    <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <div className="text-gray-500 dark:text-gray-400 text-sm h-6">
        {equation}
        </div>
        <div className="text-right text-2xl font-bold text-gray-800 dark:text-white">
        {display}
        </div>
    </div>
    
    <div className="grid grid-cols-4 gap-2">
        <button
        onClick={() => clear()}
        className="col-span-2 p-4 text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 rounded-lg transition-colors"
        >
        AC
        </button>
        <button
        onClick={() => deleteNumber()}
        className="p-4 text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 rounded-lg transition-colors"
        >
        DEL
        </button>
        <button
        onClick={() => handleOperation('÷')}
        className="p-4 text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors"
        >
        ÷
        </button>
        
        {[7, 8, 9].map((num) => (
        <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className="p-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-800 dark:text-white"
        >
            {num}
        </button>
        ))}
        <button
        onClick={() => handleOperation('×')}
        className="p-4 text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors"
        >
        ×
        </button>
        
        {[4, 5, 6].map((num) => (
        <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className="p-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-800 dark:text-white"
        >
            {num}
        </button>
        ))}
        <button
        onClick={() => handleOperation('-')}
        className="p-4 text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors"
        >
        -
        </button>
        
        {[1, 2, 3].map((num) => (
        <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className="p-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-800 dark:text-white"
        >
            {num}
        </button>
        ))}
        <button
        onClick={() => handleOperation('+')}
        className="p-4 text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors"
        >
        +
        </button>
        
        <button
        onClick={() => handleNumber('0')}
        className="col-span-2 p-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-800 dark:text-white"
        >
        0
        </button>
        <button
        onClick={handleDecimal}
        className="p-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-800 dark:text-white"
        >
        .
        </button>
        <button
        onClick={calculate}
        className="p-4 text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 rounded-lg transition-colors"
        >
        =
        </button>
    </div>
    </div>
)
}

export default Calculator