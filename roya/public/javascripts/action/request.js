window.config={
    ajaxUrl:"http://36.152.35.158:10081/nhtml5/",
    // ajaxUrlUpload:"/nhtml5/",
    row:2,
    
}

//console.log=function(){return;};
define("execute",function(require,exports){
    var $ = require("jquery");
 var publicJs = require("publicJs");
 var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
function generateMixed(n) {
     var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
}
var fnlist="1320,1321,1322,1323,1324,";
var kuInsert=0;
var kuObj=new Object();
function execute(obj1){
    (function(k,obj){
            var temparr=[];
    temparr.push(obj.url);
    temparr.push(k);
    
    obj.kuInsert=temparr.join(",");
    kuObj[obj.url]=obj.kuInsert;
    console.log(obj.kuInsert);
    if(obj.async==true)
    {
        publicJs.startLoading();
    }
    var _type="POST";
    var tokent=window.localStorage.getItem("ssotokent");
    if(obj.type=="GET")
    {
        _type="GET";
    }
    var _isasync=true;
    if(obj.isasync==false)
    {
        _isasync=false;
    }
    
    var jsonobj=new Object();
    var configUrl=window.config.ajaxUrl;
    obj.decodeKey=generateMixed(256);
    try{
    if(window.vwtSecurityJSNew!=undefined){
    jsonobj.user_id=vwtSecurityJSNew.getMemberId();
    
    if(fnlist.indexOf(obj.url)>-1)
    {
        jsonobj.request_body=vwtSecurityJSNew.encodeRSA(JSON.stringify(obj.body));
        jsonobj.decodeKey=obj.decodeKey;
    }else{
        jsonobj.request_body=vwtSecurityJSNew.encodeAES(JSON.stringify(obj.body));
    }
    jsonobj.client_version=vwtSecurityJSNew.getVersion();
    jsonobj.requestSource=true;
    }else if(window.vwtSelf!=undefined)
    {
        jsonobj.user_id=vwtSelf.getUserId();
        
        if(fnlist.indexOf(obj.url)>-1)
        {
            jsonobj.request_body=vwtSelf.encryptWithKey(JSON.stringify(obj.body),obj.decodeKey);
                            jsonobj.decodeKey=obj.decodeKey;
        }else{
            jsonobj.request_body=vwtSelf.encrypt(JSON.stringify(obj.body));
        }
        jsonobj.requestSource=true;
        jsonobj.client_version=vwtSelf.getVersion();
    }else{
        /*jsonobj.request_body=obj.body;
        jsonobj.user_id="";
        jsonobj.client_version="";*/
        jsonobj.request_body=obj.body;
    }
    }catch(e)
    {
        /*jsonobj.request_body=obj.body;
        jsonobj.user_id="";
        jsonobj.client_version="";*/
        jsonobj.request_body=obj.body;
    }
//alert("请求:"+JSON.stringify(jsonobj));
    $.ajax({
        target:obj,
        url: configUrl+obj.url,
        async:_isasync,
         headers:{
            "x-access-token":tokent
        },
        type: _type,
        data: JSON.stringify(jsonobj),
        dataType: "json",
        contentType:"application/json",
        success: function(data){
            try{
            //alert("返回:"+JSON.stringify(data));
            var temp=data.response_body;
            if(window.vwtSecurityJSNew!=undefined){
            //if(jsonobj.user_id=="0"||jsonobj.user_id=="")
                if(fnlist.indexOf(this.target.url)>-1)
                {
                    temp=vwtSecurityJSNew.decodeAESNew(data.response_body,this.target.decodeKey);
                }else{
                    temp=vwtSecurityJSNew.decodeAES(data.response_body);
                }
                                    // alert("androd:"+temp);
                temp=JSON.parse(temp);
            }else if(window.vwtSelf!=undefined)
            {
                //if(jsonobj.user_id=="0"||jsonobj.user_id=="")
                if(fnlist.indexOf(this.target.url)>-1)
                {
                    temp=vwtSelf.decryptWithKey(data.response_body,this.target.decodeKey);
                }else{
                    temp=vwtSelf.decrypt(data.response_body);
                }
                temp=JSON.parse(temp);
            }
            data.response_body=temp;
            }catch(e){
//alert(e);
            }
            if(this.target.async==true)
            {
                publicJs.endLoading();
            }
            if(this.target.kuInsert==kuObj[this.target.url])
            {
                    this.target.handle(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if(XMLHttpRequest.status==0)
            {
                 publicJs.endLoading();
                 return;
            }

             if(this.target.async==true)
            {
                publicJs.endLoading();
                alert("服务或网络异常");
            }
            
            if(XMLHttpRequest.status==401)
            {
                alert("登录超时",function(){
                    var str=window.location.href;
                        window.location.href="../autoCreate/login.html?redirect="+str;
                        
                });
            }
            
            if(typeof(this.target.errHandle)=="function")
            {
                this.target.errHandle();
            }
        }
        });
    })(++kuInsert,obj1);
    
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

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
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
 function formatUrl()
{
    console.log(history);
     var state = {
            title: document.title,
            url: document.location.href,
            otherkey: null
        };
        var s=document.location.search;
        console.log(s.indexOf('%3C'));
        s=s.replace(/%3C/g,'&lt;').replace(/%3E/g,'&gt;');
        console.log(s);
      history.replaceState(state, document.title, document.location.href.replace(document.location.search,s));
      
}
if(GetQueryString("FromUserTelNum")!=null){
        window.localStorage.setItem("FromUserTelNum",GetQueryString("FromUserTelNum"));
}
if(GetQueryString("FromUserId")!=null){
        window.localStorage.setItem("FromUserId",GetQueryString("FromUserId"));
}
if(GetQueryString("m_id")!=null){
        window.localStorage.setItem("m_id",GetQueryString("m_id"));
      window.localStorage.setItem("FromUserId",GetQueryString("m_id"));
}
if(GetQueryString("m_telNum")!=null){
        window.localStorage.setItem("m_telNum",GetQueryString("m_telNum"));
      window.localStorage.setItem("FromUserTelNum",GetQueryString("m_telNum"));
}
try{
if(window.vwtSecurityJSNew!=undefined){
    var user_id=vwtSecurityJSNew.getMemberId();
    var tel_num=vwtSecurityJSNew.getPhoneNum();
     window.localStorage.setItem("FromUserTelNum",tel_num);
     window.localStorage.setItem("FromUserId",user_id);
}else if(window.vwtSelf!=undefined){
    var user_id=vwtSelf.getUserId();
    var tel_num=vwtSelf.getTelNumber();
     window.localStorage.setItem("FromUserTelNum",tel_num);
     window.localStorage.setItem("FromUserId",user_id);
}	
}catch(e){}
$(document).ready(function() {
    formatUrl();
    $(".body-wrap").css({"min-height":$(window).height()+"px"});		
});
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

function gt_ios9() {
      // 判断是否 iPhone 或者 iPod
      if((navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))) {
          // 判断系统版本号是否大于 4
          return Boolean(navigator.userAgent.match(/OS [9]_\d[_\d]* like Mac OS X/i));
      } else {
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
});




