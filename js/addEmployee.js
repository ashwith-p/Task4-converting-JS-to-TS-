import { CommonOperations } from "./common.js";
import { employeeDetails } from "./model.js";
var CommonOperationsObject = new CommonOperations();
if (!CommonOperationsObject.getLocalStorage('data')) {
    var myObject = [];
    CommonOperationsObject.setLocalStorage('data', myObject);
}
var checkBorder = false;
var isFormValid = true;
var cureentEmployeeList = [];
if (sessionStorage.getItem('updateDetails')) {
    var viewOrEdit = JSON.parse(sessionStorage.getItem('updateDetails'));
}
var roleId;
var roleData = CommonOperationsObject.getLocalStorage('roleData');
var role;
var roleInfo;
var currentRoles = [];
var validCombination = false;
var classNameMapProperty = {
    'empNo': 'employee-number',
    'firstName': 'first-name',
    'lastName': 'last-name',
    'dateOfBirth': 'date-of-birth',
    'emailId': 'email-id',
    "mobileNo": 'mobile-no',
    'joiningDate': 'joining-date',
    "location": 'location',
    'jobTitle': 'job-title',
    'department': 'department',
    'assignManager': 'assign-manager',
    'assignProject': 'assign-project'
};
employeeInitialize();
function employeeInitialize() {
    validDates();
    var details = CommonOperationsObject.getLocalStorage('data');
    roleId = JSON.parse(sessionStorage.getItem('roleId'));
    if (roleData) {
        var selectRole = document.getElementsByClassName('job-title')[0];
        roleData.forEach((rolename) => {
            var option = document.createElement("option");
            option.appendChild(document.createTextNode(rolename.designation));
            option.setAttribute('value', rolename.designation);
            selectRole.append(option);
        });
    }
    if (roleId) {
        roleInfo = roleId.roleId;
    }
    var employee = new employeeDetails({}, "");
    if (viewOrEdit != null) {
        viewOrEdit['isEdited'] = true;
        details.forEach((ele) => {
            if (ele.empNo == viewOrEdit.employeeNumber) {
                employee = ele;
            }
            else {
                cureentEmployeeList.push(ele);
            }
        });
        for (var i in classNameMapProperty) {
            var element = document.querySelector('.' + classNameMapProperty[i]);
            if (i == 'joining-date') {
                element.value = employee[i].split('-').reverse().join('-');
            }
            else {
                element.value = employee[i];
            }
        }
        if (viewOrEdit.functionality == 'View Details') {
            document.getElementsByClassName('cancel-btn')[0].value = "close";
            document.getElementsByClassName('heading')[0].innerHTML = "View Employee";
            document.getElementsByClassName('add-btn')[0].style.display = "none";
            for (var i in classNameMapProperty) {
                document.querySelector('.' + classNameMapProperty[i]).setAttribute('disabled', "");
            }
            sessionStorage.removeItem('updateDetails');
        }
        else {
            document.getElementsByClassName('add-btn')[0].nodeValue = "Edit employee";
            document.getElementsByClassName('heading')[0].innerHTML = "Edit Employee";
        }
    }
    if (roleInfo) {
        roleData.forEach((ele) => {
            if (ele.id == roleInfo) {
                role = ele;
            }
            else {
                currentRoles.push(ele);
            }
        });
        document.getElementsByClassName('job-title')[0].value = role.designation;
        document.getElementsByClassName('job-title')[0].setAttribute("disabled", "");
        document.getElementsByClassName('department')[0].value = role.roleDepartment;
        document.getElementsByClassName('department')[0].setAttribute("disabled", "");
        document.getElementsByClassName('location')[0].value = role.roleLocation;
        document.getElementsByClassName('location')[0].setAttribute("disabled", "");
    }
}
function getElementValue(propertyName) {
    return (document.getElementsByClassName(propertyName)[0]).value;
}
function validDates() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    var day = currentDate.getDate().toString().padStart(2, '0');
    var minYear = year - 100;
    var formattedDate = year + '-' + month + '-' + day;
    var dob = document.getElementsByClassName('date-of-birth')[0];
    var joiningDate = document.getElementsByClassName('joining-date')[0];
    joiningDate.setAttribute('max', formattedDate);
    var min18Years = year - 60;
    dob.setAttribute("max", formattedDate);
    currentDate.setFullYear(minYear);
    var formattedDate = minYear + '-' + month + '-' + day;
    dob.setAttribute('min', formattedDate);
    currentDate.setFullYear(min18Years);
    formattedDate = min18Years + '-' + month + '-' + day;
    joiningDate.setAttribute("min", formattedDate);
}
function checkDuplicate(className) {
    var dataInLocalStorage = CommonOperationsObject.getLocalStorage('data');
    if (dataInLocalStorage.length) {
        for (var j = 0; j < dataInLocalStorage.length; j++) {
            if (dataInLocalStorage[j].empNo == className.value) {
                isFormValid = false;
                (className.parentElement).appendChild(CommonOperationsObject.createErrorMessage("Eployee No. Already Exists"));
                break;
            }
        }
    }
}
function border_type_change(className) {
    if (!checkBorder) {
        className.type = "date";
        className.style.border = "2px solid rgb(0, 126, 252)";
        className.style.padding = "5px";
        checkBorder = true;
    }
    else {
        className.type = "text";
        className.style.border = '2px solid #e2e2e2';
        className.style.padding = "6px";
        checkBorder = false;
    }
    CommonOperationsObject.removeErrorMessage(className);
}
function validateDetails() {
    var form = document.getElementById("employee-details");
    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        if ((element.value).length == 0) {
            var parentId;
            isFormValid = false;
            var parent = (element.parentNode);
            var a = parent.getElementsByTagName("span");
            if (a.length == 0) {
                element.style.border = "2px solid red";
                parentId = parent.id;
                document.getElementById(parentId).appendChild(CommonOperationsObject.createErrorMessage("This field is required"));
            }
        }
    }
    if (isFormValid) {
        let employeeObject = {};
        for (var j in classNameMapProperty) {
            if (classNameMapProperty[j] == 'joining-date') {
                employeeObject[j] = getElementValue(classNameMapProperty[j]).split('-').reverse().join('-');
            }
            else {
                employeeObject[j] = getElementValue(classNameMapProperty[j]);
            }
        }
        var obj = new employeeDetails(employeeObject, "Active");
        var validCombination = false;
        roleData.forEach((rolecombonation) => {
            if (rolecombonation.designation == obj.jobTitle && rolecombonation.roleDepartment == obj.department && rolecombonation.roleLocation == obj.location) {
                validCombination = true;
            }
        });
        if (validCombination) {
            sessionStorage.removeItem('updateDetails');
            if (viewOrEdit) {
                if (viewOrEdit['isEdited']) {
                    var reflectOnRole = viewOrEdit['employeeNumber'];
                    roleData.forEach((roles) => {
                        if (roles.designation == obj.jobTitle) {
                            var hasExists = false;
                            (roles.employeesList).forEach((x) => {
                                if (x == reflectOnRole) {
                                    hasExists = true;
                                }
                            });
                            if (!hasExists) {
                                roles.employeesList.push(obj);
                            }
                        }
                        else {
                            for (var i = 0; i < roles.employeesList.length; i++) {
                                if (reflectOnRole == (roles.employeesList)[i].empNo) {
                                    (roles.employeesList).splice(i, 1);
                                }
                            }
                        }
                    });
                    CommonOperationsObject.setLocalStorage('roleData', roleData);
                    CommonOperationsObject.setLocalStorage('data', cureentEmployeeList);
                }
            }
            var data = CommonOperationsObject.getLocalStorage('data');
            data.push(obj);
            CommonOperationsObject.setLocalStorage('data', data);
            if (roleInfo) {
                role.employeesList.push(obj);
                currentRoles.push(role);
                CommonOperationsObject.setLocalStorage('roleData', currentRoles);
                ;
                sessionStorage.removeItem('roleId');
                window.location.href = "roles.html";
            }
            alert("Date added successfully!!");
            window.location.href = 'employees.html';
        }
        else {
            window.alert("Role, Location and Department combination is not valid");
        }
    }
}
function checkABove18(className) {
    border_type_change((className));
    var birthDate = new Date(className.nodeValue);
    var currentDate = new Date();
    if (!(currentDate.getFullYear() - birthDate.getFullYear() >= 18)) {
        isFormValid = false;
        (className.parentElement).appendChild(CommonOperationsObject.createErrorMessage("Age is less than 18"));
    }
}
document.getElementById('employee-details').addEventListener('submit', function (e) {
    e.preventDefault();
    validateDetails();
    if (isFormValid && validCombination) {
        window.location.href = 'employees.html';
    }
});
function closeAll() {
    sessionStorage.removeItem('roleId');
    window.location.href = 'employees.html';
    if (sessionStorage.getItem('updateDetails')) {
        sessionStorage.removeItem('updateDetails');
    }
}
(document.getElementsByClassName('employee-number'))[0].addEventListener('blur', function (e) {
    checkDuplicate(e.target);
});
(document.getElementsByClassName('date-of-birth'))[0].addEventListener('focus', function (e) {
    border_type_change(e.target);
});
(document.getElementsByClassName('date-of-birth'))[0].addEventListener('blur', function (e) {
    checkABove18(e.target);
});
document.addEventListener('click', function (e) {
    if (e.target.tagName == "INPUT" || e.target.tagName == "SELECT") {
        CommonOperationsObject.removeErrorMessage(e.target);
    }
    if (e.target.className == 'cancel-btn') {
        closeAll();
    }
    if ((e.target).className == 'handle') {
        CommonOperationsObject.toggleSideBar();
    }
});
