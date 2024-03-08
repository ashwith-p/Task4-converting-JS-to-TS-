import { CommonOperations } from "./common.js";
import { employeeDetails,RoleInformation } from "./model.js";
var CommonOperationsObject = new CommonOperations();
if (!CommonOperationsObject.getLocalStorage('data')) {
    var myObject: employeeDetails[] = [];
    CommonOperationsObject.setLocalStorage('data', myObject);
}
var checkBorder: boolean = false;
var isFormValid = true;
var cureentEmployeeList: employeeDetails[] = [];
if (sessionStorage.getItem('updateDetails')) {
    var viewOrEdit = JSON.parse(sessionStorage.getItem('updateDetails')!);
}
var roleId: keyBasedIndexing;
var roleData: RoleInformation[] = CommonOperationsObject.getLocalStorage('roleData') as RoleInformation[];
export interface keyBasedIndexing {
    [index: string]: string;
}

var role: RoleInformation;
var roleInfo: string;
var currentRoles: RoleInformation[] = [];
var validCombination = false;
var classNameMapProperty: keyBasedIndexing = {
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
}



employeeInitialize();
function employeeInitialize() {
    validDates();
    var details = CommonOperationsObject.getLocalStorage('data') as employeeDetails[];
    roleId = JSON.parse(sessionStorage.getItem('roleId')!);
    if (roleData) {
        var selectRole = document.getElementsByClassName('job-title')[0] as HTMLElement;
        roleData.forEach((rolename: RoleInformation) => {
            var option = document.createElement("option");
            option.appendChild(document.createTextNode(rolename.designation));
            option.setAttribute('value', rolename.designation);
            selectRole.append(option);
        });
    }
    if (roleId) {
        roleInfo = roleId.roleId;
    }
    var employee: employeeDetails = new employeeDetails({}, "")
    if (viewOrEdit != null) {
        viewOrEdit['isEdited'] = true;
        details.forEach((ele: employeeDetails) => {
            if (ele.empNo == viewOrEdit.employeeNumber) {
                employee = ele;
            }
            else {
                cureentEmployeeList.push(ele);
            }
        });
        for (var i in classNameMapProperty) {
            var element: HTMLInputElement = document.querySelector('.' + classNameMapProperty[i])!;
            if (i == 'joining-date') {
                element.value = employee[i].split('-').reverse().join('-');
            }
            else { element.value = employee[i]; }
        }

        if (viewOrEdit.functionality == 'View Details') {
            (document.getElementsByClassName('cancel-btn')[0] as HTMLInputElement).value = "close";
            document.getElementsByClassName('heading')[0].innerHTML = "View Employee";
            (document.getElementsByClassName('add-btn')[0] as HTMLElement).style.display = "none";
            for (var i in classNameMapProperty) {
                document.querySelector('.' + classNameMapProperty[i])!.setAttribute('disabled', "");
            }
            sessionStorage.removeItem('updateDetails');
        }
        else {
            document.getElementsByClassName('add-btn')[0].nodeValue = "Edit employee";
            document.getElementsByClassName('heading')[0].innerHTML = "Edit Employee";
        }

    }

    if (roleInfo) {
        roleData.forEach((ele: RoleInformation) => {
            if (ele.id == roleInfo) {
                role = ele;
            }
            else {
                currentRoles.push(ele);
            }
        });
        (document.getElementsByClassName('job-title')[0] as HTMLInputElement).value = role.designation;
        document.getElementsByClassName('job-title')[0].setAttribute("disabled", "");
        (document.getElementsByClassName('department')[0] as HTMLInputElement).value = role.roleDepartment;
        document.getElementsByClassName('department')[0].setAttribute("disabled", "");
        (document.getElementsByClassName('location')[0] as HTMLInputElement).value = role.roleLocation;
        document.getElementsByClassName('location')[0].setAttribute("disabled", "");

    }

}
function getElementValue(propertyName: string) {
    return ((document.getElementsByClassName(propertyName)[0]) as HTMLInputElement).value;
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

function checkDuplicate(className: HTMLInputElement) {
    var dataInLocalStorage = CommonOperationsObject.getLocalStorage('data') as employeeDetails[];
    if (dataInLocalStorage.length) {
        for (var j = 0; j < dataInLocalStorage.length; j++) {
            if (dataInLocalStorage[j].empNo == className.value) {
                isFormValid = false;
                ((className.parentElement) as HTMLElement).appendChild(CommonOperationsObject.createErrorMessage("Eployee No. Already Exists"));
                break;
            }
        }
    }
}

function border_type_change(className: HTMLInputElement) {
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
    var form: HTMLFormElement = document.getElementById("employee-details")! as HTMLFormElement;
    for (var i = 0; i < form.elements.length; i++) {
        var element: HTMLInputElement = form.elements[i] as HTMLInputElement;
        if ((element.value)!.length == 0) {
            var parentId: string;
            isFormValid = false;
            var parent = (element.parentNode) as HTMLElement;
            var a = parent.getElementsByTagName("span");
            if (a.length == 0) {
                element.style.border = "2px solid red";
                parentId = parent.id;

                document.getElementById(parentId)!.appendChild(CommonOperationsObject.createErrorMessage("This field is required"));
            }
        }
    }
    if (isFormValid) {
        let employeeObject: { [key: string]: string } = {};
        for (var j in classNameMapProperty) {
            if (classNameMapProperty[j] == 'joining-date') {
                employeeObject[j] = getElementValue(classNameMapProperty[j])!.split('-').reverse().join('-');
            }
            else {
                employeeObject[j] = getElementValue(classNameMapProperty[j]);
            }
        }

        var obj = new employeeDetails(employeeObject, "Active");
        var validCombination = false;
        roleData.forEach((rolecombonation: RoleInformation) => {
            if (rolecombonation.designation == obj.jobTitle && rolecombonation.roleDepartment == obj.department && rolecombonation.roleLocation == obj.location) {
                validCombination = true;
            }
        });
        if (validCombination) {
            sessionStorage.removeItem('updateDetails');
            if (viewOrEdit) {
                if (viewOrEdit['isEdited']) {
                    var reflectOnRole = viewOrEdit['employeeNumber'];
                    roleData.forEach((roles: RoleInformation) => {
                        if (roles.designation == obj.jobTitle) {
                            var hasExists = false;
                            (roles.employeesList).forEach((x: employeeDetails) => {
                                if (x == reflectOnRole) {
                                    hasExists = true;
                                }
                            })
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

                    })
                    CommonOperationsObject.setLocalStorage('roleData', roleData);
                    CommonOperationsObject.setLocalStorage('data', cureentEmployeeList);
                }
            }
            var data = CommonOperationsObject.getLocalStorage('data') as employeeDetails[];
            data.push(obj);
            CommonOperationsObject.setLocalStorage('data', data);
            if (roleInfo) {
                role.employeesList.push(obj);
                currentRoles.push(role);
                CommonOperationsObject.setLocalStorage('roleData', currentRoles);;
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

function checkABove18(className: HTMLElement) {
    border_type_change((className) as HTMLInputElement);
    var birthDate = new Date(className.nodeValue!);
    var currentDate = new Date();
    if (!(currentDate.getFullYear() - birthDate.getFullYear() >= 18)) {
        isFormValid = false;
        ((className.parentElement) as HTMLElement).appendChild(CommonOperationsObject.createErrorMessage("Age is less than 18"));
    }
}

document.getElementById('employee-details')!.addEventListener('submit', function (e) {
    e.preventDefault();
    validateDetails();
    if (isFormValid && validCombination) {
        window.location.href = 'employees.html';
    }
})

function closeAll() {
    sessionStorage.removeItem('roleId');
    window.location.href = 'employees.html';
    if (sessionStorage.getItem('updateDetails')) {
        sessionStorage.removeItem('updateDetails');
    }
}

(document.getElementsByClassName('employee-number')!)[0].addEventListener('blur', function (e) {
    checkDuplicate(e.target! as HTMLInputElement);
});
(document.getElementsByClassName('date-of-birth')!)[0].addEventListener('focus', function (e) {
    border_type_change(e.target! as HTMLInputElement);
});
(document.getElementsByClassName('date-of-birth')!)[0].addEventListener('blur', function (e) {
    checkABove18(e.target! as HTMLElement);
});
document.addEventListener('click',function(e){
    if((e.target! as HTMLElement).tagName=="INPUT" || (e.target! as HTMLElement).tagName=="SELECT")
    {
        CommonOperationsObject.removeErrorMessage(e.target! as HTMLElement);
    }
    if((e.target! as HTMLElement).className=='cancel-btn'){
        closeAll();
    }
    if(((e.target!) as HTMLElement).className=='handle'){
        CommonOperationsObject.toggleSideBar();
    }
})