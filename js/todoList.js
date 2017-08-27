//Jquery block
		$(document).ready(function(){
			 var taskCols;
			//attach a hover event to the titlebar
			$("#todotitlebar").hover(
						function(){
							$("#editiconholder").css("cursor","pointer");
							$("#editiconholder").append("<img src='../Todo-List/image/editicon.png' id='editiconid'/>").
							click(function(){

								//request for name of todoList
								var text=prompt("Name of TodoList","");
								if(text)
									$("#title").html(text);
							
							});
							$("#deliconholder").css("cursor","pointer");
							$("#deliconholder").append("<img src='../Todo-List/image/deleteicon.png' id='deliconid'/>").
							click(function(){
								//delete title text
								$("#title").empty();
							});
			},			
						function(){
							$("#editiconholder").empty();
							$("#deliconholder").empty();
			});
			//create and add task columns on click of the green add icon
			$("#greenplus").css("cursor","pointer").on("click",function(){

						taskCols=$("<div class='row taskcontainer' id='taskrecord'>"+
											"<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1'>"+"<input type='checkbox' id='mark'/>"+"</div>"+
											"<div class='col-xs-7 col-sm-7 col-md-7 col-lg-7'>"+"<p class='task' id='taskname'>"+"</p>"+"</div>"+
											"<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1 imgicon' id='drag'>"+"</div>"+
											"<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1 imgicon' id='taskedit'>"+"</div>"+
											"<div class='col-xs-2 col-sm-2 col-md-2 col-lg-2 imgicon' id='taskdel'>"+"</div>"+

										"</div>");
						$("#todoListUI").append($(taskCols)).css({"border-bottom-left-radius":"10px",
															"border-bottom-right-radius":"10px"});
			});
			//remove and add hint to task input on focus and lost of focus
			$("#taskdesc").focus(function(){
				$(this).val("");
				
			});
			
			//add task on click of add task button
			$("#addtaskbtn").click(function(){
				var hint="start typing here to create a task";
				var taskdesc=$("#taskdesc").val();
				var title=$("#title").html();
				//add a task if the task description is provided 
				if (taskdesc && taskdesc!=hint && title){
						//get an array of task rows
						var taskrows=$("#todoListUI").find(".task");
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
				$("#taskdesc").val("start typing here to create a task");
			});
			//on hovering any record , highlight that record with with colors and icons
			$("#todoListUI").on("mouseenter",".taskcontainer",function(){
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
								$(this).parent().fadeIn(3000).empty();
							});
							//for the drag icon
							$(this).find("#drag").append("<img src='../Todo-List/image/drag.png' id='grab'/>");
							//sort tasks in a desired manner
							$("#todoListUI").sortable({items:">.taskcontainer"}).css("cursor","-webkit-grabbing");
			});
			//when the mouse leaves the highted row
			$("#todoListUI").on("mouseleave",".taskcontainer",function(){
					//remove all the vissual effects or icon
					$(this).css("background","");
					$(this).find("#taskedit").empty();
					$(this).find("#drag").empty();
					$(this).find("#taskdel").empty();
			});
		});
		