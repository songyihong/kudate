kudate
======
一个日期组件，直接选定单日期或多日期

如何使用
-----------
new  Calendar\(\[config\]\);//实例化日期  
日期格式规定：**YYYY-MM-DD**或__YYYY\\MM\\DD__  
双日期格式：**YYYY-MM-DD到YYYY-MM-DD** 或  __YYYY\\MM\\DD到YYYY\\MM\\DD__  
config:参数配置  
\{  
> **isPopup:** true/false,//是否弹出显示日期  
> **id:** id,//日历容器ID，为空则自动生成ID  
> **isSelect:** false/true,//是否可以选择，默认不可  
> **isPrevBtn:** false/true,//是否显示上个月按钮，默认不显示  
> **isNextBtn:** false/true,//是否显示下个月按钮，默认不显示  
> **isCloseBtn:** false/true,//是否显示关闭按钮，默认不显示  
> **isHoliday:** false/true,//是否显示特殊节假日，默认不显示  
> **isHolidayTips:** false/true,//是否显示特殊节假日前后三天，默认不显示  
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
> **revise:** \{*top:*0,_left:_0\},//日历部件位置微调  
> **date:** today,//突出渲染的日期，默认为今天  
> **selectDate:** null,//设置默认选择的日期范围  
> **html:** '',//日历右边html，默认空  
> **berfore:** function\(\)\{\},//日历出来前的行为  
> **submit:** function\(\)\{\},//点击提交时行为  
> **cancel** function\(\)\{\},//点击取消时行为  
> **today** today,//今天日期，默认为当前日期  
> **rang:** \{*minDate:* null,_maxDate:_ null\},//日历最小日期，最大日期，默认为不限制  

\}