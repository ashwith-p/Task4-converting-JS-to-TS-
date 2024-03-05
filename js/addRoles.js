"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleInformation = void 0;
const common_1 = require("./common");
var cureentEmployeeList = (0, common_1.getLocalStorage)('data');
if (!(0, common_1.getLocalStorage)('roleData').length) {
    var roleData = [];
    (0, common_1.setLocalStorage)('roleData', roleData);
    ;
}
class RoleInformation {
    constructor(obj, checkedList) {
        this.id = obj['id'];
        this.designation = obj["designation"];
        this.roleDepartment = obj["role-department"];
        this.description = obj["description"];
        this.roleLocation = obj["role-location"];
        this.assignEmployees = obj["assign-employees"];
        this.employeesList = checkedList;
    }
}
exports.RoleInformation = RoleInformation;
var roleExists = false;
var obj = {};
var editedData = {
    'isEdited': false,
    'cureentEmployeeList': {}
};
var checkedList = []; //name
initialize();
function initialize() {
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
        editedData['isEdited'] = true;
        editedData['cureentEmployeeList'] = cureentEmployeeList;
        document.getElementById("designation").value = employee.designation;
        document.getElementById('role-department').value = employee.roleDepartment;
        document.getElementById('description').value = employee.description;
        document.getElementById('role-location').value = employee.roleLocation;
        (employee.employeesList).forEach(ele => {
            for (var i = 0; i < employeeData.length; i++) {
                if (ele.empNo == employeeData[i].empNo) {
                    displayEmployeesToAssign(employeeData[i], true);
                }
            }
        });
    }
}
function validateRole() {
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
                parent.appendChild((0, common_1.createErrorMessage)("This field is required"));
            }
        }
        else {
            var x = element.id;
            obj[x] = element.value;
        }
    }
    if (!roleExists) {
        obj['id'] = Date.now().toString(); //generate Role Id dynamically
        if (!hasEmptyField) {
            var employeeInRole = getEmployeeDetails(checkedList);
            var role = new RoleInformation(obj, employeeInRole);
            for (var j = 0; j < checkedList.length; j++) {
                for (var i = 0; i < cureentEmployeeList.length; i++) {
                    if (cureentEmployeeList[i].empNo == employeeInRole[j].empNo) {
                        cureentEmployeeList[i].jobTitle = role.designation;
                        cureentEmployeeList[i].location = role.roleLocation;
                        cureentEmployeeList[i].department = role.roleDepartment;
                    }
                }
            }
            if (editedData['isEdited']) {
                localStorage.setItem('roleData', JSON.stringify(editedData['cureentEmployeeList']));
            }
            localStorage.setItem('data', JSON.stringify(cureentEmployeeList));
            checkedList = [];
            var roleData = JSON.parse(localStorage.getItem('roleData'));
            roleData.push(role);
            localStorage.setItem("roleData", JSON.stringify(roleData));
            window.location.href = 'roles.html';
        }
    }
}
function removeDeselectedEmployees() {
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
function displayEmployeesToAssign(ele, checkStatus = false) {
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
    if (checkStatus) {
        checkedList.push(ele.empNo);
        inputElement.setAttribute("checked", "");
    }
    inputElement.setAttribute('onchange', "addEmployeeToRole(this, '" + ele.empNo + "')");
    var employeeList = document.createElement("div");
    employeeList.setAttribute("class", "employee-list");
    var list = document.getElementById("display-column");
    employeeList.appendChild(roleEmployeeDivision);
    employeeList.appendChild(inputElement);
    list.appendChild(employeeList);
}
function filterByNames() {
    removeDeselectedEmployees();
    var searhFilter = document.getElementById('assign-employees').value;
    if (searhFilter != "") {
        cureentEmployeeList = JSON.parse(localStorage.getItem('data'));
        for (var j = 0; j < cureentEmployeeList.length; j++) {
            if ((cureentEmployeeList[j].firstName.toLowerCase().includes(searhFilter) || cureentEmployeeList[j].empNo.includes(searhFilter)) &&
                checkedList.indexOf(cureentEmployeeList[j].empNo) == -1) {
                displayEmployeesToAssign(cureentEmployeeList[j]);
            }
        }
    }
}
function addEmployeeToRole(className, empNo) {
    if (className.checked) {
        checkedList.push(empNo);
    }
    else {
        if (checkedList.indexOf(empNo) != -1) {
            checkedList.splice(checkedList.indexOf(empNo), 1);
        }
    }
}
function getEmployeeDetails(checkedList) {
    var list = [];
    checkedList.forEach(ele => {
        for (var j = 0; j < cureentEmployeeList.length; j++) {
            if (ele == cureentEmployeeList[j].empNo) {
                list.push(cureentEmployeeList[j]);
            }
        }
    });
    return list;
}
function findDuplicateRoles(className) {
    (0, common_1.border_change)(className);
    var name = document.getElementById('designation').value;
    name = name.replace(" ", "");
    var roleData = JSON.parse(localStorage.getItem('roleData'));
    roleData.forEach((ele) => {
        if (name.toLowerCase() == (ele.designation).replace(" ", "").toLowerCase()) {
            document.getElementById('designation').parentElement.appendChild((0, common_1.createErrorMessage)('Role Already Exista'));
            roleExists = true;
        }
    });
}
