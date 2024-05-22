import {
  require_map
} from "./chunk-O3YGN4CD.js";
import {
  init_vue_runtime_esm_bundler,
  vue_runtime_esm_bundler_exports
} from "./chunk-DXYVEJXO.js";
import {
  __commonJS,
  __toCommonJS
} from "./chunk-NIBQISYW.js";

// node_modules/.pnpm/@icon-park+vue-next@1.4.2_vue@3.4.27_typescript@5.0.4_/node_modules/@icon-park/vue-next/lib/all.js
var require_all = __commonJS({
  "node_modules/.pnpm/@icon-park+vue-next@1.4.2_vue@3.4.27_typescript@5.0.4_/node_modules/@icon-park/vue-next/lib/all.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.IconPark = void 0;
    exports.install = install;
    var _vue = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var IconMap = _interopRequireWildcard(require_map());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
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
        if (!(type in IconMap)) {
          throw new Error("".concat(type, " is not a valid icon type name"));
        }
        return function() {
          return (0, _vue.createVNode)(IconMap[type], {
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
    exports.IconPark = IconPark;
    function install(Vue, prefix) {
      Object.values(IconMap).forEach(function(icon) {
        Vue.component(prefix ? prefix + "-" + icon.name.slice(5) : icon.name, icon);
      });
    }
  }
});
export default require_all();
//# sourceMappingURL=@icon-park_vue-next_lib_all.js.map
