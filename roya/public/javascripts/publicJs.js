define(function(require, exports, module) {
	var $ = require("jquery");
	var Handlebars = require("handlbars");
	var calend = require("adddate");
	require("./jquery.pager");
	require("jquery-ui.min.js");
	require("bootstrap");
	require("./jquery.Jcrop");

	$.prototype.html = function(base) {
		return function() {
				var s = this,
					a = "data-property",
					p = s.attr(a),
					isset = arguments.length > 0,
					v = isset ? arguments[0] : null;　　　　　　　　　 //这里调用基类方法，当然基类方法在何时调用或者是否要调用取决于您的业务逻辑，在这里我们是要调用的，因为要保持它原有的功能。
				if (v != undefined && v != null && typeof v == "string") {
					v = v.replace(/<script>/g, '&lt;script&gt;').replace(/<\/script>/g, '&lt;/script&gt;');
				}
				if (isset && typeof(base) == "function") {

					base.call(s, v);
				} else {
					v = base.call(s);
				}
				return isset ? s : v;

			}　　　　　　 //在这里传入基类方法
	}($.prototype.html);
	Handlebars.registerHelper('compare', function(left, operator, right, options) {
		if (arguments.length < 3) {
			throw new Error('Handlerbars Helper "compare" needs 2 parameters');
		}
		var operators = {
			'==': function(l, r) {
				return l == r;
			},
			'===': function(l, r) {
				return l === r;
			},
			'!=': function(l, r) {
				return l != r;
			},
			'!==': function(l, r) {
				return l !== r;
			},
			'<': function(l, r) {
				return l < r;
			},
			'>': function(l, r) {
				return l > r;
			},
			'<=': function(l, r) {
				return l <= r;
			},
			'>=': function(l, r) {
				return l >= r;
			},
			'typeof': function(l, r) {
				return typeof l == r;
			}
		};

		if (!operators[operator]) {
			throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
		}

		var result = operators[operator](left, right);

		if (result) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});


	Handlebars.registerHelper("addOne", function(index, options) {
		return parseInt(index) + 1;
	});


	/*
		分页封装 start
		pagerobj:控件承载对象
		current_page：当前页
		ALLpages:总页数
		fun:点击回调
	*/

	var pagination = function(pagerobj, current_page, ALLpages, fun, lrnum) {
		$(pagerobj).pager({
			pagenumber: current_page,
			pagecount: ALLpages,
			buttonClickCallback: fun,
			lrnum: lrnum
		});


	};
	var setdisabled = function(target) {
		$(target).find("fieldset").attr("disabled", true);
		$(target).find("fieldset").find("input").each(function(index, element) {
			$(this).attr("disabled", true);
		});
		$(target).find("fieldset").find("select").each(function(index, element) {
			$(this).attr("disabled", true);
		});
		$(target).find("fieldset").find("button").each(function(index, element) {
			$(this).attr("disabled", true);
		});

	};
	var removedisabled = function(target) {
		$(target).find("fieldset").removeAttr("disabled");
		$(target).find("fieldset").find("input").each(function(index, element) {
			var str = $(this).attr("hasdisabled");
			if (str != "hasdisabled") {
				$(this).removeAttr("disabled");
			}
		});
		$(target).find("fieldset").find("select").each(function(index, element) {
			var str = $(this).attr("hasdisabled");
			if (str != "hasdisabled") {
				$(this).removeAttr("disabled");
			}
		});
		$(target).find("fieldset").find("button").each(function(index, element) {
			var str = $(this).attr("hasdisabled");
			if (str != "hasdisabled") {
				$(this).removeAttr("disabled");
			}
		});
		$(target).find("input").each(function(index, element) {
			$(this).val("");
		});

	};
	var formDate = function(dateStr) {
		if (dateStr != "" && dateStr != null) {
			dateStr = dateStr.substr(0, 4) + "-" + dateStr.substr(4, 2) + "-" + dateStr.substr(6, 2);
		}
		return dateStr;
	};
	var formTime = function(dateStr) {
		if (dateStr != "" && dateStr != null) {
			dateStr = dateStr.substr(0, 2) + ":" + dateStr.substr(2, 2);
		}
		return dateStr;
	};
	var getRadioValue = function(name) {
		var objs = document.getElementsByName(name);
		for (var i = 0; i < objs.length; i++) {
			if (objs[i].checked) {
				return objs[i].value;
			}
		}
		return -1;
	};
	var getRadioObj = function(name) {
		var objs = document.getElementsByName(name);
		for (var i = 0; i < objs.length; i++) {
			if (objs[i].checked) {
				return objs[i];
			}
		}
		return null;
	};
	var setRadioValue = function(name, _value) {
		var objs = document.getElementsByName(name);
		for (var i = 0; i < objs.length; i++) {
			if (objs[i].value == _value) {
				objs[i].checked = true;
				return;
			}
		}
	};
	var clearFormValues = function(obj) {
		$(obj).find("input[type='text']").val("");
		$(obj).find("textarea").val("");
		$(obj).find("input[type='password']").val("");
		var arr = $(obj).find("select");
		for (var i = 0; i < arr.length; i++) {
			$(arr[i]).find("option").eq(0).attr("selected", true);
		}

	};
	var exacttime = function(obj) {
		$(obj).click(function() {
			calend.SelectDate(this, 'yyyy-MM-dd hh:mm:ss')
		});
	}
	var clearcheckBox = function(obj) {
		$(obj).find("input[type='text']").val("");
		$(obj).find("textarea").val("");
		$(obj).find("input[type='password']").val("");
		$(obj).find("input[type='checkbox']").attr("checked", false);
		$(obj).find("input[type='radio']").attr("checked", false);
		var arr = $(obj).find("select");
		for (var i = 0; i < arr.length; i++) {
			$(arr[i]).find("option").eq(0).attr("selected", true);
		}
	};

	function setParentIframeHeight() {

		var parentIframe = parent.document.getElementById("pageFrame");
		if (parentIframe != null) {
			parentIframe.height = 0;
			parentIframe.height = document.body.scrollHeight;
		}



	}
	var Base64 = {

			// private property
			_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

			// public method for encoding
			encode: function(input) {
				var output = "";
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;

				input = Base64._utf8_encode(input);

				while (i < input.length) {

					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);

					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;

					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}

					output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

				}

				return output;
			},

			// public method for decoding
			decode: function(input) {
				var output = "";
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				var i = 0;

				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

				while (i < input.length) {

					enc1 = this._keyStr.indexOf(input.charAt(i++));
					enc2 = this._keyStr.indexOf(input.charAt(i++));
					enc3 = this._keyStr.indexOf(input.charAt(i++));
					enc4 = this._keyStr.indexOf(input.charAt(i++));

					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;

					output = output + String.fromCharCode(chr1);

					if (enc3 != 64) {
						output = output + String.fromCharCode(chr2);
					}
					if (enc4 != 64) {
						output = output + String.fromCharCode(chr3);
					}

				}

				output = Base64._utf8_decode(output);

				return output;

			},

			// private method for UTF-8 encoding
			_utf8_encode: function(string) {
				string = string.replace(/\r\n/g, "\n");
				var utftext = "";

				for (var n = 0; n < string.length; n++) {

					var c = string.charCodeAt(n);

					if (c < 128) {
						utftext += String.fromCharCode(c);
					} else if ((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					} else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}

				}

				return utftext;
			},

			// private method for UTF-8 decoding
			_utf8_decode: function(utftext) {
				var string = "";
				var i = 0;
				var c = c1 = c2 = 0;

				while (i < utftext.length) {

					c = utftext.charCodeAt(i);

					if (c < 128) {
						string += String.fromCharCode(c);
						i++;
					} else if ((c > 191) && (c < 224)) {
						c2 = utftext.charCodeAt(i + 1);
						string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
						i += 2;
					} else {
						c2 = utftext.charCodeAt(i + 1);
						c3 = utftext.charCodeAt(i + 2);
						string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
						i += 3;
					}

				}

				return string;
			}

		}
		/*
			分页封装 end
		*/
		/*window.alert=function(info,fun){
			var alertHtml='';
			alertHtml +='<div class="show-bg" style="position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:9998"></div>'
			       +'<table align="center" valign="middle" width="100%" height="100%" class="alert-container-text" style="position:absolute;left:0;top:0;z-index:9999">'
				+'<tr>'
					+'<td style="vertical-align: middle;">'
						+'<div class="alert-body">'
							+'<span class="text-area">'
								+'<span class="text-container"></span>'
							+'</span>'
						+'</div>'
					+'</td>'
				+'</tr>'
			+'</table>';
			
			$("body").append(alertHtml);
			
			//createShield(alertHtml,function(){
				 $(".text-container").html(info);				
				 $(".alert-body").css({"border-radius":"5px","width":"30%","overflow":"hidden","background":"#fff","margin":"0 auto","margin-top":"-100px"});
				 $(".text-area").css({"display":"block","width":"100%","overflow":"hidden"}); 
				 $(".text-container").css({"box-sizing":"border-box","color":"#484848","word-break":"break-all","display":"block","width":"100%","overflow":"hidden","display":"block","padding":"30px 30px","text-align":"left","font-size":"14px"});
				$(".body-wrap").css("pointer-events","none");
				
				
			 //})
			 var _this=this;
			 $(".alert-container-text").unbind().click(function(){
				_this.closeAlert();
			
			});
			 $(".alert-container-text").unbind().bind("touchstart",function(){
				_this.closeAlert();
				
			});
			$(".alert-container-text td").click(function(){
				_this.closeAlert();
			});
			this.closeAlert=function(){
				$(".alert-container-text").remove();
				$(".show-bg").remove();
				if(typeof(fun)=="function"){
					fun();
				}
				$(".body-wrap").css("pointer-events","auto");
				return false;
			}
			setTimeout(function(){
			 	$(".alert-container-text").remove();
					$(".show-bg").remove();
					if(typeof(fun)=="function"){
					 	fun();
					}
					$(".body-wrap").css("pointer-events","auto");
					return false;
			},2000);
    }*/

	window.myConfirm = function(info, callback) {
		 document.onkeydown = function(e){   
        var ev = document.all ? window.event : e;  
        if(ev.keyCode==13) {  
  
  		return false;
         }  
     }  
		var alertHtml = '';
		alertHtml += '<table align="center" valign="middle" width="100%" height="100%" class="alert-container-text-confirm" style="position:absolute;left:0;top:0;z-index:9999">' + '<tr>' + '<td style="vertical-align:middle">' + '<div class="alert-body-confirm">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span class="close-btn" aria-hidden="true">&times;</span></button>' + '<h8 class="modal-title" style="text-align:left;">提示</h8>' + '</div>' + '<span class="text-area">' + '<span class="text-container-confirm"></span>' + '</span>' + '<div class="modal-footer footer">' + '<button id="sure-btn" type="button" class="btn btn-primary" >确定</button>' + '<button type="button" id="cancel-btn" class="btn btn-primary"  data-dismiss="modal">取消</button>' + '</div>' + '</div>' + '</td>' + '</tr>' + '</table>';

		$("body").append(alertHtml);
		$(".text-container-confirm").html(info);
		$(".alert-body-confirm").css({
			"border-radius": "5px",
			"width": "30%",
			"overflow": "hidden",
			"background": "#fff",
			"margin": "0 auto",
			"margin-top": "-150px",
			"border": "1px solid #e5e5e5",
			"box-shadow": "1px 1px 5px #1d1d1d"
		});
		$(".text-area").css({
			"display": "block",
			"width": "100%",
			"overflow": "hidden"
		});
		$(".text-container-confirm").css({
			"box-sizing": "border-box",
			"color": "#484848",
			"word-break": "break-all",
			"display": "block",
			"width": "100%",
			"overflow": "hidden",
			"display": "block",
			"padding": "30px 30px",
			"text-align": "left",
			"font-size": "14px"
		});
		$(".body-wrap").css("pointer-events", "none");
		var me = this;
		$(".close-btn").click(function() {
			me.hidelog();
		});
		$("#cancel-btn").click(function() {
			me.hidelog();
			if (callback) callback(false);
		});
		$("#sure-btn").click(function() {
			me.hidelog();
			if (callback) callback(true);
		});
		this.hidelog = function() {
			$(".alert-container-text-confirm").remove();
			$(".show-bg").remove();
			$(".body-wrap").css("pointer-events", "auto");
		}
		return false;
	}

	var pubFn = {
		//表格checkbox选中返回值
		seleceCheckbox: function(obj) {
			var tempId = [];
			$(obj).find("input[type=checkbox]").each(function() {
				if (this.checked == true) {
					var temp = new Object();
					temp.id = $(this).attr("dataid");
					tempId.push(temp);

				}

			});
			return tempId;
		},
		//表格checkbox选中返回值
		seleceCheckboxIdList: function(obj) {
			var tempId = [];
			$(obj).find("input[type=checkbox]").each(function() {
				if (this.checked == true) {
					//var temp=new Object();
					//temp.id=$(this).attr("dataid");
					tempId.push($(this).attr("dataid"));

				}

			});
			return tempId;
		},
		intnum: function(thisval) { //只能输入整数
			$(".inptNum").each(function() {
				$(this)[0].onkeyup = function(e) {
					if (e.keyCode != 37 && e.keyCode != 39) {
						this.value = this.value.replace(/[^\d]/g, '');
					}

				}
			})
		},
		floatnum: function(thisval) { //输入整数和2位小数
			$(".inptFloat").each(function() {
				$(this)[0].onkeyup = function() {
					this.value = this.value.replace(/[^\d\.]/g, '');
					str = this.value.split(".");
					if (str.length > 1) {
						if (str[1].length > 2) //小数部分大于2
						{
							this.value = str[0] + "." + str[1].substring(0, 2);
							//alert(Math.round(num*100)/100);
							//alert("小数部分保留2位");
							return;

						}
					}
				}
			})
		},
		limitLength: function(obj, limitLen) {
			$(obj).keyup(function() {
				if ($(obj).val().length > limitLen) {
					var _value = $(this).val();
					$(this).val(_value.substring(0, limitLen));
				} else {

				}
			});
		},
		creatErrorTip: function(dom, title) {
			$(dom).addClass('error');
			//var _a=$('<a href="#" class="tooltip-show" data-toggle="tooltip" data-placement="bottom"></a>');
			//$(dom).after(_a);
			$(dom).attr("data-placement", "bottom");
			$(dom).attr("title", title);
			$(dom).tooltip('show');
			$(dom).focus(function() {
				$(dom).tooltip('hide');
				$(this).removeClass('error');
				$(dom).removeAttr("title");
			})
			$(dom).mouseover(function(event) {
				$(dom).tooltip('hide');
				//$(dom).tooltip('destroy');
			});
			$(dom).mouseout(function(event) {
				$(dom).tooltip('hide');
				//$(dom).tooltip('destroy');
			});
		},
		/** 全选/全不选 */
		seleAll: function() {
			$("#grop-list .checkAll").each(function() {
				$(this).click(function() {
					$(this).parent().parent().find("form").find("input[name='chk_list']").prop("checked", $(this).prop("checked"));
				});
			});
		},
		//初始模板
		initData: function(style, _data, list) {
			var source = $(style).html();
			var template = Handlebars.compile(source);
			var context = {
				data: _data
			};
			var html = template(context);
			$(list).html(html);

		},
		//初始模板append
		initDataAppend: function(style, _data, list) {
			var source = $(style).html();
			var template = Handlebars.compile(source);
			var context = {
				data: _data
			};
			var html = template(context);
			$(list).append(html);

		}
	}



	$.datepicker.regional['zh-CN'] = {
		clearText: '清除',
		clearStatus: '清除已选日期',
		closeText: '关闭',
		closeStatus: '不改变当前选择',
		prevText: '<上月',
		prevStatus: '显示上月',
		prevBigText: '<<',
		prevBigStatus: '显示上一年',
		nextText: '下月>',
		nextStatus: '显示下月',
		nextBigText: '>>',
		nextBigStatus: '显示下一年',
		currentText: '今天',
		currentStatus: '显示本月',
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
			'十月', '十一月', '十二月'
		],
		monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
			'十一', '十二'
		],
		monthStatus: '选择月份',
		yearStatus: '选择年份',
		weekHeader: '周',
		weekStatus: '年内周次',
		dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
		dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
		dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
		dayStatus: '设置 DD 为一周起始',
		dateStatus: '选择 m月 d日, DD',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		initStatus: '请选择日期',
		isRTL: false
	};



	$.datepicker.setDefaults($.datepicker.regional['zh-CN']);

	//用来存放当前正在操作的日期文本框的引用。  
	var datepicker_CurrentInput;

	// 设置DatePicker 的默认设置  
	$.datepicker.setDefaults({
		showButtonPanel: true,
		closeText: 'Clear',
		beforeShow: function(input, inst) {
			datepicker_CurrentInput = input;
		}
	});

	// 绑定“Done”按钮的click事件，触发的时候，清空文本框的值  
	$(".ui-datepicker-close").live("click", function() {
		$(window.dateObj).val("");
		window.datepicker_CurrentInput.value = "";
	});



	exports.getLanguage = function() {
		var str = window.location.href;
		if (str.indexOf("/en/") > -1) {
			return "en";
		} else {
			return "zh";
		}
	};
	$(document).ready(function() {
		if (window.location.pathname.indexOf('forgetpass')==-1) {
			 var obj = new Object();
	      var body = new Object();
	      body.sessionid=window.localStorage.getItem("sessionid");
	      obj.body = body;
		var _type="POST";
		if(obj.type=="GET")
		{
			_type="GET";
		}
		var _jsdata= JSON.stringify(obj.body)
		_jsdata=_jsdata.replace(/<script>/g,'&lt;script&gt;').replace(/<\/script>/g,'&lt;/script&gt;');
        $.ajax({
            url: '/controller/120030',

            type: _type,
            data: _jsdata,
            dataType: "json",
			contentType:"application/json",
            success: function(data){
             if(data.response_body==null){
             	window.location.href=document.location.protocol + '//' + location.host  + '/omc/'
             }
            },
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				if(XMLHttpRequest.status==0)
				{
					 publicJs.endLoading();
					// return;
				}

				 if(obj.async==true)
                {
                    publicJs.endLoading();
					//alert("服务或网络异常");
                }
				if(XMLHttpRequest.status==401)
				{
					 alert("登录超时");
					 top.location.href="../login/index.html";
				}
				
				if(XMLHttpRequest.status==403)
				{
					 alert("权限不足");
				}
				
				if(typeof(obj.errHandle)=="function")
				{
					obj.errHandle();
				}
            }
        });
		}
		
		$(".container-page").css('height', $(window).height());
		$("#targetform").closest(".modal-body").find(".modal-footer").data("html", $("#targetform").closest(".modal-body").find(".modal-footer").html());
		$("#targetform").attr("data", $("#targetform").html());

	});

	function setvalue() {
		var d = new Date();
		var mon = (d.getMonth() + 1).toString();
		if (mon.length == 1) {
			mon = "0" + mon;
		}
		var tod = d.getDate().toString();
		if (tod.length == 1) {
			tod = "0" + tod;
		}
		var todayDate = d.getFullYear() + "-" + mon + "-" + tod;
		return todayDate;
	}

	function binduploadfile(imgid, target, fn, fn1, uploadSrc) {


		$(imgid).bind("click", function() {

			$("#upload_img").find(".modal-title").html("附件上传");
			$("#targetform").html($("#targetform").attr("data"));
			$("#targetform").closest(".modal-body").find(".modal-footer").hide();
			if (uploadSrc != null) {
				$("#form2").attr("action", uploadSrc)
			}
			var iframe = document.getElementById('iframe1');

			if (iframe.attachEvent) {
				iframe.attachEvent("onload", function() {
					var ipurl = window.ipurl;
					var xdurl = window.xdurl;
					var filesize = window.filesize;
					if (ipurl == undefined || ipurl == "") {
						return;
					}
					if (target != "" && target != null) {

						$(target).attr("src", ipurl);
						$(target).attr("data", xdurl);
					}
					$("#upload_img").modal("hide");
					//$("#targetform").html($("#targetform").attr("data"));
					var tempthis = $(imgid);
					var _title = $("#targetform").attr("imgtitle");
					if (fn != null && ipurl != undefined) {
						fn.apply(tempthis, [ipurl, xdurl, _title, filesize]);

					}
					window.ipurl = "";
					window.xdurl = "";

				});

			} else {

				iframe.onload = function() {

					var ipurl = window.ipurl;
					var xdurl = window.xdurl;
					var filesize = window.filesize;
					if (ipurl == undefined || ipurl == "") {
						return;
					}
					if (target != "" && target != null) {

						$(target).attr("src", ipurl);
						$(target).attr("data", xdurl);
					}
					$("#upload_img").modal("hide");
					//$("#targetform").html($("#targetform").attr("data"));
					var tempthis = $(imgid);
					var _title = $("#targetform").attr("imgtitle");
					if (fn != null) {
						fn.apply(tempthis, [ipurl, xdurl, _title, filesize]);

					}
					window.ipurl = "";
					window.xdurl = "";


				};

			}

			$("#upload_iframe").unbind().bind("click", function() {
				if ($(".imgfile").val() == "") {
					alert("请选择文件");
					return;
				}
				var str = $(".imgfile").val();

				$("#targetform").attr("data", $("#targetform").html());

				var ifm = document.getElementById("iframe1");
				window.document.getElementById('iframe1').contentWindow.document.body.innerHTML = "";
				var tempobj = $("#form2");

				$(window.document.getElementById('iframe1').contentWindow.document.body).html(tempobj);
				window.document.getElementById('iframe1').contentWindow.document.getElementById("form2").submit();
			});
			$(".imgfile").unbind().bind("change", function() {
				var title = $(this).val();
				var strFileName = title.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi, "$1"); //正则表达式获取文件名，不带后缀
				var FileExt = title.replace(/.+\./, ""); //正则表达式获取后缀
				var _title = strFileName + '.' + FileExt

				$("#targetform").attr("imgtitle", _title);
			});

			if (typeof(fn1) == "function") {
				var flag = fn1.apply(this, []);
				if (flag == false) {
					return;
				}
			}
			$("#upload_img").modal("show");
		});
	}

	function binduploadimge(imgid, target, fn, fn1) {


		$(imgid).bind("click", function() {
			$("#upload_img").find(".modal-title").html("图片上传");
			$("#targetform").html($("#targetform").attr("data"));
			$("#targetform").closest(".modal-body").find(".modal-footer").hide();
			$("#form2").attr("action", "/controller/uploadfm/2105")
			var iframe = document.getElementById('iframe1');

			if (iframe.attachEvent) {
				iframe.attachEvent("onload", function() {
					var ipurl = window.ipurl;
					var xdurl = window.xdurl;
					var filesize = window.filesize;
					if (ipurl == undefined || ipurl == "") {
						return;
					}
					if (target != "" && target != null) {

						$(target).attr("src", ipurl);
						$(target).attr("data", xdurl);
					}
					$("#upload_img").modal("hide");
					//$("#targetform").html($("#targetform").attr("data"));
					var tempthis = $(imgid);
					var _title = $("#targetform").attr("imgtitle");
					if (fn != null && ipurl != undefined) {
						fn.apply(tempthis, [ipurl, xdurl, _title, filesize]);

					}
					window.ipurl = "";
					window.xdurl = "";

				});

			} else {

				iframe.onload = function() {

					var ipurl = window.ipurl;
					var xdurl = window.xdurl;
					var filesize = window.filesize;
					if (ipurl == undefined || ipurl == "") {
						return;
					}
					if (target != "" && target != null) {

						$(target).attr("src", ipurl);
						$(target).attr("data", xdurl);
					}
					$("#upload_img").modal("hide");
					//$("#targetform").html($("#targetform").attr("data"));
					var tempthis = $(imgid);
					var _title = $("#targetform").attr("imgtitle");
					if (fn != null) {
						fn.apply(tempthis, [ipurl, xdurl, _title, filesize]);

					}
					window.ipurl = "";
					window.xdurl = "";


				};

			}

			$("#upload_iframe").unbind().bind("click", function() {
				if ($(".imgfile").val() == "") {
					alert("请选择图片");
					return;
				}
				var str = $(".imgfile").val();
				//if(str.lastIndexOf("jpg")>-1||str.lastIndexOf("gif")>-1||str.lastIndexOf("png")>-1)
				if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|bmp)$/.test(str)) {} else {
					alert("请选择图片文件");
					return;
				}
				$("#targetform").attr("data", $("#targetform").html());

				var ifm = document.getElementById("iframe1");
				window.document.getElementById('iframe1').contentWindow.document.body.innerHTML = "";
				var tempobj = $("#form2");

				$(window.document.getElementById('iframe1').contentWindow.document.body).html(tempobj);
				window.document.getElementById('iframe1').contentWindow.document.getElementById("form2").submit();
				console.log(window.document.getElementById('iframe1').contentWindow.document);
			});
			$(".imgfile").unbind().bind("change", function() {
				var str = $(this).val();
				//if(str.lastIndexOf("jpg")>-1||str.lastIndexOf("gif")>-1||str.lastIndexOf("png")>-1)
				if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|bmp)$/.test(str)) {} else {
					alert("请选择图片文件");
					return;
				}

				$("#targetform").attr("imgtitle", str);
			});

			if (typeof(fn1) == "function") {
				var flag = fn1.apply(this, []);
				if (flag == false) {
					return;
				}
			}
			$("#upload_img").modal("show");
		});
	}

	function showUpdateimgModal(target, _aspectRatio, fn, fn1) {
		$("#upload_img").find(".modal-title").html("图片上传");
		$("#targetform").html($("#targetform").attr("data"));
		$("#targetform").data("targetform-uploadinput", $("#targetform-uploadinput").html());

		var iframe = document.getElementById('iframe1');
		if (iframe.attachEvent) {
			iframe.attachEvent("onload", function() {

				var ipurl = window.ipurl;
				var xdurl = window.xdurl;
				if (ipurl == undefined || ipurl == "") {
					return;
				}
				if (target != "" && target != null) {

					$(target).attr("data", xdurl);
					$(target).attr("src", ipurl);
				}
				$("#upimg-caijian").attr("src", ipurl);
				$("#upimg-caijian").attr("data", xdurl);
				$('#upimg-caijian').Jcrop({
					onSelect: updateCoords,
					aspectRatio: _aspectRatio

				});
				$("#targetform").closest(".modal-body").find(".modal-footer").show();
				var _title = $("#targetform").attr("imgtitle");
				if (fn != null) {
					fn.apply(target, [ipurl, xdurl, _title]);
				}
				window.ipurl = "";
				window.xdurl = "";
				//$("#targetform").html($("#targetform").attr("data"));
				$("#targetform-uploadinput").html($("#targetform").data("targetform-uploadinput"));
			});

		} else {

			iframe.onload = function() {

				var ipurl = window.ipurl;
				var xdurl = window.xdurl;
				if (ipurl == undefined || ipurl == "") {
					return;
				}
				if (target != "" && target != null) {

					$(target).attr("data", xdurl);
					$(target).attr("src", ipurl);
				}
				$("#upimg-caijian").attr("src", ipurl);
				$("#upimg-caijian").attr("data", xdurl);
				$('#upimg-caijian').Jcrop({
					onSelect: updateCoords,
					aspectRatio: _aspectRatio

				});
				$("#targetform").closest(".modal-body").find(".modal-footer").show();
				var _title = $("#targetform").attr("imgtitle");
				if (fn != null) {
					fn.apply(target, [ipurl, xdurl, _title]);
				}
				window.ipurl = "";
				window.xdurl = "";
				//$("#targetform").html($("#targetform").attr("data"));
				$("#targetform-uploadinput").html($("#targetform").data("targetform-uploadinput"));



			};

		}

		$("#upload_iframe").unbind().bind("click", function() {
			if ($(".imgfile").val() == "") {
				alert("请选择图片");
				return;
			}
			var str = $(".imgfile").val();
			//if(str.lastIndexOf("jpg")>-1||str.lastIndexOf("gif")>-1||str.lastIndexOf("png")>-1)
			if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|bmp)$/.test(str)) {} else {
				alert("请选择图片文件");
				return;
			}
			$("#targetform").attr("data", $("#targetform").html());

			var ifm = document.getElementById("iframe1");
			window.document.getElementById('iframe1').contentWindow.document.body.innerHTML = "";
			var tempobj = $("#form2");

			$(window.document.getElementById('iframe1').contentWindow.document.body).html(tempobj);
			window.document.getElementById('iframe1').contentWindow.document.getElementById("form2").submit();
		});
		$(".imgfile").off().on("change", function() {
			var str = $(this).val();
			//if(str.lastIndexOf("jpg")>-1||str.lastIndexOf("gif")>-1||str.lastIndexOf("png")>-1)
			if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|bmp)$/.test(str)) {} else {
				alert("请选择图片文件");
				return;
			}
			$("#targetform").closest(".modal-body").find(".modal-footer").hide();
			$("#targetform").closest(".modal-body").find(".modal-footer").html($("#targetform").closest(".modal-body").find(".modal-footer").data("html"));
			bindcaijian(fn1, target);
			$("#targetform").attr("imgtitle", str);
		});

		$("#targetform").closest(".modal-body").find(".modal-footer").hide();
		$("#targetform").closest(".modal-body").find(".modal-footer").html($("#targetform").closest(".modal-body").find(".modal-footer").data("html"));
		bindcaijian(fn1, target);

		$("#upload_img").modal("show");
	}

	function bindcaijian(fn, target) {
		$("#caijian").unbind("click.ci").bind("click.ci", function() {

			var _x = $('#id-x').val();
			var _y = $('#id-y').val();
			var _w = $('#id-w').val();
			var _h = $('#id-h').val();
			if (_x == "") {
				alert("请在上图中裁剪");
				return;
			}
			var imgurl = $("#upimg-caijian").attr("src");
			var maxw = $("#upimg-caijian").width();
			var maxh = $("#upimg-caijian").height();
			fn.apply(target, [_x, _y, _w, _h, maxw, maxh, imgurl]);
		});
	}

	function updateCoords(c) {
		$('#id-x').val(c.x);
		$('#id-y').val(c.y);
		$('#id-w').val(c.w);
		$('#id-h').val(c.h);

	}

	function GetLength(str) {
		///<summary>获得字符串实际长度，中文2，英文1</summary>

		///<param name="str">要获得长度的字符串</param>

		var realLength = 0,
			len = str.length,
			charCode = -1;
		for (var i = 0; i < len; i++) {
			charCode = str.charCodeAt(i);
			if (charCode >= 0 && charCode <= 128) realLength += 1;
			else realLength += 2;
		}
		return realLength;
	};
	exports.startLoading = function() {
		if ($(".crm-loading-background")[0] != null)
			return;
		var background = $("<div/>").attr("class", "crm-loading-background").appendTo("body");
		var img = $("<img/>").attr({
			"src": "../../images/pageloading.gif",
			"class": "loading-icon"
		}).appendTo(background);
	}
	exports.endLoading = function() {
			$(".crm-loading-background").remove();
		}
		//表格中分页查询加载动画
	exports.startLoadingInTable = function(obj) {
		if ($(".loading-icon-intable")[0] != null)
			return;
		//var background=$("<div/>").attr("class","crm-loading-background-intable").appendTo("body");
		var _obj = $(obj).addClass("tableRelative");
		var img = $("<img/>").attr({
			"src": "../../images/pageloadingInTable.gif",
			"class": "loading-icon-intable"
		}).appendTo(_obj);
	}
	exports.endLoadingInTable = function() {
		if ($(".tableRelative")[0] != null) {
			$(".table").removeClass("tableRelative");
		}
		$(".loading-icon-intable").remove();
	}
	Date.prototype.Format = function(fmt) { //author: meizz 
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}

	function showImage(bntId, fn) {
		$(bntId).unbind().bind("change", function() {
			$(bntId).parent().parent().find(".img-wrap").html("");
			var files = !!this.files ? this.files : [];
			if (!files.length || !window.FileReader)
				return;
			var name = files[0].name;
			if (name.indexOf(".png") < 0 && name.indexOf(".jpeg") < 0 && name.indexOf(".jpg") < 0 && name.indexOf(".bmp") < 0) {
				alert("请选择图片");
			} else {
				if (/^image/.test(files[0].type)) {
					var reader = new FileReader();
					reader.readAsDataURL(files[0]);
					reader.onloadend = function() {
						var _sp = $('<span class="img-out" style="position: relative;width: 80px;height: 80px;display: inline-block;margin: 0 7px 0px 0;"></span>');
						var _Close = $('<b class="close-img-up" style="position: absolute;right: -4px;top: -10px;display: inline-block;width: 20px;height: 20px;background: red;border-radius: 50%;text-align: center;font-size: 18px;font-weight: bold;line-height: 20px;color: #fff;">×</b>');
						var _img = $('<img src="" class="wf-new" style="width:100%;height:100%">');

						_img.attr("src", this.result);
						// _sp.append(_Close).append(_img);
						_sp.append(_img);
						var tempdata = this.result;

						tempdata = tempdata.split("base64,");
						$(bntId).parent().parent().find(".img-wrap").append(_sp);
						//designAction.request_list(this.result,_sp);
						if (fn) {
							fn.apply(this, [this.result, _sp]);

						}
						// $(".active").find("img").attr("data", tempdata[1]);
						//fn(tempdata[1]);

						closeImg();
					};
				}
			}

		});

	}

	function closeImg() {
		$(".close-img-up").click(function() {
			$(this).parent().remove();
		})
	}

	module.exports.showWarning = showWarning = function(obj) {
		$(".warning-pop-shadow").show();
		$(".waring-desc").html(obj.desc);
		$(".btn-work-waring").html(obj.btnval);
		$(".btn-work-waring").unbind().bind("click", function() {

			$(".warning-pop-shadow").hide();
			$(".body-wrap").css("pointer-events", "auto");
			if (obj.waringFn) {
				obj.waringFn.apply(this, []);
			}
		});
		$(".body-wrap").css("pointer-events", "none");

	}

	function uuid() {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = "-";

		var uuid = s.join("");
		return uuid;
	}

	var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

	function generateMixed(n) {
		var res = "";
		for (var i = 0; i < n; i++) {
			var id = Math.ceil(Math.random() * 35);
			res += chars[id];
		}
		return res;
	}
	var chars1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	function generateMixedTEST(n) {
		var res = "";
		for (var i = 0; i < n; i++) {
			var id = Math.ceil(Math.random() * 9);
			res += chars1[id];
		}
		return res;
	}

	function getid() {
		return "ID__" + generateMixedTEST(6) + "_" + Date.parse(new Date());
	}
	pubFn.intnum();
	pubFn.floatnum();
	exports.pagination = pagination;
	exports.getRadioValue = getRadioValue;
	exports.setRadioValue = setRadioValue;
	exports.clearFormValues = clearFormValues;
	exports.exacttime = exacttime;
	exports.pubFn = pubFn;
	exports.clearcheckBox = clearcheckBox;
	exports.setParentIframeHeight = setParentIframeHeight;
	exports.formDate = formDate;
	exports.formTime = formTime;
	exports.initData = pubFn.initData;
	exports.initDataAppend = pubFn.initDataAppend;
	exports.getodayDate = setvalue;
	exports.binduploadimge = binduploadimge;
	exports.getRadioObj = getRadioObj;
	exports.setdisabled = setdisabled;
	exports.removedisabled = removedisabled;
	exports.showUpdateimgModal = showUpdateimgModal;
	exports.binduploadfile = binduploadfile;
	exports.GetLength = GetLength;
	exports.showImage = showImage;
	exports.uuid = uuid;
	exports.generateMixed = generateMixed;
	exports.getid = getid;
	exports.Base64 = Base64;

});