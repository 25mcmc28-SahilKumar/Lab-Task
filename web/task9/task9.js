var formStructure = [
{
label:"Name",
type:"text",
id:"name"
},

{
label:"Email",
type:"email",
id:"email"
},

{
label:"Password",
type:"password",
id:"password"
},

{
label:"Country",
type:"select",
id:"country",

option:["Nepal","USA","India","Bhutan", "Sri Lanka","China","Japan","Germany",
"Finland","Thailand","Australia","New Zealand"]

}

];

console.log(formStructure);


$(document).ready(function(){


$("#form").append("<label>"+formStructure[0].label+"</label><br>");
$("#form").append("<input type='" + formStructure[0].type + "' id='" + formStructure[0].id + "'><br><br>");



$("#form").append("<label>"+formStructure[1].label+"</label><br>");
$("#form").append("<input type='"+ formStructure[1].type + "' id='"+formStructure[1].id + "'><br><br>");


$("#form").append("<label>"+formStructure[2].label+"</label><br>");
$("#form").append("<input type='"+ formStructure[2].type + "' id='" + formStructure[2].id + "'><br><br>");


$("#form").append("<label>"+formStructure[3].label+"</label><br>");
$("#form").append("<select id='country'></select><br><br>");



for(var i=0; i<formStructure[3].option.length; i++){

    $("#country").append(
    "<option>"+formStructure[3].option[i]+"</option>"
    );

}


$("#country").change(function(){


$("#usa").remove();
$("#india").remove();

if($("#country").val()=="USA"){

$("#form").append("<div id='usa'>" + "<label>Green Card</label><br>"+ "<input type='text' id='state'><br><br>"+"</div>"

);

}

if($("#country").val()=="India"){

$("#form").append("<div id='india'>"+"<label>Aadhar Number</label><br>"+"<input type='text' id='aadhar'><br><br>"+"</div>"

);

}

});


$("#submitBtn").click(function(){

$(".error").remove();

var valid=true;

var name=$("#name").val();

if(name==""){

$("#name").after(
"<span class='error'> Required</span>"
);

valid=false;

}

else if(!/^[A-Za-z ]+$/.test(name)){

$("#name").after(
"<span class='error'> Only letters allowed</span>"
);

valid=false;

}

else if(name.length<3){

$("#name").after(
"<span class='error'> Minimum 3 characters</span>"
);

valid=false;

}

var email=$("#email").val();

if(email==""){

$("#email").after(
"<span class='error'> Required</span>"
);

valid=false;

}

else if(!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)){

$("#email").after(
"<span class='error'> Invalid Email</span>"
);
valid=false;
}


var password=$("#password").val();
if(password==""){
$("#password").after(
"<span class='error'> Required</span>"
);
valid=false;
}

else if(password.length<8){
$("#password").after(
"<span class='error'> Minimum 8 characters</span>"
);
valid=false;
}

else if(!/[A-Z]/.test(password)){
$("#password").after(
"<span class='error'> Need 1 Capital Letter</span>"
);
valid=false;
}

else if(!/[0-9]/.test(password)){
$("#password").after(
"<span class='error'> Need 1 Number</span>"
);
valid=false;
}

else if(!/[!@#$%^&*]/.test(password)){
$("#password").after(
"<span class='error'> Need 1 Special Symbol</span>"
);
valid=false;
}

if(valid){
alert("Form Submitted Successfully");
}
});

});