(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{115:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return f}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=i.a.createContext({}),p=function(e){var t=i.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=p(e.components);return i.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,f=u["".concat(o,".").concat(d)]||u[d]||b[d]||a;return n?i.a.createElement(f,c(c({ref:t},s),{},{components:n})):i.a.createElement(f,c({ref:t},s))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var s=2;s<a;s++)o[s]=n[s];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},79:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return p}));var r=n(3),i=n(7),a=(n(0),n(115)),o={id:"config-ssl",title:"SSL Configuration",sidebar_label:"SSL"},c={unversionedId:"config-ssl",id:"config-ssl",isDocsHomePage:!1,title:"SSL Configuration",description:"Section",source:"@site/../docs/config-ssl.md",slug:"/config-ssl",permalink:"/docs/config-ssl",editUrl:"https://github.com/buildbuddy-io/buildbuddy/edit/master/docs/../docs/config-ssl.md",version:"current",sidebar_label:"SSL",sidebar:"someSidebar",previous:{title:"GitHub Configuration",permalink:"/docs/config-github"},next:{title:"Auth Configuration",permalink:"/docs/config-auth"}},l=[{value:"Section",id:"section",children:[]},{value:"Options",id:"options",children:[]},{value:"Generating client CA files",id:"generating-client-ca-files",children:[]},{value:"Example section",id:"example-section",children:[]}],s={toc:l};function p(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"section"},"Section"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"ssl:")," The SSL section enables SSL/TLS on build event protocol and remote cache gRPC connections (gRPCS). ",Object(a.b)("strong",{parentName:"p"},"Optional")),Object(a.b)("h2",{id:"options"},"Options"),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Optional")),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"enable_ssl:")," Whether or not to enable SSL/TLS on gRPC connections (gRPCS).")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"use_acme:")," Whether or not to automatically configure SSL certs using ",Object(a.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment"},"ACME"),". If ACME is enabled, cert_file and key_file should not be set.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"cert_file:")," Path to a PEM encoded certificate file to use for TLS if not using ACME.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"key_file:")," Path to a PEM encoded key file to use for TLS if not using ACME.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"client_ca_cert_file:")," Path to a PEM encoded certificate authority file used to issue client certificates for mTLS auth.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"client_ca_key_file:")," Path to a PEM encoded certificate authority key file used to issue client certificates for mTLS auth."))),Object(a.b)("h2",{id:"generating-client-ca-files"},"Generating client CA files"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre"},'# Change these CN\'s to match your BuildBuddy host name\nSERVER_SUBJECT=buildbuddy.io\nPASS=$(openssl rand -base64 32) # <- Save this :)\n\n# Generates ca.key\nopenssl genrsa -passout pass:${PASS} -des3 -out ca.key 4096\n\n# Generates ca.crt\nopenssl req -passin pass:${PASS} -new -x509 -days 365000 -key ca.key -out ca.crt -subj "/CN=${SERVER_SUBJECT}"\n\n# Generates ca.pem\nopenssl pkcs8 -passin pass:${PASS} -topk8 -nocrypt -in ca.key -out ca.pem\n\n')),Object(a.b)("h2",{id:"example-section"},"Example section"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre"},"ssl:\n  enable_ssl: true\n  use_acme: true\n  client_ca_cert_file: your_ca.crt\n  client_ca_key_file: your_ca.pem\n")))}p.isMDXComponent=!0}}]);