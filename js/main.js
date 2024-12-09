import { EmployeeOperations } from "./employee.js";
import { AddEmployee } from "./addEmployee.js";
import { AddRoles } from "./addRoles.js";
import { Roles } from "./roles.js";
import { RoleDescription } from "./roleDescr.js";
import { CommonOperations } from "./common.js";
export var pages;
(function (pages) {
    pages["employee"] = "employees.html";
    pages["addEmployee"] = "add-employee.html";
    pages["roles"] = "roles.html";
    pages["addRoles"] = "addRoles.html";
    pages["roleDescr"] = "role-descr.html";
})(pages || (pages = {}));
export var styles;
(function (styles) {
    styles["employee"] = "css/employee.css";
    styles["addEmployee"] = "css/add_employee.css";
    styles["roles"] = "css/roles.css";
    styles["addRoles"] = "css/addRole.css";
    styles["roleDescr"] = "css/role-descr.css";
})(styles || (styles = {}));
fetchEmployee(pages.employee, styles.employee);
export async function fetchEmployee(page, css) {
    addStyle(css);
    await fetch(page).then((res) => {
        res.text().then((resp) => {
            document.getElementById("html-content").innerHTML = resp;
            operations(page);
        });
    }).catch(errorMsg => { console.log(errorMsg); });
}
function operations(page) {
    var CommonOperationsObject = new CommonOperations();
    if (page == 'employees.html') {
        ((document.getElementsByClassName('roles')[0]).getElementsByTagName('img')[0]).src = 'images/roles.svg';
        ((document.getElementsByClassName('employees')[0]).getElementsByTagName('img')[0]).src = 'images/Employees.svg';
        var object = new EmployeeOperations();
        for (var i = 0; i < document.getElementsByTagName('li').length; i++) {
            document.getElementsByTagName("li")[i].addEventListener('click', (e) => {
                object.filterByAplhabet('filter', e.target);
            });
        }
        document.getElementById('delete-btn')?.addEventListener('click', () => {
            object.deleteRows();
        });
        for (var i = 0; i < document.getElementsByClassName('dots-image').length; i++) {
            document.getElementsByClassName("dots-image")[i].addEventListener('click', (e) => {
                object.editOptions(e.target);
            });
        }
        for (var i = 0; i < document.getElementsByClassName('edit-option').length; i++) {
            document.getElementsByClassName("edit-option")[i].addEventListener('click', (e) => {
                object.editEmployee(e.target);
            });
        }
        (document.getElementById("html-content")).addEventListener('click', function (e) {
            var targetName = e.target.nodeName;
            if (e.target.id == 'filter-icon') {
                object.removeFilter();
            }
            else if (e.target.className == 'add-btn') {
                fetchEmployee(pages.addEmployee, styles.addEmployee);
            }
            else if (e.target.className == 'export-btn') {
                object.exportData();
            }
            else if (e.target.className == 'apply-btn') {
                object.applyFilterOnEmployees();
            }
            else if (e.target.className == 'reset-btn') {
                object.resetFiltersOnEmployees();
            }
            else if (e.target.className == 'sort-icon') {
                object.sortDataByColumn(e.target.id);
            }
            else if ((e.target).className == 'handle') {
                new CommonOperations().toggleSideBar();
            }
            else if (targetName !== "IMG" && targetName !== "P") {
                if (object.previous) {
                    object.previous.style.display = 'none';
                    object.previous = null;
                }
            }
        }, true);
        (document.getElementById("html-content")).addEventListener('change', function (e) {
            if (e.target.id == 'status' || e.target.id == 'location'
                || e.target.id == 'dept') {
                object.activateButton('apply-btn');
            }
            else if (e.target.className == 'checkbox-btn') {
                object.selectCheckedRows(e.target);
            }
            else if (e.target.className == 'check-selected') {
                object.checkSelectedEmployees(e.target);
            }
        }, true);
    }
    if (page == 'add-employee.html') {
        ((document.getElementsByClassName('roles')[0]).getElementsByTagName('img')[0]).src = 'images/roles.svg';
        ((document.getElementsByClassName('employees')[0]).getElementsByTagName('img')[0]).src = 'images/Employees.svg';
        var addEmployeeObject = new AddEmployee();
        document.getElementById('employee-details')?.addEventListener('submit', function (e) {
            e.preventDefault();
            addEmployeeObject.isFormValid = true;
            addEmployeeObject.validateDetails();
            if (addEmployeeObject.isFormValid && addEmployeeObject.validCombination) {
                fetchEmployee(pages.employee, styles.employee);
            }
        });
        (document.getElementsByClassName('employee-number'))[0]?.addEventListener('blur', function (e) {
            addEmployeeObject.checkDuplicate(e.target);
        });
        (document.getElementsByClassName('date-of-birth'))[0]?.addEventListener('focus', function (e) {
            addEmployeeObject.border_type_change(e.target);
        });
        (document.getElementsByClassName('date-of-birth'))[0].addEventListener('blur', function (e) {
            addEmployeeObject.checkABove18(e.target);
        });
        (document.getElementById("html-content")).addEventListener('click', async function (e) {
            if ((e.target.tagName == "INPUT" || e.target.tagName == "SELECT") && page == 'add-employee.html') {
                CommonOperationsObject.removeErrorMessage(e.target);
            }
            if (e.target.className == 'cancel-btn') {
                addEmployeeObject.closeAll();
                fetchEmployee(pages.employee, styles.employee);
            }
            if ((e.target).className == 'handle') {
                CommonOperationsObject.toggleSideBar();
            }
        });
    }
    if (page == 'roles.html') {
        var rolesObject = new Roles();
        for (var i = 0; i < document.getElementsByClassName("view-employee m-8").length; i++) {
            document.getElementsByClassName("view-employee m-8")[i].addEventListener('click', (e) => {
                rolesObject.roleEmployees(e.target);
                fetchEmployee(pages.roleDescr, styles.roleDescr);
            });
        }
        for (var i = 0; i < document.getElementsByClassName("edit-btn").length; i++) {
            document.getElementsByClassName("edit-btn")[i].addEventListener('click', (e) => {
                rolesObject.editRoles(e.target);
                fetchEmployee(pages.addRoles, styles.addRoles);
            });
        }
        ((document.getElementsByClassName('roles')[0]).getElementsByTagName('img')[0]).src = 'images/roles_red.svg';
        ((document.getElementsByClassName('employees')[0]).getElementsByTagName('img')[0]).src = 'images/team_svgrepo.com.svg';
        (document.getElementById("html-content")).addEventListener('click', async function (e) {
            if (e.target.className == 'apply-btn') {
                rolesObject.applyFilter();
            }
            if (e.target.className == 'reset-btn') {
                rolesObject.resetFilters();
            }
            if ((e.target).className == ' add-roles-btn') {
                fetchEmployee(pages.addRoles, styles.addRoles);
            }
        });
        document.getElementById('role-location')?.addEventListener('change', function (e) {
            new EmployeeOperations().activateButton('apply-btn');
        });
        document.getElementById('role-department')?.addEventListener('change', function (e) {
            new EmployeeOperations().activateButton('apply-btn');
        });
    }
    if (page == 'addRoles.html') {
        var addRolesObject = new AddRoles();
        document.getElementById('assign-employees').addEventListener('keyup', function () {
            addRolesObject.filterByNames();
        });
        document.getElementById('designation').addEventListener('blur', function (e) {
            addRolesObject.findDuplicateRoles(e.target);
        });
        document.getElementsByClassName('add-role-btn-addRole')[0].addEventListener('click', function () {
            addRolesObject.validateRole();
        });
        (document.getElementById("html-content")).addEventListener("change", function (e) {
            if (e.target.previousElementSibling?.children[1]) {
                addRolesObject.addEmployeeToRole(e.target, e.target.previousElementSibling.children[1].innerHTML.slice(0, 4));
            }
        });
        (document.getElementById("html-content")).addEventListener('click', async function (e) {
            if ((e.target).className == 'handle') {
                new CommonOperations().toggleSideBar();
            }
            if (e.target.tagName == "INPUT" || e.target.tagName == "SELECT" || e.target.tagName == "TEXTAREA") {
                new CommonOperations().removeErrorMessage(e.target);
            }
            if ((e.target).className == 'cancel-btn') {
                fetchEmployee(pages.roles, styles.roles);
            }
        });
    }
    if (page == 'role-descr.html') {
        var roleObject = new RoleDescription();
        for (var i = 0; i < document.getElementsByClassName("m-8 align-right").length; i++) {
            document.getElementsByClassName("m-8 align-right")[i].addEventListener('click', (e) => {
                roleObject.viewDetails(e.target);
                fetchEmployee(pages.addEmployee, styles.addEmployee);
            });
        }
        (document.getElementById("html-content")).addEventListener('click', async function (e) {
            if (e.target.className == 'add-roledesc-btn') {
                roleObject.addEmployee();
                fetchEmployee(pages.addEmployee, styles.addEmployee);
            }
        });
        document.getElementById('back-to-roles')?.addEventListener('click', () => {
            fetchEmployee(pages.roles, styles.roles);
        });
    }
}
function addStyle(sheetName) {
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('link');
    style.href = sheetName;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    head.append(style);
    for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href == 'http://127.0.0.1:5500/' + 'css/common.css' || document.styleSheets[i].href == 'http://127.0.0.1:5500/' + sheetName) {
            document.styleSheets[i].disabled = false;
        }
        else {
            document.styleSheets[i].disabled = true;
        }
    }
}
(document.getElementsByClassName('employees'))[0].addEventListener('click', async function () {
    fetchEmployee(pages.employee, styles.employee);
});
(document.getElementsByClassName('roles'))[0].addEventListener('click', async function () {
    fetchEmployee(pages.roles, styles.roles);
});
