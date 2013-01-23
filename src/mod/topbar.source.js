// 金鹰网公共topbar效果
// Ming 01.11/2013

honey.def(function(H) {

	H.topbar = {
		login_ref: window.location.href,
		logout_href: 'http://spp.hunantv.com/passport/service.php?action=logout&ref='+encodeURIComponent(window.location.href),
		i: 'http://i.hunantv.com',
		init: function() {
			var o = this;
			// 登录后的回跳地址
			$('#top-login-ref').val(this.login_ref);
			// 给表单绑定验证事件
			$('#top-login-form').submit(function() {
				return o.loginValidate();
			});
			// 请求接口判断用户状态
			$.getJSON('http://app.i.hunantv.com/api/newuserstatus/?jsoncallback=?', function(json) {
				var u = json.result.userinfo;
				if (json.status == 200) {
					if (u == null || u == false) {
						$('#not-login').show();
						$('#top-no-verify').hide();
						$('#top-is-login').hide();
					} else if (u.status == 0) {
						$('#top-no-verify').html('<span><a href="'+o.i+'" target="_blank">'+u.username+'</a> 您还没有通过 <a href="'+o.i+'" target="_blank">邮箱验证</a><b>|</b><a href="'+o.logout_href+'">安全退出</a></span>');
						$('#not-login').hide();
						$('#top-no-verify').show();
						$('#top-is-login').hide();
					} else if (u.status == 1) {
						$('#top-no-verify').html('<span><a href="'+o.i+'" target="_blank">'+u.username+'</a> <a href="'+o.i+'" target="_blank">完善资料</a>，关注你喜欢的<b>|</b><a href="'+o.logout_href+'">安全退出</a></span>');
						$('#not-login').hide();
						$('#top-no-verify').show();
						$('#top-is-login').hide();
					} else if (u.status == 2) {
						$('#top-no-verify').html('<span><a href="'+o.i+'" target="_blank">'+u.username+'</a> 您涉嫌违反网站规定，已被封禁<b>|</b><a href="'+o.logout_href+'">安全退出</a></span>');
						$('#not-login').hide();
						$('#top-no-verify').show();
						$('#top-is-login').hide();
					} else if (u.status == 3) {
						$('#not-login').hide();
						$('#top-no-verify').hide();
						var d = '<span>您好，<a href="'+o.i+'" target="_blank">'+u.username+'</a><b>|</b><span class="menu"><a id="msg-pm" class="msg-pm" href="'+o.i+'" target="_blank">'+u.msg_total+'</a><div class="menu-pm" id="top-drop-menu" style="display:none;"><div class="h"><span class="name">消息</span></div><div class="c">';
							d += '<ul>';
							d += '<li><a href="'+o.i+'/message/unread" target="_blank">'+u.message_count+'</a>查看新私信</li>';
							d += '<li><a href="'+o.i+'/notice/system" target="_blank">'+u.sysnotice_count+'</a>查看通知</li>';
							d += '<li><a href="'+o.i+'/comment" target="_blank">'+u.comment_count+'</a>查看新评论</li>';
							d += '<li><a href="'+o.i+'/notice/friendconfirm" target="_blank">'+u.addfriendnotice_count+'</a>查看好友请求</li>';
							d += '</ul>';
							d += '</div></div></span><b>|</b><a href="'+o.logout_href+'">安全退出</a></span>';
						$('#top-is-login').html(d);
						$('#top-is-login').show();
						// 下拉菜单事件
						var t,
						showdrop = function() {
							clearTimeout(t);
							t = null;
							$('#top-drop-menu').show();
						},
						hidedrop = function() {
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
			//window.location.href = url;
		}
	};
	H.topbar.init();
});