var t=Object.defineProperty,s=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,e=Object.prototype.propertyIsEnumerable,n=(s,a,e)=>a in s?t(s,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[a]=e,l=(t,l)=>{for(var r in l||(l={}))s.call(l,r)&&n(t,r,l[r]);if(a)for(var r of a(l))e.call(l,r)&&n(t,r,l[r]);return t};import{d as r,e as d,H as c,D as o,c as i,b as p,l as h,F as u,I as m,f as j,Q as g,R as w}from"./vendor.30a8db60.js";var v=r({setup(){const t=d({showDrawer:!1,drawerLoading:!1});return{state:t,handleConfirm:function(){t.drawerLoading=!0,setTimeout((()=>{t.drawerLoading=!1,t.showDrawer=!1}),3e3)},handleCancel:function(t){t()}}}});const f=m("点我"),b=m(" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto iusto sequi pariatur quaerat numquam, nulla minus recusandae voluptatibus, reprehenderit voluptate quos quisquam at ratione illum ipsa id a ducimus quam? Placeat minus, soluta quas, asperiores consequatur reprehenderit repellendus veritatis aperiam sit debitis error reiciendis quos accusamus et, dicta assumenda nesciunt exercitationem alias praesentium voluptatum? Beatae accusamus sit voluptatum facere assumenda! ");v.render=function(t,s,a,e,n,l){const r=c("v3-button"),d=c("v3-drawer");return o(),i(u,null,[p(r,{type:"primary",onClick:s[1]||(s[1]=s=>t.state.showDrawer=!t.state.showDrawer)},{default:h((()=>[f])),_:1}),p(d,{modelValue:t.state.showDrawer,"onUpdate:modelValue":s[2]||(s[2]=s=>t.state.showDrawer=s),placement:"top",title:"标题",confirmText:"确定",cancelText:"关闭",confirmLoading:t.state.drawerLoading,onConfirm:t.handleConfirm,onCancel:t.handleCancel},{default:h((()=>[b])),_:1},8,["modelValue","confirmLoading","onConfirm","onCancel"])],64)};var y=r({setup:()=>({state:d({showDrawer:!1,placement:"right"})})});const q=m("左"),k=m("下"),C=m("右"),D=m("上"),_=m("打开"),L=m(" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto iusto sequi pariatur quaerat numquam, nulla minus recusandae voluptatibus, reprehenderit voluptate quos quisquam at ratione illum ipsa id a ducimus quam? Placeat minus, soluta quas, asperiores consequatur reprehenderit repellendus veritatis aperiam sit debitis ");y.render=function(t,s,a,e,n,l){const r=c("v3-radio"),d=c("v3-radio-group"),m=c("v3-button"),j=c("v3-drawer");return o(),i(u,null,[p(d,{modelValue:t.state.placement,"onUpdate:modelValue":s[1]||(s[1]=s=>t.state.placement=s)},{default:h((()=>[p(r,{label:"left"},{default:h((()=>[q])),_:1}),p(r,{label:"bottom"},{default:h((()=>[k])),_:1}),p(r,{label:"right"},{default:h((()=>[C])),_:1}),p(r,{label:"top"},{default:h((()=>[D])),_:1})])),_:1},8,["modelValue"]),p(m,{type:"primary",onClick:s[2]||(s[2]=s=>t.state.showDrawer=!t.state.showDrawer)},{default:h((()=>[_])),_:1}),p(j,{modelValue:t.state.showDrawer,"onUpdate:modelValue":s[3]||(s[3]=s=>t.state.showDrawer=s),title:"标题",placement:t.state.placement},{default:h((()=>[L])),_:1},8,["modelValue","placement"])],64)};const x=r({components:{vdpv_0:v,vdpv_1:y},setup(t){const s=j(),a=j(),e=[s,a],n=d({vdpv_0Height:0,vdpv_1Height:0});return l(l({toggleCode:t=>{const s="vdpv_"+t;0===n[s+"Height"]?n[s+"Height"]=(e[t].value?e[t].value.offsetHeight:0)||0:n[s+"Height"]=0}},g(n)),{vdpv_0Ref:s,vdpv_1Ref:a})}});x.$vd={matter:{},toc:[{content:"抽屉（Drawr）",anchor:"抽屉drawr",level:2},{content:"基本用法",anchor:"基本用法",level:3},{content:"不同方向",anchor:"不同方向",level:3},{content:"API",anchor:"api",level:3},{content:"Drawer参数",anchor:"drawer参数",level:4},{content:"Drawer插槽",anchor:"drawer插槽",level:4}]};const A=x,I={class:"vuedoc custom-markdown-container "},V=w('<h2 id="抽屉drawr" data-source-line="1"><a class="markdownIt-Anchor" href="#抽屉drawr">#</a> 抽屉（Drawr）</h2><h3 id="基本用法" data-source-line="3"><a class="markdownIt-Anchor" href="#基本用法">#</a> 基本用法</h3><pre style="display:none;"></pre>',3),P={class:"vuedoc-demo "},T=p("pre",{class:"hljs language-vue hljs--one-light"},[p("code",null,[p("span",{class:"xml"},[p("span",{class:"hljs-tag"},[m("<"),p("span",{class:"hljs-name"},"template"),m(">")]),m("\n\t"),p("span",{class:"hljs-tag"},[m("<"),p("span",{class:"hljs-name"},"v3-button"),m("\n\t\t"),p("span",{class:"hljs-attr"},"type"),m("="),p("span",{class:"hljs-string"},'"primary"'),m("\n\t\t@"),p("span",{class:"hljs-attr"},"click"),m("="),p("span",{class:"hljs-string"},'"state.showDrawer = !state.showDrawer"'),m("\n\t\t>")]),m("点我</v3-button\n\t>\n\t"),p("span",{class:"hljs-tag"},[m("<"),p("span",{class:"hljs-name"},"v3-drawer"),m("\n\t\t"),p("span",{class:"hljs-attr"},"v-model"),m("="),p("span",{class:"hljs-string"},'"state.showDrawer"'),m("\n\t\t"),p("span",{class:"hljs-attr"},"placement"),m("="),p("span",{class:"hljs-string"},'"top"'),m("\n\t\t"),p("span",{class:"hljs-attr"},"title"),m("="),p("span",{class:"hljs-string"},'"标题"'),m("\n\t\t"),p("span",{class:"hljs-attr"},"confirmText"),m("="),p("span",{class:"hljs-string"},'"确定"'),m("\n\t\t"),p("span",{class:"hljs-attr"},"cancelText"),m("="),p("span",{class:"hljs-string"},'"关闭"'),m("\n\t\t"),p("span",{class:"hljs-attr"},":confirmLoading"),m("="),p("span",{class:"hljs-string"},'"state.drawerLoading"'),m("\n\t\t"),p("span",{class:"hljs-attr"},":onConfirm"),m("="),p("span",{class:"hljs-string"},'"handleConfirm"'),m("\n\t\t"),p("span",{class:"hljs-attr"},":onCancel"),m("="),p("span",{class:"hljs-string"},'"handleCancel"'),m("\n\t>")]),m("\n\t\tLorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto\n\t\tiusto sequi pariatur quaerat numquam, nulla minus recusandae\n\t\tvoluptatibus, reprehenderit voluptate quos quisquam at ratione illum\n\t\tipsa id a ducimus quam? Placeat minus, soluta quas, asperiores\n\t\tconsequatur reprehenderit repellendus veritatis aperiam sit debitis\n\t\terror reiciendis quos accusamus et, dicta assumenda nesciunt\n\t\texercitationem alias praesentium voluptatum? Beatae accusamus sit\n\t\tvoluptatum facere assumenda!\n\t"),p("span",{class:"hljs-tag"},[m("</"),p("span",{class:"hljs-name"},"v3-drawer"),m(">")]),m("\n"),p("span",{class:"hljs-tag"},[m("</"),p("span",{class:"hljs-name"},"template"),m(">")]),m("\n"),p("span",{class:"hljs-tag"},[m("<"),p("span",{class:"hljs-name"},"script"),m(),p("span",{class:"hljs-attr"},"lang"),m("="),p("span",{class:"hljs-string"},'"ts"'),m(">")])]),p("span",{class:"typescript"},[m("\n"),p("span",{class:"hljs-keyword"},"import"),m(" { defineComponent, reactive } "),p("span",{class:"hljs-keyword"},"from"),m(),p("span",{class:"hljs-string"},"'vue'"),m(";\n\n"),p("span",{class:"hljs-keyword"},"export"),m(),p("span",{class:"hljs-keyword"},"default"),m(" defineComponent({\n\t"),p("span",{class:"hljs-function"},[p("span",{class:"hljs-title"},"setup"),m("("),p("span",{class:"hljs-params"}),m(")")]),m(" {\n\t\t"),p("span",{class:"hljs-keyword"},"const"),m(" state = reactive({\n\t\t\t"),p("span",{class:"hljs-attr"},"showDrawer"),m(": "),p("span",{class:"hljs-literal"},"false"),m(",\n\t\t\t"),p("span",{class:"hljs-attr"},"drawerLoading"),m(": "),p("span",{class:"hljs-literal"},"false"),m(",\n\t\t});\n\n\t\t"),p("span",{class:"hljs-function"},[p("span",{class:"hljs-keyword"},"function"),m(),p("span",{class:"hljs-title"},"handleConfirm"),m("("),p("span",{class:"hljs-params"}),m(") ")]),m("{\n\t\t\tstate.drawerLoading = "),p("span",{class:"hljs-literal"},"true"),m(";\n\t\t\t"),p("span",{class:"hljs-built_in"},"setTimeout"),m("("),p("span",{class:"hljs-function"},"() =>"),m(" {\n\t\t\t\tstate.drawerLoading = "),p("span",{class:"hljs-literal"},"false"),m(";\n\t\t\t\tstate.showDrawer = "),p("span",{class:"hljs-literal"},"false"),m(";\n\t\t\t}, "),p("span",{class:"hljs-number"},"3000"),m(");\n\t\t}\n\n\t\t"),p("span",{class:"hljs-function"},[p("span",{class:"hljs-keyword"},"function"),m(),p("span",{class:"hljs-title"},"handleCancel"),m("("),p("span",{class:"hljs-params"},[m("done: "),p("span",{class:"hljs-built_in"},"Function")]),m(") ")]),m("{\n\t\t\tdone();\n\t\t}\n\n\t\t"),p("span",{class:"hljs-keyword"},"return"),m(" {\n\t\t\tstate,\n\t\t\thandleConfirm,\n\t\t\thandleCancel,\n\t\t};\n\t},\n});\n")]),p("span",{class:"xml"},[p("span",{class:"hljs-tag"},[m("</"),p("span",{class:"hljs-name"},"script"),m(">")]),m("\n")])])],-1),H=p("h3",{id:"不同方向","data-source-line":"64"},[p("a",{class:"markdownIt-Anchor",href:"#不同方向"},"#"),m(" 不同方向")],-1),O=p("pre",{style:{display:"none"}},null,-1),B={class:"vuedoc-demo "},F=p("pre",{class:"hljs language-vue hljs--one-light"},[p("code",null,[p("span",{class:"xml"},[p("span",{class:"hljs-tag"},[m("<"),p("span",{class:"hljs-name"},"template"),m(">")]),m("\n\t"),p("span",{class:"hljs-tag"},[m("<"),p("span",{class:"hljs-name"},"v3-radio-group"),m(),p("span",{class:"hljs-attr"},"v-model"),m("="),p("span",{class:"hljs-string"},'"state.placement"'),m(">")]),m("\n\t\t"),p("span",{class:"hljs-tag"},[m("<"),p("span",{class:"hljs-name"},"v3-radio"),m(),p("span",{class:"hljs-attr"},"label"),m("="),p("span",{class:"hljs-string"},'"left"'),m(">")]),m("左"),p("span",{class:"hljs-tag"},[m("</"),p("span",{class:"hljs-name"},"v3-radio"),m(">")]),m("\n\t\t"),p("span",{class:"hljs-tag"},[m("<"),p("span",{class:"hljs-name"},"v3-radio"),m(),p("span",{class:"hljs-attr"},"label"),m("="),p("span",{class:"hljs-string"},'"bottom"'),m(">")]),m("下"),p("span",{class:"hljs-tag"},[m("</"),p("span",{class:"hljs-name"},"v3-radio"),m(">")]),m("\n\t\t"),p("span",{class:"hljs-tag"},[m("<"),p("span",{class:"hljs-name"},"v3-radio"),m(),p("span",{class:"hljs-attr"},"label"),m("="),p("span",{class:"hljs-string"},'"right"'),m(">")]),m("右"),p("span",{class:"hljs-tag"},[m("</"),p("span",{class:"hljs-name"},"v3-radio"),m(">")]),m("\n\t\t"),p("span",{class:"hljs-tag"},[m("<"),p("span",{class:"hljs-name"},"v3-radio"),m(),p("span",{class:"hljs-attr"},"label"),m("="),p("span",{class:"hljs-string"},'"top"'),m(">")]),m("上"),p("span",{class:"hljs-tag"},[m("</"),p("span",{class:"hljs-name"},"v3-radio"),m(">")]),m("\n\t"),p("span",{class:"hljs-tag"},[m("</"),p("span",{class:"hljs-name"},"v3-radio-group"),m(">")]),m("\n\t"),p("span",{class:"hljs-tag"},[m("<"),p("span",{class:"hljs-name"},"v3-button"),m("\n\t\t"),p("span",{class:"hljs-attr"},"type"),m("="),p("span",{class:"hljs-string"},'"primary"'),m("\n\t\t@"),p("span",{class:"hljs-attr"},"click"),m("="),p("span",{class:"hljs-string"},'"state.showDrawer = !state.showDrawer"'),m("\n\t\t>")]),m("打开</v3-button\n\t>\n\t"),p("span",{class:"hljs-tag"},[m("<"),p("span",{class:"hljs-name"},"v3-drawer"),m("\n\t\t"),p("span",{class:"hljs-attr"},"v-model"),m("="),p("span",{class:"hljs-string"},'"state.showDrawer"'),m("\n\t\t"),p("span",{class:"hljs-attr"},"title"),m("="),p("span",{class:"hljs-string"},'"标题"'),m("\n\t\t"),p("span",{class:"hljs-attr"},":placement"),m("="),p("span",{class:"hljs-string"},'"state.placement"'),m("\n\t>")]),m("\n\t\tLorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto\n\t\tiusto sequi pariatur quaerat numquam, nulla minus recusandae\n\t\tvoluptatibus, reprehenderit voluptate quos quisquam at ratione illum\n\t\tipsa id a ducimus quam? Placeat minus, soluta quas, asperiores\n\t\tconsequatur reprehenderit repellendus veritatis aperiam sit debitis\n\n\t"),p("span",{class:"hljs-tag"},[m("</"),p("span",{class:"hljs-name"},"v3-drawer"),m(">")]),m("\n"),p("span",{class:"hljs-tag"},[m("</"),p("span",{class:"hljs-name"},"template"),m(">")]),m("\n"),p("span",{class:"hljs-tag"},[m("<"),p("span",{class:"hljs-name"},"script"),m(),p("span",{class:"hljs-attr"},"lang"),m("="),p("span",{class:"hljs-string"},'"ts"'),m(">")])]),p("span",{class:"typescript"},[m("\n"),p("span",{class:"hljs-keyword"},"import"),m(" { defineComponent, reactive } "),p("span",{class:"hljs-keyword"},"from"),m(),p("span",{class:"hljs-string"},"'vue'"),m(";\n\n"),p("span",{class:"hljs-keyword"},"export"),m(),p("span",{class:"hljs-keyword"},"default"),m(" defineComponent({\n\t"),p("span",{class:"hljs-function"},[p("span",{class:"hljs-title"},"setup"),m("("),p("span",{class:"hljs-params"}),m(")")]),m(" {\n\t\t"),p("span",{class:"hljs-keyword"},"const"),m(" state = reactive({\n\t\t\t"),p("span",{class:"hljs-attr"},"showDrawer"),m(": "),p("span",{class:"hljs-literal"},"false"),m(",\n\t\t\t"),p("span",{class:"hljs-attr"},"placement"),m(": "),p("span",{class:"hljs-string"},"'right'"),m(",\n\t\t});\n\t\t"),p("span",{class:"hljs-keyword"},"return"),m(" {\n\t\t\tstate,\n\t\t};\n\t},\n});\n")]),p("span",{class:"xml"},[p("span",{class:"hljs-tag"},[m("</"),p("span",{class:"hljs-name"},"script"),m(">")]),m("\n")])])],-1),R=w('<h3 id="api" data-source-line="109"><a class="markdownIt-Anchor" href="#api">#</a> API</h3><h4 id="drawer参数" data-source-line="111"><a class="markdownIt-Anchor" href="#drawer参数">#</a> Drawer参数</h4><table data-source-line="113"><thead><tr><th>参数名</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>placement</td><td>抽屉弹出的位置</td><td>string</td><td>top/left/bottom/right</td><td>right</td></tr><tr><td>title</td><td>抽屉标题，也可通过 slot=header 指定</td><td>string</td><td></td><td></td></tr><tr><td>showBackdrop</td><td>是否显示遮罩层</td><td>boolean</td><td></td><td>true</td></tr><tr><td>showClose</td><td>是否显示关闭按钮</td><td>boolean</td><td></td><td>true</td></tr><tr><td>closeOnClickBackdrop</td><td>点击遮罩层是否关闭抽屉</td><td>boolean</td><td></td><td>true</td></tr><tr><td>confirmText</td><td>确定按钮的文案</td><td>string</td><td></td><td>确定</td></tr><tr><td>cancelText</td><td>取消按钮的文案</td><td>string</td><td></td><td>取消</td></tr><tr><td>showConfirm</td><td>是否显示确定按钮</td><td>boolean</td><td></td><td>true</td></tr><tr><td>showCancel</td><td>是否显示取消按钮</td><td>boolean</td><td></td><td>true</td></tr><tr><td>confirmLoading</td><td>确定按钮的 loading 状态</td><td>boolean</td><td></td><td>false</td></tr><tr><td>width</td><td>抽屉的宽度（当 placement 为 left/right 时有效</td><td>string/number</td><td></td><td>250</td></tr><tr><td>height</td><td>抽屉的高度（当 placement 为 top/bottom 时有效</td><td>string/number</td><td></td><td>auto</td></tr><tr><td>onConfirm</td><td>点击确认按钮时的回调</td><td>function</td><td></td><td>null</td></tr><tr><td>onCancel</td><td>点击取消按钮时的回调（需手动调用 done 来关闭弹窗）</td><td>function</td><td></td><td>(done: Function) =&gt; done()</td></tr></tbody></table><h4 id="drawer插槽" data-source-line="130"><a class="markdownIt-Anchor" href="#drawer插槽">#</a> Drawer插槽</h4><table data-source-line="132"><thead><tr><th>插槽名</th><th>说明</th><th>子标签</th></tr></thead><tbody><tr><td>default</td><td>默认插槽</td><td>主要内容</td></tr><tr><td>header</td><td>自定义头部内容</td><td></td></tr><tr><td>footer</td><td>自定义尾部内容</td><td></td></tr></tbody></table>',5);A.render=function(t,s,a,e,n,l){const r=c("vdpv_0"),d=c("V3DemoBlock"),u=c("vdpv_1");return o(),i("div",I,[V,p("div",P,[p(d,{lang:"vue",theme:"one-light"},{code:h((()=>[T])),default:h((()=>[p(r)])),_:1})]),H,O,p("div",B,[p(d,{lang:"vue",theme:"one-light"},{code:h((()=>[F])),default:h((()=>[p(u)])),_:1})]),R])};export default A;