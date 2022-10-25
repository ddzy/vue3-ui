var s=Object.defineProperty,t=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,n=Object.prototype.propertyIsEnumerable,l=(t,a,n)=>a in t?s(t,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[a]=n;import{d as p,e,Q as r,D as c,c as o,R as d}from"./vendor.30a8db60.js";const h=p({components:{},setup(s){const p=[],c=e({});return((s,p)=>{for(var e in p||(p={}))t.call(p,e)&&l(s,e,p[e]);if(a)for(var e of a(p))n.call(p,e)&&l(s,e,p[e]);return s})({toggleCode:s=>{const t="vdpv_"+s;0===c[t+"Height"]?c[t+"Height"]=(p[s].value?p[s].value.offsetHeight:0)||0:c[t+"Height"]=0}},r(c))}});h.$vd={matter:{},toc:[{content:"数字输入框（InputNumber）",anchor:"数字输入框inputnumber",level:2},{content:"基本的计数器",anchor:"基本的计数器",level:3},{content:"限制步长和最大值",anchor:"限制步长和最大值",level:3},{content:"可调整控制按钮组的位置",anchor:"可调整控制按钮组的位置",level:3},{content:"API",anchor:"api",level:3},{content:"InputNumber 参数",anchor:"inputnumber-参数",level:4},{content:"InputNumber 事件",anchor:"inputnumber-事件",level:4}]};const u=h,i={class:"vuedoc custom-markdown-container "},j=d('<h2 id="数字输入框inputnumber" data-source-line="1"><a class="markdownIt-Anchor" href="#数字输入框inputnumber">#</a> 数字输入框（InputNumber）</h2><h3 id="基本的计数器" data-source-line="3"><a class="markdownIt-Anchor" href="#基本的计数器">#</a> 基本的计数器</h3><pre style="display:none;"></pre><pre class="hljs vuedoc__hljs language-vue hljs--one-light"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">v3-input-number</span>\n\t\t<span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;state.inputValue&quot;</span>\n    <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;max-width: 250px;&quot;</span>\n    <span class="hljs-attr">:controlsPosition</span>=<span class="hljs-string">&quot;&#39;both&#39;&quot;</span>\n    <span class="hljs-attr">:stepStrictly</span>=<span class="hljs-string">&quot;true&quot;</span>\n    <span class="hljs-attr">:precision</span>=<span class="hljs-string">&quot;0&quot;</span>\n\t&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">v3-input-number</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;ts&quot;</span>&gt;</span></span><span class="typescript">\n<span class="hljs-keyword">import</span> { defineComponent, reactive } <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;vue&#39;</span>;\n\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> defineComponent({\n  <span class="hljs-function"><span class="hljs-title">setup</span>(<span class="hljs-params"></span>)</span> {\n\t\t<span class="hljs-keyword">const</span> state = reactive({\n\t\t\t<span class="hljs-attr">inputValue</span>: <span class="hljs-number">0</span>,\n\t\t});\n\n\t\t<span class="hljs-keyword">return</span> {\n\t\t\tstate,\n\t\t};\n\t},\n});\n</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>\n</span></code></pre><h3 id="限制步长和最大值" data-source-line="32"><a class="markdownIt-Anchor" href="#限制步长和最大值">#</a> 限制步长和最大值</h3><pre style="display:none;"></pre><pre class="hljs vuedoc__hljs language-vue hljs--one-light"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">v3-input-number</span>\n    <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;state.inputValue&quot;</span>\n    <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;max-width: 250px;&quot;</span>\n    <span class="hljs-attr">:controlsPosition</span>=<span class="hljs-string">&quot;&#39;both&#39;&quot;</span>\n    <span class="hljs-attr">:stepStrictly</span>=<span class="hljs-string">&quot;true&quot;</span>\n    <span class="hljs-attr">:precision</span>=<span class="hljs-string">&quot;0&quot;</span>\n    <span class="hljs-attr">:step</span>=<span class="hljs-string">&quot;2&quot;</span>\n    <span class="hljs-attr">:min</span>=<span class="hljs-string">&quot;0&quot;</span>\n    <span class="hljs-attr">:max</span>=<span class="hljs-string">&quot;20&quot;</span>\n\t&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">v3-input-number</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;ts&quot;</span>&gt;</span></span><span class="typescript">\n<span class="hljs-keyword">import</span> { defineComponent, reactive } <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;vue&#39;</span>;\n\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> defineComponent({\n  <span class="hljs-function"><span class="hljs-title">setup</span>(<span class="hljs-params"></span>)</span> {\n\t\t<span class="hljs-keyword">const</span> state = reactive({\n\t\t\t<span class="hljs-attr">inputValue</span>: <span class="hljs-number">0</span>,\n\t\t});\n\n\t\t<span class="hljs-keyword">return</span> {\n\t\t\tstate,\n\t\t};\n\t},\n});\n</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>\n</span></code></pre><h3 id="可调整控制按钮组的位置" data-source-line="64"><a class="markdownIt-Anchor" href="#可调整控制按钮组的位置">#</a> 可调整控制按钮组的位置</h3><pre style="display:none;"></pre><pre class="hljs vuedoc__hljs language-vue hljs--one-light"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">v3-input-number</span>\n    <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;state.inputValue1&quot;</span>\n    <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;max-width: 250px;&quot;</span>\n    <span class="hljs-attr">:controlsPosition</span>=<span class="hljs-string">&quot;&#39;both&#39;&quot;</span>\n\t&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">v3-input-number</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">v3-input-number</span>\n    <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;state.inputValue2&quot;</span>\n    <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;max-width: 250px; margin-top: 20px;&quot;</span>\n    <span class="hljs-attr">:controlsPosition</span>=<span class="hljs-string">&quot;&#39;left&#39;&quot;</span>\n\t&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">v3-input-number</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">v3-input-number</span>\n    <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;state.inputValue3&quot;</span>\n    <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;max-width: 250px; margin-top: 20px;&quot;</span>\n    <span class="hljs-attr">:controlsPosition</span>=<span class="hljs-string">&quot;&#39;right&#39;&quot;</span>\n\t&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">v3-input-number</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;ts&quot;</span>&gt;</span></span><span class="typescript">\n<span class="hljs-keyword">import</span> { defineComponent, reactive } <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;vue&#39;</span>;\n\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> defineComponent({\n  <span class="hljs-function"><span class="hljs-title">setup</span>(<span class="hljs-params"></span>)</span> {\n\t\t<span class="hljs-keyword">const</span> state = reactive({\n\t\t\t<span class="hljs-attr">inputValue1</span>: <span class="hljs-number">0</span>,\n      <span class="hljs-attr">inputValue2</span>: <span class="hljs-number">0</span>,\n      <span class="hljs-attr">inputValue3</span>: <span class="hljs-number">0</span>,\n\t\t});\n\n\t\t<span class="hljs-keyword">return</span> {\n\t\t\tstate,\n\t\t};\n\t},\n});\n</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>\n</span></code></pre><h3 id="api" data-source-line="103"><a class="markdownIt-Anchor" href="#api">#</a> API</h3><h4 id="inputnumber-参数" data-source-line="105"><a class="markdownIt-Anchor" href="#inputnumber-参数">#</a> InputNumber 参数</h4><table data-source-line="107"><thead><tr><th>参数名</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>min</td><td>限制输入的最小值</td><td>number / undefined</td><td></td><td></td></tr><tr><td>max</td><td>限制输入的最大值</td><td>number / undefined</td><td></td><td></td></tr><tr><td>step</td><td>步数</td><td>number</td><td></td><td>1</td></tr><tr><td>stepStrictly</td><td>输入值是否只能为 step 的倍数</td><td>boolean</td><td></td><td>false</td></tr><tr><td>precision</td><td>保留的小数位数</td><td>number</td><td></td><td>0</td></tr><tr><td>disabled</td><td>是否禁用</td><td>boolean</td><td></td><td>false</td></tr><tr><td>readonly</td><td>是否只读</td><td>boolean</td><td></td><td>false</td></tr><tr><td>controlsPosition</td><td>控制栏的位置</td><td>string</td><td>both / right / left</td><td>both</td></tr><tr><td>placeholder</td><td>同原生 input 标签的 placeholder 属性</td><td>string</td><td></td><td>请输入内容</td></tr><tr><td>size</td><td>输入框的尺寸</td><td>string</td><td>small / medium / large</td><td>medium</td></tr><tr><td>modelValue</td><td>v-model 绑定的值</td><td>string</td><td></td><td></td></tr></tbody></table><h4 id="inputnumber-事件" data-source-line="121"><a class="markdownIt-Anchor" href="#inputnumber-事件">#</a> InputNumber 事件</h4><table data-source-line="123"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>focus</td><td>输入框获得焦点时触发</td><td>(e: Event)</td></tr><tr><td>blur</td><td>输入框失去焦点时触发</td><td>(e: Event)</td></tr></tbody></table>',15);u.render=function(s,t,a,n,l,p){return c(),o("div",i,[j])};export default u;
