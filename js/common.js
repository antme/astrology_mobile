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


function hasUserInfo(){
	

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
		  
  	  });
	
}
