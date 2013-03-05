define("http://images.cnzz.com/static/js/util/header.js", ["jquery", "underscore", "backbone", "util/common"], function(e, t, n) {
	function u() {}
	var r = e("jquery"),
		i = e("underscore"),
		s = e("backbone"),
		o = e("util/common");
	return u.prototype = {
		start: function() {
			this.view(), this.headerNavSelect()
		},
		headerNavSelect: function() {
			function f(e) {
				i.each(function() {
					var t = r(this).find("a"),
						n = t.attr("info");
					n === e && r(this).addClass("selected")
				})
			}
			var e = this,
				t = r("#header"),
				n = r("#controller").val(),
				i = r("ul.headerNav li", t),
				s = i.find("a"),
				o = r("#siteId").val(),
				u = r("#time_st").val(),
				a = r("#time_et").val();
			i.removeClass("selected"), n === "site", (n === "site" || n === "flow" || n === "traf" || n === "cont" || n === "visitor" || n === "goals") && f("tongjiReport"), n === "report" && f("dataReport"), n === "alarm" && f("alarm"), n === "component" && f("component"), s.on("click", function() {
				var e = r(this).attr("info"),
					t = "";
				e === "overview" ? (t = "main.php?c=site&a=frame&siteid=" + o + "#!/" + cnzz.tongji.global.timestamp() + "/site/overview/1/" + o + "/" + u + "/" + a, r(this).attr({
					href: t
				})) : e === "tongjiReport" ? (t = "main.php?c=site&a=frame&siteid=" + o + "#!/" + cnzz.tongji.global.timestamp() + "/site/overview/1/" + o + "/" + u + "/" + a, r(this).attr({
					href: t
				})) : e === "dataReport" ? (t = "main.php?c=report&a=frame&siteid=" + o + "#!/" + cnzz.tongji.global.timestamp() + "/report/com/1/" + o + "/" + u + "/" + a, r(this).attr({
					href: t
				})) : e === "alarm" ? (t = "main.php?c=alarm&a=frame&siteid=" + o + "#!/" + cnzz.tongji.global.timestamp() + "/alarm/setting/1/" + o + "/" + u + "/" + a, r(this).attr({
					href: t
				})) : e === "component" && (t = "main.php?c=component&a=frame&siteid=" + o + "#!/" + cnzz.tongji.global.timestamp() + "/component/chome/1/" + o + "/" + u + "/" + a, r(this).attr({
					href: t
				}))
			}), r("#leftNavComponent").on("click", function() {
				var e = "main.php?c=component&a=frame&siteid=" + o + "#!/" + cnzz.tongji.global.timestamp() + "/component/chome/1/" + o + "/" + u + "/" + a;
				r(this).attr({
					href: e
				})
			}), r.browser.msie && r.browser.version === "6.0" && (r("#broswerSuggestion").slideDown(), r("#broswerSuggestionClose").on("click", function() {
				r("#broswerSuggestion").slideUp()
			}))
		},
		view: function() {
			function n(e) {
				if (e) {
					var t = e.split(" "),
						n = t[0].split("-"),
						r = t[1].split(":"),
						i = new Date(n[0], parseInt(n[1], 10) - 1, n[2], r[0], r[1], r[2]);
					return i.getTime()
				}
				return 0
			}
			var e = this,
				t = r("#header");
			r("#header_site_set").on("click", function() {
				var e = r(this);
				e.hasClass("s-selector_up") ? (e.removeClass("s-selector_up"), r("#header_site_setting_content").hide()) : (e.addClass("s-selector_up"), r("#header_site_setting_content").show())
			}), cnzz.tongji.fn.ajax("main.php?c=user&a=getlastnotice&ajax=module=getlastnotice", {}, function(e) {
				if (e && e.getlastnotice) {
					var t = n(e.getlastnotice.addtime),
						i = cnzz.tongji.fn.getCookie("notice");
					i = parseInt(i, 10) || 0;
					if (parseInt(t, 10) > i && e.getlastnotice["new"] == "0" && e.getlastnotice && e.getlastnotice.content && e.getlastnotice.content.length > 0) {
						var s = e.getlastnotice.content.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
						r("#header-notice-content").html('<span id="headerNoticeAlink" class="blue12" style="cursor: pointer;" target="_blank" href="main.php?c=usermanage&a=notice" title="点此查看完整公告">' + e.getlastnotice.title + "：" + cnzz.tongji.fn.util.getAbbr(s, 200) + "  " + e.getlastnotice.addtime + "</span>").parent().show(), r("#header-notice-content").attr({
							addTime: t
						}), r("#headerNoticeAlink").on("click", function() {
							r("#header-notice-close").trigger("click")
						})
					}
				}
			}), r("#header-notice-close").on("click", function() {
				r(this).parent().hide();
				var e = "notice=" + r("#header-notice-content").attr("addTime");
				cnzz.tongji.fn.setCookie(e)
			}), r(document).on("click", function(e) {
				var t = r(e.target),
					n = r("#header_site_set"),
					i = r("#header_site_setting_content"),
					s = i.css("display");
				s === "block" && t.parentsUntil(n).length !== 0 && t.attr("id") !== "header_site_set" && (n.removeClass("s-selector_up"), i.hide())
			}), r("div.header_site_select", t).on("click", function() {
				r("#header_selector_list_content").toggle();
				if (r("ul.siteListUl", t).length === 0) {
					var e = {};
					e.id = "header_selector_list_content", e.siteId = r("#siteId").val(), e.controller = r("#controller").val(), e.ajaxActionName = r("#ajaxActionName").val(), e.from = "report", e.st = r("#time_st").val(), e.et = r("#time_et").val(), e.tab_index = r("#tab_index").val();
					if (e.ajaxActionName === "compare" || e.ajaxActionName === "updown") e.cst = r("#time_cst").val(), e.cet = r("#time_cet").val();
					cnzz.tongji.global.getSiteList(e)
				}
			})
		}
	}, u
});
define("http://images.cnzz.com/static/js/util/left.js", ["jquery", "underscore", "backbone", "util/common", "util/datepicker", "util/datepicker", "util/datepicker"], function(e, t, n) {
	function u() {}
	var r = e("jquery"),
		i = e("underscore"),
		s = e("backbone"),
		o = e("util/common");
	return u.prototype = {
		start: function() {
			this.view_report(), this.view_siteOverview(), this.view_expand(), this.view_baib()
		},
		view_report: function() {
			r("#left_setup").on("click", function() {
				r("#left_setup_list").toggle()
			}), r("#left_setup_cancel").on("click", function() {
				r("#left_setup_list").hide()
			}), r("#left_setup_ok").on("click", function() {
				r("#left_setup_list").hide()
			}), r("#left_common_nav_report").on("click", function() {
				var e = r(this);
				e.hasClass("common-nav-close") ? e.removeClass("common-nav-close").addClass("common-nav-open") : e.hasClass("common-nav-open") && e.removeClass("common-nav-open").addClass("common-nav-close"), r("#left_common_nav_report_content").toggle()
			})
		},
		view_siteOverview: function() {
			var t = r("#left_all_nav"),
				n = cnzz.tongji.fn.getCookie("lns");
			n && n.length > 0 && r("ul.main_nav_sub", t).each(function() {
				var e = r(this).attr("info") + "-0",
					t = !1,
					i = n.split(",");
				for (var s = 0; s < i.length; s++) i[s] === e && (t = !0);
				t && (r(this).hide(), r(this).parent().prev().removeClass("nav-open").addClass("nav-close"))
			}), r("div.main_nav", t).on("click", function() {
				var e = r(this),
					n = e.next().find("ul.main_nav_sub");
				n.toggle(), e.hasClass("nav-open") ? e.removeClass("nav-open").addClass("nav-close") : e.hasClass("nav-close") && e.removeClass("nav-close").addClass("nav-open");
				var i = "";
				r("ul.main_nav_sub", t).each(function() {
					var e = r(this).attr("info");
					r(this).css("display") === "none" ? i += e + "-0," : i += e + "-1,"
				});
				var s = "lns=" + i;
				cnzz.tongji.fn.setCookie(s)
			});
			var i = r("ul.main_nav_sub", t).find("li"),
				s = r("#controller").val(),
				o = r("#siteId").val();
			i.on({
				mouseover: function() {
					r(this).find("span.ty").show()
				},
				mouseout: function() {
					i.find("span.ty").hide()
				}
			}), i.find("a.leftNav").on("mousedown", function(e) {
				e.which === 3 && r(this).trigger("click")
			}), i.find("a.leftNav").on("click", function() {
				var t = r(this).parent().attr("info"),
					n = t.split("|")[0],
					s = t.split("|")[1],
					o, u = r("#time_st").val(),
					a = r("#time_et").val(),
					f = r("#siteId").val(),
					l = 1;
				n === "traf" && s === "page" && (l = 2), n === "goals" && s === "funnel" && (l = 2);
				var c = e("util/datepicker");
				if ("compare" === s) {
					var h = r("#time_info_today").val(),
						p = r("#time_info_add_stat_time").val(),
						d = c._CAL.getPrevSameTime(u + "至" + a, p, h),
						v = d.split("至")[0],
						m = d.split("至")[1];
					r("#time_cst").val(v), r("#time_cet").val(m), o = cnzz.tongji.path.root_path + "main.php?c=" + n + "&a=frame&siteid=" + f + "#!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + s + "/" + l + "/" + f + "/" + u + "/" + a + "/" + v + "/" + m, cnzz.tongji.global.isTrendToCompare = !1
				} else if ("updown" === s && n === "traf" || "updown" === s && n === "cont") {
					var h = r("#time_info_today").val(),
						p = r("#time_info_add_stat_time").val(),
						d = "";
					u === a ? d = c._CAL.getPrevSameTime(u + "至" + u, p, h) : (u = h, d = c._CAL.getPrevSameTime(h + "至" + h, p, h));
					var v = d.split("至")[0],
						m = d.split("至")[1];
					r("#time_cst").val(v), r("#time_cet").val(m), o = cnzz.tongji.path.root_path + "main.php?c=" + n + "&a=frame&siteid=" + f + "#!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + s + "/" + l + "/" + f + "/" + u + "/" + u + "/" + v + "/" + m
				} else "realtime" === s && n === "flow" || "detail" === s && n === "flow" ? o = cnzz.tongji.path.root_path + "main.php?c=" + n + "&a=frame&siteid=" + f + "#!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + s + "/" + l + "/0/" + f + "/" + u + "/" + a : o = cnzz.tongji.path.root_path + "main.php?c=" + n + "&a=frame&siteid=" + f + "#!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + s + "/" + l + "/" + f + "/" + u + "/" + a;
				i.removeClass("selected"), i.removeClass("new_selected"), r(this).parent().addClass("selected"), r(this).attr({
					href: o
				})
			}), i.find("a.left_a_today").on("click", function() {
				var t = r(this).parent().parent().attr("info"),
					n = t.split("|")[0],
					s = t.split("|")[1],
					o, u = r("#time_info_today").val(),
					a = r("#time_info_today").val(),
					f = r("#siteId").val(),
					l = 1;
				n === "traf" && s === "page" && (l = 2), n === "goals" && s === "funnel" && (l = 2);
				var c = e("util/datepicker");
				if ("compare" === s) {
					var h = r("#time_info_today").val(),
						p = r("#time_info_add_stat_time").val(),
						d = c._CAL.getPrevSameTime(u + "至" + a, p, h),
						v = d.split("至")[0],
						m = d.split("至")[1];
					r("#time_cst").val(v), r("#time_cet").val(m), o = cnzz.tongji.path.root_path + "main.php?c=" + n + "&a=frame&siteid=" + f + "#!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + s + "/" + l + "/" + f + "/" + u + "/" + a + "/" + v + "/" + m, cnzz.tongji.global.isTrendToCompare = !1
				} else if ("updown" === s && n === "traf" || "updown" === s && n === "cont") {
					var h = r("#time_info_today").val(),
						p = r("#time_info_add_stat_time").val(),
						d = "";
					u === a ? d = c._CAL.getPrevSameTime(u + "至" + u, p, h) : (u = h, d = c._CAL.getPrevSameTime(h + "至" + h, p, h));
					var v = d.split("至")[0],
						m = d.split("至")[1];
					r("#time_cst").val(v), r("#time_cet").val(m), o = cnzz.tongji.path.root_path + "main.php?c=" + n + "&a=frame&siteid=" + f + "#!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + s + "/" + l + "/" + f + "/" + u + "/" + u + "/" + v + "/" + m
				} else "realtime" === s && n === "flow" || "detail" === s && n === "flow" ? o = cnzz.tongji.path.root_path + "main.php?c=" + n + "&a=frame&siteid=" + f + "#!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + s + "/" + l + "/0/" + f + "/" + u + "/" + a : o = cnzz.tongji.path.root_path + "main.php?c=" + n + "&a=frame&siteid=" + f + "#!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + s + "/" + l + "/" + f + "/" + u + "/" + a;
				i.removeClass("selected"), i.removeClass("new_selected"), r(this).parent().addClass("selected"), r(this).attr({
					href: o
				})
			}), i.find("a.left_a_yesterday").on("click", function() {
				var t = r(this).parent().parent().attr("info"),
					n = t.split("|")[0],
					s = t.split("|")[1],
					o, u = r("#time_info_yesterday").val(),
					a = r("#time_info_yesterday").val(),
					f = r("#siteId").val(),
					l = 1;
				n === "traf" && s === "page" && (l = 2), n === "goals" && s === "funnel" && (l = 2);
				var c = e("util/datepicker");
				if ("compare" === s) {
					var h = r("#time_info_today").val(),
						p = r("#time_info_add_stat_time").val(),
						d = c._CAL.getPrevSameTime(u + "至" + a, p, h),
						v = d.split("至")[0],
						m = d.split("至")[1];
					r("#time_cst").val(v), r("#time_cet").val(m), o = cnzz.tongji.path.root_path + "main.php?c=" + n + "&a=frame&siteid=" + f + "#!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + s + "/" + l + "/" + f + "/" + u + "/" + a + "/" + v + "/" + m, cnzz.tongji.global.isTrendToCompare = !1
				} else if ("updown" === s && n === "traf" || "updown" === s && n === "cont") {
					var h = r("#time_info_today").val(),
						p = r("#time_info_add_stat_time").val(),
						d = "";
					u === a ? d = c._CAL.getPrevSameTime(u + "至" + u, p, h) : (u = h, d = c._CAL.getPrevSameTime(h + "至" + h, p, h));
					var v = d.split("至")[0],
						m = d.split("至")[1];
					r("#time_cst").val(v), r("#time_cet").val(m), o = cnzz.tongji.path.root_path + "main.php?c=" + n + "&a=frame&siteid=" + f + "#!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + s + "/" + l + "/" + f + "/" + u + "/" + u + "/" + v + "/" + m
				} else "realtime" === s && n === "flow" || "detail" === s && n === "flow" ? o = cnzz.tongji.path.root_path + "main.php?c=" + n + "&a=frame&siteid=" + f + "#!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + s + "/" + l + "/0/" + f + "/" + u + "/" + a : o = cnzz.tongji.path.root_path + "main.php?c=" + n + "&a=frame&siteid=" + f + "#!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + s + "/" + l + "/" + f + "/" + u + "/" + a;
				i.removeClass("selected"), i.removeClass("new_selected"), r(this).parent().addClass("selected"), r(this).attr({
					href: o
				})
			}), r("div.nav01", r("#left_all_nav")).find("a").on("mousedown", function(e) {
				e.which === 3 && r(this).trigger("click")
			}), r("div.nav01", r("#left_all_nav")).find("a").on("click", function() {
				var e = "main.php?c=site&a=frame&siteid=" + o + "#!/" + cnzz.tongji.global.timestamp() + "/site/overview/1/" + o + "/" + r("#time_st").val() + "/" + r("#time_et").val();
				r(this).attr({
					href: e
				})
			}), r("#left_all_nav").children().length === 0 && r("#left_all_nav").hide();
			var u = r("#left_common_nav_expand_content li");
			u.on("click", function() {
				var e = r(this).attr("info");
				if (e) {
					var t = e.split("|")[0],
						n = e.split("|")[1],
						i = r("#time_st").val(),
						s = r("#time_et").val(),
						o = r("#siteId").val(),
						u = r("#tab_index").val(),
						a = "main.php?c=" + t + "&a=frame&siteid=" + o + "#!/" + cnzz.tongji.global.timestamp() + "/" + t + "/" + n + "/" + u + "/" + o + "/" + i + "/" + s;
					r(this).children("a").attr({
						href: a
					})
				}
			}), u.on("mousedown", function(e) {
				e.which === 3 && r(this).trigger("click")
			});
			var a = r("#left_common_nav_report_content li");
			a.on("click", function() {
				var e = r(this).attr("info");
				if (e) {
					var t = e.split("|")[0],
						n = e.split("|")[1],
						i = r("#time_st").val(),
						s = r("#time_et").val(),
						o = r("#siteId").val(),
						u = r("#tab_index").val(),
						a = "main.php?c=" + t + "&a=frame&siteid=" + o + "#!/" + cnzz.tongji.global.timestamp() + "/" + t + "/" + n + "/" + u + "/" + o + "/" + i + "/" + s;
					r(this).children("a").attr({
						href: a
					})
				}
			}), a.on("mousedown", function(e) {
				e.which === 3 && r(this).trigger("click")
			});
			var f = r("#left_common_nav_baib_content li");
			f.on("click", function() {
				var e = r(this).attr("info"),
					t = e.split("|")[0],
					n = e.split("|")[1],
					i = r("#time_st").val(),
					s = r("#time_et").val(),
					o = r("#siteId").val(),
					u = r("#tab_index").val();
				f.removeClass("selected"), r(this).addClass("selected");
				var a = "main.php?c=" + t + "&a=frame&siteid=" + o + "#!/" + cnzz.tongji.global.timestamp() + "/" + t + "/" + n + "/" + u + "/" + o + "/" + i + "/" + s;
				r(this).children("a").attr({
					href: a
				})
			}), f.on("mousedown", function(e) {
				e.which === 3 && r(this).trigger("click")
			})
		},
		view_expand: function() {
			r("#left_common_nav_expand").on("click", function() {
				var e = r(this);
				e.hasClass("title_open") ? e.removeClass("title_open").addClass("title_close") : e.hasClass("title_close") && e.removeClass("title_close").addClass("title_open"), r("#left_common_nav_expand_content").toggle()
			})
		},
		view_baib: function() {
			r("#left_common_nav_baib").on("click", function() {
				var e = r(this);
				e.hasClass("title_open") ? e.removeClass("title_open").addClass("title_close") : e.hasClass("title_close") && e.removeClass("title_close").addClass("title_open"), r("#left_common_nav_baib_content").toggle()
			})
		}
	}, u
});
define("http://images.cnzz.com/static/js/util/zhibiao.js", ["jquery", "underscore"], function(e, t, n) {
	function s(e, t, n, r, i, s) {
		this.target = e, this.cookie_key = t, this.zhibiaoContentId = n, this.max = r, this.min = i, this.defaultTarget = s, this.start()
	}
	var r = e("jquery"),
		i = e("underscore");
	s.prototype = {
		start: function() {
			r("#time_tool_setup").show(), r("span.maxSelect").text(this.max), this.init_target(), this.target_event(), this.restore_default()
		},
		restore_default: function() {
			function o() {
				n.each(function() {
					r(this).attr({
						checked: !1
					})
				}), n.each(function() {
					var e = r(this),
						t = e.attr("info");
					for (var n = 0; n < s.length; n++) s[n] == t && e.attr({
						checked: !0
					})
				}), r("#time_tool_setup").removeClass("tool_setup_hover").attr("info", "1"), r("div.tool_list").hide(), e.newArray = i.clone(e.defaultTarget), e.checkboxsEvent()
			}
			var e = this,
				t = e.zhibiaoContentId,
				n = r("#" + t).find('input[type="checkbox"]');
			r("a.restore_default").off("click"), r("a.restore_default").on("click", function() {
				var t = e.defaultTarget;
				n.each(function() {
					r(this).attr({
						checked: !1
					})
				}), n.each(function() {
					var e = r(this),
						n = e.attr("info");
					for (var i = 0; i < t.length; i++) t[i] == n && e.attr({
						checked: !0
					})
				}), e.checkboxsEvent(), e.newArray = i.clone(e.defaultTarget), cnzz.tongji.fn.setCookie(e.cookie_key + "=" + t)
			}), r(document).on("click", function(e) {
				var t = r(e.target);
				t.parents("div.tool_list").length === 0 && t.attr("id") != "time_tool_setup" && o()
			}), r("div.zhibiao_cancel").on("click", function(e) {
				o()
			}), r("div.zhibiao_cancel").hover(function(e) {
				r(this).toggleClass("zhibiao_cancel_hover")
			});
			var s = [];
			r("#" + e.zhibiaoContentId).find('input[type="checkbox"]').each(function() {
				r(this).attr("checked") === "checked" && s.push(r(this).attr("info"))
			})
		},
		init_target: function() {
			var e = this,
				t = e.zhibiaoContentId,
				n = r("#" + t).find('input[type="checkbox"]'),
				s = cnzz.tongji.fn.getCookie(e.cookie_key);
			s ? s = s.split(",") : s = e.target, n.each(function() {
				var e = r(this),
					t = e.attr("info");
				for (var n = 0; n < s.length; n++) s[n] == t && e.attr({
					checked: !0
				})
			}), s = i.filter(s, function(e) {
				if (e) return e
			}), e.target = s
		},
		target_event: function() {
			var e = this,
				t = e.zhibiaoContentId,
				n = r("#" + t),
				s = n.find('input[type="checkbox"]');
			r("#time_tool_setup").on({
				mouseover: function() {
					r("#" + t).show(), r(this).attr({
						info: "2"
					}), r(this).addClass("tool_setup_hover")
				},
				mouseout: function(e) {}
			}), r(document).on("mouseover", function(e) {
				var t = r(e.target),
					n = e.pageX,
					i = e.pageY;
				r("div.tool_list").each(function() {
					if (r(this).css("display") === "block") {
						var e = r(this).offset(),
							t = e.top - 30,
							s = e.left,
							o = 550,
							u = 300;
						n >= s && n <= s + o && i >= t && i <= t + u || r("div.zhibiao_cancel").trigger("click")
					}
				})
			}), r("div.zhibiao_submit", n).off("click"), r("div.zhibiao_submit", n).on("click", function() {
				n.hide(), r("#time_tool_setup").removeClass("tool_setup_hover").attr("info", "1");
				var t = "";
				s.each(function() {
					var e = r(this),
						n = r(this).attr("info");
					e.attr("checked") === "checked" && (t += n + ",")
				}), e.target = i.filter(t.split(","), function(e) {
					if (e) return e
				}), e.submitSuccess();
				var o = e.cookie_key + "=" + t;
				cnzz.tongji.fn.setCookie(o), e.refash()
			}), this.checkboxsEvent(n)
		},
		checkboxsEvent: function() {
			function o(t) {
				e.newArray = i.compact(e.newArray), e.newArray = i.uniq(e.newArray);
				var s = e.newArray.length;
				s > e.max && e.newArray.shift(), n.attr({
					checked: !1
				}), n.each(function() {
					var t = r(this),
						n = t.attr("info");
					for (var i = 0; i < e.newArray.length; i++) e.newArray[i] == n && t.attr({
						checked: !0
					})
				})
			}
			var e = this,
				t = r("#" + e.zhibiaoContentId),
				n = t.find('input[type="checkbox"]');
			e.newArray = [];
			for (var s = 0; s < e.target.length; s++) e.newArray.push(e.target[s]);
			n.off("click"), n.on("click", function(t) {
				var n = r(this).attr("info");
				if (r(this).attr("checked") === "checked") e.newArray.push(n), o(t);
				else for (var s = 0; s < e.newArray.length; s++) e.newArray[s] === n && (e.newArray[s] = "");
				e.newArray = i.compact(e.newArray), e.newArray = i.uniq(e.newArray);
				var u = e.newArray.length;
				u === e.min - 1 && t.preventDefault()
			})
		},
		submitSuccess: function() {},
		refash: function() {
			this.init_target(), this.target_event(), this.restore_default()
		}
	}, t.Zhibiao = s
});
define("http://images.cnzz.com/static/js/util/advanced_options.js", ["jquery", "underscore", "util/common"], function(e, t, n) {
	function o(e) {
		this.start(e)
	}
	var r = e("jquery"),
		i = e("underscore"),
		s = e("util/common");
	return o.prototype = {
		start: function(e) {
			var t = r("#utiladvancedOptions");
			this.el = t, r("#site_logintype").val() != "phpwind" && this.beginnersGuideForSearch(), this.filter_button1(t), this.advanced(t, e), this.advancedOptions(t), this.window_click(t)
		},
		beginnersGuideForSearch: function() {
			var e = document.body.clientWidth - 10,
				t = document.body.offsetWidth - 10,
				n = r("div.beginnersGuideBorderThree"),
				i = this.el;
			if (i.length) {
				var s = cnzz.tongji.fn.getCookie("UGAdvanced");
				s || cnzz.tongji.fn.userGuideGetStatus("UGAdvanced", function(s, o) {
					if (!o) {
						var u = i.offset().top,
							a = i.offset().left,
							f = r("#ajaxActionName").val(),
							l = r("#controller").val(),
							c = a + 310,
							p = u;
						r(window).scrollTop(400), n.css({
							width: e,
							height: t
						}).show(), n.animate({
							width: "-=" + (e - 88),
							height: "-=" + (t - 28),
							top: p,
							left: c
						}, 1e3, function() {
							var e = r("#beginnersGuideLayoutDown2");
							e.find("span.downSpanText1").html("自定义搜索条件，排除干扰条目，让数据分析更简单。"), e.find("span.downSpanText2").html("提供多种不同搜索、筛选方式。"), e.css({
								top: p - 84,
								left: c - 5
							}).fadeIn(), e.find("div.down_arrow").css({
								left: 40
							}), n.css({
								cursor: "pointer"
							})
						}), n.on("click", function() {
							r("a.closeDown", r("#beginnersGuideLayoutDown2")).trigger("click"), r("a.advanced_button").trigger("click")
						}), cnzz.tongji.fn.setCookie("UGAdvanced=1"), cnzz.tongji.fn.userGuideSaveStatus(s + "|UGAdvanced=1", function() {})
					} else cnzz.tongji.fn.setCookie("UGAdvanced=1")
				})
			}
			r("a.closeDown", r("#beginnersGuideLayoutDown2")).on("click", function() {
				r("#beginnersGuideLayoutDown2").fadeOut(), n.hide()
			})
		},
		advanced: function(e, t) {
			var n = {
				traf_keyword: "本搜索操作针对来访次数为 TOP1000 的搜索词。",
				traf_domain: "本搜索操作针对来访次数为 TOP1000 的来路域名。",
				traf_page: "本搜索操作针对访问次数为 TOP1000 的来路页面。",
				cont_domain: "本搜索操作针对浏览次数为 TOP1000 的受访域名。",
				cont_pageShoufang: "本搜索操作针对浏览次数为 TOP1000 的受访页面。",
				cont_pageIn: "本搜索操作针对浏览次数为 TOP1000 的站内入口页面。",
				cont_pageOut: "本搜索操作针对浏览次数为 TOP1000 的站内出口页面。"
			};
			r("a.advanced_button", e).on("click", function() {
				r("table.choiceContentTable", e).toggle();
				var i = r(this).text();
				"高级搜索及筛选" === i ? (r(this).text("收起"), r("div.advancedOptionsNotice").html(n[t]).show()) : (r(this).text("高级搜索及筛选"), r("div.advancedOptionsNotice").hide())
			});
			var i = {
				traf_keyword: "输入搜索词",
				traf_domain: "输入URL",
				traf_page: "输入URL",
				cont_domain: "输入URL",
				cont_pageShoufang: "输入URL",
				cont_pageIn: "输入URL",
				cont_pageOut: "输入URL"
			};
			this.input1DefaultValue = i[t], r("input.util_search_input1", e).val(this.input1DefaultValue), r("input.util_search_input1", e).on({
				focus: function() {
					var e = r(this).val();
					i[t] === e ? (r(this).val(""), r(this).css({
						color: "#000"
					})) : r(this).css({
						color: "#000"
					})
				},
				blur: function() {
					var e = r(this).val();
					r.trim(e).length === 0 ? (r(this).val(i[t]), r(this).css({
						color: "#ccc"
					})) : r(this).css({
						color: "#000"
					})
				}
			}), r("input.util_search_input2", e).on("keyup", function(t) {
				var n = r(this).val();
				n = r.trim(n), t.which === 13 && n && n.length > 0 && r("a.filter_button2", e).trigger("click")
			}), r("input.util_search_input3", e).on("keyup", function(t) {
				var n = r(this).val();
				n = r.trim(n), t.which === 13 && n && n.length > 0 && r("a.filter_button2", e).trigger("click")
			})
		},
		window_click: function(e) {
			r(window).on("click", function(t) {
				var n = r(t.target),
					i = r("ul.c-selector_list", e);
				n.attr("class") !== "select_text" && i.css("display") === "block" && (i.parent().removeClass("c-selector_up"), i.hide());
				var s = r("ul.c-selector01_list", e);
				n.attr("class") !== "select_text" && s.css("display") === "block" && (s.parent().removeClass("c-selector01_up"), s.hide());
				var o = r("ul.c-selector02_list", e);
				n.attr("class") !== "select_text" && o.css("display") === "block" && (o.parent().removeClass("c-selector02_up"), o.hide())
			})
		},
		fireSearch: function(e) {},
		filterOne: function(e) {
			this.settingOpts(e), this.fireSearch(e)
		},
		settingOpts: function(e) {
			e[1].length === 0 ? (r("#options_sourcetype").val(""), r("#options_source").val("")) : (r("#options_sourcetype").val(e[0]), r("#options_source").val(e[1])), e[4].length === 0 ? (r("#options_condtype").val(""), r("#options_condname").val(""), r("#options_condvalue").val("")) : (r("#options_condtype").val(e[2]), r("#options_condname").val(e[3]), r("#options_condvalue").val(e[4]))
		},
		filterTwo: function(e) {
			this.settingOpts(e), this.fireSearch(e)
		},
		filter_button1: function(e) {
			var t = this;
			r("input.util_search_input1", e).on("keyup", function(t) {
				t.which === 13 && r("a.filter_button1", e).trigger("click")
			}), r("a.filter_button1", e).on("click", function() {
				var n = r("input.util_search_input1", e).val();
				n = r.trim(n), n !== t.input1DefaultValue ? (r("input.util_search_input2", e).val(n), t.clearUrlAdvance(n), r("a.filter_button2", e).trigger("click")) : (r("div.choice01-title", e).hide().children("div.choice-con").hide(), r("input.util_search_input2", e).val(""), r("input.util_search_input3", e).val(""), r("td.siteType", e).find("a").removeClass("siteTypeNoSelect").addClass("siteTypeSelect"), t.filterOne(["in", "", "", "", ""]))
			})
		},
		clearUrlAdvance: function(e) {
			if (r.trim(e).length === 0) {
				var t = location.search;
				if (t && t.indexOf("&advancedKey=") !== -1) {
					t = t.slice(0, t.indexOf("&advancedKey="));
					var n = r("#siteId").val(),
						i = r("#time_st").val(),
						s = r("#time_et").val(),
						o = r("#controller").val(),
						u = r("#ajaxActionName").val(),
						a = r("#tab_index").val();
					location.href = "http://" + location.hostname + location.pathname + t + "#!/" + cnzz.tongji.global.timestamp() + "/" + o + "/" + u + "/" + a + "/" + n + "/" + i + "/" + s
				}
			}
		},
		filter_button2: function() {
			function n() {
				var n = r("ul.c-selector_list", t),
					i = r("ul.c-selector01_list", t),
					s = r("ul.c-selector02_list", t),
					o = n.prev("div").attr("info"),
					u = i.prev("div").attr("info"),
					a = s.prev("div").attr("info"),
					f = "",
					l = "",
					c = "",
					h = "",
					p = "",
					d = r("input.util_search_input2", t).val(),
					v = r("input.util_search_input3", t).val();
				e.clearUrlAdvance(d);
				if (r.trim(v).length > 0) {
					if (!/^\d+$/.test(v)) return r("span.util_search_input3Tip", t).show(), r("input.util_search_input3", t).css({
						border: "1px solid red"
					}), !1;
					r("div.choice01-title", t).show(), r("span.cond2", t).html(i.prev("div").text() + " " + s.prev("div").text() + " " + v).parent().show(), r("input.util_search_input3", t).css({
						border: "1px solid #ccc"
					}), c = u, h = a, p = v, r("span.util_search_input3Tip", t).hide()
				}
				r.trim(d).length > 0 && (r("div.choice01-title", t).show(), r("span.cond1", t).html(n.prev("div").text() + " " + d).parent().show(), f = o, l = d), r.trim(d).length === 0 && r.trim(v).length === 0 && r("div.choice01-title", t).hide(), r("table.choiceContentTable").hide(), r("a.advanced_button", t).text("高级搜索及筛选"), r("div.advancedOptionsNotice").hide();
				var m = e.handleTargetBar([f, l, c, h, p]);
				!m && e.filterTwo([f, l, c, h, p])
			}
			var e = this,
				t = this.el;
			r("a.filter_button2", t).on("click", function() {
				n()
			}), r("input.util_search_input3", t).on("focus blur", function() {
				var e = r(this).val();
				r.trim(e).length > 0 && (/^\d+$/.test(e) ? (r(this).css({
					border: "1px solid #ccc"
				}), r("span.util_search_input3Tip", t).hide()) : r("span.util_search_input3Tip", t).show())
			})
		},
		handleTargetBar: function(e) {
			var t = r("div.choice01-title").find("div.choice-con"),
				n, i, s = !1;
			return t.length === 3 ? (n = t.eq(1), i = t.eq(2)) : (n = t.eq(0), i = t.eq(1)), r.trim(e[1]).length === 0 && n.css("display") !== "none" && (n.find("a").trigger("click"), s = !0), r.trim(e[4]).length === 0 && i.css("display") !== "none" && (i.find("a").trigger("click"), s = !0), s
		},
		delete_target: function(e, t, n) {
			var i = this,
				s = this.el;
			r("a.siteTypeClose_a", s).on("click", function() {
				r(this).parent().hide();
				var e = r("input.util_search_input2", s).val(),
					t = r("input.util_search_input3", s).val();
				r.trim(e).length === 0 && r.trim(t).length === 0 && (r("div.choice01-title", s).hide(), r("#siteTypeAll").removeClass("siteTypeSelect").addClass("siteTypeNoSelect"));
				var n = r("span.siteTypeText", s).text(),
					o;
				if ("社会化媒体" === n) o = r("#siteTypeMedia");
				else if ("搜索引擎" === n) o = r("#siteTypeSearch");
				else if ("网址导航" === n) o = r("#siteTypeAddressNav");
				else {
					if ("邮箱" !== n) return !0;
					o = r("#siteTypeEmail")
				}
				o.removeClass("siteTypeNoSelect").addClass("siteTypeSelect"), r("#options_siteType").val(""), r("span.siteTypeText", s).text("");
				var u = r("#options_sourcetype").val(),
					a = r("#options_source").val(),
					f = r("#options_condtype").val(),
					l = r("#options_condname").val(),
					c = r("#options_condvalue").val();
				i.hideNotice(), i.filterTwo([u, a, f, l, c])
			}), r("a.close_a", s).on("click", function() {
				r(this).parent().hide();
				var e = r(this).parent().parent(),
					t = [];
				e.find("div.choice-con").each(function(e) {
					r(this).css("display") === "none" && t.push(e)
				}), t.length === e.find("div.choice-con").length && e.hide();
				var n = r(this).attr("infoPage");
				if (n && n === "visitorPage") {
					var s = location.search;
					if (s && s.indexOf("&advancedKey=") !== -1) {
						s = s.slice(0, s.indexOf("&advancedKey="));
						var o = r("#siteId").val(),
							u = r("#time_st").val(),
							a = r("#time_et").val(),
							f = r("#controller").val(),
							l = r("#ajaxActionName").val(),
							c = r("#tab_index").val() || 1,
							h = "http://" + location.hostname + location.pathname + s + "#!/" + cnzz.tongji.global.timestamp() + "/" + f + "/" + l + "/" + c + "/" + o + "/" + u + "/" + a;
						location.href = h
					}
				}
				i.filterTwo(i.getParam(r(this))), i.hideNotice()
			})
		},
		hideNotice: function() {
			var e = r("#options_source").val(),
				t = r("#options_condvalue").val(),
				n = r("#options_siteType").val();
			e.length === 0 && t.length === 0 && n.length === 0 && r("div.advancedOptionsNotice").hide()
		},
		getParam: function(e) {
			var t = this.el,
				n, i, s, o, u, a = r("input.util_search_input2", t).val(),
				f = r("input.util_search_input3", t).val(),
				l = r("ul.c-selector_list", t),
				c = r("ul.c-selector01_list", t),
				h = r("ul.c-selector02_list", t),
				p = l.prev("div").attr("info"),
				d = c.prev("div").attr("info"),
				v = h.prev("div").attr("info");
			s = d, o = v, u = f, n = p, i = a;
			var m = e.attr("info");
			return m === "cond1" ? (n = "", i = "", r("input.util_search_input1", t).val(""), r("input.util_search_input2", t).val(""), r("#options_source").val("")) : m === "cond2" && (s = "", o = "", u = "", r("input.util_search_input3", t).val(""), r("#options_condvalue").val("")), [n, i, s, o, u]
		},
		advancedOptions: function(e) {
			function c(e, t) {
				var n = r(e).find("a").attr("info"),
					i = r(e).find("a").text(),
					s = r(e).parent();
				s.prev("div.select_text").html(i).attr({
					info: n
				}), s.hide();
				var o = r("#ajaxActionName").val(),
					u = r("#controller").val(),
					a = r("#tab_index").val();
				o === "page" && u === "cont" ? s.find("li.contPage-" + a).show() : s.find("li").show(), t === 1 ? r(e).parent().parent().removeClass("c-selector_up") : t === 2 ? r(e).parent().parent().removeClass("c-selector01_up") : t === 3 && r(e).parent().parent().removeClass("c-selector02_up")
			}
			var t, n, i, s, o, u = this,
				a = r("ul.c-selector_list", e),
				f = r("ul.c-selector01_list", e),
				l = r("ul.c-selector02_list", e);
			r("div.select_text", e).on("click", function() {
				var t = r(this).attr("status"),
					n = r(this).attr("location") - 0,
					i = r(this).offset(),
					s = i.top,
					o = i.left,
					u = r(this).parent(),
					a = u.find("ul");
				r("div.choice01-selector", e).find("ul").hide(), r("div.select_text", e).attr({
					status: "off"
				}), r("div.select_text", e).parent().removeClass("c-selector_up").removeClass("c-selector01_up").removeClass("c-selector02_up"), t === "off" ? (a.css({
					top: s + 25,
					left: o - 11
				}).show(), n === 1 ? u.addClass("c-selector_up") : n === 2 ? u.addClass("c-selector01_up") : n === 3 && u.addClass("c-selector02_up"), r(this).attr({
					status: "on"
				})) : (a.hide(), n === 1 ? u.removeClass("c-selector_up") : n === 2 ? u.removeClass("c-selector01_up") : n === 3 && u.removeClass("c-selector02_up"), r(this).attr({
					status: "off"
				}))
			}), r(document).on("click", function(t) {
				var n = r(t.target);
				"select_text" !== n.attr("class") && (r("div.choice01-selector", e).find("ul").hide(), r("div.select_text", e).attr({
					status: "off"
				}), r("div.select_text", e).parent().removeClass("c-selector_up").removeClass("c-selector01_up").removeClass("c-selector02_up"))
			}), a.find("li").on("click", function() {
				c(this, 1)
			}), f.find("li").on("click", function() {
				c(this, 2)
			}), l.find("li").on("click", function() {
				c(this, 3)
			}), r("td.siteType", e).find("a").on("click", function() {
				var t = r(this).text();
				if (r(this).hasClass("siteTypeSelect")) {
					r("td.siteType", e).find("a").removeClass("siteTypeNoSelect").addClass("siteTypeSelect"), r(this).addClass("siteTypeNoSelect").removeClass("siteTypeSelect");
					var n = 0;
					"社会化媒体" === t ? n = 1 : "搜索引擎" === t ? n = 2 : "网址导航" === t ? n = 3 : "邮箱" === t && (n = 4);
					if (n) r("span.siteTypeText", e).text(t).parent().show().parent().show(), r("#options_siteType").val(n);
					else {
						r("#options_siteType").val(""), r("span.siteTypeText", e).text(""), r("span.siteTypeText", e).parent().hide();
						var i = r("input.util_search_input2", e).val(),
							s = r("input.util_search_input3", e).val();
						r.trim(i).length === 0 && r.trim(s).length === 0 && (r("div.choice01-title", e).hide(), r("#siteTypeAll").removeClass("siteTypeSelect").addClass("siteTypeNoSelect"))
					}
					u.filterTwo(u.getParam(r(this)))
				}
			}), u.filter_button2(), u.delete_target()
		}
	}, o
});
define("http://images.cnzz.com/static/js/util/detail_advanced_options.js", ["jquery", "underscore"], function(e, t, n) {
	function s() {
		this.start()
	}
	var r = e("jquery"),
		i = e("underscore");
	return s.prototype = {
		start: function() {
			this.el = r("#util_detail_advancedOptions"), this.advanced(), this.advancedOptions(), this.choiceTitle(), this.ip_exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, this.pvMillion()
		},
		pvMillion: function() {
			var e = this;
			r("input.inputPv100Grey").removeClass("inputPv100Style"), r("input.inputPv100Grey").removeAttr("readonly"), r("a.aPv100Grey").removeClass("aPv100Style"), r("div.pvMillionTip").hide(), r("div.pvMillionBtn").hide(), r("div.pvMillionBtn_old").show(), r("a.titleAdSearch").show(), e.pvMillion100 = !1
		},
		cond1: 0,
		cond2: 0,
		advanced: function() {
			function n(t, n) {
				var i = t.val();
				i = r.trim(i), n.which === 13 && i && i.length > 0 && r("a.filter_button2", e).trigger("click")
			}
			var e = this.el,
				t = this;
			r("a.advanced_button", e).on("click", function() {
				r("table.choice01", e).toggle();
				var n = r(this).text();
				"高级搜索及筛选" === n ? (r(this).text("收起"), t.pvMillion100 && r("div.pvMillionTip").show()) : (r(this).text("高级搜索及筛选"), r("div.pvMillionTip").hide())
			}), r("input.input_text1", e).on({
				focus: function() {
					var e = r(this).val();
					"输入完整IP" === e ? (r(this).val(""), r(this).css({
						color: "#000"
					})) : r(this).css({
						color: "#000"
					})
				},
				blur: function() {
					var e = r(this).val();
					r.trim(e).length === 0 ? (r(this).val("输入完整IP"), r(this).css({
						color: "#ccc"
					})) : r(this).css({
						color: "#000"
					})
				}
			}), r("input.input_text3, input.input_text5", e).on({
				focus: function() {
					var e = r(this).val();
					"请输入完整URL" === e ? (r(this).val(""), r(this).css({
						color: "#000"
					})) : r(this).css({
						color: "#000"
					})
				},
				blur: function() {
					var e = r(this).val();
					r.trim(e).length === 0 ? (r(this).val("请输入完整URL"), r(this).css({
						color: "#ccc"
					})) : r(this).css({
						color: "#000"
					})
				}
			}), r("input.input_text2", e).on("focus blur", function() {
				var n = r(this).val(),
					i = t.ip_exp;
				r.trim(n).length > 0 && (i.test(n) ? (r(this).css({
					border: "1px solid #ccc"
				}), r("span.input_text2Tip", e).hide()) : r("span.input_text2Tip", e).show())
			}), r("input.input_text2", e).on("keyup", function(t) {
				var n = r(this).val();
				n = r.trim(n), t.which === 13 && n && n.length > 0 && r("a.filter_button2", e).trigger("click")
			}), r("input.input_text2", e).on("keyup", function(e) {
				n(r(this), e)
			}), r("input.input_text3", e).on("keyup", function(e) {
				n(r(this), e)
			}), r("input.input_text4", e).on("keyup", function(e) {
				n(r(this), e)
			}), r("input.input_text5", e).on("keyup", function(e) {
				n(r(this), e)
			})
		},
		filterOne: function(e) {},
		filterTwo: function(e) {},
		filter_button1: function() {
			var e = this,
				t = this.el;
			r("input.input_text1", t).on("keyup", function(e) {
				e.which === 13 ? r("a.filter_button1", t).trigger("click") : (r("span.input_text1Tip", t).hide(), r("input.input_text1", t).css({
					border: "1px solid #ccc"
				}))
			}), r("a.filter_button1", t).on("click", function() {
				var n = r("input.input_text1", t),
					i = n.val(),
					s = e.ip_exp;
				i = r.trim(i);
				if (s.test(i)) {
					r("span.input_text1Tip", t).hide(), n.css({
						border: "1px solid #ccc"
					});
					var o = r("div.choiceTitle_select > div:gt(0)").find("span.ipValue");
					o.html(i), o.parent().show(), r("input.input_text2", t).val(i), e.cond2++, e.choiceTitle(), r("tr.diqu_tr, tr.diqu_tr2", t).hide(), e.filterTwo(e.getParam())
				} else {
					if ( !! i && i !== "输入完整IP") {
						n.css({
							border: "1px solid red"
						}), r("span.input_text1Tip", t).show();
						return
					}
					var u = r("input.input_text2", t).val();
					r.trim(u).length === 0 ? e.filterTwo(e.getParam()) : r("a.ipValueClose", t).trigger("click")
				}
			})
		},
		filter_button2: function() {
			var e = this,
				t = this.el;
			r("a.filter_button2", t).on("click", function() {
				function m(t, n, r) {
					var i = l.find(n).text();
					t && t.length > 0 && i.length === 0 ? (l.find(n).html(cnzz.tongji.fn.util.getAbbr(t, 20)).parent().show(), e.cond2++, e.choiceTitle()) : t && t.length > 0 && (l.find(n).html(cnzz.tongji.fn.util.getAbbr(t, 20)).parent().show(), e.choiceTitle())
				}
				var n = e.ip_exp,
					i = "http://",
					s = r("input.input_text2", t),
					o = r("input.input_text3", t),
					u = r("input.input_text4", t),
					a = r("input.input_text5", t),
					f = r("input.input_text6", t),
					l = r("div.choiceTitle_select > div:gt(0)"),
					c = s.val(),
					h = o.val(),
					p = u.val(),
					d = a.val(),
					v = f.val();
				c = r.trim(c), h = r.trim(h), p = r.trim(p), d = r.trim(d), v = r.trim(v), "请输入完整URL" === h ? h = "" : h && h.indexOf(i) === -1 && h !== "直接输入网址或书签" && (h = i + h, o.val(h)), "请输入完整URL" === d ? d = "" : d && d.indexOf(i) === -1 && d !== "直接输入网址或书签" && (d = i + d, a.val(d)), v.length > 0 && (r("#input_trackSession").val(v), r("tr.fangkeTr", t).hide(), r("tr.diqu_tr", t).hide());
				if (c.length !== 0 && !n.test(c)) return s.css({
					border: "1px solid red"
				}), r("span.input_text2Tip", t).show(), !1;
				r("input.input_text1", t).val(c), m(c, "span.ipValue", s), m(h, "span.ComeValue", o), m(p, "span.keywordValue", u), m(d, "span.pageValue", a), m(v, "span.trackSession", f), c.length > 0 && r("tr.diqu_tr, tr.diqu_tr2", t).hide(), (h.length > 0 || p.length > 0) && r("tr.laiyuanTr", t).hide(), r("table.choice01", t).hide(), r("a.advanced_button", t).text("高级搜索及筛选"), e.choiceTitle(), e.filterTwo(e.getParam())
			})
		},
		getParam: function() {
			var e = this.el,
				t = r("#util_detail_vistorType").text(),
				n = r("#util_detail_visitorAgent").text(),
				i = r("#util_detail_visitorAct").text(),
				s = r("#util_detail_location").text(),
				o = r("#util_detail_refererType").text(),
				u = "",
				a = "",
				f = "",
				l = "",
				c = "";
			t === "新访客" ? u = 1 : t === "老访客" && (u = 2), n === "移动设备访客" && (a = 1), i === "直接跳出" && (f = 1), s.length > 0 && (l = s), o === "直接输入" ? (c = 2, r("tr.comeTr", e).hide(), r("tr.keywordTr", e).hide()) : o === "搜索引擎" ? c = 3 : o === "其他外部链接" ? (c = 1, r("tr.keywordTr", e).hide()) : o === "百度" ? c = 4 : o === "谷歌" && (c = 5);
			var h = [u, a, f, l, c],
				p = r("input.input_text2", e).val(),
				d = r("input.input_text3", e).val(),
				v = r("input.input_text4", e).val(),
				m = r("input.input_text5", e).val(),
				g = r("input.input_text6", e).val();
			return d === "请输入完整URL" && (d = ""), m === "请输入完整URL" && (m = ""), h.push(p), h.push(d), h.push(v), h.push(m), h.push(g), h
		},
		choiceTitle: function() {
			var e = this.cond1,
				t = this.cond2,
				n = this.el;
			e === 0 ? r("div.choice01-title1", n).hide() : r("div.choice01-title1", n).show(), t === 0 ? r("div.choiceTitle_select", n).hide() : r("div.choiceTitle_select", n).show()
		},
		advancedOptions: function() {
			var e = this.el,
				t = this,
				n = r("div.choiceTitle", e);
			r("a.diqu_zhankai", e).on("click", function() {
				var e = r(this),
					t = e.attr("info_a") - 0;
				t === 1 ? (e.html("【展开-】"), e.parent().parent().next().show(), e.attr({
					info_a: 2
				})) : t === 2 && (e.html("【展开+】"), e.parent().parent().next().hide(), e.attr({
					info_a: 1
				}))
			});
			var i = r("table.choiceSelect tr", e);
			r("a.choice_close", e).on("click", function() {
				var n = r(this).parent(),
					s = n.attr("info");
				n.hide(), r(this).siblings("span.green12").html(""), t.cond1--, t.choiceTitle(), i.each(function() {
					var t = r(this).attr("info");
					if (s === t) if (s === "diqu") if (r(this).attr("class").indexOf("diqu_tr2") !== -1) {
						var n = r("a.diqu_zhankai", e).attr("info_a");
						n == "2" ? r(this).show() : n == "1" && r(this).hide()
					} else r(this).show();
					else r(this).show()
				}), s === "laiyuan" && (r("tr.comeTr", e).show(), r("tr.keywordTr", e).show(), r("a.titleAdSearch").show()), s === "fangke" && (r("span.trackSession", e).text().length === 0 ? r("tr.fangkeTr", e).show() : r("tr.fangkeTr", e).hide()), t.filterTwo(t.getParam())
			}), i.find("a").not("a.diqu_zhankai").on("click", function() {
				var n = r(this).parent().parent(),
					i = n.attr("info"),
					s = r(this).text();
				r(this).attr("id") || (r("div.choiceTitle > div", e).each(function() {
					var e = r(this).attr("info");
					i === e && (r(this).find("span.green12").html(s), r(this).show(), t.cond1++, t.choiceTitle(), t.filterTwo(t.getParam()))
				}), i === "diqu" ? r("table.choice01", e).find("tr.diqu_tr").hide() : n.hide())
			}), this.filter_button1(), this.filter_button2(), r("a.choice_close2", e).on("click", function() {
				var n = r(this).parent(),
					i = n.attr("info");
				n.hide(), r(this).siblings("span.green12").html("");
				var s = r(this).siblings("span.green12").attr("info");
				if (s === "input_text2") {
					r("input." + s, e).val(""), r("input.input_text1", e).val("");
					var o = r("a.diqu_zhankai", e).attr("info_a");
					r("tr.diqu_tr", e).show(), o == "1" ? r("tr.diqu_tr2", e).hide() : r("tr.diqu_tr2", e).show()
				} else r("input." + s, e).val("");
				t.cond2--, t.choiceTitle(), !! r("input.input_text3", e) && !! r("input.input_text4", e) && r("input.input_text3", e).val() && r("input.input_text3", e).val().length === 0 && r("input.input_text4", e).val() && r("input.input_text4", e).val().length === 0 && r("tr.laiyuanTr", e).show();
				if (s === "input_text4") {
					var u = location.search;
					if (u && u.indexOf("&advancedKey=") !== -1) {
						u = u.slice(0, u.indexOf("&advancedKey="));
						var a = r("#siteId").val(),
							f = r("#time_st").val(),
							l = r("#time_et").val(),
							c = r("#tab_index").val() || 1,
							h = "http://" + location.hostname + location.pathname + u + "#!/" + cnzz.tongji.global.timestamp() + "/flow/detail/" + c + "/0/" + a + "/" + f + "/" + l;
						location.href = h
					} else t.filterTwo(t.getParam())
				} else {
					if (s === "input_text6") {
						r("tr.fangkeTr", e).show();
						var o = r("a.diqu_zhankai", e).attr("info_a");
						r("tr.diqu_tr", e).show(), o == "1" ? r("tr.diqu_tr2", e).hide() : r("tr.diqu_tr2", e).show()
					}
					t.filterTwo(t.getParam())
				}
			})
		}
	}, s
});
define("http://images.cnzz.com/static/js/util/datepicker.js", ["jquery"], function(e, t, n) {
	function c() {
		this._init.apply(this, arguments)
	}
	function h(e, t) {
		this.oToday = s.getDateByStringDate(e), this.sToday = e, this.sminDate = t, this.getWeekDay = this.oToday.getUTCDay() + 1, this.getMonthDay = this.oToday.getUTCDate() + 1, this.today_date = this.sToday + "至" + this.sToday;
		var n = s.getDate(this.sToday, -1);
		cnzz.tongji.fn.compare_date(this.sminDate, n) ? this.yesterday_date = n + "至" + n : this.yesterday_date = this.sminDate + "至" + this.sminDate;
		var r = s.getDate(this.sToday, -7);
		cnzz.tongji.fn.compare_date(this.sminDate, r) ? this.last7_date = r + "至" + this.sToday : this.last7_date = this.sminDate + "至" + this.sToday;
		var i = s.getDate(this.sToday, -30);
		cnzz.tongji.fn.compare_date(this.sminDate, i) ? this.last30_date = i + "至" + this.sToday : this.last30_date = this.sminDate + "至" + this.sToday;
		var o = "";
		this.getWeekDay === 1 ? o = this.sToday : o = s.getDate(this.sToday, -this.getWeekDay);
		var u = s.getDate(this.sToday, -this.getWeekDay);
		cnzz.tongji.fn.compare_date(this.sminDate, u) ? this.week_date = u + "至" + this.sToday : this.week_date = this.sminDate + "至" + this.sToday;
		var a = "";
		this.getMonthDay === 1 ? a = this.sToday : a = s.getDate(this.sToday, -this.getMonthDay);
		var f = a;
		cnzz.tongji.fn.compare_date(this.sminDate, f) ? this.month_date = a + "至" + this.sToday : this.month_date = this.sminDate + "至" + this.sToday;
		var l = s.getDate(o, -8),
			c = s.getDate(o, -1);
		cnzz.tongji.fn.compare_date(this.sminDate, l) || (l = this.sminDate), cnzz.tongji.fn.compare_date(this.sminDate, c) || (c = this.sminDate), this.lastweek_date = l + "至" + c;
		var h = s.getMonthDays(this.oToday),
			p = s.getDate(a, -h - 1),
			d = s.getDate(a, -1);
		cnzz.tongji.fn.compare_date(this.sminDate, p) || (p = this.sminDate), cnzz.tongji.fn.compare_date(this.sminDate, d) || (d = this.sminDate), this.lastmonth_date = d + "至" + p, this.prev_date = function(e) {
			return s.getPrevSameTime(e, this.sminDate, this.sToday)
		}
	}
	var r = e("jquery"),
		i = {},
		s = {
			formatNum: function(e) {
				return e.toString().replace(/^(\d)$/, "0$1")
			},
			formatStrDate: function(e) {
				switch (typeof e) {
				case "string":
					return e = e.split(/-|\//g), e[0] + "-" + this.formatNum(e[1]) + "-" + this.formatNum(e[2]);
				case "object":
					return e.getFullYear() + "-" + this.formatNum(e.getMonth() + 1) + "-" + this.formatNum(e.getDate())
				}
			},
			formatIntDate: function(e) {
				return this.formatStrDate(e).replace(/-|\//g, "")
			},
			getThreeDays: function(e, t) {
				var n = {},
					r = e.split(/-|\//g),
					e, s;
				for (s = 0; s < 7; s++) e = this.formatStrDate(new Date(r[0], r[1] - 1, r[2] - 0 + (s - 3))), n[e] = t + (s != 3 ? (s < 3 ? "前" : "后") + Math.abs(s - 3) + "天" : ""), s > 2 && (i[e] = t + (s != 3 ? (s < 3 ? "前" : "后") + Math.abs(s - 3) + "天" : ""));
				return n
			},
			addObject: function(e, t) {
				for (var n in t) e[n] || (e[n] = t[n])
			},
			getPos: function(e) {
				var t = document.documentElement.scrollTop || document.body.scrollTop,
					n = document.documentElement.scrollLeft || document.body.scrollLeft,
					r = e.getBoundingClientRect();
				return {
					top: r.top + t,
					left: r.left + n - 11,
					right: r.right + n,
					bottom: r.bottom + t
				}
			},
			$: function(e, t) {
				switch (e.charAt(0)) {
				case "#":
					return document.getElementById(e.substring(1));
				case ".":
					var n = new RegExp("(^|\\s)" + e.substring(1) + "(\\s|$)"),
						r = [],
						i = s.$("*", t),
						o;
					for (o = 0; o < i.length; o++) n.test(i[o].className) && r.push(i[o]);
					return r;
				default:
					return (t || document).getElementsByTagName(e)
				}
			},
			indexOf: function(e, t) {
				for (var n = t.length; n--;) if (typeof e == "string" ? this.hasClass(t[n].children[0] || t[n], e) : e == t[n]) return n;
				return -1
			},
			hasClass: function(e, t) {
				return (new RegExp("(^|\\s)" + t + "(\\s|$)")).test(e.className)
			},
			addClass: function(e, t) {
				var n = e.className.split(/\s+/);
				this.hasClass(e, t) || n.push(t), e.className = n.join(" ").replace(/(^\s*)|(\s*$)/, "")
			},
			removeClass: function(e, t) {
				e.className = e.className.replace(new RegExp("(^|\\s)" + t + "(\\s|$)", "g"), "").split(/\s+/).join(" ")
			},
			on: function(e, t, n) {
				e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n)
			},
			halt: function(e) {
				e = e || event, e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
			},
			contains: function(e, t) {
				if (e.contains) return e.contains(t);
				if (e.compareDocumentPosition) return !!(e.compareDocumentPosition(t) & 16)
			},
			toArray: function(e) {
				for (var t = [], n = 0, r = e.length; n < r; n++) t.push(e[n]);
				return t
			},
			getTimeByStringDate: function(e) {
				if (e && e !== "undefined") return this.getDateByStringDate(e).getTime()
			},
			getDateByStringDate: function(e) {
				var t = /^\d{4}-\d{1,2}-\d{1,2}$/;
				if (!t.test(e)) return !1;
				var n = e.split("-"),
					r = n[1];
				parseInt(r) === 0 ? r = r.slice(1) - 1 : r -= 1;
				var i = n[2];
				return i.length === 1 && (i = "0" + i), new Date(n[0], r, i)
			},
			getDate: function(e, t) {
				if (e && t && typeof t == "number") {
					parseInt(t) > 1 ? t -= 1 : parseInt(t) < -1 && (t += 1);
					var n = e.split("-"),
						r = (new Date(n[0], n[1] - 1, n[2])).getTime(),
						t = t * 864e5,
						i = r + t,
						s = new Date(i),
						o = s.getMonth() + 1,
						u = s.getDate();
					return parseInt(o) < 10 && (o = "0" + o), parseInt(u) < 10 && (u = "0" + u), s.getFullYear() + "-" + o + "-" + u
				}
				return e
			},
			getPrevSameTime: function(e, t, n) {
				var r = e.split("至")[0],
					i = e.split("至")[1],
					o = this.getIntervalsByDates(t + "至" + r) - 0,
					u = this.getIntervalsByDates(i + "至" + n) - 0,
					a = this.getIntervalsByDates(e) - 0;
				if (a === 0) return s.getDate(r, -1) + "至" + s.getDate(r, -1);
				if (o > a) {
					var f = s.getDate(r, -1),
						l = s.getDate(f, -a);
					return l + "至" + f
				}
				if (u > a) {
					var f = s.getDate(i, 1),
						l = s.getDate(f, a);
					return l + "至" + f
				}
				return e
			},
			getIntervalsByDates: function(e) {
				var t = e.split("至")[0],
					n = e.split("至")[1];
				if (t === n) return 0;
				var r = this.getTimeByStringDate(t),
					i = this.getTimeByStringDate(n),
					s = parseInt((i - r) / 864e5);
				return s > 0 ? s + 1 : -s - 1
			},
			getMonthDays: function(e) {
				var t = e.getMonth(),
					n = e.getYear(),
					n = e.getYear();
				n += n < 2e3 ? 1900 : 0, n = n, t == 0 && (n -= 1);
				var r = new Date(n, t, 0),
					i = r.getDate();
				return i
			},
			getPrevMonthDays: function(e, t) {
				var n = this.getDateByStringDate(e),
					r = this.getDateByStringDate(t);
				if (r.getTime() > n.getTime()) return t + "至" + t;
				var i = n.getMonth() - 0 + 1,
					s = n.getFullYear() - 0,
					o = new Date(s, i - 1, 0),
					u = o.getDate(),
					a = o.getFullYear() + "-" + (o.getMonth() - 0 + 1).toString().replace(/^(\d)$/, "0$1") + "-" + "01",
					f = o.getFullYear() + "-" + (o.getMonth() - 0 + 1).toString().replace(/^(\d)$/, "0$1") + "-" + u;
				return this.getDateByStringDate(a).getTime() < r.getTime() && (a = t), this.getDateByStringDate(f).getTime() < r.getTime() && (f = t), a + "至" + f
			},
			getPrevWeekDays: function(e, t) {
				var n = this.getDateByStringDate(e),
					r = this.getDateByStringDate(t);
				if (r.getTime() > n.getTime()) return t + "至" + t;
				var i = n.getDay() - 0,
					s = this.getDate(e, -(7 + i)),
					o = this.getDate(e, -(i + 1));
				return this.getDateByStringDate(s).getTime() < r.getTime() && (s = t), this.getDateByStringDate(o).getTime() < r.getTime() && (o = t), s + "至" + o
			}
		},
		o = ['<div class="cal-container">', "<dl>", '<dt class="date"></dt>', "<dt><strong>日</strong></dt>", "<dt>一</dt>", "<dt>二</dt>", "<dt>三</dt>", "<dt>四</dt>", "<dt>五</dt>", "<dt style='width:27px;'><strong>六</string></dt>", "<dd></dd>", "</dl>", "</div>"],
		u = {
			today: "今天",
			yuandan: "元旦",
			chuxi: "除夕",
			chunjie: "春节",
			yuanxiao: "元宵节",
			qingming: "清明",
			wuyi: "劳动节",
			duanwu: "端午节",
			zhongqiu: "中秋节",
			guoqing: "国庆节"
		},
		a = {
			today: [s.formatStrDate(new Date)],
			yuandan: ["2012-01-01", "2013-01-01", "2014-01-01", "2015-01-01", "2016-01-01", "2017-01-01", "2018-01-01", "2019-01-01", "2020-01-01"],
			chuxi: ["2012-01-22", "2013-02-09", "2014-01-30", "2015-02-18", "2016-02-07", "2017-01-27", "2018-02-15", "2019-02-04", "2020-01-24"],
			chunjie: ["2012-01-23", "2013-02-10", "2014-01-31", "2015-02-19", "2016-02-08", "2017-01-28", "2018-02-16", "2019-02-05", "2020-01-25"],
			yuanxiao: ["2012-02-06", "2013-02-24", "2014-2-14", "2015-03-05", "2016-02-22", "2017-02-11", "2018-03-02", "2019-02-19", "2020-02-8"],
			qingming: ["2012-04-04", "2013-04-04", "2014-04-05", "2015-04-05", "2016-04-04", "2017-04-04", "2018-04-05", "2019-04-05", "2020-04-04"],
			wuyi: ["2012-05-01", "2013-05-01", "2014-05-01", "2015-05-01", "2016-05-01", "2017-05-01", "2018-05-01", "2019-05-01", "2020-05-01"],
			duanwu: ["2012-06-23", "2013-06-12", "2014-06-02", "2015-06-20", "2016-06-09", "2017-05-30", "2018-06-18", "2019-06-07", "2020-06-25"],
			zhongqiu: ["2012-09-30", "2013-09-19", "2014-09-08", "2015-09-27", "2016-09-15", "2017-10-04", "2018-09-24", "2019-09-13", "2020-10-01"],
			guoqing: ["2012-10-01", "2013-10-01", "2014-10-01", "2015-10-01", "2016-10-01", "2017-10-01", "2018-10-01", "2019-10-01", "2020-10-01"]
		};
	for (var f in a) {
		if (f == "today") continue;
		for (var l = 0; l < a[f].length; l++) s.addObject(i, s.getThreeDays(a[f][l], u[f]))
	}
	c.prototype = {
		constructor: c,
		reg: /-|\//g,
		rDate: /^\d{4}-\d{1,2}-\d{1,2}$/,
		_init: function(e) {
			e = e || {}, this.isPopup = e.isPopup, this.id = this.isPopup ? "C_" + +(new Date) : e.id.replace(/^#/, "") || "C_" + +(new Date), this.container = s.$("#" + this.id) || document.createElement("div"), this.isSelect = e.isSelect, this.isPrevBtn = e.isPrevBtn, this.isNextBtn = e.isNextBtn, this.isCloseBtn = e.isCloseBtn, this.isHoliday = e.isHoliday, this.isHolidayTips = e.isHolidayTips, this.isReadonly = e.isReadonly, this.isDateInfo = e.isDateInfo, this.dateInfoClass = e.dateInfoClass || "date-info", this.isMessage = e.isMessage, this.sMessage = e.sMessage || "", this.CalStart = e.CalStart || null, this.isCalStart = e.isCalStart, this.CalEnd = e.CalEnd || null, this.isCalEnd = e.isCalEnd, this.count = e.count || 1, this.monthStep = e.monthStep || this.count, this.revise = {
				left: 0,
				top: 0
			}, this.triggerNode = s.$("#" + e.id.replace(/^#/, "")), this.idName = e.id.replace(/^#/, ""), this.date = e.date || new Date, this.year = this.date.getFullYear(), this.month = s.formatNum(this.date.getMonth() + 1), this.startDate = e.startDate, this.endDate = e.endDate, this.selectDate = e.selectDate && s.formatStrDate(e.selectDate), this.html = e.html || "", this.berfore = e.berfore ||
			function() {}, this.submit = e.submit ||
			function() {}, this.cancel = e.cancel ||
			function() {}, this.today = e.today || s.formatStrDate(new Date);
			if (!this.triggerNode) return;
			this.range = e.range || {
				minDate: null,
				maxDate: null
			}, this._create(), this.render(), this._addEvent()
		},
		_create: function() {
			var e = [],
				t = 0,
				n = null,
				r = document.createElement("div"),
				i = document.createElement("div");
			this.isPrevBtn && e.push('<span class="cal-prev">prev</span>'), this.isNextBtn && e.push('<span class="cal-next">next</span>'), this.isCloseBtn && e.push('<span class="cal-close">close</span>'), e.push('<div class="right_quickButton">' + this.html + "</div>"), e.push('<div class="bottom_button"><p class="fleft">统计开通日期：' + this.startDate + "</p>" + "<p>" + '<a class="button-submit submitA a_0 ">确定</a>' + '<a class="button-close blue12">&nbsp;&nbsp;&nbsp;&nbsp;关闭</a>' + "</p>" + "</div>");
			for (t = this.count; t--;) e = e.concat(o);
			r.className = "calendar", r.innerHTML = e.join(""), !this.isPrevBtn && !this.isNextBtn && !this.isCloseBtn && (r.style.paddingLeft = r.style.paddingRight = "5px"), this.container.id = this.id, this.container.className = "datepicker_container", this.container.appendChild(r), this.isMessage && (this.oMsg = i, i.className = "cal-msg", i.innerHTML = this.sMessage, i.style.display = this.sMessage ? "block" : "none", this.container.insertBefore(i, r)), !! window.ActiveXObject && !window.XMLHttpRequest && (n = document.createElement("iframe"), this.container.appendChild(n)), document.getElementById(this.id) || document.body.appendChild(this.container);
			if (n) {
				var s = n.style;
				s.position = "absolute", s.top = s.left = "-1px", s.filter = "alpha(opacity=0)", s.zIndex = -1, s.border = 0, s.width = this.container.offsetWidth + "px", s.height = this.container.offsetHeight + "px"
			}
			this.isPopup && (this.hide().container.style.position = "absolute"), this.triggerNode.tagName.toUpperCase() === "INPUT" && (this.isReadonly && (this.triggerNode.readOnly = !0), this.isDateInfo && (this.triggerNodeParent = document.createElement("div"), this.oDateInfo = document.createElement("span"), this.oDateInfo.className = this.dateInfoClass, this.triggerNode.style.position = "absolute", this.triggerNodeParent.style.position = "relative", this.triggerNodeParent.style.display = "inline-block", this.triggerNodeParent.style.width = this.triggerNode.offsetWidth + "px", this.triggerNodeParent.style.height = this.triggerNode.offsetHeight + "px", this.triggerNode.parentNode.insertBefore(this.triggerNodeParent, this.triggerNode), this.triggerNodeParent.appendChild(this.triggerNode), this.triggerNodeParent.appendChild(this.oDateInfo)), this.triggerNode.value != "" && this.isHolidayTips && this.setDateInfo())
		},
		_draw: function(e, t) {
			var n = this,
				r = e.getElementsByTagName("dt")[0],
				i = e.getElementsByTagName("dd")[0],
				s = document.createDocumentFragment(),
				o = document.createDocumentFragment(),
				u, a, f, l;
			if (this.isSelect) {
				f = document.createElement("div"), this.selectYear = document.createElement("select"), this.selectMonth = document.createElement("select"), a = document.createDocumentFragment();
				for (l = (new Date).getFullYear(); l >= 1900; l--) u = document.createElement("option"), u.value = u.innerHTML = l, u.selected = this.year == l, s.appendChild(u);
				for (l = 1; l <= 12; l++) u = document.createElement("option"), u.value = u.innerHTML = l, u.selected = this.month == l, o.appendChild(u);
				this.selectYear.appendChild(s), this.selectMonth.appendChild(o), f.appendChild(this.selectYear), f.appendChild(this.selectMonth), f.appendChild(document.createTextNode("月")), f.insertBefore(document.createTextNode("年"), this.selectMonth), r.innerHTML = "", r.appendChild(f), this.selectYear.onchange = this.selectMonth.onchange = function() {
					n.render(new Date(n.selectYear.value, n.selectMonth.value - 1))
				}
			} else r.innerHTML = t.year + "年" + t.month + "月";
			i.innerHTML = "", i.appendChild(this._createDays(t.year, t.month))
		},
		_createDays: function(e, t) {
			var n = (new Date(e, t, 0)).getDate(),
				r = (new Date(e, t - 1, 1)).getDay(),
				i = [],
				o = [],
				a = document.createDocumentFragment(),
				f, l, c, h, p;
			for (f = r; f--;) i.push(0);
			for (f = 1; f <= n; f++) i.push(f);
			while (i.length) for (f = 0, l = i.length; f < l; f++) if (i.length) {
				h = document.createElement("a"), $(h).attr({
					info: "datepicker"
				}), c = i.shift();
				if (!c) h.className = "disabled", h.innerHTML = "&nbsp;";
				else {
					h.href = "javascript:;", h.innerHTML = c, h["data-date"] = s.formatStrDate(e + "-" + t + "-" + c), p = s.formatIntDate(h["data-date"]), this.startDate && p < s.formatIntDate(this.startDate) && (h.className = "disabled"), this.endDate && p > s.formatIntDate(this.endDate) && (h.className = "disabled");
					if (this.isHoliday) for (var d in u) {
						if (h.className == "disabled") continue;
						this._isHoliday(h, d)
					}
					this.selectDate == h["data-date"] && ((h.children[0] || h).className = "selected"), this.startDate == h["data-date"] && ((h.children[0] || h).className = "start-date"), this.endDate == h["data-date"] && ((h.children[0] || h).className = "end-date"), this.range.minDate && this.range.maxDate && p >= s.formatStrDate(this.range.minDate).replace(this.reg, "") && p <= s.formatStrDate(this.range.maxDate).replace(this.reg, "") && ((h.children[0] || h).className = "select-range")
				}
				a.appendChild(h)
			}
			return a
		},
		_isHoliday: function(e, t) {
			(new RegExp(e["data-date"])).test(a[t].join()) && (e.className = t, e.innerHTML = "<span>" + e.innerHTML.replace(/<[^>]+>/, "") + "</span>")
		},
		_setPos: function() {
			var e, t, n, r = /msie\s(\d+\.\d+)/i.test(navigator.userAgent) ? RegExp.$1 : undefined;
			e = s.getPos(this.triggerNode).bottom + this.revise.top - (r < 8 ? 2 : 0), t = s.getPos(this.triggerNode).left + this.revise.left - (r < 8 ? 2 : 0), n = e - 211 - this.triggerNode.offsetHeight - this.revise.top * 2, e > document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop) - 211 && (e = n < 0 ? e : n), this.container.style.top = e + "px", this.container.style.left = t - 362 + "px"
		},
		_addEvent: function() {
			var e = this,
				t = this.container,
				n = new h(e.today, e.startDate);
			s.on(t, "click", function(i) {
				e.isHide = !0, e.closeTimer && clearTimeout(e.closeTimer), i = i || event;
				var o = i.target || i.srcElement;
				if (r(o).hasClass("submitA") && !r(o).hasClass("button-submit")) return !0;
				o.className && o.className.indexOf(" ") > 1 && (o.className = o.className.split(" ")[0]);
				var u = r("#datepicker_compareDate").val(),
					a = r("#datepickerInput").val();
				switch (o.className) {
				case "cal-close":
					e.hide();
					break;
				case "button-close":
					e.cancel(), e.hide();
					break;
				case "button-submit":
					e.submit(e.triggerNode.value), e.hide();
					break;
				case "cal-prev":
					e.prevMonth();
					break;
				case "cal-next":
					e.nextMonth();
					break;
				case "today_date":
					e.setDateInfo(n.today_date);
					break;
				case "yesterday_date":
					e.setDateInfo(n.yesterday_date);
					break;
				case "last7_date":
					e.setDateInfo(n.last7_date);
					break;
				case "last30_date":
					e.setDateInfo(n.last30_date);
					break;
				case "week_date":
					e.setDateInfo(n.week_date);
					break;
				case "lastweek_date":
					e.setDateInfo(n.lastweek_date);
					break;
				case "month_date":
					e.setDateInfo(n.month_date);
					break;
				case "lastmonth_date":
					e.setDateInfo(n.lastmonth_date);
					break;
				case "prev_1_date":
					e.setDateInfo(s.getDate(a.split("至")[0], -1) + "至" + s.getDate(a.split("至")[0], -1));
					break;
				case "prev_month_dates":
					e.setDateInfo(s.getPrevMonthDays(a.split("至")[0], e.startDate));
					break;
				case "prev_week_dates":
					e.setDateInfo(s.getPrevWeekDays(a.split("至")[0], e.startDate));
					break;
				case "prev_week_date":
					e.setDateInfo(s.getDate(a.split("至")[0], -8) + "至" + s.getDate(a.split("至")[0], -8));
					break;
				case "prev_month_date":
					var f = s.getDateByStringDate(r("#datepickerInput").val().split("至")[0]),
						l = f.getYear();
					l += l < 2e3 ? 1900 : 0, l = l;
					var c = new Date(l, f.getMonth() - 1, f.getDate());
					c = s.formatStrDate(c), e.setDateInfo(c + "至" + c);
					break;
				case "prev_7_date":
					e.setDateInfo(u);
					break;
				case "prev_30_date":
					e.setDateInfo(u);
					break;
				case "prev_same_date":
					e.setDateInfo(u);
					break;
				case "lastmonth_date":
					e.setDateInfo(u)
				}
				o.className && (r("a").removeClass("cal-selected").parent().removeClass("calSelected"), r("a." + o.className).addClass("cal-selected").parent().addClass("calSelected")), o.parentNode.tagName.toUpperCase() === "A" && (o = o.parentNode), o.tagName.toUpperCase() === "A" && o.className != "disabled" && $(o).attr("info") === "datepicker" && e.run("dateClick", o), e.isPopup && s.contains(t, o) && s.halt(i)
			}), this.isPopup && (r(this.triggerNode).off("focus"), s.on(this.triggerNode, "focus", function(t) {
				e.isHide = !1, e.closeTimer && clearTimeout(e.closeTimer), t = t || event;
				var n = t.target || t.srcElement,
					i = s.$("iframe", e.container)[0];
				e._setPos(), r("div.datepicker_container").hide(), e.berfore(e.triggerNode.value), e.show(), n.select && n.select(), i && (i.style.width = e.container.offsetWidth + "px", i.style.height = e.container.offsetHeight + "px")
			}), s.on(window, "resize", function() {
				e._setPos()
			})), this.oDateInfo && s.on(this.oDateInfo, "click", function(t) {
				e.focus(), s.halt(t || event)
			})
		},
		render: function(e) {
			var e = e || this.date,
				t = s.$(".cal-container", this.container),
				n, r, i;
			e = typeof e == "string" ? new Date(e.split(this.reg)[0], s.formatNum(e.split(this.reg)[1] - 1)) : e, n = e.getFullYear(), r = e.getMonth() + 1, this.year = n, this.month = r;
			for (i = 0, len = t.length; i < len; i++) n += r + (i ? 1 : 0) > 12 ? 1 : 0, r = (r + (i ? 1 : 0)) % 12 || 12, this._draw(t[i], {
				year: n,
				month: r
			})
		},
		nextMonth: function() {
			var e = new Date(this.year, this.month + (this.monthStep - 1), 1);
			e.getTime() < s.getTimeByStringDate(this.endDate) && (this.render(new Date(this.year, this.month + (this.monthStep - 1), 1)), this.run("nextMonthClick"))
		},
		prevMonth: function() {
			var e = new Date(this.year, this.month - this.monthStep, 1);
			e.getTime() > s.getTimeByStringDate(this.startDate) && (this.render(new Date(this.year, this.month - (this.monthStep + 1), 1)), this.run("prevMonthClick"))
		},
		show: function() {
			return this.container.style.display = "block", this.run("show"), this
		},
		hide: function() {
			return this.container.style.display = "none", this.isMessage && this.hideMessage(), this.run("hide"), this
		},
		setDateInfo: function(e) {
			if (!this.triggerNode) return;
			var t = this,
				n = e.split("至")[0],
				r = e.split("至")[1];
			if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(n) && /^\d{4}-\d{1,2}-\d{1,2}$/.test(r)) {
				var i = s.getTimeByStringDate(n),
					o = s.getTimeByStringDate(r);
				o > i ? (this.range.minDate = n, this.range.maxDate = r, this.triggerNode.value = e, this.render(n)) : (this.range.minDate = r, this.range.maxDate = n, this.triggerNode.value = r + "至" + n, this.render(r))
			} else log("日期格式不正确")
		},
		getDate: function(e, t) {
			var n = e.split(this.reg);
			return s.formatStrDate(new Date(n[0], n[1] - 1, n[2] - 0 + (t || 0)))
		},
		getDateInfo: function(e) {
			var t = this,
				n = e.split(this.reg),
				r = new Date(n[0], n[1] - 1, n[2]),
				o = ["今天", "明天", "后天"],
				f = "星期" + ["日", "一", "二", "三", "四", "五", "六"][r.getDay()],
				l, c;
			return {
				week: f,
				holiday: function() {
					for (c in a) if ((new RegExp(e)).test(a[c])) return u[c];
					return l = s.formatIntDate(e) - s.formatIntDate(new Date), l >= 0 && l <= 2 ? o[l] : t.isHolidayTips ? i[e] || f : f
				}()
			}
		},
		showRange: function() {
			var e = this;
			s.on(this.container, "mouseover", function(t) {
				function a() {
					for (o = r.length; o--;) s.removeClass(r[o].children[0] || r[o], "hover")
				}
				t = t || event;
				var n = t.target || t.srcElement,
					r = s.$("a", e.container),
					i = s.indexOf("start-date", r),
					o;
				if (!e.startDate) return;
				n.parentNode.tagName.toUpperCase() === "A" && (n = n.parentNode);
				if (n.tagName.toUpperCase() === "A") {
					var u = s.indexOf(n, r);
					a();
					for (o = i + 1; o < u; o++) s.hasClass(r[o].children[0] || r[o], "end-date") || s.addClass(r[o].children[0] || r[o], "hover")
				} else a()
			})
		},
		focus: function() {
			this.triggerNode.focus()
		},
		keyup: function() {
			var e = this,
				t = e.CalStart,
				n = e.CalEnd;
			s.on(e.triggerNode, "keyup", function(r) {
				r = r || event;
				var i = r.target || r.srcElement,
					o = i.value;
				e.rDate.test(o) ? (o = s.formatStrDate(o), o != (e.isCal_start ? e.startDate : e.endDate) && (e.isCalStart ? (t.startDate = n.startDate = o, t.render(o), e.setDateInfo(e.triggerNode.value), n.render(n.endDate || o)) : e.isCalEnd && (t.endDate = n.endDate = o, n.render(o), e.setDateInfo(e.triggerNode.value), t.render()))) : (e.isCalStart ? (t.startDate = n.startDate = "", t.render(new Date), n.render(new Date)) : e.isCalEnd && (t.endDate = n.endDate = "", t.render(new Date), n.render(new Date)), e.setDateInfo(""))
			})
		},
		showMessage: function(e) {
			this.oMsg && (this.oMsg.innerHTML = e, this.oMsg.style.display = "block", this.focus())
		},
		hideMessage: function() {
			this.oMsg && (this.oMsg.style.display = "none")
		},
		_addCustomEvent: function(e, t) {
			this._eventQueue || (this._eventQueue = {}), this._eventQueue[e] ? this._eventQueue[e].push(t) : this._eventQueue[e] = [t]
		},
		_delCustomEvent: function(e, t) {
			var n = this._eventQueue[e];
			if (n) for (var r = n.length; r--;) n[r] == t && (n[r] = null, n.splice(r, 1))
		},
		_fireCustomEvent: function(e) {
			if (this._eventQueue) {
				var t = this._eventQueue[e];
				if (t) for (var n = 0, r = t.length; n < r; n++) t[n] && t[n].apply(this, arguments[1] || [])
			}
		},
		on: function(e, t) {
			this._addCustomEvent(e, t)
		},
		un: function(e, t) {
			this._delCustomEvent(e, t)
		},
		run: function(e) {
			var t = s.toArray(arguments);
			this._fireCustomEvent(t.shift(), t), this._setPos()
		}
	}, t._CAL = s, t.Calendar = c, t.DateCommon = h
});
define("http://images.cnzz.com/static/js/util/timeBar.js", ["jquery", "underscore", "backbone", "util/common", "util/datepicker", "util/zhibiao"], function(e, t, n) {
	function a(e, t) {
		this.st = e, this.et = t, this.siteId = r("#siteId").val()
	}
	var r = e("jquery"),
		i = e("underscore"),
		s = e("backbone"),
		o = e("util/common"),
		u = e("util/datepicker");
	a.prototype = {
		start: function() {
			this.set_gobal_time(this.st, this.et), this.view_barScroll();
			var e = r("#ajaxActionName").val(),
				t = r("#controller").val();
			e && "realtime" !== e && "detail" !== e && "updown" !== e && "userview" !== e && "funnel" !== e && ("flow" !== e || t !== "cont") && this.view_datepicker()
		},
		set_gobal_time: function(e, t) {
			function v() {
				var e = r("#time_select").val(),
					t = r("#timePrevious"),
					i = r("#timeNext");
				e === "one" || e === "noSelect" ? (t.attr({
					title: "前1日"
				}), i.attr({
					title: "后1日"
				}), n.st === n.et ? r("#time_select").val("one") : r("#time_select").val("noSelect"), m = 1) : e === "week" ? (t.attr({
					title: "前1周"
				}), i.attr({
					title: "后1周 "
				}), m = 7) : e === "day7" ? (t.attr({
					title: "前7日"
				}), i.attr({
					title: "后7日"
				}), m = 7) : e === "day30" ? (t.attr({
					title: "前30日"
				}), i.attr({
					title: "后30日"
				}), m = 30) : e === "month" ? (t.attr({
					title: "前1月"
				}), i.attr({
					title: "后1月"
				}), m = 30) : m = 1, r("#time_interval").val(m)
			}
			function w() {
				var e = [],
					t = r("#time_info_today").val(),
					n = r("#time_info_add_stat_time").val(),
					i = r("#time_st").val(),
					s = r("#time_et").val();
				return i === n ? (r("#timePrevious").removeClass().addClass("no_previous"), e[0] = !1) : (r("#timePrevious").removeClass("no_previous").addClass("previous"), e[0] = !0), s === t ? (r("#timeNext").removeClass().addClass("no_next"), e[1] = !1) : (r("#timeNext").removeClass().addClass("next"), e[1] = !0), v(), e
			}
			function E(e, t, n) {
				var i = r("#time_info_today").val(),
					s = r("#time_info_add_stat_time").val(),
					o = [],
					u, a;
				if (n && n === 1) if (e < 0) {
					var f = cnzz.tongji.fn.getDateObjectByStringDate(t),
						l = f.getFullYear(),
						c = f.getMonth(),
						h = new Date(l, c, 0),
						p = h.getDate(),
						d = (h.getMonth() + 1).toString().replace(/^(\d)$/, "0$1");
					u = h.getFullYear() + "-" + d + "-" + "01", a = h.getFullYear() + "-" + d + "-" + p
				} else {
					var f = cnzz.tongji.fn.getDateObjectByStringDate(t),
						l = f.getFullYear(),
						c = f.getMonth() + 1,
						h = new Date(l, c + 1, 0),
						p = h.getDate(),
						d = (h.getMonth() + 1).toString().replace(/^(\d)$/, "0$1");
					u = h.getFullYear() + "-" + d + "-" + "01", a = h.getFullYear() + "-" + d + "-" + p
				} else e > 0 ? (u = cnzz.tongji.fn.getDate(t, 1), a = cnzz.tongji.fn.getDate(u, e)) : (a = cnzz.tongji.fn.getDate(t, -1), u = cnzz.tongji.fn.getDate(a, e));
				return [u, a]
			}
			var n = this,
				i = r("#time_info_today").val(),
				o = r("#time_info_yesterday").val(),
				a = r("#time_info_ago7days").val(),
				f = r("#time_info_ago30days").val(),
				l = r("#time_info_add_stat_time").val(),
				c = r("#controller").val(),
				h = r("#ajaxActionName").val(),
				p = r("#siteId").val(),
				d = r("#tab_index").val();
			cnzz.tongji.fn.compare_date(l, a) || (a = l), cnzz.tongji.fn.compare_date(l, f) || (f = l), r("#time_tool_quick_key li:lt(4)").removeClass("selected"), e === t && t === i ? (r("#time_tool_today").addClass("selected"), r("#time_select").val("one")) : e === t && t === o ? (r("#time_tool_yesterday").addClass("selected"), r("#time_select").val("one")) : e === a && t === i ? (r("#time_tool_7days").addClass("selected"), r("#time_select").val("day7")) : e === f && t === i && (r("#time_tool_ago30days").addClass("selected"), r("#time_select").val("day30")), v();
			var m = r("#time_interval").val(),
				g = "#!/" + cnzz.tongji.global.timestamp() + "/" + c + "/" + h + "/" + d + "/" + p + "/";
			r("#time_tool_quick_key li:lt(4)").find("a").on("click", function() {
				var e = r(this).attr("info") - 0;
				if ("compare" === h) {
					if (e === 1) {
						var t = u._CAL.getPrevSameTime(i + "至" + i, l, i);
						r(this).attr({
							href: g + i + "/" + i + "/" + t.split("至")[0] + "/" + t.split("至")[1]
						})
					} else if (e === -1) {
						var t = u._CAL.getPrevSameTime(o + "至" + o, l, i);
						r(this).attr({
							href: g + o + "/" + o + "/" + t.split("至")[0] + "/" + t.split("至")[1]
						})
					} else if (e === 7) {
						var t = u._CAL.getPrevSameTime(a + "至" + i, l, i);
						r(this).attr({
							href: g + a + "/" + i + "/" + t.split("至")[0] + "/" + t.split("至")[1]
						})
					} else if (e === 30) {
						var t = u._CAL.getPrevSameTime(f + "至" + i, l, i);
						r(this).attr({
							href: g + f + "/" + i + "/" + t.split("至")[0] + "/" + t.split("至")[1]
						})
					}
				} else e === 1 ? r(this).attr({
					href: g + i + "/" + i
				}) : e === -1 ? r(this).attr({
					href: g + o + "/" + o
				}) : e === 7 ? r(this).attr({
					href: g + a + "/" + i
				}) : e === 30 && r(this).attr({
					href: g + f + "/" + i
				})
			});
			var y = r("#timePrevious"),
				b = r("#timeNext");
			y.on({
				hover: function() {
					w()[0] && r(this).toggleClass("previous_hover")
				},
				click: function() {
					if (r(this).attr("class") && r(this).attr("class").indexOf("no_previous") !== -1) return !1;
					var e = r("#time_interval").val() - 0,
						t = r("#time_st").val(),
						n = r("#time_et").val(),
						i = r("#time_info_today").val(),
						o = r("#time_info_add_stat_time").val(),
						a = r("#time_select").val(),
						f, l, c = [];
					e === 30 && a === "month" ? c = E(-e, t, 1) : c = E(-e, t), t === n ? (f = c[1], l = c[1]) : (f = c[0], l = c[1]);
					if ("compare" === h) {
						var p = u._CAL.getPrevSameTime(f + "至" + l, o, i);
						g = g + f + "/" + l + "/" + p.split("至")[0] + "/" + p.split("至")[1], s.history.navigate(g, {
							trigger: !0
						})
					} else g = g + f + "/" + l, s.history.navigate(g, {
						trigger: !0
					})
				}
			}), b.on({
				hover: function() {
					w()[1] && r(this).toggleClass("next_hover")
				},
				click: function() {
					if (r(this).attr("class") && r(this).attr("class").indexOf("no_next") !== -1) return !1;
					var e = r("#time_interval").val() - 0,
						t = r("#time_st").val(),
						n = r("#time_et").val(),
						i = r("#time_info_today").val(),
						o = r("#time_info_add_stat_time").val(),
						a = r("#time_select").val(),
						f, l, c = [];
					e === 30 && a === "month" ? (e = 30, c = E(e, n, 1)) : c = E(e, n), t === n ? (f = c[0], l = c[0]) : (f = c[0], l = c[1]);
					if ("compare" === h) {
						var p = u._CAL.getPrevSameTime(f + "至" + l, o, i);
						g = g + f + "/" + l + "/" + p.split("至")[0] + "/" + p.split("至")[1], s.history.navigate(g, {
							trigger: !0
						})
					} else g = g + f + "/" + l, s.history.navigate(g, {
						trigger: !0
					})
				}
			}), w()
		},
		view_barScroll: function() {
			function n() {
				t || e.css({
					width: r("#rightContainer").width() - 2
				})
			}
			function i() {
				e.on("timeTool.scroll", function() {
					var n = 165,
						i = r(window).scrollTop() - 0;
					i >= n ? t ? e.css({
						top: i - n
					}) : e.addClass("sticky") : i < n && (t ? e.css({
						top: 0
					}) : e.removeClass("sticky"))
				}), r(window).on("scroll", function() {
					e.trigger("timeTool.scroll")
				}), e.trigger("timeTool.scroll")
			}
			var e = r("#time_tool"),
				t = r.browser.msie && r.browser.version === "6.0";
			n(), r(window).on("resize", function() {
				n()
			}), i(), r("#icon_dingzhu").off("click"), r("#icon_dingzhu").on("click", function() {
				var e = r(this);
				e.hasClass("nail") ? (e.removeClass("nail").addClass("ed"), i()) : e.hasClass("ed") && (e.removeClass("ed").addClass("nail"), t ? r("#time_tool").css({
					top: 0
				}) : r("#time_tool").removeClass("sticky"), r("#time_tool").off("timeTool.scroll"), r("tr.reportTableTitle").css({
					top: 0
				}))
			})
		},
		view_datepicker: function() {
			function i() {
				var e = r("#time_cst").val(),
					t = r("#time_cet").val();
				r("#datepicker_compareDate").val(e + "至" + t)
			}
			var e = this,
				t = r("#time_info_today").val(),
				n = r("#time_info_add_stat_time").val();
			r("div.datepicker_container").length && r("div.datepicker_container").remove(), this.datepicker(), r("#timecheckbox").bind("click", function(i) {
				if (r(this).attr("checked") !== "checked") cnzz.tongji.global.isTrendToCompare = !1, s.history.navigate("!/" + cnzz.tongji.global.timestamp() + "/flow/trend/1/" + e.siteId + "/" + e.st + "/" + e.et, {
					trigger: !0
				});
				else {
					var o = u._CAL.getPrevSameTime(e.st + "至" + e.et, n, t);
					cnzz.tongji.global.isTrendToCompare = !0, s.history.navigate("!/" + cnzz.tongji.global.timestamp() + "/flow/compare/1/" + e.siteId + "/" + e.st + "/" + e.et + "/" + o.split("至")[0] + "/" + o.split("至")[1], {
						trigger: !0
					})
				}
			}), i()
		},
		datepicker: function() {
			function w(e) {
				var t = r("a.cal-selected", r("ul.right-select")).attr("class"),
					n = jQuery("#time_interval"),
					i = jQuery("#time_select");
				t ? t.indexOf("today_date") !== -1 || t.indexOf("yesterday_date") !== -1 ? (n.val(1), i.val("one")) : t.indexOf("last30_date") !== -1 ? (n.val(30), i.val("day30")) : t.indexOf("last7_date") !== -1 ? (n.val(7), i.val("day7")) : t.indexOf("week_date") !== -1 || t.indexOf("lastweek_date") !== -1 ? (n.val(7), i.val("week")) : t.indexOf("month_date") !== -1 || t.indexOf("prev_month_date") !== -1 ? (n.val(30), i.val("month")) : i.val("noSelect") : i.val("one")
			}
			function E() {
				var e = new u.DateCommon(a, f),
					t = u._CAL.getDate(e.sToday, -e.getWeekDay),
					n = u._CAL.getDate(e.sToday, -e.getMonthDay),
					i = u._CAL.getDate(t, -1),
					s = u._CAL.getMonthDays(e.oToday),
					o = u._CAL.getDate(n, -1);
				a === f && r("a.yesterday_date").parent().html('<span class="lightGray">昨天</span>');
				var l = !cnzz.tongji.fn.compare_date(f, i),
					c = !cnzz.tongji.fn.compare_date(f, o);
				l && r("a.lastweek_date").parent().html('<span class="lightGray">上周</span>'), c && r("a.lastmonth_date").parent().html('<span class="lightGray">上月</span>')
			}
			function S(e, t) {
				function s(e) {
					jQuery("a").removeClass("cal-selected").parent().removeClass("calSelected"), r("a." + e).addClass("cal-selected").parent().addClass("calSelected")
				}
				var n = new u.DateCommon(a, t),
					i = this;
				switch (e) {
				case n.today_date:
					s("today_date");
					break;
				case n.yesterday_date:
					s("yesterday_date");
					break;
				case n.last7_date:
					s("last7_date");
					break;
				case n.week_date:
					s("week_date");
					break;
				case n.last30_date:
					s("last30_date");
					break;
				case n.lastweek_date:
					s("lastweek_date");
					break;
				case n.month_date:
					s("month_date");
					break;
				case n.lastmonth_date:
					s("lastmonth_date");
					break;
				default:
					jQuery("a", jQuery("ul.right-select")).removeClass("cal-selected").parent().removeClass("calSelected")
				}
			}
			function L(e, t, n) {
				var r = jQuery("#datepickerInput").val(),
					i = u._CAL.getIntervalsByDates(r),
					s = u._CAL.getIntervalsByDates(e),
					o = e;
				if (i > s) {
					var a = e.split("至")[0],
						f = e.split("至")[1],
						l = u._CAL.getIntervalsByDates(t + "至" + f),
						c = u._CAL.getIntervalsByDates(a + "至" + n);
					l > i ? o = u._CAL.getDate(f, -i) + "至" + f : c > i ? o = a + "至" + u._CAL.getDate(a, i) : o = u._CAL.getPrevSameTime(r, t, n)
				} else if (i < s && i === 0) o = e.split("至")[0] + "至" + e.split("至")[0];
				else if (i < s) {
					var h = e.split("至")[0];
					o = u._CAL.getPrevSameTime(h + "至" + u._CAL.getDate(h, i), this.startDate, this.endDate)
				}
				return o
			}
			function A(e, t, n) {
				function h(e) {
					jQuery("a", o).removeClass("cal-selected")
				}
				var i = g.split("至")[0],
					s = e.split("至")[0],
					o = jQuery("ul.right-select2");
				o.find("li").hide();
				var a = r("#time_select").val();
				if (a === "one") {
					var f = u._CAL.getDateByStringDate(i),
						l = f.getYear();
					l += l < 2e3 ? 1900 : 0, l = l;
					var c = new Date(l, f.getMonth() - 1, f.getDate());
					o.find("li.datepicker_1").show(), s === u._CAL.getDate(i, -1) ? h("prev_1_date") : s === u._CAL.getDate(i, -8) ? h("prev_week_date") : s === u._CAL.formatStrDate(c) && h("prev_month_date")
				} else a === "day7" ? (o.find("li.datepicker_7").show(), h("prev_7_date")) : a === "day30" ? (o.find("li.datepicker_30").show(), h("prev_30_date")) : a === "week" ? (o.find("li.datepicker_week").show(), h("prev_week_date")) : a === "month" ? (o.find("li.datepicker_month").show(), h("prev_month_dates")) : a === "noSelect" && (o.find("li.datepicker_prev_same").show(), h("prev_same_date"));
				o.find("li.datepicker_other").show()
			}
			function D(e) {
				r("#cnzzGobalTip").html(e).parent().show(), clearTimeout(M), M = setTimeout(function() {
					r("#cnzzGobalTip").parent().hide()
				}, 5e3)
			}
			var e = this,
				t = r("#ajaxActionName").val(),
				n = r("#controller").val(),
				i = r("#siteId").val(),
				o = r("#tab_index").val(),
				a = r("#time_info_today").val(),
				f = r("#time_info_add_stat_time").val(),
				l = u._CAL.getDateByStringDate(a),
				c = u._CAL.getDateByStringDate(f),
				h = l,
				p = e.st,
				d = e.et,
				v = r("#time_cst").val(),
				m = r("#time_cet").val(),
				g = p + "至" + d,
				y = v + "至" + m,
				b = new u.Calendar({
					id: "#datepickerInput",
					isPopup: !0,
					isPrevBtn: !0,
					isNextBtn: !0,
					isCloseBtn: !0,
					count: 2,
					monthStep: 1,
					isHoliday: 0,
					isHolidayTips: 0,
					isReadonly: 0,
					isDateInfo: !0,
					startDate: f,
					endDate: a,
					today: a,
					range: {
						minDate: u._CAL.getDateByStringDate(p),
						maxDate: u._CAL.getDateByStringDate(d)
					},
					html: '<ul class="right-select"> <li><a class="today_date">今日</a></li> <li><a class="yesterday_date">昨日</a></li> <li><a class="last7_date">最近7日</a></li> <li><a class="last30_date">最近30日</a></li> <li><a class="week_date">本周</a></li> <li><a class="lastweek_date">上周</a></li> <li><a class="month_date">本月</a></li> <li><a class="lastmonth_date" >上月</a></li></ul>',
					berfore: function(e) {
						S(e, this.startDate), E(), r("a.submitA", r("#" + this.id)).removeClass().addClass("button-submit submitA a_0"), r("a.button-close", r("#" + this.id)).addClass("blue12")
					},
					submit: function(e) {
						g = e;
						var a = u._CAL.getPrevSameTime(e, this.startDate, this.endDate);
						y = a, this.setDateInfo(g), w(g);
						var f = r("#time_cst").val(),
							l = r("#time_cet").val();
						t === "compare" ? s.history.navigate("!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + t + "/" + o + "/" + i + "/" + e.split("至")[0] + "/" + e.split("至")[1] + "/" + f + "/" + l, {
							trigger: !0
						}) : s.history.navigate("!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + t + "/" + o + "/" + i + "/" + e.split("至")[0] + "/" + e.split("至")[1], {
							trigger: !0
						}), r("#datepicker_compareDate").val(y)
					},
					cancel: function() {
						this.setDateInfo(g)
					}
				}),
				x = 1,
				T = 1,
				N = "",
				C = "";
			b.on("dateClick", function(e) {
				if (jQuery(e).parent().parent().attr("class") === "right-select") return;
				if (jQuery(e).hasClass("disabled")) return;
				r("a.cal-selected", r("ul.right-select")).removeClass("cal-selected"), x % 2 != 0 ? (N = e["data-date"], jQuery("a", jQuery("div.cal-container")).removeClass("select-range").removeClass("end-date").removeClass("start-date"), this.range.minDate = c, this.range.maxDate = u._CAL.getDateByStringDate(N), this.setDateInfo(N + "至" + N)) : (this.range.mindate = u._CAL.getDateByStringDate(e["data-date"]), this.range.maxdate = h, this.setDateInfo(N + "至" + e["data-date"])), x++
			}), b.setDateInfo(g);
			var k = new u.Calendar({
				id: "#datepickerInput2",
				isPopup: !0,
				isPrevBtn: !0,
				isNextBtn: !0,
				isCloseBtn: !0,
				count: 2,
				monthStep: 1,
				isHoliday: 0,
				isHolidayTips: 0,
				isReadonly: 0,
				isDateInfo: !0,
				startDate: f,
				endDate: a,
				today: a,
				range: {
					minDate: u._CAL.getDateByStringDate(p),
					maxDate: u._CAL.getDateByStringDate(d)
				},
				html: ' <ul class="right-select2" id="right-select2">  <li class="datepicker_1"><a class="prev_1_date">前1日</a></li>  <li class="datepicker_1"><a class="prev_week_date">上周同期</a></li>  <li class="datepicker_1"><a class="prev_month_date">上月同期</a></li>  <li class="datepicker_ hide"><a class="prev_month_avg_date">前30日均值</a></li>  <li class="datepicker_7"><a class="prev_7_date">前7日</a></li>  <li class="datepicker_30"><a class="prev_30_date">前30日</a></li>  <li class="datepicker_week"><a class="prev_week_dates">前1周</a></li>  <li class="datepicker_month"><a class="prev_month_dates">前1月</a></li>  <li class="datepicker_other"><a class="other_date">自定义</a></li>  <li class="datepicker_prev_same"><a class="prev_same_date">向前等长时间</a></li> </ul>',
				berfore: function(e) {
					y = e, A(e, this.startDate, this.endDate), r("a.submitA", r("#" + this.id)).removeClass().addClass("button-submit submitA a_0"), r("a.button-close", r("#" + this.id)).addClass("blue12")
				},
				submit: function(e) {
					y = e, this.setDateInfo(y), s.history.navigate("!/" + cnzz.tongji.global.timestamp() + "/" + n + "/" + t + "/" + o + "/" + i + "/" + g.split("至")[0] + "/" + g.split("至")[1] + "/" + y.split("至")[0] + "/" + y.split("至")[1], {
						trigger: !0
					})
				},
				cancel: function() {
					this.setDateInfo(y)
				}
			});
			k.on("dateClick", function(e) {
				if (jQuery(e).parent().parent().attr("class") === "right-select2") return;
				if (jQuery(e).hasClass("disabled")) return;
				r("a.cal-selected", r("ul.right-select2")).removeClass("cal-selected");
				if (T % 2 != 0) {
					C = e["data-date"], jQuery("a", jQuery("div.cal-container")).removeClass("select-range").removeClass("end-date").removeClass("start-date"), this.range.minDate = c, this.range.maxDate = u._CAL.getDateByStringDate(C);
					var t = C + "至" + C;
					this.setDateInfo(t)
				} else {
					this.range.mindate = u._CAL.getDateByStringDate(e["data-date"]), this.range.maxdate = h;
					var t = C + "至" + e["data-date"];
					this.setDateInfo(t)
				}
				T++
			}), k.setDateInfo(y), r("#selectDateOne").on("click", function() {
				b.focus()
			}), r("#selectDateTwo").on("click", function() {
				k.focus()
			}), r(document).on("click", function(e) {
				var t = r(e.target),
					n = r("div.datepicker_container"),
					i = t.attr("id"),
					s = n.eq(0).css("display"),
					o = n.eq(1).css("display");
				"datepickerInput" !== i && "datepickerInput2" !== i && s === "block" && t.parentsUntil(n).length !== 0 && t.attr("class") !== "day-selector-arrow" && r("#" + b.id).css("display") !== "none" && (b.setDateInfo(g), b.hide(), r("#selectDateOne").removeClass("date2ErrorStyle").removeAttr("title")), "datepickerInput" !== i && "datepickerInput2" !== i && o === "block" && t.parentsUntil(n).length !== 0 && t.attr("class") !== "day-selector-arrow" && r("#" + k.id).css("display") !== "none" && (k.setDateInfo(y), k.hide(), r("#selectDateTwo").removeClass("date2ErrorStyle").removeAttr("title"))
			}), r("a.button-close, span.cal-close").on("click", function() {
				r("#selectDateOne, #selectDateTwo").removeClass("date2ErrorStyle").removeAttr("title"), b.setDateInfo(g), k.setDateInfo(y)
			});
			var O = r("#" + b.id),
				M;
			r("#datepickerInput").on("keyup", function(t) {
				var n = r(this).val();
				t.which === 13;
				var i = e.getCheck2DateMsg(n);
				i ? (D(i), r("#selectDateOne").addClass("date2ErrorStyle").attr({
					title: i
				}), r("a.submitA", O).removeClass("button-submit a_0").addClass("a_1")) : (r("#selectDateOne").removeClass("date2ErrorStyle").removeAttr("title"), r("a.submitA", O).removeClass().addClass("button-submit submitA a_0"), b.setDateInfo(n), S(n, b.startDate), E())
			});
			var _ = r("#" + k.id);
			r("#datepickerInput2").on("keyup", function(t) {
				var n = r(this).val();
				t.which === 13;
				var i = e.getCheck2DateMsg(n);
				i ? (D(i), r("#selectDateTwo").addClass("date2ErrorStyle").attr({
					title: i
				}), r("a.submitA", _).removeClass("a_0 button-submit").addClass("a_1")) : (r("#selectDateTwo").removeClass("date2ErrorStyle").removeAttr("title"), r("a.submitA", _).removeClass().addClass("button-submit submitA a_0"), k.setDateInfo(n), A(n, k.startDate, k.endDate))
			})
		},
		getCheck2DateMsg: function(e) {
			var t, n = r("#time_info_today").val(),
				i = r("#time_info_add_stat_time").val();
			if (!e) t = "不能为空（请选择时间后再进行查询！）";
			else if (e && e.indexOf("至") === -1) t = "日期格式应该为YYYY-MM-DD至YYYY-MM-DD";
			else {
				var s = e.split("至")[0],
					o = e.split("至")[1],
					u = /^\d{4}-\d{2}-\d{2}$/;
				u.test(s) && u.test(o) ? cnzz.tongji.fn.compare_date(s, o) ? s !== i && cnzz.tongji.fn.compare_date(s, i) ? t = "起始时间不可早于统计开通时间，请重新选择！" : n !== o && cnzz.tongji.fn.compare_date(n, o) ? t = "结束时间不可晚于今日，请重新选择！" : t = "" : t = "起始时间不可晚于结束时间，请重新选择！" : t = "日期格式应该为YYYY-MM-DD至YYYY-MM-DD"
			}
			return t
		}
	};
	var f = e("util/zhibiao");
	t.Zhibiao = f.Zhibiao, r(function() {
		r("#rightContainer").on("timeBar.change", function(e, t, n) {
			var r = new a(t, n);
			r.start()
		})
	})
});
define("http://images.cnzz.com/static/js/util/dragdrop.js", ["jquery"], function(e, t, n) {
	var r = jQuery = e("jquery");
	(function(e, t) {
		function n(t) {
			return !e(t).parents().andSelf().filter(function() {
				return e.curCSS(this, "visibility") === "hidden" || e.expr.filters.hidden(this)
			}).length
		}
		function r(t, r) {
			var i = t.nodeName.toLowerCase();
			if ("area" === i) {
				var s = t.parentNode,
					o = s.name,
					u;
				return !t.href || !o || s.nodeName.toLowerCase() !== "map" ? !1 : (u = e("img[usemap=#" + o + "]")[0], !! u && n(u))
			}
			return (/input|select|textarea|button|object/.test(i) ? !t.disabled : "a" == i ? t.href || r : r) && n(t)
		}
		e.ui = e.ui || {}, e.ui.version || (e.extend(e.ui, {
			version: "1.8.18",
			keyCode: {
				ALT: 18,
				BACKSPACE: 8,
				CAPS_LOCK: 20,
				COMMA: 188,
				COMMAND: 91,
				COMMAND_LEFT: 91,
				COMMAND_RIGHT: 93,
				CONTROL: 17,
				DELETE: 46,
				DOWN: 40,
				END: 35,
				ENTER: 13,
				ESCAPE: 27,
				HOME: 36,
				INSERT: 45,
				LEFT: 37,
				MENU: 93,
				NUMPAD_ADD: 107,
				NUMPAD_DECIMAL: 110,
				NUMPAD_DIVIDE: 111,
				NUMPAD_ENTER: 108,
				NUMPAD_MULTIPLY: 106,
				NUMPAD_SUBTRACT: 109,
				PAGE_DOWN: 34,
				PAGE_UP: 33,
				PERIOD: 190,
				RIGHT: 39,
				SHIFT: 16,
				SPACE: 32,
				TAB: 9,
				UP: 38,
				WINDOWS: 91
			}
		}), e.fn.extend({
			propAttr: e.fn.prop || e.fn.attr,
			_focus: e.fn.focus,
			focus: function(t, n) {
				return typeof t == "number" ? this.each(function() {
					var r = this;
					setTimeout(function() {
						e(r).focus(), n && n.call(r)
					}, t)
				}) : this._focus.apply(this, arguments)
			},
			scrollParent: function() {
				var t;
				return e.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function() {
					return /(relative|absolute|fixed)/.test(e.curCSS(this, "position", 1)) && /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
				}).eq(0) : t = this.parents().filter(function() {
					return /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
				}).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
			},
			zIndex: function(n) {
				if (n !== t) return this.css("zIndex", n);
				if (this.length) {
					var r = e(this[0]),
						i, s;
					while (r.length && r[0] !== document) {
						i = r.css("position");
						if (i === "absolute" || i === "relative" || i === "fixed") {
							s = parseInt(r.css("zIndex"), 10);
							if (!isNaN(s) && s !== 0) return s
						}
						r = r.parent()
					}
				}
				return 0
			},
			disableSelection: function() {
				return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
					e.preventDefault()
				})
			},
			enableSelection: function() {
				return this.unbind(".ui-disableSelection")
			}
		}), e.each(["Width", "Height"], function(n, r) {
			function i(t, n, r, i) {
				return e.each(s, function() {
					n -= parseFloat(e.curCSS(t, "padding" + this, !0)) || 0, r && (n -= parseFloat(e.curCSS(t, "border" + this + "Width", !0)) || 0), i && (n -= parseFloat(e.curCSS(t, "margin" + this, !0)) || 0)
				}), n
			}
			var s = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
				o = r.toLowerCase(),
				u = {
					innerWidth: e.fn.innerWidth,
					innerHeight: e.fn.innerHeight,
					outerWidth: e.fn.outerWidth,
					outerHeight: e.fn.outerHeight
				};
			e.fn["inner" + r] = function(n) {
				return n === t ? u["inner" + r].call(this) : this.each(function() {
					e(this).css(o, i(this, n) + "px")
				})
			}, e.fn["outer" + r] = function(t, n) {
				return typeof t != "number" ? u["outer" + r].call(this, t) : this.each(function() {
					e(this).css(o, i(this, t, !0, n) + "px")
				})
			}
		}), e.extend(e.expr[":"], {
			data: function(t, n, r) {
				return !!e.data(t, r[3])
			},
			focusable: function(t) {
				return r(t, !isNaN(e.attr(t, "tabindex")))
			},
			tabbable: function(t) {
				var n = e.attr(t, "tabindex"),
					i = isNaN(n);
				return (i || n >= 0) && r(t, !i)
			}
		}), e(function() {
			var t = document.body,
				n = t.appendChild(n = document.createElement("div"));
			n.offsetHeight, e.extend(n.style, {
				minHeight: "100px",
				height: "auto",
				padding: 0,
				borderWidth: 0
			}), e.support.minHeight = n.offsetHeight === 100, e.support.selectstart = "onselectstart" in n, t.removeChild(n).style.display = "none"
		}), e.extend(e.ui, {
			plugin: {
				add: function(t, n, r) {
					var i = e.ui[t].prototype;
					for (var s in r) i.plugins[s] = i.plugins[s] || [], i.plugins[s].push([n, r[s]])
				},
				call: function(e, t, n) {
					var r = e.plugins[t];
					if ( !! r && !! e.element[0].parentNode) for (var i = 0; i < r.length; i++) e.options[r[i][0]] && r[i][1].apply(e.element, n)
				}
			},
			contains: function(e, t) {
				return document.compareDocumentPosition ? e.compareDocumentPosition(t) & 16 : e !== t && e.contains(t)
			},
			hasScroll: function(t, n) {
				if (e(t).css("overflow") === "hidden") return !1;
				var r = n && n === "left" ? "scrollLeft" : "scrollTop",
					i = !1;
				return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
			},
			isOverAxis: function(e, t, n) {
				return e > t && e < t + n
			},
			isOver: function(t, n, r, i, s, o) {
				return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
			}
		}))
	})(jQuery), function(e, t) {
		if (e.cleanData) {
			var n = e.cleanData;
			e.cleanData = function(t) {
				for (var r = 0, i;
				(i = t[r]) != null; r++) try {
					e(i).triggerHandler("remove")
				} catch (s) {}
				n(t)
			}
		} else {
			var r = e.fn.remove;
			e.fn.remove = function(t, n) {
				return this.each(function() {
					return n || (!t || e.filter(t, [this]).length) && e("*", this).add([this]).each(function() {
						try {
							e(this).triggerHandler("remove")
						} catch (t) {}
					}), r.call(e(this), t, n)
				})
			}
		}
		e.widget = function(t, n, r) {
			var i = t.split(".")[0],
				s;
			t = t.split(".")[1], s = i + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][s] = function(n) {
				return !!e.data(n, t)
			}, e[i] = e[i] || {}, e[i][t] = function(e, t) {
				arguments.length && this._createWidget(e, t)
			};
			var o = new n;
			o.options = e.extend(!0, {}, o.options), e[i][t].prototype = e.extend(!0, o, {
				namespace: i,
				widgetName: t,
				widgetEventPrefix: e[i][t].prototype.widgetEventPrefix || t,
				widgetBaseClass: s
			}, r), e.widget.bridge(t, e[i][t])
		}, e.widget.bridge = function(n, r) {
			e.fn[n] = function(i) {
				var s = typeof i == "string",
					o = Array.prototype.slice.call(arguments, 1),
					u = this;
				return i = !s && o.length ? e.extend.apply(null, [!0, i].concat(o)) : i, s && i.charAt(0) === "_" ? u : (s ? this.each(function() {
					var r = e.data(this, n),
						s = r && e.isFunction(r[i]) ? r[i].apply(r, o) : r;
					if (s !== r && s !== t) return u = s, !1
				}) : this.each(function() {
					var t = e.data(this, n);
					t ? t.option(i || {})._init() : e.data(this, n, new r(i, this))
				}), u)
			}
		}, e.Widget = function(e, t) {
			arguments.length && this._createWidget(e, t)
		}, e.Widget.prototype = {
			widgetName: "widget",
			widgetEventPrefix: "",
			options: {
				disabled: !1
			},
			_createWidget: function(t, n) {
				e.data(n, this.widgetName, this), this.element = e(n), this.options = e.extend(!0, {}, this.options, this._getCreateOptions(), t);
				var r = this;
				this.element.bind("remove." + this.widgetName, function() {
					r.destroy()
				}), this._create(), this._trigger("create"), this._init()
			},
			_getCreateOptions: function() {
				return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
			},
			_create: function() {},
			_init: function() {},
			destroy: function() {
				this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
			},
			widget: function() {
				return this.element
			},
			option: function(n, r) {
				var i = n;
				if (arguments.length === 0) return e.extend({}, this.options);
				if (typeof n == "string") {
					if (r === t) return this.options[n];
					i = {}, i[n] = r
				}
				return this._setOptions(i), this
			},
			_setOptions: function(t) {
				var n = this;
				return e.each(t, function(e, t) {
					n._setOption(e, t)
				}), this
			},
			_setOption: function(e, t) {
				return this.options[e] = t, e === "disabled" && this.widget()[t ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", t), this
			},
			enable: function() {
				return this._setOption("disabled", !1)
			},
			disable: function() {
				return this._setOption("disabled", !0)
			},
			_trigger: function(t, n, r) {
				var i, s, o = this.options[t];
				r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
				if (s) for (i in s) i in n || (n[i] = s[i]);
				return this.element.trigger(n, r), !(e.isFunction(o) && o.call(this.element[0], n, r) === !1 || n.isDefaultPrevented())
			}
		}
	}(jQuery), function(e, t) {
		var n = !1;
		e(document).mouseup(function(e) {
			n = !1
		}), e.widget("ui.mouse", {
			options: {
				cancel: ":input,option",
				distance: 1,
				delay: 0
			},
			_mouseInit: function() {
				var t = this;
				this.element.bind("mousedown." + this.widgetName, function(e) {
					return t._mouseDown(e)
				}).bind("click." + this.widgetName, function(n) {
					if (!0 === e.data(n.target, t.widgetName + ".preventClickEvent")) return e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1
				}), this.started = !1
			},
			_mouseDestroy: function() {
				this.element.unbind("." + this.widgetName)
			},
			_mouseDown: function(t) {
				if (!n) {
					this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
					var r = this,
						i = t.which == 1,
						s = typeof this.options.cancel == "string" && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
					if (!i || s || !this._mouseCapture(t)) return !0;
					this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
						r.mouseDelayMet = !0
					}, this.options.delay));
					if (this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
						this._mouseStarted = this._mouseStart(t) !== !1;
						if (!this._mouseStarted) return t.preventDefault(), !0
					}
					return !0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
						return r._mouseMove(e)
					}, this._mouseUpDelegate = function(e) {
						return r._mouseUp(e)
					}, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), n = !0, !0
				}
			},
			_mouseMove: function(t) {
				return !e.browser.msie || document.documentMode >= 9 || !! t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
			},
			_mouseUp: function(t) {
				return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target == this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
			},
			_mouseDistanceMet: function(e) {
				return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
			},
			_mouseDelayMet: function(e) {
				return this.mouseDelayMet
			},
			_mouseStart: function(e) {},
			_mouseDrag: function(e) {},
			_mouseStop: function(e) {},
			_mouseCapture: function(e) {
				return !0
			}
		})
	}(jQuery), function(e, t) {
		e.widget("ui.sortable", e.ui.mouse, {
			widgetEventPrefix: "sort",
			ready: !1,
			options: {
				appendTo: "parent",
				axis: !1,
				connectWith: !1,
				containment: !1,
				cursor: "auto",
				cursorAt: !1,
				dropOnEmpty: !0,
				forcePlaceholderSize: !1,
				forceHelperSize: !1,
				grid: !1,
				handle: !1,
				helper: "original",
				items: "> *",
				opacity: !1,
				placeholder: !1,
				revert: !1,
				scroll: !0,
				scrollSensitivity: 20,
				scrollSpeed: 20,
				scope: "default",
				tolerance: "intersect",
				zIndex: 1e3
			},
			_create: function() {
				var e = this.options;
				this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? e.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
			},
			destroy: function() {
				e.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
				for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
				return this
			},
			_setOption: function(t, n) {
				t === "disabled" ? (this.options[t] = n, this.widget()[n ? "addClass" : "removeClass"]("ui-sortable-disabled")) : e.Widget.prototype._setOption.apply(this, arguments)
			},
			_mouseCapture: function(t, n) {
				var r = this;
				if (this.reverting) return !1;
				if (this.options.disabled || this.options.type == "static") return !1;
				this._refreshItems(t);
				var i = null,
					s = this,
					o = e(t.target).parents().each(function() {
						if (e.data(this, r.widgetName + "-item") == s) return i = e(this), !1
					});
				e.data(t.target, r.widgetName + "-item") == s && (i = e(t.target));
				if (!i) return !1;
				if (this.options.handle && !n) {
					var u = !1;
					e(this.options.handle, i).find("*").andSelf().each(function() {
						this == t.target && (u = !0)
					});
					if (!u) return !1
				}
				return this.currentItem = i, this._removeCurrentsFromItems(), !0
			},
			_mouseStart: function(t, n, r) {
				var i = this.options,
					s = this;
				this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
					top: this.offset.top - this.margins.top,
					left: this.offset.left - this.margins.left
				}, this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), e.extend(this.offset, {
					click: {
						left: t.pageX - this.offset.left,
						top: t.pageY - this.offset.top
					},
					parent: this._getParentOffset(),
					relative: this._getRelativeOffset()
				}), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this.domPosition = {
					prev: this.currentItem.prev()[0],
					parent: this.currentItem.parent()[0]
				}, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), i.containment && this._setContainment(), i.cursor && (e("body").css("cursor") && (this._storedCursor = e("body").css("cursor")), e("body").css("cursor", i.cursor)), i.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", i.opacity)), i.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", i.zIndex)), this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions();
				if (!r) for (var o = this.containers.length - 1; o >= 0; o--) this.containers[o]._trigger("activate", t, s._uiHash(this));
				return e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
			},
			_mouseDrag: function(t) {
				this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
				if (this.options.scroll) {
					var n = this.options,
						r = !1;
					this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < n.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + n.scrollSpeed : t.pageY - this.overflowOffset.top < n.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - n.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < n.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + n.scrollSpeed : t.pageX - this.overflowOffset.left < n.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - n.scrollSpeed)) : (t.pageY - e(document).scrollTop() < n.scrollSensitivity ? r = e(document).scrollTop(e(document).scrollTop() - n.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < n.scrollSensitivity && (r = e(document).scrollTop(e(document).scrollTop() + n.scrollSpeed)), t.pageX - e(document).scrollLeft() < n.scrollSensitivity ? r = e(document).scrollLeft(e(document).scrollLeft() - n.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < n.scrollSensitivity && (r = e(document).scrollLeft(e(document).scrollLeft() + n.scrollSpeed))), r !== !1 && e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)
				}
				this.positionAbs = this._convertPositionTo("absolute");
				if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
				if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
				for (var i = this.items.length - 1; i >= 0; i--) {
					var s = this.items[i],
						o = s.item[0],
						u = this._intersectsWithPointer(s);
					if (!u) continue;
					if (o != this.currentItem[0] && this.placeholder[u == 1 ? "next" : "prev"]()[0] != o && !e.ui.contains(this.placeholder[0], o) && (this.options.type == "semi-dynamic" ? !e.ui.contains(this.element[0], o) : !0)) {
						this.direction = u == 1 ? "down" : "up";
						if (this.options.tolerance != "pointer" && !this._intersectsWithSides(s)) break;
						this._rearrange(t, s), this._trigger("change", t, this._uiHash());
						break
					}
				}
				return this._contactContainers(t), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
			},
			_mouseStop: function(t, n) {
				if ( !! t) {
					e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t);
					if (this.options.revert) {
						var r = this,
							i = r.placeholder.offset();
						r.reverting = !0, e(this.helper).animate({
							left: i.left - this.offset.parent.left - r.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
							top: i.top - this.offset.parent.top - r.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
						}, parseInt(this.options.revert, 10) || 500, function() {
							r._clear(t)
						})
					} else this._clear(t, n);
					return !1
				}
			},
			cancel: function() {
				var t = this;
				if (this.dragging) {
					this._mouseUp({
						target: null
					}), this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
					for (var n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("deactivate", null, t._uiHash(this)), this.containers[n].containerCache.over && (this.containers[n]._trigger("out", null, t._uiHash(this)), this.containers[n].containerCache.over = 0)
				}
				return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, {
					helper: null,
					dragging: !1,
					reverting: !1,
					_noFinalSort: null
				}), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem)), this
			},
			serialize: function(t) {
				var n = this._getItemsAsjQuery(t && t.connected),
					r = [];
				return t = t || {}, e(n).each(function() {
					var n = (e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[-=_](.+)/);
					n && r.push((t.key || n[1] + "[]") + "=" + (t.key && t.expression ? n[1] : n[2]))
				}), !r.length && t.key && r.push(t.key + "="), r.join("&")
			},
			toArray: function(t) {
				var n = this._getItemsAsjQuery(t && t.connected),
					r = [];
				return t = t || {}, n.each(function() {
					r.push(e(t.item || this).attr(t.attribute || "id") || "")
				}), r
			},
			_intersectsWith: function(e) {
				var t = this.positionAbs.left,
					n = t + this.helperProportions.width,
					r = this.positionAbs.top,
					i = r + this.helperProportions.height,
					s = e.left,
					o = s + e.width,
					u = e.top,
					a = u + e.height,
					f = this.offset.click.top,
					l = this.offset.click.left,
					c = r + f > u && r + f < a && t + l > s && t + l < o;
				return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > e[this.floating ? "width" : "height"] ? c : s < t + this.helperProportions.width / 2 && n - this.helperProportions.width / 2 < o && u < r + this.helperProportions.height / 2 && i - this.helperProportions.height / 2 < a
			},
			_intersectsWithPointer: function(t) {
				var n = e.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
					r = e.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width),
					i = n && r,
					s = this._getDragVerticalDirection(),
					o = this._getDragHorizontalDirection();
				return i ? this.floating ? o && o == "right" || s == "down" ? 2 : 1 : s && (s == "down" ? 2 : 1) : !1
			},
			_intersectsWithSides: function(t) {
				var n = e.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
					r = e.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
					i = this._getDragVerticalDirection(),
					s = this._getDragHorizontalDirection();
				return this.floating && s ? s == "right" && r || s == "left" && !r : i && (i == "down" && n || i == "up" && !n)
			},
			_getDragVerticalDirection: function() {
				var e = this.positionAbs.top - this.lastPositionAbs.top;
				return e != 0 && (e > 0 ? "down" : "up")
			},
			_getDragHorizontalDirection: function() {
				var e = this.positionAbs.left - this.lastPositionAbs.left;
				return e != 0 && (e > 0 ? "right" : "left")
			},
			refresh: function(e) {
				return this._refreshItems(e), this.refreshPositions(), this
			},
			_connectWith: function() {
				var e = this.options;
				return e.connectWith.constructor == String ? [e.connectWith] : e.connectWith
			},
			_getItemsAsjQuery: function(t) {
				var n = this,
					r = [],
					i = [],
					s = this._connectWith();
				if (s && t) for (var o = s.length - 1; o >= 0; o--) {
					var u = e(s[o]);
					for (var f = u.length - 1; f >= 0; f--) {
						var l = e.data(u[f], this.widgetName);
						l && l != this && !l.options.disabled && i.push([e.isFunction(l.options.items) ? l.options.items.call(l.element) : e(l.options.items, l.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), l])
					}
				}
				i.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
					options: this.options,
					item: this.currentItem
				}) : e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
				for (var o = i.length - 1; o >= 0; o--) i[o][0].each(function() {
					r.push(this)
				});
				return e(r)
			},
			_removeCurrentsFromItems: function() {
				var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
				for (var t = 0; t < this.items.length; t++) for (var n = 0; n < e.length; n++) e[n] == this.items[t].item[0] && this.items.splice(t, 1)
			},
			_refreshItems: function(t) {
				this.items = [], this.containers = [this];
				var n = this.items,
					r = this,
					i = [
						[e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
							item: this.currentItem
						}) : e(this.options.items, this.element), this]
					],
					s = this._connectWith();
				if (s && this.ready) for (var o = s.length - 1; o >= 0; o--) {
					var u = e(s[o]);
					for (var f = u.length - 1; f >= 0; f--) {
						var l = e.data(u[f], this.widgetName);
						l && l != this && !l.options.disabled && (i.push([e.isFunction(l.options.items) ? l.options.items.call(l.element[0], t, {
							item: this.currentItem
						}) : e(l.options.items, l.element), l]), this.containers.push(l))
					}
				}
				for (var o = i.length - 1; o >= 0; o--) {
					var c = i[o][1],
						h = i[o][0];
					for (var f = 0, p = h.length; f < p; f++) {
						var d = e(h[f]);
						d.data(this.widgetName + "-item", c), n.push({
							item: d,
							instance: c,
							width: 0,
							height: 0,
							left: 0,
							top: 0
						})
					}
				}
			},
			refreshPositions: function(t) {
				this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
				for (var n = this.items.length - 1; n >= 0; n--) {
					var r = this.items[n];
					if (r.instance != this.currentContainer && this.currentContainer && r.item[0] != this.currentItem[0]) continue;
					var i = this.options.toleranceElement ? e(this.options.toleranceElement, r.item) : r.item;
					t || (r.width = i.outerWidth(), r.height = i.outerHeight());
					var s = i.offset();
					r.left = s.left, r.top = s.top
				}
				if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
				else for (var n = this.containers.length - 1; n >= 0; n--) {
					var s = this.containers[n].element.offset();
					this.containers[n].containerCache.left = s.left, this.containers[n].containerCache.top = s.top, this.containers[n].containerCache.width = this.containers[n].element.outerWidth(), this.containers[n].containerCache.height = this.containers[n].element.outerHeight()
				}
				return this
			},
			_createPlaceholder: function(t) {
				var n = t || this,
					r = n.options;
				if (!r.placeholder || r.placeholder.constructor == String) {
					var i = r.placeholder;
					r.placeholder = {
						element: function() {
							var t = e(document.createElement(n.currentItem[0].nodeName)).addClass(i || n.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
							return i || (t.style.visibility = "hidden"), t
						},
						update: function(e, t) {
							if (!i || !! r.forcePlaceholderSize) t.height() || t.height(n.currentItem.innerHeight() - parseInt(n.currentItem.css("paddingTop") || 0, 10) - parseInt(n.currentItem.css("paddingBottom") || 0, 10)), t.width() || t.width(n.currentItem.innerWidth() - parseInt(n.currentItem.css("paddingLeft") || 0, 10) - parseInt(n.currentItem.css("paddingRight") || 0, 10))
						}
					}
				}
				n.placeholder = e(r.placeholder.element.call(n.element, n.currentItem)), n.currentItem.after(n.placeholder), r.placeholder.update(n, n.placeholder)
			},
			_contactContainers: function(t) {
				var n = null,
					r = null;
				for (var i = this.containers.length - 1; i >= 0; i--) {
					if (e.ui.contains(this.currentItem[0], this.containers[i].element[0])) continue;
					if (this._intersectsWith(this.containers[i].containerCache)) {
						if (n && e.ui.contains(this.containers[i].element[0], n.element[0])) continue;
						n = this.containers[i], r = i
					} else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", t, this._uiHash(this)), this.containers[i].containerCache.over = 0)
				}
				if ( !! n) if (this.containers.length === 1) this.containers[r]._trigger("over", t, this._uiHash(this)), this.containers[r].containerCache.over = 1;
				else if (this.currentContainer != this.containers[r]) {
					var s = 1e4,
						o = null,
						u = this.positionAbs[this.containers[r].floating ? "left" : "top"];
					for (var f = this.items.length - 1; f >= 0; f--) {
						if (!e.ui.contains(this.containers[r].element[0], this.items[f].item[0])) continue;
						var l = this.items[f][this.containers[r].floating ? "left" : "top"];
						Math.abs(l - u) < s && (s = Math.abs(l - u), o = this.items[f])
					}
					if (!o && !this.options.dropOnEmpty) return;
					this.currentContainer = this.containers[r], o ? this._rearrange(t, o, null, !0) : this._rearrange(t, null, this.containers[r].element, !0), this._trigger("change", t, this._uiHash()), this.containers[r]._trigger("change", t, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[r]._trigger("over", t, this._uiHash(this)), this.containers[r].containerCache.over = 1
				}
			},
			_createHelper: function(t) {
				var n = this.options,
					r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t, this.currentItem])) : n.helper == "clone" ? this.currentItem.clone() : this.currentItem;
				return r.parents("body").length || e(n.appendTo != "parent" ? n.appendTo : this.currentItem[0].parentNode)[0].appendChild(r[0]), r[0] == this.currentItem[0] && (this._storedCSS = {
					width: this.currentItem[0].style.width,
					height: this.currentItem[0].style.height,
					position: this.currentItem.css("position"),
					top: this.currentItem.css("top"),
					left: this.currentItem.css("left")
				}), (r[0].style.width == "" || n.forceHelperSize) && r.width(this.currentItem.width()), (r[0].style.height == "" || n.forceHelperSize) && r.height(this.currentItem.height()), r
			},
			_adjustOffsetFromHelper: function(t) {
				typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
					left: +t[0],
					top: +t[1] || 0
				}), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
			},
			_getParentOffset: function() {
				this.offsetParent = this.helper.offsetParent();
				var t = this.offsetParent.offset();
				this.cssPosition == "absolute" && this.scrollParent[0] != document && e.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
				if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.browser.msie) t = {
					top: 0,
					left: 0
				};
				return {
					top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
					left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
				}
			},
			_getRelativeOffset: function() {
				if (this.cssPosition == "relative") {
					var e = this.currentItem.position();
					return {
						top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
						left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
					}
				}
				return {
					top: 0,
					left: 0
				}
			},
			_cacheMargins: function() {
				this.margins = {
					left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
					top: parseInt(this.currentItem.css("marginTop"), 10) || 0
				}
			},
			_cacheHelperProportions: function() {
				this.helperProportions = {
					width: this.helper.outerWidth(),
					height: this.helper.outerHeight()
				}
			},
			_setContainment: function() {
				var t = this.options;
				t.containment == "parent" && (t.containment = this.helper[0].parentNode);
				if (t.containment == "document" || t.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, e(t.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (e(t.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
				if (!/^(document|window|parent)$/.test(t.containment)) {
					var n = e(t.containment)[0],
						r = e(t.containment).offset(),
						i = e(n).css("overflow") != "hidden";
					this.containment = [r.left + (parseInt(e(n).css("borderLeftWidth"), 10) || 0) + (parseInt(e(n).css("paddingLeft"), 10) || 0) - this.margins.left, r.top + (parseInt(e(n).css("borderTopWidth"), 10) || 0) + (parseInt(e(n).css("paddingTop"), 10) || 0) - this.margins.top, r.left + (i ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(e(n).css("borderLeftWidth"), 10) || 0) - (parseInt(e(n).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, r.top + (i ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(e(n).css("borderTopWidth"), 10) || 0) - (parseInt(e(n).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
				}
			},
			_convertPositionTo: function(t, n) {
				n || (n = this.position);
				var r = t == "absolute" ? 1 : -1,
					i = this.options,
					s = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! e.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
					o = /(html|body)/i.test(s[0].tagName);
				return {
					top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (e.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * r),
					left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (e.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * r)
				}
			},
			_generatePosition: function(t) {
				var n = this.options,
					r = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! e.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
					i = /(html|body)/i.test(r[0].tagName);
				this.cssPosition == "relative" && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
				var s = t.pageX,
					o = t.pageY;
				if (this.originalPosition) {
					this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (s = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (s = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top));
					if (n.grid) {
						var u = this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1];
						o = this.containment ? u - this.offset.click.top < this.containment[1] || u - this.offset.click.top > this.containment[3] ? u - this.offset.click.top < this.containment[1] ? u + n.grid[1] : u - n.grid[1] : u : u;
						var f = this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0];
						s = this.containment ? f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2] ? f - this.offset.click.left < this.containment[0] ? f + n.grid[0] : f - n.grid[0] : f : f
					}
				}
				return {
					top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (e.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()),
					left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (e.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())
				}
			},
			_rearrange: function(e, t, n, r) {
				n ? n[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? t.item[0] : t.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
				var i = this,
					s = this.counter;
				window.setTimeout(function() {
					s == i.counter && i.refreshPositions(!r)
				}, 0)
			},
			_clear: function(t, n) {
				this.reverting = !1;
				var r = [],
					i = this;
				!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null;
				if (this.helper[0] == this.currentItem[0]) {
					for (var s in this._storedCSS) if (this._storedCSS[s] == "auto" || this._storedCSS[s] == "static") this._storedCSS[s] = "";
					this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
				} else this.currentItem.show();
				this.fromOutside && !n && r.push(function(e) {
					this._trigger("receive", e, this._uiHash(this.fromOutside))
				}), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !n && r.push(function(e) {
					this._trigger("update", e, this._uiHash())
				});
				if (!e.ui.contains(this.element[0], this.currentItem[0])) {
					n || r.push(function(e) {
						this._trigger("remove", e, this._uiHash())
					});
					for (var s = this.containers.length - 1; s >= 0; s--) e.ui.contains(this.containers[s].element[0], this.currentItem[0]) && !n && (r.push(function(e) {
						return function(t) {
							e._trigger("receive", t, this._uiHash(this))
						}
					}.call(this, this.containers[s])), r.push(function(e) {
						return function(t) {
							e._trigger("update", t, this._uiHash(this))
						}
					}.call(this, this.containers[s])))
				}
				for (var s = this.containers.length - 1; s >= 0; s--) n || r.push(function(e) {
					return function(t) {
						e._trigger("deactivate", t, this._uiHash(this))
					}
				}.call(this, this.containers[s])), this.containers[s].containerCache.over && (r.push(function(e) {
					return function(t) {
						e._trigger("out", t, this._uiHash(this))
					}
				}.call(this, this.containers[s])), this.containers[s].containerCache.over = 0);
				this._storedCursor && e("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex), this.dragging = !1;
				if (this.cancelHelperRemoval) {
					if (!n) {
						this._trigger("beforeStop", t, this._uiHash());
						for (var s = 0; s < r.length; s++) r[s].call(this, t);
						this._trigger("stop", t, this._uiHash())
					}
					return !1
				}
				n || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null;
				if (!n) {
					for (var s = 0; s < r.length; s++) r[s].call(this, t);
					this._trigger("stop", t, this._uiHash())
				}
				return this.fromOutside = !1, !0
			},
			_trigger: function() {
				e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
			},
			_uiHash: function(t) {
				var n = t || this;
				return {
					helper: n.helper,
					placeholder: n.placeholder || e([]),
					position: n.position,
					originalPosition: n.originalPosition,
					offset: n.positionAbs,
					item: n.currentItem,
					sender: t ? t.element : null
				}
			}
		}), e.extend(e.ui.sortable, {
			version: "1.8.18"
		})
	}(jQuery)
});
define("http://images.cnzz.com/static/js/site/siteOverviewFlash.js", [], function(e, t, n) {
	var r = function(e, t, n, r, i) {
			this.init(e, t, n, r, i)
		};
	return r.prototype = {
		init: function(e, t, n, r, i) {
			this.index = parseInt(e), this.o = t, this.o.innerHTML = "", this.date = n, this.preDay = r, this.preWeek = i, this.differ = !1, this.setting = {}, this.setting.index_1 = {
				Type: "Line",
				Quota: {
					Data: [{
						Text: "浏览次数（PV）",
						Value: "pv"
					}, {
						Text: "独立访客（UV）",
						Value: "uv"
					}, {
						Text: "IP",
						Value: "ip"
					}, {
						Text: "新独立访客",
						Value: "newuv"
					}, {
						Text: "访问次数",
						Value: "session"
					}],
					Show: {
						Text: ["浏览次数（PV）", "独立访客（UV）", "IP"],
						Value: ["pv", "uv", "ip"]
					}
				}
			}, this.setting.index_2 = {
				Type: "Line",
				Quota: {
					Text: "人均浏览页数",
					Url: "main.php?c=flow&a=trend&ajax=module=flash&type=Line&Period=Hour&Quota=averageupv&st=" + this.date + "&et=" + this.date + "&siteid=" + document.getElementById("siteId").value
				}
			}, this.setting.index_3 = {
				Type: "Line",
				Quota: {
					Text: "跳出率",
					Url: "main.php?c=flow&a=trend&ajax=module=flash&type=Line&Period=Hour&Quota=outper&st=" + this.date + "&et=" + this.date + "&siteid=" + document.getElementById("siteId").value
				}
			}, this.setting.index_4 = {
				Type: "Line",
				Quota: {
					Text: "平均访问深度",
					Url: "main.php?c=flow&a=trend&ajax=module=flash&type=Line&Period=Hour&Quota=averagepv&st=" + this.date + "&et=" + this.date + "&siteid=" + document.getElementById("siteId").value
				}
			}, this.setting.index_5 = {
				Type: "Line",
				Quota: {
					Text: "平均访问时长",
					Url: "main.php?c=flow&a=trend&ajax=module=flash&type=Line&Period=Hour&Quota=averagestime&st=" + this.date + "&et=" + this.date + "&siteid=" + document.getElementById("siteId").value
				}
			}, this.setting.index_7 = {
				Type: "Line",
				Quota: {
					Text: "新访客人均浏览页数",
					Url: "main.php?c=visitor&a=type&ajax=module=flash&type=Line&Period=Hour&Quota=averageupv&hby=newVisitor&st=" + this.date + "&et=" + this.date + "&siteid=" + document.getElementById("siteId").value
				}
			}, this.setting.index_8 = {
				Type: "Line",
				Quota: {
					Text: "新访客跳出率",
					Url: "main.php?c=visitor&a=type&ajax=module=flash&type=Line&Period=Hour&Quota=outper&hby=newVisitor&st=" + this.date + "&et=" + this.date + "&siteid=" + document.getElementById("siteId").value
				}
			}, this.setting.index_9 = {
				Type: "Line",
				Quota: {
					Text: "新访客平均访问深度",
					Url: "main.php?c=visitor&a=type&ajax=module=flash&type=Line&Period=Hour&Quota=averagepv&hby=newVisitor&st=" + this.date + "&et=" + this.date + "&siteid=" + document.getElementById("siteId").value
				}
			}, this.setting.index_10 = {
				Type: "Line",
				Quota: {
					Text: "新访客平均访问时长",
					Url: "main.php?c=visitor&a=type&ajax=module=flash&type=Line&Period=Hour&Quota=averagestime&hby=newVisitor&st=" + this.date + "&et=" + this.date + "&siteid=" + document.getElementById("siteId").value
				}
			}, this.setting.index_6 = {
				Type: "Pie",
				Quota: {
					Text: "新老访客分布",
					Url: "main.php?c=visitor&a=type&ajax=module=flash&type=Pie&Period=Hour&Quota=uv&st=" + this.date + "&et=" + this.date + "&siteid=" + document.getElementById("siteId").value
				}
			}, this.setting.index_11 = {
				Type: "Pie",
				Quota: {
					Text: "来源分类",
					Url: "main.php?c=traf&a=overview&ajax=module=flash&st=" + this.date + "&et=" + this.date + "&siteid=" + document.getElementById("siteId").value + "&type=Pie&Quota=pv"
				}
			}, this.setting.index_14 = {
				Type: "Pie",
				Quota: {
					Text: "搜索引擎分布",
					Url: "main.php?c=traf&a=search&ajax=module=flash&st=" + this.date + "&et=" + this.date + "&siteid=" + document.getElementById("siteId").value + "&type=Pie&Quota=pv"
				}
			}, this.setting.index_16 = {
				Type: "Pie",
				Quota: {
					Text: "受访域名分布",
					Url: "main.php?siteid=" + document.getElementById("siteId").value + "&c=cont&a=domain&ajax=module=flash&st=" + this.date + "&et=" + this.date + "&type=Pie&Quota=pv"
				}
			}, this.setting.index_20 = {
				Type: "Pie",
				Quota: {
					Text: "地区分布",
					Url: "main.php?c=visitor&a=districtnet&ajax=module=flash&st=" + this.date + "&et=" + this.date + "&moduleType=location&siteid=" + document.getElementById("siteId").value + "&type=Pie&Quota=uv"
				}
			}, this.setting.index_21 = {
				Type: "Pie",
				Quota: {
					Text: "网络接入商",
					Url: "main.php?c=visitor&a=districtnet&ajax=module=flash&st=" + this.date + "&et=" + this.date + "&moduleType=isp&siteid=" + document.getElementById("siteId").value + "&type=Pie&Quota=uv"
				}
			}, this.setting.index_22 = {
				Type: "Pie",
				Quota: {
					Text: "终端分布",
					Url: "main.php?c=visitor&a=terminal&ajax=module=flash&st=" + this.date + "&et=" + this.date + "&moduleType=agentType&siteid=" + document.getElementById("siteId").value + "&type=Pie&Quota=uv"
				}
			}, this.setting.index_23 = {
				Type: "Pie",
				Quota: {
					Text: "操作系统分布",
					Url: "main.php?c=visitor&a=terminal&ajax=module=flash&st=" + this.date + "&et=" + this.date + "&moduleType=system&siteid=" + document.getElementById("siteId").value + "&type=Pie&Quota=uv"
				}
			}, this.setting.index_24 = {
				Type: "Pie",
				Quota: {
					Text: "浏览器分布",
					Url: "main.php?c=visitor&a=terminal&ajax=module=flash&st=" + this.date + "&et=" + this.date + "&moduleType=browser&siteid=" + document.getElementById("siteId").value + "&type=Pie&Quota=uv"
				}
			}, this.setting.index_26 = {
				Type: "Pie",
				Quota: {
					Text: "cookie支持性分布",
					Url: "main.php?c=visitor&a=terminal&ajax=module=flash&st=" + this.date + "&et=" + this.date + "&moduleType=cookie&siteid=" + document.getElementById("siteId").value + "&type=Pie&Quota=pv"
				}
			}, this.index == 1 ? this.createBox() : this.createFlash()
		},
		createFlash: function() {
			var e = this,
				t = "site_overview_flash_" + this.index,
				n = this.setting["index_" + this.index].Quota.Url;
			this.setting["index_" + this.index].Type == "Pie" ? (t = "module_flash_pie_" + e.index, cnzz.tongji.global.renderPieFlash(n, t)) : cnzz.tongji.global.renderLineFlash(n, $(e.o), t)
		},
		createBox: function() {
			this.oBox = document.createElement("div"), this.oBox.className = "flow_trend_flash site_trend", this.oChartHeader = document.createElement("div"), this.oChartHeader.className = "chartHeader", this.oQuota = document.createElement("div"), this.oQuota.className = "chartQuota", this.oQuota.id = "chartQuotaFlowTrendSelect", this.oQuota.innerHTML = '<p><a href="javascript:;" hidefocus="true" title="请选择指标"><span>选择指标</span><b></b></a></p>', this.oDate = document.createElement("div"), this.oDate.className = "chartDate", this.chartInner = document.createElement("div"), this.chartInner.className = "chartInner", this.oInfo = document.createElement("div"), this.oInfo.className = "chartInfo", this.oChartHeader.appendChild(this.oQuota), this.oChartHeader.appendChild(this.oDate), this.oBox.appendChild(this.oChartHeader), this.oBox.appendChild(this.chartInner), this.oBox.appendChild(this.oInfo), this.o.appendChild(this.oBox);
			var e = '<div class="chartQuota" style="margin-right:10px;"><p id="dateSelectp"><a title="今日" href="javascript:void(0);"><span>今日</span><b></b></a></p></div>';
			$(e).insertBefore($("#chartQuotaFlowTrendSelect")), this.createQuota(), this.timeSelect()
		},
		timeSelect: function() {
			function n(e, t) {
				return e.contains ? e != t && e.contains(t) : !! (e.compareDocumentPosition(t) & 16)
			}
			function r(e, t) {
				return i(e).type == "mouseover" ? !n(t, i(e).relatedTarget || i(e).fromElement) && (i(e).relatedTarget || i(e).fromElement) !== t : !n(t, i(e).relatedTarget || i(e).toElement) && (i(e).relatedTarget || i(e).toElement) !== t
			}
			function i(e) {
				return e || window.event
			}
			var e = this,
				t = $("#chartOptionsFlowTrendDate");
			$("#dateSelectp").on({
				mouseover: function(e) {
					if (r(e, this)) {
						var n = $(this).offset();
						t.css({
							top: n.top + 22,
							left: n.left
						}).show()
					}
				},
				mouseout: function(e) {
					r(e, this) && t.hide()
				}
			}), $("#chartOptionsFlowTrendDate").on({
				mouseover: function(e) {
					r(e, this) && t.show()
				},
				mouseout: function(e) {
					r(e, this) && t.hide()
				}
			}), t.attr({
				radioVal: $('input[name="flowTrendSiteOverview"]:checked').val()
			}), t.find("a.a_0").off("click"), t.find("a.a_0").on("click", function() {
				var n = $('input[name="flowTrendSiteOverview"]:checked').val();
				n = parseInt(n);
				var r = t.find("li").eq(n - 1).text();
				$("#dateSelectp").html('<a title="' + r + '" href="javascript:;"><span>' + r + "</span><b></b></a>"), t.hide(), cnzz.tongji.fn.setCookie("siteOverviewFlowLineTime=" + n), n === 3 || n === 4 || n === 5 ? ($("div.chartDate").find("li").attr({
					status: "on"
				}).addClass("disable"), $("ul.siteOverFlowFlashTime").find("li").off("click")) : ($("div.chartDate").find("li").attr({
					status: "on"
				}).removeClass("disable"), e.siteOverFlowFlashEvent()), t.attr({
					radioVal: n
				}), $("div.chartInfo").eq(1).length && ($("div.chartDate").find("li > b").removeClass("active"), $("div.chartInfo").eq(1).hide()), $("div.chartInfo").eq(0).find("dt").eq(0).html(e.getDate(n) + "："), e.flashShow(n)
			}), t.find("a.a_1").off("click"), t.find("a.a_1").on("click", function() {
				var e = t.attr("radioVal") || 1;
				e = parseInt(e, 10), $('input[name="flowTrendSiteOverview"][value=' + e + "]").attr("checked", !0), t.hide()
			})
		},
		getDate: function(e) {
			var t = this,
				n = $("#time_info_today").val(),
				r = $("#time_info_add_stat_time").val();
			switch (e) {
			case 1:
				break;
			case 2:
				n = cnzz.tongji.fn.getPreviousSt(1, n, r);
				break;
			case 3:
				n = "最近48小时";
				break;
			case 4:
				n = "最近7日";
				break;
			case 5:
				n = "最近30日"
			}
			return n
		},
		createQuota: function() {
			var e = this;
			this.oQuotaList = document.createElement("div"), this.oQuotaList.className = "chartOptionsFlowTrend", this.quotaData = this.setting.index_1.Quota;
			var t = document.createDocumentFragment();
			for (var n = 0; n < this.quotaData.Data.length; n++) {
				var r = document.createElement("li");
				r.innerHTML = "<b></b><span>" + this.quotaData.Data[n].Text + "</span>", t.appendChild(r)
			}
			var i = document.createElement("ul");
			i.appendChild(t), this.oQuotaList.appendChild(i);
			var s = document.createElement("p");
			s.innerHTML = '<a href="javascript:;" title="确定" hidefocus="true" class="a_0">确定</a><a href="javascript:;" title="取消" hidefocus="true" class="a_1">取消</a>', this.oQuotaList.appendChild(s), document.getElementById("rightContainer").appendChild(this.oQuotaList);
			var o = cnzz.tongji.fn.getCookie("siteOverviewFlowLineTime");
			o = parseInt(o, 10) || 1;
			var u = $("#chartOptionsFlowTrendDate").find("li").eq(o - 1);
			u.find("input").attr({
				checked: !0
			});
			var a = u.find("span").text();
			$("#dateSelectp").html('<a title="' + a + '" href="javascript:;"><span>' + a + "</span><b></b></a>"), e.createDate(), o === 3 || o === 4 || o === 5 ? ($("div.chartDate").find("li").attr({
				status: "on"
			}).addClass("disable"), $("ul.siteOverFlowFlashTime").find("li").off("click")) : $("div.chartDate").find("li").attr({
				status: "on"
			}).removeClass("disable"), this.flashShow(o), this.tempQuota = {
				Text: [].concat(this.quotaData.Show.Text),
				Value: [].concat(this.quotaData.Show.Value)
			}, this.checkQuota(), this.oQuota.onmouseover = function() {
				var t = this.getBoundingClientRect(),
					n = Math.max(document.body.scrollTop, document.documentElement.scrollTop, 0),
					r = document.documentElement.scrollLeft || 0;
				e.oQuotaList.style.left = t.left + r + "px", e.oQuotaList.style.top = t.top + this.offsetHeight - 1 + n + "px", e.oQuotaList.style.display = "block", e.hideTime && (clearTimeout(e.hideTime), e.hideTime = null)
			}, this.oQuota.onmouseout = function() {
				e.hideTime = setTimeout(function() {
					e.oQuotaList.style.display = "none", e.checkQuota()
				}, 100)
			}, this.oQuotaList.onmouseover = function() {
				e.hideTime && (clearTimeout(e.hideTime), e.hideTime = null)
			}, this.oQuotaList.onmouseout = function() {
				e.hideTime = setTimeout(function() {
					e.oQuotaList.style.display = "none", e.checkQuota()
				}, 100)
			};
			var r = this.oQuotaList.getElementsByTagName("li"),
				f = this.oQuotaList.getElementsByTagName("b");
			for (var n = 0; n < r.length; n++) r[n].index = n, r[n].onmouseover = function() {
				this.className = "active"
			}, r[n].onmouseout = function() {
				this.className = ""
			}, r[n].onclick = function() {
				var t = this.getElementsByTagName("b")[0];
				t.className == "active" ? (t.className = "", e.addQuota(this.index, "remove")) : (t.className = "active", e.addQuota(this.index, "add"))
			};
			this.oQuotaBtn = this.oQuotaList.getElementsByTagName("p")[0].getElementsByTagName("a"), this.oQuotaBtn[0].onclick = function() {
				e.oQuotaList.style.display = "none", e.changeQuota(), e.checkQuota()
			}, this.oQuotaBtn[1].onclick = function() {
				e.tempQuota.Value = [].concat(e.quotaData.Show.Value), e.tempQuota.Text = [].concat(e.quotaData.Show.Text), e.checkQuota(), e.oQuotaList.style.display = "none"
			}
		},
		addQuota: function(e, t) {
			var n = this;
			n.tempQuota.Text = [], n.tempQuota.Value = [], $("div.chartOptionsFlowTrend").find("li>b").each(function() {
				if ($(this).hasClass("active")) {
					var e = $(this).next("span").text();
					n.tempQuota.Text.push(e);
					for (var t = 0; t < n.quotaData.Data.length; t++) n.quotaData.Data[t].Text === e && n.tempQuota.Value.push(n.quotaData.Data[t].Value)
				}
			})
		},
		checkQuota: function() {
			for (var e = 0; e < this.quotaData.Data.length; e++) {
				var t = this.oQuotaList.getElementsByTagName("b")[e];
				for (var n = 0; n < this.quotaData.Show.Value.length; n++) {
					if (this.quotaData.Data[e].Value == this.quotaData.Show.Value[n]) {
						t.className = "active";
						break
					}
					t.className = ""
				}
			}
		},
		changeQuota: function() {
			this.quotaData.Show.Value = [].concat(this.tempQuota.Value), this.quotaData.Show.Text = [].concat(this.tempQuota.Text), this.flashShow()
		},
		createInfo: function() {
			this.oInfo.innerHTML = "";
			var e = document.createElement("dl");
			e.className = "dl_3";
			var t = document.createDocumentFragment(),
				n = document.createElement("dt");
			n.innerHTML = this.date + "：", t.appendChild(n);
			var r = this.quotaData.Show.Text;
			for (var i = 0; i < r.length; i++) {
				var s = document.createElement("dd");
				s.innerHTML = "<b></b><span>" + r[i] + "</span>", s.className = "dd_" + i, t.appendChild(s)
			}
			e.appendChild(t), this.oInfo.appendChild(e)
		},
		createInfoS: function() {
			function l(t) {
				var n = e.date;
				if (i === 1) n = cnzz.tongji.fn.getPreviousSt(t, e.date, s);
				else if (i === 2) {
					var r = $("#time_info_yesterday").val();
					n = cnzz.tongji.fn.getPreviousSt(t, r, s)
				}
				return n
			}
			var e = this;
			this.sInfo ? this.sInfo.innerHTML = "" : (this.sInfo = document.createElement("div"), this.sInfo.className = "chartInfo", this.oBox.appendChild(this.sInfo));
			var t = document.createElement("dl");
			t.className = "dl_3";
			var n = document.createDocumentFragment(),
				r = document.createElement("dt"),
				i = $('input[name="flowTrendSiteOverview"]:checked').val(),
				s = $("#time_info_add_stat_time").val();
			i = parseInt(i, 10);
			var o = "";
			this.differ == "Day" ? o = l(1) : o = l(8), r.innerHTML = o + "：", n.appendChild(r);
			var u = this.quotaData.Show.Text;
			for (var a = 0; a < u.length; a++) {
				var f = document.createElement("dd");
				f.innerHTML = "<b></b><span>" + u[a] + "</span>", f.className = "dd_d" + a, n.appendChild(f)
			}
			t.appendChild(n), this.sInfo.appendChild(t)
		},
		createDate: function() {
			var e = this,
				t = document.createDocumentFragment();
			this.differArr = [];
			if (this.preDay) {
				var n = document.createElement("li");
				n.innerHTML = "<b></b><span>前一日</span>", n.className = "compareDay", t.appendChild(n), this.differArr.push("Day")
			}
			if (this.preWeek) {
				var n = document.createElement("li");
				n.className = "compareWeek", n.innerHTML = "<b></b><span>上周同期</span>", t.appendChild(n), this.differArr.push("Week")
			}
			var r = document.createElement("ul");
			r.className = "siteOverFlowFlashTime", r.appendChild(t), this.oDate.appendChild(r), e.siteOverFlowFlashEvent()
		},
		siteOverFlowFlashEvent: function() {
			var e = this,
				t = $("ul.siteOverFlowFlashTime").find("li");
			t.off("click"), t.on("click", function() {
				var t = $(this).find("b"),
					n = $(this).attr("status") || "on",
					r = $(this).attr("class");
				n === "on" ? (t.addClass("active"), $(this).attr({
					status: "off"
				}), $("div.chartInfo").eq(1).show(), r === "compareDay" ? ($("ul.siteOverFlowFlashTime").find("li.compareWeek").find("b").removeClass("active"), e.differ = "Day") : r === "compareWeek" && ($("ul.siteOverFlowFlashTime").find("li.compareDay").find("b").removeClass("active"), e.differ = "Week")) : n === "off" && (t.removeClass("active"), $(this).attr({
					status: "on"
				}), e.differ = !1), $(this).siblings("li").attr({
					status: "on"
				}), e.flashShow()
			})
		},
		flashShow: function(e) {
			var t = this;
			this.createInfo();
			var n = this.differ;
			n ? this.createInfoS() : this.sInfo && (this.sInfo.parentNode.removeChild(this.sInfo), this.sInfo = !1), this.oQuotaList && this.oQuotaList.style.display != "none" && (this.tempQuota = {}, this.tempQuota.Value = [].concat(this.quotaData.Show.Value), this.tempQuota.Text = [].concat(this.quotaData.Show.Text), this.checkQuota(), this.oQuotaList.style.display = "none");
			var e = e || $('input[name="flowTrendSiteOverview"]:checked').val(),
				r = $("#time_info_add_stat_time").val(),
				i = $("#time_info_today").val(),
				s = $("#time_info_yesterday").val(),
				o = "site_overview_flash_" + this.index,
				u = "main.php?c=flow&a=trend&ajax=module=flash&type=Line&Quota=" + this.quotaData.Show.Value + "&siteid=" + document.getElementById("siteId").value;
			e = parseInt(e, 10), $("div.chartInfo").eq(0).find("dt").eq(0).html(t.getDate(e) + "：");
			if (e === 1) u += "&Period=Hour&st=" + i + "&et=" + i;
			else if (e === 2) u += "&Period=Hour&st=" + s + "&et=" + s;
			else if (e === 3) n = !1, u += "&Period=48Hours";
			else if (e === 4) {
				n = !1;
				var a = cnzz.tongji.fn.getPreviousSt(7, t.date, r);
				u += "&Period=Hour&st=" + a + "&et=" + this.date
			} else if (e === 5) {
				n = !1;
				var f = cnzz.tongji.fn.getPreviousSt(30, t.date, r);
				u += "&Period=Day&st=" + f + "&et=" + this.date
			}
			var l = $("ul.siteOverFlowFlashTime").find("li.compareDay > b").hasClass("active"),
				c = $("ul.siteOverFlowFlashTime").find("li.compareWeek > b").hasClass("active");
			if (l || c) {
				u = "main.php?c=flow&a=compare&ajax=module=flash&type=Line&Period=Hour&Quota=" + this.quotaData.Show.Value + "&siteid=" + document.getElementById("siteId").value;
				var h = this.date,
					p = this.date;
				e === 1 ? (n == "Day" ? h = cnzz.tongji.fn.getPreviousSt(1, t.date, r) : h = cnzz.tongji.fn.getPreviousSt(8, t.date, r), p = this.date) : e === 2 && (n == "Day" ? h = cnzz.tongji.fn.getPreviousSt(1, s, r) : h = cnzz.tongji.fn.getPreviousSt(8, s, r), p = s), u += "&st=" + p + "&et=" + p, u += "&cst=" + h + "&cet=" + h, $("div.chartInfo").eq(0).find("dt").eq(0).html(p + "："), $("div.chartInfo").eq(1).find("dt").eq(0).html(h + "：")
			}
			cnzz.tongji.global.renderLineFlash(u, $(t.chartInner), o)
		},
		oColor: {
			m: ["#2e91da", "#f5ad46", "#6cbf3d", "#edeb2c", "#a149d9"],
			s: ["#96cbf1", "#fcd6a0", "#baf19b", "#efee8a", "#d9a7f9"],
			h: "#f7724a",
			l: "#cfcfcf"
		}
	}, r
});
define("http://images.cnzz.com/static/js/site/overview.js", ["jquery", "underscore", "util/common", "js/site/siteOverviewFlash", "js/util/dragdrop"], function(e, t, n) {
	function o(e) {
		this.siteId = e
	}
	var r = jQuery = e("jquery"),
		i = e("underscore"),
		s = e("util/common");
	o.prototype = {
		start: function() {
			this.fixedIe6ResizeEvent(), this.ie6 = r.browser.msie && r.browser.version === "6.0", this.topOrder(), this.managerModuleByAuth(), this.timeNav(), this.getSiteRank(), this.getSiteSafe(), this.view_barScroll()
		},
		fixedIe6ResizeEvent: function() {
			(function(e) {
				e.fn.wresize = function(t) {
					function n() {
						if (e.browser.msie) if (!wresize.fired) wresize.fired = !0;
						else {
							var t = parseInt(e.browser.version, 10);
							wresize.fired = !1;
							if (t < 7) return !1;
							if (t == 7) {
								var n = e(window).width();
								if (n != wresize.width) return wresize.width = n, !1
							}
						}
						return !0
					}
					function r(e) {
						if (n()) return t.apply(this, [e])
					}
					return version = "1.1", wresize = {
						fired: !1,
						width: 0
					}, this.each(function() {
						this == window ? e(this).resize(r) : e(this).resize(t)
					}), this
				}
			})(jQuery)
		},
		timeNav: function() {
			function i() {
				var t = r("#rightContainer").width() - 2;
				e.ie6 ? e.containerWidth = t - 20 : e.containerWidth = t, t = e.containerWidth, r("#dashboardRootEl").css({
					width: t
				}).show(), r.browser.msie && r.browser.version === "8.0" || r.browser.msie && r.browser.version === "7.0" ? r("#overviewDateSelect").css({
					width: parseInt(t, 10) - 10
				}) : r("#overviewDateSelect").css({
					width: parseInt(t, 10) - 11
				})
			}
			var e = this,
				t = r("#time_info_today").val(),
				n = r("#time_info_yesterday").val();
			i(), e.clickTimeBtnCounts = 0, r("#siteOverviewTodayBtn").on("click", function() {
				r("#siteOverviewYesterdayBtn").parent().removeClass("selected"), r(this).parent().addClass("selected"), r("#right_top_title").html("网站概况（" + t + "）"), e.st = t, e.et = t, e.clickTimeBtnCounts++, e.dragModule()
			}), r("#siteOverviewYesterdayBtn").on("click", function() {
				r("#siteOverviewTodayBtn").parent().removeClass("selected"), r(this).parent().addClass("selected"), r("#right_top_title").html("网站概况（" + n + "）"), e.st = n, e.et = n, e.clickTimeBtnCounts++, e.dragModule()
			}), r("#siteOverviewTodayBtn").trigger("click"), e.ie6 ? r(window).wresize(i) : r(window).on("resize", function() {
				i()
			})
		},
		beginnersGuide: function() {
			var e = document.body.clientWidth - 200,
				t = document.body.offsetWidth - 500,
				n = r("div.beginnersGuideBorderOne"),
				i = cnzz.tongji.fn.getCookie("UGSession");
			i || cnzz.tongji.fn.userGuideGetStatus("UGSession", function(i, s) {
				if (!s) {
					var o = r("td.UGSession", r("#overview_top_order_table")).offset(),
						u = o.top - 10,
						a = o.left;
					n.css({
						width: e,
						height: t
					}).show();
					var f = r("#beginnersGuideLayoutDown");
					n.animate({
						width: "-=" + (e - 100),
						height: "-=" + (t - 150),
						top: u,
						left: a + 90
					}, 1e3, function() {
						f.find("span.downSpanText1").html("新增指标！它是分析访客的每一次连续浏览行为的基础。"), f.find("span.downSpanText2").html('<a href="http://help.cnzz.com/tongji/a/baobiaojiedu/fenxishuju/2012/0529/106.html" target="_blank">去了解一下</a>。'), f.css({
							top: u - 85,
							left: a - 300
						}).fadeIn(), TwoBorder.css({
							cursor: "default"
						})
					}), n.show(), r("a.closeDown", f).off("click"), r("a.closeDown", f).on("click", function() {
						f.fadeOut(), n.hide()
					}), n.on("click", function() {
						r("a.closeDown", f).trigger("click")
					}), cnzz.tongji.fn.setCookie("UGSession=1"), cnzz.tongji.fn.userGuideSaveStatus(i + "|UGSession=1", function() {})
				} else cnzz.tongji.fn.setCookie("UGSession=1")
			});
			var s = cnzz.tongji.fn.getCookie("UGComponent");
			s || cnzz.tongji.fn.userGuideGetStatus("UGComponent", function(n, i) {
				if (!i) {
					var s = r("div.beginnersGuideBorderTwo"),
						o = r("#beginnersGuideLayoutUp");
					s.css({
						width: e,
						height: t
					}).show();
					var u = r("#overviewDataTongji").offset(),
						a = u.top;
					s.animate({
						width: "-=" + (e - 117),
						height: "-=" + (t - 28),
						top: a,
						right: 63
					}, 1e3, function() {
						o.find("span.upSpanText1").html("功能、数据小部件，等你添到概况上！"), o.find("span.upSpanText2").html("根据您的数据分析习惯，选择最常用的功能重点关注。"), o.css({
							top: a + 50,
							right: 70
						}).fadeIn(), s.css({
							cursor: "pointer"
						})
					}), s.show(), r("a.closeUp", o).off("click"), r("a.closeUp", o).on("click", function() {
						o.fadeOut(), s.hide()
					}), s.on("click", function() {
						r("a.closeUp", o).trigger("click"), r("a.manage_component").trigger("click")
					}), cnzz.tongji.fn.setCookie("UGComponent=1"), cnzz.tongji.fn.userGuideSaveStatus(n + "|UGComponent=1", function() {})
				} else cnzz.tongji.fn.setCookie("UGComponent=1")
			})
		},
		view_barScroll: function() {
			function n() {
				t || e.css({
					width: r("#rightContainer").width() - 2
				})
			}
			function i() {
				if (!r("#overview_top_order2").offset()) return !0;
				var n = r("#overview_top_order2").offset().top + 118;
				e.on("timeTool.scroll", function() {
					var i = r(window).scrollTop() - 0;
					i >= n ? t ? e.css({}) : e.addClass("overviewSticky") : i < n && (t ? e.css({}) : e.removeClass("overviewSticky"))
				}), r(window).on("scroll", function() {
					e.trigger("timeTool.scroll")
				})
			}
			var e = r("#overviewDataTongji"),
				t = r.browser.msie && r.browser.version === "6.0";
			n(), this.ie6 || r(window).on("resize", function() {
				n()
			}), i(), r("#icon_dingzhu0").on("click", function() {
				var e = r(this);
				e.hasClass("nail") ? (e.removeClass("nail").addClass("ed"), i()) : e.hasClass("ed") && (e.removeClass("ed").addClass("nail"), t ? r("#overviewDateSelect").css({
					top: 0
				}) : r("#overviewDateSelect").removeClass("overviewSticky"), r("#overviewDateSelect").off("timeTool.scroll"))
			})
		},
		topOrder: function() {
			var e = this,
				t = r("#overview_top_order_table");
			cnzz.tongji.fn.ajax("main.php?c=site&a=overview", {
				ajax: "module=summary",
				siteid: e.siteId
			}, function(n) {
				if (n) {
					var s = i.template(r("#overview_top_order_tpl").html(), n.summary);
					t.find("tr:gt(0)").remove(), r(s).insertAfter(t.find("tr").eq(0));
					var o = i.template(r("#overview_top_order_tpl2").html(), n.summary);
					r("#overview_top_order2").empty().append(o), r("#site_logintype").val() != "phpwind" && e.beginnersGuide(), r("a.open_close_a").on("click", function() {
						var e = r(this).find("img"),
							n = e.attr("src");
						n.indexOf("open") > 0 ? (t.find("tr.grey9").show(), e.attr({
							src: cnzz.tongji.path.img_path + "/icon/fold_close.gif"
						})) : n.indexOf("close") > 0 && (t.find("tr.grey9").hide(), e.attr({
							src: cnzz.tongji.path.img_path + "/icon/fold_open.gif"
						})), r("a.closeDown", r("#beginnersGuideLayoutDown")).trigger("click"), r("a.closeUp", r("#beginnersGuideLayoutUp")).trigger("click")
					}), parseInt(n.summary.items[7], 10) === 1 && (r("#shengjiActivDayTip").css({
						left: (parseInt(document.body.clientWidth, 10) - 300) / 2
					}).show(), setTimeout(function() {
						r("#shengjiActivDayTip").hide()
					}, 1e4))
				} else cnzz.tongji.global.tableListLoading(t, 2)
			})
		},
		getSiteSafe: function() {
			var e = this,
				t = r("#time_st").val(),
				n = r("#time_et").val();
			r("#overviewSafeTd").length && cnzz.tongji.fn.ajax("main.php?c=site&a=overview", {
				ajax: "module=safeinfo",
				siteid: e.siteId
			}, function(n) {
				if (n.safeinfo) {
					var i = r("#overviewSafeTd").find("a"),
						s = r("#overviewSafeTd").find("img"),
						o = parseInt(n.safeinfo.status);
					o === 21 || o === 20 ? i.attr({
						href: cnzz.tongji.path.root_path + "main.php?c=component&a=frame&siteid=" + e.siteId + "#!/" + cnzz.tongji.global.timestamp() + "/cont/safety/1/" + e.siteId + "/" + t + "/" + t
					}) : (i.attr({
						href: cnzz.tongji.path.root_path + "main.php?c=cont&a=frame&siteid=" + e.siteId + "#!/" + cnzz.tongji.global.timestamp() + "/cont/page/1/" + e.siteId + "/" + t + "/" + t
					}), o === 1 ? s.attr({
						src: cnzz.tongji.path.img_path + "/icon/nocheck_1.gif"
					}) : o === 2 ? s.attr({
						src: cnzz.tongji.path.img_path + "/icon/nocheck_1.gif"
					}) : o === 3 ? s.attr({
						src: cnzz.tongji.path.img_path + "/icon/checking_1.gif"
					}) : o === 4 ? s.attr({
						src: cnzz.tongji.path.img_path + "/icon/safe_1.gif"
					}) : o === 5 ? s.attr({
						src: cnzz.tongji.path.img_path + "/icon/danger_1.gif"
					}) : o === 6 && s.attr({
						src: cnzz.tongji.path.img_path + "/icon/danger_1.gif"
					})), i.show()
				}
			})
		},
		getSiteRank: function() {
			var e = this;
			if (r("#overviewSiteRank").length === 0) return !0;
			cnzz.tongji.fn.ajax("main.php?c=site&a=overview", {
				ajax: "module=siteRank",
				siteid: e.siteId
			}, function(e) {
				r("#overviewSiteRank").html(e.siteRank)
			})
		},
		managerModuleByAuth: function() {
			var e = r("#dashboardRootEl");
			r("#userName").val().length === 0 && r("#site_logintype").val() != "phpwind" && (r("div.setup_module", e).hide(), r("a.manage_component", e).hide())
		},
		dragModule: function() {
			var e = this;
			this.defautTarget = [1, 6, 12, 15, 17], this.newTarget = [], this.newTarget2 = [], this.targetName = ["流量趋势", "人均浏览页数", "跳出率", "平均访问深度", "平均访问时长", "新老访客分布(按独立访客)", "新访客人均浏览页数", "新访客跳出率", "新访客平均访问深度", "新访客平均访问时长", "来源分类(按来访次数)", "来路域名TOP10(按来访次数)", "来路页面TOP10(按来访次数)", "搜索引擎分布(按来访次数)", "搜索词TOP10(按来访次数)", "受访域名分布(按浏览次数)", "受访页面TOP10(按浏览次数)", "站内入口TOP10(按进入次数)", "站内出口TOP10(按离开次数)", "地区分布(按独立访客)", "网络接入商(按独立访客)", "终端分布(按独立访客)", "操作系统分布(按独立访客)", "浏览器分布(按独立访客)", "分辨率分布(按独立访客)", "cookie支持性分布(按浏览次数)"], this.targetTitleName = ["流量趋势", "人均浏览页数", "跳出率", "平均访问深度", "平均访问时长", "新老访客分布", "新访客人均浏览页数", "新访客跳出率", "新访客平均访问深度", "新访客平均访问时长", "来源分类", "来源", "来源页面", "搜索引擎分布", "搜索词", "受访域名分布", "受访页面", "站内入口", "站内出口", "地区分布", "网络接入商", "终端分布", "操作系统分布", "浏览器分布", "分辨率分布", "cookie支持性分布"], this.targetAction = ["flow|trend|1", "flow|trend|1", "flow|trend|1", "flow|trend|1", "flow|trend|1", "visitor|type|1", "visitor|type|1", "visitor|type|1", "visitor|type|1", "visitor|type|1", "traf|overview|1", "traf|domain|1", "traf|page|1", "traf|search|1", "traf|keyword|1", "cont|domain|1", "cont|page|1", "cont|page|2", "cont|page|3", "visitor|districtnet|1", "visitor|districtnet|2", "visitor|terminal|1", "visitor|terminal|2", "visitor|terminal|3", "visitor|terminal|5", "visitor|terminal|6"], this.initModuleList()
		},
		initModuleList: function() {
			var e = this,
				t = r("#module_container");
			cnzz.tongji.fn.ajax("main.php?c=site&a=overview", {
				ajax: "module=allLables|module=lableList",
				siteid: e.siteId,
				st: e.st,
				et: e.et
			}, function(n) {
				n.lableList ? (t.show(), e.ie6 || r(window).on("resize", function() {
					e.containerWidth = parseInt(r("#rightContainer").width(), 10), e.settingWidth()
				}), e.initLables(n), e.dragdrop()) : (r("#overviewDateSelect").hide(), r("#module_container_flowTrend").hide(), r("a.manage_component").off("click"), r("a.manage_component").on("click", function() {
					var t = i.template(r("#site_overview_manager").html(), {});
					r.cnzz.popup({
						noTitle: !0,
						width: 600,
						message: t
					}), e.updateComponentLayout()
				}), t.empty().append('<li class="loadingLi tc" style="margin:10px auto;width:150px;;">您还没有选择部件</li>'))
			})
		},
		updateComponentLayout: function() {
			var e = this;
			cnzz.tongji.fn.ajax("main.php?c=site&a=overview", {
				ajax: "module=allLables|module=lableList",
				siteid: e.siteId
			}, function(t) {
				e.defautTarget = e.setDefalutTarget(t), e.newTarget = [], e.newTarget2 = [""];
				for (var n = 0; n < t.lableList.length; n++) {
					var r = t.lableList[n],
						i = r.type.split("_")[1] - 1;
					e.newTarget.push(i + 1), e.newTarget2.push(i + 1)
				}
				e.componentLayoutRender(t)
			}), r("img.submit_cancel").live("click", function() {
				r.modal.close()
			})
		},
		initLables: function(t) {
			function w() {
				if (h.length > 0) {
					var e;
					for (var t = 0; t < h.length; t++) e = new o(h[t], document.getElementById("module_flash_pie_" + h[t]), n.st, !1, !1)
				}
			}
			function E() {
				var e, t = !1;
				if (p.length > 0) for (var i = 0; i < p.length; i++) p[i] == 1 ? (parseInt(n.clickTimeBtnCounts, 10) === 1 && (e = new o(p[i], document.getElementById("module_flash_line_" + p[i]), n.st, d[0], d[1])), t = !0) : e = new o(p[i], document.getElementById("module_flash_line_" + p[i]), n.st, !1, !1);
				t || r("#module_container_flowTrend").hide()
			}
			function S() {
				t.lableList.length === 1 && parseInt(t.lableList[0].type.split("_")[1], 10) === 1 ? r("#overviewDateSelect").hide() : r("#overviewDateSelect").show()
			}
			S();
			var n = this,
				s = r("#module_container"),
				o = e("js/site/siteOverviewFlash"),
				u = "",
				a = "",
				f = r("#overview_moduleLine_tpl").html(),
				l = r("#overview_moduleCate_tpl").html(),
				c = r("#overview_moduleTabel_tpl").html(),
				h = [],
				p = [];
			n.defautTarget = n.setDefalutTarget(t), n.newTarget = [], n.newTarget2 = [""];
			var d = [!1, !1];
			for (var v = 0; v < t.lableList.length; v++) {
				var m = t.lableList[v],
					g = m.type.split("_")[0],
					y = m.type.split("_")[1] - 1;
				m.name = n.targetName[y], m.titleName = n.targetTitleName[y], m.index = y + 1, m.action = n.targetAction[y], m.siteId = n.siteId, m.st = n.st, m.et = n.et, g === "line" ? (y === 0 ? a += i.template(f, m) : u += i.template(f, m), p.push(m.type.split("_")[1]), y === 0 && (d = m.items)) : g === "pie" ? (u += i.template(l, m), h.push(m.type.split("_")[1])) : u += i.template(c, m), n.newTarget.push(y + 1), n.newTarget2.push(y + 1)
			}
			var b = r("#module_container_flowTrend");
			a && b.find("li").length === 0 ? b.empty().append(a).show() : b.find("li").length !== 0 ? b.show() : b.hide(), s.empty().append(u), n.settingWidth(), w(), E(), n.managerModuleByAuth(), r(".manage_component").off("click"), r(".manage_component").on("click", function() {
				var e = i.template(r("#site_overview_manager").html(), {});
				r.cnzz.popup({
					noTitle: !0,
					width: 600,
					message: e
				}), n.updateComponentLayout()
			}), r("a.del_component").on("click", function() {
				var e = r(this).parent().parent().parent(),
					t = e.attr("index"),
					i = n.newTarget;
				for (var s = 0; s < i.length; s++) t == i[s] && (i[s] = "");
				var o = "";
				for (var u = 0; u < i.length; u++) i[u] && (o += "_" + i[u]);
				n.saveOrder(o, function() {
					parseInt(t, 10) === 1 && r("#module_container_flowTrend").hide(), e.animate({
						opacity: 0
					}, 800, function() {
						e.remove()
					}), n.settingWidth()
				})
			})
		},
		setDefalutTarget: function(e) {
			var t = this.defautTarget,
				n = [];
			for (var r = 0; r < t.length; r++) {
				var s = !1,
					o = t[r] - 0;
				i.each(e.allLables, function(e, t) {
					var e = e - 0;
					o === e && n.push(e)
				}), s || (t[r] = "")
			}
			return n
		},
		settingWidth: function() {
			var e = this,
				t = r("#module_container"),
				n = parseInt(e.containerWidth, 10),
				i = n - 2,
				s = (n - 20) / 2;
			e.ie6 && (i = n - 2, s = (n - 24) / 2);
			var o = t.find("li.moduleOne"),
				u = t.find("li.moduleTwo");
			t.css({
				width: n
			}), o.css({
				width: parseInt(i, 10) - 10
			}), u.css({
				width: parseInt(s, 10)
			}), r("#module_container_flowTrend").find("li.module_data0").css({
				width: parseInt(i, 10) - 10
			})
		},
		dragdrop: function() {
			var t = this,
				n = e("js/util/dragdrop"),
				i = r("#module_container"),
				s = i.find("div.module_tit");
			s.css({
				cursor: "move"
			}), i.sortable({
				revert: !0,
				placeholder: "placeholder",
				handle: "div.module_tit",
				start: function(e, t) {
					var n = r(t.helper),
						s = n.width(),
						o = n.height();
					i.find(".placeholder").css({
						width: s,
						height: o,
						"float": "left",
						margin: "4px",
						border: "1px solid #CAE4AC"
					})
				},
				stop: function(e, n) {
					var i = "";
					r("#module_container li").each(function() {
						var e = r(this).attr("index");
						e && (i += "_" + e)
					}), r("#module_container_flowTrend").find("li").length && (i ? i = "_1" + i : i += "_1"), t.saveOrder(i)
				}
			})
		},
		offEvent: function() {
			r("ul.module_nav_ul li").off("click"), r("div.all_component").find("li").off("click"), r("ul.new_target_ul").find("li").die("click"), r("img.submit_ok").off("click"), r("img.submit_cancel").off("click"), r("a.set_default_target").off("click")
		},
		componentLayoutRender: function(e) {
			var t = r("#module_container"),
				n = this;
			this.offEvent();
			var s = [];
			r("div.all_component li").hide();
			if (!e.allLables) return;
			i.each(e.allLables, function(e, t) {
				var e = e - 1;
				r("div.all_component a").eq(e).parent().show()
			});
			for (var o = 0; o < e.allLables.length; o++) s[o] = "";
			this.initSelectComponent(n.newTarget2), r("ul.module_nav_ul li").on("click", function() {
				var e = r(this).index();
				r("ul.module_nav_ul li").removeClass("selected"), r(this).addClass("selected");
				var t = r("div.all_component > div");
				e === 0 ? t.show() : (t.hide(), t.eq(e - 1).show())
			}), r("div.all_component").find("li").on("click", function() {
				var e = r(this),
					t = e.find("img"),
					n = t.attr("orderIndex") - 0,
					i = t.attr("src"),
					o = e.find("span").attr("title");
				if (i.indexOf("grey") === -1) {
					var u = r("ul.new_target_ul").find("li").size();
					if (u >= 10) {
						r("#oldNoticeContent").slideDown("slow");
						return
					}
					var a = t.attr("info"),
						f = cnzz.tongji.path.img_path + "/icon/" + a + "_grey.gif";
					t.attr({
						src: f
					});
					var l = '<li title="' + o + '" orderIndex="' + n + '" info="' + a + '"><a><img title="删除" src="' + cnzz.tongji.path.img_path + "/icon/" + a + '_off.gif" /><br />' + e.text() + "</a></li>";
					s[n - 1] = l, r("ul.new_target_ul").append(l), r("span.targetSize").text(9 - u)
				}
			}), r("ul.new_target_ul").find("li").live("click", function() {
				var e = r(this).attr("orderIndex") - 0,
					t = r(this).attr("info"),
					i = e - 1;
				r(this).remove();
				var o = r("div.all_component").find("li").eq(i);
				o.find("img").attr({
					src: cnzz.tongji.path.img_path + "/icon/" + t + "_on.gif"
				}), n.setSelectComponentSize();
				for (var u = 0; u < n.newTarget.length; u++) n.newTarget[u] === e && (n.newTarget[u] = "");
				s[i] = "", r("#oldNoticeContent").slideUp("slow")
			}), r("a.set_default_target").on("click", function() {
				n.initSelectComponent(n.defautTarget)
			}), r("img.submit_ok").on("click", function() {
				var e = "";
				r("ul.new_target_ul li").each(function() {
					var t = r(this).attr("orderIndex");
					e += "_" + t
				});
				if (e) for (var t = 0, i = e.split("_").length; t < i; t++) {
					var s = e.split("_")[t];
					s && parseInt(s, 10) === 1 && (n.clickTimeBtnCounts = 1)
				}
				n.saveOrder(e, function() {
					r.modal.close(), n.initModuleList()
				}), r.modal.close()
			})
		},
		saveOrder: function(e, t) {
			var n = this,
				s = [];
			i.each(e.split("_"), function(e) {
				e && parseInt(e, 10) !== 1 && s.push(e)
			}), s.length === 0 ? r("#overviewDateSelect").hide() : r("#overviewDateSelect").show(), cnzz.tongji.fn.ajax("main.php?c=site&a=overview", {
				ajax: "module=lableHandle" + e,
				siteid: n.siteId
			}, function(e) {
				e.lableHandle && parseInt(e.lableHandle, 10) === 1 ? t && t() : (log("saveOrder 失败"), r("#cnzzGobalTip").html("部分数据更新失败,请稍候再试").parent().show(), setTimeout(function() {
					r("#cnzzGobalTip").parent().hide()
				}, 5e3))
			})
		},
		setSelectComponentSize: function() {
			var e = r("ul.new_target_ul").find("li").size();
			r("span.targetSize").text(10 - e)
		},
		initSelectComponent: function(e) {
			var t = this,
				n = r("div.all_component").find("li"),
				i = [];
			for (var s = 0; s < e.length; s++) r.each(n, function(t) {
				var n = r(this),
					o = n.find("img"),
					u = o.attr("info"),
					a = n.find("span").attr("title");
				t + 1 === e[s] && (o.attr({
					src: cnzz.tongji.path.img_path + "/icon/" + u + "_grey.gif"
				}), i += '<li title="' + a + '" orderIndex="' + e[s] + '" info="' + u + '"><a><img title="删除" src="' + cnzz.tongji.path.img_path + "/icon/" + u + '_off.gif" /><br />' + n.text() + "</a></li>")
			});
			r.each(n, function(t) {
				var n = r(this).find("img"),
					i = n.attr("info"),
					s = !0;
				for (var o = 0; o < e.length; o++) t + 1 === e[o] && (s = !1);
				s && n.attr({
					src: cnzz.tongji.path.img_path + "/icon/" + i + "_on.gif"
				})
			}), r("ul.new_target_ul").empty().append(i), t.setSelectComponentSize()
		}
	}, r(function() {
		r("#rightContainer").on("site_overview.change", function() {
			var e = r("#siteId").val(),
				t = new o(e);
			t.start()
		}), r("#rightContainer").trigger("site_overview.change")
	})
});
define("http://images.cnzz.com/static/js/util/right_title.js", ["jquery", "underscore", "util/common"], function(e, t, n) {
	function o() {}
	var r = e("jquery"),
		i = e("underscore"),
		s = e("util/common");
	return o.prototype = {
		start: function() {
			this.st = r("#time_st").val(), this.et = r("#time_et").val(), this.siteId = r("#siteId").val(), this.action = r("#ajaxActionName").val(), this.controller = r("#controller_rightTitle").val(), this.tabIndex = r("#tab_index").val(), this.historyKey = cnzz.tongji.fn.util.getAbbr(r("#historyKey").val(), 50), this.historyKeyParam = r("#historyKeyParam").val(), this.tabIndex = r("#tab_index").val() - 0, this.rootEl = r("#rightTopTitle"), this.topTitle(), this.downReport()
		},
		topTitle: function() {
			var e = this,
				t = e.st,
				n = e.et,
				i = e.siteId,
				s = e.action,
				o = e.historyKeyParam,
				u = e.controller,
				a = e.historyKey,
				f = e.rootEl,
				l = e.tabIndex,
				c = r("#time_info_today").val(),
				h = r("#right_top_title"),
				p = "提供该项目的详细趋势分析数据。";
			if (s === "overview" && u === "site") h.siblings("a").attr({
				tip: "网站概况帮助您整体了解网站情况，提供重点指标趋势图，并从来源、受访、访客等分析维度提供统计数据，可以通过“管理页面部件”选择对您最有分析价值的数据项进行默认显示。"
			}), document.title = cnzz.tongji.global.siteName + "_网站概况_" + cnzz.tongji.global.titleName;
			else if (s === "trend" && u === "flow") h.html("流量分析-趋势分析（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: "根据您选定的时间段，提供网站流量数据，通过流量的趋势变化形态，可帮助您分析出网站访客的访问规律、网站发展状况等。"
			}), document.title = cnzz.tongji.global.siteName + "_流量分析_趋势分析_" + cnzz.tongji.global.titleName;
			else if (s === "compare" && u === "flow") {
				var d = r("#time_cst").val(),
					v = r("#time_cet").val();
				h.html("流量分析-对比分析（" + t + "至" + n + "对比" + d + "至" + v + "）"), h.siblings("a").attr({
					tip: "根据您选定的两个时间段，提供网站流量在时间上的纵向对比报表，可帮助您分析出网站发展状况、发展规律、流量变化率等。"
				}), document.title = cnzz.tongji.global.siteName + "_流量分析_对比分析" + cnzz.tongji.global.titleName
			} else if (s === "realtime" && u === "flow") h.siblings("a").attr({
				tip: "提供当前时刻站点上的访客量，以及最近15分钟流量、来源、受访、访客变化情况等，帮助您及时了解当前网站状况。"
			}), document.title = cnzz.tongji.global.siteName + "_流量分析_当前在线_" + cnzz.tongji.global.titleName;
			else if (s === "detail" && u === "flow") {
				var m = r("#time_info_ago7days").val(),
					c = r("#time_info_today").val();
				t === n && cnzz.tongji.fn.getTimeByStringDate(t) >= cnzz.tongji.fn.getTimeByStringDate(m) ? h.html("流量分析-访问明细（" + t + "至" + n + "）") : h.html("流量分析-访问明细（" + c + "至" + c + "）"), h.siblings("a").attr({
					tip: "提供最近7日的访客访问记录，可按每个PV或每次访问行为(访客的每次会话)显示，并可按照来源、搜索词等条件进行筛选。帮助您更加快速、详细的查找流量变动原因。"
				}), document.title = cnzz.tongji.global.siteName + "_流量分析_访问明细_" + cnzz.tongji.global.titleName
			} else if (s === "overview" && u === "traf") h.html("来源分析-来源分类（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: "提供不同来源形式（直接输入、搜索引擎、其他外部链接、站内来源）、不同来源项引入流量的比例情况。可帮助您了解什么类型的来路产生的流量多、效果好，以便合理的优化推广方案。"
			}), document.title = cnzz.tongji.global.siteName + "_来源分析_来源分类_" + cnzz.tongji.global.titleName;
			else if (s === "overview_history" && u === "traf") h.html("来源分类（" + a + "）-历史趋势（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: p
			}), document.title = cnzz.tongji.global.siteName + "_来源分析_来源分类_历史趋势_" + cnzz.tongji.global.titleName;
			else if (s === "search" && u === "traf") h.html("来源分析-搜索引擎（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: "提供各搜索引擎以及搜索引擎子产品引入流量的比例情况。可帮助您了解网站的SEO、SEM效果。"
			}), document.title = cnzz.tongji.global.siteName + "_来源分析_搜索引擎_" + cnzz.tongji.global.titleName;
			else if (s === "search_history" && u === "traf") h.html("搜索引擎（" + a + "）-历史趋势（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: p
			}), document.title = cnzz.tongji.global.siteName + "_来源分析_历史趋势_" + cnzz.tongji.global.titleName;
			else if (s === "keyword" && u === "traf") h.html("来源分析-搜索词（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: "提供访客搜索到您网站时所使用的搜索词及每个词的引入流量质量。可帮助您了解访客的兴趣关注点，网站与访客兴趣点的匹配度，有助于优化SEO方案及SEM提词方案。"
			}), document.title = cnzz.tongji.global.siteName + "_来源分析_搜索词_" + cnzz.tongji.global.titleName;
			else if (s === "keyword_history" && u === "traf") h.html("搜索词（" + a + "）-历史趋势（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: p
			}), document.title = cnzz.tongji.global.siteName + "_来源分析_搜索词_历史趋势_" + cnzz.tongji.global.titleName;
			else if (s === "domain" && u === "traf") h.html("来源分析-来路域名（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: "提供具体来路域名引入流量的分布情况，并可按“社会化媒体”、“搜索引擎”、“邮箱”等网站类型对来源域名进行分类。可帮助您了解哪类推广渠道产生的流量多、效果好，以便合理的优化推广方案。"
			}), document.title = cnzz.tongji.global.siteName + "_来源分析_来路域名_" + cnzz.tongji.global.titleName;
			else if (s === "domain_history" && u === "traf") {
				var a = r("#historyKey").val();
				h.html("来路域名（" + cnzz.tongji.fn.util.getAbbr(decodeURIComponent(a), 50) + "）-历史趋势（" + t + "至" + n + "）"), h.siblings("a").attr({
					tip: p
				}), document.title = cnzz.tongji.global.siteName + "_来源分析_来路域名_历史趋势_" + cnzz.tongji.global.titleName
			} else if (s === "page" && u === "traf") h.html("来源分析-来路页面（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: "提供具体来路页面引入流量的分布情况，当您通过流量置换、包广告位等方式从其他网站引入流量时，可通过此功能方便的了解到广告引入的流量及效果，以便合理的优化推广方案。"
			}), document.title = cnzz.tongji.global.siteName + "_来源分析_来路页面_" + cnzz.tongji.global.titleName;
			else if (s === "page_history" && u === "traf") {
				var a = r("#historyKey").val();
				h.html("来路页面（" + cnzz.tongji.fn.util.getAbbr(decodeURIComponent(a), 50) + "）-历史趋势（" + t + "至" + n + "）"), h.siblings("a").attr({
					tip: p
				}), document.title = cnzz.tongji.global.siteName + "_来源分析_来路页面_历史趋势_" + cnzz.tongji.global.titleName
			} else if (s === "updown" && u === "traf") h.html("来源分析-升降榜（" + t + "对比" + n + "）"), h.siblings("a").attr({
				tip: "提供开通统计后任意两日的TOP1000搜索词、来路域名引入流量的对比情况，并按照变化的剧烈程度提供排行榜，可通过此功能快速找到哪些来路对网站流量的影响比较大，从而及时排查相应来路问题。"
			}), document.title = cnzz.tongji.global.siteName + "_升降榜_来路页面_" + cnzz.tongji.global.titleName;
			else if (s === "domain" && u === "cont") h.html("受访分析-受访域名（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: "提供访客对网站中各个域名的访问情况。不同域名下所包含的产品、内容有差异，可通过此功能了解不同内容的受欢迎程度以及运营成效。"
			}), document.title = cnzz.tongji.global.siteName + "_受访分析_受访域名_" + cnzz.tongji.global.titleName;
			else if (s === "domain_history" && u === "cont") {
				var a = r("#historyKey").val();
				h.html("受访域名（" + cnzz.tongji.fn.util.getAbbr(decodeURIComponent(a), 50) + "）-历史趋势（" + t + "至" + n + "）"), h.siblings("a").attr({
					tip: p
				}), document.title = cnzz.tongji.global.siteName + "_受访分析_受访域名_历史趋势_" + cnzz.tongji.global.titleName
			} else if (s === "page" && u === "cont") h.html("受访分析-受访页面（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: "提供访客对网站中各个页面的访问情况。站内入口页面为访客进入网站时浏览的第一个页面，如果入口页面的跳出率较高则需要关注并优化。站内出口页面为访客访问网站的最后一个页面，对于离开率较高的页面需要关注并优化。"
			}), document.title = cnzz.tongji.global.siteName + "_受访分析_受访页面_" + cnzz.tongji.global.titleName;
			else if (s === "page_history" && u === "cont") {
				var g = "受访页面",
					a = r("#historyKey").val();
				l === 1 ? g = "受访页面" : l === 2 ? g = "站内入口" : l === 3 && (g = "站内出口"), h.html(g + "（" + cnzz.tongji.fn.util.getAbbr(decodeURIComponent(a), 50) + "）-历史趋势（" + t + "至" + n + "）"), h.siblings("a").attr({
					tip: p
				}), document.title = cnzz.tongji.global.siteName + "_受访分析_受访页面_历史趋势_" + cnzz.tongji.global.titleName
			} else if (s === "updown" && u === "cont") h.html("受访分析-升降榜（" + t + "对比" + n + "）"), h.siblings("a").attr({
				tip: "提供开通统计后任意两日的TOP1000受访页面的浏览情况对比，并按照变化的剧烈程度提供排行榜，可通过此功能验证经过改版的页面是否有流量提升或哪些页面有巨大流量波动，从而及时排查相应问题。"
			}), document.title = cnzz.tongji.global.siteName + "_升降榜_来路页面_" + cnzz.tongji.global.titleName;
			else if (s === "clickhot" && u === "cont") h.html("受访分析-热点图（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: '记录访客在页面上的鼠标点击行为，通过颜色区分不同区域的点击热度。支持将一组页面设置为"关注范围"，并可按来路细分点击热度等功能。可帮助您了解页面的设计是否合理，广告位的安排能否获取更多佣金。'
			}), document.title = cnzz.tongji.global.siteName + "_受访分析_热点图_" + cnzz.tongji.global.titleName;
			else if (s === "districtnet" && u === "visitor") {
				var y = "地区分布";
				l === 2 && (y = "网络运营商"), h.html("访客分析-" + y + "（" + t + "至" + n + "）"), h.siblings("a").attr({
					tip: "提供各地区访客、各网络运营商访客的访问情况分布，地方网站、下载站等与地域性、网络链路等结合较为紧密的网站可以参考此功能数据，合理优化推广运营方案。 "
				}), document.title = cnzz.tongji.global.siteName + "_访客分析_" + y + "_" + cnzz.tongji.global.titleName
			} else if (s === "userview" && u === "cont") h.html("受访分析-用户视点（" + c + "至" + c + "）"), h.siblings("a").attr({
				tip: "提供受访页面对页面上链接的其他站内页面的输出流量，并通过输出流量的高低绘制热度图，与热点图不同的是，所有记录都是实际打开了下一页面产生了浏览次数（PV）的数据，而不仅仅是拥有鼠标点击行为。"
			}), document.title = cnzz.tongji.global.siteName + "_受访分析_用户视点_" + cnzz.tongji.global.titleName;
			else if (s === "flow" && u === "cont") h.html("受访分析-访问轨迹"), h.siblings("a").attr({
				tip: "提供观察焦点页面的上下游页面，了解访客从哪些途径进入页面，又流向了哪里。可通过上游页面列表比较出不同流量引入渠道的效果，通过下游页面列表了解用户浏览习惯，哪些页面元素、内容更吸引访客点击。"
			}), document.title = cnzz.tongji.global.siteName + "_受访分析_访问轨迹_" + cnzz.tongji.global.titleName;
			else if (s === "districtnet_history" && u === "visitor") {
				var y = "地区分布";
				l === 2 && (y = "网络运营商"), h.html(y + "（" + a + "）-历史趋势（" + t + "至" + n + "）"), h.siblings("a").attr({
					tip: p
				}), document.title = cnzz.tongji.global.siteName + "_访客分析_" + y + "_历史趋势_" + cnzz.tongji.global.titleName
			} else if (s === "terminal" && u === "visitor") {
				var y = "终端详情";
				l === 2 ? y = "操作系统" : l === 3 ? y = "浏览器" : l === 4 ? y = "浏览器内核" : l === 5 ? y = "分辨率" : l === 6 ? y = "是否支持cookie" : l === 7 ? y = "语言" : l === 8 && (y = "插件"), h.html("访客分析-" + y + "（" + t + "至" + n + "）"), h.siblings("a").attr({
					tip: "提供网站访客所使用的浏览终端的配置情况，参考此数据进行网页设计、开发，可更好地提高网站兼容性，以达到良好的用户交互体验。"
				}), document.title = cnzz.tongji.global.siteName + "_访客分析_" + y + "_" + cnzz.tongji.global.titleName
			} else if (s === "terminal_history" && u === "visitor") {
				var b = r("#historyKeyFrom").val(),
					w = r("#historyKeyParam").val(),
					E = r("#historyKey").val(),
					y = "";
				switch (b) {
				case "agentTypeHistory":
					y = "终端详情";
					break;
				case "systemHistory":
					y = "操作系统";
					break;
				case "browserHistory":
					y = "浏览器";
					break;
				case "browserCoreHistory":
					y = "浏览器内核";
					break;
				case "resolutionHistory":
					y = "分辨率";
					break;
				case "cookieHistory":
					y = "是否支持cookie";
					break;
				case "languageHistory":
					y = "语言";
					break;
				case "pluginHistory":
					y = "插件安装"
				}
				b === "cookieHistory" && parseInt(E) === 0 ? w = "支持cookie" : b === "cookieHistory" && parseInt(E) === 1 && (w = "不支持cookie"), h.html(y + "（" + w + "）-历史趋势（" + t + "至" + n + "）"), h.siblings("a").attr({
					tip: p
				}), document.title = cnzz.tongji.global.siteName + "_访客分析_" + y + "_历史趋势_" + cnzz.tongji.global.titleName
			} else s === "type" && u === "visitor" ? (h.html("访客分析-新老访客（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: "当日的访客中，历史上第一次访问您网站的访客记为当日的新访客，历史上已经访问过网站的访客记为老访客，新访客与老访客进入网站的途径和浏览行为往往存在差异。该功能可帮助您了解不同访客的行为习惯，针对不同访客优化网站。例如为制作新手导航提供数据支持等。"
			}), document.title = cnzz.tongji.global.siteName + "_受访分析_新老访客_" + cnzz.tongji.global.titleName) : s === "type_history" && u === "visitor" ? ("newVisitor" === a ? h.html("新老访客（新访客）-历史趋势（" + t + "至" + n + "）") : "oldVisitor" === a && h.html("新老访客（老访客）-历史趋势（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: p
			}), document.title = cnzz.tongji.global.siteName + "_受访分析_新老访客_历史趋势_" + cnzz.tongji.global.titleName) : s === "frequency" && u === "visitor" ? (h.siblings("a").attr({
				tip: "从访客一天内回访网站的次数(日访问频度)与访客上次访问网站的时间两个角度，分析访客对网站的访问粘性、忠诚度、吸引程度。提升网站内容的更新频率、增强用户体验与用户价值可以有更高的忠诚度。 "
			}), document.title = cnzz.tongji.global.siteName + "_受访分析_忠诚度_" + cnzz.tongji.global.titleName) : s === "frequency_history" && u === "visitor" ? (h.html("忠诚度（" + a + "）-历史趋势（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: p
			}), document.title = cnzz.tongji.global.siteName + "_受访分析_忠诚度_历史趋势_" + cnzz.tongji.global.titleName) : s === "engagement" && u === "visitor" ? (h.html("访客分析-活跃度（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: "从访客单次访问浏览网站的时间与网页数两个角度，分析访客在网站上的活跃程度。提升网站内容的质量与数量可以有更高的活跃度。"
			}), document.title = cnzz.tongji.global.siteName + "_受访分析_活跃度_" + cnzz.tongji.global.titleName) : s === "engagement_history" && u === "visitor" ? (h.html("活跃度（" + a + "）-历史趋势（" + t + "至" + n + "）"), h.siblings("a").attr({
				tip: p
			}), document.title = cnzz.tongji.global.siteName + "_受访分析_活跃度_历史趋势_" + cnzz.tongji.global.titleName) : s === "funnel" && u === "goals" && (h.html("转化路径分析-路径分析 "), h.siblings("a").attr({
				tip: "目标指访客完成您期望的业务，如“购买商品”后，最终进入的页面。本功能允许您设定目标及到达目标前的步骤页面，然后分析出每一步骤的转化（成功流向下一步）与流失（离开路径）情况。"
			}), document.title = cnzz.tongji.global.siteName + "_转化路径分析_路径分析_" + cnzz.tongji.global.titleName);
			r("a.rightHeaderTip").die("click"), r("a.rightHeaderTip").live("click", function() {
				var e = r(this).offset(),
					t = r("#pop_dialog_table_arrow");
				s.indexOf("_history") !== -1 ? t.css({
					top: e.top,
					left: e.left + 20,
					width: 210,
					height: "auto"
				}) : t.css({
					top: e.top,
					left: e.left + 20,
					width: 400,
					height: "auto"
				}), t.find("div.popl").show(), t.find("div.popb").hide(), t.find("div.popt").hide(), t.find("div.popr").hide(), r("#pop_dialog_table_arrow_content").html('<div class="dialog_table_arrow_content">' + r(this).attr("tip") + "</div>"), t.show()
			}), r(document).on("click", function(e) {
				var t = r(e.target),
					n = r("#pop_dialog_table_arrow"),
					i = t.attr("class");
				i ? n.css("display") !== "none" && i.indexOf("sum_help") === -1 && t.attr("class") !== "help rightHeaderTip" && t.attr("class") !== "pop_body" && t.attr("class") !== "dialog_table_arrow_content" && t.attr("class") !== "blue12" && (n.css({
					top: 0,
					left: 0,
					width: "auto",
					height: "auto"
				}), n.find("div.popb").show(), n.find("div.popt").show(), n.find("div.popl").show(), n.find("div.popr").show(), n.hide()) : n.css("display") !== "none" && t.attr("class") !== "help rightHeaderTip" && (n.css({
					top: 0,
					left: 0,
					width: "auto",
					height: "auto"
				}), n.find("div.popb").show(), n.find("div.popt").show(), n.find("div.popl").show(), n.find("div.popr").show(), n.hide())
			}), r("#pop_dialog_table_arrow").live({
				mouseover: function() {
					r(this).show()
				},
				mouseout: function() {
					r(this).hide()
				}
			})
		},
		downReport: function() {
			function n() {
				var t = e.st,
					n = e.et,
					i = e.siteId,
					s = e.action,
					o = e.controller,
					u = e.historyKey,
					a = e.rootEl,
					f = e.tabIndex,
					l = "main.php?c=" + o + "&a=" + s + "&ajax=module=report&siteid=" + i + "&st=" + t + "&et=" + n;
				r("#down_report").parent().show(), r("#down_report").text("下载报表");
				if (o === "flow" && s === "compare") {
					var c = r("#time_cst").val(),
						h = r("#time_cet").val();
					l = l + "&cst=" + c + "&cet=" + h
				} else if (o === "flow" && s === "detail") r("#down_report").text("下载本页报表"), l = r("#down_report").attr("url");
				else if (o === "flow" && s === "realtime") r("#down_report").parent().hide();
				else if (o === "cont" && s === "page") l = l + "&tabIndex=" + f;
				else if (o === "visitor" && s === "districtnet") l = l + "&tabIndex=" + f;
				else if (o === "visitor" && s === "terminal") l = l + "&tabIndex=" + f;
				else if (o === "visitor" && s === "frequency") l = l + "&tabIndex=" + f;
				else if (o === "visitor" && s === "engagement") l = l + "&tabIndex=" + f;
				else if (o === "cont" && s === "flow") {
					var p = r("input.contFlowInputSelect").val();
					l = l + "&url=" + encodeURIComponent(p)
				} else if (o === "cont" && s === "updown" || o === "traf" && s === "updown") r("#down_report").text("下载本页报表"), l = r("#down_report").attr("url");
				return l
			}
			var e = this,
				t = r("#downloadSelect");
			r("#down_report").text("下载报表"), r("#down_report").on("click", function() {
				var e = document.documentElement.clientWidth;
				t.modal({
					position: ["10%", "33%"]
				})
			}), r("div.submitButton", t).die("click"), r("div.submitButton", t).live("click", function() {
				var e = n(),
					t = r('input[name="downloadRadio"]:radio');
				t.each(function() {
					if (r(this).attr("checked") === "checked") {
						var t = r(this).val();
						e += "&downloadType=" + t, r.modal.close(), location.href = e
					}
				})
			}), r("div.cancelButon", t).live("click", function() {
				r.modal.close()
			}), e.action && e.action.indexOf("_history") !== -1 ? r("#down_report").parent().hide() : r("#down_report").parent().show(), e.controller === "flow" && e.action === "realtime" && r("#down_report").parent().hide(), e.controller === "cont" && e.action === "userview" && r("#down_report").parent().hide(), e.controller === "goals" && e.action === "funnel" && r("#down_report").parent().hide()
		}
	}, o
});
define("http://images.cnzz.com/static/js/util/router.js", ["jquery", "underscore", "backbone", "util/common", "util/timeBar", "util/datepicker"], function(e, t, n) {
	function a() {
		r("div.datepicker_container").length && r("div.datepicker_container").hide(), r("div.datepicker_container1").length && r("div.datepicker_container1").hide(), cnzz.tongji.flash.realtimeFlash && cnzz.tongji.flash.realtimeFlash.oStop(), clearInterval(cnzz.tongji.global.last15Interval), r("#pop_dialog_table_arrow").hide(), r("div.userGuideBorder").hide(), r("#beginnersGuideLayoutDown").hide(), r("#beginnersGuideLayoutDown2").hide(), r("#beginnersGuideLayoutUp").hide(), r("#beginnersGuideLayoutUp2").hide()
	}
	function f(e, t) {
		var n = /^\d{4}-\d{2}-\d{2}$/,
			i = r("#time_info_today").val(),
			s = r("#time_info_add_stat_time").val(),
			o = cnzz.tongji.fn.getIntervalsByDates(e + "至" + t) <= 395;
		if (!o) return cnzz.tongji.fn.statusTipPopup({
			txt: "时间的查询范围不能超过395天，建议您分多次查询较短时间数据!",
			status: "alarm"
		}), cnzz.tongji.fn.statusTipPopupHide(3), !0
	}
	function l(e) {
		var t = /^\d{4}-\d{2}-\d{2}$/,
			n = r("#time_info_today").val(),
			i = r("#time_info_add_stat_time").val(),
			s = t.test(e),
			o = cnzz.tongji.fn.compare_date(i, e),
			u = cnzz.tongji.fn.compare_date(e, n);
		return s ? o ? u ? e : n : i : n
	}
	function c(e) {
		var t = r.url(location.search).param();
		return t[e]
	}
	function h() {
		var e = new u;
		s.history.start({
			pushState: !1
		}), this.start()
	}
	function p() {
		r("a.sum_help, span.sum_help").live("click", function() {
			var e = r(this).offset(),
				t = r("#pop_dialog_table_arrow"),
				n = r(this).attr("w") || 270,
				i = r(this).attr("h") || 100;
			t.css({
				top: e.top - 100,
				left: e.left - 220,
				width: n,
				height: i
			}), t.find("div.popt").show(), t.find("div.popb").hide(), t.find("div.popl").hide(), t.find("div.popr").hide();
			var s = r(this).attr("tip"),
				o = r("#pop_dialog_table_arrow_content");
			o.html('<div class="dialog_table_arrow_content">' + cnzz.tongji.global.targetTip[s] + "</div>"), t.show()
		}), cnzz.tongji.global.siteName = r("#siteName").val(), r("#cnzzGobalTip").parent().css({
			left: (parseInt(document.body.clientWidth, 10) - 300) / 2
		})
	}
	function d() {
		var e = r("#time_info_today").val(),
			t = r("#siteId").val(),
			n = r("a.leftNav", r("#leftAllNavRoot")).eq(0).attr("nav");
		if (n && n.split("|").length === 2) {
			var i = "main.php?c=" + n.split("|")[0] + "&a=frame&siteid=" + t + "#!/" + cnzz.tongji.global.timestamp() + "/" + n.split("|")[0] + "/" + n.split("|")[1] + "/1/" + t + "/" + e + "/" + e;
			return location.href = i, !0
		}
	}
	function v() {
		var e = document.body.clientWidth - 10,
			t = document.body.offsetWidth - 10,
			n = r("#header").height() - 0;
		n > 100 ? n -= 100 : n = 0;
		var i = r("#controller").val(),
			s = r("#ajaxActionName").val();
		if (i === "flow" && s === "trend") {
			if (r("#time_tool_setup").length) {
				var o = r("div.beginnersGuideBorderOne"),
					u = cnzz.tongji.fn.getCookie("UGTarget");
				u || cnzz.tongji.fn.userGuideGetStatus("UGTarget", function(i, s) {
					if (!s) {
						o.css({
							width: e,
							height: t
						}).show();
						var u = r("#beginnersGuideLayoutDown");
						o.animate({
							width: "-=" + (e - 88),
							height: "-=" + (t - 28),
							top: 153 + n,
							right: 70
						}, 1e3, function() {
							u.find("span.downSpanText1").html("数据指标辣么多，选你所用。"), u.find("span.downSpanText2").html("跳出率、平均访问时长等虽然隐藏了，但同样值得您关注。"), u.css({
								top: 70 + n,
								right: 70
							}).fadeIn(), o.css({
								cursor: "pointer"
							})
						}), r("a.closeDown", u).on("click", function() {
							u.fadeOut(), o.hide()
						}), o.on("click", function() {
							r("a.closeDown", u).trigger("click")
						}), cnzz.tongji.fn.setCookie("UGTarget=1"), cnzz.tongji.fn.userGuideSaveStatus(i + "|UGTarget=1", function() {})
					} else cnzz.tongji.fn.setCookie("UGTarget=1")
				})
			}
			if (r("#icon_dingzhu").length) {
				var a = cnzz.tongji.fn.getCookie("UGPeg");
				a || cnzz.tongji.fn.userGuideGetStatus("UGPeg", function(i, s) {
					if (!s) {
						var o = r("div.beginnersGuideBorderTwo"),
							u = r("#beginnersGuideLayoutUp");
						o.css({
							width: e,
							height: t
						}).show(), o.animate({
							width: "-=" + (e - 21),
							height: "-=" + (t - 28),
							top: 153 + n,
							right: 45
						}, 1e3, function() {
							u.find("span.upSpanText1").html("定条神针！时间条跟着屏幕跑就是这么简单。"), u.find("span.upSpanText2").html("锁定时间条，下拉页面时将浮动跟随。"), u.css({
								top: 200 + n,
								right: 30
							}).fadeIn(), o.css({
								cursor: "pointer"
							})
						}), r("a.closeUp", u).on("click", function() {
							r("#beginnersGuideLayoutUp").fadeOut(), o.hide()
						}), o.on("click", function() {
							r("a.closeUp", u).trigger("click"), r("#icon_dingzhu").trigger("click")
						}), cnzz.tongji.fn.setCookie("UGPeg=1"), cnzz.tongji.fn.userGuideSaveStatus(i + "|UGPeg=1", function() {})
					} else cnzz.tongji.fn.setCookie("UGPeg=1")
				})
			}
		}
	}
	var r = e("jquery"),
		i = e("underscore"),
		s = e("backbone"),
		o = e("util/common");
	e("util/timeBar");
	var u = s.Router.extend({
		routes: {
			"": "home",
			"!/:timestamp/site/overview/:tab/:siteid/:st/:et": "dashboard",
			"!/:timestamp/flow/trend/:tab/:siteid/:st/:et": "trend",
			"!/:timestamp/flow/compare/:tab/:siteid/:st/:et/:cst/:cet": "compare",
			"!/:timestamp/flow/realtime/:tab/:subtab/:siteid/:st/:et": "realtime",
			"!/:timestamp/flow/detail/:tab/:subtab/:siteid/:st/:et": "detail",
			"!/:timestamp/traf/overview/:tab/:siteid/:st/:et": "overview",
			"!/:timestamp/traf/search/:tab/:siteid/:st/:et": "search",
			"!/:timestamp/traf/keyword/:tab/:siteid/:st/:et": "keyword",
			"!/:timestamp/traf/domain/:tab/:siteid/:st/:et": "referrals_domain",
			"!/:timestamp/traf/page/:tab/:siteid/:st/:et": "referrals_page",
			"!/:timestamp/traf/updown/:tab/:siteid/:st/:et/:cst/:cet": "traf_updown",
			"!/:timestamp/traf/overview_history/:tab/:siteid/:st/:et": "overviewHistory",
			"!/:timestamp/traf/search_history/:tab/:siteid/:st/:et": "searchHistory",
			"!/:timestamp/traf/keyword_history/:tab/:siteid/:st/:et": "keywordHistory",
			"!/:timestamp/traf/domain_history/:tab/:siteid/:st/:et": "domainHistory",
			"!/:timestamp/traf/page_history/:tab/:siteid/:st/:et": "pageHistory",
			"!/:timestamp/cont/domain/:tab/:siteid/:st/:et": "domain",
			"!/:timestamp/cont/page/:tab/:siteid/:st/:et": "page",
			"!/:timestamp/cont/updown/:tab/:siteid/:st/:et/:cst/:cet": "cont_updown",
			"!/:timestamp/cont/page/:tab/:siteid/:st/:et/:url": "pageByUrl",
			"!/:timestamp/cont/clickhot/:tab/:siteid/:st/:et": "clickhot",
			"!/:timestamp/cont/userview/:tab/:siteid/:st/:et": "userview",
			"!/:timestamp/cont/flow/:tab/:siteid/:st/:et": "flow",
			"!/:timestamp/cont/domain_history/:tab/:siteid/:st/:et": "contDomainHistory",
			"!/:timestamp/cont/page_history/:tab/:siteid/:st/:et": "contPageHistory",
			"!/:timestamp/visitor/districtnet/:tab/:siteid/:st/:et": "districtnet",
			"!/:timestamp/visitor/terminal/:tab/:siteid/:st/:et": "terminal",
			"!/:timestamp/visitor/type/:tab/:siteid/:st/:et": "type",
			"!/:timestamp/visitor/frequency/:tab/:siteid/:st/:et": "frequency",
			"!/:timestamp/visitor/engagement/:tab/:siteid/:st/:et": "engagement",
			"!/:timestamp/visitor/districtnet_history/:tab/:siteid/:st/:et": "districtnetHistory",
			"!/:timestamp/visitor/terminal_history/:tab/:siteid/:st/:et": "terminalHistory",
			"!/:timestamp/visitor/type_history/:tab/:siteid/:st/:et": "typeHistory",
			"!/:timestamp/visitor/frequency_history/:tab/:siteid/:st/:et": "frequencyHistory",
			"!/:timestamp/visitor/engagement_history/:tab/:siteid/:st/:et": "engagementHistory",
			"!/:timestamp/goals/funnel/:tab/:siteid/:pid/:st/:et": "funnelEditor",
			"!/:timestamp/goals/funnel/:tab/:siteid/:st/:et": "funnel",
			"!/:timestamp/goals/funnel/:tab/:siteid/:pid/:sid/:st/:et": "funnelPath",
			"!/:timestamp/alarm/loglist/:tab/:siteid/:st/:et": "loglist",
			"!/:timestamp/alarm/setting/:tab/:siteid/:st/:et": "setting",
			"!/:timestamp/alarm/settingphone/:tab/:siteid/:st/:et": "settingphone",
			"!/:timestamp/component/chome/:tab/:siteid/:st/:et": "chome",
			"!/:timestamp/component/safety/:tab/:siteid/:st/:et": "safety",
			"!/:timestamp/component/speed/:tab/:siteid/:st/:et": "speed",
			"!/:timestamp/component/clicktongji/:tab/:siteid/:st/:et": "clicktongji",
			"!/:timestamp/report/com/:tab/:siteid/:st/:et": "reportCom",
			"!/:timestamp/report/seo/:tab/:siteid/:st/:et": "reportSeo",
			"!/:timestamp/report/health/:tab/:siteid/:st/:et": "reportHealth",
			"!/:timestamp/report/cont/:tab/:siteid/:st/:et": "reportCont",
			"!/:timestamp/report/forecast/:tab/:siteid/:st/:et": "reportForecast",
			"!/:timestamp/report/cycle/:tab/:siteid/:st/:et": "reportCycle",
			"!/:timestamp/hezuo/hotlist/:tab/:siteid/:st/:et": "hotList",
			"!/:timestamp/hezuo/adlist/:tab/:siteid/:st/:et": "adList",
			"!/:timestamp/hezuo/mlist/:tab/:siteid/:st/:et": "mList",
			"!/:timestamp/hezuo/weblist/:tab/:siteid/:st/:et": "webList",
			"!/:timestamp/hezuo/splist/:tab/:siteid/:st/:et": "spList",
			"!/:timestamp/usermanage/feedback/:tab/:siteid/:st/:et": "feedback",
			"*anything": "noMatchAll"
		},
		noMatchAll: function(e) {
			d()
		},
		home: function() {},
		dashboard: function(e, t, n, r, i) {
			var s = "site_overview";
			this.get_ajax_html(s, t, 10, r, i, n)
		},
		trend: function(e, t, n, r, i) {
			var s = "flow_trend";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		compare: function(t, n, i, s, o, u, a) {
			var f = e("util/datepicker"),
				c = "flow_compare",
				h = l(u),
				p = l(a);
			r("#time_cst").val(h), r("#time_cet").val(p), this.get_ajax_html(c, n, 1, s, o, i)
		},
		realtime: function(e, t, n, i, s, o) {
			var u = "flow_realtime";
			r("#sub_tab_index").val(n), this.get_ajax_html(u, t, 2, s, o, i)
		},
		detail: function(e, t, n, i, s, o) {
			var u = "flow_detail";
			r("#sub_tab_index").val(n), this.get_ajax_html(u, t, 3, s, o, i)
		},
		overview: function(e, t, n, r, i) {
			var s = "traf_overview";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		search: function(e, t, n, r, i) {
			var s = "traf_search";
			this.get_ajax_html(s, t, 1, r, i, n)
		},
		keyword: function(e, t, n, r, i) {
			var s = "traf_keyword";
			this.get_ajax_html(s, t, 2, r, i, n)
		},
		referrals_domain: function(e, t, n, r, i) {
			var s = "traf_domain";
			this.get_ajax_html(s, t, 3, r, i, n)
		},
		referrals_page: function(e, t, n, r, i) {
			var s = "traf_page";
			this.get_ajax_html(s, t, 4, r, i, n)
		},
		traf_updown: function(e, t, n, i, s, o, u) {
			var a = "traf_updown",
				f = l(o),
				c = l(u);
			r("#time_cst").val(f), r("#time_cet").val(c), this.get_ajax_html(a, t, 5, i, s, n)
		},
		overviewHistory: function(e, t, n, r, i) {
			var s = "traf_overview_history";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		searchHistory: function(e, t, n, r, i) {
			var s = "traf_search_history";
			this.get_ajax_html(s, t, 1, r, i, n)
		},
		keywordHistory: function(e, t, n, r, i) {
			var s = "traf_keyword_history";
			this.get_ajax_html(s, t, 2, r, i, n)
		},
		domainHistory: function(e, t, n, r, i) {
			var s = "traf_domain_history";
			this.get_ajax_html(s, t, 3, r, i, n)
		},
		pageHistory: function(e, t, n, r, i) {
			var s = "traf_page_history";
			this.get_ajax_html(s, t, 4, r, i, n)
		},
		domain: function(e, t, n, r, i) {
			var s = "cont_domain";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		page: function(e, t, n, r, i) {
			var s = "cont_page";
			this.get_ajax_html(s, t, 1, r, i, n)
		},
		cont_updown: function(e, t, n, i, s, o, u) {
			var a = "cont_updown",
				f = l(o),
				c = l(u);
			r("#time_cst").val(f), r("#time_cet").val(c), this.get_ajax_html(a, t, 2, i, s, n)
		},
		contDomainHistory: function(e, t, n, r, i) {
			var s = "cont_domain_history";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		contPageHistory: function(e, t, n, r, i) {
			var s = "cont_page_history";
			this.get_ajax_html(s, t, 1, r, i, n)
		},
		pageByUrl: function(e, t, n, i, s, o) {
			var u = "cont_page";
			this.get_ajax_html(u, t, 1, i, s, n, function() {
				r("#utiladvancedOptions").find("input.util_search_input1").val(o)
			})
		},
		clickhot: function(e, t, n, r, i) {
			var s = "cont_clickhot";
			this.get_ajax_html(s, t, 3, r, i, n)
		},
		userview: function(e, t, n, r, i) {
			var s = "cont_userview";
			this.get_ajax_html(s, t, 4, r, i, n)
		},
		flow: function(e, t, n, r, i) {
			var s = "cont_flow";
			this.get_ajax_html(s, t, 5, r, i, n)
		},
		districtnet: function(e, t, n, r, i) {
			var s = "visitor_districtnet";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		terminal: function(e, t, n, r, i) {
			var s = "visitor_terminal";
			this.get_ajax_html(s, t, 1, r, i, n)
		},
		type: function(e, t, n, r, i) {
			var s = "visitor_type";
			this.get_ajax_html(s, t, 2, r, i, n)
		},
		frequency: function(e, t, n, r, i) {
			var s = "visitor_frequency";
			this.get_ajax_html(s, t, 3, r, i, n)
		},
		engagement: function(e, t, n, r, i) {
			var s = "visitor_engagement";
			this.get_ajax_html(s, t, 4, r, i, n)
		},
		districtnetHistory: function(e, t, n, r, i) {
			var s = "visitor_districtnet_history";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		terminalHistory: function(e, t, n, r, i) {
			var s = "visitor_terminal_history";
			this.get_ajax_html(s, t, 1, r, i, n)
		},
		typeHistory: function(e, t, n, r, i) {
			var s = "visitor_type_history";
			this.get_ajax_html(s, t, 2, r, i, n)
		},
		frequencyHistory: function(e, t, n, r, i) {
			var s = "visitor_frequency_history";
			this.get_ajax_html(s, t, 3, r, i, n)
		},
		engagementHistory: function(e, t, n, r, i) {
			var s = "visitor_engagement_history";
			this.get_ajax_html(s, t, 4, r, i, n)
		},
		setting: function(e, t, n, r, i) {
			var s = "alarm_setting";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		settingphone: function(e, t, n, r, i) {
			var s = "alarm_settingphone";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		loglist: function(e, t, n, r, i) {
			var s = "alarm_loglist";
			this.get_ajax_html(s, t, 1, r, i, n)
		},
		funnel: function(e, t, n, r, i) {
			var s = "goals_funnel";
			this.get_ajax_html(s, t, 1, r, i, n)
		},
		funnelEditor: function(e, t, n, i, s, o) {
			var u = "goals_funnel";
			r("#goalsFunnelPid").val(i), this.get_ajax_html(u, t, 1, s, o, n)
		},
		funnelPath: function(e, t, n, i, s, o, u) {
			var a = "goals_funnel";
			r("#goalsFunnelPid").val(i), r("#goalsFunnelSid").val(s), this.get_ajax_html(a, t, 1, o, u, n)
		},
		chome: function(e, t, n, r, i) {
			var s = "component_chome";
			this.get_ajax_html(s, t, 1e3, r, i, n)
		},
		safety: function(e, t, n, r, i) {
			var s = "component_safety";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		speed: function(e, t, n, r, i) {
			var s = "component_speed";
			this.get_ajax_html(s, t, 1, r, i, n)
		},
		clicktongji: function(e, t, n, r, i) {
			var s = "component_clicktongji";
			this.get_ajax_html(s, t, 2, r, i, n)
		},
		hotList: function(e, t, n, r, i) {
			var s = "hezuo_hotlist";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		adList: function(e, t, n, r, i) {
			var s = "hezuo_adlist";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		mList: function(e, t, n, r, i) {
			var s = "hezuo_mlist";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		webList: function(e, t, n, r, i) {
			var s = "hezuo_weblist";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		spList: function(e, t, n, r, i) {
			var s = "hezuo_splist";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		feedback: function(e, t, n, r, i) {
			var s = "usermanage_feedback";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		reportCom: function(e, t, n, r, i) {
			var s = "report_com";
			this.get_ajax_html(s, t, 0, r, i, n)
		},
		reportSeo: function(e, t, n, r, i) {
			var s = "report_seo";
			this.get_ajax_html(s, t, 1, r, i, n)
		},
		reportHealth: function(e, t, n, r, i) {
			var s = "report_health";
			this.get_ajax_html(s, t, 2, r, i, n)
		},
		reportCont: function(e, t, n, r, i) {
			var s = "report_cont";
			this.get_ajax_html(s, t, 3, r, i, n)
		},
		reportForecast: function(e, t, n, r, i) {
			var s = "report_forecast";
			this.get_ajax_html(s, t, 4, r, i, n)
		},
		reportCycle: function(e, t, n, r, i) {
			var s = "report_cycle";
			this.get_ajax_html(s, t, 5, r, i, n)
		},
		get_ajax_html: function(e, t, n, i, s, o, u) {
			function w() {
				cnzz.tongji.fn.ajax("main.php", {
					c: y,
					a: g,
					ajaxhtml: e,
					siteid: o
				}, function(n) {
					cnzz.tongji.cache.html[e] = n.html, E(h, p, o, t), (g !== "overview" || y !== "site") && m.html(n.html), S(h, p, o, t)
				})
			}
			function E(e, t, n, i) {
				r("#siteId").val(n), r("#time_st").val(e), r("#time_et").val(t), r("#tab_index").val(i), a(), m.trigger("domEvent.clear"), cnzz.tongji.global.toSwitchChannels = !0, r("#cnzzGobalTip").parent().hide(), cnzz.flash.chart.clear()
			}
			function S(t, n, i, s) {
				u && u(), e.indexOf("history") !== -1 && (r("#historyKey").val(c("hby")), r("#historyKeyFrom").val(c("hbyf")), r("#historyKeyParam").val(c("hbyp")), r("#historyKeyParam2").val(c("hbyp2"))), r("#advancedKey").val(c("advancedKey")), (y !== "site" || g.indexOf("overview") !== -1) && g.indexOf("clickhot") === -1 && g.indexOf("realtime") === -1 && g.indexOf("feedback") === -1 && g.indexOf("detail") === -1 && m.trigger("timeBar.change", [t, n]), g.indexOf("feedback") === -1 && m.trigger("right_title.change"), r("#site_logintype").val() != "phpwind" && v(), (g !== "overview" || y !== "site") && m.trigger(e + ".change"), cnzz.tongji.global.toSwitchChannels = !1, r("#controller").val() === "visitor" && r(window).scrollTop(0)
			}
			var o = r("#siteId").val(),
				h = l(i),
				p = l(s);
			f(h, p) && (h = r("#time_info_today").val(), p = r("#time_info_today").val());
			if (!cnzz.tongji.fn.compare_date(h, p)) {
				var d = h;
				h = p, p = d
			}
			r("#ajaxActionName").val(e.slice(e.indexOf("_") + 1));
			var m = r("#rightContainer");
			if (!e || e.indexOf("_") === -1) return;
			var g = e.split("_")[1],
				y = e.split("_")[0],
				b = cnzz.tongji.cache.html[e];
			b ? (E(h, p, o, t), m.html(b), g === "overview" && y === "site" && m.trigger("site_overview.change"), S(h, p, o, t)) : w(), this.leftClassSet(n, e)
		},
		leftClassSet: function(e, t) {
			function f(e) {
				var n = e,
					r = n.attr("info");
				if (r) {
					var i = r.split("|")[0] + "_" + r.split("|")[1];
					i === t && ("visitor_frequency" === i || "visitor_type" === i || "visitor_engagement" === i ? n.addClass("new_selected") : n.addClass("selected"))
				}
			}
			var n = r("#left_all_nav"),
				i = r("#left_common_nav_expand_content li"),
				s = r("#left_common_nav_report_content li"),
				o = r("#left_common_nav_hezuo_content li"),
				u = r("ul.main_nav_sub");
			u.find("li").removeClass("selected").removeClass("new_selected"), i.removeClass("selected"), s.removeClass("selected"), o.removeClass("selected");
			if (e === 10) r("div.nav01", n).addClass("selected");
			else {
				r("div.nav01", n).removeClass("selected"), r("div.nav01", n).removeClass("new_selected"), t.indexOf("_history") !== -1 && (t = t.slice(0, t.indexOf("_history")));
				var a = u.find("li");
				a.each(function() {
					f(r(this))
				}), i.each(function() {
					f(r(this))
				}), s.each(function() {
					f(r(this))
				}), o.each(function() {
					f(r(this))
				})
			}
		}
	});
	return h.prototype = {
		start: function() {
			s.history.fragment.length === 0 && d(), p()
		}
	}, h
});