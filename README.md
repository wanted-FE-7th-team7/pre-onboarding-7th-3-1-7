# team7-week3-1

원티드 프론트엔드 프리온보딩 7차 7팀 3-1 과제 레포리토리입니다

## 캐싱 전략

캐싱을 위해 캐쉬 객체 생성
데이터를 받고 나서 캐쉬에 저장
API 콜 시점마다 캐쉬에 해당 쿼리에 해당하는 밸류가 존재하면 저장된 데이터를 return

```typescript
const cache: Cache = {};

export const getSicksQuery = async (query: string) => {
  if (cache[query]) {
    console.info('use Cache');
    return cache[query];
  }

  console.info('calling api');
  const { data }: AxiosResponse<Sick[]> = await http.get(URLS.SICK, {
    params: { sickNm_like: query },
  });

  cache[query] = data;

  return data;
};
```

## API 호출 최소화 전략

### Debouncing

사용자가 키입력 중일 땐 지속적으로 clearTimeout을 통해 api호출 지연
키입력이 멈추고 일정시간 지날 시 API 호출

```typescript
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
```

## 키입력 사용법

가능한 입력

- 아래 방향
- 윗방향
- 엔터
- ESC

![프리온보딩-과제-한국임상](https://user-images.githubusercontent.com/88099590/201021434-36c81901-a8a2-4187-be22-3445d634c20d.gif)
