(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(16),r=t.n(c),u=t(3),o=t(1),a=t(0),s=function(e){var n=e.filter,t=e.handleFilter;return Object(a.jsxs)("div",{children:["filter shown with: ",Object(a.jsx)("input",{value:n,onChange:t})]})},i=function(e){var n=e.name,t=e.number,c=e.deletePerson;return Object(a.jsxs)("li",{children:[n," ",t,Object(a.jsx)("button",{onClick:c,children:" delete"})]})},l=function(e){var n=e.persons,t=e.deletePerson;return Object(a.jsx)("ul",{children:n.map((function(e){return Object(a.jsx)(i,{name:e.name,number:e.number,deletePerson:t(e.id,e.name)},e.id)}))})},d=function(e){var n=e.newName,t=e.newNumber,c=e.handleNumberChange,r=e.handlePersonChange,u=e.addPerson;return Object(a.jsxs)("form",{onSubmit:u,children:[Object(a.jsxs)("div",{children:["name: ",Object(a.jsx)("input",{value:n,onChange:r})]}),Object(a.jsx)("br",{}),Object(a.jsxs)("div",{children:["number: ",Object(a.jsx)("input",{value:t,onChange:c})]}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{type:"submit",children:"add"})})]})},j=t(4),b=t.n(j),h="/api/",f=function(){return b.a.get("/api/people").then((function(e){return e.data}))},m=function(e){return b.a.post("/api/person",e).then((function(e){return e.data}))},O=function(e,n){return b.a.put("".concat(h,"person/").concat(e),n).then((function(e){return e.data}))},p=function(e){return b.a.delete("".concat(h,"people/").concat(e))},w=function(e){var n=e.message,t=e.messageClass;return null===n?null:Object(a.jsx)("div",{className:t,children:n})},g=function(){var e=Object(o.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],r=Object(o.useState)(""),i=Object(u.a)(r,2),j=i[0],b=i[1],h=Object(o.useState)(""),g=Object(u.a)(h,2),x=g[0],v=g[1],C=Object(o.useState)(""),S=Object(u.a)(C,2),P=S[0],y=S[1],N=Object(o.useState)(null),k=Object(u.a)(N,2),T=k[0],E=k[1],F=Object(o.useState)(""),J=Object(u.a)(F,2),L=J[0],A=J[1];Object(o.useEffect)((function(){f().then((function(e){c(e)})).catch((function(e){alert("Something went wrong.")}))}),[]);var B=P?t.filter((function(e){return e.name.toLowerCase().includes(P.toLowerCase())})):t;return Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Phonebook"}),Object(a.jsx)(w,{message:T,messageClass:L}),Object(a.jsx)(s,{filter:P,handleFilter:function(e){return y(e.target.value)}}),Object(a.jsx)("h3",{children:"add a new"}),Object(a.jsx)(d,{addPerson:function(e){e.preventDefault();var n={name:j,number:x},r=t.filter((function(e){return e.name===j}));if(0!==r.length)return window.confirm("".concat(j," is already added to phonebook, replace the old number with a new one?"))&&O(r[0].id,n).then((function(e){c(t.map((function(n){return n.id!==r[0].id?n:e}))),A("success"),E("".concat(j," was update successfully"))})).catch((function(e){A("error"),E("Something went wrong.")})),b(""),v(""),void setTimeout((function(){E(null)}),3e3);m(n).then((function(e){c(t.concat(e)),A("success"),E("".concat(j," was create successfully"))})).catch((function(e){A("error"),E("Something went wrong.")})),b(""),v(""),setTimeout((function(){E(null)}),3e3)},handlePersonChange:function(e){return b(e.target.value)},handleNumberChange:function(e){return v(e.target.value)},newName:j,newNumber:x}),Object(a.jsx)("h3",{children:"Numbers"}),Object(a.jsx)(l,{persons:B,deletePerson:function(e,n){return function(){window.confirm("Are you sure you want to delete ".concat(n,"?"))&&p(e).then((function(){c(t.filter((function(n){return n.id!==e}))),A("success"),E("".concat(n," was deleted successfully"))})).catch((function(e){A("error"),E("Something went wrong.")})),setTimeout((function(){E(null)}),3e3)}}})]})};t(40);r.a.render(Object(a.jsx)(g,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.27ee20f4.chunk.js.map