"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[993],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>b});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},s="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=p(n),g=a,b=s["".concat(c,".").concat(g)]||s[g]||h[g]||o;return n?r.createElement(b,i(i({ref:t},u),{},{components:n})):r.createElement(b,i({ref:t},u))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=g;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[s]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},8874:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const o={slug:"draw-a-tight-bounding-box-around-the-x",title:"Draw a tight bounding box around the X",authors:["QIN2DIM"],tags:["HCI challenge"],keywords:["hcaptcha","captcha","YOLOv8","object detection","image segmentation","bounding box","ONNX","hcaptca-challenger"]},i=void 0,l={permalink:"/zh-Hans/blog/draw-a-tight-bounding-box-around-the-x",editUrl:"https://github.com/CaptchaAgent/docs-source/tree/main/blog/2023-08-28-draw-a-tight-bounding-box-around-the-x/index.md",source:"@site/i18n/zh-Hans/docusaurus-plugin-content-blog/2023-08-28-draw-a-tight-bounding-box-around-the-x/index.md",title:"Draw a tight bounding box around the X",description:"Milestone",date:"2023-08-28T00:00:00.000Z",formattedDate:"2023\u5e748\u670828\u65e5",tags:[{label:"HCI challenge",permalink:"/zh-Hans/blog/tags/hci-challenge"}],readingTime:.34,hasTruncateMarker:!1,authors:[{name:"QIN2DIM",title:"Maintainer of CaptchaAgent",url:"https://github.com/QIN2DIM",imageURL:"https://github.com/QIN2DIM.png",key:"QIN2DIM"}],frontMatter:{slug:"draw-a-tight-bounding-box-around-the-x",title:"Draw a tight bounding box around the X",authors:["QIN2DIM"],tags:["HCI challenge"],keywords:["hcaptcha","captcha","YOLOv8","object detection","image segmentation","bounding box","ONNX","hcaptca-challenger"]},prevItem:{title:"ViT zero-shot image classification",permalink:"/zh-Hans/blog/vit-zero-shot-tasks-1"},nextItem:{title:"Please click on the X",permalink:"/zh-Hans/blog/please-click-on-the-x"}},c={authorsImageUrls:[void 0]},p=[{value:"Milestone",id:"milestone",level:2}],u={toc:p},s="wrapper";function h(e){let{components:t,...n}=e;return(0,a.kt)(s,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"milestone"},"Milestone"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/QIN2DIM/hcaptcha-challenger/issues/592"},"[Challenge] Draw a tight bounding box around the X  #592")),(0,a.kt)("p",null,"Similar to the ",(0,a.kt)("a",{parentName:"p",href:"/zh-Hans/blog/please-click-on-the-x"},"point type challenge"),", the principle of both similar challenges is object detection."),(0,a.kt)("p",null,"However, the output of the ",(0,a.kt)("inlineCode",{parentName:"p"},"bounding box")," method changes from the coordinates of the center point of the bounding box to the start and end points."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"prompt: Draw a tight bounding box around the gu\u0456t\u0430r.\ntype: bounding box\n")),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://r2-datalake.echosec.top/blog-obs/2023/10/a8e4fd61370418f5e35ebdea07f45cba.png",alt:"263652272-dbe5f4f3-c141-4e35-bbca-e20917408be9"})))}h.isMDXComponent=!0}}]);