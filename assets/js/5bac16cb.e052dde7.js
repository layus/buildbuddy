(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{115:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return f}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=a.a.createContext({}),b=function(e){var t=a.a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=b(e.components);return a.a.createElement(d.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},p=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=b(n),p=r,f=u["".concat(i,".").concat(p)]||u[p]||l[p]||o;return n?a.a.createElement(f,c(c({ref:t},d),{},{components:n})):a.a.createElement(f,c({ref:t},d))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=p;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var d=2;d<o;d++)i[d]=n[d];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},88:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return b}));var r=n(3),a=n(7),o=(n(0),n(115)),i={id:"config-database",title:"Database Configuration",sidebar_label:"Database"},c={unversionedId:"config-database",id:"config-database",isDocsHomePage:!1,title:"Database Configuration",description:"Section",source:"@site/../docs/config-database.md",slug:"/config-database",permalink:"/docs/config-database",editUrl:"https://github.com/buildbuddy-io/buildbuddy/edit/master/docs/../docs/config-database.md",version:"current",sidebar_label:"Database",sidebar:"someSidebar",previous:{title:"App Configuration",permalink:"/docs/config-app"},next:{title:"Storage Configuration",permalink:"/docs/config-storage"}},s=[{value:"Section",id:"section",children:[]},{value:"Options",id:"options",children:[]},{value:"Example sections",id:"example-sections",children:[{value:"SQLite",id:"sqlite",children:[]},{value:"MySQL",id:"mysql",children:[]}]}],d={toc:s};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},d,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"section"},"Section"),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"database:")," The database section configures the database that BuildBuddy stores metadata in. ",Object(o.b)("strong",{parentName:"p"},"Required")),Object(o.b)("h2",{id:"options"},"Options"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Required")),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"data_source")," This is a connection string used by the database driver to connect to the database. MySQL and SQLite databases are supported.")),Object(o.b)("h2",{id:"example-sections"},"Example sections"),Object(o.b)("h3",{id:"sqlite"},"SQLite"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},'database:\n  data_source: "sqlite3:///tmp/buildbuddy.db"\n')),Object(o.b)("h3",{id:"mysql"},"MySQL"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},'database:\n  data_source: "mysql://buildbuddy_user:pAsSwOrD@tcp(12.34.56.78)/buildbuddy_db"\n')))}b.isMDXComponent=!0}}]);