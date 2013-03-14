define(function(require, exports, moudle) {

	var $ = require('jquery'), _ = require('underscore'), backbone = require('backbone'), c = require('util/common');
	var datepicker = require('util/datepicker');

	function TimeBar(st, et) {
	    this.st = st;
	    this.et = et;
	    this.siteId = $('#siteId').val();
	}


	TimeBar.prototype = {
		start : function() {
			this.set_gobal_time(this.st, this.et);
			this.view_barScroll();
			var method_action = $('#ajaxActionName').val();
			var controller = $('#controller').val();
			if(method_action && 'realtime' !== method_action && 'detail' !== method_action && 
					'updown' !== method_action && 'userview' !== method_action && 'funnel' !== method_action && !('flow' === method_action && controller === 'cont')
					) {
				this.view_datepicker();
			}
		},
		/**
		 * 全局时间 快捷 设置
		 */
		set_gobal_time : function(st, et) {
			var that = this;
			var today = $('#time_info_today').val();
			var yesterday = $('#time_info_yesterday').val();
			var ago7days = $('#time_info_ago7days').val();
			var ago30days = $('#time_info_ago30days').val();
			var add_stat_time = $('#time_info_add_stat_time').val();
			var controller = $('#controller').val();
			var method_action = $('#ajaxActionName').val();
			var siteId = $('#siteId').val();
			var tabIndex = $('#tab_index').val();

			//对最近7天和最近30天进行修正，如果最近7和30天比最小的时间还小，则返回最小的时间
			if(!cnzz.tongji.fn.compare_date(add_stat_time, ago7days)){
				ago7days = add_stat_time;
			}
			if(!cnzz.tongji.fn.compare_date(add_stat_time, ago30days)){
				ago30days = add_stat_time;
			}
			
			
			$('#time_tool_quick_key li:lt(4)').removeClass('selected');
			//今天 ，昨天， 最近30天 添加样式
			if(st === et && et === today) {
				$('#time_tool_today').addClass('selected');
				$('#time_select').val('one');
			} else if(st === et && et === yesterday) {
                $('#time_tool_yesterday').addClass('selected');
                $('#time_select').val('one');
			} else if(st === ago7days && et === today) {
			    $('#time_tool_7days').addClass('selected');
			    $('#time_select').val('day7');
			} else if(st === ago30days && et === today) {
				$('#time_tool_ago30days').addClass('selected');
				$('#time_select').val('day30');
			}

             /*
                                今日、昨日    前1日、后1日     今日时，后1日箭头禁用
                                最近30日    前30日、后30日   最近30日时，后30日箭头禁用
                                最近7日     前7日、后7日    最近7日时，后7日箭头禁用
                                本周、上周    前1周、后1周     本周时，后1周禁用
                                本月、上月    前1月、后1月    本月时，后1月禁用
                                其他       前1日、后1日     前1日是起始日的前1日，后1日是结束日的后1日。若没有则禁用
            */
			setChange();
			function setChange() {
				var selectTime = $('#time_select').val();
				var previous = $('#timePrevious'), next = $('#timeNext');
				if(selectTime === 'one' || selectTime === 'noSelect') {
					previous.attr({'title' : '前1日'});
					next.attr({'title' : '后1日'});					
					if(that.st === that.et){
						$('#time_select').val('one');
					}else{
						//给第二个对比的日历框用,来判断向前等成时间
						$('#time_select').val('noSelect');
					}
					
					interval = 1;
				} else if(selectTime === 'week') {
					previous.attr({'title' : '前1周'});
					next.attr({'title' : '后1周 '});
					interval = 7;
				}else if(selectTime === 'day7') {
					previous.attr({'title' : '前7日'});
					next.attr({'title' : '后7日'});
					interval = 7;
				}else if(selectTime === 'day30') {
                    previous.attr({'title' : '前30日'});
                    next.attr({'title' : '后30日'});
                    interval = 30;
                }else if(selectTime === 'month') {
                    previous.attr({'title' : '前1月'});
                    next.attr({'title' : '后1月'});
                    interval = 30;
                }else{
                	interval =  1;
                }
				//log(selectTime);
				$('#time_interval').val(interval);
			}
			var interval = $('#time_interval').val();
			
            
            var href = '#!/' + cnzz.tongji.global.timestamp() +  '/' + controller + '/' + method_action + '/' + tabIndex + '/' + siteId + '/';
			$('#time_tool_quick_key li:lt(4)').find('a').on('click', function() {
				var info = $(this).attr('info') - 0;
				if('compare' === method_action) {
					if(info === 1) {
						var preDate = datepicker._CAL.getPrevSameTime(today + '至' + today, add_stat_time, today);
						$(this).attr({
							'href' : href + today + '/' + today + '/' + preDate.split('至')[0] + '/' + preDate.split('至')[1]
						});
					} else if(info === -1) {
						var preDate = datepicker._CAL.getPrevSameTime(yesterday + '至' + yesterday, add_stat_time, today);
						$(this).attr({
							'href' : href + yesterday + '/' + yesterday + '/' + preDate.split('至')[0] + '/' + preDate.split('至')[1]
						});
					} else if(info === 7) {
						var preDate = datepicker._CAL.getPrevSameTime(ago7days + '至' + today, add_stat_time, today);
						$(this).attr({
							'href' : href + ago7days + '/' + today + '/' + preDate.split('至')[0] + '/' + preDate.split('至')[1]
						});
					}else if(info === 30) {
						var preDate = datepicker._CAL.getPrevSameTime(ago30days + '至' + today, add_stat_time, today);
						$(this).attr({
							'href' : href + ago30days + '/' + today + '/' + preDate.split('至')[0] + '/' + preDate.split('至')[1]
						});
					}

				} else {
					if(info === 1) {
						$(this).attr({
							'href' : href + today + '/' + today
						});
					} else if(info === -1) {
						$(this).attr({
							'href' : href + yesterday + '/' + yesterday
						});
					} else if(info === 7) {
						$(this).attr({
							'href' : href + ago7days + '/' + today
						});
					}else if(info === 30) {
					$(this).attr({
						'href' : href + ago30days + '/' + today
					});
				}
				}

			});
			//注册 前进 后退事件
			var timePrevious = $('#timePrevious'), timeNext = $('#timeNext');
			timePrevious.on({
				'hover' : function() {
				    if(checkPrevNextStyle()[0]){
    					$(this).toggleClass('previous_hover');
                    }
				},
				'click' : function() {
					
					if($(this).attr('class') && $(this).attr('class').indexOf('no_previous') !== -1){
						return false;
					}
					
					var interval = $('#time_interval').val() - 0;
					var st = $('#time_st').val();
					var et = $('#time_et').val();
					var today = $('#time_info_today').val();
		            var add_stat_time = $('#time_info_add_stat_time').val();
		            var selectTime = $('#time_select').val();
		            
					var _st, _et, sdates = [];
					if(interval === 30 && selectTime === 'month'){
						//自然月
						sdates = getDateByInterval(-interval, st, 1);
					}else{
						sdates = getDateByInterval(-interval, st);
					}
					if(st === et){
						_st = sdates[1];
						_et = sdates[1];
					}else{
						_st = sdates[0];
						_et = sdates[1];
					}
					
					
					if('compare' === method_action) {
						var preDate = datepicker._CAL.getPrevSameTime(_st + '至' + _et, add_stat_time, today);
						href = href + _st + '/' + _et + '/' + preDate.split('至')[0] + '/' + preDate.split('至')[1]
						backbone.history.navigate(href, {trigger : true});
					} else {
						href = href + _st + '/' + _et;
						backbone.history.navigate(href, {trigger : true});
					}					

				}
			});

			timeNext.on({
				'hover' : function() {
				    if(checkPrevNextStyle()[1]){
    					$(this).toggleClass('next_hover');
				    }
				},
				'click' : function() {
					if($(this).attr('class') && $(this).attr('class').indexOf('no_next') !== -1){
						return false;
					}
					
					var interval = $('#time_interval').val() - 0;
					var st = $('#time_st').val();
					var et = $('#time_et').val();
					var today = $('#time_info_today').val();
		            var add_stat_time = $('#time_info_add_stat_time').val();
		            var selectTime = $('#time_select').val();
					
					var _st, _et, sdates = [];
					if(interval === 30  && selectTime === 'month'){
						//自然月
						interval = 30;
						sdates = getDateByInterval(interval, et, 1);
					}else{
						sdates = getDateByInterval(interval, et);
					}
					if(st === et){
						_st = sdates[0];
						_et = sdates[0];
					}else{
						_st = sdates[0];
						_et = sdates[1];
					}
					
					if('compare' === method_action) {
						var preDate = datepicker._CAL.getPrevSameTime(_st + '至' + _et, add_stat_time, today);
						href = href + _st + '/' + _et + '/' + preDate.split('至')[0] + '/' + preDate.split('至')[1]
						backbone.history.navigate(href, {trigger : true});
					} else {
						href = href + _st + '/' + _et;
						backbone.history.navigate(href, {trigger : true});
					}
					
				}
			});
			
			checkPrevNextStyle();
			/**
			 * 检测前进后退的样式
			 */
			function checkPrevNextStyle(){
			    var array = [];
			    var today = $('#time_info_today').val();
                var add_stat_time = $('#time_info_add_stat_time').val();
                var st = $('#time_st').val();
                var et = $('#time_et').val();
                if(st === add_stat_time){
                    $('#timePrevious').removeClass().addClass('no_previous');
                    array[0] = false;
                }else{
                    $('#timePrevious').removeClass('no_previous').addClass('previous');
                    array[0] = true;
                }
                
                if(et === today){
                    $('#timeNext').removeClass().addClass('no_next');
                    array[1] = false;
                }else{
                    $('#timeNext').removeClass().addClass('next');
                    array[1] = true;
                }
                
                setChange();
                return array;
			}
			
			/**
			 * 返回间隔n天后的时间
			 * interval为正是未来，interval为负是历史
			 * referenceTime 参考时间
			 * status= 1 返回自然月
			 */
			function getDateByInterval(interval, referenceTime, status){
				var today = $('#time_info_today').val();
				var minDate = $('#time_info_add_stat_time').val();
				
				var sdates = [], st, et;// [st, et]
				if(status && status === 1){
					//返回自然月
					if(interval < 0){
						//返回上一月
						var currDate = cnzz.tongji.fn.getDateObjectByStringDate(referenceTime);
						var currYear = currDate.getFullYear();
						var currMonth = currDate.getMonth();
						
						var newDate = new Date(currYear, currMonth, 0);
						var days = newDate.getDate();
						var newMonth = (newDate.getMonth() + 1).toString().replace(/^(\d)$/, "0$1");
						st = newDate.getFullYear() + '-' + newMonth + '-' + '01';
						et = newDate.getFullYear() + '-' + newMonth + '-' + days;
					}else{
						//返回下一月
						var currDate = cnzz.tongji.fn.getDateObjectByStringDate(referenceTime);
						var currYear = currDate.getFullYear();
						var currMonth = currDate.getMonth() + 1;
						
						var newDate = new Date(currYear, currMonth + 1, 0);
						var days = newDate.getDate();
						var newMonth = (newDate.getMonth() + 1).toString().replace(/^(\d)$/, "0$1");
						st = newDate.getFullYear() + '-' + newMonth + '-' + '01';
						et = newDate.getFullYear() + '-' + newMonth + '-' + days;
					}
					
				}else{
					if(interval > 0){
						st = cnzz.tongji.fn.getDate(referenceTime, 1);
						et = cnzz.tongji.fn.getDate(st, interval);
					}else{
						et = cnzz.tongji.fn.getDate(referenceTime, -1);
						st = cnzz.tongji.fn.getDate(et, interval);
					}
				}
				return [st, et];
			}
			
		},
		/**
		 * 时间条滚动
		 */
		view_barScroll : function() {
			var time_tool = $('#time_tool'), ie6 = $.browser.msie && $.browser.version === '6.0';
			
			settingWidth();
			function settingWidth(){
			    //设置宽度
                if(!ie6) {
                    time_tool.css({'width' : $('#rightContainer').width() - 2});
                }
			}
			
			$(window).on('resize', function(){
                settingWidth();
            });

			//自定义滚动事件
			function addScrollEvent() {
				time_tool.on('timeTool.scroll', function() {
					var timeToolTop = 217 - 52, scrollTop = $(window).scrollTop() - 0;
					if(scrollTop >= timeToolTop) {
						ie6 ? time_tool.css({
							top : scrollTop - timeToolTop
						}) : time_tool.addClass('sticky');
					} else if(scrollTop < timeToolTop) {
						ie6 ? time_tool.css({
							top : 0
						}) : time_tool.removeClass('sticky');
					}
				});

				$(window).on('scroll', function() {
					time_tool.trigger('timeTool.scroll');
				});
				time_tool.trigger('timeTool.scroll');
			}

			addScrollEvent();
			$('#icon_dingzhu').off('click');
			$('#icon_dingzhu').on('click', function() {
				var self = $(this);
				if(self.hasClass('nail')) {
					self.removeClass('nail').addClass('ed');
					addScrollEvent();
				} else if(self.hasClass('ed')) {
					self.removeClass('ed').addClass('nail');
					ie6 ? $('#time_tool').css({
						top : 0
					}) : $('#time_tool').removeClass('sticky');
					$('#time_tool').off('timeTool.scroll');
					//title 漂浮 top = 1
					$('tr.reportTableTitle').css({'top' : 0});
				}
			});
		},
		/**
		 * 日历 视图
		 */
		view_datepicker : function() {
			var self = this;
			var _today = $('#time_info_today').val();
			var _minDate = $('#time_info_add_stat_time').val();
			//删除以前的日历
			if($('div.datepicker_container').length) {
				$('div.datepicker_container').remove()
			}
			
            this.datepicker();

            $('#timecheckbox').bind('click', function(e) {
                if($(this).attr('checked') !== 'checked') {
                    cnzz.tongji.global.isTrendToCompare = false;
                    backbone.history.navigate('!/' + cnzz.tongji.global.timestamp() + '/flow/trend/1/' + self.siteId + '/' + self.st + '/' + self.et, {
                        trigger : true
                    });
                } else {
                    var preDate = datepicker._CAL.getPrevSameTime(self.st + '至' + self.et, _minDate, _today);
                    cnzz.tongji.global.isTrendToCompare = true;
                    backbone.history.navigate('!/' + cnzz.tongji.global.timestamp() + '/flow/compare/1/' + self.siteId + '/' + self.st + '/' + self.et + '/' + preDate.split('至')[0] + '/' + preDate.split('至')[1], {
                        trigger : true
                    });
                }
            });
            
            settingCompareTime();
            function settingCompareTime() {
                var cst = $('#time_cst').val();
                var cet = $('#time_cet').val();
                $('#datepicker_compareDate').val(cst + '至' + cet);
            }
			
		},
		
		datepicker : function() {
			var that = this;
			var method_action = $('#ajaxActionName').val();
			var controller = $('#controller').val();
			var siteId = $('#siteId').val();
			var tab_index = $('#tab_index').val();

			var _today = $('#time_info_today').val();
			var _minDate = $('#time_info_add_stat_time').val();

			var oToday = datepicker._CAL.getDateByStringDate(_today);
			var minDate = datepicker._CAL.getDateByStringDate(_minDate);
			var maxDate = oToday;
			var st = that.st;
			var et = that.et;
			
			var cst = $('#time_cst').val();
			var cet = $('#time_cet').val();

			var tmpDate = st + '至' + et;
			var tmpDate2 = cst + '至' + cet;
			var datepickerInput = new datepicker.Calendar({
				id : '#datepickerInput',
				isPopup : !0,
				isPrevBtn : !0,
				isNextBtn : !0,
				isCloseBtn : !0,
				count : 2,
				monthStep : 1,
				isHoliday : 0,
				isHolidayTips : 0,
				isReadonly : 0,
				isDateInfo : !0,
				startDate : _minDate,
				endDate : _today,
				today : _today,
				range : {
					minDate : datepicker._CAL.getDateByStringDate(st),
					maxDate : datepicker._CAL.getDateByStringDate(et)
				},
				html : '<ul class="right-select">' + ' <li><a class="today_date">今日</a></li>' + ' <li><a class="yesterday_date">昨日</a></li>' + ' <li><a class="last7_date">最近7日</a></li>' + ' <li><a class="last30_date">最近30日</a></li>' + ' <li><a class="week_date">本周</a></li>' + ' <li><a class="lastweek_date">上周</a></li>' + ' <li><a class="month_date">本月</a></li>' + ' <li><a class="lastmonth_date" >上月</a></li>' + '</ul>',
				berfore : function(sDate) {
					rightOneSetting(sDate, this.startDate);
				    rightOneCheck();
				    
				    $('a.submitA', $('#' + this.id)).removeClass().addClass('button-submit submitA a_0');
				    $('a.button-close', $('#' + this.id)).addClass('blue12');
				
				},
				submit : function(sDate) {
					tmpDate = sDate;
					var preDate = datepicker._CAL.getPrevSameTime(sDate, this.startDate, this.endDate);
					tmpDate2 = preDate;
					
					this.setDateInfo(tmpDate);

					//需求变更，左右的日历不需要操作
					//datepickerInput2.setDateInfo(tmpDate2);
                    /*
					//设置对比时间
					var cst = tmpDate2.split('至')[0];
					var cet = tmpDate2.split('至')[1];
                    */
					getSelectTimeButton(tmpDate);
					
					
					var cst = $('#time_cst').val();
					var cet = $('#time_cet').val();

					if(method_action === 'compare') {
						backbone.history.navigate('!/' + cnzz.tongji.global.timestamp() + '/' + controller + '/' + method_action + '/' + tab_index + '/' + siteId + '/' + sDate.split('至')[0] + '/' + sDate.split('至')[1] + '/' + cst + '/' + cet, {
							trigger : true
						});
					} else {
						backbone.history.navigate('!/' + cnzz.tongji.global.timestamp() + '/' + controller + '/' + method_action + '/' + tab_index + '/' + siteId + '/' + sDate.split('至')[0] + '/' + sDate.split('至')[1], {
							trigger : true
						});
					}
					$('#datepicker_compareDate').val(tmpDate2);
				},
				cancel : function() {
					this.setDateInfo(tmpDate);
				}
			});
            
			/**
			 * 获得用户选择了那个快捷键，并作相应的记录，给第二个时间框的快捷键判断用
			 */
			function getSelectTimeButton(sDate){
				//设置前进后退的间隔数
                /*
		                    今日、昨日	 前1日、后1日	 今日时，后1日箭头禁用
		                    最近30日	 前30日、后30日	 最近30日时，后30日箭头禁用
		                    最近7日	 前7日、后7日	最近7日时，后7日箭头禁用
		                    本周、上周	 前1周、后1周	 本周时，后1周禁用
		                    本月、上月	 前1月、后1月	本月时，后1月禁用
		                    其他   	 前1日、后1日	 前1日是起始日的前1日，后1日是结束日的后1日。若没有则禁用
                */
				var className = $('a.cal-selected', $('ul.right-select')).attr('class')
				var intervalEl = jQuery('#time_interval');
	            var selectEl = jQuery('#time_select');
				if(className){
	                if(className.indexOf('today_date') !== -1 || className.indexOf('yesterday_date') !== -1){
	                	intervalEl.val(1);
	                	selectEl.val('one');
	                }else if(className.indexOf('last30_date') !== -1){
	                	intervalEl.val(30);
	                	selectEl.val('day30');
	                }else if(className.indexOf('last7_date') !== -1){
	                	intervalEl.val(7);
	                	selectEl.val('day7');
	                }else if(className.indexOf('week_date') !== -1 || className.indexOf('lastweek_date') !== -1){
	                	//目的是区分 最近7日  周
	                	intervalEl.val(7);
	                	selectEl.val('week');
	                }else if(className.indexOf('month_date') !== -1 || className.indexOf('prev_month_date') !== -1){
	                	//目的是区分 最近30日 自然月
	                	intervalEl.val(30);
	                	selectEl.val('month');
	                }else{
	                	selectEl.val('noSelect');
	                }
				}else{
					selectEl.val('one');
				}				
			}
			
            /**
             * 根据最小时间和今天的时间来判断 右边那些显示，那些不显示
             */
            function rightOneCheck(){
                var dateCommon = new datepicker.DateCommon(_today, _minDate);  
                
                //本周周一
                var monday = datepicker._CAL.getDate(dateCommon.sToday, - dateCommon.getWeekDay);
                //本月1号
                var month1 = datepicker._CAL.getDate(dateCommon.sToday, - dateCommon.getMonthDay);
                //上周
                var day71 = datepicker._CAL.getDate(monday, - 1);
                
                var days =  datepicker._CAL.getMonthDays(dateCommon.oToday);
                //上月 
                var day301 = datepicker._CAL.getDate(month1, - 1);
                /*
                //上周
                var lastweek_date = dateCommon.lastweek_date.split('至')[0];
                //上月
                var lastmonth_date = dateCommon.lastmonth_date.split('至')[0];
                */
               
                //今日开通 ，昨日隐藏
                if(_today === _minDate){
                    $('a.yesterday_date').parent().html('<span class="lightGray">昨天</span>');
                }
               
                var islastweek = !cnzz.tongji.fn.compare_date(_minDate, day71);
                var islastmonth = !cnzz.tongji.fn.compare_date(_minDate, day301);
                
                islastweek && $('a.lastweek_date').parent().html('<span class="lightGray">上周</span>');
                islastmonth && $('a.lastmonth_date').parent().html('<span class="lightGray">上月</span>');
            }

			function rightOneSetting(sDate, minDate) {
				var dateCommon = new datepicker.DateCommon(_today, minDate);

				var that = this;
				//根据左边选择的时间段匹配右边的快捷键
				switch(sDate) {
					case dateCommon.today_date :
						//今天
						common_fn("today_date");
						break;
					case dateCommon.yesterday_date :
						//昨天
						common_fn("yesterday_date");
						break;
					case dateCommon.last7_date:
						//最近7日
						common_fn("last7_date");
						break;
					case dateCommon.week_date:
						//本周
						common_fn("week_date");
						break;
					case dateCommon.last30_date :
						//最近30日
						common_fn("last30_date");
						break;
					case dateCommon.lastweek_date:
						//上周
						common_fn("lastweek_date");
						break;
					case dateCommon.month_date :
						//本月
						common_fn("month_date");
						break;
					case dateCommon.lastmonth_date:
						//上月
						common_fn("lastmonth_date");
						break;
					default :
						jQuery('a', jQuery('ul.right-select')).removeClass('cal-selected').parent().removeClass('calSelected');
						break;
				}

				function common_fn(className) {
					jQuery('a').removeClass('cal-selected').parent().removeClass('calSelected');
					$('a.' + className).addClass('cal-selected').parent().addClass('calSelected');

				}

			}

			var count1 = 1, count2 = 1, date1 = '', date2 = '';
			datepickerInput.on("dateClick", function(obj) {
				// 用户点击右边的时候不触发事件
				if(jQuery(obj).parent().parent().attr('class') === 'right-select') {
					return;
				}
				if(jQuery(obj).hasClass('disabled')){
				    return ;
				}

				$('a.cal-selected', $('ul.right-select')).removeClass('cal-selected');
				
				if(count1 % 2 != 0) {
					date1 = obj['data-date'];
					jQuery('a', jQuery('div.cal-container')).removeClass('select-range').removeClass('end-date').removeClass('start-date');

					this.range.minDate = minDate;
					this.range.maxDate = datepicker._CAL.getDateByStringDate(date1);

					this.setDateInfo(date1 + '至' + date1);

				} else {
					//增加选中样式
					this.range.mindate = datepicker._CAL.getDateByStringDate(obj['data-date']);
					this.range.maxdate = maxDate;
					this.setDateInfo(date1 + '至' + obj['data-date']);
				}
				count1++;
			});
			datepickerInput.setDateInfo(tmpDate);
			
			var datepickerInput2 = new datepicker.Calendar({
				id : "#datepickerInput2",
				isPopup : !0,
				isPrevBtn : !0,
				isNextBtn : !0,
				isCloseBtn : !0,
				count : 2,
				monthStep : 1,
				isHoliday : 0,
				isHolidayTips : 0,
				isReadonly : 0,
				isDateInfo : !0,
				startDate : _minDate,
				endDate : _today,
				today : _today,
				range : {
					minDate : datepicker._CAL.getDateByStringDate(st),
					maxDate : datepicker._CAL.getDateByStringDate(et)
				},
				html : ' <ul class="right-select2" id="right-select2">' 
				+ '  <li class="datepicker_1"><a class="prev_1_date">前1日</a></li>' 
				+ '  <li class="datepicker_1"><a class="prev_week_date">上周同期</a></li>' 
				+ '  <li class="datepicker_1"><a class="prev_month_date">上月同期</a></li>' 
				+ '  <li class="datepicker_ hide"><a class="prev_month_avg_date">前30日均值</a></li>' 
				+ '  <li class="datepicker_7"><a class="prev_7_date">前7日</a></li>' 
				+ '  <li class="datepicker_30"><a class="prev_30_date">前30日</a></li>' 
				+ '  <li class="datepicker_week"><a class="prev_week_dates">前1周</a></li>' 
				+ '  <li class="datepicker_month"><a class="prev_month_dates">前1月</a></li>' 
				+ '  <li class="datepicker_other"><a class="other_date">自定义</a></li>' 
				+ '  <li class="datepicker_prev_same"><a class="prev_same_date">向前等长时间</a></li>' 
				+ ' </ul>',
				berfore : function(sDate) {
					tmpDate2 = sDate;
					rightTwoSetting(sDate, this.startDate, this.endDate);
					
					$('a.submitA', $('#' + this.id)).removeClass().addClass('button-submit submitA a_0');
                    $('a.button-close', $('#' + this.id)).addClass('blue12');
				},
				submit : function(sDate) {
					//需求说不修正时间
					//tmpDate2 = getPrevSameTime(sDate, this.startDate, this.endDate);
					tmpDate2 = sDate;
					
					this.setDateInfo(tmpDate2);

					backbone.history.navigate('!/' + cnzz.tongji.global.timestamp() + '/' + controller + '/' + method_action + '/' + tab_index + '/' + siteId + '/' + tmpDate.split('至')[0] + '/' + tmpDate.split('至')[1] + '/' + tmpDate2.split('至')[0] + '/' + tmpDate2.split('至')[1], {
						trigger : true
					});
				},
				cancel : function() {
					this.setDateInfo(tmpDate2);
				}
			});

			
			//获得相同间隔的时间
			function getPrevSameTime(sDate, minDate, maxDate) {
				//标准参考时间
				var input = jQuery('#datepickerInput').val();
				//标准时间段
				var intervals1 = datepicker._CAL.getIntervalsByDates(input);

				var intervals2 = datepicker._CAL.getIntervalsByDates(sDate);

				var submitDate = sDate
				if(intervals1 > intervals2) {

					//判断和最小时间， 最大时间的间隔
					var st0 = sDate.split('至')[0], et0 = sDate.split('至')[1];
					//到最小的间隔
					var toMinIntervals = datepicker._CAL.getIntervalsByDates(minDate + '至' + et0);
					//到最大的间隔
					var toMaxIntervals = datepicker._CAL.getIntervalsByDates(st0 + '至' + maxDate);

					if(toMinIntervals > intervals1) {
						submitDate = datepicker._CAL.getDate(et0, -intervals1) + '至' + et0;

					} else if(toMaxIntervals > intervals1) {
						submitDate = st0 + '至' + datepicker._CAL.getDate(st0, intervals1);

					} else {
						submitDate = datepicker._CAL.getPrevSameTime(input, minDate, maxDate);
					}

				} else if(intervals1 < intervals2 && intervals1 === 0) {
					//比标准时间段大
					//bug 164637
					//时段一为单日，选择时段二为一段时间，自动对齐时段二错误，应该自动对齐到时段二的起始时间
					submitDate = sDate.split('至')[0] + '至' + sDate.split('至')[0];
				}else if(intervals1 < intervals2) {
                    //比标准时间段大
                    var st = sDate.split('至')[0];
                    submitDate = datepicker._CAL.getPrevSameTime(st + '至' + datepicker._CAL.getDate(st, intervals1), this.startDate, this.endDate);
                }

				return submitDate;

			}


			datepickerInput2.on("dateClick", function(obj) {

				// 用户点击右边的时候不触发事件
				if(jQuery(obj).parent().parent().attr('class') === 'right-select2') {
					return;
				}
				if(jQuery(obj).hasClass('disabled')){
                    return ;
                }
				
				$('a.cal-selected', $('ul.right-select2')).removeClass('cal-selected');

				if(count2 % 2 != 0) {
					date2 = obj['data-date'];

					jQuery('a', jQuery('div.cal-container')).removeClass('select-range').removeClass('end-date').removeClass('start-date');

					this.range.minDate = minDate;
					this.range.maxDate = datepicker._CAL.getDateByStringDate(date2);

					var dateOne = date2 + '至' + date2;
					this.setDateInfo(dateOne);

				} else {
					//增加选中样式
					this.range.mindate = datepicker._CAL.getDateByStringDate(obj['data-date']);
					this.range.maxdate = maxDate;

					var dateOne = date2 + '至' + obj['data-date'];
					this.setDateInfo(dateOne);
				}
				count2++;
			});

			datepickerInput2.setDateInfo(tmpDate2);

			function rightTwoSetting(sDate, minDate, maxDate) {
				var st1 = tmpDate.split('至')[0];
				var st = sDate.split('至')[0];
				
				
				var ul = jQuery('ul.right-select2');
				ul.find('li').hide();
				
				var timeSelect = $('#time_select').val();
				
				if(timeSelect === 'one') {
					//上月同期   计算
					var oTime = datepicker._CAL.getDateByStringDate(st1);
					var nowYear = oTime.getYear();
					nowYear += (nowYear < 2000) ? 1900 : 0;
					nowYear = nowYear;
					var st2 = new Date(nowYear, oTime.getMonth() - 1, oTime.getDate());

					//单日
					ul.find('li.datepicker_1').show();

					if(st === datepicker._CAL.getDate(st1, -1)) {
						//前一日
						common_fn('prev_1_date');
					} else if(st === datepicker._CAL.getDate(st1, -8)) {
						//上周同期
						common_fn('prev_week_date');
					} else if(st === datepicker._CAL.formatStrDate(st2)) {
						//上月同期
						common_fn('prev_month_date');
					}
					
				}else if(timeSelect === 'day7'){
					//最近7天
					ul.find('li.datepicker_7').show();
					common_fn('prev_7_date');
				}else if(timeSelect === 'day30'){
					//最近30天
					ul.find('li.datepicker_30').show();
					common_fn('prev_30_date');
				}else if(timeSelect === 'week'){
					//本周 上周
					ul.find('li.datepicker_week').show();
					common_fn('prev_week_date');
				}else if(timeSelect === 'month'){
					//本月 上月
					ul.find('li.datepicker_month').show();
					common_fn('prev_month_dates');
				}else if(timeSelect === 'noSelect'){
					//其他
					ul.find('li.datepicker_prev_same').show();
					common_fn('prev_same_date');
				}

				ul.find('li.datepicker_other').show();
				function common_fn(className) {
					jQuery('a', ul).removeClass('cal-selected');
					//$('a.' + className, ul).addClass('cal-selected');
				}

			}

            //用户点击第一个时间框
            $('#selectDateOne').on('click', function() {
                datepickerInput.focus();
            });
            //用户点击第二个时间框
            $('#selectDateTwo').on('click', function() {
                datepickerInput2.focus();
            });
            
			//点击其他区域隐藏日历
			$(document).on('click', function(e) {
				var target = $(e.target);
				var el = $('div.datepicker_container');
				var targetId = target.attr('id');
				var display = el.eq(0).css('display');
				var display1 = el.eq(1).css('display');
				
				if('datepickerInput' !== targetId && 'datepickerInput2' !== targetId && display === 'block' && target.parentsUntil(el).length !== 0 && target.attr('class') !== 'day-selector-arrow') {
					if($('#' + datepickerInput.id).css('display') !== 'none'){
					    datepickerInput.setDateInfo(tmpDate);
					    datepickerInput.hide();
					    $('#selectDateOne').removeClass('date2ErrorStyle').removeAttr('title');
					}
				}
				if('datepickerInput' !== targetId && 'datepickerInput2' !== targetId && display1 === 'block' && target.parentsUntil(el).length !== 0 && target.attr('class') !== 'day-selector-arrow') {
					if($('#' + datepickerInput2.id).css('display') !== 'none'){
						datepickerInput2.setDateInfo(tmpDate2);
						datepickerInput2.hide();
						
						$('#selectDateTwo').removeClass('date2ErrorStyle').removeAttr('title');
					}
				}
				
			});
		
		    $('a.button-close, span.cal-close').on('click', function(){
		        $('#selectDateOne, #selectDateTwo').removeClass('date2ErrorStyle').removeAttr('title');
		        datepickerInput.setDateInfo(tmpDate);
		        datepickerInput2.setDateInfo(tmpDate2);
		    });
		  
		    var contextOne = $('#' + datepickerInput.id), showMsgTimer;
		    $('#datepickerInput').on('keyup', function(e){
                var s2Date = $(this).val();
                if(e.which === 13){
                    //log('enter');
                }
                var getDateMsg = that.getCheck2DateMsg(s2Date);
                if(getDateMsg){
                    showMsg(getDateMsg);
                    $('#selectDateOne').addClass('date2ErrorStyle').attr({'title' : getDateMsg});
                    //这个必须放在第一个位置，要不事件无法绑定
                    $('a.submitA', contextOne).removeClass('button-submit a_0').addClass('a_1');
                }else{
                    $('#selectDateOne').removeClass('date2ErrorStyle').removeAttr('title');
                    $('a.submitA', contextOne).removeClass().addClass('button-submit submitA a_0');
                    datepickerInput.setDateInfo(s2Date);
                    rightOneSetting(s2Date, datepickerInput.startDate);
                    rightOneCheck();
                }
            });
		      
		    
		    var contextTwo = $('#' + datepickerInput2.id);
		    $('#datepickerInput2').on('keyup', function(e){
                var s2Date = $(this).val();
                if(e.which === 13){
                    //log('enter');
                }
                var getDateMsg = that.getCheck2DateMsg(s2Date);
                if(getDateMsg){
                    showMsg(getDateMsg);
                    $('#selectDateTwo').addClass('date2ErrorStyle').attr({'title' : getDateMsg});
                    $('a.submitA', contextTwo).removeClass('a_0 button-submit').addClass('a_1');
                }else{
                    $('#selectDateTwo').removeClass('date2ErrorStyle').removeAttr('title');
                    $('a.submitA', contextTwo).removeClass().addClass('button-submit submitA a_0');
                    datepickerInput2.setDateInfo(s2Date);
                    rightTwoSetting(s2Date, datepickerInput2.startDate, datepickerInput2.endDate);
                }
            });
		  
		  
		     function showMsg(msg){
		        $('#cnzzGobalTip').html(msg).parent().show();
		        clearTimeout(showMsgTimer);
                showMsgTimer = setTimeout(function(){
                    $('#cnzzGobalTip').parent().hide();
                }, 5000);
		     }
		},
		
		getCheck2DateMsg : function(s2Date){
		    var msg;
		    var today = $('#time_info_today').val();
            var minDate = $('#time_info_add_stat_time').val();
                
            if(!s2Date){
                msg = '不能为空（请选择时间后再进行查询！）';
            }else{
                 if(s2Date && s2Date.indexOf('至') === -1){
                    msg = '日期格式应该为YYYY-MM-DD至YYYY-MM-DD';
                }else{
                    var st = s2Date.split('至')[0], et = s2Date.split('至')[1];
                    var pattern = /^\d{4}-\d{2}-\d{2}$/;
                    if(pattern.test(st) && pattern.test(et)){                        
                        if(cnzz.tongji.fn.compare_date(st, et)){
                            
                            if(st !== minDate && cnzz.tongji.fn.compare_date(st, minDate)){
                                msg = '起始时间不可早于统计开通时间，请重新选择！';
                            }else{
                                if(today !== et && cnzz.tongji.fn.compare_date(today, et)){
                                    msg = '结束时间不可晚于今日，请重新选择！';
                                }else{
                                    msg = '';
                                }
                            }
                        }else{
                            msg = '起始时间不可晚于结束时间，请重新选择！';
                        }
                    }else{
                        msg = '日期格式应该为YYYY-MM-DD至YYYY-MM-DD';
                    }
                }
            }
            return msg;
		}
	}

	var zhibiao = require('util/zhibiao');
	exports.Zhibiao = zhibiao.Zhibiao;

	$(function() {
		$('#rightContainer').on('timeBar.change', function(event, st, et) {
			var timeBar = new TimeBar(st, et);
			timeBar.start();
		});
		//router 中调用
		//var st = $('#time_st').val(), et = $('#time_et').val();
		//$('#rightContainer').trigger('timeBar.change', [st, et]);
	});
});