(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aa7a2"],{"10d1":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("EditForm")},n=[],s=a("2b0e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container my-4"},[a("div",{staticClass:"col-12 col-lg-12 d-flex flex-column"},[a("div",{staticClass:"input-group"},[a("input",{staticClass:"form-control",attrs:{type:"text",name:"contract-number",id:"contract-number",disabled:""},domProps:{value:t.contract}}),a("label",{staticClass:"input-group-text",attrs:{for:"contract-number"}},[t._v("رقم العقد")])]),a("form",{ref:"myForm",staticClass:"form-group",on:{submit:function(e){return e.preventDefault(),t.submitUpdate(e)}}},[t._m(0),t._m(1),t._m(2),a("button",{staticClass:"btn btn-primary btn-lg btn-block text-center my-5"},[t._v("حفظ")])]),t.updateStatus?a("div",[a("h2",{staticClass:"h2 text-center"},[t._v(t._s(t.updateStatus))])]):t._e()])])},c=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"input-group mt-3"},[a("label",{staticClass:"input-group-text",attrs:{for:"serial"}},[a("i",{staticClass:"fas fa-sort-numeric-up"})]),a("input",{staticClass:"form-control rtl",attrs:{required:"",type:"number",name:"serial",id:"serial","data-id":"monthlySerial"}}),a("label",{staticClass:"input-group-text",attrs:{for:"serial"}},[t._v("مسلسل")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"input-group mt-3"},[a("label",{staticClass:"input-group-text",attrs:{for:"amount"}},[a("i",{staticClass:"fas fa-dollar-sign"})]),a("input",{staticClass:"form-control rtl",attrs:{required:"",type:"number",name:"amount",id:"amount","data-id":"payment"}}),a("label",{staticClass:"input-group-text",attrs:{for:"amount"}},[t._v("القيمة المالية")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"input-group mt-3"},[a("label",{staticClass:"input-group-text",attrs:{for:"date"}},[a("i",{staticClass:"fas fa-calendar-week"})]),a("input",{staticClass:"form-control rtl",attrs:{required:"",type:"date",name:"date",id:"date","data-id":"enterDate",placeholder:"yyyy-mm-dd"}}),a("label",{staticClass:"input-group-text",attrs:{for:"date"}},[t._v("تاريخ التسجيل")])])}],o=(a("4160"),a("d3b7"),a("820e"),a("3ca3"),a("159b"),a("ddb0"),a("96cf"),a("1da1")),u=a("5530"),l=a("2f62"),d=a("c1df"),p=a.n(d),m=s["default"].extend({watch:{$route:function(){this.initPage()}},created:function(){this.initPage()},data:function(){return{updateStatus:""}},computed:Object(u["a"])(Object(u["a"])(Object(u["a"])({},Object(l["c"])("contracts",{contractRecord:"record"})),Object(l["c"])("receipts",["isUpdatingData","isGettingData","record"])),{},{contractId:function(){return this.$route.params.contractId},contract:function(){var t,e;return null!==(t=null===(e=this.contractRecord)||void 0===e?void 0:e.contractNumber)&&void 0!==t?t:"loading..."},id:function(){return this.$route.params.id}}),methods:{initPage:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Promise.allSettled([t.$store.dispatch("contracts/downloadRecord",t.contractId),t.$store.dispatch("receipts/downloadRecord",t.id)]);case 2:a=t.$refs.myForm.querySelectorAll("input"),a.forEach((function(e){if("date"===e.getAttribute("type")&&t.record[e.dataset.id]){var a=p()(new Date(t.record[e.dataset.id])).format("yyyy-MM-DD");e.value=a}else e.value=t.record[e.dataset.id]}));case 4:case"end":return e.stop()}}),e)})))()},submitUpdate:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var r,n,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=t.target.querySelectorAll("input"),n={},r.forEach((function(t){var e;(null===(e=t.dataset)||void 0===e?void 0:e.id)&&(n[t.dataset.id]=t.value)})),e.updateStatus="",a.next=6,e.$store.dispatch("receipts/updateRecord",{id:e.id,updateParams:n});case 6:s=a.sent,e.updateStatus="ok"===s?"تم الحفظ":s;case 8:case"end":return a.stop()}}),a)})))()}}}),f=m,b=a("2877"),v=Object(b["a"])(f,i,c,!1,null,null,null),h=v.exports,g=s["default"].extend({components:{EditForm:h}}),C=g,y=Object(b["a"])(C,r,n,!1,null,null,null);e["default"]=y.exports}}]);
//# sourceMappingURL=chunk-2d0aa7a2.26fc15aa.js.map