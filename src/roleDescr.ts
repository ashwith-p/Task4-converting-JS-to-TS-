import {keyBasedIndexing } from "./addEmployee.js";
import { CommonOperations } from "./common.js";
import { employeeDetails } from "./model.js";

intitializer();
new CommonOperations();
var currentId:string;
function createCard(ele:employeeDetails)
{
    var section=document.getElementsByClassName("description-section")[0];
    var empCard=document.createElement("div");
    empCard.setAttribute("class","emp-card");
    var empDetails=document.createElement("div");
    empDetails.setAttribute("class","emp-details");
    var img=document.createElement("img");
    img.setAttribute("src","images/p1.webp");
    img.setAttribute("class","person1");
    empDetails.appendChild(img);
    var empNameRole=document.createElement("div");
    empNameRole.setAttribute("class","emp-name-role");
    var para1=document.createElement("p");
    para1.setAttribute("class","m-0");
    var bold=document.createElement("b");
    var nameValue=ele.firstName+' '+ele.lastName;
    //nameValue=nameValue.length > 12 ? nameValue.substring(0,12) + "..." :nameValue;
    var name=document.createTextNode(nameValue);
    bold.appendChild(name);
    para1.appendChild(bold);
    empNameRole.appendChild(para1);
    var para2=document.createElement("p");
    para2.setAttribute("class","m-0");
    var name=document.createTextNode(ele.jobTitle);
    para2.appendChild(name);
    empNameRole.appendChild(para2);
    empDetails.appendChild(empNameRole);
    empCard.appendChild(empDetails);
    //
    var div=document.createElement("div");
    div.setAttribute("class","alignment");
    var img=document.createElement("img");
    img.setAttribute("src","images/Vector (1).svg");
    img.setAttribute("class","emp-work-info");
    div.appendChild(img);
    var p=document.createElement("p");
    p.setAttribute("class","m-8");
    var data=document.createTextNode(ele.empNo);
    p.appendChild(data);
    div.appendChild(p);
    empCard.appendChild(div);
     //
     var div=document.createElement("div");
     div.setAttribute("class","alignment");
     var img=document.createElement("img");
     img.setAttribute("src","images/email-1_svgrepo.com.svg");
     img.setAttribute("class","emp-work-info");
     div.appendChild(img);
     var p=document.createElement("p");
     p.setAttribute("class","m-8");
     var data=document.createTextNode(ele.emailId);
     p.appendChild(data);
     div.appendChild(p);
     empCard.appendChild(div);
      //
    var div=document.createElement("div");
    div.setAttribute("class","alignment");
    var img=document.createElement("img");
    img.setAttribute("src","images/team_svgrepo.com.svg");
    img.setAttribute("class","emp-work-info");
    div.appendChild(img);
    var p=document.createElement("p");
    p.setAttribute("class","m-8");
    var data=document.createTextNode(ele.department);
    p.appendChild(data);
    div.appendChild(p);
    empCard.appendChild(div);
     //
     var div=document.createElement("div");
     div.setAttribute("class","alignment");
     var img=document.createElement("img");
     img.setAttribute("src","images/location-pin-alt-1_svgrepo.com.svg");
     img.setAttribute("class","emp-work-info");
     div.appendChild(img);
     var p=document.createElement("p");
     p.setAttribute("class","m-8");
     var data=document.createTextNode(ele.location);
     p.appendChild(data);
     div.appendChild(p);
     empCard.appendChild(div);
     //
     var p=document.createElement("p");
     p.setAttribute("class","m-8 align-right");
     //p.setAttribute("onclick","viewDetails(this)");
     var data=document.createTextNode("View All");
     p.appendChild(data);
     var img=document.createElement("img");
     img.setAttribute("src","images/Vector.svg");
     p.appendChild(img);
     empCard.appendChild(p);
     section.appendChild(empCard);
}

function intitializer()
{
    var employeesList:keyBasedIndexing=JSON.parse(sessionStorage.getItem('role')!);
    var roleList=JSON.parse(localStorage.getItem("roleData")!);
    
    currentId=employeesList.id;
    var empList:employeeDetails[]=[]
    
    var x=employeesList.roleName; //change variable name--x
    for(var i=0;i<roleList.length;i++)
    {
        if(roleList[i].designation==x)
        {
            empList=roleList[i].employeesList;
        }
    }
    
    empList.forEach(element => {
        
        createCard(element);
        
    });
}

function viewDetails(className:HTMLElement){
    var employeeNo=className.parentElement!.children[1].children[1].innerHTML;
    var obj={
        'employeeNumber':employeeNo,
        'functionality':"View Details"
    };
    sessionStorage.setItem("updateDetails",JSON.stringify(obj));
    window.location.href='add-employee.html';
}

function addEmployee()
{
    sessionStorage.setItem('roleId',JSON.stringify({"roleId":currentId}));
    window.location.href='add-employee.html';
}

document.addEventListener('click',function(e){
    if((e.target! as HTMLElement).className=='add-btn'){
        addEmployee();
    }
    if((e.target! as HTMLElement).className=="m-8 align-right")
    {
        viewDetails(e.target! as HTMLElement);
    }
})