/*  
	Goblin Time Manager
	Author: Adam Zaimes
*/
(function($) {
/*
	===============================================
	=========================== APPLICATION GLOBALS	
	*/
	var win = $(window),
		body = $(document.body),
		container = $('#container'),
		// the only element in index.html
		currentUser = {};
/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	var loadApp = function() {
			$.get('templates/app.html', function(html) {
				var h = $(html);
				var appCode = h.find('#template_app').html();
				$.template('app', appCode); // compile template
				$.render(currentUser, 'app'); // use template
				container.html(appCode);
				//nav click events
				$('#logout_btn').on('click', logout);
				
				$.ajax({
				url: 'xhr/get_projects.php',
				type: 'get',
				dataType: 'json',
				success: function(response) {
					console.log(response);
					if(response.error){
						console.log(response.error);
					}else{
						$.get('templates/app.html', function(html){
							var h = $(html);
								tempCode = h.find('#template_project_1').html(),
								markup = '';
						})
					}
					
					
					
					
					
					var projects = response.projects;
					$.get('templates/app.html', function(html) {
						var h = $(html);
						var listCode = h.find('#list').html();
						$.template('list', listCode); // compile template
						$.render(currentUser, 'list'); // use template
						container.html(listCode);
					});	
				}
			});
				
				
				
				
				
				
			});
			
		}; /*====== landing page =====*/
	var loadLanding = function() {
			$.get('templates/landing.html', function(html) {
				var h = $(html);
				var landingCode = h.find('#template_landing').html();
				$.template('landing', landingCode); // compile template
				$.render(currentUser, 'landing'); // use template
				container.html(landingCode);
				$('#login_btn').on('click', login);
				$('#joinButton').on('click', register);
			});
		}; /*========= Login ===========*/
	var checkLoginState = function() {
			$.ajax({
				url: 'xhr/check_login.php',
				type: 'get',
				dataType: 'json',
				success: function(r) {
					if (r.user) {
						loadApp(); // if user, loadApp()
					} else {
						loadLanding();
						$('input, textarea').placeholder();
					} // if error, loadLanding()
				}
			});
		}; /*====== Login Function ======*/
	var login = function() {
			var user = $('input#user').val(),
				pwd = $('input#pwd').val();
			$.ajax({
				url: 'xhr/login.php',
				data: {
					username: user,
					password: pwd
				},
				type: 'post',
				dataType: 'json',
				success: function(response) {
					if (response.error) {
						alert(response.error);
					} else {
						loadApp();
					}
				}
			});
			return false;
		}; /*====== logout function =====*/
	var logout = function() {
			$.ajax({
				url: 'xhr/logout.php',
				type: 'GET',
				dataType: 'json',
				success: function(response) {
					loadLanding();
				}
			});
			return false;
		}; /*======== Register ============*/
	var register = function() {
			var email = $('input#emailReg').val(),
				user = $('input#userReg').val(),
				pwd = $('input#pwdReg').val();
			$.ajax({
				url: 'xhr/register.php',
				data: {
					email: email,
					username: user,
					password: pwd
				},
				type: 'post',
				dataType: 'json',
				success: function(response) {
					if (response.error) {
						alert(response.error);
					} else {
						loadApp();
					}
				}
			});
			return false;
		}; /*========= drag list ======*/
	/*======== call list =====*/
			
		
		
		
		
		
		
		
		/*==========sort rows ======*/
		
		
		
		/*=======new task=======*/
		$("#popNewProject").dialog({
			autoOpen: false,
			show: 'slide',
			resizeable: false,
			position: 'center',
			stack: true,
			height: 'auto',
			width: 'auto',
			modal: true
		});
		
		
		
		
	 /*==========	SETUP FOR INIT */
	var init = function() {
			checkLoginState(), loadLanding();
		};
	init();
/*
	===============================================
	======================================== EVENTS	
	*/
	win.on('submit', '#user-reg-form', function() {
		return false;
	});
/*	
	==================================== END EVENTS 
	===============================================
	*/
})(jQuery); // end private scope