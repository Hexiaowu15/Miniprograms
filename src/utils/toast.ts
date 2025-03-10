interface ToastOptions {
  title: string;
  duration?: number;
  icon?: "success" | "error" | "loading" | "none";
  mask?: boolean;
  position?: "top" | "center" | "bottom";
  success?: () => void;
  fail?: (err: Error) => void;
  complete?: () => void;
}

const defaultOptions: Partial<ToastOptions> = {
  duration: 2000,
  icon: "none",
  mask: false,
  position: "center",
};

class Toast {
  private debounceTimer: number | null = null;
  private show(options: ToastOptions) {
    // 如果已经有计时器在运行，则不执行新的 toast 显示
    if (this.debounceTimer !== null) {
      return;
    }
    const mergedOptions = { ...defaultOptions, ...options };
    uni.showToast({
      title: mergedOptions.title,
      duration: mergedOptions.duration,
      icon: mergedOptions.icon,
      mask: mergedOptions.mask,
      position: mergedOptions.position,
      success: mergedOptions.success,
      fail: mergedOptions.fail,
      complete: mergedOptions.complete,
    });
    // 设置计时器，1秒后允许再次显示 toast
    this.debounceTimer = setTimeout(() => {
      this.debounceTimer = null;
    }, 1000) as unknown as number;
  }

  success(title: string, options: Partial<ToastOptions> = {}) {
    this.show({ ...options, title, icon: "success" });
  }

  error(title: string, options: Partial<ToastOptions> = {}) {
    this.show({ ...options, title, icon: "error" });
  }

  loading(title: string, options: Partial<ToastOptions> = {}) {
    this.show({ ...options, title, icon: "loading" });
  }

  info(title: string, options: Partial<ToastOptions> = {}) {
    this.show({ ...options, title, icon: "none" });
  }

  hide() {
    uni.hideToast();
  }
}

export const toast = new Toast();
