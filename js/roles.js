import { EmployeeOperations } from "./employee.js";
import { CommonOperations } from "./common.js";
class Roles {
    createRoleCard(ele) {
        var parent = document.createElement("div");
        parent.setAttribute("class", "role-card");
        //Role details div
        var roleDetails = document.createElement("div");
        roleDetails.setAttribute("class", "role-details");
        var child = document.createElement("p");
        child.setAttribute("class", "role-name m-8");
        var child1 = document.createElement("b");
        var text = document.createTextNode(ele.designation);
        child1.appendChild(text);
        child.appendChild(child1);
        var secretId = document.createElement("p");
        secretId.appendChild(document.createTextNode(ele.id));
        secretId.style.display = "none";
        child1 = document.createElement("img");
        child1.setAttribute("src", "images/edit.svg");
        //child1.setAttribute('onclick','editRoles(this)');
        child1.setAttribute('id', 'edit-btn');
        roleDetails.appendChild(child);
        roleDetails.appendChild(secretId);
        roleDetails.appendChild(child1);
        parent.appendChild(roleDetails);
        //2 nd Division
        var roleDetails = document.createElement("div");
        roleDetails.setAttribute("class", "role-details");
        child1 = document.createElement("div");
        child1.setAttribute("class", "alignment");
        var img = document.createElement("img");
        img.setAttribute("src", "images/team_svgrepo.com.svg");
        child1.appendChild(img);
        var child2 = document.createElement("p");
        child2.setAttribute("class", "m-8");
        var text = document.createTextNode("Department");
        child2.appendChild(text);
        child1.appendChild(child2);
        roleDetails.appendChild(child1);
        var child2 = document.createElement("p");
        child2.setAttribute("class", "m-8");
        var text = document.createTextNode(ele.roleDepartment);
        child2.appendChild(text);
        roleDetails.appendChild(child2);
        parent.appendChild(roleDetails);
        // 3rd division
        var roleDetails = document.createElement("div");
        roleDetails.setAttribute("class", "role-details");
        child1 = document.createElement("div");
        child1.setAttribute("class", "alignment");
        var img = document.createElement("img");
        img.setAttribute("src", "images/location-pin-alt-1_svgrepo.com.svg");
        child1.appendChild(img);
        var child2 = document.createElement("p");
        child2.setAttribute("class", "m-8");
        var text = document.createTextNode("Location");
        child2.appendChild(text);
        child1.appendChild(child2);
        roleDetails.appendChild(child1);
        var child2 = document.createElement("p");
        child2.setAttribute("class", "m-8");
        var text = document.createTextNode(ele.roleLocation);
        child2.appendChild(text);
        roleDetails.appendChild(child2);
        parent.appendChild(roleDetails);
        // 4 th division
        var roleDetails = document.createElement("div");
        roleDetails.setAttribute("class", "role-details");
        var child2 = document.createElement("p");
        child2.setAttribute("class", "m-8");
        var text = document.createTextNode("Total Employees");
        child2.appendChild(text);
        roleDetails.appendChild(child2);
        child1 = document.createElement("div");
        child1.setAttribute("class", "total-employees");
        var count = ele.employeesList.length;
        if (count > 0) {
            var img1 = document.createElement("img");
            img1.setAttribute("src", "images/p1.webp");
            img1.setAttribute("class", "p1 person-img");
            child1.appendChild(img1);
            count--;
        }
        if (count > 0) {
            var img1 = document.createElement("img");
            img1.setAttribute("src", "images/p2.webp");
            img1.setAttribute("class", "p2 person-img");
            child1.appendChild(img1);
            count--;
        }
        if (count > 0) {
            var img1 = document.createElement("img");
            img1.setAttribute("src", "images/p3.webp");
            img1.setAttribute("class", "p3 person-img");
            child1.appendChild(img1);
            count--;
        }
        if (count > 0) {
            var img1 = document.createElement("img");
            img1.setAttribute("src", "images/p4.webp");
            img1.setAttribute("class", "p4 person-img");
            child1.appendChild(img1);
            count--;
        }
        if (ele.employeesList.length) {
            var child2 = document.createElement("div");
            child2.setAttribute("class", "emp-count");
            var child3 = document.createElement("p");
            child3.setAttribute("class", "emp-count-num");
            if (ele.employeesList.length <= 4) {
                var text = document.createTextNode((ele.employeesList.length).toString());
            }
            else {
                var text = document.createTextNode("+4");
            }
            child3.appendChild(text);
            child2.appendChild(child3);
            child1.appendChild(child2);
        }
        roleDetails.appendChild(child1);
        parent.appendChild(roleDetails);
        //last element
        var hyperLink = document.createElement('a');
        // hyperLink.setAttribute("href","role-descr.html");
        hyperLink.setAttribute("class", "role-descr-btn");
        //hyperLink.setAttribute('onclick','roleEmployees(this)');
        var child2 = document.createElement("p");
        child2.setAttribute("class", "view-employee m-8");
        var text = document.createTextNode("View all employees");
        var img = document.createElement("img");
        img.setAttribute("src", "images/Vector.svg");
        child2.appendChild(text);
        child2.appendChild(img);
        hyperLink.appendChild(child2);
        parent.appendChild(hyperLink);
        //add to section
        var rolesInfo = document.getElementsByClassName("roles-info")[0];
        rolesInfo.appendChild(parent);
    }
    EmployeesList = JSON.parse(localStorage.getItem('roleData'));
    cureentRolesList = [...this.EmployeesList];
    constructor() {
        this.printTable(this.cureentRolesList);
    }
    printTable(data) {
        if (data) {
            data.forEach(element => { this.createRoleCard(element); });
        }
    }
    roleEmployees(className) {
        var roleDetails = className.parentElement.parentElement.firstChild;
        var roleName = roleDetails.firstChild.firstChild.innerHTML;
        var roleId = roleDetails.children[1].innerHTML;
        sessionStorage.setItem('role', JSON.stringify({ 'roleName': roleName, 'id': roleId }));
        window.location.href = 'role-descr.html';
    }
    resetFilters() {
        this.deleteCards();
        var apply = document.getElementsByClassName('apply-btn')[0];
        apply.style.background = "#f17b7b";
        var resetLocation = document.getElementById('role-location');
        resetLocation.selectedIndex = 0;
        var resetLocation = document.getElementById('role-department');
        resetLocation.selectedIndex = 0;
        this.cureentRolesList = [...this.EmployeesList];
        this.printTable(this.cureentRolesList);
    }
    applyFilter() {
        var roleLocation = document.getElementById('role-location').value;
        var roleDepartment = document.getElementById('role-department').value;
        var filterData = [];
        if (!(roleDepartment == "none" && roleLocation == 'none')) {
            for (var i = 0; i < this.EmployeesList.length; i++) {
                if ((this.EmployeesList[i].roleDepartment == roleDepartment || roleDepartment == 'none') && (this.EmployeesList[i].roleLocation == roleLocation || roleLocation == 'none')) {
                    filterData.push(this.EmployeesList[i]);
                }
            }
            this.cureentRolesList = [...filterData];
            this.deleteCards();
            this.printTable(this.cureentRolesList);
        }
    }
    deleteCards() {
        var section = document.getElementsByClassName("roles-info")[0];
        section.innerHTML = "";
    }
    editRoles(className) {
        var roleName = className.parentElement.firstChild.firstChild.innerHTML;
        sessionStorage.setItem("roleDetails", JSON.stringify({ 'roleName': roleName }));
        window.location.href = 'addRoles.html';
    }
}
var rolesObject = new Roles();
var employeeObject = new EmployeeOperations();
new CommonOperations();
document.addEventListener('change', function () {
    employeeObject.activateButton('apply-btn');
});
document.addEventListener('click', function (e) {
    if (e.target.className == 'apply-btn') {
        rolesObject.applyFilter();
    }
    if (e.target.className == 'reset-btn') {
        rolesObject.resetFilters();
    }
    if (e.target.id == 'edit-btn') {
        rolesObject.editRoles(e.target);
    }
    if (e.target.className == 'view-employee m-8') {
        rolesObject.roleEmployees(e.target);
    }
});
