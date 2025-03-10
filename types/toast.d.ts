import { toast } from '@/utils/toast';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: typeof toast;
  }
}