<?php
		//connect to mysql localhost in which the database is stored using servername, username, password and databasename
		$con=mysqli_connect('localhost','root','','todo-list');
		//check for the connection
		if(!$con){
			die("<p style='color:red;'>Connection Failed".mysqli_connect_error()."</p>");
		}
		//get inputs from the adduser form in userAuthentication file
		$username=$_POST['username'];
		$pwd=$_POST['pwd'];
		$cpwd=$_POST['cpwd'];

		//create an sql query to insert new users
		$query="INSERT INTO user VALUES('','$username','$pwd')";
		//add new user and display if the user addition is successful
		if(validateData($username) && validatePassword($pwd,$cpwd)){
				if(mysqli_query($con,$query)){

						echo "User added successfully";
				}
				else{
						die("<p style='color:red;'>Signup failed!".mysqli_error($con)."</p>");
				}
	
		}
		//close the connection
		mysqli_close($con);
		function validateData($data){
			if ($data=="" || is_null($data)){
				errorMessage("no username provided!");
				return false;
			}
			elseif(strlen($data)<3){
				errorMessage("username characters must be more than 3 !");
				return false;
			}
			else{
				return true;
			}
		}

		function validatePassword($password,$password2){
			if ($password=="" || is_null($password)){
				errorMessage("no password provided!");
				return false;
			}
			elseif (ctype_alpha($password)|| ctype_digit($password)) {
				errorMessage("password must be alpha-numeric with optional special characters!");
				return false;
			}
			elseif($password!=$password2){
				errorMessage("Password fields didn't match!");
			}
			elseif (!(strlen($password)>7 && strlen($password)<17)) {
				errorMessage("password characters must be between 8 and 16");
				return false;
			}
			elseif (ctype_lower($password)  || ctype_upper($password)) {
				errorMessage("password must contain mixture of upper and lower cases!");
				return false;
			}
			else{
				return true;
			}

		}

		function errorMessage($msg){
			echo "<p style='color:red;'>".$msg."</p>";
		}
?>