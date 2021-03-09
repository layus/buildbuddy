(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{105:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return c}));var r=n(3),a=n(7),o=(n(0),n(115)),l={id:"on-prem",title:"On-prem Quickstart",sidebar_label:"On-prem Quickstart"},i={unversionedId:"on-prem",id:"on-prem",isDocsHomePage:!1,title:"On-prem Quickstart",description:"BuildBuddy is designed to be easy to run on-premise for those use cases where data absolutely must not leave a company's servers. It can be run your own servers, or in your own cloud environment. It supports major cloud providers like GCP, AWS, and Azure.",source:"@site/../docs/on-prem.md",slug:"/on-prem",permalink:"/docs/on-prem",editUrl:"https://github.com/buildbuddy-io/buildbuddy/edit/master/docs/../docs/on-prem.md",version:"current",sidebar_label:"On-prem Quickstart",sidebar:"someSidebar",previous:{title:"Cloud Quickstart",permalink:"/docs/cloud"},next:{title:"Contributing to BuildBuddy",permalink:"/docs/contributing"}},u=[{value:"Getting started",id:"getting-started",children:[]},{value:"Bazel Run",id:"bazel-run",children:[]},{value:"Docker Image",id:"docker-image",children:[]},{value:"Kubernetes",id:"kubernetes",children:[{value:"Custom configuration",id:"custom-configuration",children:[]},{value:"Output to yaml file",id:"output-to-yaml-file",children:[]},{value:"Number of replicas",id:"number-of-replicas",children:[]},{value:"Restart behavior",id:"restart-behavior",children:[]},{value:"Enterprise deployment",id:"enterprise-deployment",children:[]}]},{value:"Helm",id:"helm",children:[]},{value:"Configuring BuildBuddy",id:"configuring-buildbuddy",children:[]}],d={toc:u};function c(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},d,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"BuildBuddy is designed to be easy to run on-premise for those use cases where data absolutely must not leave a company's servers. It can be run your own servers, or in your own cloud environment. It supports major cloud providers like GCP, AWS, and Azure."),Object(o.b)("p",null,"The software itself is open-source and easy to audit."),Object(o.b)("p",null,"For companies, we offer an ",Object(o.b)("a",{parentName:"p",href:"/docs/enterprise"},"Enterprise")," version of BuildBuddy that contains advanced features like OIDC Auth, API access, and more."),Object(o.b)("h2",{id:"getting-started"},"Getting started"),Object(o.b)("p",null,"There are four ways to run BuildBuddy on-prem:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#bazel-run"},"Bazel Run"),": get the source and run a simple ",Object(o.b)("inlineCode",{parentName:"li"},"bazel run")," command."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#docker-image"},"Docker Image"),": pre-built Docker images running the latest version of BuildBuddy."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#kubernetes"},"Kubernetes"),": deploy BuildBuddy to your Kubernetes cluster with a one-line deploy script."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"#helm"},"Helm"),": deploy BuildBuddy to your Kubernetes cluster with the official BuildBuddy helm charts.")),Object(o.b)("h2",{id:"bazel-run"},"Bazel Run"),Object(o.b)("p",null,'The simplest method of running BuildBuddy on your own computer is to download and run it with "bazel run". Doing that is simple:'),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"Get the source")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},'git clone "https://github.com/buildbuddy-io/buildbuddy"\n')),Object(o.b)("ol",{start:2},Object(o.b)("li",{parentName:"ol"},"Navigate into the BuildBuddy directory")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"cd buildbuddy\n")),Object(o.b)("ol",{start:3},Object(o.b)("li",{parentName:"ol"},"Build and run using bazel")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"bazel run -c opt server:buildbuddy\n")),Object(o.b)("p",null,"We recommend using a tool like ",Object(o.b)("a",{parentName:"p",href:"https://github.com/bazelbuild/bazelisk"},"Bazelisk")," that respects the repo's ",Object(o.b)("a",{parentName:"p",href:"https://github.com/buildbuddy-io/buildbuddy/blob/master/.bazelversion"},".bazelversion")," file."),Object(o.b)("h2",{id:"docker-image"},"Docker Image"),Object(o.b)("p",null,"We publish a ",Object(o.b)("a",{parentName:"p",href:"https://www.docker.com/"},"Docker")," image with every release that contains a pre-configured BuildBuddy."),Object(o.b)("p",null,"To run it, use the following command:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"docker pull gcr.io/flame-public/buildbuddy-app-onprem:latest && docker run -p 1985:1985 -p 8080:8080 gcr.io/flame-public/buildbuddy-app-onprem:latest\n")),Object(o.b)("p",null,"If you'd like to pass a custom configuration file to BuildBuddy running in a Docker image - see the ",Object(o.b)("a",{parentName:"p",href:"/docs/config"},"configuration docs")," on using Docker's ",Object(o.b)("a",{parentName:"p",href:"https://docs.docker.com/storage/volumes/"},"-v flag"),"."),Object(o.b)("p",null,"Note: If you're using BuildBuddy's Docker image locally and a third party gRPC cache, you'll likely need to add the ",Object(o.b)("inlineCode",{parentName:"p"},"--network=host")," ",Object(o.b)("a",{parentName:"p",href:"https://docs.docker.com/network/host/"},"flag")," to your ",Object(o.b)("inlineCode",{parentName:"p"},"docker run")," command in order for BuildBuddy to be able to pull test logs and timing information from the external cache."),Object(o.b)("h2",{id:"kubernetes"},"Kubernetes"),Object(o.b)("p",null,'If you run or have access to a Kubernetes cluster, and you have the "kubectl" command configured, we provide a shell script that will deploy BuildBuddy to your cluster, namespaced under the "buildbuddy" namespace.'),Object(o.b)("p",null,"This script uses ",Object(o.b)("a",{parentName:"p",href:"https://github.com/buildbuddy-io/buildbuddy/blob/master/deployment/buildbuddy-app.onprem.yaml"},"this deployment file"),", if you want to see the details of what is being configured."),Object(o.b)("p",null,"To kick of the Kubernetes deploy, use the following command:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"bash k8s_on_prem.sh\n")),Object(o.b)("h3",{id:"custom-configuration"},"Custom configuration"),Object(o.b)("p",null,"Note: the ",Object(o.b)("inlineCode",{parentName:"p"},"k8s_on_prem.sh")," script requires ",Object(o.b)("strong",{parentName:"p"},Object(o.b)("a",{parentName:"strong",href:"https://kubernetes.io/docs/tasks/tools/install-kubectl/"},"kubectl")," version 1.15")," or higher to be installed."),Object(o.b)("p",null,"To pass in a custom ",Object(o.b)("a",{parentName:"p",href:"/docs/config"},"config file"),", you can use the ",Object(o.b)("inlineCode",{parentName:"p"},"-config")," flag:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"bash k8s_on_prem.sh -config my-config.yaml\n")),Object(o.b)("h3",{id:"output-to-yaml-file"},"Output to yaml file"),Object(o.b)("p",null,"By default the ",Object(o.b)("inlineCode",{parentName:"p"},"k8s_on_prem.sh")," script will use ",Object(o.b)("inlineCode",{parentName:"p"},"kubectl apply")," to deploy BuildBuddy to your current Kubernetes cluster. If you'd like to output the Kubernetes deployment to a yaml file instead that can be checked in, you can use the ",Object(o.b)("inlineCode",{parentName:"p"},"-out")," flag:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"bash k8s_on_prem.sh -out my-buildbuddy-deployment.yaml\n")),Object(o.b)("h3",{id:"number-of-replicas"},"Number of replicas"),Object(o.b)("p",null,"By default the ",Object(o.b)("inlineCode",{parentName:"p"},"k8s_on_prem.sh")," script will deploy a single replica of BuildBuddy. If you've configured a MySQL database, storage, and other options necessary to support multiple replicas, you can increase the number of BuildBuddy replicas to deploy with the ",Object(o.b)("inlineCode",{parentName:"p"},"-replicas")," flag."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"bash k8s_on_prem.sh -replicas 3\n")),Object(o.b)("h3",{id:"restart-behavior"},"Restart behavior"),Object(o.b)("p",null,"By default the ",Object(o.b)("inlineCode",{parentName:"p"},"k8s_on_prem.sh")," will restart your BuildBuddy deployment to pick up any changes in your configuration file. This can lead to brief downtime if only one replica is deployed. You can disable this behavior with the ",Object(o.b)("inlineCode",{parentName:"p"},"-norestart")," flag."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"bash k8s_on_prem.sh -norestart\n")),Object(o.b)("h3",{id:"enterprise-deployment"},"Enterprise deployment"),Object(o.b)("p",null,"If you've obtained a BuildBuddy enterprise license, you deploy enterprise BuildBuddy by specifying the ",Object(o.b)("inlineCode",{parentName:"p"},"-enterprise")," flag."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"bash k8s_on_prem.sh -enterprise\n")),Object(o.b)("h2",{id:"helm"},"Helm"),Object(o.b)("p",null,"If you run or have access to a Kubernetes cluster and are comfortable with ",Object(o.b)("a",{parentName:"p",href:"https://helm.sh/"},"Helm"),", we maintain official BuildBuddy Helm charts that are easy to configure and deploy."),Object(o.b)("p",null,"They have options to deploy everything necessary to use all of BuildBuddy's bells and whistles - including MySQL, nginx, and more."),Object(o.b)("p",null,"The official BuildBuddy charts live in our ",Object(o.b)("a",{parentName:"p",href:"https://github.com/buildbuddy-io/buildbuddy-helm"},"buildbuddy-helm repo")," and can be added to helm with the following command:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"helm repo add buildbuddy https://helm.buildbuddy.io\n")),Object(o.b)("p",null,"You can the deploy BuildBuddy Open Source with the following command:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"helm install buildbuddy buildbuddy/buildbuddy \\\n  --set mysql.mysqlUser=sampleUser \\\n  --set mysql.mysqlPassword=samplePassword\n")),Object(o.b)("p",null,"For more information on configuring your BuildBuddy Helm deploy, check out the charts themselves:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"https://github.com/buildbuddy-io/buildbuddy-helm/tree/master/charts/buildbuddy"},"BuildBuddy Open Source")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"https://github.com/buildbuddy-io/buildbuddy-helm/tree/master/charts/buildbuddy-enterprise"},"BuildBuddy Enterprise"))),Object(o.b)("h2",{id:"configuring-buildbuddy"},"Configuring BuildBuddy"),Object(o.b)("p",null,"For documentation on all BuildBuddy configuration options, check out our ",Object(o.b)("a",{parentName:"p",href:"/docs/config"},"configuration documentation"),"."))}c.isMDXComponent=!0},115:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=a.a.createContext({}),c=function(e){var t=a.a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},b=function(e){var t=c(e.components);return a.a.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},p=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,d=u(e,["components","mdxType","originalType","parentName"]),b=c(n),p=r,m=b["".concat(l,".").concat(p)]||b[p]||s[p]||o;return n?a.a.createElement(m,i(i({ref:t},d),{},{components:n})):a.a.createElement(m,i({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=p;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var d=2;d<o;d++)l[d]=n[d];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);