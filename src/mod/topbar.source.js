// 金鹰网公共topbar效果
// Ming 12.18/2012

honey.def(function(H) {

	H.topbar = {
		login_ref: window.location.href,
		logout_href: 'http://spp.hunantv.com/passport/service.php?action=logout&ref='+encodeURIComponent(window.location.href),
		i: 'http://i.hunantv.com',
		init: function() {
			var owner = this;
			// 登录后的回跳地址
			$('#top-login-ref').val(this.login_ref);
			// 给表单绑定验证事件
			$('#top-login-form').submit(function() {
				return owner.loginValidate();
			});
			// 请求接口判断用户状态
			var ticket = this.getCookie('TICKET');
			$.getJSON('http://app.i.hunantv.com/api/newuserstatus/?jsoncallback=?', function(json) {
				if (json.status == 200) {
					if (ticket == null || json.result.userinfo == null) {
						$('#not-login').show();
						$('#top-not-verify').hide();
						$('#top-is-login').hide();
					} else if (json.result.userinfo == false) {
						if (ticket) {
							var nickname = owner.getCookie('uid');
							$('#top-not-verify').html('<span><a href="'+owner.i+'" target="_blank">'+nickname+'</a> <a href="'+owner.i+'" target="_blank">完善资料</a>，关注你喜欢的<b>|</b><a href="'+owner.logout_href+'">安全退出</a></span>');
						} else {
							$('#top-not-verify').html('<span><a href="'+owner.i+'" target="_blank">金鹰网网友</a> <a href="'+owner.i+'" target="_blank">完善资料</a>，关注你喜欢的<b>|</b><a href="'+owner.logout_href+'">安全退出</a></span>');
						}
						$('#not-login').hide();
						$('#top-not-verify').show();
						$('#top-is-login').hide();
					} else {
						$('#not-login').hide();
						$('#top-not-verify').hide();
						var d = '<span>您好，<a href="'+owner.i+'" target="_blank">'+json.result.userinfo.username+'</a><b>|</b><span class="menu"><a id="msg-pm" class="msg-pm" href="'+owner.i+'" target="_blank">'+json.result.userinfo.msg_total+'</a><div class="menu-pm" id="top-drop-menu" style="display:none;"><div class="h"><span class="name">消息</span></div><div class="c">';
							d += '<ul>';
							d += '<li><a href="'+owner.i+'/message/unread" target="_blank">'+json.result.userinfo.message_count+'</a>查看新私信</li>';
							d += '<li><a href="'+owner.i+'/notice/system" target="_blank">'+json.result.userinfo.sysnotice_count+'</a>查看通知</li>';
							d += '<li><a href="'+owner.i+'/comment" target="_blank">'+json.result.userinfo.comment_count+'</a>查看新评论</li>';
							d += '<li><a href="'+owner.i+'/notice/friendconfirm" target="_blank">'+json.result.userinfo.addfriendnotice_count+'</a>查看好友请求</li>';
							d += '</ul>';
							d += '</div></div></span><b>|</b><a href="'+owner.logout_href+'">安全退出</a></span>';
						$('#top-is-login').html(d);
						$('#top-is-login').show();
						// 下拉菜单事件
						var t,
						showdrop = function() { //显示下拉菜单
							clearTimeout(t);
							t = null;
							$('#top-drop-menu').show();
						},
						hidedrop = function() { //隐藏下拉菜单
							clearTimeout(t);
							t = null;
							t = setTimeout(function() {
								$('#top-drop-menu').hide();
							}, 300);
						};
						$('#msg-pm, #top-drop-menu').hover(showdrop, hidedrop);
					}
				}
			});
		},
		loginValidate: function () {
			var e = $('#top-email');
			var p = $('#top-password');
			if ($.trim(e.val()) == ''){alert('请输入您的金鹰网帐号');e.val('');return false;}
			if ($.trim(p.val()) == ''){alert('请输入您的密码');return false;}
			p.val(H.encodePassword(p.val()));
			return true;
		},
		login3rd: function (type) {
			var url = 'http://passport2.hunantv.com/oauth/?action=step&step=ca2e2a4d9872750a49778920e284c000&type='+type+'&rs='+this.login_ref;
			window.open(url);
		},
		getCookie: function(name) {
			if (document.cookie && document.cookie!=='') {
				var cookieArray = document.cookie.split("; ");
				for(var i=0;i<cookieArray.length;i++){
					var arr = cookieArray[i].split("=");
					if(encodeURIComponent(name) == arr[0]){
						return decodeURIComponent(arr[1]);
					}
				}
			}
			return null;
		}
	};

	H.topbar.init();
});