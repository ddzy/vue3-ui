import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase
} from "./chunk-5DV6E5T6.js";
import {
  toValue
} from "./chunk-4EFT3AVL.js";
import "./chunk-K3AUCUQB.js";
import {
  computed,
  ref
} from "./chunk-SXVXR5VZ.js";
import "./chunk-CEQRFMJQ.js";

// node_modules/.pnpm/@vueuse+integrations@10.9.0_change-case@4.1.2_focus-trap@7.5.4_nprogress@0.2.0_vue@3.4.27_typescript@5.0.4_/node_modules/@vueuse/integrations/useChangeCase.mjs
var changeCase = Object.freeze({
  __proto__: null,
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase
});
function useChangeCase(input, type, options) {
  if (typeof input === "function")
    return computed(() => changeCase[type](toValue(input), options));
  const text = ref(input);
  return computed({
    get() {
      return changeCase[type](text.value, options);
    },
    set(value) {
      text.value = value;
    }
  });
}
export {
  useChangeCase
};
//# sourceMappingURL=@vueuse_integrations_useChangeCase.js.map
