// /**
//  * 工具函数类型定义
//  */
// export type Utils = {
//   debounce: <T extends (...args: unknown[]) => unknown>(
//     fn: T,
//     delay?: number
//   ) => (...args: Parameters<T>) => void;
//   throttle: <T extends (...args: unknown[]) => unknown>(
//     fn: T,
//     interval?: number
//   ) => (...args: Parameters<T>) => void;
//   debounceWithCancel: <T extends (...args: unknown[]) => unknown>(
//     fn: T,
//     delay?: number
//   ) => {
//     run: (...args: Parameters<T>) => void;
//     cancel: () => void;
//   };
// };

/**
 * 防抖函数
 * 在一定时间内，多次触发同一事件，只执行最后一次
 * @param fn 需要防抖的函数
 * @param delay 延迟时间，单位毫秒，默认300ms
 * @returns 防抖处理后的函数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 300
): (...args: Parameters<T>) => void {
  let timer: number | null = null;

  return function (this: unknown, ...args: Parameters<T>): void {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay) as unknown as number;
  };
}

/**
 * 节流函数
 * 在一定时间内，多次触发同一事件，只执行第一次
 * @param fn 需要节流的函数
 * @param interval 间隔时间，单位毫秒，默认300ms
 * @returns 节流处理后的函数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  interval = 300
): (...args: Parameters<T>) => void {
  let lastTime = 0;

  return function (this: unknown, ...args: Parameters<T>): void {
    const now = Date.now();

    if (now - lastTime >= interval) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

/**
 * 带有取消功能的防抖函数
 * @param fn 需要防抖的函数
 * @param delay 延迟时间，单位毫秒，默认300ms
 * @returns 包含执行函数和取消函数的对象
 */
export function debounceWithCancel<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 300
): {
  run: (...args: Parameters<T>) => void;
  cancel: () => void;
} {
  let timer: number | null = null;

  const run = function (this: unknown, ...args: Parameters<T>): void {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay) as unknown as number;
  };

  const cancel = function (): void {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return { run, cancel };
}
