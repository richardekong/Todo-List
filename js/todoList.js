//Jquery block
		$(document).ready(function(){

			
			//attach click event to the add todo button
			$("#addtodolistbtn").css("cursor","pointer").on("click",function(){
					//create the todo List
					var todoListUI=$(
								"<div class='container TodoList' id='todoListUI'>"+
									"<div class='row todotitlebars' id='todotitlebar'>"+
										"<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1 imgicon'>"+
											"<img src='../Todo-List/image/calendarIcon.png' class='calIcon imgicon'/>"+
										"</div>"+
										"<div class='col-xs-9 col-sm-9 col-md-9 col-lg-9'>"+
											"<p id='title'></p>"+
										"</div>"+
										"<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1' id='editiconholder'></div>"+
										"<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1' id='deliconholder'></div>"+
									"</div><br/>"+
									"<div class='row' id='taskmgr'>"+
										"<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1 imgicon text-center'>"+
											"<img id='greenplus' src='../Todo-List/image/green-add.png'/>"+
										"</div>"+
										"<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8 text-center'>"+
											"<input id='taskdesc' type='text' class='taskinput' placeholder='start typing here to create a task'/>"+
										"</div>"+
										"<div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center'>"+
											"<button id='addtaskbtn' class='addtask'>Add Task</button>"+
										"</div>"+
									"</div>"+"<br/>"+
								"</div><br/><br/>");
					//append the todo List to the parent element
					$("#content").append($(todoListUI));
					
			});
			 var taskRows;
			//attach a mouseenter event to the todo titlebar
			$("body").on("mouseenter","#todotitlebar",function(){
							$(this).find("#editiconholder").css("cursor","pointer");
							$(this).find("#greenplus").css("cursor","pointer");
							$(this).find("#editiconholder").append("<img src='../Todo-List/image/editicon.png' id='editiconid'/>");
							$(this).find("#editiconholder").click(function(){

								//request for name of todoList
								var text=prompt("Name of TodoList","");
								if(text){
									$(this).parent().find("#title").html(text);
								}
							});

							$(this).find("#deliconholder").css("cursor","pointer");
							$(this).find("#deliconholder").append("<img src='../Todo-List/image/deleteicon.png' id='deliconid'/>").
							on("click","#deliconid",function(){
								//delete todo 
								$(this).parent().parent().parent().empty().removeClass("TodoList");
							});
			});	
				//attach a corresponding mouseleave event to the todo titlebar	
				$("body").on("mouseleave","#todotitlebar",function(){
							$(this).find("#editiconholder").empty();
							$(this).find("#deliconholder").empty();
			});
			//create and add task columns on click of the green add icon
		
						$("#content").find("#greenplus").css("cursor","pointer");

						$("#content").on("click","#greenplus",function(){

							taskRows=$("<div class='row taskcontainer' id='taskrecord' >"+
											"<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1'>"+"<input type='checkbox' id='mark'/>"+"</div>"+
											"<div class='col-xs-7 col-sm-7 col-md-7 col-lg-7'>"+"<p class='task' id='taskname'>"+"</p>"+"</div>"+
											"<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1 imgicon' id='drag'>"+"</div>"+
											"<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1 imgicon' id='taskedit'>"+"</div>"+
											"<div class='col-xs-2 col-sm-2 col-md-2 col-lg-2 imgicon' id='taskdel'>"+"</div>"+

										"</div>");
						
						//dynamically find the todo list container and append taskRows	
						$(this).parent().parent().parent().append($(taskRows));	

			})
						.css("cursor","pointer");
			//remove and add hint to task input on focus and lost of focus
			$("#content").on("focus","#taskdesc",function(){
				$(this).val("");
				
			});
			
			//add task on click of add task button
			$("#content").on("click","#addtaskbtn",function(){
				var hint="start typing here to create a task";
				var taskdesc=$(this).parent().parent().find("#taskdesc").val();
				var title=$(this).parent().parent().parent().find("#title").html();
				//add a task if the task description is provided 
				if (taskdesc && taskdesc!=hint && title){
						//get an array of task rows
						var taskrows=$(this).parent().parent().parent().find(".task");
						//loop through the all taskrows
						for(i=0;i<taskrows.length;i++){
							//if the current taskrow contains a task,skip to the next row
							 if ($(taskrows[i]).html()){
							 	continue; 
							 }
							 else //if the current taskrow contains no task, add a task to this row and exit 
							 {
							 	$(taskrows[i]).html(taskdesc);
							 	break;
							 }
						}
							
				}
				else //otherwise ask the user to provide a task description
				{
					alert("you must provide a todo title and task name");
				}
				$(this).parent().parent().parent().find("#taskdesc").val("");
			});
			//on hovering any record , highlight that record with with colors and icons
			$("body").on("mouseenter",".taskcontainer",function(){
							//change the background 
							$(this).css("background","#fcfed5");
							//for the taskedit icon
							$(this).find("#taskedit").
							append("<img src='../Todo-List/image/taskedit.png'/>")
							.css("cursor","pointer");
							//on clicking the edit icon
							$(this).find("#taskedit").click(function(){
								//prompt the user for task description
								var taskdesc=prompt("Enter task description","");
								if(taskdesc){//determine if a new input is provided for editing
									//change the highlighted task description
									$(this).parent().find("#taskname").html(taskdesc);
								}
									 	
							});
							//for the delete icon
							$(this).find("#taskdel").append("<img src='../Todo-List/image/taskdel.png'/>")
							.css("cursor","pointer");
							//on click of the delete icon
							$(this).find("#taskdel").click(function(){
								//delete the highlighted row
								$(this).parent().empty().removeClass("taskcontainer");
							});
							//for the drag icon
							$(this).find("#drag").append("<img src='../Todo-List/image/drag.png' id='grab'/>");
							//sort tasks in a desired manner
							$(this).parent().sortable({items:">.taskcontainer",placeholder:"white"}).css("cursor","pointer");
			});
			//when the mouse leaves the highlighted row
			$("body").on("mouseleave",".taskcontainer",function(){
					//remove all the vissual effects or icon
					$(this).css("background","");
					$(this).find("#taskedit").empty();
					$(this).find("#drag").empty();
					$(this).find("#taskdel").empty();
			});
		});