

function createTodoList(title){
	var outterDiv=document.createElement("div");
	//add class attributes to outterDiv
	outterDiv.className="TodoList container-fluid";
	//create the titleDiv
	var titleDiv=document.createElement("div");
	//create class and id attributes for titleDiv
	titleDiv.className="row addedTodoList";
	titleDiv.id="todotitlebar";
	//create column nodes for the tileDiv
	var tcol1=document.createElement("div");
	tcol1.className="imgicon col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center";
	var cal=document.createElement("img");
	cal.src="../Ruby Garage/image/calendarIcon.png";
	cal.id="calImg";
	tcol1.appendChild(cal);


	
	var tcol2=document.createElement("div");
	var text=document.createTextNode(title);
	tcol2.className="col-xs-3 col-sm-3 col-md-3 col-lg-3";
	text.id="title";
	tcol2.appendChild(text);

	var tcol3=document.createElement("div");
	editimg=document.createElement("img");
	tcol3.className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center";
	editimg.id="edittitle";
	editimg.className="imgicon";
	editimg.src="../Ruby Garage/image/editicon.png";
	tcol3.appendChild(editimg);

	var tcol4=document.createElement("div");
	var delicon=document.createElement("img");
	tcol4.className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center";
	delicon.className="imgicon";
	delicon.id="deleteTodoList";
	delicon.src="../Ruby Garage/image/deleteicon.png";
	tcol4.appendChild(delicon);
	
	tcols=[tcol1,tcol2,tcol3,tcol4];
	//add the column nodes to the titleDiv
	for(i=0;i<tcols.length;i++){
			titleDiv.appendChild(tcols[i]);
		}
	outterDiv.appendChild(titleDiv);

	return document.getElementById("content").appendChild(outterDiv);
}


