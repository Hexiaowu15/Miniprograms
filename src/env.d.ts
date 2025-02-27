/// <reference types="vite/client" />



declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, Record<string, never>>
  export default component
}
