#kudate
一个日期组件，直接选定单日期或多日期

##如何使用
var calendar=new  Calendar\(\[config\]\);//实例化日期  
日期格式规定：
**YYYY-MM-DD** 或 
__YYYY\\MM\\DD__  
双日期格式：
**YYYY-MM-DD到YYYY-MM-DD** 或 
__YYYY\\MM\\DD到YYYY\\MM\\DD__  
###1、config:参数配置  
\{  
> **isPopup:** true/false,//是否弹出显示日期  
> **id:** id,//日历容器ID，为空则自动生成ID  
> **isSelect:** false/true,//是否可以选择，默认不可  
> **isPrevBtn:** false/true,//是否显示上个月按钮，默认不显示  
> **isNextBtn:** false/true,//是否显示下个月按钮，默认不显示  
> **isCloseBtn:** false/true,//是否显示关闭按钮，默认不显示  
> **isHoliday:** false/true,//是否显示特殊节假日，默认不显示  
> **isHolidayTips:** false/true,//是否显示特殊节假日前后三天，默认不显示  
> **isReadonly:** false/true,//设置日历输入框是否只读，默认false  
> **isDateInfo:** false/true,//是否显示日期信息  
> **DateInfoClass:** 'data-info',//日期信息classname，默认为data-info  
> **isMessage:** false/true,//日历是否包含提示信息  
> **sMessage:** '',//日历提示信息内容默认为空  
> **CalStart:** null,//出发日期日历实例，一般可用在一个页面两个日历有关联关系，一个是开始，一个是结束  
> **isCalStart:** fasle/true,//是否为出发日历实例，默认否  
> **CalEnd:** null,//结束日历实例，默认为null，与CalStart对应使用  
> **isCalEnd:** false/true,//是否为结束日历实例，默认否  
> **startDate:** null,//日历开始日期  
> **endDate:** null,//日历结束日期，配合上面5个参数实现淘宝旅行网日期选择效果  
> **count:** 1,//日历的个数，默认为1个  
> **monthStep:** count,//上下个月的切换步长，默认为count值，即整块切换  
> **revise:** \{
_top:_0,
_left:_0\},//日历部件位置微调  
> **date:** today,//突出渲染的日期，默认为今天  
> **selectDate:** null,//设置默认选择的日期范围  
> **isquickselect:** null,//是否设置右边快捷日期，默认不设置  
> **html:** '',//日历右边html，默认空，如果isquickselect设为true,会根据系统自动生成右边快捷日期  
> **berfore:** function\(\)\{\},//日历出来前的行为  
> **submit:** function\(\)\{\},//点击提交时行为  
> **cancel:** function\(\)\{\},//点击取消时行为  
> **today:** today,//今天日期，默认为当前日期  
> **rangeday:** 31,//日历可选择的天数，默认为31天  
> **range:** \{
*minDate:* null,
*maxDate:* null\},//日历最小日期，最大日期，默认为不限制  

\}  
###2、自定义事件
自定义事件主要灵活用在处理日期时与外部的交互  
目前支持自定义事件类型：  
**show**:日期显示事件  
**hide**:日期隐藏事件  
**dateClick**:可点击日期事件  
**nextMonthClick**:下个月事件  
**prevMonthClick**:上个月事件  
添加自定义事件  
**calendar.on("元素",“事件类型”,“事件处理函数”)**

获取一些特定的日期
-----------
var assigndate=new DateCommon(today,sminDate);//实例化获取特殊日期，参数为今天日期\(YYYY-MM-DD\)、最小日期\(YYYY-MM-DD\)  
可以获得如下一些日期信息  
> **assigndate.getWeekDay** 今天是一周当中第几天  
> **assigndate.getMonthDay** 今天是一个月当中第几天  
> **assigndate.today_date** 返回今天日期，YYYY-MM-DD到YYYY-MM-DD，以下返回日期格式都是这种格式  
> **assigndate.yesterday_date** 返回昨天日期  
> **assigndate.last7_date** 返回最近7天  
> **assigndate.last30_date** 返回最近30天  
> **assigndate.week_date** 返回本周日期  
> **assigndate.month_date** 返回本月日期  
> **assigndate.lastweek_date** 返回上周日期  
> **assigndate.lastmonth_date** 返回上月日期  
> **assigndate.prev_date(sDate)** 参数sdate为\(YYYY-MM-DD到YYYY-MM-DD\)，返回在sminDate到today之间由sDate向前推或向后推跟sDate同天数的日期  
