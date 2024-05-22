import {
  map_exports
} from "./chunk-LWSX2ERG.js";
import {
  createVNode,
  init_vue_runtime_esm_bundler
} from "./chunk-DXYVEJXO.js";
import "./chunk-NIBQISYW.js";

// node_modules/.pnpm/@icon-park+vue-next@1.4.2_vue@3.4.27_typescript@5.0.4_/node_modules/@icon-park/vue-next/es/all.js
init_vue_runtime_esm_bundler();
function toPascalCase(val) {
  return val.replace(/(^\w|-\w)/g, function(c) {
    return c.slice(-1).toUpperCase();
  });
}
var IconParkOptions = {
  name: "icon-park",
  props: ["size", "strokeWidth", "strokeLinecap", "strokeLinejoin", "theme", "fill", "spin", "type"],
  setup: function setup(props) {
    var type = toPascalCase(props.type);
    var theme = props.theme, size = props.size, fill = props.fill, strokeLinecap = props.strokeLinecap, strokeLinejoin = props.strokeLinejoin, strokeWidth = props.strokeWidth, spin = props.spin;
    if (!(type in map_exports)) {
      throw new Error("".concat(type, " is not a valid icon type name"));
    }
    return function() {
      return createVNode(map_exports[type], {
        theme,
        size,
        fill,
        strokeLinecap,
        strokeLinejoin,
        strokeWidth,
        spin
      });
    };
  }
};
var IconPark = IconParkOptions;
function install(Vue, prefix) {
  Object.values(map_exports).forEach(function(icon) {
    Vue.component(prefix ? prefix + "-" + icon.name.slice(5) : icon.name, icon);
  });
}
export {
  IconPark,
  install
};
//# sourceMappingURL=@icon-park_vue-next_es_all.js.map
