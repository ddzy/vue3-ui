import {
  require_map,
  require_runtime
} from "./chunk-O3YGN4CD.js";
import "./chunk-DXYVEJXO.js";
import {
  __commonJS
} from "./chunk-NIBQISYW.js";

// node_modules/.pnpm/@icon-park+vue-next@1.4.2_vue@3.4.27_typescript@5.0.4_/node_modules/@icon-park/vue-next/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/@icon-park+vue-next@1.4.2_vue@3.4.27_typescript@5.0.4_/node_modules/@icon-park/vue-next/lib/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _exportNames = {
      IconProvider: true,
      DEFAULT_ICON_CONFIGS: true
    };
    Object.defineProperty(exports, "DEFAULT_ICON_CONFIGS", {
      enumerable: true,
      get: function() {
        return _runtime.DEFAULT_ICON_CONFIGS;
      }
    });
    Object.defineProperty(exports, "IconProvider", {
      enumerable: true,
      get: function() {
        return _runtime.IconProvider;
      }
    });
    var _map = require_map();
    Object.keys(_map).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === _map[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _map[key];
        }
      });
    });
    var _runtime = require_runtime();
  }
});
export default require_lib();
//# sourceMappingURL=@icon-park_vue-next_lib_index.js.map
