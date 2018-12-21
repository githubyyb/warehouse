define(function (require, exports, module) {
	var $ = require("jquery");
	var execute = require("execute");
	var publicJs = require("publicJs");
	require("bootstrap");
	var total_;
	var page_;

	function binduploadfile(imgid, target, fn, fn1, uploadSrc) {


		$(imgid).bind("click", function () {

			$("#upload_img").find(".modal-title").html("附件上传");
			$("#targetform").html($("#targetform").attr("data"));
			$("#targetform").closest(".modal-body").find(".modal-footer").hide();
			// if (uploadSrc != null) {
			$("#form2").attr("action", "/controller/uploadfm/2105")
			// }
			var iframe = document.getElementById('iframe1');

			if (iframe.attachEvent) {
				iframe.attachEvent("onload", function () {
					var ipurl = window.ipurl;
					var xdurl = window.xdurl;
					var filesize = window.filesize;
					var obj = new Object()
					obj.version = window.versionName;
					obj.packageName = window.package;
					obj.versionCode = window.versionCode;
					if (xdurl == undefined || xdurl == "") {
						return;
					}
					if (target != "" && target != null) {

						$(target).attr("src", ipurl);
						$(target).attr("data", xdurl);
						$(target).attr("size", filesize);
						$(target).attr("version", obj.version);
						$(target).attr("packageName", obj.packageName);
						$(target).attr("versionCode", obj.versionCode);
					}
					$("#upload_img").modal("hide");
					//$("#targetform").html($("#targetform").attr("data"));
					var tempthis = $(imgid);
					var _title = $("#targetform").attr("imgtitle");
					if (fn != null && xdurl != undefined) {
						fn.apply(tempthis, [ipurl, xdurl, _title, filesize, obj]);

					}
					window.ipurl = "";
					window.xdurl = "";
					window.filesize = "";
					window.versionName = "";
					window.package = "";
					window.versionCode = "";

				});

			} else {

				iframe.onload = function () {

					var ipurl = window.ipurl;
					var xdurl = window.xdurl;
					var filesize = window.filesize;
					var obj = new Object()
					obj.version = window.versionName;
					obj.packageName = window.package;
					obj.versionCode = window.versionCode
					if (xdurl == undefined || xdurl == "") {
						return;
					}
					if (target != "" && target != null) {

						$(target).attr("src", ipurl);
						$(target).attr("data", xdurl);
						$(target).attr("size", filesize);
						$(target).attr("version", obj.version);
						$(target).attr("packageName", obj.packageName);
						$(target).attr("versionCode", obj.versionCode);
					}
					$("#upload_img").modal("hide");
					//$("#targetform").html($("#targetform").attr("data"));
					var tempthis = $(imgid);
					var _title = $("#targetform").attr("imgtitle");
					if (fn != null) {
						fn.apply(tempthis, [ipurl, xdurl, _title, filesize, obj]);

					}
					window.ipurl = "";
					window.xdurl = "";
					window.filesize = "";
					window.versionName = "";
					window.package = "";
					window.versionCode = "";


				};

			}

			$("#upload_iframe").unbind().bind("click", function () {
				if ($(".imgfile").val() == "") {
					alert("请选择文件");
					return;
				}
				var str = $(".imgfile").val();
				if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|bmp)$/.test(str)) { } else {
					alert("请选择图片文件");
					return;
				}
				var a = $(".imgfile");
				// if(a[0].files[0].type.indexOf('MP4')==-1||a[0].files[0].type.indexOf('mp4')==-1){
				// 	alert('请选择mp4格式的视频');
				// 	$(".imgfile").val('');
				// 	return;
				// }
				if (a[0].files[0].size > 200 * 1024 * 1024) {
					alert('请选择200M以下附件');
					$(".imgfile").val('');
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
			$(".imgfile").unbind().bind("change", function () {
				var title = $(this).val();
				var strFileName = title.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi, "$1"); //正则表达式获取文件名，不带后缀
				var FileExt = title.replace(/.+\./, ""); //正则表达式获取后缀
				var _title = strFileName + '.' + FileExt
				//if(str.lastIndexOf("jpg")>-1||str.lastIndexOf("gif")>-1||str.lastIndexOf("png")>-1)
				$("#targetform").attr("imgtitle", _title);
				var str = $(".imgfile").val();
				if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|bmp)$/.test(str)) { } else {
					alert("请选择图片文件");
					return;
				}
			});

			if (typeof (fn1) == "function") {
				var flag = fn1.apply(this, []);
				if (flag == false) {
					return;
				}
			}

			$("#upload_img").modal("show");
			
		});
	}
	function binduploadimge(imgid, target, fn, fn1) {
		$(imgid).bind("click", function () {
			$("#upload_img").find(".modal-title").html("图片上传");
			$("#targetform").html($("#targetform").attr("data"));
			$("#targetform").closest(".modal-body").find(".modal-footer").hide();
			$("#form2").attr("action", "/controller/uploadfm/2105")
			var iframe = document.getElementById('iframe1');
			if (iframe.attachEvent) {
				iframe.attachEvent("onload", function () {
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
					if ($('.addImg').attr('src') != '../../images/add1.png') {
						$('.closeImg').css('display', 'inline')
					}
					window.ipurl = "";
					window.xdurl = "";
				});
			} else {
				iframe.onload = function () {
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
					if ($('.addImg').attr('src') != '../../images/add1.png') {
						$('.closeImg').css('display', 'inline')
					}
					window.ipurl = "";
					window.xdurl = "";
				};
			}

			$("#upload_iframe").unbind().bind("click", function () {
				if ($(".imgfile").val() == "") {
					alert("请选择图片");
					return;
				}
				var str = $(".imgfile").val();
				//if(str.lastIndexOf("jpg")>-1||str.lastIndexOf("gif")>-1||str.lastIndexOf("png")>-1)
				if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|bmp)$/.test(str)) { } else {
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
			$(".imgfile").unbind().bind("change", function () {
				var str = $(this).val();
				//if(str.lastIndexOf("jpg")>-1||str.lastIndexOf("gif")>-1||str.lastIndexOf("png")>-1)
				if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|bmp)$/.test(str)) { } else {
					alert("请选择图片文件");
					return;
				}

				$("#targetform").attr("imgtitle", str);
			});

			if (typeof (fn1) == "function") {
				var flag = fn1.apply(this, []);
				if (flag == false) {
					return;
				}
			}
			$("#upload_img").modal("show");
		});
	}

	var portalsManage = {
		/*查询列表*/
		request_query: function (page, limit) {
			var request = new Object();
			var body = new Object();
			var _label;
			var _syxd;
			var _syxk;
			body.pageNum = page;
			page_ = page
			body.pageSize = limit || 10;
			if ($("#appLabel").val() == 0) {
				_label = ''
			} else {
				_label = $("#appLabel").val();
			}
			if ($("#syxd").val() == 0) {
				_syxd = ''
			} else {
				_syxd = $("#syxd").val();
			}
			if ($("#syxk").val() == 0) {
				_syxk = ''
			} else {
				_syxk = $("#syxk").val();
			}
			body.name = $("#appName").val() || "";
			body.label = _label || "";
			body.supplier = $("#appSupplier").val() || "";
			body.fitSection = _syxd || "";
			body.fitSubject = _syxk || "";
			request.body = body;
			request.url = "16102";
			request.handle = this.handle_query;
			execute.execute(request);
		},
		handle_query: function (data) {
			if (data.response_code == "0000") {
				page_size = this.body.pageSize
				var _Data = []
				for (var i = 0; i < data.response_body.list.length; i++) {
					var obj = new Object();
					obj.id = data.response_body.list[i].id;
					obj.name = data.response_body.list[i].name;
					obj.logo = data.response_body.list[i].logo;
					obj.sellPoint = data.response_body.list[i].sellPoint;
					obj.label = data.response_body.list[i].label;
					obj.supplier = data.response_body.list[i].supplier;
					obj.score = data.response_body.list[i].score;
					obj.fitSection = data.response_body.list[i].fitSection;
					obj.fitSubject = data.response_body.list[i].fitSubject;
					obj.shortDesc = data.response_body.list[i].shortDesc;
					obj.screenshot = data.response_body.list[i].screenshot;
					obj.sort = (this.body.pageNum - 1) * this.body.pageSize + i + 1;
					_Data.push(obj);
				}
				total_ = data.response_body.total
				publicJs.initData("#check_list_template", _Data, "#check_tb");
				layui.use('laypage', function () {
					var laypage = layui.laypage;
					//执行一个laypage实例
					var dataObj = new Object();
					laypage.render({
						jump: function (obj, first) {
							//首次不执行
							dataObj.limit_enterprise = obj.limit;
							dataObj.page_enterprise = obj.curr;
							if (!first) {
								portalsManage.request_query(obj.curr, obj.limit);
							}

						},
						elem: 'pages' //注意，这里的 test1 是 ID，不用加 # 号
						, count: total_ //数据总数，从服务端得到
						, limit: dataObj.limit_enterprise
						// , curr: dataObj.page_enterprise
						, curr: page_
						, layout: ['count', 'prev', 'page', 'next', 'skip'],
					});
				});
				//修改按钮-查看详情
				$(".edit_").unbind().bind('click', function () {
					var id = '';
					id = $(this).parent().parent().attr('trid');
					$('#addconfirm').attr('btnid', id);
					$('.imgspan').remove();
					portalsManage.request_details(id);
					$('#addpeople').modal('show');

				});
				//删除按钮
				$(".delete_").unbind().bind('click', function () {
					var msg = "确认删除?";
					if (confirm(msg) == true) {
						var id = $(this).parent().parent().attr('trid');
						portalsManage.request_delete(id);
					} else {
						return
					}
					// confirm('确认删除?', function (choose) {
					// 	if (choose) {
					// 	} else {
					// 		return;
					// 	}
					// })
				});
			} else {
				alert(data.response_desc)
			}
		},
		//查看详情
		request_details: function (id) {
			var request = new Object();
			var body = new Object();
			body.id = id;
			request.body = body;
			request.url = "16101";
			request.handle = portalsManage.handle_details;
			execute.execute(request);
		},
		handle_details: function (data) {
			if (data.response_code == "0000") {
				$('#app_name').val(data.response_body.name);
				if (data.response_body.logo != '') {
					// $('.addImg').attr('src', window.location+data.response_body.logo);
					$('.addImg').attr('src', data.response_body.logo);
					$('.addImg').attr('url','/'+data.response_body.logo.split('//')[2]);
					$('.closeImg').css('display', 'inline')
					$(".closeImg").unbind().bind('click', function () {
						$('.addImg').attr('src', '../../images/add1.png')
						$(".closeImg").css('display', 'none')
					})
				} else {
					$('.addImg').attr('src', '../../images/add1.png');
					$('.addImg').attr('url', '');
					$('.closeImg').css('display', 'none')
				}
				$('.app_md').val(data.response_body.sellPoint);
				if (data.response_body.score <= 2) {
					var score_ = 1;
				} else if (data.response_body.score > 2 && data.response_body.score <= 4) {
					var score_ = 2;
				} else if (data.response_body.score > 4 && data.response_body.score <= 6) {
					var score_ = 3;
				} else if (data.response_body.score > 6 && data.response_body.score <= 8) {
					var score_ = 4;
				} else {
					var score_ = 5;
				}
				var radiolist = $('input[name=score]')
				for (var i = 0; i < radiolist.length; i++) {
					if (radiolist[i].value == score_) {
						radiolist[i].checked = 'checked';
					}
				}
				$('#app_supplier').val(data.response_body.supplier);
				$('#app_label option:contains(' + data.response_body.label + ')').each(function () {
					if ($(this).text() == data.response_body.label) {
						$(this).attr('selected', true);
					}
				})
				$('#syxd_ option:contains(' + data.response_body.fitSection + ')').each(function () {
					if ($(this).text() == data.response_body.fitSection) {
						$(this).attr('selected', true);
					}
				})
				$('#syxk_ option:contains(' + data.response_body.fitSubject + ')').each(function () {
					if ($(this).text() == data.response_body.fitSubject) {
						$(this).attr('selected', true);
					}
				})

				$('.app_jj').val(data.response_body.shortDesc);
				if (data.response_body.screenshot != '') {
					var screenshot_ = data.response_body.screenshot.split(',')
					for (var i = 0; i < screenshot_.length; i++) {
						var o = screenshot_[i];
						// var fjDiv = $("<div class='fujian-div'><div>");
						var spanobj = $("<span class='imgspan'></span>");
						// var _img = $("<img src='" + ipurl + "' style='width:50px;height:50px'/>");
						// var temparr = _title.split("\\");

						var _name = $("<img src=" + o + " class='addimgjt' data='" + o + "' url='/"+o.split('//')[2]+"'/>")
						// var _name = $("<div class='fj-name' title='" + temparr + "'>" + temparr + "</div>");
						$(spanobj).append(_name);
						var imgobj = $("<img src='../../images/dh_cancle.png' class='imgspan-img' />");
						// var imgdata = new Object();
						// imgdata.ipurl = ipurl;
						// imgdata.xdurl = xdurl;
						// imgdata.size = _size;
						// imgdata.name = temparr[temparr.length - 1];
						// $(imgobj).data("url", imgdata);
						$(spanobj).append(imgobj);
						// $(this).closest("div").append(spanobj);
						$('.fujian-span').closest("div").append(spanobj);
						$(".imgspan-img").unbind().bind("click", function () {
							$(this).closest("span").remove();
						});
					}

				}

			} else {
				alert(data.response_desc);
			}
		},
		//标签接口
		request_label: function () {
			var request = new Object();
			var body = new Object();
			request.body = body;
			request.url = "16105";
			request.handle = this.handle_label;
			execute.execute(request);
		},
		handle_label: function (data) {
			if (data.response_code == "0000") {
				var label_arr = [];
				for (var key in data.response_body.label) {
					var obj = new Object();
					obj.value = key;
					obj.text = data.response_body.label[key];
					label_arr.push(obj)
				}

				var fitSection_arr = []
				for (var key in data.response_body.fitSection) {
					var obj = new Object();
					obj.value = key;
					obj.text = data.response_body.fitSection[key];
					fitSection_arr.push(obj)
				}
				var fitSubject_arr = []
				for (var key in data.response_body.fitSubject) {
					var obj = new Object();
					obj.value = key;
					obj.text = data.response_body.fitSubject[key];
					fitSubject_arr.push(obj)
				}

				publicJs.initData('#label_list', label_arr, '#appLabel');
				publicJs.initData('#label_list', fitSection_arr, '#syxd');
				publicJs.initData('#label_list', fitSubject_arr, '#syxk');
				publicJs.initData('#label_list', label_arr, '#app_label');
				publicJs.initData('#label_list', fitSection_arr, '#syxd_');
				publicJs.initData('#label_list', fitSubject_arr, '#syxk_');
			} else {
				alert(data.response_desc);
			}
		},
		//新增
		request_add: function (obj) {
			var request = new Object();
			request.body = obj;
			request.url = "16103";
			request.handle = portalsManage.handle_add;
			execute.execute(request);
		},
		handle_add: function (data) {
			if (data.response_code == "0000") {
				alert('新建成功');
				$('#addpeople').modal('hide');
				portalsManage.request_query(1);
			} else {
				alert(data.response_desc);
			}
		},
		//修改
		request_edit: function (obj) {
			var request = new Object();
			request.body = obj;
			request.url = "16103";
			request.handle = portalsManage.handle_edit;
			execute.execute(request);
		},
		handle_edit: function (data) {
			if (data.response_code == "0000") {
				alert('修改成功');
				$('#addpeople').modal('hide');
				portalsManage.request_query(1);
			} else {
				alert(data.response_desc);
			}
		},
		//删除
		request_delete: function (id) {
			var request = new Object();
			var body = new Object();
			body.id = id;
			request.body = body;
			request.url = "16104";
			request.handle = portalsManage.handle_delete;
			execute.execute(request);
		},
		handle_delete: function (data) {
			if (data.response_code == "0000") {
				alert('删除成功');
				portalsManage.request_query(1);
			} else {
				alert(data.response_desc);
			}
		},


	}



	$(document).ready(function () {

		portalsManage.request_query(1);
		setTimeout(function () {
			portalsManage.request_label();
		}, 200)


		//弹窗'X'按钮
		$(".modal_close").unbind().bind('click', function () {
			$('#addpeople').modal('hide');
		});
		//图片上传
		binduploadfile(
			".fujian-span",
			null,
			function (ipurl, xdurl, _title, _size) {
				var fjDiv = $("<div class='fujian-div'><div>");
				var spanobj = $("<span class='imgspan'></span>");
				var _img = $("<img src='" + ipurl + "' style='width:50px;height:50px'/>");
				var temparr = _title.split("\\");

				var _name = $("<img src='" + ipurl + "' class='addimgjt' data='" + xdurl + "' url='" + xdurl + "'/>")
				// var _name = $("<div class='fj-name' title='" + temparr + "'>" + temparr + "</div>");
				$(spanobj).append(_name);
				var imgobj = $("<img src='../../images/dh_cancle.png' class='imgspan-img' />");
				var imgdata = new Object();
				imgdata.ipurl = ipurl;
				imgdata.xdurl = xdurl;
				imgdata.size = _size;
				imgdata.name = temparr[temparr.length - 1];
				$(imgobj).data("url", imgdata);
				$(spanobj).append(imgobj);
				$(this).closest("div").append(spanobj);
				$(".imgspan-img").unbind().bind("click", function () {
					$(this).closest("span").remove();
				});
			},
			function () {
				var arr = $(".imgspan");
				if (arr.length == 10) {
					alert("附件上传不得超过10个");
					return false;
				}
				return true;
			}
		);
		//查询按钮
		$("#query").unbind().bind('click', function () {
			portalsManage.request_query(1);
		});
		binduploadimge(".addImg", ".addImg", function (ipurl, xdurl, _title, filesize) {
			$(".addImg").attr('url', xdurl);
		});


		//新增按钮
		$("#addBtn").unbind().bind('click', function () {
			$('#app_name').val('');
			$('.addImg').attr('src', '../../images/add1.png');
			$('.app_md').val('');
			$('input[name=score]').attr('checked', false);
			$('#app_supplier').val('');
			$('#app_label').val('');
			$('#syxd_').val('');
			$('#syxk_').val('');
			$('.app_jj').val('');
			$("#upload_img").modal("hide");
			$(".closeImg").css('display', 'none')
			$('#addpeople').modal('show');

			$('.imgspan').each(function () {
				$(this).remove();
			});
			$(".closeImg").unbind().bind('click', function () {
				$('.addImg').attr('src', '../../images/add1.png')
				$(".closeImg").css('display', 'none')
			})

			$('#addconfirm').attr('btnid', '');

		});
		//提交按钮
		$("#addconfirm").unbind().bind('click', function () {
			if ($('#app_name').val() == '') {
				alert('请输入应用名称');
				return;
			}
			if ($('.app_md').val() == '') {
				alert('请输入应用卖点');
				return;
			}
			if ($('#app_label').val() == 0) {
				alert('请选择应用标签');
				return;
			}
			var radiolist = $('input[name=score]')
			var flags = false;
			for (var i = 0; i < radiolist.length; i++) {
				if (radiolist[i].checked == true) {
					flags = true;
				}
			}
			if (flags == false) {
				alert("请选择评分")
				return;
			}
			if ($('#syxd_').val() == 0) {
				alert('请选择适用学段');
				return;
			}
			if ($('#syxk_').val() == 0) {
				alert('请选择适用学科');
				return;
			}
			var obj = new Object();
			obj.name = $('#app_name').val();
			if ($('.addImg').attr('src') == '../../images/add1.png') {
				obj.logo = ''
			} else {
				obj.logo = $('.addImg').attr('url')
			}
			obj.sellPoint = $('.app_md').val();
			if ($('input[name=score]:checked').val() == 1) {
				obj.score = 2;
			} else if ($('input[name=score]:checked').val() == 2) {
				obj.score = 4;
			} else if ($('input[name=score]:checked').val() == 3) {
				obj.score = 6;
			} else if ($('input[name=score]:checked').val() == 4) {
				obj.score = 8;
			} else {
				obj.score = 10;
			}
			obj.supplier = $('#app_supplier').val();
			obj.label = $('#app_label').val();
			obj.fitSection = $('#syxd_').val();
			obj.fitSubject = $('#syxk_').val();
			obj.shortDesc = $('.app_jj').val();
			obj.screenshot = '';
			$('.imgspan').each(function () {
				obj.screenshot += $(this).find('.addimgjt').attr('url') + ',';
			});
			if ($(this).attr('btnid') == '') {
				portalsManage.request_add(obj);
			} else {
				obj.id = $(this).attr('btnid');
				portalsManage.request_edit(obj);
			}
		});
		//重置按钮
		$("#reset").unbind().bind('click', function () {
			$('#appName').val('');
			$('#appLabel').val('');
			$('#appSupplier').val('');
			$('#syxd').val('');
			$('#syxk').val('');
		})
	});
});