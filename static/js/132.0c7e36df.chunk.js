"use strict";(self.webpackChunkreact_admin=self.webpackChunkreact_admin||[]).push([[132],{9878:function(e,t,n){var r=n(3433),a=n(4165),i=n(5861),o=n(9439),c=n(2949),u=n(1607),s=n(3967),l=n(2791),p=n(8846),f=n(184);t.Z=function(e){var t=e.isDashboard,n=void 0!==t&&t,d=(0,s.Z)(),h=(0,u.TV)(d.palette.mode),v=(0,l.useState)([]),x=(0,o.Z)(v,2),g=x[0],m=x[1];return(0,l.useEffect)((function(){var e=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(){var t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,p.G)();case 2:t=e.sent,m(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),(0,l.useEffect)((function(){var e=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,p.kv)((function(e){var t=g.findIndex((function(t){return t.id===e.ShopName}));if(t>=0){var n=(0,r.Z)(g);n[t]={id:e.ShopName,value:e.Revenue},m(n)}}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();g.length>0&&e()}),[g]),(0,f.jsx)(c.jM,{data:g,theme:{axis:{domain:{line:{stroke:h.grey[100]}},legend:{text:{fill:h.grey[100]}},ticks:{line:{stroke:h.grey[100],strokeWidth:1},text:{fill:h.grey[100]}}},legends:{text:{fill:h.grey[100]}},tooltip:{container:{background:h.grey[900],color:h.grey[100]}}},margin:{top:30,right:40,bottom:50,left:70},padding:.4,valueScale:{type:"linear"},indexScale:{type:"band",round:!0},colors:{scheme:"nivo"},defs:[{id:"lines",type:"patternLines",background:"inherit",color:"#eed312",rotation:-45,lineWidth:6,spacing:10}],fill:[{match:{id:"value"},id:"lines"}],borderColor:{from:"color",modifiers:[["darker","1.6"]]},axisTop:null,axisRight:null,axisBottom:{tickSize:5,tickPadding:5,tickRotation:0,legend:n?void 0:"Shop Name",legendPosition:"middle",legendOffset:32},axisLeft:{tickSize:5,tickPadding:5,tickRotation:0,legend:n?void 0:"Einnahmen",legendPosition:"middle",legendOffset:-55},enableLabel:!0,labelSkipWidth:12,labelSkipHeight:12,labelTextColor:{from:"color",modifiers:[["darker",1.6]]},animate:!0,motionStiffness:90,motionDamping:15})}},7084:function(e,t,n){var r=n(3967),a=n(4554),i=n(890),o=n(1607),c=n(184);t.Z=function(e){var t=e.title,n=e.subtitle,u=(0,r.Z)(),s=(0,o.TV)(u.palette.mode);return(0,c.jsxs)(a.Z,{mb:"30px",children:[(0,c.jsx)(i.Z,{variant:"h2",color:s.grey[100],fontWeight:"bold",sx:{m:"0 0 5px 0"},children:t}),(0,c.jsx)(i.Z,{variant:"h5",color:s.greenAccent[400],children:n})]})}},8846:function(e,t,n){n.d(t,{Df:function(){return b},G:function(){return m},gf:function(){return y},kv:function(){return x}});var r=n(4165),a=n(5861),i=n(6296),o=n(2178),c="DBDatabase",u="Top10",s="10Shops",l=new o.gV("data-uilqj"),p=o.cN.apiKey("7PodJEFumzYtvIBgsWkiBMp5N1ifzHkrRMO9XTvRSxVBH5TIq5kJdXhLxE7RKWKM");function f(){return d.apply(this,arguments)}function d(){return(d=(0,a.Z)((0,r.Z)().mark((function e(){var t,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,l){e.next=4;break}return console.error("app is not defined"),e.abrupt("return");case 4:return e.next=6,l.logIn(p);case 6:return(n=e.sent).id!==(null===(t=l.currentUser)||void 0===t?void 0:t.id)&&console.error("User is not logged in"),console.log("User logged in:",n),e.abrupt("return",n);case 12:e.prev=12,e.t0=e.catch(0),console.error("Failed to log in",e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}function h(){return v.apply(this,arguments)}function v(){return(v=(0,a.Z)((0,r.Z)().mark((function e(){var t,n,a,i,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===(t=l.currentUser)||void 0===t){e.next=4;break}e.t0=t,e.next=7;break;case 4:return e.next=6,f();case 6:e.t0=e.sent;case 7:if(n=e.t0,a=n.mongoClient(c),i=a.db(u)){e.next=12;break}throw new Error("Failed to connect to database ".concat(u));case 12:if(o=i.collection(s)){e.next=15;break}throw new Error("Failed to connect to collection ".concat(s));case 15:return e.abrupt("return",o);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(e){return g.apply(this,arguments)}function g(){return(g=(0,a.Z)((0,r.Z)().mark((function e(t){var n,a,o,c,u,s,l,p,f;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h();case 3:return n=e.sent,e.next=6,n.watch();case 6:a=e.sent,o=!1,c=!1,e.prev=9,s=(0,i.Z)(a);case 11:return e.next=13,s.next();case 13:if(!(o=!(l=e.sent).done)){e.next=23;break}return p=l.value,e.next=17,n.findOne({_id:p.documentKey._id});case 17:f=e.sent,"function"===typeof t&&t(f),console.log("Data changed:",f);case 20:o=!1,e.next=11;break;case 23:e.next=29;break;case 25:e.prev=25,e.t0=e.catch(9),c=!0,u=e.t0;case 29:if(e.prev=29,e.prev=30,!o||null==s.return){e.next=34;break}return e.next=34,s.return();case 34:if(e.prev=34,!c){e.next=37;break}throw u;case 37:return e.finish(34);case 38:return e.finish(29);case 39:return e.abrupt("return",(function(){a.close()}));case 42:e.prev=42,e.t1=e.catch(0),console.error("Failed to watch collection",e.t1);case 45:case"end":return e.stop()}}),e,null,[[0,42],[9,25,29,39],[30,,34,38]])})))).apply(this,arguments)}function m(){return k.apply(this,arguments)}function k(){return(k=(0,a.Z)((0,r.Z)().mark((function e(){var t,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h();case 2:return t=e.sent,e.next=5,t.aggregate([{$sort:{Revenue:-1}},{$project:{_id:0,id:"$ShopName",label:"$ShopName",value:"$Revenue"}}]);case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(){return Z.apply(this,arguments)}function Z(){return(Z=(0,a.Z)((0,r.Z)().mark((function e(){var t,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h();case 2:return t=e.sent,e.next=5,t.aggregate([{$group:{_id:null,sum:{$sum:"$Revenue"}}}]);case 5:return n=e.sent,e.abrupt("return",n[0].sum);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(){return w.apply(this,arguments)}function w(){return(w=(0,a.Z)((0,r.Z)().mark((function e(){var t,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h();case 2:return t=e.sent,e.next=5,t.aggregate([{$project:{ShopName:1,Country:1,Revenue:1,Year:1}},{$sort:{Revenue:-1}}]);case 5:return n=e.sent,console.log("DataShops:",n),e.abrupt("return",n);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},2132:function(e,t,n){n.r(t);var r=n(4554),a=n(7084),i=n(9878),o=n(184);t.default=function(){return(0,o.jsxs)(r.Z,{m:"20px",children:[(0,o.jsx)(a.Z,{title:"Bar Chart",subtitle:"Simple Bar Chart"}),(0,o.jsx)(r.Z,{height:"75vh",children:(0,o.jsx)(i.Z,{})})]})}}}]);
//# sourceMappingURL=132.0c7e36df.chunk.js.map