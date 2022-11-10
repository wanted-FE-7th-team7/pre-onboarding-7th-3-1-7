import { KeyboardEvent, MouseEvent, useState } from 'react';
import { Sick } from '../types';

function useHandleInputEvent(suggestions: Sick[]) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      return selectedIndex === suggestions.length - 1
        ? setSelectedIndex(0)
        : setSelectedIndex(prev => prev + 1);
    } else if (e.key === 'ArrowUp') {
      return selectedIndex === 0
        ? setSelectedIndex(suggestions.length - 1)
        : setSelectedIndex(prev => prev - 1);
    } else if (e.key === 'Enter') {
      return alert('Go to Suggestion: ' + suggestions[selectedIndex].sickNm);
    }
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setIsOpenDropdown(false);
    }, 500);
    setSelectedIndex(-1);
  };

  const handleOnFocus = () => {
    setIsOpenDropdown(true);
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
  };
}
export default useHandleInputEvent;
