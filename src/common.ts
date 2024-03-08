import { employeeDetails,RoleInformation } from "./model.js";
export class CommonOperations{
    public isSidebarToggled=false;
    public mobileView=false;
    public checkBorder=false;  
    public changeName:HTMLElement=document.querySelector('.roles-or-user-management')!;
    public rotateButton:HTMLElement=document.querySelector('.handle')!;
    public removeArrowRole:HTMLElement=document.querySelector(".side-arrow-roles")!;
    public removeArrowsUser:HTMLElement=document.querySelector(".side-arrow-roles")!;
    public reduceSidebarWidth:HTMLElement=document.querySelector(".container")!;
    public toogleBtn:HTMLElement=document.querySelector(".horizantal-content")!;
    toggleSideBar(){
        if(!this.isSidebarToggled)
        { 
            this.toogleBtn.classList.add("toggle");
            this.changeName.innerHTML="Role";
            this.rotateButton.style.rotate="180deg";
            this.rotateButton.style.left="55px";
            this.removeArrowRole.style.display="none";
            this.removeArrowsUser.style.display="none";     
            if(!this.mobileView){
                this.reduceSidebarWidth.style.width="calc(100% - 75px)";
            }
            else{
                this.toogleBtn.style.position="static";
                this.reduceSidebarWidth.style.width="calc(89% - 30px)";
                //document.getElementsByClassName('container')[0].style.paddingLeft="92px";
                this.rotateButton.style.left="55px";
                this.rotateButton.style.top="2%";
            }
            
            this.isSidebarToggled=true;
        }
        else{
            if(!this.mobileView){
                this.onScreenToNormal();
            }
            else{
                this.toogleBtn.style.position='absolute';
                this.toogleBtn.style.backgroundColor='white';
                this.toogleBtn.style.zIndex="10";
                this.reduceSidebarWidth.style.width="calc(100% - 30px)";
                this.rotateButton.style.left="175px";
                this.rotateButton.style.top="2%";
                this.rotateButton.style.zIndex="12";
            }
            this.toogleBtn.classList.remove("toggle");
            this.rotateButton.style.rotate="0deg";
            this.isSidebarToggled=false;
            
        }
        
    }
    onScreenToNormal()
    {
        this.toogleBtn.style.position="static";
        this.reduceSidebarWidth.style.width="calc(100% - 230px)";
        this.rotateButton.style.left="175px";
        this.changeName.innerHTML="ROLE/USER MANAGEMENT";
    }
    createErrorMessage(text:string):HTMLElement
    {
        var span=document.createElement("span");
        var textNode=document.createTextNode(text);
        span.setAttribute("class","warning");
        span.appendChild(textNode);
        return span;
    }
    border_change(className:HTMLElement)
    {
        if(!this.checkBorder){
            className.style.border="2px solid rgb(0, 126, 252)";
            this.checkBorder=true;
        }
    else{
        className.style.border='2px solid #e2e2e2';
        this.checkBorder=false;
    }
    this.removeErrorMessage(className);
    }

    removeErrorMessage(className:HTMLElement)
    {
        const x=(className.parentNode);
        var a =(x as HTMLElement).getElementsByTagName("span");
        if(a.length>0){
            a[0].remove();
        }
        className.style.border="";
    }
    setLocalStorage(key:string,data:employeeDetails[]|RoleInformation[]){
        localStorage.setItem(key,JSON.stringify(data));
    }
    getLocalStorage(key:string):(employeeDetails[]| RoleInformation[]){
        if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key)!);}
        else{
            return [];
        }
    }
}
var commonObject=new CommonOperations();
window.onresize = function() {
    if(window.screen.width<665 && !commonObject.mobileView){
        commonObject.toggleSideBar();
        commonObject.mobileView=true;
    }
    else if(window.screen.width>=665 && commonObject.mobileView){
        commonObject.toggleSideBar();
        commonObject.onScreenToNormal();
        commonObject.mobileView=false;
    }
};
document.addEventListener('click',
    function(e){
        if(((e.target!) as HTMLElement).className=='handle'){
            commonObject.toggleSideBar();
        }
    }
)