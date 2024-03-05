import { employeeDetails } from "./addEmployee";
import { RoleInformation } from "./addRoles";

var isSidebarToggled=false;
var mobileView=false;
export var checkBorder=false;
var changeName:HTMLElement=document.querySelector('.roles-or-user-management')!;
var rotateButton:HTMLElement=document.querySelector('.handle')!;
var removeArrowRole:HTMLElement=document.querySelector(".side-arrow-roles")!;
var removeArrowsUser:HTMLElement=document.querySelector(".side-arrow-roles")!;
var reduceSidebarWidth:HTMLElement=document.querySelector(".container")!;
var toogleBtn:HTMLElement=document.querySelector(".horizantal-content")!;
function toggleSideBar(){
    if(!isSidebarToggled)
    { 
        toogleBtn.classList.add("toggle");
        changeName.innerHTML="Role";
        rotateButton.style.rotate="180deg";
        rotateButton.style.left="55px";
        removeArrowRole.style.display="none";
        removeArrowsUser.style.display="none";     
        if(!mobileView){
        reduceSidebarWidth.style.width="calc(100% - 75px)";
        }
        else{
            toogleBtn.style.position="static";
            reduceSidebarWidth.style.width="calc(89% - 30px)";
            //document.getElementsByClassName('container')[0].style.paddingLeft="92px";
            rotateButton.style.left="55px";
            rotateButton.style.top="2%";
        }
        
        isSidebarToggled=true;
    }
    else{
        if(!mobileView){
            onScreenToNormal();
        }
        else{
            toogleBtn.style.position='absolute';
            toogleBtn.style.backgroundColor='white';
            toogleBtn.style.zIndex="10";
            reduceSidebarWidth.style.width="calc(100% - 30px)";
            rotateButton.style.left="175px";
            rotateButton.style.top="2%";
            rotateButton.style.zIndex="12";
        }
        toogleBtn.classList.remove("toggle");
        rotateButton.style.rotate="0deg";
        isSidebarToggled=false;
        
    }
    
}
window.onresize = function() {
    if(window.screen.width<665 && !mobileView){
        toggleSideBar();
        mobileView=true;
    }
    else if(window.screen.width>=665 && mobileView){
        toggleSideBar();
        onScreenToNormal();
        mobileView=false;
    }
};

function onScreenToNormal()
{
    toogleBtn.style.position="static";
        reduceSidebarWidth.style.width="calc(100% - 230px)";
        rotateButton.style.left="175px";
        changeName.innerHTML="ROLE/USER MANAGEMENT";
}

export function createErrorMessage(text:string):HTMLElement
{
    var span=document.createElement("span");
    var textNode=document.createTextNode(text);
    span.setAttribute("class","warning");
    span.appendChild(textNode);
    return span;
}

export  function border_change(className:HTMLElement)
{
    
    if(!checkBorder){
    className.style.border="2px solid rgb(0, 126, 252)";
    checkBorder=true;
    }
    else{
        className.style.border='2px solid #e2e2e2';
        checkBorder=false;
    }
    removeErrorMessage(className);
}

export function removeErrorMessage(className:HTMLElement)
{
    
    const x=(className.parentNode);
    var a =(x as HTMLElement).getElementsByTagName("span");
    
    if(a.length>0){
        a[0].remove();
    }
}

export function setLocalStorage(key:string,data:employeeDetails[]|RoleInformation[]){
    localStorage.setItem(key,JSON.stringify(data));
}
export function getLocalStorage(key:string):(employeeDetails[]| RoleInformation[]){
    if(localStorage.getItem(key)){
    return JSON.parse(localStorage.getItem(key)!);}
    else{
        return [];
    }
}