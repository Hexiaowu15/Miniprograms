import { useToast } from 'wot-design-uni'

type ToastPosition = 'top' | 'middle-top' | 'middle' | 'bottom'
type ToastDirection = 'vertical' | 'horizontal'
type ToastIconName = 'success' | 'error' | 'warning' | 'loading' | 'info'
type ToastLoadingType = 'outline' | 'ring'

export interface ToastOptions {
  msg?: string
  duration?: number
  direction?: ToastDirection
  iconName?: ToastIconName
  iconSize?: number
  iconClass?: string
  classPrefix?: string
  position?: ToastPosition
  zIndex?: number
  loadingType?: ToastLoadingType
  loadingColor?: string
  loadingSize?: number
  cover?: boolean
  selector?: string
}

class ToastService {
  private readonly toast = useToast()

  private show(options: string | ToastOptions) {
    if (typeof options === 'string') {
      return this.toast.show(options)
    }
    return this.toast.show(options)
  }

  success(options: string | Omit<ToastOptions, 'iconName'>) {
    const opts = typeof options === 'string' ? { msg: options } : options
    return this.show({ ...opts, iconName: 'success' })
  }

  error(options: string | Omit<ToastOptions, 'iconName'>) {
    const opts = typeof options === 'string' ? { msg: options } : options
    return this.show({ ...opts, iconName: 'error' })
  }

  warning(options: string | Omit<ToastOptions, 'iconName'>) {
    const opts = typeof options === 'string' ? { msg: options } : options
    return this.show({ ...opts, iconName: 'warning' })
  }

  info(options: string | Omit<ToastOptions, 'iconName'>) {
    const opts = typeof options === 'string' ? { msg: options } : options
    return this.show({ ...opts, iconName: 'info' })
  }

  loading(options: string | Omit<ToastOptions, 'iconName'>) {
    const opts = typeof options === 'string' ? { msg: options } : options
    return this.toast.loading({ ...opts, iconName: 'loading' })
  }

  close() {
    this.toast.close()
  }
}
const toast = new ToastService()
// 修复为正确的导出语句
export { toast };
