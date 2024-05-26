import {
  init_vue_runtime_esm_bundler,
  vue_runtime_esm_bundler_exports
} from "./chunk-SXVXR5VZ.js";
import {
  __commonJS,
  __toCommonJS
} from "./chunk-CEQRFMJQ.js";

// node_modules/.pnpm/@icon-park+vue-next@1.4.2_vue@3.4.27_typescript@5.0.4_/node_modules/@icon-park/vue-next/lib/runtime/index.js
var require_runtime = __commonJS({
  "node_modules/.pnpm/@icon-park+vue-next@1.4.2_vue@3.4.27_typescript@5.0.4_/node_modules/@icon-park/vue-next/lib/runtime/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DEFAULT_ICON_CONFIGS = void 0;
    exports.IconConverter = IconConverter;
    exports.IconProvider = void 0;
    exports.IconWrapper = IconWrapper;
    var _vue = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var DEFAULT_ICON_CONFIGS = {
      size: "1em",
      strokeWidth: 4,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      rtl: false,
      theme: "outline",
      colors: {
        outline: {
          fill: "#333",
          background: "transparent"
        },
        filled: {
          fill: "#333",
          background: "#FFF"
        },
        twoTone: {
          fill: "#333",
          twoTone: "#2F88FF"
        },
        multiColor: {
          outStrokeColor: "#333",
          outFillColor: "#2F88FF",
          innerStrokeColor: "#FFF",
          innerFillColor: "#43CCF8"
        }
      },
      prefix: "i"
    };
    exports.DEFAULT_ICON_CONFIGS = DEFAULT_ICON_CONFIGS;
    function guid() {
      return "icon-" + ((1 + Math.random()) * 4294967296 | 0).toString(16).substring(1);
    }
    function IconConverter(id, icon, config) {
      var fill = typeof icon.fill === "string" ? [icon.fill] : icon.fill || [];
      var colors = [];
      var theme = icon.theme || config.theme;
      switch (theme) {
        case "outline":
          colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
          colors.push("none");
          colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
          colors.push("none");
          break;
        case "filled":
          colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
          colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
          colors.push("#FFF");
          colors.push("#FFF");
          break;
        case "two-tone":
          colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
          colors.push(typeof fill[1] === "string" ? fill[1] : config.colors.twoTone.twoTone);
          colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
          colors.push(typeof fill[1] === "string" ? fill[1] : config.colors.twoTone.twoTone);
          break;
        case "multi-color":
          colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
          colors.push(typeof fill[1] === "string" ? fill[1] : config.colors.multiColor.outFillColor);
          colors.push(typeof fill[2] === "string" ? fill[2] : config.colors.multiColor.innerStrokeColor);
          colors.push(typeof fill[3] === "string" ? fill[3] : config.colors.multiColor.innerFillColor);
          break;
      }
      return {
        size: icon.size || config.size,
        strokeWidth: icon.strokeWidth || config.strokeWidth,
        strokeLinecap: icon.strokeLinecap || config.strokeLinecap,
        strokeLinejoin: icon.strokeLinejoin || config.strokeLinejoin,
        colors,
        id
      };
    }
    var IconContext = Symbol("icon-context");
    var IconProvider = function IconProvider2(config) {
      (0, _vue.provide)(IconContext, config);
    };
    exports.IconProvider = IconProvider;
    function IconWrapper(name, rtl, render) {
      var options = {
        name: "icon-" + name,
        props: ["size", "strokeWidth", "strokeLinecap", "strokeLinejoin", "theme", "fill", "spin"],
        setup: function setup(props) {
          var id = guid();
          var ICON_CONFIGS = (0, _vue.inject)(IconContext, DEFAULT_ICON_CONFIGS);
          return function() {
            var size = props.size, strokeWidth = props.strokeWidth, strokeLinecap = props.strokeLinecap, strokeLinejoin = props.strokeLinejoin, theme = props.theme, fill = props.fill, spin = props.spin;
            var svgProps = IconConverter(id, {
              size,
              strokeWidth,
              strokeLinecap,
              strokeLinejoin,
              theme,
              fill
            }, ICON_CONFIGS);
            var cls = [ICON_CONFIGS.prefix + "-icon"];
            cls.push(ICON_CONFIGS.prefix + "-icon-" + name);
            if (rtl && ICON_CONFIGS.rtl) {
              cls.push(ICON_CONFIGS.prefix + "-icon-rtl");
            }
            if (spin) {
              cls.push(ICON_CONFIGS.prefix + "-icon-spin");
            }
            return (0, _vue.createVNode)("span", {
              "class": cls.join(" ")
            }, [render(svgProps)]);
          };
        }
      };
      return options;
    }
  }
});

// node_modules/.pnpm/@icon-park+vue-next@1.4.2_vue@3.4.27_typescript@5.0.4_/node_modules/@icon-park/vue-next/lib/icons/CloseOne.js
var require_CloseOne = __commonJS({
  "node_modules/.pnpm/@icon-park+vue-next@1.4.2_vue@3.4.27_typescript@5.0.4_/node_modules/@icon-park/vue-next/lib/icons/CloseOne.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _vue = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _runtime = require_runtime();
    var _default = (0, _runtime.IconWrapper)("close-one", false, function(props) {
      return (0, _vue.createVNode)("svg", {
        "width": props.size,
        "height": props.size,
        "viewBox": "0 0 48 48",
        "fill": "none"
      }, [(0, _vue.createVNode)("path", {
        "d": "M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",
        "fill": props.colors[1],
        "stroke": props.colors[0],
        "stroke-width": props.strokeWidth,
        "stroke-linejoin": props.strokeLinejoin
      }, null), (0, _vue.createVNode)("path", {
        "d": "M29.6567 18.3432L18.343 29.6569",
        "stroke": props.colors[2],
        "stroke-width": props.strokeWidth,
        "stroke-linecap": props.strokeLinecap,
        "stroke-linejoin": props.strokeLinejoin
      }, null), (0, _vue.createVNode)("path", {
        "d": "M18.3433 18.3432L29.657 29.6569",
        "stroke": props.colors[2],
        "stroke-width": props.strokeWidth,
        "stroke-linecap": props.strokeLinecap,
        "stroke-linejoin": props.strokeLinejoin
      }, null)]);
    });
    exports.default = _default;
  }
});

export {
  require_runtime,
  require_CloseOne
};
//# sourceMappingURL=chunk-2EUE2HJX.js.map
