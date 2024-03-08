import { CommonOperations} from "./common.js";
import { employeeDetails,RoleInformation,keyBasedIndexing} from "./model.js";


var commonobj=new CommonOperations();
class AddRoles{
    public cureentEmployeeList:employeeDetails[]=commonobj.getLocalStorage('data') as employeeDetails[];
    public roleData:RoleInformation[]=[];  
    public roleExists=false;
    public obj:keyBasedIndexing={};
    public editedData={
        'isEdited':false,
        'cureentEmployeeList':{}
    };
    public selectedEmployeesList:string[]=[] //name
    constructor(){
        if(commonobj.getLocalStorage('roleData').length){
            this.roleData=commonobj.getLocalStorage('roleData') as RoleInformation[];
        }
        this.initialize();
    }
    initialize(){
        var roleDetails=JSON.parse(sessionStorage.getItem('roleDetails')!);

            var rolesInfo=JSON.parse(localStorage.getItem('roleData')!);
            var cureentEmployeeList:RoleInformation[]=[];
            var employee:RoleInformation=new RoleInformation({},[]);
            var employeeData=JSON.parse(localStorage.getItem('data')!);
            if(roleDetails){
                sessionStorage.removeItem('roleDetails');
                (document.getElementsByClassName('add-btn')[0] as HTMLInputElement).value="Edit Role";
                rolesInfo.forEach((ele:RoleInformation)=>{
                if(ele.designation==roleDetails.roleName){
                    employee=ele;
                }
                else{
                    cureentEmployeeList.push(ele);
                }
            });
            this.editedData['isEdited']=true;
            this.editedData['cureentEmployeeList']=cureentEmployeeList;
            (document.getElementById("designation")! as HTMLInputElement).value=employee.designation;
            (document.getElementById('role-department')! as HTMLInputElement ).value=employee.roleDepartment;
            (document.getElementById('description')!  as HTMLInputElement).value=employee.description;
            (document.getElementById('role-location')!  as HTMLInputElement).value=employee.roleLocation;
            (employee.employeesList).forEach(ele=>{
                for(var i=0;i<employeeData.length;i++){
                    if(ele.empNo==employeeData[i].empNo)
                    {
                        this.displayEmployeesToAssign(employeeData[i],true);
                    }
                }
            })
        }   
    }   

    validateRole(){
            var form=document.getElementById("role-data") as HTMLFormElement;
            var hasEmptyField=false;
            for (var i = 0; i < form.elements.length-1; i++) {
                var element:HTMLInputElement = form.elements[i] as HTMLInputElement;
            if(element.value.length==0 || element.value=="none")
            {
                hasEmptyField=true;
                var parent=element.parentNode as HTMLElement;
                var a=parent.getElementsByTagName("span");
                if(a.length==0){
                element.style.border="2px solid red";
                
                parent.appendChild(commonobj.createErrorMessage("This field is required"));
                }
            }
            else{
                var x=element.id;
                this.obj[x]=element.value;
            }
        }
        if(!this.roleExists){this.obj['id']=Date.now().toString();//generate Role Id dynamically
        if(!hasEmptyField){
        var employeeInRole:employeeDetails[]=this.getEmployeeDetails(this.selectedEmployeesList)
        var role=new RoleInformation(this.obj,employeeInRole);
        for(var j=0;j<this.selectedEmployeesList.length;j++)
        {
            for(var i=0;i<this.cureentEmployeeList.length;i++)
            {
                if(this.cureentEmployeeList[i].empNo==employeeInRole[j].empNo)
                {
                    this.cureentEmployeeList[i].jobTitle=role.designation;
                    this.cureentEmployeeList[i].location=role.roleLocation;
                    this.cureentEmployeeList[i].department=role.roleDepartment;
                }
            }
        }
        if(this.editedData['isEdited']){
            localStorage.setItem('roleData',JSON.stringify(this.editedData['cureentEmployeeList']));
        }
        localStorage.setItem('data',JSON.stringify(this.cureentEmployeeList));
        this.selectedEmployeesList=[];
        var roleData=JSON.parse(localStorage.getItem('roleData')!);
        roleData.push(role);
        localStorage.setItem("roleData",JSON.stringify(roleData));
        window.location.href='roles.html';}}
    }

