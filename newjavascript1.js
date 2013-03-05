define("http://images.cnzz.com/static/js/util/qscFlash.js", [], function(e, t, n) {
    (function(e) {
        var t = e.document,
        n = e.cnzz = e.cnzz || {},
        r = n.flash = n.flash || {},
        i = r.gl = r.gl || {},
        s = 0,
        o = 0,
        u = i.isIE = navigator.appName === "Microsoft Internet Explorer" ? t.documentMode > 8 ? 1 : -1 : 0,
        a = "urn:schemas-microsoft-com:vml",
        f = "http://www.w3.org/2000/svg",
        l = u < 0 ? "vml" : "svg";
        if (u < 0) {
            var c = t.createElement("style"),
            h = t.getElementsByTagName("head")[0];
            c.setAttribute("type", "text/css"), c.styleSheet.cssText = "vml\\:group {behavior:url(#default#VML)} vml\\:line {behavior:url(#default#VML)} vml\\:polyline {behavior:url(#default#VML)} vml\\:rect {behavior:url(#default#VML)} vml\\:oval {behavior:url(#default#VML)} vml\\:shape {behavior:url(#default#VML)} vml\\:textbox {behavior:url(#default#VML)} vml\\:stroke {behavior:url(#default#VML)} vml\\:fill {behavior:url(#default#VML)} vml\\:shadow {behavior:url(#default#VML)} vml\\:* {behavior:url(#default#VML)}", h || (h = t.createElement("head"), t.body.appendChild(h)), h.appendChild(c), function() {
                try {
                    t && t.namespaces && !t.namespaces[l] && t.namespaces.add(l, a)
                } catch (e) {
                    window.setTimeout(arguments.callee, 0)
                }
            }()
        }
        var p = function() {
            return (new Date).getTime().toString(36) + Math.floor(Math.random() * 1e8).toString(36)
        },
        d = function(e) {
            var t = typeof alpha == "undefined" ? "rgb(" : "rgba(";
            e = e.toLowerCase();
            if (/^\#?[0-9a-f]{6}$/.test(e)) for (var n = 0, r = e.replace("#", "").match(/../g); n < 3; n++) t += parseInt(r[n], 16) + (n == 2 ? typeof alpha == "undefined" ? ")" : "," + alpha + ")" : ",");
            else t = e;
            return t
        },
        v = function(e) {
            var t = [];
            if (e) {
                e.tag && t.push("<" + e.tag + " ");
                if (e.attr) for (var n in e.attr) t.push(n + "='" + e.attr[n] + "' ");
                if (e.css) {
                    t.push("style='");
                    for (var r in e.css) t.push(r + ":" + e.css[r] + ";");
                    t.push("' ")
                }
                e.tag && t.push(">");
                if (e.include) for (var i = 0; i < e.include.length; i++) t.push(arguments.callee(e.include[i]));
                e.text && t.push(e.text), e.tag && t.push("</" + e.tag + ">");
                if (e.next) for (var i = 0; i < e.next.length; i++) t.push(arguments.callee(e.next[i]))
            }
            return t.join("")
        },
        m = function(e, t, n, r) {
            var i = null;
            if (e) switch (t) {
                case "width":
                    if (typeof n == "undefined") {
                        i = parseInt(u ? e.clientWidth : r === "rect" ? 0 : window.getComputedStyle(e, null).width, 10);
                        if (i === "auto" || !i) try {
                            var s = e.getBoundingClientRect();
                            i = parseInt(s.right - s.left, 10)
                        } catch (o) {
                            i = 0
                        }
                    } else i = parseInt(n, 10) || 0, i = i < 0 ? 0 : i, u >= 0 && e.setAttribute("width", i), e.style.width = i + "px", i = e;
                    break;
                case "height":
                    if (typeof n == "undefined") {
                        i = parseInt(u ? e.clientHeight : r === "rect" ? 0 : window.getComputedStyle(e, null).height, 10);
                        if (i === "auto" || !i) try {
                            var s = e.getBoundingClientRect();
                            i = parseInt(s.bottom - s.top, 10)
                        } catch (o) {
                            i = 0
                        }
                    } else i = parseInt(n, 10) || 0, i = i < 0 ? 0 : i, u >= 0 && e.setAttribute("height", i), e.style.height = i + "px", i = e
            }
            return i
        },
        g = {
            addHandler: function(e, t, n) {
                e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n
            },
            getEvent: function(e) {
                return e ? e : window.event
            },
            getTarget: function(e) {
                return e.target || e.srcElement
            },
            removeHandler: function(e, t, n) {
                e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent ? e.detachEvent("on" + t, n) : e["on" + t] = null
            },
            stopPropagation: function(e) {
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            }
        };
        i.Paper = i.Paper ||
        function(e) {
            var n = this;
            this.containerId = "cnzz_gl_container_" + p(), this.tmpContainerId = "cnzz_gl_tmp_container_" + p(), this.containerParentId = e && e.container ? e.container : "body", this.containerParent = this.containerParentId === "body" ? t.body : t.getElementById(this.containerParentId), this.include = null, this.container = null, this.tmpContainer = null, this.w = s = e.w || m(this.containerParent, "width"), this.h = o = e.h || m(this.containerParent, "height"), this.resizeTime = isNaN(e.resizeTime) ? 2 : parseInt(e.resizeTime, 10), this.resizeCall = e.resizeCall, this.layers = [], this.prepareSelfList = [], this.prepareLayerList = [], this.prepareTimer = [], this.eventList = [], this.domGlMap = null
        }, i.Paper.prototype.remove = function(e) {
            for (var t = 0; t < this.layers.length; t++) if (this.layers[t] === e) {
                this.layers.splice(t, 1)[0].destroy();
                break
            }
            return this
        }, i.Paper.prototype.draw = function(e) {
            return this.containerParent && e && (this.include = [], e.paper = this, e.draw(), this.layers.length === 0 ? (u < 0 ? this.containerParent.innerHTML = v({
                include: [{
                    tag: "div",
                    attr: {
                        id: this.containerId
                    },
                    css: {
                        position: "relative",
                        overflow: "hidden",
                        width: this.w + "px",
                        height: this.h + "px"
                    },
                    include: this.include
                }, {
                    tag: "div",
                    attr: {
                        id: this.tmpContainerId
                    },
                    css: {
                        display: "none"
                    }
                }]
            }) : this.containerParent.innerHTML = v({
                include: [{
                    tag: "svg",
                    attr: {
                        viewBox: "0 0 " + this.w + " " + this.h,
                        width: this.w,
                        height: this.h
                    },
                    css: {
                        position: "relative",
                        overflow: "hidden"
                    },
                    include: [{
                        tag: "g",
                        attr: {
                            id: this.containerId,
                            transform: "matrix(1,0,0,1,0.5,0.5)"
                        },
                        include: this.include
                    }]
                }, {
                    tag: "div",
                    attr: {
                        id: this.tmpContainerId
                    },
                    css: {
                        display: "none"
                    }
                }]
            }), this._startResizeChecker()) : this.tmpContainer && (u < 0 ? this.tmpContainer.innerHTML = v({
                tag: "div",
                include: this.include
            }) : this.tmpContainer.innerHTML = v({
                tag: "svg",
                include: this.include
            })), this.include = null, this._getDomObjects(e), this._actionLayerPrepare(this.layers.length), this.layers.push(e)), this
        }, i.Paper.prototype.getX = function() {
            var e = 0,
            n = this.containerParent;
            while (n != null && n != t.body) e += n.offsetLeft, n = n.offsetParent;
            return e
        }, i.Paper.prototype.getY = function() {
            var e = 0,
            n = this.containerParent;
            while (n != null && n != t.body) e += n.offsetTop, n = n.offsetParent;
            return e
        }, i.Paper.prototype.getW = function() {
            return this.w
        }, i.Paper.prototype.getH = function() {
            return this.h
        }, i.Paper.prototype.on = function(e, t) {
            var n = this;
            if (this.container) {
                var r = function(e) {
                    t(e, n.domGlMap[g.getTarget(e).id]), g.stopPropagation(e)
                };
                g.addHandler(this.container, e, r), this.eventList.push({
                    type: e,
                    handler: r
                })
            } else this.prepareSelfList.push({
                fun: arguments.callee,
                arg: arguments
            });
            return this
        }, i.Paper.prototype.off = function(e) {
            if (this.container) {
                for (var t = 0; t < this.eventList.length; t++) if (this.eventList[t] && this.eventList[t].type === e) {
                    g.removeHandler(this.container, e, this.eventList[t].handler), this.eventList[t] = null;
                    break
                }
            } else this.prepareList.push({
                fun: arguments.callee,
                arg: arguments
            });
            return this
        }, i.Paper.prototype.destroy = function() {
            i.Paper._resizeTimer[this.containerId] && window.clearInterval(i.Paper._resizeTimer[this.containerId]);
            for (var e = 0; e < this.eventList.length; e++) this.off(this.eventList[e].type);
            for (var e = 0; e < this.prepareTimer.length; e++) this.prepareTimer[e] && window.clearTimeout(this.prepareTimer[e]);
            for (var e = 0; e < this.layers.length; e++) this.layers[e].destroy();
            this.containerParent && (this.containerParent.innerHTML = ""), this.include = [], this.layers = [], this.prepareSelfList = [], this.prepareLayerList = [], this.eventList = [], this.domGlMap = null, this.container = null
        }, i.Paper.prototype._getDomObjects = function(e) {
            var t = this;
            this.domGlMap = {}, function() {
                var e = !1;
                t.container || (t.container = document.getElementById(t.containerId), t.domGlMap[t.container.id] = t, t.container ? (!t.container.contains &&
                    function() {
                        t.container.contains = function(e) {
                            if (this.compareDocumentPosition) return this === e || !! (this.compareDocumentPosition(e) & 16);
                            while (e = e.parentNode) if (e === root) return !0;
                            return !1
                        }
                    }(), t._actionSelfPrepare()) : e = !0), t.tmpContainer ? e = !0 : t.tmpContainer = document.getElementById(t.tmpContainerId), t.containerParent && t.containerParent.innerHTML && e && window.setTimeout(arguments.callee, 0)
            }();
            var n = this.layers.length,
            r = {};
            this.prepareLayerList[n] = [];
            for (var s = 0; s < e.items.length; s++) {
                r = e.items[s];
                if (r.constructor === i.Group) for (var o = 0; o < r.shapes.length; o++) {
                    r.shapes[o].gObj = document.getElementById(r.shapes[o].uuid), this.domGlMap[r.shapes[o].uuid] = r.shapes[o], r.shapes[o].gCfg = null;
                    for (var u = 0; u < r.shapes[o].prepareList.length; u++) this.prepareLayerList[n].push({
                        obj: r.shapes[o],
                        action: r.shapes[o].prepareList[u]
                    });
                    r.shapes[o].prepareList = []
                } else {
                    r.gObj = document.getElementById(r.uuid), this.domGlMap[r.uuid] = r, r.gCfg = null;
                    for (var o = 0; o < r.prepareList.length; o++) this.prepareLayerList[n].push({
                        obj: r,
                        action: r.prepareList[o]
                    });
                    r.prepareList = []
                }
            }
            if (this.layers.length > 0) {
                var a = document.createDocumentFragment(),
                f = this.tmpContainer.childNodes[0];
                f && t.container &&
                function() {
                    f.firstChild ? (a.appendChild(f.firstChild), setTimeout(arguments.callee, 0)) : t.container.appendChild(a)
                }()
            }
            return this
        }, i.Paper.prototype._actionSelfPrepare = function() {
            for (var e = 0; e < this.prepareSelfList.length; e++) this.prepareSelfList[e].fun.apply(this, this.prepareSelfList[e].arg);
            return this
        }, i.Paper.prototype._actionLayerPrepare = function() {
            var e = 0,
            t = this,
            n = 100,
            r = 0;
            return this.layers &&
            function() {
                r = t.layers.length, function() {
                    if (t.prepareLayerList[r] && e < t.prepareLayerList[r].length && t.prepareLayerList[r][e].obj) {
                        for (var i = e; i < e + n && i < t.prepareLayerList[r].length && t.prepareLayerList[r][i].obj; i++) t.prepareLayerList[r][i].action.fun.apply(t.prepareLayerList[r][i].obj, t.prepareLayerList[r][i].action.arg);
                        e += n, t.prepareTimer[r] = window.setTimeout(arguments.callee, 0)
                    } else t.prepareLayerList[r] = [], window.clearTimeout(t.prepareTimer[r])
                }()
            }(), this
        }, i.Paper.prototype._startResizeChecker = function() {
            var e = this,
            t = -1,
            n = 0,
            r = 0,
            s = 0,
            o = 0;
            return n = r = m(this.containerParent, "width"), s = o = m(this.containerParent, "height"), i.Paper._resizeTimer[this.containerId] && window.clearInterval(i.Paper._resizeTimer[this.containerId]), typeof e.resizeCall == "function" && (i.Paper._resizeTimer[this.containerId] = window.setInterval(function() {
                if (e.containerParent && e.containerParent.innerHTML) {
                    r = m(e.containerParent, "width"), o = m(e.containerParent, "height");
                    if (r !== n || o !== s) {
                        t = 0;
                        if (!r && !o) e.destroy(), e.resizeCall(e.getX(), e.getY(), 0, 0);
                        else if (Math.abs(r - n) > 10 || Math.abs(o - s) > 10) n = r, s = o
                    } else t >= 0 && (t++, t > e.resizeTime && r > 0 && o > 0 && (e.w = r, e.h = o, e.resizeCall(e.getX(), e.getY(), r, o), t = -1))
                } else e.destroy(), e.resizeCall(e.getX(), e.getY(), 0, 0)
            }, this.resizeTime / 2 * 1e3)), this
        }, i.Paper._resizeTimer = {}, i.Layer = i.layer ||
        function() {
            this.items = []
        }, i.Layer.prototype.add = function(e) {
            return this.items.push(e), this
        }, i.Layer.prototype.remove = function(e) {
            for (var t = 0; t < this.items.length; t++) if (this.items[t] === e) {
                this.items.splice(t, 1)[0].destroy();
                break
            }
            return this
        }, i.Layer.prototype.draw = function() {
            for (var e = 0; e < this.items.length; e++) this.items[e].draw(this);
            return this
        }, i.Layer.prototype.show = function() {
            for (var e = 0; e < this.items.length; e++) this.items[e].show();
            return this
        }, i.Layer.prototype.hide = function() {
            for (var e = 0; e < this.items.length; e++) this.items[e].hide();
            return this
        }, i.Layer.prototype.destroy = function() {
            for (var e = 0; e < this.items.length; e++) this.items[e].destroy();
            this.items = null
        }, i.Group = i.Group ||
        function() {
            this.shapes = [], this.animRuning = {}
        }, i.Group.prototype.add = function(e) {
            return this.shapes.push(e), this
        }, i.Group.prototype.remove = function(e) {
            for (var t = 0; t < this.shapes.length; t++) if (this.shapes[t] === e) {
                this.shapes.splice(t, 1)[0].destroy();
                break
            }
            return this
        }, i.Group.prototype.draw = function(e) {
            this.layer = e;
            for (var t = 0; t < this.shapes.length; t++) this.shapes[t].draw(e);
            return this
        }, i.Group.prototype.show = function(e) {
            for (var t = 0; t < this.shapes.length; t++) this.shapes[t].show(e);
            return this
        }, i.Group.prototype.hide = function(e) {
            for (var t = 0; t < this.shapes.length; t++) this.shapes[t].hide(e);
            return this
        }, i.Group.prototype.move = function(e) {
            return this._action("move", e), this
        }, i.Group.prototype._action = function(e, t) {
            var n = e;
            if (e === "show" || e === "hide") n = "opacity";
            var r = this,
            s, o, u;
            if (r.animRuning && !r.animRuning[n]) {
                t && (s = t.before, o = t.runing, u = t.after, delete t.before, delete t.runing, delete t.after, t.animation ? (new i.Animation(t.animation)).action({
                    before: function() {
                        r.animRuning[n] = !0, typeof s == "function" && s()
                    },
                    runing: o,
                    after: function() {
                        var t = !0,
                        i = function() {
                            t = !0;
                            for (var s = 0; s < r.shapes.length; s++) if (r.shapes[s].animRuning[e]) {
                                t = !1;
                                break
                            }
                            t ? (r.animRuning[n] = !1, typeof u == "function" && u()) : window.setTimeout(i, 10)
                        };
                        i()
                    }
                }) : (r.animRuning[n] = !0, typeof s == "function" && s()));
                for (var a = 0; a < this.shapes.length; a++) this.shapes[a][e](t);
                if (!t || !t.animation) r.animRuning[n] = !1, typeof u == "function" && u()
            }
            return this
        }, i.Group.prototype.destroy = function() {
            for (var e = 0; e < this.shapes.length; e++) this.shapes[e].destroy();
            this.shapes = null, this.animRuning = null
        }, i.Shape = i.Shape ||
        function(e, t) {
            this.type = e || "Shape", this.uuid = "cnzz_gl_" + this.type + "_" + p(), t && (this.x = t.x || 0, this.y = t.y || 0, this.w = t.w || 0, this.h = t.h || 0, this.stroke = t.stroke ? u < 0 ? d(t.stroke) : t.stroke : "black", this.strokeWidth = isNaN(t.strokeWidth) ? 1 : t.strokeWidth, this.strokeOpacity = isNaN(t.strokeOpacity) ? 1 : t.strokeOpacity, this.fillcolor = t.fillcolor ? u < 0 ? d(t.fillcolor) : t.fillcolor : "white", this.fillOpacity = isNaN(t.fillOpacity) ? 1 : t.fillOpacity, this.opacity = isNaN(t.opacity) ? 1 : this.strokeOpacity = this.fillOpacity = t.opacity, this.dashed = !! t.dashed, this.startArrow = t.startArrow || "", this.endArrow = t.endArrow || ""), this.gObj = null, this.gCfg = {}, this.eventList = [], this.coordinate = {
                x: 0,
                y: 0
            }, this.rotation = 0, this.animRuning = {}, this.attrAnim = {}, this.drawOver = !1, this.prepareList = [], this.strokeGObj = null, this.fillGObj = null, this.shadowGObj = null
        }, i.Shape.prototype.move = function(e) {
            if (this.gObj) {
                if (e) {
                    var t = this;
                    if (e.x || e.y) {
                        var n = parseInt(this.gObj.style.left || 0, 10),
                        r = parseInt(this.gObj.style.top || 0, 10);
                        e.animation ? this.animRuning.move || (new i.Animation(e.animation)).action({
                            before: function() {
                                t.animRuning.move = !0, typeof e.before == "function" && e.before()
                            },
                            runing: function(i) {
                                t.animRuning.move && (typeof e.runing == "function" && e.runing(), u < 0 ?
                                    function() {
                                        t.gObj.style.left = parseInt(n + e.x * i, 10), t.gObj.style.top = parseInt(r + e.y * i, 10)
                                    }() : function() {
                                        t.gObj.setAttributeNS(null, "transform", "translate(" + (t.coordinate.x + e.x * i) + "," + (t.coordinate.y + e.y * i) + ")")
                                    }())
                            },
                            after: function() {
                                t.animRuning.move = !1, t.coordinate.x += e.x, t.coordinate.y += e.y, typeof e.after == "function" && e.after()
                            }
                        }) : (t.animRuning.move = !1, typeof e.before == "function" && e.before(), u < 0 ?
                            function() {
                                t.gObj.style.left = parseInt(t.gObj.style.left || 0, 10) + (e.x || 0), t.gObj.style.top = parseInt(t.gObj.style.top || 0, 10) + (e.y || 0)
                            }() : function() {
                                t.coordinate.x += e.x || 0, t.coordinate.y += e.y || 0, t.gObj.setAttributeNS(null, "transform", "translate(" + (t.coordinate.x || 0) + "," + (t.coordinate.y || 0) + ")")
                            }(), typeof e.after == "function" && e.after())
                    } else t.animRuning.move = !1
                }
            } else this.prepareList.push({
                fun: arguments.callee,
                arg: arguments
            });
            return this
        }, i.Shape.prototype.on = function(e, t) {
            var n = this;
            if (this.gObj) {
                var r = function(e) {
                    t(e, n), g.stopPropagation(e)
                };
                g.addHandler(this.gObj, e, r), this.eventList.push({
                    type: e,
                    handler: r
                })
            } else this.prepareList.push({
                fun: arguments.callee,
                arg: arguments
            });
            return this
        }, i.Shape.prototype.off = function(e) {
            if (this.gObj) {
                for (var t = 0; t < this.eventList.length; t++) if (this.eventList[t] && this.eventList[t].type === e) {
                    g.removeHandler(this.gObj, e, this.eventList[t].handler), this.eventList[t] = null;
                    break
                }
            } else this.prepareList.push({
                fun: arguments.callee,
                arg: arguments
            });
            return this
        }, i.Shape.prototype.draw = function(e) {
            this.layer = e;
            if (!this.gObj) {
                var t = this,
                n = null;
                this.gCfg.tag && (this.gCfg.attr || (this.gCfg.attr = {}), this.gCfg.attr.id = this.uuid, t.gCfg.include || (t.gCfg.include = []), t.gCfg.next || (t.gCfg.next = []), this.type != "Text" && (u < 0 ?
                    function() {
                        t.gCfg.attr.strokecolor = t.stroke, t.gCfg.attr.strokeweight = t.strokeWidth, t.gCfg.attr.fillcolor = t.fillcolor, t.fillOpacity !== 1 && t.gCfg.include.push({
                            tag: l + ":fill",
                            attr: {
                                id: t.uuid + "_fill",
                                opacity: t.fillOpacity
                            }
                        });
                        if (t.strokeOpacity !== 1 || t.startArrow || t.endArrow) {
                            var e = {
                                tag: l + ":stroke",
                                attr: {
                                    id: t.uuid + "_stroke"
                                }
                            };
                            t.strokeOpacity !== 1 && (e.attr.opacity = t.strokeOpacity), t.startArrow && (e.attr.startArrow = t.startArrow), t.endArrow && (e.attr.endArrow = t.endArrow), t.gCfg.include.push(e)
                        }(function() {
                            if (t.dashed) {
                                var e = !1,
                                n = {
                                    tag: l + ":stroke",
                                    attr: {
                                        id: t.uuid + "_stroke",
                                        dashstyle: "shortdot"
                                    }
                                };
                                for (var r = 0; r < t.gCfg.include.length; r++) if (t.gCfg.include[r].tag === l + ":stroke") {
                                    e = !0, t.gCfg.include[r].attr.dashstyle = "shortdot";
                                    break
                                }
                                e || t.gCfg.include.push(n)
                            }
                        })()
                    }() : function() {
                        t.gCfg.css || (t.gCfg.css = {}), t.gCfg.css.stroke = t.stroke, t.gCfg.css["stroke-width"] = t.strokeWidth, t.gCfg.css.fill = t.fillcolor, t.opacity !== 1 ? t.gCfg.css.opacity = t.opacity : (t.strokeOpacity !== 1 && (t.gCfg.css["stroke-opacity"] = t.strokeOpacity), t.fillOpacity !== 1 && (t.gCfg.css["fill-opacity"] = t.fillOpacity), t.dashed && (t.gCfg.css["stroke-dasharray"] = 5))
                    }()), this.layer && this.layer.paper && (this.layer.paper.include.push(this.gCfg), this.drawOver = !0, this.gCfg = null))
            }
            return this
        }, i.Shape.prototype.attr = function(e) {
            if (this.gObj) {
                if (e) {
                    this.attrAnim[e.name] && this.attrAnim[e.name].stop();
                    var t = this,
                    n = parseInt(e.value, 10) || 0,
                    r, s, o;
                    switch (e.name) {
                        case "opacity":
                            u < 0 && (t.strokeGObj || (t.strokeGObj = document.getElementById(t.uuid + "_stroke"), t.strokeGObj || (t.strokeGObj = document.createElement("<" + l + ":stroke id='" + t.uuid + "_stroke'" + " opacity='" + t.opacity + "></" + l + ":stroke>"), t.gObj.appendChild(t.strokeGObj))), t.fillGObj || (t.fillGObj = document.getElementById(t.uuid + "_fill"), t.fillGObj || (t.fillGObj = document.createElement("<" + l + ":fill id='" + t.uuid + "_fill'" + " opacity='" + t.opacity + "></" + l + ":fill>"), t.gObj.appendChild(t.fillGObj))), t.shadowGObj || (t.shadowGObj = document.getElementById(t.uuid + "_shadow"))), r = function() {
                                t.gObj && (t.gObj.style.visibility = "visible"), typeof e.before == "function" && e.before()
                            }, s = function(r) {
                                var i = t.opacity + (n - t.opacity) * r;
                                u < 0 ?
                                function() {
                                    t.strokeGObj && (t.strokeGObj.opacity = i), t.fillGObj && (t.fillGObj.opacity = i), t.shadowGObj && (t.shadowGObj.opacity = i)
                                }() : function() {
                                    t.gObj && (t.gObj.style.opacity = i)
                                }(), t.opacity = i, typeof e.runing == "function" && e.runing()
                            }, o = function() {
                                t.opacity === 0 && t.gObj && (t.gObj.style.visibility = "hidden"), typeof e.after == "function" && e.after()
                            }
                    }
                    e.animation ? (this.attrAnim[e.name] = new i.Animation(e.animation), this.attrAnim[e.name].action({
                        before: r,
                        runing: s,
                        after: o
                    })) : window.setTimeout(function() {
                        t.gObj && (r(), s(1), o())
                    }, 0)
                }
            } else this.prepareList.push({
                fun: arguments.callee,
                arg: arguments
            });
            return this
        }, i.Shape.prototype.show = function(e) {
            return this.gObj ? (e ? (e.name = "opacity", e.value = 1) : e = {
                name: "opacity",
                value: 1
            }, this.attr(e)) : this.prepareList.push({
                fun: arguments.callee,
                arg: arguments
            }), this
        }, i.Shape.prototype.hide = function(e) {
            return this.gObj ? (e ? (e.name = "opacity", e.value = 0) : e = {
                name: "opacity",
                value: 0
            }, this.attr(e)) : this.prepareList.push({
                fun: arguments.callee,
                arg: arguments
            }), this
        }, i.Shape.prototype.setW = function(e) {
            return this.w = parseInt(e, 10) || 0, m(this.gObj, "width", this.w), this
        }, i.Shape.prototype.getW = function() {
            return m(this.gObj, "width", undefined, this.type === "Text" ? "rect" : undefined) || 0
        }, i.Shape.prototype.setH = function(e) {
            return this.h = parseInt(e, 10) || 0, m(this.gObj, "height", this.h), this
        }, i.Shape.prototype.getH = function() {
            return m(this.gObj, "height", undefined, this.type === "Text" ? "rect" : undefined) || 0
        }, i.Shape.prototype.destroy = function() {
            if (this.gObj) {
                var e = null;
                for (var t = 0; t < this.eventList.length; t++) this.off(this.eventList[t].type);
                this.layer && this.layer.paper && this.layer.paper.container && this.layer.paper.container.contains(this.gObj) && this.layer.paper.container.removeChild(this.gObj)
            }
            for (var n in this.attrAnim) this.attrAnim.hasOwnProperty(n) && this.attrAnim[n].stop();
            for (var r in this) this.hasOwnProperty(r) && (this[r] = null)
        }, i.Line = i.Line ||
        function(e) {
            i.Shape.call(this, "Line", e), this.points = e.points || [], this._draw()
        }, i.Line.prototype = new i.Shape, i.Line.prototype.constructor = i.Line, i.Line.prototype._draw = function() {
            var e = this;
            u < 0 ?
            function() {
                var t = function() {
                    this.points.length > 5 ? this.gCfg = {
                        tag: l + ":polyline",
                        attr: {
                            points: this.points,
                            filled: !1
                        },
                        css: {
                            position: "absolute",
                            left: "0px",
                            top: "0px"
                        }
                    } : this.points.length > 3 ? this.gCfg = {
                        tag: l + ":line",
                        attr: {
                            from: this.points[0] + "," + this.points[1],
                            to: this.points[2] + "," + this.points[3]
                        },
                        css: {
                            position: "absolute",
                            left: "0px",
                            top: "0px"
                        }
                    } : this.gCfg = {
                        tag: l + ":line",
                        attr: {
                            from: "0,0",
                            to: "0,0"
                        }
                    }
                };
                return this._draw = t, t.call(e)
            }() : function() {
                var t = function() {
                    this.points.length > 5 ? (this.gCfg = {
                        tag: "polyline",
                        attr: {
                            points: this.points
                        }
                    }, e.fillcolor = "none") : this.points.length > 3 ? this.gCfg = {
                        tag: "line",
                        attr: {
                            x1: this.points[0] || 0,
                            y1: this.points[1] || 0,
                            x2: this.points[2] || 0,
                            y2: this.points[3] || 0
                        }
                    } : this.gCfg = {
                        tag: "line",
                        attr: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 0
                        }
                    }
                };
                return this._draw = t, t.call(e)
            }()
        }, i.Rect = i.Rect ||
        function(e) {
            i.Shape.call(this, "Rect", e), this._draw()
        }, i.Rect.prototype = new i.Shape, i.Rect.prototype.constructor = i.Rect, i.Rect.prototype._draw = function() {
            var e = this;
            u < 0 ?
            function() {
                var t = function() {
                    this.gCfg = {
                        tag: l + ":rect",
                        css: {
                            position: "absolute",
                            left: this.x + "px",
                            top: this.y + "px",
                            width: this.w + "px",
                            height: this.h + "px"
                        }
                    }
                };
                return this._draw = t, t.call(e)
            }() : function() {
                var t = function() {
                    this.gCfg = {
                        tag: "rect",
                        attr: {
                            x: this.x,
                            y: this.y,
                            width: this.w,
                            height: this.h
                        }
                    }
                };
                return this._draw = t, t.call(e)
            }()
        }, i.Oval = i.Oval ||
        function(e) {
            i.Shape.call(this, "Oval", e), this.r = e.r || 0, this._draw()
        }, i.Oval.prototype = new i.Shape, i.Oval.prototype.constructor = i.Oval, i.Oval.prototype._draw = function() {
            var e = this;
            u < 0 ?
            function() {
                var t = function() {
                    var e = 0,
                    t = 0;
                    this.r ? (e = this.r, t = this.r) : this.w && this.h && (e = this.w, t = this.h), this.gCfg = {
                        tag: l + ":oval",
                        css: {
                            position: "absolute",
                            left: this.x + "px",
                            top: this.y + "px",
                            width: e * 2 + "px",
                            height: t * 2 + "px"
                        }
                    }
                };
                return this._draw = t, t.call(e)
            }() : function() {
                var t = function() {
                    this.r && (this.w = this.r, this.h = this.r), this.w === this.h ? this.gCfg = {
                        tag: "circle",
                        attr: {
                            cx: this.x + this.w,
                            cy: this.y + this.h,
                            r: this.w
                        }
                    } : this.gCfg = {
                        tag: "ellipse",
                        attr: {
                            cx: this.x + this.w,
                            cy: this.y + this.h,
                            rx: this.w,
                            ry: this.h
                        }
                    }
                };
                return this._draw = t, t.call(e)
            }()
        }, i.Polygon = i.Polygon ||
        function(e) {
            i.Shape.call(this, "Polygon", e), this.points = e.points || [], this._draw()
        }, i.Polygon.prototype = new i.Shape, i.Polygon.prototype.constructor = i.Polygon, i.Polygon.prototype._draw = function() {
            var e = this;
            u < 0 ?
            function() {
                var t = function() {
                    if (this.points.length > 3) {
                        var e = "m ";
                        for (var t = 0; t < this.points.length; t++) e += parseInt(this.points[t] || 0, 10) + (t % 2 === 0 ? "," : t == 1 ? " l " : " ");
                        e += "e", this.gCfg = {
                            tag: l + ":shape",
                            attr: {
                                coordsize: s + "," + o,
                                path: e
                            },
                            css: {
                                position: "absolute",
                                left: "0px",
                                top: "0px",
                                width: s + "px",
                                height: o + "px"
                            }
                        }
                    }
                };
                return this._draw = t, t.call(e)
            }() : function() {
                var t = function() {
                    if (this.points.length > 3) {
                        var e = "";
                        for (var t = 0; t < this.points.length; t++) e += this.points[t] + (t % 2 === 0 ? "," : " ");
                        this.gCfg = {
                            tag: "polygon",
                            attr: {
                                points: e
                            }
                        }
                    }
                };
                return this._draw = t, t.call(e)
            }()
        }, i.Path = i.Path ||
        function(e) {
            i.Shape.call(this, "Path", e), this.path = e.path || [], this.vmlPath = e.vmlPath || [], this._draw()
        }, i.Path.prototype = new i.Shape, i.Path.prototype.constructor = i.Path, i.Path.prototype._draw = function() {
            var e = this;
            u < 0 ?
            function() {
                var t = function() {
                    this.vmlPath && (this.gCfg = {
                        tag: l + ":shape",
                        attr: {
                            coordsize: s + "," + o,
                            path: this.vmlPath
                        },
                        css: {
                            position: "absolute",
                            left: "0px",
                            top: "0px",
                            width: s + "px",
                            height: o + "px"
                        }
                    })
                };
                return this._draw = t, t.call(e)
            }() : function() {
                var t = function() {
                    this.path && (this.gCfg = {
                        tag: "path",
                        attr: {
                            d: this.path
                        }
                    })
                };
                return this._draw = t, t.call(e)
            }()
        }, i.Text = i.Text ||
        function(e) {
            i.Shape.call(this, "Text", e), this.text = e.text || "", this.color = e.color ? u < 0 ? d(e.color) : e.color : "black", this.font = e.font || 18, this._draw()
        }, i.Text.prototype = new i.Shape, i.Text.prototype.constructor = i.Text, i.Text.prototype._draw = function() {
            var e = this;
            u < 0 ?
            function() {
                var t = function() {
                    this.gCfg = {
                        tag: "span",
                        css: {
                            position: "absolute",
                            left: this.x + "px",
                            top: this.y + "px",
                            color: this.color,
                            "font-size": this.font
                        },
                        include: [{
                            text: this.text
                        }]
                    }
                };
                return this._draw = t, t.call(e)
            }() : function() {
                var t = function() {
                    this.gCfg = {
                        tag: "text",
                        attr: {
                            x: this.x,
                            y: this.y + this.font,
                            "font-size": this.font,
                            fill: this.color
                        },
                        include: [{
                            text: this.text
                        }]
                    }
                };
                return this._draw = t, t.call(e)
            }()
        }, i.Text.prototype.setText = function(e) {
            this.text = e;
            if (this.gObj) if (u < 0) this.gObj.innerHTML = this.text;
                else {
                    if (this.gObj.childNodes && this.gObj.childNodes.length > 0) if (this.gObj.childNodes.length === 1) this.gObj.removeChild(this.gObj.childNodes[0]);
                        else if (this.gObj.childNodes.length > 1) for (var n = 0, r = this.gObj.childNodes.length; n < r; n++) this.gObj.removeChild(this.gObj.childNodes[n]);
                    this.gObj.appendChild(t.createTextNode(this.text))
                } else this.prepareList.push({
                fun: arguments.callee,
                arg: arguments
            })
        }, i.Animation = i.Animation ||
        function(e) {
            this.duration = e.duration || 0, this.type = e.type || "linear", this.timer = null, this.compute = this.computeFun[this.type] || this.computeFun.linear
        }, i.Animation.prototype.action = function(e) {
            var t = this;
            this.stop();
            var n = 0;
            typeof e.before == "function" && e.before();
            var r = function() {
                n < t.duration * 100 ? (n++, typeof e.runing == "function" && e.runing(t.compute(n, 0, 1, t.duration * 100)), t.timer = window.setTimeout(function() {
                    r()
                }, 10)) : (n > 0 ? (n = 0, t.stop()) : typeof e.runing == "function" && e.runing(1), typeof e.after == "function" && e.after())
            };
            r()
        }, i.Animation.prototype.stop = function() {
            this.timer && window.clearTimeout(this.timer)
        }, i.Animation.prototype.computeFun = {
            linear: function(e, t, n, r) {
                return n * e / r + t
            },
            "quad-ease-in": function(e, t, n, r) {
                return n * (e /= r) * e + t
            },
            "quad-ease-out": function(e, t, n, r) {
                return -n * (e /= r) * (e - 2) + t
            },
            "quad-ease-in-out": function(e, t, n, r) {
                return (e /= r / 2) < 1 ? n / 2 * e * e + t : -n / 2 * (--e * (e - 2) - 1) + t
            },
            "cubic-ease-in": function(e, t, n, r) {
                return n * (e /= r) * e * e + t
            },
            "cubic-ease-out": function(e, t, n, r) {
                return n * ((e = e / r - 1) * e * e + 1) + t
            },
            "cubic-ease-in-out": function(e, t, n, r) {
                return (e /= r / 2) < 1 ? n / 2 * e * e * e + t : n / 2 * ((e -= 2) * e * e + 2) + t
            },
            "quart-ease-in": function(e, t, n, r) {
                return n * (e /= r) * e * e * e + t
            },
            "quart-ease-out": function(e, t, n, r) {
                return -n * ((e = e / r - 1) * e * e * e - 1) + t
            },
            "quart-ease-in-out": function(e, t, n, r) {
                return (e /= r / 2) < 1 ? n / 2 * e * e * e * e + t : -n / 2 * ((e -= 2) * e * e * e - 2) + t
            },
            "quint-ease-in": function(e, t, n, r) {
                return n * (e /= r) * e * e * e * e + t
            },
            "quint-ease-out": function(e, t, n, r) {
                return n * ((e = e / r - 1) * e * e * e * e + 1) + t
            },
            "quint-ease-in-out": function(e, t, n, r) {
                return (e /= r / 2) < 1 ? n / 2 * e * e * e * e * e + t : n / 2 * ((e -= 2) * e * e * e * e + 2) + t
            },
            "sine-ease-in": function(e, t, n, r) {
                return -n * Math.cos(e / r * (Math.PI / 2)) + n + t
            },
            "sine-ease-out": function(e, t, n, r) {
                return n * Math.sin(e / r * (Math.PI / 2)) + t
            },
            "sine-ease-in-out": function(e, t, n, r) {
                return -n / 2 * (Math.cos(Math.PI * e / r) - 1) + t
            },
            "expo-ease-in": function(e, t, n, r) {
                return e == 0 ? t : n * Math.pow(2, 10 * (e / r - 1)) + t
            },
            "expo-ease-out": function(e, t, n, r) {
                return e == r ? t + n : n * (-Math.pow(2, -10 * e / r) + 1) + t
            },
            "expo-ease-in-out": function(e, t, n, r) {
                return e == 0 ? t : e == r ? t + n : (e /= r / 2) < 1 ? n / 2 * Math.pow(2, 10 * (e - 1)) + t : n / 2 * (-Math.pow(2, -10 * --e) + 2) + t
            },
            "circ-ease-in": function(e, t, n, r) {
                return -n * (Math.sqrt(1 - (e /= r) * e) - 1) + t
            },
            "circ-ease-out": function(e, t, n, r) {
                return n * Math.sqrt(1 - (e = e / r - 1) * e) + t
            },
            "circ-ease-in-out": function(e, t, n, r) {
                return (e /= r / 2) < 1 ? -n / 2 * (Math.sqrt(1 - e * e) - 1) + t : n / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + t
            },
            "elastic-ease-in": function(e, t, n, r, i, s) {
                if (e == 0) return t;
                if ((e /= r) == 1) return t + n;
                s || (s = r * .3);
                if (!i || i < Math.abs(n)) {
                    i = n;
                    var o = s / 4
                } else var o = s / (2 * Math.PI) * Math.asin(n / i);
                return -(i * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * r - o) * 2 * Math.PI / s)) + t
            },
            "elastic-ease-out": function(e, t, n, r, i, s) {
                if (e == 0) return t;
                if ((e /= r) == 1) return t + n;
                s || (s = r * .3);
                if (!i || i < Math.abs(n)) {
                    i = n;
                    var o = s / 4
                } else var o = s / (2 * Math.PI) * Math.asin(n / i);
                return i * Math.pow(2, -10 * e) * Math.sin((e * r - o) * 2 * Math.PI / s) + n + t
            },
            "elastic-ease-in-out": function(e, t, n, r, i, s) {
                if (e == 0) return t;
                if ((e /= r / 2) == 2) return t + n;
                s || (s = r * .3 * 1.5);
                if (!i || i < Math.abs(n)) {
                    i = n;
                    var o = s / 4
                } else var o = s / (2 * Math.PI) * Math.asin(n / i);
                return e < 1 ? -0.5 * i * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * r - o) * 2 * Math.PI / s) + t : i * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * r - o) * 2 * Math.PI / s) * .5 + n + t
            },
            "back-ease-in": function(e, t, n, r, i) {
                return i == undefined && (i = 1.70158), n * (e /= r) * e * ((i + 1) * e - i) + t
            },
            "back-ease-out": function(e, t, n, r, i) {
                return i == undefined && (i = 1.70158), n * ((e = e / r - 1) * e * ((i + 1) * e + i) + 1) + t
            },
            "back-ease-in-out": function(e, t, n, r, i) {
                return i == undefined && (i = 1.70158), (e /= r / 2) < 1 ? n / 2 * e * e * (((i *= 1.525) + 1) * e - i) + t : n / 2 * ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) + t
            },
            "bounce-ease-in": function(e, t, n, r) {
                return n - i.Animation.prototype.computeFun.bounce.easeOut(r - e, 0, n, r) + t
            },
            "bounce-ease-out": function(e, t, n, r) {
                return (e /= r) < 1 / 2.75 ? n * 7.5625 * e * e + t : e < 2 / 2.75 ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t : e < 2.5 / 2.75 ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t : n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
            },
            "bounce-ease-in-out": function(e, t, n, r) {
                return e < r / 2 ? i.Animation.prototype.computeFun.bounce.easeIn(e * 2, 0, n, r) * .5 + t : i.Animation.prototype.computeFun.bounce.easeOut(e * 2 - r, 0, n, r) * .5 + n * .5 + t
            }
        }
    })(window), function(e) {
        var t = e.cnzz = e.cnzz || {},
        n = t.flash = t.flash || {},
        r = n.chart = n.chart || {
            _list: [],
            getList: function() {
                return this._list
            },
            clear: function() {
                for (var e = 0; e < this._list.length; e++) this._list[e].chart.destroy();
                this._list = [], this.error = []
            },
            remove: function(e) {
                for (var t = 0; t < this._list.length; t++) if (e === t) {
                    this._list[t].chart.destroy();
                    break
                }
            },
            error: []
        };
        r.Chart = r.Chart ||
        function(e) {
            e && r._list.push({
                type: e,
                chart: this
            }), this.type = e || "Chart", this.floatLabel = function(e) {
                var n = {},
                r, i = 0,
                s, o, u, a, f, l, c, h, p, d, v = 0,
                m = 0,
                g = !1,
                y = 0;
                return n.show = function() {
                    y && window.clearTimeout(y), c.show()
                }, n.hide = function() {
                    y && window.clearTimeout(y), y = window.setTimeout(function() {
                        c.hide()
                    }, 100)
                }, n.setText = function(e) {
                    m = 0, v = 0;
                    var t = [],
                    n = [].concat(e),
                    r = 0;
                    for (var i = 0; i < n.length; i++) n[i] && t.push(n[i]);
                    for (var i = 0; i < t.length && i < a.length; i++) m++, a[i].setText(t[i]), r = a[i].getW(), r > v && (v = r);
                    f.setW(v + o * 3 / 2), f.setH((m + 1) * o), l = v + o * 3 / 2
                }, n.move = function(e) {
                    var t = 0,
                    n = 0,
                    s = 0,
                    c = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                    g = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                    t = parseInt(e.clientX - r.getX() + c - h - v / 2, 10), t = t + h < 0 ? o - h : t + h + l > i ? i - l - o - h : t, n = parseInt(t + h - p - o / 2, 10), s = parseInt(e.clientY - r.getY() + g - d - (m + 2) * o, 10), s = (s + d < 2 * o ? s + (m + 4) * o : s) + u * o;
                    if (m) {
                        h += t, p += n, d += s;
                        for (var y = 0; y < m; y++) a[y].move({
                            x: t,
                            y: s
                        });
                        f.move({
                            x: n,
                            y: s
                        })
                    }
                }, n.draw = function(s) {
                    r = s.paper || {}, u = isNaN(s.textRows) ? 1 : parseInt(s.textRows, 10), o = isNaN(s.fontSize) ? 12 : parseInt(s.fontSize, 10), n = {}, a = [], f = {}, c = new t.flash.gl.Group, h = 0, p = 0, d = 0, f = new t.flash.gl.Rect({
                        y: -u * o,
                        stroke: "#555555",
                        strokeWidth: .5,
                        opacity: .9
                    }), f.on("mouseover", function() {
                        y && window.clearTimeout(y)
                    }), f.on("mouseout", function() {
                        y && window.clearTimeout(y), y = window.setTimeout(function() {
                            c.hide()
                        }, 100)
                    }), c.add(f);
                    for (var l = 0; l < u; l++) a[l] = new t.flash.gl.Text({
                        y: l * o + o / 3 - u * o,
                        font: o,
                        color: "#555555"
                    }), function(e) {
                        a[e].on("mouseover", function() {
                            y && window.clearTimeout(y)
                        }), a[e].on("mouseout", function() {
                            y && window.clearTimeout(y), y = window.setTimeout(function() {
                                c.hide()
                            }, 100)
                        })
                    }(l), c.add(a[l]);
                    return c.hide(), i = r.getW(), r.on("mouseover", function(t, n) {
                        n.tip && (e.floatLabel.setText(n.tip), e.floatLabel.show())
                    }), r.on("mousemove", function(t, n) {
                        n.tip && e.floatLabel.move(t)
                    }), r.on("mouseout", function(t, n) {
                        n.tip && e.floatLabel.hide()
                    }), c
                }, n
            }(this)
        }, r.Chart.prototype.drawErrorMsg = function(e, n, r, i) {
            if (e && n) {
                var s = new t.flash.gl.Layer,
                o = new t.flash.gl.Text({
                    text: n,
                    x: isNaN(r) ? e.getW() / 2 : r,
                    y: isNaN(r) ? e.getH() / 2 : r,
                    font: 10
                });
                s.add(o), e.draw(s), !r && !i && o.move({
                    x: -o.getW() / 2,
                    y: -o.getH() / 2
                })
            }
            return this
        }, r.Chart.prototype._roundUpNum = function(e) {
            var t = Math.ceil(e) + "",
            n = 0,
            r = parseInt(t.substr(0, 1), 10),
            i = t.substring(1, t.length),
            s = "0." + i;
            return s > .5 ? (r++, s = 0) : s <= .5 && s > 0 ? s = 5 : s == 0 && (s = 0), n = r + "." + s, n *= Math.pow(10, i.length), n
        }, r.Chart.prototype._changeNumToLabel = function(e) {
            var t = e + "",
            n = e,
            r = "";
            return e > 1e8 ? (n = e / 1e8, r = "亿") : e > 1e4 && (n = e / 1e4, r = "万"), t = n + "", t.indexOf(".") !== -1 ? t = n.toFixed(2) : r && (t += ".00"), t + r
        }, r.Chart.prototype.clearPaper = function() {
            this.paper && this.paper.destroy()
        }, r.Chart.prototype.destroy = function() {
            this.paper && this.paper.destroy();
            for (var e in this) this.hasOwnProperty(e) && (this[e] = null)
        }
    }(window), function(e) {
        var t = e.cnzz = e.cnzz || {},
        n = t.flash = t.flash || {},
        r = n.chart = n.chart || {};
        r.PieChart = r.PieChart ||
        function(e, n) {
            r.Chart.call(this, "PieChart");
            var i = this;
            this.container = e.container, this.paper = new t.flash.gl.Paper({
                container: this.container,
                w: e.width,
                h: e.height,
                resizeCall: function(e, t, n, r) {
                    n || r ? (i.clearPaper(), i.cx = parseInt(n / 2, 10), i.cy = parseInt(r / 2, 10), i._draw()) : i.destroy()
                }
            }), this.pw = this.paper.getW(), this.ph = this.paper.getH(), this.cx = parseInt(e.left || this.pw / 2, 10), this.cy = parseInt(e.top || this.ph / 2, 10), this.msg = e.msg || "";
            try {
                typeof n == "string" && (n = this._xmlToJson(n))
            } catch (s) {
                r.error.push(s.toString()), this.drawErrorMsg(this.paper, this.msg);
                return
            }
            this.r = n.pieRadius || 0, this.PIE_ANIM_DURATION = n.animation || .5, this.PIE_BORDER_WIDTH = e.borderWidth || 1, this.PIE_BORDER_COLOR = e.borderColor || "#ffffff", this.PIE_LINE_COLOR = e.lineColor || "#4c4c4c", this.PIE_MOVE_LENGTH = e.moveLength || 10, this.PIE_LINE_LENGTH = e.lineLength || 10, this.PIE_TEXT_FONT = n.fontSize || 12, this.PIE_LABLE_LENGTH = e.lableLength || 30, this.PIE_LABLE_FLOAT_FLAG = e.displayFloatLable !== !1, this.PIE_LABLE_SIDE_FLAG = e.displaySideLable !== !1, this.data = n.set || [], this.pieArray = [], this._draw()
        }, r.PieChart.prototype = new r.Chart, r.PieChart.prototype.constructor = r.PieChart, r.PieChart.prototype._xmlToJson = function(e) {
            var t = {
                set: []
            },
            n = document.all ?
            function() {
                var t = new ActiveXObject("Microsoft.XMLDOM");
                return t.loadXML(e), t
            }() : (new DOMParser).parseFromString(e, "text/xml"), r = n.getElementsByTagName("chart")[0];
            if (r) {
                t.fontSize = parseInt(r.getAttribute("baseFontSize"), 10), t.animation = parseInt(r.getAttribute("animation"), 10), t.pieRadius = parseInt(r.getAttribute("pieRadius"), 10);
                var i = n.getElementsByTagName("set");
                for (var s = 0, o = i.length; s < o; s++) {
                    var u = {};
                    u.value = parseInt(i[s].getAttribute("value") || 0, 10), u.value && (u.lable = i[s].getAttribute("label"), u.color = i[s].getAttribute("color"), u.color = u.color ? "#" + u.color : "", u.value > 0 && t.set.push(u))
                }
            }
            return t
        }, r.PieChart.prototype._getPieArgs = function() {
            var e = this,
            t = [],
            n = 0,
            r = [],
            i = 0,
            s = -1;
            for (var o = 0; o < this.data.length; o++) n += this.data[o].value || 0;
            if (n) {
                for (var o = 0; o < this.data.length; o++) {
                    var u = this.data[o].value / n * Math.PI * 2;
                    r[o] = u < .01 ? .01 : u > 6.27 ? 6.27 : u
                }
                for (var o = 0; o < this.data.length; o++) {
                    var a = {},
                    f = i + r[o],
                    l = Math.sin((f - i) / 2 + i),
                    c = Math.cos((f - i) / 2 + i),
                    h = this.data[o].value / n * 100;
                    a.percent = (h + "").indexOf(".") === -1 ? h : h.toFixed(2), a.arcIsBig = f - i > Math.PI ? 1 : 0, a.arcStartX = this.cx - this.r * Math.sin(i), a.arcStartY = this.cy + this.r * Math.cos(i), a.arcEndX = this.cx - this.r * Math.sin(f), a.arcEndY = this.cy + this.r * Math.cos(f), a.moveToX = -parseInt(l * this.PIE_MOVE_LENGTH, 10), a.moveToY = parseInt(c * this.PIE_MOVE_LENGTH, 10), a.lineStartX = this.cx - parseInt(l * this.r, 10), a.lineStartY = this.cy + parseInt(c * this.r, 10), a.lineEndX = this.cx - parseInt(l * (this.r + this.PIE_LINE_LENGTH), 10), a.lineEndY = this.cy + parseInt(c * (this.r + this.PIE_LINE_LENGTH), 10), a.lableX = a.lineEndX >= this.cx ? a.lineEndX + this.PIE_LABLE_LENGTH : a.lineEndX - this.PIE_LABLE_LENGTH, a.lableY = r[o] < .5 ?
                    function() {
                        return s += 1, s > 0 && (a.lableX -= e.PIE_MOVE_LENGTH * s), a.lineEndX >= e.cx ? a.lineEndY + s * e.PIE_TEXT_FONT : a.lineEndY - s * e.PIE_TEXT_FONT
                    }() : function() {
                        return s = -1, a.lineEndY
                    }(), i = f, t.push(a)
                }
            }
            return t
        }, r.PieChart.prototype._draw = function() {
            var e = this,
            n = [],
            r = this._getPieArgs(),
            i = new t.flash.gl.Layer;
            if (r.length) {
                var s = this.pieArray = [],
                o = [],
                u = [];
                for (var a = 0; a < r.length; a++) n[a] = new t.flash.gl.Group, vmlPath = "M " + this.cx + "," + this.cy + " L " + parseInt(r[a].arcStartX, 10) + "," + parseInt(r[a].arcStartY, 10) + " AR " + (this.cx - this.r) + "," + (this.cy - this.r) + "," + (this.cx + this.r) + "," + (this.cy + this.r) + "," + parseInt(r[a].arcEndX, 10) + "," + parseInt(r[a].arcEndY, 10) + "," + parseInt(r[a].arcStartX, 10) + "," + parseInt(r[a].arcStartY, 10) + " L " + this.cx + "," + this.cy + " X E", path = "M " + this.cx + "," + this.cy + " L " + r[a].arcStartX + "," + r[a].arcStartY + " A " + this.r + "," + this.r + " 0 " + r[a].arcIsBig + " 1 " + r[a].arcEndX + "," + r[a].arcEndY + " Z", r.length === 1 ? (s[a] = new t.flash.gl.Path({
                    path: path,
                    vmlPath: vmlPath,
                    stroke: this.data[a].color || "#f6bd0f",
                    strokeWidth: 2,
                    fillcolor: this.data[a].color || "#f6bd0f"
                }), e.PIE_MOVE_LENGTH = 0) : s[a] = new t.flash.gl.Path({
                    path: path,
                    vmlPath: vmlPath,
                    stroke: this.PIE_BORDER_COLOR,
                    strokeWidth: this.PIE_BORDER_WIDTH,
                    fillcolor: this.data[a].color || "#f6bd0f"
                }), s[a].tip = this.data[a].lable + " : " + r[a].percent + "%", n[a].add(s[a]), this.PIE_LABLE_SIDE_FLAG && (o[a] = new t.flash.gl.Line({
                    points: [r[a].lineStartX, r[a].lineStartY, r[a].lineEndX, r[a].lineEndY, r[a].lableX >= this.cx ? r[a].lableX : r[a].lableX, r[a].lableY],
                    stroke: this.PIE_LINE_COLOR
                }), n[a].add(o[a]), u[a] = new t.flash.gl.Text({
                    text: this.data[a].lable + " : " + this.data[a].value,
                    x: r[a].lableX < this.cx ? r[a].lableX - this.PIE_LINE_LENGTH : r[a].lableX + this.r / 10,
                    y: r[a].lableY - this.PIE_TEXT_FONT / 2,
                    font: this.PIE_TEXT_FONT,
                    color: "#4c4c4c"
                }), u[a].tip = this.data[a].lable + " : " + this.data[a].value, n[a].add(u[a])), function(t, i) {
                    e.PIE_MOVE_LENGTH && (t.on("mousedown", function() {
                        n[i].move({
                            x: t.selected ? -r[i].moveToX : r[i].moveToX,
                            y: t.selected ? -r[i].moveToY : r[i].moveToY,
                            animation: {
                                duration: e.PIE_ANIM_DURATION,
                                type: "back-ease-in-out"
                            },
                            after: function() {
                                t.selected = !t.selected
                            }
                        })
                    }), t.on("mouseout", function() {
                        e.PIE_LABLE_FLOAT_FLAG && e.floatLabel.hide(), e.PIE_MOVE_LENGTH && t.selected && n[i].move({
                            x: -r[i].moveToX,
                            y: -r[i].moveToY,
                            animation: {
                                duration: e.PIE_ANIM_DURATION,
                                type: "back-ease-in-out"
                            },
                            after: function() {
                                t.selected = !1
                            }
                        })
                    }))
                }(s[a], a), i.add(n[a]);
                this.PIE_LABLE_FLOAT_FLAG && i.add(this.floatLabel.draw.call(this, {
                    textRows: 1,
                    fontSize: this.PIE_TEXT_FONT,
                    paper: this.paper
                })), this.paper.draw(i);
                for (var f = 0; f < u.length; f++) r[f].lableX < this.cx && u[f].move({
                    x: -u[f].getW()
                })
            } else this.drawErrorMsg(this.paper, this.msg);
            return this
        }
    }(window), function(e) {
        var t = e.cnzz = e.cnzz || {},
        n = t.flash = t.flash || {},
        r = n.chart = n.chart || {};
        r.LineChart = r.LineChart ||
        function(e, n) {
            r.Chart.call(this, "LineChart");
            var i = this;
            if (e && n) {
                this.container = e.container, this.paper = new t.flash.gl.Paper({
                    container: this.container,
                    w: e.width,
                    h: e.height,
                    resizeCall: function(e, t, n, r) {
                        n || r ? (i.clearPaper(), i.w = n, i.h = r, i._draw()) : i.destroy()
                    }
                }), this.left = e.left || 60, this.right = e.right || 20, this.bottom = e.bottom || 22, this.top = e.top || 25, this.w = this.paper.getW(), this.h = this.paper.getH(), this.displayFloatLable = e.displayFloatLable !== !1, this.msg = e.msg || "", this.yStepL = 0, this.yStepR = 0, this.renderAs = e.renderAs === "polygon" ? "polygon" : "line";
                try {
                    typeof n == "string" ? n = this._xmlToCfg(n) : this.yStepL = 1
                } catch (s) {
                    r.error.push(s.toString()), this.drawErrorMsg(this.paper, this.msg);
                    return
                }
                this.RECT_LINE_STROKE = n.rectLineStroke || "#c6c6c6", this.RECT_LINE_STROKE_WIDTH = n.rectLineStrokeWidth || 1, this.RECT_STROKE_WIDTH = n.rectStrokeWidth || 2, this.TEXT_FONT = n.fontSize || 12, this.TEXT_COLOR = n.fontColor || "#555555", this.RECT_STROKE = n.rectStroke || "#909090", this.FLOAT_TEXT_MAX_ROW = 4, this.xLabelData = n.xLabelData || {
                    total: 0
                }, this.yLabelDataL = n.yLabelDataL || {
                    total: 0
                }, this.yLabelDataR = n.yLabelDataR || {
                    total: 0
                }, this.lineData = n.lineData || [], this.yLabelDataR.total && (this.right = 50), this.displayMaxMin = n.displayMaxMin, this.topMaxOval = null, this.topMaxText = null, this.layer = {}, this._draw()
            }
        }, r.LineChart.prototype = new r.Chart, r.LineChart.prototype.constructor = r.LineChart, r.LineChart.prototype._draw = function() {
            this.layer = new t.flash.gl.Layer, this.xLabelData.total && this.lineData && this.lineData.length ? (this._drawBack(), this._drawSideLabel(), this.renderAs === "line" ? this._drawDataLine() : this._drawDataPolygon(), this.displayFloatLable && this.layer.add(this.floatLabel.draw.call(this, {
                textRows: this.FLOAT_TEXT_MAX_ROW,
                fontSize: this.TEXT_FONT,
                paper: this.paper
            })), this.paper.draw(this.layer), this._resetLabelPostion()) : this.drawErrorMsg(this.paper, this.msg)
        }, r.LineChart.prototype._drawBack = function() {
            var e = new t.flash.gl.Group,
            n = this.w - this.left - this.right,
            r = this.h - this.top - this.bottom,
            i = [];
            for (var s = 0, o = 0; s < this.xLabelData.total - 1; s++) {
                var u = parseInt(n / this.xLabelData.total * (s + 1) + this.left, 10);
                (s + 1) % this.xLabelData.lineStep === 0 && (o % 2 === 0 ? (i.push(u), i.push(this.top), i.push(u), i.push(r + this.top)) : (i.push(u), i.push(r + this.top), i.push(u), i.push(this.top)), o++)
            }
            e.add(new t.flash.gl.Line({
                points: i,
                stroke: this.RECT_LINE_STROKE,
                strokeWidth: this.RECT_LINE_STROKE_WIDTH
            })), i = [];
            for (var s = 0, o = 0; s < this.yLabelDataL.total + 1; s++) {
                var a = parseInt(r / this.yLabelDataL.total * (s + 1) + this.top, 10);
                s < this.yLabelDataL.total - 1 && (o % 2 === 0 ? (i.push(this.left), i.push(a), i.push(this.left + n), i.push(a)) : (i.push(this.left + n), i.push(a), i.push(this.left), i.push(a)), o++)
            }
            return e.add(new t.flash.gl.Line({
                points: i,
                stroke: this.RECT_LINE_STROKE,
                strokeWidth: this.RECT_LINE_STROKE_WIDTH
            })), e.add(new t.flash.gl.Rect({
                x: this.left,
                y: this.top,
                w: n,
                h: r,
                stroke: this.RECT_STROKE,
                strokeWidth: this.RECT_STROKE_WIDTH,
                fillOpacity: 0
            })), this.layer.add(e), this
        }, r.LineChart.prototype._drawSideLabel = function() {
            var e = new t.flash.gl.Group,
            n = this.xLabelData.label || [],
            r = this.yLabelDataL.label || [],
            i = this.yLabelDataR.label || [],
            s = this.xLabelData.total === 1 ? !0 : !1;
            for (var o = 0; o < this.xLabelData.total; o++) for (var u = 0; u < n.length; u++) if (o === n[u].pos) {
                e.add(new t.flash.gl.Text({
                    text: n[u].text,
                    color: this.TEXT_COLOR,
                    font: this.TEXT_FONT,
                    x: s ? (this.w - this.left - this.right) / 2 + this.left - this.TEXT_FONT * (n[u].text.length / 4) : (this.w - this.left - this.right) / this.xLabelData.total * o + this.left - this.TEXT_FONT * (n[u].text.length / 4),
                    y: this.h - this.bottom + this.TEXT_FONT / 4
                }));
                break
            }
            for (var o = this.yLabelDataL.total; o >= 0; o--) for (var u = 0; u < r.length; u++) if (o === r[u].pos) {
                e.add(new t.flash.gl.Text({
                    text: r[u].text + "",
                    color: this.TEXT_COLOR,
                    font: this.TEXT_FONT,
                    x: this.left - (r[u].text + "").length * this.TEXT_FONT / 2 - this.TEXT_FONT,
                    y: this.h - this.bottom - (this.h - this.bottom - this.top) / this.yLabelDataL.total * o - this.TEXT_FONT
                }));
                break
            }
            for (var o = this.yLabelDataR.total; o >= 0; o--) for (var u = 0; u < i.length; u++) if (o === i[u].pos) {
                e.add(new t.flash.gl.Text({
                    text: i[u].text + "",
                    color: this.TEXT_COLOR,
                    font: this.TEXT_FONT,
                    x: this.w - this.right + this.TEXT_FONT / 2,
                    y: this.h - this.bottom - (this.h - this.bottom - this.top) / this.yLabelDataL.total * o - this.TEXT_FONT
                }));
                break
            }
            return this.layer.add(e), this
        }, r.LineChart.prototype._drawDataLine = function() {
            var e = this,
            n = !1,
            r = !1,
            i = !1,
            s = !1,
            o = [],
            u = /^.*(([0-9]{0,2}-[0-9]{0,2})|((0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1})).*$/;
            for (var a = this.lineData.length - 1; a >= 0; a--) o.push(this.lineData[a]);
            for (var a = 0; a < o.length; a++) {
                a === o.length - 1 && (n = r = !0);
                var f = this._translateValueToCoordinate(o[a]);
                f && f.points &&
                function(o) {
                    var a = [],
                    f = new t.flash.gl.Group,
                    l = [],
                    c = [],
                    h = 0,
                    p = o.color,
                    d = new t.flash.gl.Group,
                    v = "";
                    for (var m = 0; m < o.points.length; m++) {
                        a.push(o.points[m].x), a.push(o.points[m].y);
                        if (o.anchors[m]) if (o.anchors[m].radius) {
                            var g = new t.flash.gl.Oval({
                                x: o.points[m].x - o.anchors[m].radius,
                                y: o.points[m].y - o.anchors[m].radius,
                                r: o.anchors[m].radius,
                                stroke: o.anchors[m].bgcolor ? "#" + o.anchors[m].bgcolor : "#e000000",
                                fillcolor: o.anchors[m].bgcolor ? "#" + o.anchors[m].bgcolor : "#e000000"
                            }),
                            y = function() {
                                g.hide({
                                    animation: {
                                        duration: 1
                                    },
                                    after: function() {
                                        g.show({
                                            animation: {
                                                duration: 1
                                            },
                                            after: function() {
                                                y()
                                            }
                                        })
                                    }
                                })
                            };
                            y(), f.add(g)
                        } else p = o.anchors[m].bgcolor ? "#" + o.anchors[m].bgcolor : "#e000000";
                        else p = o.color;
                        o.points[m].size === "max" && n && !i ? (l[m] = new t.flash.gl.Oval({
                            x: o.points[m].x - o.width * 1.8,
                            y: o.points[m].y - o.width * 1.8,
                            r: o.width * 1.8,
                            stroke: p,
                            fillcolor: p
                        }), e.topMaxOval = new t.flash.gl.Oval({
                            x: 0,
                            y: 12 - o.width * 1.8,
                            r: o.width * 1.8,
                            stroke: p,
                            fillcolor: p
                        }), d.add(e.topMaxOval), o.points[m].text && o.points[m].text.length > 0 && (v = o.points[m].text[o.points[m].text.length - 1], u.test(v) ? v = o.name.toUpperCase() + "最大值：" + o.points[m].value + "（" + v + "）" : v = o.name.toUpperCase() + "最大值：" + o.points[m].value), e.topMaxText = new t.flash.gl.Text({
                            x: 20,
                            y: 4,
                            font: e.TEXT_FONT,
                            text: v,
                            color: e.TEXT_COLOR
                        }), d.add(e.topMaxText), i = !0) : o.points[m].size === "min" && r && !s ? (l[m] = new t.flash.gl.Oval({
                            x: o.points[m].x - o.width * 1.5,
                            y: o.points[m].y - o.width * 1.5,
                            r: o.width * 1.5,
                            stroke: p,
                            strokeWidth: o.width,
                            fillcolor: "#ffffff"
                        }), d.add(new t.flash.gl.Oval({
                            x: (e.w - e.left - e.right) / 2 + e.left + 10,
                            y: 13 - o.width * 1.8,
                            r: o.width * 1.5,
                            stroke: p,
                            strokeWidth: o.width,
                            fillcolor: "#ffffff"
                        })), o.points[m].text && o.points[m].text.length > 0 && (v = o.points[m].text[o.points[m].text.length - 1], u.test(v) ? v = o.name.toUpperCase() + "最小值：" + o.points[m].value + "（" + v + "）" : v = o.name.toUpperCase() + "最小值：" + o.points[m].value), d.add(new t.flash.gl.Text({
                            x: (e.w - e.left - e.right) / 2 + e.left + 30,
                            y: 4,
                            font: e.TEXT_FONT,
                            text: v,
                            color: e.TEXT_COLOR
                        })), s = !0) : l[m] = new t.flash.gl.Oval({
                            x: o.points[m].x - o.width,
                            y: o.points[m].y - o.width,
                            r: o.width,
                            stroke: p,
                            fillcolor: p
                        }), l[m].tip = o.points[m].text
                    }
                    for (var m = 0, b = 0, w = 0; m < o.dashed.length; m++, b++) if (o.dashed[m] !== h || m === o.dashed.length - 1) f.add(new t.flash.gl.Line({
                        points: a.slice(w, 2 * (b + 1)),
                        dashed: h,
                        stroke: o.color,
                        strokeWidth: o.width
                    })), w = b * 2, h = o.dashed[m];
                    for (var m = 0; m < o.points.length; m++) f.add(l[m]);
                    e.layer.add(d), e.layer.add(f)
                }(f)
            }
            return this
        }, r.LineChart.prototype._drawDataPolygon = function() {
            var e = this,
            n = [];
            for (var r = 0; r < this.lineData.length; r++) {
                var i = this._translateValueToCoordinate(this.lineData[r]);
                (function(r) {
                    var i = [],
                    s = [],
                    o = null,
                    u = null;
                    for (var a = 0; a < r.points.length; a++) i.push(r.points[a].x), i.push(r.points[a].y), s.push(r.points[a].y), s.push(r.points[a].x);
                    n.length === 0 && (n.push(e.h - e.bottom), n.push(e.left), n.push(e.h - e.bottom), n.push(r.points[r.points.length - 1].x)), o = new t.flash.gl.Polygon({
                        points: i.concat(n.reverse()),
                        stroke: r.color,
                        fillcolor: r.color,
                        strokeWidth: 0,
                        opacity: .7
                    }), e.layer.add(o), n = s, e.displayFloatLable && (o.on("mouseover", function(t) {
                        e.floatLabel.show()
                    }), o.on("mousemove", function(t) {
                        var n = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                        i = t.clientX - e.paper.getX() + n;
                        for (var s = 0; s < r.points.length - 1; s++) if (i > r.points[s].x && i < r.points[s + 1].x) {
                            u !== r.points[s].text && (u = r.points[s].text, e.floatLabel.setText(u));
                            break
                        }
                        e.floatLabel.move(t)
                    }), o.on("mouseout", function(t) {
                        e.floatLabel.hide()
                    }))
                })(i)
            }
            return this
        }, r.LineChart.prototype._resetLabelPostion = function() {
            if (this.topMaxText) {
                var e = this.topMaxText.getW();
                this.topMaxOval.move({
                    x: (this.w - this.left - this.right) / 2 + this.left - e - 30
                }), this.topMaxText.move({
                    x: (this.w - this.left - this.right) / 2 + this.left - e - 30
                })
            }
        }, r.LineChart.prototype._translateValueToCoordinate = function(e) {
            var t = {},
            n = e.depend === "right" ? this.yStepR : this.yStepL || 0,
            r = this.xLabelData.total === 1 ? !0 : !1;
            t.color = e.color, t.width = e.width, t.name = e.name, t.setSum = e.setSum, t.maxValue = e.maxValue, t.minValue = e.minValue, t.dashed = [], t.anchors = [], t.points = [];
            if (this.xLabelData.total && this.yLabelDataL.total && n) for (var i = 0; i < e.points.length; i++) {
                var s = {};
                s.text = e.points[i].text, s.x = r ? (this.w - this.left - this.right) / 2 + this.left : (this.w - this.left - this.right) / this.xLabelData.total * i + this.left, this.renderAs === "line" ? (s.y = (this.h - this.top - this.bottom) / this.yLabelDataL.total * (this.yLabelDataL.total - e.points[i].value / n) + this.top, this.displayMaxMin && t.setSum && this.xLabelData.total > 1 ? e.points[i].value === e.maxValue ? (s.size = "max", s.value = e.points[i].value) : e.points[i].value === e.minValue ? (s.size = "min", s.value = e.points[i].value) : s.size = "normal" : s.size = "normal", t.dashed.push(e.points[i].dashed), t.anchors.push(e.points[i].anchor)) : s.y = (this.h - this.top - this.bottom) / this.yLabelDataL.total * (this.yLabelDataL.total - e.points[i].accValue / n) + this.top, t.points.push(s)
            }
            return t
        }, r.LineChart.prototype._xmlToCfg = function(e) {
            var t = {},
            n = !1,
            r = document.all ?
            function() {
                var t = new ActiveXObject("Microsoft.XMLDOM");
                return t.loadXML(e), t
            }() : (new DOMParser).parseFromString(e, "text/xml"), i = r.getElementsByTagName("chart")[0];
            if (i) {
                var s = {
                    left: 0,
                    right: 0
                },
                o = {
                    left: 0,
                    right: 0
                },
                u = [];
                t.rectLineStrokeWidth = parseInt(i.getAttribute("showplotborder"), 10), t.rectStroke = "#" + (i.getAttribute("canvasbordercolor") || "909090"), t.rectStrokeWidth = parseInt(i.getAttribute("canvasborderthickness"), 10), t.fontSize = parseInt(i.getAttribute("outCnvBaseFontSize"), 10), t.displayMaxMin = !! i.getAttribute("max_min"), t.xLabelData = {};
                var a = parseInt(i.getAttribute("labelStep"), 10) || 1,
                f = i.getAttribute("percent");
                f = f === "true" || f === !0;
                var l = r.getElementsByTagName("categories");
                if (l[0]) {
                    var c = l[0].childNodes;
                    t.xLabelData.lineStep = 0, t.xLabelData.total = 0, t.xLabelData.label = [];
                    var h = "",
                    p = 0;
                    for (var d = 0, v = c.length; d < v; d++) c[d].tagName === "category" && (t.xLabelData.total % a === 0 && (h = c[d].getAttribute("label"), h && t.xLabelData.label.push({
                        pos: t.xLabelData.total,
                        text: h
                    })), t.xLabelData.total++), c[d].tagName === "vLine" && p++;
                    t.xLabelData.total > 1 && t.xLabelData.total--, t.xLabelData.total > p ? t.xLabelData.lineStep = a : t.xLabelData.lineStep = 1
                }
                var m = r.getElementsByTagName("dataset");
                m && (t.lineData = []);
                for (var d = 0, v = m.length; d < v; d++) {
                    var g = {};
                    g.catchMinMax = !0, g.depend = m[d].getAttribute("parentyaxis") === "S" ? "right" : "left", !n && (n = g.depend === "right"), g.color = "#" + (m[d].getAttribute("color") || "000000"), g.width = parseInt(m[d].getAttribute("linethickness"), 10), g.name = m[d].getAttribute("seriesName") || "";
                    var y = m[d].childNodes;
                    if (y) {
                        g.points = [], g.setSum = 0, g.maxValue = Number.MIN_VALUE, g.minValue = Number.MAX_VALUE;
                        for (var b = 0, w = y.length; b < w && b < t.xLabelData.total + 1; b++) {
                            var E = {},
                            S = null;
                            E.text = (S = y[b].getAttribute("toolText")) ? S.split("#_#") : [], E.value = parseFloat(y[b].getAttribute("value")) || 0, g.setSum += E.value, u[b] = (u[b] || 0) + E.value, E.accValue = u[b], E.dashed = parseInt(y[b].getAttribute("dashed"), 10) || 0;
                            var x = parseInt(y[b].getAttribute("anchorradius"), 10) || 0,
                            T = y[b].getAttribute("anchorbgcolor");
                            T && (E.anchor = {
                                radius: x,
                                bgcolor: T
                            }), s[g.depend] > E.value && (s[g.depend] = E.value), o[g.depend] < E.value && (o[g.depend] = E.value), g.catchMinMax && (g.minValue > E.value && (g.minValue = E.value), g.maxValue < E.value && (g.maxValue = E.value)), g.points.push(E), !E.dashed || (g.catchMinMax = !1)
                        }
                    }
                    t.lineData.push(g)
                }
                if (this.renderAs === "line") {
                    var N = this._roundUpNum(o.left) - s.left || 5;
                    this.yStepL = N / 5, N = this._roundUpNum(o.right) - s.right || (n ? 5 : 0), this.yStepR = N / 5
                } else {
                    this.yStepL = .2;
                    for (var d = 0; d < t.lineData.length; d++) for (var v = 0; v < t.lineData[d].points.length; v++) {
                        var C = u[v] ? t.lineData[d].points[v].accValue / u[v] : 0,
                        k = u[v] > 0 ? t.lineData[d].points[v].value / u[v] * 100 : 0;
                        t.lineData[d].points[v].accValue = u[v] > 0 ? t.lineData[d].points[v].accValue / u[v] : 0, t.lineData[d].points[v].accPercent = (k + "").indexOf(".") === -1 ? k : k.toFixed(2), t.lineData[d].points[v].text.splice(t.lineData[d].points[v].text.length - 1, 0, "占比: " + t.lineData[d].points[v].accPercent + "%")
                    }
                }
                t.yLabelDataL = this.yStepL ? {
                    total: 5,
                    label: []
                } : {
                    total: 0
                }, t.yLabelDataR = this.yStepR ? {
                    total: 5,
                    label: []
                } : {
                    total: 0
                };
                for (var d = 0; d < 6; d++) {
                    var L = d * this.yStepL;
                    this.yStepL && t.yLabelDataL.label.push({
                        pos: d,
                        text: this.renderAs === "line" ? f ? this._changeNumToLabel(L) + "%" : this._changeNumToLabel(L) : d * 20 + "%"
                    }), this.yStepR && (L = d * this.yStepR, t.yLabelDataR.label.push({
                        pos: d,
                        text: this.renderAs === "line" ? f ? this._changeNumToLabel(L) + "%" : this._changeNumToLabel(L) : d * 20 + "%"
                    }))
                }
            }
            return t
        }
    }(window), function(e) {
        var t = e.cnzz = e.cnzz || {},
        n = t.flash = t.flash || {},
        r = n.chart = n.chart || {};
        r.AreaChart = r.AreaChart ||
        function(e, t) {
            return r.Chart.call(this, "AreaChart"), e.renderAs = "polygon", this.chart = new r.LineChart(e, t), this.chart
        }, r.AreaChart.prototype = new r.Chart, r.AreaChart.prototype.constructor = r.AreaChart
    }(window), function(e) {
        var t = e.cnzz = e.cnzz || {},
        n = t.flash = t.flash || {},
        r = n.chart = n.chart || {};
        r.BarChart = r.BarChart ||
        function(e, n) {
            r.Chart.call(this, "BarChart");
            var i = this;
            if (e && n) {
                this.container = e.container, this.paper = new t.flash.gl.Paper({
                    container: this.container,
                    w: e.width,
                    h: e.height,
                    resizeCall: function(e, t, n, r) {
                        n || r ? (i.clearPaper(), i.w = n, i.h = r, i._draw()) : i.destroy()
                    }
                }), this.left = e.left || 100, this.right = e.right || 20, this.bottom = e.bottom || 20, this.top = e.top || 25, this.step = e.step || 5, this.d = e.direction === "v" ? "v" : "h", this.w = this.paper.getW(), this.h = this.paper.getH(), this.displayFloatLable = e.displayFloatLable !== !1, this.msg = e.msg || "";
                try {
                    typeof n == "string" && (n = this._xmlToCfg(n))
                } catch (s) {
                    r.error.push(s.toString()), this.drawErrorMsg(this.paper, this.msg);
                    return
                }
                this.RECT_LINE_STROKE = n.rectLineStroke || "#c6c6c6", this.RECT_LINE_STROKE_WIDTH = n.rectLineStrokeWidth || .2, this.RECT_LINE_FILL_COLOR = n.rectLineFillColor || "#f1f1f1", this.RECT_STROKE = n.rectStroke || "#909090", this.RECT_STROKE_WIDTH = n.rectStrokeWidth || 2, this.TEXT_FONT = n.fontSize || 12, this.TEXT_COLOR = n.fontColor || "#555555", this.FLOAT_TEXT_MAX_ROW = 3, this.barData = n.barData || [], this.backRectW = this.w - this.left - this.right, this.backRectH = this.h - this.top - this.bottom, e.barSpace ? this.barSpace = e.barSpace : this.d === "h" ? this.barSpace = this.backRectH / (this.barData.length * 3) : this.d === "v" && (this.barSpace = this.backRectW / (this.barData.length * 3)), e.barWidth ? this.barWidth = e.barWidth : this.d === "h" ? this.barWidth = (this.backRectH - (this.barData.length + 1) * this.barSpace) / this.barData.length : this.d === "v" && (this.barWidth = (this.backRectW - (this.barData.length + 1) * this.barSpace) / this.barData.length), this.yLabels = [], this.xLabels = [], this.stepValue = 0, this.layer = {}, this.barArray = [], this._draw()
            }
        }, r.BarChart.prototype = new r.Chart, r.BarChart.prototype.constructor = r.BarChart, r.BarChart.prototype._draw = function() {
            this.layer = new t.flash.gl.Layer, this.barData && this.barData.length ? (this._computeStepValue(), this._drawBack(), this._drawSideLabel(), this._drawBar(), this.displayFloatLable && this.layer.add(this.floatLabel.draw.call(this, {
                textRows: this.FLOAT_TEXT_MAX_ROW,
                fontSize: this.TEXT_FONT,
                paper: this.paper
            })), this.paper.draw(this.layer), this._resetLabelPostion()) : this.drawErrorMsg(this.paper, this.msg)
        }, r.BarChart.prototype._drawBack = function() {
            var e = new t.flash.gl.Group,
            n = 0;
            if (this.d === "h") {
                n = this.backRectW / this.step;
                for (var r = 0; r < parseInt(this.step / 2, 10); r++) e.add(new t.flash.gl.Rect({
                    x: n + n * r * 2 + this.left,
                    y: this.top,
                    w: n,
                    h: this.backRectH,
                    stroke: this.RECT_LINE_STROKE,
                    strokeWidth: this.RECT_LINE_STROKE_WIDTH,
                    fillcolor: this.RECT_LINE_FILL_COLOR
                }))
            } else if (this.d === "v") {
                n = this.backRectH / this.step;
                for (var r = 0; r < parseInt(this.step / 2, 10); r++) e.add(new t.flash.gl.Rect({
                    x: this.left,
                    y: n + n * r * 2 + this.top,
                    w: this.backRectW,
                    h: n,
                    stroke: this.RECT_LINE_STROKE,
                    strokeWidth: this.RECT_LINE_STROKE_WIDTH,
                    fillcolor: this.RECT_LINE_FILL_COLOR
                }))
            }
            return e.add(new t.flash.gl.Rect({
                x: this.left,
                y: this.top,
                w: this.backRectW,
                h: this.backRectH,
                stroke: this.RECT_STROKE,
                strokeWidth: this.RECT_STROKE_WIDTH,
                fillOpacity: 0
            })), this.layer.add(e), this
        }, r.BarChart.prototype._drawSideLabel = function() {
            var e = new t.flash.gl.Group,
            n = 0,
            r = 0,
            i = [],
            s = [],
            o = "";
            for (var u = 0; u < this.barData.length; u++) this.d === "h" ? (n = 0, r = this.top + this.barSpace * (u + 1) + this.barWidth * (u + .5) - this.TEXT_FONT) : this.d === "v" && (n = this.left + this.barSpace * (u + 1) + this.barWidth * u + this.barWidth / 2, r = this.h - this.bottom), i[u] = new t.flash.gl.Text({
                text: this.barData[u].label,
                color: this.TEXT_COLOR,
                font: this.TEXT_FONT,
                x: n,
                y: r
            }), e.add(i[u]);
            for (var u = 0; u < 6; u++) this.d === "h" ? (n = this.backRectW / this.step * u + this.left, r = this.h - this.bottom) : this.d === "v" && (n = 0, r = this.backRectH / this.step * (5 - u) + this.top - this.TEXT_FONT), o = this._changeNumToLabel(this.stepValue * u), s[u] = new t.flash.gl.Text({
                text: o,
                color: this.TEXT_COLOR,
                font: this.TEXT_FONT,
                x: n,
                y: r
            }), e.add(s[u]);
            this.d === "h" ? (this.xLabels = s, this.yLabels = i) : this.d === "v" && (this.xLabels = i, this.yLabels = s), this.layer.add(e)
        }, r.BarChart.prototype._drawBar = function() {
            var e = this,
            n = 0,
            r = new t.flash.gl.Group,
            i = null;
            for (var s = 0; s < this.barData.length; s++) n < this.barData[s].value && (n = this.barData[s].value);
            for (var s = 0; s < this.barData.length; s++) this.d === "h" ? i = [this.left, this.top + this.barSpace * (s + 1) + this.barWidth * s, this.left + this.backRectW / 5 * this.barData[s].value / this.stepValue, this.top + this.barSpace * (s + 1) + this.barWidth * s, this.left + this.backRectW / 5 * this.barData[s].value / this.stepValue, this.top + this.barSpace * (s + 1) + this.barWidth * (s + 1), this.left, this.top + this.barSpace * (s + 1) + this.barWidth * (s + 1)] : this.d === "v" && (i = [this.left + this.barSpace * (s + 1) + this.barWidth * s, this.h - this.bottom, this.left + this.barSpace * (s + 1) + this.barWidth * s, this.h - this.bottom - this.backRectH / 5 * this.barData[s].value / this.stepValue, this.left + this.barSpace * (s + 1) + this.barWidth * (s + 1), this.h - this.bottom - this.backRectH / 5 * this.barData[s].value / this.stepValue, this.left + this.barSpace * (s + 1) + this.barWidth * (s + 1), this.h - this.bottom]), this.barArray[s] = new t.flash.gl.Polygon({
                points: i,
                stroke: "#333333",
                strokeWidth: .5,
                fillcolor: this.barData[s].color
            }), this.barArray[s].tip = e.barData[s].text, r.add(this.barArray[s]);
            this.layer.add(r)
        }, r.BarChart.prototype._resetLabelPostion = function() {
            var e = 0;
            if (this.yLabels) for (var t = 0; t < this.yLabels.length; t++) e = this.yLabels[t].getW(), this.yLabels[t].move({
                x: this.left - e - this.TEXT_FONT / 2
            });
            if (this.xLabels) for (var t = 0; t < this.xLabels.length; t++) e = this.xLabels[t].getW(), this.xLabels[t].move({
                x: -e / 2
            })
        }, r.BarChart.prototype._computeStepValue = function(e) {
            var t = 0;
            for (var n = 0; n < this.barData.length; n++) t < this.barData[n].value && (t = this.barData[n].value);
            this.stepValue = this._roundUpNum(t) / 5
        }, r.BarChart.prototype._xmlToCfg = function(e) {
            var t = {},
            n = document.all ?
            function() {
                var t = new ActiveXObject("Microsoft.XMLDOM");
                return t.loadXML(e), t
            }() : (new DOMParser).parseFromString(e, "text/xml"), r = n.getElementsByTagName("chart")[0];
            if (r) {
                t.rectLineStrokeWidth = parseInt(r.getAttribute("showplotborder"), 10), t.rectStroke = "#" + (r.getAttribute("canvasbordercolor") || "909090"), t.rectStrokeWidth = parseInt(r.getAttribute("canvasborderthickness"), 10), t.fontSize = parseInt(r.getAttribute("baseFontSize"), 10);
                var i = "",
                s = "",
                o = n.getElementsByTagName("set");
                if (o) {
                    t.barData = [];
                    for (var u = 0; u < o.length; u++) t.barData[u] = {
                        label: o[u].getAttribute("label") || "",
                        value: parseFloat(o[u].getAttribute("value"), 10) || 0,
                        color: (i = o[u].getAttribute("color")) ? "#" + i : "#f6bd0f",
                        text: (s = o[u].getAttribute("toolText")) ? s.split("#_#") : []
                    }
                }
            }
            return t
        }
    }(window)
});