function GetRequestParameters() {
 var url = location.search; // 获取url中"?"符后的字串
 var theRequest = new Object();
 if (url.indexOf("?") != -1) {
  var str = url.substr(1);
  strs = str.split("&");
  for(var i = 0; i < strs.length; i ++) {
   theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
  }
 }
 return theRequest;
}



function loadUserInfo(){
	
	post_ast_request('/astrology/user/get',{}, function(response){
	
			 $("#name").val(response.name);
			 $("#birthday").val(response.birthDay);
			 $("#address01").val(response.birth_address);
			 $("#address02").val(response.live_address);
			  
			 var sex = response.sex;
			 if(sex == "女"){
				  $("#sexBtn").click();
			 }
		
	});

}

function post_ast_request(url, data, callback){
	
	$.ajax({
		type:"post",
		url:url_path + url,
		dataType: 'jsonp',
		jsonp:"callback",
		data:data,
		success:function(response,status,xhr){
			callback(response);
		},
		error:function(e){
			console.log(e);
		}
		
	});
}

function submitUserInfo(){
	  var birthday = $("#birthday").val();
	  var name = $("#name").val();
	  var address01 = $("#address01").val();
	  var address02 = $("#address02").val();
	  
	  if(name == ""){
		  $.pgwModal({
		    	content: '请输入名字'
		  }); 
		  return;
	  }
	  
	  if(birthday == ""){
		  $.pgwModal({
		    	content: '请输入出生时间'
		  }); 
		  return;
	  }
	  
	  if(address01 == ""){
		  $.pgwModal({
		    	content: '请输入出生地点'
		  }); 
		  return;
	  }
	  
	  if(address02 == ""){
		  $.pgwModal({
		    	content: '请输入居住地点'
		  }); 
		  return;
	  }

	  var data = {
		name:name,
		birthDay:birthday,
		birth_address:address01,
		live_address:address02,
		sex:sex
	  }
  
	  $.post(url_path + '/astrology/user/add',data, function(response){
		  window.location.href="xingpan.html";
  	  });
	
}

function validWeixinUrl(){
	var redirect_url = encodeURIComponent(host+ url_path+"/astrology/redirect/wx");
	var wxurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5dd7a0373f62385b&redirect_uri=" + redirect_url  + "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
	var _wx_id_tst = $.fn.cookie('ast_c_id');
	
	$.fn.cookie('ast_redirect_url',location.href);
	if(!_wx_id_tst && window.location.href.indexOf("ast_redirect")==-1){
		window.location.href = wxurl;
	}
}

function loadWeiXinConfig(){
	
	var url = location.href.split('#')[0];
	post_ast_request("/astrology/redirect/js_sdk", {"url": encodeURIComponent(url)}, function(response){
		
		wx.config({
		    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: response.appId, // 必填，公众号的唯一标识
		    timestamp: response.timestamp, // 必填，生成签名的时间戳
		    nonceStr: response.nonceStr, // 必填，生成签名的随机串
		    signature: response.signature,// 必填，签名，见附录1
		    jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		
		alert(location.href.split('#')[0]);
	
	});
}

