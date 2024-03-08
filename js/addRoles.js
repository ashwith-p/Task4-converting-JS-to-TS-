import { CommonOperations } from "./common.js";
import { RoleInformation } from "./model.js";
var commonobj = new CommonOperations();
class AddRoles {
    cureentEmployeeList = commonobj.getLocalStorage('data');
    roleData = [];
    roleExists = false;
    obj = {};
    editedData = {
        'isEdited': false,
        'cureentEmployeeList': {}
    };
    selectedEmployeesList = []; //name
    constructor() {
        if (commonobj.getLocalStorage('roleData').length) {
            this.roleData = commonobj.getLocalStorage('roleData');
        }
        this.initialize();
    }
    initialize() {
        var roleDetails = JSON.parse(sessionStorage.getItem('roleDetails'));
        var rolesInfo = JSON.parse(localStorage.getItem('roleData'));
        var cureentEmployeeList = [];
        var employee = new RoleInformation({}, []);
        var employeeData = JSON.parse(localStorage.getItem('data'));
        if (roleDetails) {
            sessionStorage.removeItem('roleDetails');
            document.getElementsByClassName('add-btn')[0].value = "Edit Role";
            rolesInfo.forEach((ele) => {
                if (ele.designation == roleDetails.roleName) {
                    employee = ele;
                }
                else {
                    cureentEmployeeList.push(ele);
                }
            });
            this.editedData['isEdited'] = true;
            this.editedData['cureentEmployeeList'] = cureentEmployeeList;
            document.getElementById("designation").value = employee.designation;
            document.getElementById('role-department').value = employee.roleDepartment;
            document.getElementById('description').value = employee.description;
            document.getElementById('role-location').value = employee.roleLocation;
            (employee.employeesList).forEach(ele => {
                for (var i = 0; i < employeeData.length; i++) {
                    if (ele.empNo == employeeData[i].empNo) {
                        this.displayEmployeesToAssign(employeeData[i], true);
                    }
                }
            });
        }
    }
    validateRole() {
        var form = document.getElementById("role-data");
        var hasEmptyField = false;
        for (var i = 0; i < form.elements.length - 1; i++) {
            var element = form.elements[i];
            if (element.value.length == 0 || element.value == "none") {
                hasEmptyField = true;
                var parent = element.parentNode;
                var a = parent.getElementsByTagName("span");
                if (a.length == 0) {
                    element.style.border = "2px solid red";
                    parent.appendChild(commonobj.createErrorMessage("This field is required"));
                }
            }
            else {
                var x = element.id;
                this.obj[x] = element.value;
            }
        }
        if (!this.roleExists) {
            this.obj['id'] = Date.now().toString(); //generate Role Id dynamically
            if (!hasEmptyField) {
                var employeeInRole = this.getEmployeeDetails(this.selectedEmployeesList);
                var role = new RoleInformation(this.obj, employeeInRole);
                for (var j = 0; j < this.selectedEmployeesList.length; j++) {
                    for (var i = 0; i < this.cureentEmployeeList.length; i++) {
                        if (this.cureentEmployeeList[i].empNo == employeeInRole[j].empNo) {
                            this.cureentEmployeeList[i].jobTitle = role.designation;
                            this.cureentEmployeeList[i].location = role.roleLocation;
                            this.cureentEmployeeList[i].department = role.roleDepartment;
                        }
                    }
                }
                if (this.editedData['isEdited']) {
                    localStorage.setItem('roleData', JSON.stringify(this.editedData['cureentEmployeeList']));
                }
                localStorage.setItem('data', JSON.stringify(this.cureentEmployeeList));
                this.selectedEmployeesList = [];
                var roleData = JSON.parse(localStorage.getItem('roleData'));
                roleData.push(role);
                localStorage.setItem("roleData", JSON.stringify(roleData));
                window.location.href = 'roles.html';
            }
        }
    }
    removeDeselectedEmployees() {
        var ele = document.getElementsByClassName("employee-list");
        if (ele) {
            var j = 0;
            while (j < ele.length) {
                var inputs = ele[j].getElementsByTagName('input');
                if (!inputs[0].checked) {
                    var assignEmployeesDiv = inputs[0].parentElement;
                    assignEmployeesDiv.remove();
                }
                else {
                    j++;
                }
            }
        }
    }
    displayEmployeesToAssign(ele, checkStatus = false) {
        var roleEmployeeDivision = document.createElement("div");
        var image = document.createElement("img");
        image.setAttribute("src", "images/person1.jpg");
        image.setAttribute("class", "display-img");
        roleEmployeeDivision.appendChild(image);
        var name = document.createElement("p");
        var nameValue = ele.empNo + ' ' + ele.firstName + ' ' + ele.lastName;
        var content = document.createTextNode(nameValue);
        name.appendChild(content);
        roleEmployeeDivision.appendChild(name);
        var inputElement = document.createElement("input");
        inputElement.setAttribute("type", "checkbox");
        inputElement.setAttribute('class', "checkClicked");
        if (checkStatus) {
            this.selectedEmployeesList.push(ele.empNo);
            inputElement.setAttribute("checked", "");
        }
        //inputElement.setAttribute('onchange',"addEmployeeToRole(this, '" + ele.empNo + "')");
        var employeeList = document.createElement("div");
        employeeList.setAttribute("class", "employee-list");
        var list = document.getElementById("display-column");
        employeeList.appendChild(roleEmployeeDivision);
        employeeList.appendChild(inputElement);
        list.appendChild(employeeList);
    }
    filterByNames() {
        this.removeDeselectedEmployees();
        var searhFilter = document.getElementById('assign-employees').value;
        if (searhFilter != "") {
            this.cureentEmployeeList = JSON.parse(localStorage.getItem('data'));
            for (var j = 0; j < this.cureentEmployeeList.length; j++) {
                if ((this.cureentEmployeeList[j].firstName.toLowerCase().includes(searhFilter) || this.cureentEmployeeList[j].empNo.includes(searhFilter)) &&
                    this.selectedEmployeesList.indexOf(this.cureentEmployeeList[j].empNo) == -1) {
                    this.displayEmployeesToAssign(this.cureentEmployeeList[j]);
                }
            }
        }
    }
    addEmployeeToRole(className, empNo) {
        if (className.checked) {
            this.selectedEmployeesList.push(empNo);
        }
        else {
            if (this.selectedEmployeesList.indexOf(empNo) != -1) {
                this.selectedEmployeesList.splice(this.selectedEmployeesList.indexOf(empNo), 1);
            }
        }
    }
    getEmployeeDetails(selectedEmployeesList) {
        var list = [];
        selectedEmployeesList.forEach(ele => {
            for (var j = 0; j < this.cureentEmployeeList.length; j++) {
                if (ele == this.cureentEmployeeList[j].empNo) {
                    list.push(this.cureentEmployeeList[j]);
                }
            }
        });
        return list;
    }
    findDuplicateRoles(className) {
        commonobj.border_change(className);
        var name = document.getElementById('designation').value;
        name = name.replace(" ", "");
        var roleData = JSON.parse(localStorage.getItem('roleData'));
        roleData.forEach((ele) => {
            if (name.toLowerCase() == (ele.designation).replace(" ", "").toLowerCase()) {
                document.getElementById('designation').parentElement.appendChild(commonobj.createErrorMessage('Role Already Exista'));
                this.roleExists = true;
            }
        });
    }
}
var addRolesObject = new AddRoles();
document.getElementById('assign-employees').addEventListener('keyup', function () {
    addRolesObject.filterByNames();
});
document.getElementById('designation').addEventListener('blur', function (e) {
    addRolesObject.findDuplicateRoles(e.target);
});
document.getElementsByClassName('add-btn')[0].addEventListener('click', function () {
    addRolesObject.validateRole();
});
document.addEventListener("change", function (e) {
    if (e.target.previousElementSibling?.children[1]) {
        addRolesObject.addEmployeeToRole(e.target, e.target.previousElementSibling.children[1].innerHTML.slice(0, 4));
    }
});
document.addEventListener('click', function (e) {
    if ((e.target).className == 'handle') {
        new CommonOperations().toggleSideBar();
    }
    if (e.target.tagName == "INPUT" || e.target.tagName == "SELECT" || e.target.tagName == "TEXTAREA") {
        new CommonOperations().removeErrorMessage(e.target);
    }
});
