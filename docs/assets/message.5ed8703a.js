var s=Object.defineProperty,a=Object.prototype.hasOwnProperty,t=Object.getOwnPropertySymbols,n=Object.prototype.propertyIsEnumerable,l=(a,t,n)=>t in a?s(a,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[t]=n,e=(s,e)=>{for(var c in e||(e={}))a.call(e,c)&&l(s,c,e[c]);if(t)for(var c of t(e))n.call(e,c)&&l(s,c,e[c]);return s};import{d as c,e as p,f as r,E as h,H as o,D as d,c as i,l as j,b as u,I as g,s as m,Q as v,R as y}from"./vendor.30a8db60.js";var k=c({setup(){const s=p({}),a=r(h()).value;return{state:s,handleClick:function(s){a&&a.proxy.$message({type:s,message:`这是一条 ${s} 消息`,duration:1e3})}}}});const f=g("成功"),C=g("失败"),w=g("警告"),b=g("提示");k.render=function(s,a,t,n,l,e){const c=o("v3-button"),p=o("v3-space");return d(),i(p,{size:12},{default:j((()=>[u(c,{type:"success",onClick:a[1]||(a[1]=a=>s.handleClick("success"))},{default:j((()=>[f])),_:1}),u(c,{type:"danger",onClick:a[2]||(a[2]=a=>s.handleClick("danger"))},{default:j((()=>[C])),_:1}),u(c,{type:"warning",onClick:a[3]||(a[3]=a=>s.handleClick("warning"))},{default:j((()=>[w])),_:1}),u(c,{type:"info",onClick:a[4]||(a[4]=a=>s.handleClick("info"))},{default:j((()=>[b])),_:1})])),_:1})};var _=c({setup(){const s=p({}),a=r(h()).value;return{state:s,handleClick:function(){a&&a.proxy.$message({type:"success",message:m("span",{style:{color:"red"}},"内容可以是 VNode~")})}}}});const x=g("成功");_.render=function(s,a,t,n,l,e){const c=o("v3-button"),p=o("v3-space");return d(),i(p,{size:12},{default:j((()=>[u(c,{type:"success",onClick:s.handleClick},{default:j((()=>[x])),_:1},8,["onClick"])])),_:1})};var I=c({setup(){const s=p({}),a=r(h()).value;return{state:s,handleClick:function(){a&&a.proxy.$message({type:"success",message:"可以手动关闭",showClose:!0,duration:0})}}}});const H=g("成功");I.render=function(s,a,t,n,l,e){const c=o("v3-button"),p=o("v3-space");return d(),i(p,{size:12},{default:j((()=>[u(c,{type:"success",onClick:s.handleClick},{default:j((()=>[H])),_:1},8,["onClick"])])),_:1})};var $=c({setup(){const s=p({}),a=r(h()).value;return{state:s,handleClick:function(){a&&a.proxy.$message({type:"success",message:"文本居中",center:!0})}}}});const M=g("成功");$.render=function(s,a,t,n,l,e){const c=o("v3-button"),p=o("v3-space");return d(),i(p,{size:12},{default:j((()=>[u(c,{type:"success",onClick:s.handleClick},{default:j((()=>[M])),_:1},8,["onClick"])])),_:1})};var z=c({setup(){const s=p({}),a=r(h()).value;return{state:s,handleClick:function(){a&&a.proxy.$message({type:"success",message:"\n\t\t\t\t\t<p>可以传入 <mark>HTML</mark> 片段~</p>\n\t\t\t\t",dangerouslyUseHTMLString:!0})}}}});const T=g("成功");z.render=function(s,a,t,n,l,e){const c=o("v3-button"),p=o("v3-space");return d(),i(p,{size:12},{default:j((()=>[u(c,{type:"success",onClick:s.handleClick},{default:j((()=>[T])),_:1},8,["onClick"])])),_:1})};var A=c({setup(){const s=p({}),a=r(h()).value;return{state:s,handleClick:function(){a&&a.proxy.$message({type:"success",message:"\n\t\t\t\t\t可通过 <mark>onClose</mark> 方法阻止关闭~\n\t\t\t\t",dangerouslyUseHTMLString:!0,onClose(s){setTimeout((()=>{s()}),2e3)}})}}}});const L=g("成功");A.render=function(s,a,t,n,l,e){const c=o("v3-button"),p=o("v3-space");return d(),i(p,{size:12},{default:j((()=>[u(c,{type:"success",onClick:s.handleClick},{default:j((()=>[L])),_:1},8,["onClick"])])),_:1})};const O=c({components:{vdpv_0:k,vdpv_1:_,vdpv_2:I,vdpv_3:$,vdpv_4:z,vdpv_5:A},setup(s){const a=r(),t=r(),n=r(),l=r(),c=r(),h=r(),o=[a,t,n,l,c,h],d=p({vdpv_0Height:0,vdpv_1Height:0,vdpv_2Height:0,vdpv_3Height:0,vdpv_4Height:0,vdpv_5Height:0});return e(e({toggleCode:s=>{const a="vdpv_"+s;0===d[a+"Height"]?d[a+"Height"]=(o[s].value?o[s].value.offsetHeight:0)||0:d[a+"Height"]=0}},v(d)),{vdpv_0Ref:a,vdpv_1Ref:t,vdpv_2Ref:n,vdpv_3Ref:l,vdpv_4Ref:c,vdpv_5Ref:h})}});O.$vd={matter:{},toc:[{content:"消息提示（Message）",anchor:"消息提示message",level:2},{content:"基本用法",anchor:"基本用法",level:3},{content:"内容可以是VNode",anchor:"内容可以是vnode",level:3},{content:"可以手动关闭",anchor:"可以手动关闭",level:3},{content:"文本居中",anchor:"文本居中",level:3},{content:"可以传入HTML片段",anchor:"可以传入html片段",level:3},{content:"可通过onClose事件来阻止关闭",anchor:"可通过onclose事件来阻止关闭",level:3},{content:"API",anchor:"api",level:3},{content:"Message 参数",anchor:"message-参数",level:4}]};const R=O,P={class:"vuedoc custom-markdown-container "},S=y('<h2 id="消息提示message" data-source-line="1"><a class="markdownIt-Anchor" href="#消息提示message">#</a> 消息提示（Message）</h2><h3 id="基本用法" data-source-line="3"><a class="markdownIt-Anchor" href="#基本用法">#</a> 基本用法</h3><pre style="display:none;"></pre>',3),U={class:"vuedoc-demo "},V=u("pre",{class:"hljs language-vue hljs--one-light"},[u("code",null,[u("span",{class:"xml"},[u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"template"),g(">")]),g("\n  "),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-space"),g(),u("span",{class:"hljs-attr"},":size"),g("="),u("span",{class:"hljs-string"},'"12"'),g(">")]),g("\n\t\t"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-button"),g(),u("span",{class:"hljs-attr"},"type"),g("="),u("span",{class:"hljs-string"},'"success"'),g(" @"),u("span",{class:"hljs-attr"},"click"),g("="),u("span",{class:"hljs-string"},"\"handleClick('success')\""),g("\n\t\t\t>")]),g("成功</v3-button\n\t\t>\n\t\t"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-button"),g(),u("span",{class:"hljs-attr"},"type"),g("="),u("span",{class:"hljs-string"},'"danger"'),g(" @"),u("span",{class:"hljs-attr"},"click"),g("="),u("span",{class:"hljs-string"},"\"handleClick('danger')\""),g("\n\t\t\t>")]),g("失败</v3-button\n\t\t>\n\t\t"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-button"),g(),u("span",{class:"hljs-attr"},"type"),g("="),u("span",{class:"hljs-string"},'"warning"'),g(" @"),u("span",{class:"hljs-attr"},"click"),g("="),u("span",{class:"hljs-string"},"\"handleClick('warning')\""),g("\n\t\t\t>")]),g("警告</v3-button\n\t\t>\n\t\t"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-button"),g(),u("span",{class:"hljs-attr"},"type"),g("="),u("span",{class:"hljs-string"},'"info"'),g(" @"),u("span",{class:"hljs-attr"},"click"),g("="),u("span",{class:"hljs-string"},"\"handleClick('info')\""),g(">")]),g("提示"),u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"v3-button"),g(">")]),g("\n\t"),u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"v3-space"),g(">")]),g("\n"),u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"template"),g(">")]),g("\n"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"script"),g(),u("span",{class:"hljs-attr"},"lang"),g("="),u("span",{class:"hljs-string"},'"ts"'),g(">")])]),u("span",{class:"typescript"},[g("\n"),u("span",{class:"hljs-keyword"},"import"),g(" { defineComponent, reactive, getCurrentInstance, ref } "),u("span",{class:"hljs-keyword"},"from"),g(),u("span",{class:"hljs-string"},"'vue'"),g(";\n\n"),u("span",{class:"hljs-keyword"},"export"),g(),u("span",{class:"hljs-keyword"},"default"),g(" defineComponent({\n  "),u("span",{class:"hljs-function"},[u("span",{class:"hljs-title"},"setup"),g("("),u("span",{class:"hljs-params"}),g(")")]),g(" {\n\t\t"),u("span",{class:"hljs-keyword"},"const"),g(" state = reactive({\n\t\t});\n    "),u("span",{class:"hljs-keyword"},"const"),g(" app = ref(getCurrentInstance()).value;\n\n    "),u("span",{class:"hljs-function"},[u("span",{class:"hljs-keyword"},"function"),g(),u("span",{class:"hljs-title"},"handleClick"),g("("),u("span",{class:"hljs-params"},[u("span",{class:"hljs-keyword"},"type"),g(": "),u("span",{class:"hljs-built_in"},"string")]),g(") ")]),g("{\n      app && app.proxy.$message({\n        "),u("span",{class:"hljs-keyword"},"type"),g(",\n        "),u("span",{class:"hljs-attr"},"message"),g(": "),u("span",{class:"hljs-string"},[g("`这是一条 "),u("span",{class:"hljs-subst"},[g("${"),u("span",{class:"hljs-keyword"},"type"),g("}")]),g(" 消息`")]),g(",\n        "),u("span",{class:"hljs-attr"},"duration"),g(": "),u("span",{class:"hljs-number"},"1000"),g(",\n      })\n    }\n\n\t\t"),u("span",{class:"hljs-keyword"},"return"),g(" {\n\t\t\tstate,\n      handleClick,\n\t\t};\n\t},\n});\n")]),u("span",{class:"xml"},[u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"script"),g(">")]),g("\n")])])],-1),N=u("h3",{id:"内容可以是vnode","data-source-line":"46"},[u("a",{class:"markdownIt-Anchor",href:"#内容可以是vnode"},"#"),g(" 内容可以是VNode")],-1),D=u("pre",{style:{display:"none"}},null,-1),E={class:"vuedoc-demo "},B=u("pre",{class:"hljs language-vue hljs--one-light"},[u("code",null,[u("span",{class:"xml"},[u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"template"),g(">")]),g("\n  "),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-space"),g(),u("span",{class:"hljs-attr"},":size"),g("="),u("span",{class:"hljs-string"},'"12"'),g(">")]),g("\n\t\t"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-button"),g(),u("span",{class:"hljs-attr"},"type"),g("="),u("span",{class:"hljs-string"},'"success"'),g(" @"),u("span",{class:"hljs-attr"},"click"),g("="),u("span",{class:"hljs-string"},'"handleClick"'),g("\n\t\t\t>")]),g("成功</v3-button\n\t\t>\n\t"),u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"v3-space"),g(">")]),g("\n"),u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"template"),g(">")]),g("\n"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"script"),g(),u("span",{class:"hljs-attr"},"lang"),g("="),u("span",{class:"hljs-string"},'"ts"'),g(">")])]),u("span",{class:"typescript"},[g("\n"),u("span",{class:"hljs-keyword"},"import"),g(" { defineComponent, reactive, getCurrentInstance, ref, h } "),u("span",{class:"hljs-keyword"},"from"),g(),u("span",{class:"hljs-string"},"'vue'"),g(";\n\n"),u("span",{class:"hljs-keyword"},"export"),g(),u("span",{class:"hljs-keyword"},"default"),g(" defineComponent({\n  "),u("span",{class:"hljs-function"},[u("span",{class:"hljs-title"},"setup"),g("("),u("span",{class:"hljs-params"}),g(")")]),g(" {\n\t\t"),u("span",{class:"hljs-keyword"},"const"),g(" state = reactive({\n\t\t});\n    "),u("span",{class:"hljs-keyword"},"const"),g(" app = ref(getCurrentInstance()).value;\n\n    "),u("span",{class:"hljs-function"},[u("span",{class:"hljs-keyword"},"function"),g(),u("span",{class:"hljs-title"},"handleClick"),g("("),u("span",{class:"hljs-params"}),g(") ")]),g("{\n      app && app.proxy.$message({\n        "),u("span",{class:"hljs-attr"},"type"),g(": "),u("span",{class:"hljs-string"},"'success'"),g(",\n\t\t\t\t"),u("span",{class:"hljs-attr"},"message"),g(": h("),u("span",{class:"hljs-string"},"'span'"),g(", {\n          "),u("span",{class:"hljs-attr"},"style"),g(": {\n            "),u("span",{class:"hljs-attr"},"color"),g(": "),u("span",{class:"hljs-string"},"'red'"),g(",\n          },\n        }, "),u("span",{class:"hljs-string"},"'内容可以是 VNode~'"),g("),\n      })\n    }\n\n\t\t"),u("span",{class:"hljs-keyword"},"return"),g(" {\n\t\t\tstate,\n      handleClick,\n\t\t};\n\t},\n});\n")]),u("span",{class:"xml"},[u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"script"),g(">")]),g("\n")])])],-1),Q=u("h3",{id:"可以手动关闭","data-source-line":"85"},[u("a",{class:"markdownIt-Anchor",href:"#可以手动关闭"},"#"),g(" 可以手动关闭")],-1),q=u("pre",{style:{display:"none"}},null,-1),F={class:"vuedoc-demo "},G=u("pre",{class:"hljs language-vue hljs--one-light"},[u("code",null,[u("span",{class:"xml"},[u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"template"),g(">")]),g("\n  "),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-space"),g(),u("span",{class:"hljs-attr"},":size"),g("="),u("span",{class:"hljs-string"},'"12"'),g(">")]),g("\n\t\t"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-button"),g(),u("span",{class:"hljs-attr"},"type"),g("="),u("span",{class:"hljs-string"},'"success"'),g(" @"),u("span",{class:"hljs-attr"},"click"),g("="),u("span",{class:"hljs-string"},'"handleClick"'),g("\n\t\t\t>")]),g("成功</v3-button\n\t\t>\n\t"),u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"v3-space"),g(">")]),g("\n"),u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"template"),g(">")]),g("\n"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"script"),g(),u("span",{class:"hljs-attr"},"lang"),g("="),u("span",{class:"hljs-string"},'"ts"'),g(">")])]),u("span",{class:"typescript"},[g("\n"),u("span",{class:"hljs-keyword"},"import"),g(" { defineComponent, reactive, getCurrentInstance, ref, h } "),u("span",{class:"hljs-keyword"},"from"),g(),u("span",{class:"hljs-string"},"'vue'"),g(";\n\n"),u("span",{class:"hljs-keyword"},"export"),g(),u("span",{class:"hljs-keyword"},"default"),g(" defineComponent({\n  "),u("span",{class:"hljs-function"},[u("span",{class:"hljs-title"},"setup"),g("("),u("span",{class:"hljs-params"}),g(")")]),g(" {\n\t\t"),u("span",{class:"hljs-keyword"},"const"),g(" state = reactive({\n\t\t});\n    "),u("span",{class:"hljs-keyword"},"const"),g(" app = ref(getCurrentInstance()).value;\n\n    "),u("span",{class:"hljs-function"},[u("span",{class:"hljs-keyword"},"function"),g(),u("span",{class:"hljs-title"},"handleClick"),g("("),u("span",{class:"hljs-params"}),g(") ")]),g("{\n      app && app.proxy.$message({\n        "),u("span",{class:"hljs-attr"},"type"),g(": "),u("span",{class:"hljs-string"},"'success'"),g(",\n\t\t\t\t"),u("span",{class:"hljs-attr"},"message"),g(": "),u("span",{class:"hljs-string"},"'可以手动关闭'"),g(",\n\t\t\t\t"),u("span",{class:"hljs-attr"},"showClose"),g(": "),u("span",{class:"hljs-literal"},"true"),g(",\n        "),u("span",{class:"hljs-attr"},"duration"),g(": "),u("span",{class:"hljs-number"},"0"),g(",\n      })\n    }\n\n\t\t"),u("span",{class:"hljs-keyword"},"return"),g(" {\n\t\t\tstate,\n      handleClick,\n\t\t};\n\t},\n});\n")]),u("span",{class:"xml"},[u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"script"),g(">")]),g("\n")])])],-1),J=u("h3",{id:"文本居中","data-source-line":"122"},[u("a",{class:"markdownIt-Anchor",href:"#文本居中"},"#"),g(" 文本居中")],-1),K=u("pre",{style:{display:"none"}},null,-1),W={class:"vuedoc-demo "},X=u("pre",{class:"hljs language-vue hljs--one-light"},[u("code",null,[u("span",{class:"xml"},[u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"template"),g(">")]),g("\n  "),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-space"),g(),u("span",{class:"hljs-attr"},":size"),g("="),u("span",{class:"hljs-string"},'"12"'),g(">")]),g("\n\t\t"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-button"),g(),u("span",{class:"hljs-attr"},"type"),g("="),u("span",{class:"hljs-string"},'"success"'),g(" @"),u("span",{class:"hljs-attr"},"click"),g("="),u("span",{class:"hljs-string"},'"handleClick"'),g("\n\t\t\t>")]),g("成功</v3-button\n\t\t>\n\t"),u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"v3-space"),g(">")]),g("\n"),u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"template"),g(">")]),g("\n"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"script"),g(),u("span",{class:"hljs-attr"},"lang"),g("="),u("span",{class:"hljs-string"},'"ts"'),g(">")])]),u("span",{class:"typescript"},[g("\n"),u("span",{class:"hljs-keyword"},"import"),g(" { defineComponent, reactive, getCurrentInstance, ref, h } "),u("span",{class:"hljs-keyword"},"from"),g(),u("span",{class:"hljs-string"},"'vue'"),g(";\n\n"),u("span",{class:"hljs-keyword"},"export"),g(),u("span",{class:"hljs-keyword"},"default"),g(" defineComponent({\n  "),u("span",{class:"hljs-function"},[u("span",{class:"hljs-title"},"setup"),g("("),u("span",{class:"hljs-params"}),g(")")]),g(" {\n\t\t"),u("span",{class:"hljs-keyword"},"const"),g(" state = reactive({\n\t\t});\n    "),u("span",{class:"hljs-keyword"},"const"),g(" app = ref(getCurrentInstance()).value;\n\n    "),u("span",{class:"hljs-function"},[u("span",{class:"hljs-keyword"},"function"),g(),u("span",{class:"hljs-title"},"handleClick"),g("("),u("span",{class:"hljs-params"}),g(") ")]),g("{\n      app && app.proxy.$message({\n        "),u("span",{class:"hljs-attr"},"type"),g(": "),u("span",{class:"hljs-string"},"'success'"),g(",\n\t\t\t\t"),u("span",{class:"hljs-attr"},"message"),g(": "),u("span",{class:"hljs-string"},"'文本居中'"),g(",\n\t\t\t\t"),u("span",{class:"hljs-attr"},"center"),g(": "),u("span",{class:"hljs-literal"},"true"),g(",\n      })\n    }\n\n\t\t"),u("span",{class:"hljs-keyword"},"return"),g(" {\n\t\t\tstate,\n      handleClick,\n\t\t};\n\t},\n});\n")]),u("span",{class:"xml"},[u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"script"),g(">")]),g("\n")])])],-1),Y=u("h3",{id:"可以传入html片段","data-source-line":"158"},[u("a",{class:"markdownIt-Anchor",href:"#可以传入html片段"},"#"),g(" 可以传入HTML片段")],-1),Z=u("pre",{style:{display:"none"}},null,-1),ss={class:"vuedoc-demo "},as=u("pre",{class:"hljs language-vue hljs--one-light"},[u("code",null,[u("span",{class:"xml"},[u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"template"),g(">")]),g("\n  "),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-space"),g(),u("span",{class:"hljs-attr"},":size"),g("="),u("span",{class:"hljs-string"},'"12"'),g(">")]),g("\n\t\t"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-button"),g(),u("span",{class:"hljs-attr"},"type"),g("="),u("span",{class:"hljs-string"},'"success"'),g(" @"),u("span",{class:"hljs-attr"},"click"),g("="),u("span",{class:"hljs-string"},'"handleClick"'),g("\n\t\t\t>")]),g("成功</v3-button\n\t\t>\n\t"),u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"v3-space"),g(">")]),g("\n"),u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"template"),g(">")]),g("\n"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"script"),g(),u("span",{class:"hljs-attr"},"lang"),g("="),u("span",{class:"hljs-string"},'"ts"'),g(">")])]),u("span",{class:"typescript"},[g("\n"),u("span",{class:"hljs-keyword"},"import"),g(" { defineComponent, reactive, getCurrentInstance, ref, h } "),u("span",{class:"hljs-keyword"},"from"),g(),u("span",{class:"hljs-string"},"'vue'"),g(";\n\n"),u("span",{class:"hljs-keyword"},"export"),g(),u("span",{class:"hljs-keyword"},"default"),g(" defineComponent({\n  "),u("span",{class:"hljs-function"},[u("span",{class:"hljs-title"},"setup"),g("("),u("span",{class:"hljs-params"}),g(")")]),g(" {\n\t\t"),u("span",{class:"hljs-keyword"},"const"),g(" state = reactive({\n\t\t});\n    "),u("span",{class:"hljs-keyword"},"const"),g(" app = ref(getCurrentInstance()).value;\n\n    "),u("span",{class:"hljs-function"},[u("span",{class:"hljs-keyword"},"function"),g(),u("span",{class:"hljs-title"},"handleClick"),g("("),u("span",{class:"hljs-params"}),g(") ")]),g("{\n      app && app.proxy.$message({\n        "),u("span",{class:"hljs-attr"},"type"),g(": "),u("span",{class:"hljs-string"},"'success'"),g(",\n\t\t\t\t"),u("span",{class:"hljs-attr"},"message"),g(": "),u("span",{class:"hljs-string"},"`\n\t\t\t\t\t<p>可以传入 <mark>HTML</mark> 片段~</p>\n\t\t\t\t`"),g(",\n\t\t\t\t"),u("span",{class:"hljs-attr"},"dangerouslyUseHTMLString"),g(": "),u("span",{class:"hljs-literal"},"true"),g(",\n      })\n    }\n\n\t\t"),u("span",{class:"hljs-keyword"},"return"),g(" {\n\t\t\tstate,\n      handleClick,\n\t\t};\n\t},\n});\n")]),u("span",{class:"xml"},[u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"script"),g(">")]),g("\n")])])],-1),ts=u("h3",{id:"可通过onclose事件来阻止关闭","data-source-line":"196"},[u("a",{class:"markdownIt-Anchor",href:"#可通过onclose事件来阻止关闭"},"#"),g(" 可通过onClose事件来阻止关闭")],-1),ns=u("pre",{style:{display:"none"}},null,-1),ls={class:"vuedoc-demo "},es=u("pre",{class:"hljs language-vue hljs--one-light"},[u("code",null,[u("span",{class:"xml"},[u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"template"),g(">")]),g("\n  "),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-space"),g(),u("span",{class:"hljs-attr"},":size"),g("="),u("span",{class:"hljs-string"},'"12"'),g(">")]),g("\n\t\t"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"v3-button"),g(),u("span",{class:"hljs-attr"},"type"),g("="),u("span",{class:"hljs-string"},'"success"'),g(" @"),u("span",{class:"hljs-attr"},"click"),g("="),u("span",{class:"hljs-string"},'"handleClick"'),g("\n\t\t\t>")]),g("成功</v3-button\n\t\t>\n\t"),u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"v3-space"),g(">")]),g("\n"),u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"template"),g(">")]),g("\n"),u("span",{class:"hljs-tag"},[g("<"),u("span",{class:"hljs-name"},"script"),g(),u("span",{class:"hljs-attr"},"lang"),g("="),u("span",{class:"hljs-string"},'"ts"'),g(">")])]),u("span",{class:"typescript"},[g("\n"),u("span",{class:"hljs-keyword"},"import"),g(" { defineComponent, reactive, getCurrentInstance, ref, h } "),u("span",{class:"hljs-keyword"},"from"),g(),u("span",{class:"hljs-string"},"'vue'"),g(";\n\n"),u("span",{class:"hljs-keyword"},"export"),g(),u("span",{class:"hljs-keyword"},"default"),g(" defineComponent({\n  "),u("span",{class:"hljs-function"},[u("span",{class:"hljs-title"},"setup"),g("("),u("span",{class:"hljs-params"}),g(")")]),g(" {\n\t\t"),u("span",{class:"hljs-keyword"},"const"),g(" state = reactive({\n\t\t});\n    "),u("span",{class:"hljs-keyword"},"const"),g(" app = ref(getCurrentInstance()).value;\n\n    "),u("span",{class:"hljs-function"},[u("span",{class:"hljs-keyword"},"function"),g(),u("span",{class:"hljs-title"},"handleClick"),g("("),u("span",{class:"hljs-params"}),g(") ")]),g("{\n      app && app.proxy.$message({\n        "),u("span",{class:"hljs-attr"},"type"),g(": "),u("span",{class:"hljs-string"},"'success'"),g(",\n\t\t\t\t"),u("span",{class:"hljs-attr"},"message"),g(": "),u("span",{class:"hljs-string"},"`\n\t\t\t\t\t可通过 <mark>onClose</mark> 方法阻止关闭~\n\t\t\t\t`"),g(",\n\t\t\t\t"),u("span",{class:"hljs-attr"},"dangerouslyUseHTMLString"),g(": "),u("span",{class:"hljs-literal"},"true"),g(",\n\t\t\t\t"),u("span",{class:"hljs-function"},[u("span",{class:"hljs-title"},"onClose"),g("("),u("span",{class:"hljs-params"},"done"),g(")")]),g(" {\n\t\t\t\t\t"),u("span",{class:"hljs-built_in"},"setTimeout"),g("("),u("span",{class:"hljs-function"},"() =>"),g(" {\n\t\t\t\t\t\tdone();\n\t\t\t\t\t}, "),u("span",{class:"hljs-number"},"2000"),g(");\n\t\t\t\t},\n      })\n    }\n\n\t\t"),u("span",{class:"hljs-keyword"},"return"),g(" {\n\t\t\tstate,\n      handleClick,\n\t\t};\n\t},\n});\n")]),u("span",{class:"xml"},[u("span",{class:"hljs-tag"},[g("</"),u("span",{class:"hljs-name"},"script"),g(">")]),g("\n")])])],-1),cs=y('<h3 id="api" data-source-line="239"><a class="markdownIt-Anchor" href="#api">#</a> API</h3><h4 id="message-参数" data-source-line="241"><a class="markdownIt-Anchor" href="#message-参数">#</a> Message 参数</h4><table data-source-line="243"><thead><tr><th>参数名</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>duration</td><td>持续时间（ms）</td><td>number</td><td></td><td>3000</td></tr><tr><td>type</td><td>消息框的类型</td><td>string</td><td>success / warning / info / danger</td><td>info</td></tr><tr><td>message</td><td>消息内容</td><td>string</td><td></td><td></td></tr><tr><td>icon</td><td>自定义图标</td><td>string</td><td></td><td></td></tr><tr><td>dangerouslyUseHTMLString</td><td>是否把 message 作为 HTML 渲染</td><td>boolean</td><td></td><td>false</td></tr><tr><td>customClass</td><td>自定义消息框的类名</td><td>string</td><td></td><td></td></tr><tr><td>showClose</td><td>是否显示关闭按钮</td><td>boolean</td><td></td><td>true</td></tr><tr><td>center</td><td>弹窗框内的文本是否居中</td><td>boolean</td><td></td><td>false</td></tr><tr><td>offset</td><td>弹窗框距离窗口顶部的距离</td><td>number</td><td></td><td>20</td></tr><tr><td>closeOnHover</td><td>鼠标移到消息框上时，是否依然要关闭</td><td>boolean</td><td></td><td>false</td></tr><tr><td>onClose</td><td>关闭时触发的事件，返回 <code>Promise&lt;true&gt;</code> 或者 <code>true</code> 时消息框永远不会关闭</td><td>function</td><td></td><td></td></tr></tbody></table>',3);R.render=function(s,a,t,n,l,e){const c=o("vdpv_0"),p=o("V3DemoBlock"),r=o("vdpv_1"),h=o("vdpv_2"),g=o("vdpv_3"),m=o("vdpv_4"),v=o("vdpv_5");return d(),i("div",P,[S,u("div",U,[u(p,{lang:"vue",theme:"one-light"},{code:j((()=>[V])),default:j((()=>[u(c)])),_:1})]),N,D,u("div",E,[u(p,{lang:"vue",theme:"one-light"},{code:j((()=>[B])),default:j((()=>[u(r)])),_:1})]),Q,q,u("div",F,[u(p,{lang:"vue",theme:"one-light"},{code:j((()=>[G])),default:j((()=>[u(h)])),_:1})]),J,K,u("div",W,[u(p,{lang:"vue",theme:"one-light"},{code:j((()=>[X])),default:j((()=>[u(g)])),_:1})]),Y,Z,u("div",ss,[u(p,{lang:"vue",theme:"one-light"},{code:j((()=>[as])),default:j((()=>[u(m)])),_:1})]),ts,ns,u("div",ls,[u(p,{lang:"vue",theme:"one-light"},{code:j((()=>[es])),default:j((()=>[u(v)])),_:1})]),cs])};export default R;