    removeDeselectedEmployees(){

        var ele=document.getElementsByClassName("employee-list");
        if(ele){
            var j=0;
            while(j<ele.length)
            {
                var inputs=ele[j].getElementsByTagName('input');
                if(!inputs[0].checked){
                    var assignEmployeesDiv=inputs[0].parentElement!;
                    assignEmployeesDiv.remove();
                }
                else{j++;}
            }
        }
    }
    displayEmployeesToAssign(ele:employeeDetails,checkStatus=false){

        var roleEmployeeDivision=document.createElement("div");
        var image=document.createElement("img");
        image.setAttribute("src","images/person1.jpg");
        image.setAttribute("class","display-img");
        roleEmployeeDivision.appendChild(image);
        var name=document.createElement("p");
        var nameValue=ele.empNo+' '+ele.firstName+' '+ele.lastName;
        var content=document.createTextNode(nameValue);
        name.appendChild(content);
        roleEmployeeDivision.appendChild(name);
        var inputElement=document.createElement("input");
        inputElement.setAttribute("type","checkbox");
        inputElement.setAttribute('class',"checkClicked");
        if(checkStatus){
            this.selectedEmployeesList.push(ele.empNo);
            inputElement.setAttribute("checked","");}
        //inputElement.setAttribute('onchange',"addEmployeeToRole(this, '" + ele.empNo + "')");
        var employeeList=document.createElement("div");
        employeeList.setAttribute("class","employee-list");
        var list=document.getElementById("display-column")!;
        employeeList.appendChild(roleEmployeeDivision);
        employeeList.appendChild(inputElement);
        list.appendChild(employeeList);
    }
    filterByNames(){

        this.removeDeselectedEmployees();
        var searhFilter=(document.getElementById('assign-employees')! as HTMLInputElement).value;
        if(searhFilter!=""){
            this.cureentEmployeeList=JSON.parse(localStorage.getItem('data')!);
            for(var j=0;j<this.cureentEmployeeList.length;j++){
                if((this.cureentEmployeeList[j].firstName.toLowerCase().includes(searhFilter)|| this.cureentEmployeeList[j].empNo.includes(searhFilter)) &&
                    this.selectedEmployeesList.indexOf(this.cureentEmployeeList[j].empNo)==-1){
                    this.displayEmployeesToAssign(this.cureentEmployeeList[j]);
                }
            }
        }
    }

    addEmployeeToRole(className:HTMLInputElement,empNo:string){
    
        if(className.checked){
            this.selectedEmployeesList.push(empNo);
        }
        else{
            if(this.selectedEmployeesList.indexOf(empNo)!=-1){
                this.selectedEmployeesList.splice(this.selectedEmployeesList.indexOf(empNo),1);
            }
        }
    
    }
    getEmployeeDetails(selectedEmployeesList:string[]){
        var list:employeeDetails[]=[];
        selectedEmployeesList.forEach(ele=>{
            for(var j=0;j<this.cureentEmployeeList.length;j++){
                if(ele==this.cureentEmployeeList[j].empNo)
                {
                    list.push(this.cureentEmployeeList[j]);
                }
            }
        });
        return list;
    }

    findDuplicateRoles(className:HTMLInputElement){
        commonobj.border_change(className);
        var name=(document.getElementById('designation')! as HTMLInputElement).value;
        name=name.replace(" ","");
        var roleData=JSON.parse(localStorage.getItem('roleData')!);
        roleData.forEach((ele:RoleInformation)=>{
            if(name.toLowerCase()==(ele.designation).replace(" ","").toLowerCase()){
                document.getElementById('designation')!.parentElement!.appendChild(commonobj.createErrorMessage('Role Already Exista'));
                this.roleExists=true;
            }
        })

    }
}
var addRolesObject=new AddRoles();
document.getElementById('assign-employees')!.addEventListener('keyup',function(){
    addRolesObject.filterByNames();
})
document.getElementById('designation')!.addEventListener('blur',function(e){
    addRolesObject.findDuplicateRoles(e.target! as HTMLInputElement);
})
document.getElementsByClassName('add-btn')[0].addEventListener('click',function(){
    addRolesObject.validateRole();
});
document.addEventListener("change",function(e){
    if((e.target! as HTMLElement).previousElementSibling?.children[1]){
        addRolesObject.addEmployeeToRole(e.target! as HTMLInputElement,(e.target! as HTMLElement).previousElementSibling!.children[1].innerHTML.slice(0,4))
    }
})
document.addEventListener('click',function(e){
    if(((e.target!) as HTMLElement).className=='handle'){
        new CommonOperations().toggleSideBar();
    }
    if((e.target! as HTMLElement).tagName=="INPUT" || (e.target! as HTMLElement).tagName=="SELECT" || (e.target! as HTMLElement).tagName=="TEXTAREA" )
    {
        new CommonOperations().removeErrorMessage(e.target! as HTMLElement);
    }
})