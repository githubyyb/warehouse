 window.config={
		ajaxUrl:"http://223.112.11.8:1111/controller/",
		row:10
   }

// window.console=new Object();
// console.log=function(){return;}
define("execute",function(require,exports){
   	 var $ = require("jquery");
	 var publicJs = require("publicJs");
	 
    function execute(obj) {
        if(obj.async==true)
        {
            publicJs.startLoading();
        }
		var sessionid=window.localStorage.getItem("sessionid");
		obj.body.sessionid=sessionid;
		var _type="POST";
		if(obj.type=="GET")
		{
			_type="GET";
		}
		var _isasync=true;
		if(obj.isasync==false)
		{
			_isasync=false;
		}
		var _jsdata= JSON.stringify(obj.body)
		_jsdata=_jsdata.replace(/<script>/g,'&lt;script&gt;').replace(/<\/script>/g,'&lt;/script&gt;');
        $.ajax({
            url: window.config.ajaxUrl+obj.url,
            async:_isasync,
            type: _type,
            data: _jsdata,
            dataType: "json",
			contentType:"application/json",
            success: function(data){
                if(obj.async==true)
                {
                    publicJs.endLoading();
                }
				
                obj.handle(data);
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
	
	function executePOST(obj) {
        if(obj.async==true)
        {
            publicJs.startLoading();
        }
		var _type="POST";
		if(obj.type=="GET")
		{
			_type="GET";
		}
        $.ajax({
            url: window.config.ajaxUrl+obj.url,
            async: true,
            type: _type,
            data: obj.body,
            success: function(data) {
                if(obj.async==true)
                {
                    publicJs.endLoading();
                }
				
                obj.handle(data);
            },
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				 if(obj.async==true)
                {
                    publicJs.endLoading();
					alert("服务或网络异常");
                }
				if(XMLHttpRequest.status==401)
				{
					/*alert("登录超时，请重新登录",function(){
							top.location.href="../login/index.html";
					});*/
					
				}
				
				if(typeof(obj.errHandle)=="function")
				{
					obj.errHandle();
				}
            }
        });
    }
	function doUpload(formobj,url) { 
		 var formData = new FormData(formobj);  
		 $.ajax({  
			  url: url ,  
			  type: 'POST',  
			  data: formData,  
			  async: false,  
			  cache: false,  
			  contentType: false,  
			  processData: false,  
			  success: function (returndata) {  
			  		console.log(returndata);
				  alert(returndata);  
			  },  
			  error: function (returndata) {  
			 		 console.log(returndata);
				  alert(returndata);  
			  }  
		 });  
	}  
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search).substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    if(GetQueryString("sessionid")!=null){
       	 window.localStorage.setItem("sessionid",GetQueryString("sessionid"));
	}
    
    function clearUrlQuery()
    {
		console.log(history);
         var state = {
                title: document.title,
                url: document.location.href,
                otherkey: null
            };
          history.replaceState(state, document.title, document.location.href.replace(document.location.search,''));
		  
    }
	
				
    /** 手机校验 */
    function isMobile(object) {
        var s = object;
        var reg2 = /^1\d{10}$/;
        var reg3 = /^0\d{11}$/;
        var my = false;
        if (reg2.test(s)) my = true;
        if (reg3.test(s)) my = true;
        if (!my) {
            //alert("您的手机号码格式不正确");
            return false;
        }
        return true;
    }

    /** 邮箱校验 */
    function isMail(object) {
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!reg.test(object)) {
           // alert("您的邮箱格式不正确");
            return false;
        }
        return true;
    }

    /** 校验：只能输入数字、字母、汉字、下滑线 */
    function isInput(object) {
        var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        if (!reg.test(object)) {
            return false;
        }
        return true;
    }
	/*
	 * IP校验
	 */
    function isIp(object) {
        var reg = /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/;
        if (!reg.test(object)) {
            return false;
        }
        return true;
    }
	function isWeiXin(){
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			return true;
		}else{
			return false;
		}
	}
	
    /*
        接口输出
    */
    exports.execute=execute;
	exports.executePOST=executePOST;
    exports.GetQueryString=GetQueryString;
    exports.clearUrlQuery=clearUrlQuery;
    exports.isMobile=isMobile;
    exports.isMail=isMail;
    exports.isInput=isInput;
    exports.isIp=isIp;
	exports.isWeiXin=isWeiXin;
	exports.doUpload=doUpload;
});




