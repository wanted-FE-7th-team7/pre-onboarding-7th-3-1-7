export const createDebounce = <T, R>(
  callback: (arg: T) => Promise<R>,
  delay: number
) => {
  let timer: NodeJS.Timeout | null = null;

  return (arg: T) => {
    return new Promise<R>(resolve => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => resolve(callback(arg)), delay);
    });
  };
};
