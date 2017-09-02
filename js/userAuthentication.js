//create a register page for any user who intends to use the todo list
$(document).ready(function(){
		//create a register form
		$("#signup").on("click",function(){
			$("#overlayimg").remove();
			$("#frontpagefooter").hide();
			var registerForm=$("<form action='../Todo-List/php/registerUser.php' method='POST' id='adduser'>"+
								"<br><br>"+
								"<fieldset>"+
									"<legend style='text-align:center;color:#4673AD'>Signup to create and access Todo List</legend>"+
										"<p>"+
											"<input type='text' name='username' id='username' class='required forminputs' placeholder='Username'/>"+
										"</p>"+
										"<p>"+
									
											"<input type='Password' name='pwd' id='pwd' class='required forminputs' placeholder='Password'/>"+
										"</p>"+
										"<p>"+
											"<input type='Password' name='cpwd' id='cpwd' class='required forminputs' placeholder='Comfirm Password'/>"+
										"</p>"+
										"<p>"+
											"<button form='adduser' id='newuser' class='btn btn-primary forminputs'>Go</button>"+
										"</p>"+
										"<span id='comment' class='forminputs'></span>"+
										"</p>"+
								"</fieldset>"+
							"</form>");
			$("#overlay").append($(registerForm));
		});
		//login an authorized user
		$("#login").on("click",function(){
			$("#overlayimg").remove();
			$("#frontpagefooter").hide();
			var loginForm=$("<form action='' method='POST' id='loginuser'>"+
								"<fieldset>"+
									"<legend style='text-align:center;color:#4673AD;'>Login to access Todo List</legend>"+
										"<p>"+
											"<input type='text' id='usernamel' name='usernamel' placeholder='Username'/ class='required forminputs'>"+
										"</p>"+
										"<p>"+
											"<input type='Password' id='pwdl' name='pwdl' placeholder='Password' class='required forminputs'/>"+
										"</p>"+
										"<p>"+
											"<button form='loginuser' id='acceptuser' class='btn btn-primary forminputs'>Go</button>"+
										"</p>"+
								"</fieldset>"+
							"</form>");
			$("#overlay").append($(loginForm));

		});
		//validate new user credentials
		$("#overlay").on("click","#newuser",function(){

			
			 //get new user data from the form
			 var userdata=$("#adduser :input").serializeArray();
			 //send user inputs to the server
			 $.post($("#adduser").attr("action"),userdata,function(comment){

			 	$("#comment").html(comment);
			 	//when signup is successful
			 	if (comment=="User added successfully"){
			 		
			 		$("#comment").html(comment).fadeOut(3000);
			 		clearForm();
			 		$("#overlay").css("display","none");
			 	}
			 });
			//submit the data
			$("#adduser").submit(function(){
				 //validate user inputs
			$(this).validate({
								rules:{
									username:{
												required:true, 
												rangelength:[2,20]},
									pwd:{
												required:true,  
												rangelength:[8,16] 
										},
									cpwd:{
												equalTo:'#pwd'
											}	
				}});
				
				
				return false;
			});

		});
		//validate a returning user
		$("#overlay").on("click","#acceptuser",function(){
			$("#loginuser").validate();
		});
	});

	//fucntion to clear the form inputs
	function clearForm(){
		$("#adduser :input").each(
			function(){
				$(this).val('');
			});
	}