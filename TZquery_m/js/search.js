$(function(){
  // 点击弹窗
 	$(".btn").click(function(){
 		var txt = $("#txtcon").val();
 		var mask = $(".mask");
 		var la = $(".land_reg");
 		if(txt == ""){
 			Alert("请先输入您要查询的平台名称！");
 		}
 		else{
 			mask.show();
 			la.show();
 		}
 	})
	$(".mask").click(function(){
		$(".mask").hide();
		$(".land_reg").hide();
	});

  // 回车弹窗
  $('#txtcon').focus(); 
    var $inp = $('#txtcon'); 
     
    $inp.keypress(function (e) { 
      var key = e.which; 
      var txt = $("#txtcon").val();
      var mask = $(".mask");
      var la = $(".land_reg");
      if (key == 13) { 
        if(txt == ""){
          Alert("请先输入您要查询的平台名称！");
        }
        else{
          mask.show();
          la.show();
        }
        return false;
      } 
  }); 
  $(".mask").click(function(){
    $(".mask").hide();
    $(".land_reg").hide();
  });

  // 聚焦提示
  $('form :input').blur(function(){ 
      var $parent = $(this).parent(); 
      if($(this).is('#username')){ 
        if($.trim(this.value) == "" || !/^[\u4e00-\u9fa5]{2,4}$/.test($.trim(this.value))){ 
          var errorMsg = '请输入2-5位中文姓名'; 
        }
        else{ 
           var okMsg = '输入正确'; 
           $parent.append('<span class="tip onSuccess">'+ okMsg +'</span>'); 
        } 
      } 

      if($(this).is('#phone')){ 
        if(this.value=="" || (this.value!="" && !/^1[3|4|5|7|8][0-9]{9}$/.test(this.value))){ 
            var errorMsg = '请输入正确的手机号码'; 
            $parent.append('<span class="tip onError">'+ errorMsg +'</span>'); 
        }
        else{ 
            var okMsg = '输入正确'; 
            $parent.append('<span class="tip onSuccess">'+ okMsg +'</span>'); 
        } 
      } 

      if($(this).is('#code')){
       if($.trim(this.value) == "" || !/^\d{6}$/.test($.trim(this.value))){
         var errorMsg = "请输入正确的验证码！";
         $parent.append("<span class='tip onError'>" + errorMsg + "</span>");
       }
       else{
         var okMsg = "输入正确";
         $parent.append("<span class='tip onSuccess'>" + okMsg + "</span>");
       }
     }
  }); 
  //失焦删除内容
  $("form :input").focus(function(){ 
      var $parent = $(this).parent(); 
      $parent.find(".tip").remove(); 
  }); 


  //点击获取按钮
  function Timer(){
    var num = 60;
    var code = $('#btnCode');
    code.attr('disabled','disabled');
    code.addClass('cur');
    var timer = setInterval(function(){
      num--;
      code.val(num+'s');
      if(num==0){
        clearInterval(timer);
        code.removeAttr('disabled')
        code.val('获取验证码');
        code.removeClass('cur');
      }
    },1000)
  }

  // 点击获取验证码
  $('#btnCode').click(function(){
    var phone = $('#phone').val();
    if(!(/^1[34578]\d{9}$/.test(phone))){
      Alert('请输入正确的手机号码');
      return false;
    }
    var data = {
          phoneNum : phone
     };
      // 发送验证码
    $.post("http://vip.cnvppc.cn/index.php/index/sendCode",data,function(msg){
          if(msg.status!=1){
              Alert(msg.msginfo);
              return false;
          }
      })
    Timer();
  });

  // 立即查询
  $("#btn").click(function(){ 
    var a = $("#username").val();
    var b = $("#phone").val();
    var c = $("#code").val();
		var url_page = "http://"+window.location.host;
    var $parent = $(this).parent().parent(); 
    $parent.find(".tip").remove(); 
    $("form :input").trigger('blur'); 
    var numError = $('form .onError').length; 
    if(numError){ 
      return false; 
    };

    $.post("http://vip.cnvppc.cn/index.php/index/postInfo",{
      "mobile":b,
      "name":a,
      "ncode":c,
      "url_page":url_page
    },function(json){
        if(json.status==1){
            $('.mask').hide();
            $('.land_reg').hide();
            Alert("提交成功！")
        }
        else{
            Alert(json.msginfo);
            return false;
        }
    });
  });


  
})
