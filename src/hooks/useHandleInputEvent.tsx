import { KeyboardEvent, MouseEvent, RefObject, useRef, useState } from 'react';
import { Sick } from '../types';

function useHandleInputEvent(suggestions: Sick[]) {
  const [selectedIndex, setSelectedIndex] = useState(-2);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const keyEvent = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetIndex = () => setSelectedIndex(-2);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;
    keyEvent.current = true;

    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => {
        if (prev === suggestions.length - 1) return 0;
        return prev + 1;
      });
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => {
        if (prev <= 0) return suggestions.length - 1;
        return prev - 1;
      });
    } else if (e.key === 'Enter') {
      alert('Go to Suggestion: ' + suggestions[selectedIndex].sickNm);
    } else if (e.key === 'Escape') {
      if (inputRef.current !== null) {
        inputRef.current.blur();
      }
    }
    keyEvent.current = false;
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setIsOpenDropdown(false);
    }, 100);
    resetIndex();
  };

  const handleOnFocus = () => {
    setIsOpenDropdown(true);
    resetIndex();
  };

  const goToSuggestion = (e: MouseEvent, sickName: string) => {
    alert('Go to Suggestion: ' + sickName);
  };

  return {
    handleKeyDown,
    handleOnFocus,
    handleOnBlur,
    goToSuggestion,
    selectedIndex,
    isOpenDropdown,
    resetIndex,
    inputRef,
  };
}
export default useHandleInputEvent;
