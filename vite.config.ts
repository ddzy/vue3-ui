import { defineConfig, mergeConfig } from 'vite';
import docsBuildConfig from './build/docs.build';
import commonConfig from './config/common';

// https://vitejs.dev/config/
export default defineConfig(mergeConfig(commonConfig, docsBuildConfig));
