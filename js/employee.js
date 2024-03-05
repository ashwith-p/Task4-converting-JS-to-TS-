"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var table = document.querySelector(".employee-table");
var rowLength = table.rows.length;
var employeesList = JSON.parse(localStorage.getItem('data')); //change name to employeesList
var cureentEmployeeList = employeesList.slice(); //change name
window.onload = () => { printEmployeesTable(employeesList); };
var alphabetEployeeData = [];
createAplhabetFilter();
var appliedFilter = false;
var previous;
var alphabetFilter = false;
function tableStructure(element) {
    var row = table.insertRow(-1);
    // First td
    var checkBox = row.insertCell(0); //change name
    var inputElement = document.createElement("input");
    inputElement.setAttribute("type", "checkbox");
    inputElement.setAttribute('onclick', "checkSelectedEmployees(this)");
    checkBox.appendChild(inputElement);
    //Second td
    var useDetails = row.insertCell(1);
    var path = "images/person1.jpg";
    var userNameMail = document.createElement("div");
    userNameMail.setAttribute("class", 'user-details user-width');
    var userImage = document.createElement("img");
    userImage.setAttribute('src', path);
    userImage.setAttribute('alt', 'person1');
    var userInfo = document.createElement("div");
    var userName = document.createElement("p");
    userName.setAttribute("class", "employee-name");
    var textnode = document.createTextNode(element.firstName + ' ' + element.lastName);
    userName.appendChild(textnode);
    var userMail = document.createElement("p");
    userMail.setAttribute("class", "email-id");
    var textnode = document.createTextNode(element.emailId);
    userMail.appendChild(textnode);
    userInfo.appendChild(userName);
    userInfo.appendChild(userMail);
    userNameMail.appendChild(userImage);
    userNameMail.appendChild(userInfo);
    useDetails.appendChild(userNameMail);
    //Third td
    var employeeLocation = row.insertCell(2);
    employeeLocation.innerHTML = element.location;
    //Fourth cell
    var employeeDepartment = row.insertCell(3);
    employeeDepartment.innerHTML = element.department;
    //Fifth cell
    var employeeRole = row.insertCell(4);
    employeeRole.innerHTML = element.jobTitle;
    //Sixth cell
    var employeeNum = row.insertCell(5);
    employeeNum.innerHTML = element.empNo;
    //Seventh cell
    var employeeStatus = row.insertCell(6);
    var statusBtn = document.createElement("button");
    statusBtn.setAttribute("class", "status-btn");
    var textnode = document.createTextNode(element.status);
    statusBtn.appendChild(textnode);
    employeeStatus.appendChild(statusBtn);
    //Eight cell
    var joiningDate = row.insertCell(7);
    joiningDate.innerHTML = element.joiningDate;
    //Ninth cell
    var modifyDetails = row.insertCell(8);
    var elipsisImage = document.createElement("img");
    elipsisImage.setAttribute("src", "images/ellipsis-solid.svg");
    elipsisImage.setAttribute("alt", "3-dots image");
    elipsisImage.setAttribute('onclick', 'editOptions(this)');
    var div = document.createElement("div");
    div.setAttribute('class', 'floating-div');
    var p = document.createElement("p");
    var data1 = document.createTextNode("View Details");
    p.setAttribute("onclick", "editEmployee(this)");
    p.appendChild(data1);
    div.appendChild(p);
    var p = document.createElement("p");
    p.setAttribute("onclick", "editEmployee(this)");
    var data1 = document.createTextNode("Edit");
    p.appendChild(data1);
    div.appendChild(p);
    var p = document.createElement("p");
    var data1 = document.createTextNode("Delete");
    p.setAttribute("onclick", `editEmployee(this)`);
    p.appendChild(data1);
    div.appendChild(p);
    elipsisImage.setAttribute("width", "15px");
    elipsisImage.setAttribute("class", "dots-image");
    modifyDetails.appendChild(elipsisImage);
    modifyDetails.appendChild(div);
}
function printEmployeesTable(data) {
    data.forEach(element => tableStructure(element));
}
function applyFilterOnEmployees(removeFilter = false) {
    appliedFilter = true;
    var filteredEmployees = [];
    var dept = document.getElementById("dept").value;
    var loc = document.getElementById("location").value;
    var status = document.getElementById("status").value;
    if (alphabetEployeeData.length > 0 || alphabetFilter) {
        cureentEmployeeList = alphabetEployeeData;
    }
    else {
        cureentEmployeeList = employeesList;
    }
    //remove unwanted code
    if (!(dept == 'none' && loc == 'none' && status == 'none')) {
        deleteEmployees();
        for (var i = 0; i < cureentEmployeeList.length; i++) {
            //remove unwanted variable declaration
            if ((dept == cureentEmployeeList[i].department || dept == 'none') &&
                (loc == cureentEmployeeList[i].location || loc == 'none') &&
                (status == cureentEmployeeList[i].status || status == 'none')) {
                tableStructure(cureentEmployeeList[i]);
                filteredEmployees.push(cureentEmployeeList[i]);
            }
        }
        cureentEmployeeList = filteredEmployees;
    }
    else {
        if (alphabetEployeeData.length == 0 && removeFilter) {
            printEmployeesTable(employeesList);
        }
    }
}
function isSorted(columnName) {
    deleteEmployees();
    for (var i = 0; i < cureentEmployeeList.length - 1; i++) {
        if ((cureentEmployeeList[i])[columnName] > (cureentEmployeeList[i + 1])[columnName]) {
            return false;
        }
    }
    return true;
}
function sortDataByColumn(columnName, orderBy = "asec") {
    var isAsec = isSorted(columnName);
    if (isAsec) {
        orderBy = "desc";
    }
    if (orderBy == 'asec') {
        cureentEmployeeList.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
    }
    else {
        cureentEmployeeList.sort((a, b) => (a[columnName] < b[columnName]) ? 1 : -1);
    }
    printEmployeesTable(cureentEmployeeList);
}
function deleteEmployees() {
    var table = document.querySelector(".employee-table");
    var rowLength = table.rows.length;
    for (var i = 1; i < rowLength; i++) {
        table.deleteRow(1);
    }
}
function resetFiltersOnEmployees() {
    appliedFilter = false;
    var status_reset = document.getElementById("status");
    status_reset.selectedIndex = 0;
    var location_reset = document.getElementById("location");
    location_reset.selectedIndex = 0;
    var department_reset = document.getElementById("dept");
    department_reset.selectedIndex = 0;
    var change_color = document.querySelector('.apply-btn');
    change_color.style.backgroundColor = "#ffabab";
    cureentEmployeeList = [];
    deleteEmployees();
    if (alphabetEployeeData.length == 0 && !alphabetFilter) {
        cureentEmployeeList = employeesList.slice();
        printEmployeesTable(cureentEmployeeList);
    }
    else {
        filterByAplhabet('filter', null);
        cureentEmployeeList = alphabetEployeeData;
    }
}
function filterByAplhabet(name, className) {
    if (alphabetFilter) {
        alphabetFilter = false;
        alphabetEployeeData = [];
        applyFilterOnEmployees();
    }
    alphabetFilter = true;
    let alphabet;
    //remove
    var liTags = document.getElementsByClassName(name)[0].getElementsByTagName('li');
    for (var i = 0; i < liTags.length; i++) {
        if (liTags[i].style.backgroundColor == "rgb(244, 72, 72)") {
            if (!className) {
                alphabet = liTags[i].firstChild.innerHTML;
            }
            else {
                liTags[i].style.backgroundColor = "#EAEBEE";
                liTags[i].children[0].style.color = "#919DAC";
            }
        }
    }
    if (className) {
        className.style.backgroundColor = "#F44848";
        className.children[0].style.color = "#ffffff";
        alphabet = className.firstChild.innerHTML;
    }
    document.getElementById("filter-icon").setAttribute('src', 'images/filter.svg');
    if (cureentEmployeeList.length || appliedFilter) {
        cureentEmployeeList.forEach(element => {
            if (element.firstName.charAt(0) == alphabet) {
                alphabetEployeeData.push(element);
            }
        });
    }
    else {
        employeesList.forEach(element => {
            if (element.firstName.charAt(0) == alphabet) {
                alphabetEployeeData.push(element);
            }
        });
    }
    deleteEmployees();
    printEmployeesTable(alphabetEployeeData);
}
function activateButton(name) {
    let className;
    className = document.querySelector('.' + name);
    className.style.backgroundColor = "#F44848";
    className.style.color = "#ffffff";
}
function convertToCSV() {
    var stringData = [];
    employeesList.forEach((ele) => {
        stringData.push(ele.toString());
    });
    const array = [Object.keys(cureentEmployeeList[0])].concat(stringData);
    return array.map(it => {
        return Object.values(it).toString();
    }).join('\n');
}
function exportData() {
    var csvData = convertToCSV();
    const blob = new Blob([csvData], { type: 'csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'example.csv';
    link.click();
}
function removeFilter() {
    document.getElementById("filter-icon").setAttribute('src', 'images/temp.svg');
    var liTags = document.getElementsByClassName('filter')[0].getElementsByTagName('li');
    for (var i = 0; i < liTags.length; i++) {
        if (liTags[i].style.backgroundColor == "rgb(244, 72, 72)") {
            liTags[i].style.backgroundColor = "#EAEBEE";
            liTags[i].children[0].style.color = "#919DAC";
        }
    }
    deleteEmployees();
    alphabetEployeeData = [];
    alphabetFilter = false;
    applyFilterOnEmployees(true);
}
function selectCheckedRows(className) {
    var tableInputs = className.parentElement.parentElement.parentElement.parentElement;
    var inputs = tableInputs.getElementsByTagName('input');
    for (var i = 1; i < inputs.length; i++) {
        inputs[i].checked = className.checked;
        isAllSelected(className.checked);
    }
}
function checkSelectedEmployees(className) {
    var checkAllSelected = false, allFalse = false;
    var unselectCheckbox = document.querySelector('.checkbox-btn');
    unselectCheckbox.checked = false;
    var table = className.parentElement.parentElement.parentElement.parentElement;
    var inputs = table.getElementsByTagName('input');
    for (var i = 1; i < inputs.length; i++) {
        if (inputs[i].checked) {
            allFalse = true;
        }
        else {
            checkAllSelected = true;
        }
    }
    if (!checkAllSelected) {
        unselectCheckbox.checked = true;
    }
    isAllSelected(allFalse);
}
function isAllSelected(allFalse) {
    if (allFalse) {
        changeBgColor("delete-btn", "#F44848");
    }
    else {
        changeBgColor("delete-btn", "#F89191");
    }
}
function changeBgColor(className, value) {
    document.getElementById(className).style.backgroundColor = value;
}
function deleteRows() {
    var inputs = table.getElementsByTagName("input");
    var roleData = JSON.parse(localStorage.getItem("roleData"));
    if (confirm("Are you sure.You want to Delete the data")) {
        for (var i = 1; i < inputs.length; i++) {
            if (inputs[i].checked) {
                var tr = inputs[i].parentElement.parentElement;
                var employeeNo = tr.childNodes[5].innerHTML;
                employeesList.forEach(ele => {
                    if (ele.empNo == employeeNo) {
                        var index = employeesList.indexOf(ele);
                        if (index !== -1) {
                            employeesList.splice(index, 1);
                        }
                        if (roleData != null) {
                            roleData.forEach((role) => {
                                if (ele.jobTitle == role.designation) {
                                    (role.employeesList).forEach((employee) => {
                                        if (employee.empNo == ele.empNo) {
                                            (role.employeesList).splice((role.employeesList).indexOf(employee), 1);
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }
        localStorage.setItem("data", JSON.stringify(employeesList));
        localStorage.setItem('roleData', JSON.stringify(roleData));
        deleteEmployees();
        printEmployeesTable(employeesList);
        if (inputs[0].checked) {
            inputs[0].checked = false;
        }
    }
    else {
        for (var i = 1; i < inputs.length; i++) {
            inputs[i].checked = false;
        }
    }
    document.getElementById("delete-btn").style.backgroundColor = "#F89191";
}
function createAplhabetFilter() {
    var ul = document.getElementById('create-li');
    for (var i = 65; i <= 90; i++) {
        var li = document.createElement("li");
        var a = document.createElement('a');
        a.setAttribute("href", '#');
        li.setAttribute("onclick", "filterByAplhabet('filter',this)");
        var char = document.createTextNode(String.fromCharCode(i));
        a.appendChild(char);
        li.appendChild(a);
        ul.appendChild(li);
    }
}
document.addEventListener('click', function (e) {
    var targetName = e.target.nodeName;
    if (targetName != "IMG" && targetName != "P") {
        if (previous) {
            previous.style.display = 'none';
            previous = null;
        }
    }
}, true);
function editOptions(className) {
    if (previous == className.parentElement.children[1]) {
        className.parentElement.children[1].style.display = 'none';
        previous = null;
    }
    else {
        if (previous) {
            previous.style.display = "none";
        }
        className.parentElement.children[1].style.display = 'block';
        previous = className.parentElement.children[1];
    }
}
function editEmployee(className) {
    var functionality = className.innerHTML;
    var empNo = className.parentElement.parentElement.parentElement;
    if (functionality == 'Delete') {
        empNo.firstChild.firstChild.checked = true;
        deleteRows();
    }
    else {
        var employeeNo = empNo.children[5].innerHTML;
        var obj = {
            'employeeNumber': employeeNo,
            'functionality': functionality,
            'isEdited': false
        };
        sessionStorage.setItem("updateDetails", JSON.stringify(obj));
        window.location.href = 'add-employee.html';
    }
}
