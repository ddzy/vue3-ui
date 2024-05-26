import { Plugin, DefineComponent } from '@vue/runtime-core';

export type SFCWithInstall<P> = Plugin & DefineComponent<P>
export type FactoryWithInstall<T> = Plugin & T;