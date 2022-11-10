# **team7-week3-1**

원티드 프론트엔드 프리온보딩 7차 7팀 3-1 과제 레포리토리입니다

### **배포 주소**

[http://team7-week1-2.s3-website.ap-northeast-2.amazonaws.com](http://team7-week1-2.s3-website.ap-northeast-2.amazonaws.com/)

### **폴더구조**

```
📦src
 ┣ 📂apis
 ┃ ┣ 📜Sicks.service.ts
 ┃ ┗ 📜api.ts
 ┣ 📂cache
 ┃ ┗ 📜index.ts
 ┣ 📂components
 ┃ ┣ 📜Loading.tsx
 ┃ ┣ 📜SearchInput.tsx
 ┃ ┣ 📜StyledText.tsx
 ┃ ┗ 📜SuggestionDropdown.tsx
 ┣ 📂contexts
 ┃ ┗ 📜index.ts
 ┣ 📂db
 ┃ ┗ 📜db.json
 ┣ 📂hooks
 ┃ ┣ 📜useDebounce.tsx
 ┃ ┗ 📜useHandleInputEvent.tsx
 ┣ 📂pages
 ┃ ┗ 📜SearchPage.tsx
 ┣ 📂styles
 ┃ ┣ 📜Common.ts
 ┃ ┗ 📜GlobalStyle.tsx
 ┣ 📂utils
 ┃ ┗ 📜index.ts
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┗ 📜types.ts
```

1. apis: api 관리
2. cache :  cache 데이터 관리
3. components : 프로젝트에서 사용되는 컴포넌트 관리
4. db :  json-server DB
5. hooks : 공통으로 사용되는 hooks 관리
6. pages : 페이지 단위 컴포넌트 관리
7. styles: 공통으로 사용되는 스타일 관리
8. utils : 공통으로 사용되는 기타 함수 관리

### 텍스트 볼드처리

```tsx
const SuggestionDropdown = ({
  sickNm,
  target,
  isSelected,
  handleOnClick,
}: Props) => {
  const index = sickNm.indexOf(target);
  const endIndex = index + target.length;
  const prev = sickNm.slice(0, index);
  const next = sickNm.slice(endIndex);

  return (
    <li className={isSelected ? 'selected' : ''} onClick={handleOnClick}>
      {prev}
      <BoldText>{target}</BoldText>
      {next}
    </li>
  );
};
```

- 일치하는 타겟이 존재하면 그 부분을 볼드처리하는 방식으로 해결했습니다.
    - 텍스트가 발견되었을때
        - 발견된 텍스트를 볼드처리합니다.
    - 텍스트가 발견되지 않았을대
        - 원본 문자열을 그대로 반환합니다.

### API 호출 최적화

```tsx
import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};
```

- useDebounce Hook을 만들어 사용했습니다.

value(변화하는 input 값)와 delay(지연되는 ms)를 받아 useEffect를 사용해 변화값이 delay 보다 작으면 timeout 초기화 후 다시 timeout을 실행했습니다.

timeout이 끝나면 debounceValue가 바뀌게 됩니다. 

### 캐싱

```tsx
const myCache = new Map();

export const setMyCacheData = <T>(key: string, data: T) => {
  const value = { data, expired: new Date().getTime() + 5000 };
  myCache.set(key, value);
};

export const getMyCacheData = (key: string) => {
  if (myCache.has(key)) {
    if (myCache.get(key).expired > new Date().getTime()) {
      return myCache.get(key).data;
    } else {
      myCache.delete(key);
    }
  }

  return null;
};

export const getSicks = async (query: string) => {
  if (getMyCacheData(query)) {
    console.info('use Cached Data');
    return getMyCacheData(query);
  }

  try {
    console.info('api 호출');
    const res = await http.get<Sick[]>(URLS.SICK, {
      params: { sickNm_like: query },
    });
    setMyCacheData(query, res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
```

- cache를 Map의 key 타입으로 string, value 타입으로 {expired: number, data} 을 지정하여 값을 저장해놓습니다.
    - 만약 키 값이 존재한다면
        - 만료되지 않았다면 그대로 반환합니다.
        - 만료되었다면 해당 값을 cache에서 삭제합니다.
    - 만약 키 값이 존재하지 않는다면
        - API를 호출하여 값을 요청합니다.

### 키보드 이동

```tsx
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

 //...
}
export default useHandleInputEvent;
```

**가능한 입력**

- 아래 위 방향
    - `selectedIndex === index` 일 경우 배경색을 변경하여 사용자가 인지할 수 있음
    - suggestions 배열의 첫번째, 마지막일 경우 되돌아 갈수 있도록 로직 구현
- 엔터, 클릭
    - 엔터, 클릭 시 `alert`
- ESC
    - ESC 할 경우 blur를 통해 dropdown false
