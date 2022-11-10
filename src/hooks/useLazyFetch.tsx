import { ChangeEvent, useRef, useState } from 'react';
import { DEBOUNCING_TIME } from '../apis/api';
import { getSicksQuery } from '../apis/Sicks.service';
import { Sick } from '../types';

function useLazyFetch() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Sick[]>([]);
  const settimeout = useRef<NodeJS.Timeout | undefined>();
  const prevQuery = useRef<string>('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value === '') return;

    clearTimeout(settimeout.current);
    settimeout.current = setTimeout(async () => {
      prevQuery.current = e.target.value;
      const sicks = await getSicksQuery(e.target.value);
      setSuggestions([...sicks]);
    }, DEBOUNCING_TIME);
  };
  const hasNoSuggestions = suggestions.length === 0;

  return { input, suggestions, handleOnChange, hasNoSuggestions, prevQuery };
}
export default useLazyFetch;
