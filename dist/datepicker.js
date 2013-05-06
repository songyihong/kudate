define(function(a,b){function l(){this._init.apply(this,arguments)}function m(a,b){var e,g,h,c=void 0!=arguments[2]?arguments[2]:1,d=void 0!=arguments[3]?arguments[3]:!0;this.oToday=f.getDateByStringDate(a),this.sToday=a,this.sminDate=b;var i=this.oToday.getDay();this.getWeekDay=1===c?0==i?7:i:i+1,this.getMonthDay=this.oToday.getDate(),this.today_date=this.sToday+"至"+this.sToday;var j=f.getDate(this.sToday,-1);this.yesterday_date=f.compare_date(this.sminDate,j)?j+"至"+j:null;var k=f.getDate(this.sToday,-7);this.last7_date=f.compare_date(this.sminDate,k)?k+"至"+this.sToday:d?this.sminDate+"至"+this.sToday:null;var l=f.getDate(this.sToday,-30);this.last30_date=f.compare_date(this.sminDate,l)?l+"至"+this.sToday:d?this.sminDate+"至"+this.sToday:null;var m="";m=0===i?f.getDate(this.sToday,-7):1===i?this.sToday:f.getDate(this.sToday,-i),e=1===c?m:f.getDate(m,-1),this.week_date=f.compare_date(this.sminDate,e)?e+"至"+this.sToday:d?this.sminDate+"至"+this.sToday:null;var n="";n=1===this.getMonthDay?this.sToday:f.getDate(this.sToday,-this.getMonthDay);var o=n;this.month_date=f.compare_date(this.sminDate,o)?n+"至"+this.sToday:d?this.sminDate+"至"+this.sToday:null,1===c?(g=f.getDate(m,-8),h=f.getDate(m,-1)):(g=f.getDate(m,-9),h=f.getDate(m,-3)),f.compare_date(this.sminDate,g)||(g=d?this.sminDate:null),f.compare_date(this.sminDate,h)||(h=null),this.lastweek_date=null!=h&&null!=g?g+"至"+h:null;var p=f.getMonthDays(this.oToday),q=f.getDate(n,-p-1),r=f.getDate(n,-1);f.compare_date(this.sminDate,q)||(q=null),f.compare_date(this.sminDate,r)||(r=d?this.sminDate:null),this.lastmonth_date=null!=q&&null!=r?q+"至"+r:null,this.prev_date=function(a){return f.getPrevSameTime(a,this.sminDate,this.sToday,!0,!0)}}var d=a("jquery"),e={},f={formatNum:function(a){return a.toString().replace(/^(\d)$/,"0$1")},formatStrDate:function(a){switch(typeof a){case"string":return a=a.split(/-|\//g),a[0]+"-"+this.formatNum(a[1])+"-"+this.formatNum(a[2]);case"object":return a.getFullYear()+"-"+this.formatNum(a.getMonth()+1)+"-"+this.formatNum(a.getDate())}},formatIntDate:function(a){return this.formatStrDate(a).replace(/-|\//g,"")},getThreeDays:function(a,b){var a,f,c={},d=a.split(/-|\//g);for(f=0;7>f;f++)a=this.formatStrDate(new Date(d[0],d[1]-1,d[2]-0+(f-3))),c[a]=b+(3!=f?(3>f?"前":"后")+Math.abs(f-3)+"天":""),f>2&&(e[a]=b+(3!=f?(3>f?"前":"后")+Math.abs(f-3)+"天":""));return c},addObject:function(a,b){for(var c in b)a[c]||(a[c]=b[c])},getPos:function(a){var b=document.documentElement.scrollTop||document.body.scrollTop,c=document.documentElement.scrollLeft||document.body.scrollLeft,d=a.getBoundingClientRect();return{top:d.top+b,left:d.left+c-11,right:d.right+c,bottom:d.bottom+b}},$:function(a,b){switch(a.charAt(0)){case"#":return document.getElementById(a.substring(1));case".":var g,c=new RegExp("(^|\\s)"+a.substring(1)+"(\\s|$)"),d=[],e=f.$("*",b);for(g=0;e.length>g;g++)c.test(e[g].className)&&d.push(e[g]);return d;default:return(b||document).getElementsByTagName(a)}},indexOf:function(a,b){for(var c=b.length;c--;)if("string"==typeof a?this.hasClass(b[c].children[0]||b[c],a):a==b[c])return c;return-1},hasClass:function(a,b){return new RegExp("(^|\\s)"+b+"(\\s|$)").test(a.className)},addClass:function(a,b){var c=a.className.split(/\s+/);this.hasClass(a,b)||c.push(b),a.className=c.join(" ").replace(/(^\s*)|(\s*$)/,"")},removeClass:function(a,b){a.className=a.className.replace(new RegExp("(^|\\s)"+b+"(\\s|$)","g"),"").split(/\s+/).join(" ")},on:function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)},halt:function(a){a=a||event,a.preventDefault?a.preventDefault():a.returnValue=!1,a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},contains:function(a,b){return a.contains?a.contains(b):a.compareDocumentPosition?!!(16&a.compareDocumentPosition(b)):void 0},toArray:function(a){for(var b=[],c=0,d=a.length;d>c;c++)b.push(a[c]);return b},getTimeByStringDate:function(a){return a&&"undefined"!==a?this.getDateByStringDate(a).getTime():void 0},getDateByStringDate:function(a){var b=/^\d{4}-\d{1,2}-\d{1,2}$/;if(!b.test(a))return!1;var c=a.split("-"),d=c[1];0===parseInt(d)?d=d.slice(1)-1:d-=1;var e=c[2];return 1===e.length&&(e="0"+e),new Date(c[0],d,e)},getDate:function(a,b){if(a&&b&&"number"==typeof b){parseInt(b)>1?b-=1:-1>parseInt(b)&&(b+=1);var c=a.split("-"),d=new Date(c[0],c[1]-1,c[2]).getTime(),b=864e5*b,e=d+b,f=new Date(e),g=f.getMonth()+1,h=f.getDate();return 10>parseInt(g)&&(g="0"+g),10>parseInt(h)&&(h="0"+h),f.getFullYear()+"-"+g+"-"+h}return a},getPrevSameTime:function(a,b,c,d,e){var g=a.split("至")[0],h=a.split("至")[1],i=this.getIntervalsByDates(b+"至"+g)-0,j=this.getIntervalsByDates(h+"至"+c)-0,k=this.getIntervalsByDates(a)-0;if(0===k)return d?null:f.getDate(g,-1)+"至"+f.getDate(g,-1);if(i>k){var l=f.getDate(g,-1),m=f.getDate(l,-k);return m+"至"+l}if(!e&&j>k){var l=f.getDate(h,1),m=f.getDate(l,k);return m+"至"+l}return d?null:a},getIntervalsByDates:function(a){var b=a.split("至")[0],c=a.split("至")[1];if(b===c)return 0;var d=this.getTimeByStringDate(b),e=this.getTimeByStringDate(c),f=parseInt((e-d)/864e5);return f>0?f+1:-f-1},getMonthDays:function(a){var b=a.getMonth(),c=a.getYear(),c=a.getYear();c+=2e3>c?1900:0,c=c,0==b&&(c-=1);var d=new Date(c,b,0),e=d.getDate();return e},getPrevMonthDays:function(a,b,c){var d=this.getDateByStringDate(a),e=this.getDateByStringDate(b);if(e.getTime()>d.getTime())return c?null:b+"至"+b;var f=d.getMonth()-0+1,g=d.getFullYear()-0,h=new Date(g,f-1,0),i=h.getDate(),j=h.getFullYear()+"-"+(h.getMonth()-0+1).toString().replace(/^(\d)$/,"0$1")+"-"+"01",k=h.getFullYear()+"-"+(h.getMonth()-0+1).toString().replace(/^(\d)$/,"0$1")+"-"+i;return this.getDateByStringDate(j).getTime()<e.getTime()&&(j=c?null:b),this.getDateByStringDate(k).getTime()<e.getTime()&&(k=null),j&&k?j+"至"+k:null},getPrevWeekDays:function(a,b,c){var d=this.getDateByStringDate(a),e=this.getDateByStringDate(b);if(e.getTime()>d.getTime())return c?null:b+"至"+b;var f=d.getDay()-0,g=this.getDate(a,-(7+f)),h=this.getDate(a,-(f+1));return this.getDateByStringDate(g).getTime()<e.getTime()&&(g=c?null:b),this.getDateByStringDate(h).getTime()<e.getTime()&&(h=null),g&&h?g+"至"+h:null},compare_date:function(a,b,c){var d=/^\d{4}-\d{2}-\d{2}$/;if(!d.test(a)||!d.test(b))return!1;var e=a.split("-"),f=new Date(e[0],e[1]-1,e[2]).getTime(),g=b.split("-"),h=new Date(g[0],g[1]-1,g[2]).getTime();return h>f?!0:f==h?c?!1:!0:!1}},g=['<div class="cal-container">',"<dl>",'<dt class="date"></dt>','<dt class="cal-sunday"><strong>日</strong></dt>',"<dt>一</dt>","<dt>二</dt>","<dt>三</dt>","<dt>四</dt>","<dt>五</dt>",'<dt  class="cal-saturday"><strong>六</strong></dt>',"<dd></dd>","</dl>","</div>"],h={today:"今天",yuandan:"元旦",chuxi:"除夕",chunjie:"春节",yuanxiao:"元宵",qingming:"清明",wuyi:"劳动",duanwu:"端午",zhongqiu:"中秋",guoqing:"国庆"},i={today:[f.formatStrDate(new Date)],yuandan:["2012-01-01","2013-01-01","2014-01-01","2015-01-01","2016-01-01","2017-01-01","2018-01-01","2019-01-01","2020-01-01"],chuxi:["2012-01-22","2013-02-09","2014-01-30","2015-02-18","2016-02-07","2017-01-27","2018-02-15","2019-02-04","2020-01-24"],chunjie:["2012-01-23","2013-02-10","2014-01-31","2015-02-19","2016-02-08","2017-01-28","2018-02-16","2019-02-05","2020-01-25"],yuanxiao:["2012-02-06","2013-02-24","2014-2-14","2015-03-05","2016-02-22","2017-02-11","2018-03-02","2019-02-19","2020-02-8"],qingming:["2012-04-04","2013-04-04","2014-04-05","2015-04-05","2016-04-04","2017-04-04","2018-04-05","2019-04-05","2020-04-04"],wuyi:["2012-05-01","2013-05-01","2014-05-01","2015-05-01","2016-05-01","2017-05-01","2018-05-01","2019-05-01","2020-05-01"],duanwu:["2012-06-23","2013-06-12","2014-06-02","2015-06-20","2016-06-09","2017-05-30","2018-06-18","2019-06-07","2020-06-25"],zhongqiu:["2012-09-30","2013-09-19","2014-09-08","2015-09-27","2016-09-15","2017-10-04","2018-09-24","2019-09-13","2020-10-01"],guoqing:["2012-10-01","2013-10-01","2014-10-01","2015-10-01","2016-10-01","2017-10-01","2018-10-01","2019-10-01","2020-10-01"]};for(var j in i)if("today"!=j)for(var k=0;i[j].length>k;k++)f.addObject(e,f.getThreeDays(i[j][k],h[j]));l.prototype={constructor:l,reg:/-|\//g,rDate:/^\d{4}-\d{1,2}-\d{1,2}$/,_init:function(a){if(a=a||{},this.isPopup=a.isPopup,this.id=this.isPopup?"C_"+ +new Date:a.id.replace(/^#/,"")||"C_"+ +new Date,this.container=f.$("#"+this.id)||document.createElement("div"),this.isSelect=a.isSelect,this.isPrevBtn=a.isPrevBtn,this.isNextBtn=a.isNextBtn,this.isCloseBtn=a.isCloseBtn,this.isSimple=a.isSimple,this.isHoliday=a.isHoliday,this.isHolidayTips=a.isHolidayTips,this.isReadonly=a.isReadonly,this.isDateInfo=a.isDateInfo,this.dateInfoClass=a.dateInfoClass||"date-info",this.isMessage=a.isMessage,this.sMessage=a.sMessage||"",this.CalStart=a.CalStart||null,this.isCalStart=a.isCalStart,this.CalEnd=a.CalEnd||null,this.isCalEnd=a.isCalEnd,this.count=a.count||1,this.monthStep=a.monthStep||this.count,this.revise={left:0,top:0},this.triggerNode=f.$("#"+a.id.replace(/^#/,"")),this.idName=a.id.replace(/^#/,""),this.date=a.date||new Date,this.year=this.date.getFullYear(),this.month=f.formatNum(this.date.getMonth()+1),this.startDate=a.startDate,this._startDate=this.startDate,this.endDate=a.endDate,this._endDate=this.endDate,this.selectDate=a.selectDate&&f.formatStrDate(a.selectDate),this.berfore=a.berfore||function(){},this.submit=a.submit||function(){var a=this.triggerNode.value;d(this.triggerNode).attr("data-info",a)},this.cancel=a.cancel||function(){var a=d(this.triggerNode).attr("data-info");this.triggerNode.value=a},this.today=a.today||f.formatStrDate(new Date),i.today[0]=this.today,this.triggerNode){this.range=a.range||{minDate:null,maxDate:null},this.rangeday=a.rangeday-0||31,this.weekstart=a.weekstart||1,this._quickdate={},this.isquickselect=a.isquickselect||0,this._html=a.html||0,this.html=this.isquickselect?this._html||this._getrightstr():"",this._clickcount=1,this._clickdate="",this._create(),this._addEvent(),this.on("dateClick",this.dateClick);var b=this;d("#cal-mask").click(function(){b.cancel(),b.hide()})}},_getquickdate:function(){var a=this,b=new m(a.today,a.startDate,this.weekstart);if(a._quickdate={},a.isCalEnd){if(void 0!=a.CalStart){var c=a.CalStart.triggerNode.value,d=f.getIntervalsByDates(c);if(0==d){var e=f.getDate(c.split("至")[0],-1),g=f.getDate(c.split("至")[0],-8);a._quickdate.prev_1_date=a.startDate&&f.compare_date(e,a.startDate,!0)?null:e+"至"+e,a._quickdate.prev_week_date=a.startDate&&f.compare_date(g,a.startDate,!0)?null:g+"至"+g;var h=f.getDateByStringDate(c.split("至")[0]),i=h.getYear();i+=2e3>i?1900:0,i=i;var j=new Date(i,h.getMonth()-1,h.getDate());j=f.formatStrDate(j),a._quickdate.prev_month_date=a.startDate&&f.compare_date(j,a.startDate,!0)?null:j+"至"+j}else switch(a._getdatekey(c)){case"last7_date":var k=f.getPrevSameTime(c,a.startDate,a.endDate,!0,!0);a._quickdate.prev_7_date=k?k:null;break;case"last30_date":var l=f.getPrevSameTime(c,a.startDate,a.endDate,!0,!0);a._quickdate.prev_30_date=l?l:null;break;case"week_date":var n=f.getPrevWeekDays(c.split("至")[0],a.startDate);a._quickdate.prev_week_dates=n?n:null;break;case"lastweek":var n=f.getPrevWeekDays(c.split("至")[0],a.startDate);a._quickdate.prev_week_dates=n?n:null;break;case"month_date":var o=f.getPrevMonthDays(c.split("至")[0],a.startDate);a._quickdate.prev_month_dates=o?o:null;break;case"lastmonth_date":var o=f.getPrevMonthDays(c.split("至")[0],a.startDate);a._quickdate.prev_month_dates=o?o:null;break;case"other":var p=f.getPrevSameTime(c,a.startDate,a.endDate,!0,!0);a._quickdate.prev_same_date=p?p:null}}}else a._quickdate.today_date=b.today_date,a._quickdate.yesterday_date=b.yesterday_date,a._quickdate.last7_date=b.last7_date,a._quickdate.last30_date=b.last30_date,a._quickdate.week_date=b.week_date,a._quickdate.lastweek_date=b.lastweek_date,a._quickdate.month_date=b.month_date,a._quickdate.lastmonth_date=b.lastmonth_date},_getdatekey:function(a){for(j in this.CalStart._quickdate)if(this.CalStart._quickdate[j]==a)return j;return"other"},_getrightstr:function(){this._getquickdate();var a='<ul class="right-select">',b=d(this.triggerNode).val();for(var c in this._quickdate)if(null!=this._quickdate[c]){switch(a+='<li><a href="javascript:" ',a+='class="'+c,b==this._quickdate[c]&&(a+=" cal-selected"),a+='" data-date="'+c+'">',c){case"today_date":a+="今天";break;case"yesterday_date":a+="昨天";break;case"last7_date":a+="最近7天";break;case"last30_date":a+="最近30天";break;case"week_date":a+="本周";break;case"lastweek_date":a+="上周";break;case"month_date":a+="本月";break;case"lastmonth_date":a+="上月";break;case"prev_1_date":a+="前一天";break;case"prev_week_date":a+="上周同期";break;case"prev_month_date":a+="上月同期";break;case"prev_7_date":a+="前7天";break;case"prev_30_date":a+="前30天";break;case"prev_week_dates":a+="前一周";break;case"prev_month_dates":a+="前一月";break;case"prev_same_date":a+="向前等长时间"}a+="</a></li>"}return a+="</ul>"},_create:function(){var a=[],b=0,c=null,e=document.createElement("div"),f=document.createElement("div");for(d(this.triggerNode).addClass("datepickerinput"),a.push('<div class="right_quickButton">'+this.html+"</div>"),a.push('<div class="cal-outerbox">'),a.push('<div class="cal-box">'),this.isPrevBtn&&a.push('<span class="cal-prev">prev</span>'),this.isNextBtn&&a.push('<span class="cal-next">next</span>'),b=this.count;b--;)a=a.concat(g);if(a.push("</div>"),a.push("</div>"),a.push('<div class="bottom_button"><a class="button-submit submitA a_0 ">确定</a><a class="button-close blue12">关闭</a></div>'),e.className="calendar",e.innerHTML=a.join(""),this.container.id=this.id,this.container.className="datepicker_container",this.isCloseBtn){var h=document.createElement("div");h.className="cal-close",h.innerHTML="close",this.container.appendChild(h)}this.container.appendChild(e),this.isMessage&&(this.oMsg=f,f.className="cal-msg",f.innerHTML=this.sMessage,f.style.display=this.sMessage?"block":"none",this.container.insertBefore(f,e)),!!window.ActiveXObject&&!window.XMLHttpRequest&&(c=document.createElement("iframe"),this.container.appendChild(c)),document.getElementById(this.id)||document.body.appendChild(this.container);var i=document.createElement("div");if(i.id="cal-mask",i.style.display="none",document.getElementById("cal-mask")||document.body.appendChild(i),c){var j=c.style;j.position="absolute",j.top=j.left="0px",j.filter="alpha(opacity=0)",j.zIndex=-1,j.border=0,j.width=this.container.offsetWidth+"px",j.height=this.container.offsetHeight+"px"}this.isPopup&&(this.hide().container.style.position="absolute"),d(this.triggerNode).attr("data-info",this.triggerNode.value),this.render(),"INPUT"===this.triggerNode.tagName.toUpperCase()&&(this.isReadonly&&(this.triggerNode.readOnly=!0),this.isDateInfo&&(this.triggerNodeParent=document.createElement("div"),this.oDateInfo=document.createElement("span"),this.oDateInfo.className=this.dateInfoClass,this.triggerNode.style.position="absolute",this.triggerNodeParent.style.position="relative",this.triggerNodeParent.style.display="inline-block",this.triggerNodeParent.style.width=this.triggerNode.offsetWidth+"px",this.triggerNodeParent.style.height=this.triggerNode.offsetHeight+"px",this.triggerNode.parentNode.insertBefore(this.triggerNodeParent,this.triggerNode),this.triggerNodeParent.appendChild(this.triggerNode),this.triggerNodeParent.appendChild(this.oDateInfo)),""!=this.triggerNode.value&&this.setDateInfo(this.triggerNode.value))},_draw:function(a,b){var h,i,j,k,c=this,d=a.getElementsByTagName("dt")[0],e=a.getElementsByTagName("dd")[0],f=document.createDocumentFragment(),g=document.createDocumentFragment();if(this.isSelect){for(j=document.createElement("div"),this.selectYear=document.createElement("select"),this.selectMonth=document.createElement("select"),i=document.createDocumentFragment(),k=(new Date).getFullYear();k>=1900;k--)h=document.createElement("option"),h.value=h.innerHTML=k,h.selected=this.year==k,f.appendChild(h);for(k=1;12>=k;k++)h=document.createElement("option"),h.value=h.innerHTML=k,h.selected=this.month==k,g.appendChild(h);this.selectYear.appendChild(f),this.selectMonth.appendChild(g),j.appendChild(this.selectYear),j.appendChild(this.selectMonth),j.appendChild(document.createTextNode("月")),j.insertBefore(document.createTextNode("年"),this.selectMonth),d.innerHTML="",d.appendChild(j),this.selectYear.onchange=this.selectMonth.onchange=function(){c.render(new Date(c.selectYear.value,c.selectMonth.value-1))}}else d.innerHTML=b.year+"年"+b.month+"月";e.innerHTML="",e.appendChild(this._createDays(b.year,b.month))},_createDays:function(a,b){var j,k,l,m,n,c=new Date(a,b,0).getDate(),d=new Date(a,b-1,1).getDay(),e=[],i=document.createDocumentFragment();for(j=d;j--;)e.push(0);for(j=1;c>=j;j++)e.push(j);for(;e.length;)for(j=0,k=e.length;k>j;j++)if(e.length){if(m=document.createElement("a"),$(m).attr({info:"datepicker"}),l=e.shift()){if(m.href="javascript:void(0);",m.innerHTML=l,m["data-date"]=f.formatStrDate(a+"-"+b+"-"+l),n=f.formatIntDate(m["data-date"]),this.startDate&&f.formatIntDate(this.startDate)>n&&(m.className="disabled"),this.endDate&&n>f.formatIntDate(this.endDate)&&(m.className="disabled"),this.isHoliday)for(var o in h)this._isHoliday(m,o);this.selectDate==m["data-date"]&&((m.children[0]||m).className="selected"),this.startDate==m["data-date"]&&((m.children[0]||m).className="start-date"),this.endDate==m["data-date"]&&((m.children[0]||m).className="end-date"),this.range.minDate&&this.range.maxDate&&n>=f.formatStrDate(this.range.minDate).replace(this.reg,"")&&f.formatStrDate(this.range.maxDate).replace(this.reg,"")>=n&&((m.children[0]||m).className="select-range")}else m.className="disabled",m.innerHTML="&nbsp;";i.appendChild(m)}return i},_isHoliday:function(a,b){new RegExp(a["data-date"]).test(i[b].join())&&(a.className+=" "+b,a.innerHTML="<span>"+h[b]+"</span>")},_setPos:function(){var a=d(this.triggerNode).offset(),b=d(this.triggerNode).outerHeight(!0),c=d("#"+this.id+" .right_quickButton").outerWidth(!0),e=a.left,f=a.top+b;this.container.style.top=f+this.revise.top+"px",this.container.style.left=e+this.revise.left+"px",this.container.style.width=c+232*(this.count-0)+1+"px"},_addEvent:function(){var a=this,b=this.container,c=new m(a.today,a.startDate,this.weekstart);f.on(b,"click",function(e){a.isHide=!0,a.closeTimer&&clearTimeout(a.closeTimer),e=e||event;var g=e.target||e.srcElement;if(d(g).hasClass("submitA")&&!d(g).hasClass("button-submit"))return!0;switch(g.className&&g.className.indexOf(" ")>1&&(g.className=g.className.split(" ")[0]),d(a.triggerNode).val(),a.isCalEnd?d(a.CalStart.triggerNode).val():null,g.className){case"cal-close":a.cancel(),a.hide();break;case"button-close":a.cancel(),a.hide();break;case"button-submit":a.submit(a.triggerNode.value),a.hide();break;case"cal-prev":a.prevMonth();break;case"cal-next":a.nextMonth();break;case"today_date":a.setQuickDateInfo(c.today_date);break;case"yesterday_date":a.setQuickDateInfo(c.yesterday_date);break;case"last7_date":a.setQuickDateInfo(c.last7_date);break;case"last30_date":a.setQuickDateInfo(c.last30_date);break;case"week_date":a.setQuickDateInfo(c.week_date);break;case"lastweek_date":a.setQuickDateInfo(c.lastweek_date);break;case"month_date":a.setQuickDateInfo(c.month_date);break;case"lastmonth_date":a.setQuickDateInfo(c.lastmonth_date);break;case"prev_1_date":a.setQuickDateInfo(a._quickdate.prev_1_date);break;case"prev_month_dates":a.setQuickDateInfo(a._quickdate.prev_month_dates);break;case"prev_week_dates":a.setQuickDateInfo(a._quickdate.prev_week_dates);break;case"prev_week_date":a.setQuickDateInfo(a._quickdate.prev_week_date);break;case"prev_month_date":a.setQuickDateInfo(a._quickdate.prev_month_date);break;case"prev_7_date":a.setQuickDateInfo(a._quickdate.prev_7_date);break;case"prev_30_date":a.setQuickDateInfo(a._quickdate.prev_30_date);break;case"prev_same_date":a.setQuickDateInfo(a._quickdate.prev_same_date)}g.className&&"A"===g.tagName.toUpperCase()&&(d("#"+a.id+" a").removeClass("cal-selected").parent().removeClass("calSelected"),d("#"+a.id+" a."+g.className).addClass("cal-selected").parent().addClass("calSelected")),"A"===g.parentNode.tagName.toUpperCase()&&(g=g.parentNode),"A"===g.tagName.toUpperCase()&&"disabled"!=g.className&&"datepicker"===$(g).attr("info")&&a.run("dateClick",g),a.isPopup&&f.contains(b,g)&&f.halt(e)}),this.isPopup&&(d(this.triggerNode).off("focus"),f.on(this.triggerNode,"focus",function(b){d(".datepicker_container").hide(),a.isHide=!1,a.closeTimer&&clearTimeout(a.closeTimer),b=b||event;var c=b.target||b.srcElement,e=f.$("iframe",a.container)[0];d("#"+this.id+" div.datepicker_container").hide(),a.berfore(a.triggerNode.value),a.setDateInfo(a.triggerNode.value),a.html=a.isquickselect?a._html||a._getrightstr():"",d("#"+a.id+" .right_quickButton").html(a.html),5>d("#"+a.id+" .right-select li").length&&d("#"+a.id+" .right-select").width(85),a.show(),a._setPos(),c.select&&c.select(),e&&(e.style.width=a.container.offsetWidth+"px",e.style.height=a.container.offsetHeight+"px")}),f.on(window,"resize",function(){a._setPos()})),this.oDateInfo&&f.on(this.oDateInfo,"click",function(b){a.focus(),f.halt(b||event)})},render:function(a){var c,d,e,a=a||this.date,b=f.$(".cal-container",this.container);for(a="string"==typeof a?new Date(a.split(this.reg)[0],f.formatNum(a.split(this.reg)[1]-1)):a,c=a.getFullYear(),d=a.getMonth()+1,this.year=c,this.month=d,e=0,len=b.length;len>e;e++)c+=d+(e?1:0)>12?1:0,d=(d+(e?1:0))%12||12,this._draw(b[e],{year:c,month:d})},nextMonth:function(){var a=new Date(this.year,this.month+(this.monthStep-1),1);(this.endDate&&a.getTime()<f.getTimeByStringDate(this.endDate)||!this.endDate)&&(this.render(new Date(this.year,this.month+(this.monthStep-1),1)),this.run("nextMonthClick"))},prevMonth:function(){var a=new Date(this.year,this.month-this.monthStep,1);(this.startDate&&a.getTime()>f.getTimeByStringDate(this.startDate)||!this.startDate)&&(this.render(new Date(this.year,this.month-(this.monthStep+1),1)),this.run("prevMonthClick"))},show:function(){return this.container.style.display="block",document.getElementById("cal-mask").style.display="block",this.run("show"),this},hide:function(){return this.container.style.display="none",this.isMessage&&this.hideMessage(),document.getElementById("cal-mask").style.display="none",this.run("hide"),this},setDateInfo:function(a){if(this.triggerNode)if(this.isSimple)/^\d{4}-\d{1,2}-\d{1,2}$/.test(a)?(this.range.minDate=a,this.range.maxDate=a,this.triggerNode.value=a,this.render(a)):seajs.log("日期格式不正确");else{var c=a.split("至")[0],d=a.split("至")[1];if(/^\d{4}-\d{1,2}-\d{1,2}$/.test(c)&&/^\d{4}-\d{1,2}-\d{1,2}$/.test(d)){var e=f.getTimeByStringDate(c),g=f.getTimeByStringDate(d);g>e?(this.range.minDate=c,this.range.maxDate=d,this.triggerNode.value=a,this.render(c)):(this.range.minDate=d,this.range.maxDate=c,this.triggerNode.value=d+"至"+c,this.render(d))}else seajs.log("日期格式不正确")}},setQuickDateInfo:function(a){this.startDate=this._startDate,this.endDate=this._endDate,this._clickcount=1,this.setDateInfo(a)},getDate:function(a,b){var c=a.split(this.reg);return f.formatStrDate(new Date(c[0],c[1]-1,c[2]-0+(b||0)))},getDateInfo:function(a){var k,l,b=this,c=a.split(this.reg),d=new Date(c[0],c[1]-1,c[2]),g=["今天","明天","后天"],j="星期"+["日","一","二","三","四","五","六"][d.getDay()];return{week:j,holiday:function(){for(l in i)if(new RegExp(a).test(i[l]))return h[l];return k=f.formatIntDate(a)-f.formatIntDate(new Date),k>=0&&2>=k?g[k]:b.isHolidayTips?e[a]||j:j}()}},dateClick:function(a){if("right-select"!==d(a).parent().parent().attr("class")&&!d(a).hasClass("disabled")){if(d("#"+this.id+" .cal-selected").removeClass("cal-selected"),this.isSimple||0==this._clickcount%2)this.isSimple?(this._clickdate=a["data-date"],d("#"+this.id+" div.cal-container a").removeClass("select-range").removeClass("end-date").removeClass("start-date"),this.startDate=this._startDate,this.endDate=this._endDate,this.setDateInfo(this._clickdate)):(this.startDate=this._startDate,this.endDate=this._endDate,this.setDateInfo(this._clickdate+"至"+a["data-date"]),this.isquickselect&&this._checkdate(this._clickdate+"至"+a["data-date"]));else{this._clickdate=a["data-date"],d("#"+this.id+" div.cal-container a").removeClass("select-range").removeClass("end-date").removeClass("start-date");var b=f.getDate(this._clickdate,-this.rangeday),c=f.getDate(this._clickdate,this.rangeday);this.startDate=this._startDate&&f.compare_date(this._startDate,b)||!this._startDate?b:this._startDate,this.endDate=this._endDate&&!f.compare_date(this._endDate,c)||!this._endDate?c:this._endDate,this.setDateInfo(this._clickdate+"至"+this._clickdate),this.isquickselect&&this._checkdate(this._clickdate+"至"+this._clickdate)}this._clickcount++}},_checkdate:function(a){var b=a.split("至")[0],c=a.split("至")[1],e=f.getTimeByStringDate(b),g=f.getTimeByStringDate(c);e>g&&(a=c+"至"+b);for(j in this._quickdate)if(this._quickdate[j]==a){d("#"+this.id+" .cal-selected").removeClass("cal-selected"),d("#"+this.id+" ."+j).addClass("cal-selected");break}},showRange:function(){var a=this;f.on(this.container,"mouseover",function(b){function i(){for(g=d.length;g--;)f.removeClass(d[g].children[0]||d[g],"hover")}b=b||event;var g,c=b.target||b.srcElement,d=f.$("a",a.container),e=f.indexOf("start-date",d);if(a.startDate)if("A"===c.parentNode.tagName.toUpperCase()&&(c=c.parentNode),"A"===c.tagName.toUpperCase()){var h=f.indexOf(c,d);for(i(),g=e+1;h>g;g++)f.hasClass(d[g].children[0]||d[g],"end-date")||f.addClass(d[g].children[0]||d[g],"hover")}else i()})},focus:function(){this.triggerNode.focus()},keyup:function(){var a=this,b=a.CalStart,c=a.CalEnd;f.on(a.triggerNode,"keyup",function(d){d=d||event;var e=d.target||d.srcElement,g=e.value;a.rDate.test(g)?(g=f.formatStrDate(g),g!=(a.isCal_start?a.startDate:a.endDate)&&(a.isCalStart?(b.startDate=c.startDate=g,b.render(g),a.setDateInfo(a.triggerNode.value),c.render(c.endDate||g)):a.isCalEnd&&(b.endDate=c.endDate=g,c.render(g),a.setDateInfo(a.triggerNode.value),b.render()))):(a.isCalStart?(b.startDate=c.startDate="",b.render(new Date),c.render(new Date)):a.isCalEnd&&(b.endDate=c.endDate="",b.render(new Date),c.render(new Date)),a.setDateInfo(""))})},showMessage:function(a){this.oMsg&&(this.oMsg.innerHTML=a,this.oMsg.style.display="block",this.focus())},hideMessage:function(){this.oMsg&&(this.oMsg.style.display="none")},_addCustomEvent:function(a,b){this._eventQueue||(this._eventQueue={}),this._eventQueue[a]?this._eventQueue[a].push(b):this._eventQueue[a]=[b]},_delCustomEvent:function(a,b){var c=this._eventQueue[a];if(c)for(var d=c.length;d--;)c[d]==b&&(c[d]=null,c.splice(d,1))},_fireCustomEvent:function(a){if(this._eventQueue){var b=this._eventQueue[a];if(b)for(var c=0,d=b.length;d>c;c++)b[c]&&b[c].apply(this,arguments[1]||[])}},on:function(a,b){this._addCustomEvent(a,b)},un:function(a,b){this._delCustomEvent(a,b)},run:function(){var b=f.toArray(arguments);this._fireCustomEvent(b.shift(),b),this._setPos()}},b._CAL=f,b.Calendar=l,b.DateCommon=m});