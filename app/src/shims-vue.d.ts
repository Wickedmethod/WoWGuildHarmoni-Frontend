declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  type Props = Record<string, unknown>;
  type Data = Record<string, unknown>;
  type Methods = Record<string, unknown>;
  const component: DefineComponent<Props, Data, Methods>;
  export default component;
}
