import type { Plugin, DefineComponent } from 'vue';

export type SFCWithInstall<P> = Plugin & DefineComponent<P>;
export type FactoryWithInstall<T> = Plugin & T;
