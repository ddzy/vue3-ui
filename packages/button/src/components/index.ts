import { App } from 'vue';
import V3Button from './Button.vue';
import V3ButtonGroup from './ButtonGroup.vue';

/**
 * 全局组件列表
 */
const globalComponentList = [
  {
    name: 'v3-button',
    component: V3Button,
  },
  {
    name: "v3-button-group",
    component: V3ButtonGroup,
  },
];


const install = function(app: App) {
  globalComponentList.forEach((v) => {
    app.component(v.name, v.component);
  });
}

export default install;