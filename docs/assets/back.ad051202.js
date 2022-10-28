var s=Object.defineProperty,t=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,l=Object.prototype.propertyIsEnumerable,n=(t,a,l)=>a in t?s(t,a,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[a]=l,e=(s,e)=>{for(var c in e||(e={}))t.call(e,c)&&n(s,c,e[c]);if(a)for(var c of a(e))l.call(e,c)&&n(s,c,e[c]);return s};import{d as c,e as p,f as h,H as r,D as o,c as j,b as d,F as i,q as g,j as v,l as u,Q as m,R as f,I as k}from"./vendor.30a8db60.js";var b=c({setup:()=>({state:p({}),targetRef:h(null)})});const y={style:{position:"relative",width:"500px"}},w={ref:"targetRef",style:{overflow:"auto",height:"300px"}};b.render=function(s,t,a,l,n,e){const c=r("v3-back");return o(),j("div",y,[d("div",w,[d("ul",null,[(o(),j(i,null,g(200,(s=>d("li",null,v(s),1))),64))])],512),d(c,{target:s.targetRef},null,8,["target"])])};var x=c({setup:()=>({state:p({}),targetRef1:h(null),targetRef2:h(null)})});const R={style:{position:"relative"}},_={ref:"targetRef1",style:{overflow:"auto",height:"300px"}},B={style:{position:"relative"}},I={ref:"targetRef2",style:{overflow:"auto",height:"300px"}};x.render=function(s,t,a,l,n,e){const c=r("v3-back"),p=r("v3-col"),h=r("v3-row");return o(),j(h,null,{default:u((()=>[d(p,{span:6},{default:u((()=>[d("div",R,[d("div",_,[d("ul",null,[(o(),j(i,null,g(200,(s=>d("li",null,v(s),1))),64))])],512),d(c,{disableToTop:"",target:s.targetRef1},null,8,["target"])])])),_:1}),d(p,{span:6},{default:u((()=>[d("div",B,[d("div",I,[d("ul",null,[(o(),j(i,null,g(200,(s=>d("li",null,v(s),1))),64))])],512),d(c,{disableToBottom:"",target:s.targetRef2},null,8,["target"])])])),_:1})])),_:1})};var A=c({setup:()=>({state:p({}),targetRef:h(null)})});const T={style:{position:"relative",width:"500px"}},H={ref:"targetRef",style:{overflow:"auto",height:"300px"}},C=d("div",{style:{"text-align":"center",width:"30px",height:"30px","background-color":"#daa520",color:"#fff","border-radius":"50%","line-height":"30px",cursor:"pointer"}},"↑",-1),O=d("div",{style:{"text-align":"center",width:"30px",height:"30px","background-color":"#daa520",color:"#fff","border-radius":"50%","line-height":"30px",cursor:"pointer"}},"↓",-1);A.render=function(s,t,a,l,n,e){const c=r("v3-back");return o(),j("div",T,[d("div",H,[d("ul",null,[(o(),j(i,null,g(200,(s=>d("li",null,v(s),1))),64))])],512),d(c,{target:s.targetRef},{top:u((()=>[C])),bottom:u((()=>[O])),_:1},8,["target"])])};const P=c({components:{vdpv_0:b,vdpv_1:x,vdpv_2:A},setup(s){const t=h(),a=h(),l=h(),n=[t,a,l],c=p({vdpv_0Height:0,vdpv_1Height:0,vdpv_2Height:0});return e(e({toggleCode:s=>{const t="vdpv_"+s;0===c[t+"Height"]?c[t+"Height"]=(n[s].value?n[s].value.offsetHeight:0)||0:c[t+"Height"]=0}},m(c)),{vdpv_0Ref:t,vdpv_1Ref:a,vdpv_2Ref:l})}});P.$vd={matter:{},toc:[{content:"Back（返回）",anchor:"back返回",level:2},{content:"基本用法",anchor:"基本用法",level:3},{content:"控制是否显示去顶部/去底部按钮",anchor:"控制是否显示去顶部去底部按钮",level:3},{content:"自定义去顶部/去底部按钮",anchor:"自定义去顶部去底部按钮",level:3},{content:"API",anchor:"api",level:3},{content:"Back参数",anchor:"back参数",level:4},{content:"Back事件",anchor:"back事件",level:4},{content:"Back插槽",anchor:"back插槽",level:4}]};const D=P,E={class:"vuedoc custom-markdown-container "},q=f('<h2 id="back返回" data-source-line="1"><a class="markdownIt-Anchor" href="#back返回">#</a> Back（返回）</h2><h3 id="基本用法" data-source-line="3"><a class="markdownIt-Anchor" href="#基本用法">#</a> 基本用法</h3><pre style="display:none;"></pre>',3),F={class:"vuedoc-demo "},L=d("pre",{class:"hljs language-vue hljs--one-light"},[d("code",null,[d("span",{class:"xml"},[d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"template"),k(">")]),k("\n\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"div"),k("\n\t\t"),d("span",{class:"hljs-attr"},"style"),k("="),d("span",{class:"hljs-string"},'"position: relative; width: 500px; "'),k("\n\t>")]),k("\n\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"div"),k("\n\t\t\t"),d("span",{class:"hljs-attr"},"ref"),k("="),d("span",{class:"hljs-string"},'"targetRef"'),k("\n \t\t\t"),d("span",{class:"hljs-attr"},"style"),k("="),d("span",{class:"hljs-string"},'"overflow: auto; height: 300px;"'),k("\n\t\t>")]),k("\n\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"ul"),k(">")]),k("\n\t\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"li"),k(),d("span",{class:"hljs-attr"},"v-for"),k("="),d("span",{class:"hljs-string"},'"v in 200"'),k(">")]),k("{{ v }}"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"li"),k(">")]),k("\n\t\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"ul"),k(">")]),k("\n\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"div"),k(">")]),k("\n\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"v3-back"),k("\n\t\t\t"),d("span",{class:"hljs-attr"},":target"),k("="),d("span",{class:"hljs-string"},'"targetRef"'),k("\n\t\t>")]),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"v3-back"),k(">")]),k("\n\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"div"),k(">")]),k("\n"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"template"),k(">")]),k("\n"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"script"),k(),d("span",{class:"hljs-attr"},"lang"),k("="),d("span",{class:"hljs-string"},'"ts"'),k(">")])]),d("span",{class:"typescript"},[k("\n"),d("span",{class:"hljs-keyword"},"import"),k(" { defineComponent, reactive, ref } "),d("span",{class:"hljs-keyword"},"from"),k(),d("span",{class:"hljs-string"},"'vue'"),k(";\n\n"),d("span",{class:"hljs-keyword"},"export"),k(),d("span",{class:"hljs-keyword"},"default"),k(" defineComponent({\n\t"),d("span",{class:"hljs-function"},[d("span",{class:"hljs-title"},"setup"),k("("),d("span",{class:"hljs-params"}),k(")")]),k(" {\n\t\t"),d("span",{class:"hljs-keyword"},"const"),k(" state = reactive({\n\t\t});\n\t\t"),d("span",{class:"hljs-keyword"},"const"),k(" targetRef = ref("),d("span",{class:"hljs-literal"},"null"),k(");\n\n\t\t"),d("span",{class:"hljs-keyword"},"return"),k(" {\n\t\t\tstate,\n\t\t\ttargetRef,\n\t\t};\n\t},\n});\n")]),d("span",{class:"xml"},[d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"script"),k(">")]),k("\n")])])],-1),M=d("h3",{id:"控制是否显示去顶部去底部按钮","data-source-line":"41"},[d("a",{class:"markdownIt-Anchor",href:"#控制是否显示去顶部去底部按钮"},"#"),k(" 控制是否显示去顶部/去底部按钮")],-1),Q=d("pre",{style:{display:"none"}},null,-1),S={class:"vuedoc-demo "},V=d("pre",{class:"hljs language-vue hljs--one-light"},[d("code",null,[d("span",{class:"xml"},[d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"template"),k(">")]),k("\n\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"v3-row"),k(">")]),k("\n\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"v3-col"),k(),d("span",{class:"hljs-attr"},":span"),k("="),d("span",{class:"hljs-string"},'"6"'),k(">")]),k("\n\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"div"),k("\n\t\t\t\t"),d("span",{class:"hljs-attr"},"style"),k("="),d("span",{class:"hljs-string"},'"position: relative;"'),k("\n\t\t\t>")]),k("\n\t\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"div"),k("\n\t\t\t\t\t"),d("span",{class:"hljs-attr"},"ref"),k("="),d("span",{class:"hljs-string"},'"targetRef1"'),k("\n\t\t\t\t\t"),d("span",{class:"hljs-attr"},"style"),k("="),d("span",{class:"hljs-string"},'"overflow: auto; height: 300px;"'),k("\n\t\t\t\t>")]),k("\n\t\t\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"ul"),k(">")]),k("\n\t\t\t\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"li"),k(),d("span",{class:"hljs-attr"},"v-for"),k("="),d("span",{class:"hljs-string"},'"v in 200"'),k(">")]),k("{{ v }}"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"li"),k(">")]),k("\n\t\t\t\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"ul"),k(">")]),k("\n\t\t\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"div"),k(">")]),k("\n\t\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"v3-back"),k("\n\t\t\t\t\t"),d("span",{class:"hljs-attr"},"disableToTop"),k("\n\t\t\t\t\t"),d("span",{class:"hljs-attr"},":target"),k("="),d("span",{class:"hljs-string"},'"targetRef1"'),k("\n\t\t\t\t>")]),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"v3-back"),k(">")]),k("\n\t\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"div"),k(">")]),k("\n\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"v3-col"),k(">")]),k("\n\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"v3-col"),k(),d("span",{class:"hljs-attr"},":span"),k("="),d("span",{class:"hljs-string"},'"6"'),k(">")]),k("\n\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"div"),k("\n\t\t\t\t"),d("span",{class:"hljs-attr"},"style"),k("="),d("span",{class:"hljs-string"},'"position: relative;"'),k("\n\t\t\t>")]),k("\n\t\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"div"),k("\n\t\t\t\t\t"),d("span",{class:"hljs-attr"},"ref"),k("="),d("span",{class:"hljs-string"},'"targetRef2"'),k("\n\t\t\t\t\t"),d("span",{class:"hljs-attr"},"style"),k("="),d("span",{class:"hljs-string"},'"overflow: auto; height: 300px;"'),k("\n\t\t\t\t>")]),k("\n\t\t\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"ul"),k(">")]),k("\n\t\t\t\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"li"),k(),d("span",{class:"hljs-attr"},"v-for"),k("="),d("span",{class:"hljs-string"},'"v in 200"'),k(">")]),k("{{ v }}"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"li"),k(">")]),k("\n\t\t\t\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"ul"),k(">")]),k("\n\t\t\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"div"),k(">")]),k("\n\t\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"v3-back"),k("\n\t\t\t\t\t"),d("span",{class:"hljs-attr"},"disableToBottom"),k("\n\t\t\t\t\t"),d("span",{class:"hljs-attr"},":target"),k("="),d("span",{class:"hljs-string"},'"targetRef2"'),k("\n\t\t\t\t>")]),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"v3-back"),k(">")]),k("\n\t\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"div"),k(">")]),k("\n\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"v3-col"),k(">")]),k("\n\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"v3-row"),k(">")]),k("\n"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"template"),k(">")]),k("\n"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"script"),k(),d("span",{class:"hljs-attr"},"lang"),k("="),d("span",{class:"hljs-string"},'"ts"'),k(">")])]),d("span",{class:"typescript"},[k("\n"),d("span",{class:"hljs-keyword"},"import"),k(" { defineComponent, reactive, ref } "),d("span",{class:"hljs-keyword"},"from"),k(),d("span",{class:"hljs-string"},"'vue'"),k(";\n\n"),d("span",{class:"hljs-keyword"},"export"),k(),d("span",{class:"hljs-keyword"},"default"),k(" defineComponent({\n\t"),d("span",{class:"hljs-function"},[d("span",{class:"hljs-title"},"setup"),k("("),d("span",{class:"hljs-params"}),k(")")]),k(" {\n\t\t"),d("span",{class:"hljs-keyword"},"const"),k(" state = reactive({\n\t\t});\n\t\t"),d("span",{class:"hljs-keyword"},"const"),k(" targetRef1 = ref("),d("span",{class:"hljs-literal"},"null"),k(");\n\t\t"),d("span",{class:"hljs-keyword"},"const"),k(" targetRef2 = ref("),d("span",{class:"hljs-literal"},"null"),k(");\n\n\t\t"),d("span",{class:"hljs-keyword"},"return"),k(" {\n\t\t\tstate,\n\t\t\ttargetRef1,\n\t\t\ttargetRef2,\n\t\t};\n\t},\n});\n")]),d("span",{class:"xml"},[d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"script"),k(">")]),k("\n")])])],-1),W=d("h3",{id:"自定义去顶部去底部按钮","data-source-line":"104"},[d("a",{class:"markdownIt-Anchor",href:"#自定义去顶部去底部按钮"},"#"),k(" 自定义去顶部/去底部按钮")],-1),$=d("pre",{style:{display:"none"}},null,-1),z={class:"vuedoc-demo "},G=d("pre",{class:"hljs language-vue hljs--one-light"},[d("code",null,[d("span",{class:"xml"},[d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"template"),k(">")]),k("\n\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"div"),k("\n\t\t"),d("span",{class:"hljs-attr"},"style"),k("="),d("span",{class:"hljs-string"},'"position: relative; width: 500px; "'),k("\n\t>")]),k("\n\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"div"),k("\n\t\t\t"),d("span",{class:"hljs-attr"},"ref"),k("="),d("span",{class:"hljs-string"},'"targetRef"'),k("\n \t\t\t"),d("span",{class:"hljs-attr"},"style"),k("="),d("span",{class:"hljs-string"},'"overflow: auto; height: 300px;"'),k("\n\t\t>")]),k("\n\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"ul"),k(">")]),k("\n\t\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"li"),k(),d("span",{class:"hljs-attr"},"v-for"),k("="),d("span",{class:"hljs-string"},'"v in 200"'),k(">")]),k("{{ v }}"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"li"),k(">")]),k("\n\t\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"ul"),k(">")]),k("\n\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"div"),k(">")]),k("\n\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"v3-back"),k("\n\t\t\t"),d("span",{class:"hljs-attr"},":target"),k("="),d("span",{class:"hljs-string"},'"targetRef"'),k("\n\t\t>")]),k("\n\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"template"),k(" #"),d("span",{class:"hljs-attr"},"top"),k(">")]),k("\n\t\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"div"),k("\n\t\t\t\t\t"),d("span",{class:"hljs-attr"},"style"),k("="),d("span",{class:"hljs-string"},'"text-align: center; width: 30px; height: 30px; background-color: #daa520; color: #fff; border-radius: 50%; line-height: 30px; cursor: pointer;"'),k("\n\t\t\t\t>")]),k("↑"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"div"),k(">")]),k("\n\t\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"template"),k(">")]),k("\n\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"template"),k(" #"),d("span",{class:"hljs-attr"},"bottom"),k(">")]),k("\n\t\t\t\t"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"div"),k("\n\t\t\t\t\t"),d("span",{class:"hljs-attr"},"style"),k("="),d("span",{class:"hljs-string"},'"text-align: center; width: 30px; height: 30px; background-color: #daa520; color: #fff; border-radius: 50%; line-height: 30px; cursor: pointer;"'),k("\n\t\t\t\t>")]),k("↓"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"div"),k(">")]),k("\n\t\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"template"),k(">")]),k("\n\t\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"v3-back"),k(">")]),k("\n\t"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"div"),k(">")]),k("\n"),d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"template"),k(">")]),k("\n"),d("span",{class:"hljs-tag"},[k("<"),d("span",{class:"hljs-name"},"script"),k(),d("span",{class:"hljs-attr"},"lang"),k("="),d("span",{class:"hljs-string"},'"ts"'),k(">")])]),d("span",{class:"typescript"},[k("\n"),d("span",{class:"hljs-keyword"},"import"),k(" { defineComponent, reactive, ref } "),d("span",{class:"hljs-keyword"},"from"),k(),d("span",{class:"hljs-string"},"'vue'"),k(";\n\n"),d("span",{class:"hljs-keyword"},"export"),k(),d("span",{class:"hljs-keyword"},"default"),k(" defineComponent({\n\t"),d("span",{class:"hljs-function"},[d("span",{class:"hljs-title"},"setup"),k("("),d("span",{class:"hljs-params"}),k(")")]),k(" {\n\t\t"),d("span",{class:"hljs-keyword"},"const"),k(" state = reactive({\n\t\t});\n\t\t"),d("span",{class:"hljs-keyword"},"const"),k(" targetRef = ref("),d("span",{class:"hljs-literal"},"null"),k(");\n\n\t\t"),d("span",{class:"hljs-keyword"},"return"),k(" {\n\t\t\tstate,\n\t\t\ttargetRef,\n\t\t};\n\t},\n});\n")]),d("span",{class:"xml"},[d("span",{class:"hljs-tag"},[k("</"),d("span",{class:"hljs-name"},"script"),k(">")]),k("\n")])])],-1),J=f('<h3 id="api" data-source-line="153"><a class="markdownIt-Anchor" href="#api">#</a> API</h3><h4 id="back参数" data-source-line="155"><a class="markdownIt-Anchor" href="#back参数">#</a> Back参数</h4><table data-source-line="157"><thead><tr><th>参数名</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th><th>是否必填</th></tr></thead><tbody><tr><td>distance</td><td>页面滚动距离超过该值时显示去顶部按钮</td><td>number</td><td></td><td>400</td><td>false</td></tr><tr><td>disableToTop</td><td>是否禁用（即不显示）“去顶部”按钮</td><td>boolean</td><td></td><td>false</td><td>false</td></tr><tr><td>disableToBottom</td><td>是否禁用（即不显示）“去底部”按钮</td><td>boolean</td><td></td><td>false</td><td>false</td></tr><tr><td>target</td><td>滚动容器</td><td>object</td><td>HTMLElement/Window</td><td>window</td><td>false</td></tr></tbody></table><h4 id="back事件" data-source-line="164"><a class="markdownIt-Anchor" href="#back事件">#</a> Back事件</h4><table data-source-line="166"><thead><tr><th>事件名</th><th>说明</th><th>参数</th></tr></thead></table><h4 id="back插槽" data-source-line="169"><a class="markdownIt-Anchor" href="#back插槽">#</a> Back插槽</h4><table data-source-line="171"><thead><tr><th>插槽名</th><th>说明</th><th>子标签</th></tr></thead><tbody><tr><td>default</td><td>默认插槽</td><td>主要内容</td></tr></tbody></table>',7);D.render=function(s,t,a,l,n,e){const c=r("vdpv_0"),p=r("V3DemoBlock"),h=r("vdpv_1"),i=r("vdpv_2");return o(),j("div",E,[q,d("div",F,[d(p,{lang:"vue",theme:"one-light"},{code:u((()=>[L])),default:u((()=>[d(c)])),_:1})]),M,Q,d("div",S,[d(p,{lang:"vue",theme:"one-light"},{code:u((()=>[V])),default:u((()=>[d(h)])),_:1})]),W,$,d("div",z,[d(p,{lang:"vue",theme:"one-light"},{code:u((()=>[G])),default:u((()=>[d(i)])),_:1})]),J])};export default D;