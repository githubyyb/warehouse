define(function(require, exports, module) {
	var $ = require("jquery");
	var publicJs = require("publicJs");
	var execute = require("execute");

	var designAction = {
		/*请求数据*/
		request_list: function(_src, _name) {
			var request = new Object();
			var body = new Object();
			body.fileInfo = _src;
			body.fileName = _name;
			request.body = body;
			request.async = true;
			request.url = "uploadfm/2105";
			request.handle = this.handle_list;
			execute.execute(request);

		},
		handle_list: function(data) {
			if (data.response_code == '0000') {
				$(".logoimg").attr("src", data.response_body.fileServerUrl+data.response_body.filePath);
				$(".logoimg").attr('url',data.response_body.filePath);
			} else {
				alert(data.response_desc);
			}
		},
	}

	var designUiFn = {
		showImage: function(bntId, imgId, fn) {
			$(bntId).change(function() {
				var tempthis = this;
				var files = !!this.files ? this.files : [];
				if (!files.length || !window.FileReader)
					return;
				var name = files[0].name;
				if (!(/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(name))) {
					alert("请选择图片");
				} else {
					if (/^image/.test(files[0].type)) {
						var reader = new FileReader();
						reader.readAsDataURL(files[0]);
						reader.onloadend = function() {
							$(".img_add").attr("src", this.result);
							// $(".img_add").show();
							designAction.request_list(this.result,name);
						};
					}
				}

			});

		},
	}
	$(document).ready(function() {
		!function (e) { function t(a) { if (i[a]) return i[a].exports; var n = i[a] = { exports: {}, id: a, loaded: !1 }; return e[a].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports } var i = {}; return t.m = e, t.c = i, t.p = "", t(0) }([function (e, t) { "use strict"; Object.defineProperty(t, "__esModule", { value: !0 }); var i = window; t["default"] = i.flex = function (e, t) { var a = e || 100, n = t || 1, r = i.document, o = navigator.userAgent, d = o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i), l = o.match(/U3\/((\d+|\.){5,})/i), c = l && parseInt(l[1].split(".").join(""), 10) >= 80, p = navigator.appVersion.match(/(iphone|ipad|ipod)/gi), s = i.devicePixelRatio || 1; p || d && d[1] > 534 || c || (s = 1); var u = 1, m = r.querySelector('meta[name="viewport"]'); m || (m = r.createElement("meta"), m.setAttribute("name", "viewport"), r.head.appendChild(m)), m.setAttribute("content", "width=device-width,user-scalable=no,initial-scale=" + u + ",maximum-scale=" + u + ",minimum-scale=" + u), r.documentElement.style.fontSize = (window.innerWidth / 750) * a + "px"; }, e.exports = t["default"] }]);
        flex(100, 1);
		$(".submitBtn").click(function(event) {
			// designAction.request_list(this.result,name);
			// console.log(2);
		});
	});
	// designUiFn.showImage("#button1","#item-img1",fn);
	exports.designUiFn = designUiFn;
});