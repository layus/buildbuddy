(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{115:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var b=i.a.createContext({}),p=function(e){var t=i.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return i.a.createElement(b.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},u=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,b=l(e,["components","mdxType","originalType","parentName"]),d=p(n),u=r,m=d["".concat(c,".").concat(u)]||d[u]||s[u]||a;return n?i.a.createElement(m,o(o({ref:t},b),{},{components:n})):i.a.createElement(m,o({ref:t},b))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,c=new Array(a);c[0]=u;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,c[1]=o;for(var b=2;b<a;b++)c[b]=n[b];return i.a.createElement.apply(null,c)}return i.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},83:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return o})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return p}));var r=n(3),i=n(7),a=(n(0),n(115)),c={id:"config-cache",title:"Cache Configuration",sidebar_label:"Cache"},o={unversionedId:"config-cache",id:"config-cache",isDocsHomePage:!1,title:"Cache Configuration",description:"Section",source:"@site/../docs/config-cache.md",slug:"/config-cache",permalink:"/docs/config-cache",editUrl:"https://github.com/buildbuddy-io/buildbuddy/edit/master/docs/../docs/config-cache.md",version:"current",sidebar_label:"Cache",sidebar:"someSidebar",previous:{title:"Storage Configuration",permalink:"/docs/config-storage"},next:{title:"GitHub Configuration",permalink:"/docs/config-github"}},l=[{value:"Section",id:"section",children:[]},{value:"Options",id:"options",children:[]},{value:"Example section",id:"example-section",children:[{value:"Disk",id:"disk",children:[]},{value:"GCS &amp; Redis (Enterprise only)",id:"gcs--redis-enterprise-only",children:[]},{value:"S3 (Enterprise only)",id:"s3-enterprise-only",children:[]}]}],b={toc:l};function p(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"section"},"Section"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"cache:")," The cache section enables the BuildBuddy cache and configures how and where it will store data. ",Object(a.b)("strong",{parentName:"p"},"Optional")),Object(a.b)("h2",{id:"options"},"Options"),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Optional")),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"max_size_bytes:")," How big to allow the cache to be (in bytes).")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"in_memory:")," Whether or not to use the in_memory cache.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"disk:")," The Disk section configures a disk-based cache."),Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"root_directory")," The root directory to store cache data in, if using the disk cache. This directory must be readable and writable by the BuildBuddy process. The directory will be created if it does not exist.")))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Enterprise only")),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"redis_target"),": A redis target for improved RBE performance.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"gcs:")," The GCS section configures Google Cloud Storage based blob storage."),Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"bucket")," The name of the GCS bucket to store files in. Will be created if it does not already exist.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"credentials_file")," A path to a ",Object(a.b)("a",{parentName:"p",href:"https://cloud.google.com/docs/authentication/getting-started"},"JSON credentials file")," that will be used to authenticate to GCS.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"project_id")," The Google Cloud project ID of the project owning the above credentials and GCS bucket.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"ttl_days")," The period after which cache files should be TTLd. Disabled if 0.")))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"s3:")," The AWS section configures AWS S3 storage."),Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"region")," The AWS region")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"bucket")," The AWS S3 bucket (will be created automatically)")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"credentials_profile")," If a profile other than default is chosen, use that one.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"ttl_days")," The period after which cache files should be TTLd. Disabled if 0.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"By default, the S3 blobstore will rely on environment variables, shared credentials, or IAM roles. See ",Object(a.b)("a",{parentName:"p",href:"https://docs.aws.amazon.com/sdk-for-go/v1/developer-guide/configuring-sdk.html#specifying-credentials"},"AWS Go SDK docs")," for more information."))))),Object(a.b)("h2",{id:"example-section"},"Example section"),Object(a.b)("h3",{id:"disk"},"Disk"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre"},"cache:\n  max_size_bytes: 10000000000  # 10 GB\n  disk:\n    root_directory: /tmp/buildbuddy-cache\n")),Object(a.b)("h3",{id:"gcs--redis-enterprise-only"},"GCS & Redis (Enterprise only)"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre"},'cache:\n  redis_target: "my-redis.local:6379"\n  gcs:\n    bucket: "buildbuddy_blobs"\n    project_id: "my-cool-project"\n    credentials_file: "enterprise/config/my-cool-project-7a9d15f66e69.json"\n    ttl_days: 30\n')),Object(a.b)("h3",{id:"s3-enterprise-only"},"S3 (Enterprise only)"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre"},'cache:\n  s3:\n    # required\n    region: "us-west-2"\n    bucket: "buddybuild-bucket"\n    # optional\n    credentials_profile: "other-profile"\n    ttl_days: 30\n')))}p.isMDXComponent=!0}}]);