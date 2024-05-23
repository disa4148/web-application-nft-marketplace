import { useState, useEffect } from 'react';

function useFormatNumber(value: number | string ): string {
  const [formattedValue, setFormattedValue] = useState<string>('');

  useEffect(() => {
    if (value === null || value === undefined) {
      setFormattedValue('0');  
      return;
    }

    const num = typeof value === 'string' ? parseFloat(value) : value;

    if (!isNaN(num)) {
      setFormattedValue(num.toFixed(4));  
    } else {
      setFormattedValue('0'); 
    }
  }, [value]);

  return formattedValue;
}

export default useFormatNumber;
