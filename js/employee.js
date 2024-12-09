import { fetchEmployee, pages, styles } from "./main.js";
export class EmployeeOperations {
    employeesList;
    cureentEmployeeList;
    alphabetEployeeData = [];
    appliedFilter = false;
    previous;
    alphabetFilter = false;
    constructor() {
        if (!localStorage.getItem('data')) {
            var myObject = [];
            localStorage.setItem('data', JSON.stringify(myObject));
        }
        this.employeesList = JSON.parse(localStorage.getItem('data'));
        this.cureentEmployeeList = this.employeesList.slice();
        this.printEmployeesTable(this.employeesList);
        this.createAplhabetFilter();
    }
    tableStructure(element) {
        var table = document.querySelector(".employee-table");
        if (table) {
            var row = table.insertRow(-1);
            // First td
            var checkBox = row.insertCell(0);
            var inputElement = document.createElement("input");
            inputElement.setAttribute("type", "checkbox");
            inputElement.setAttribute('class', "check-selected");
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
            var div = document.createElement("div");
            div.setAttribute('class', 'floating-div');
            var p = document.createElement("p");
            var data1 = document.createTextNode("View Details");
            p.setAttribute("class", "edit-option");
            p.appendChild(data1);
            div.appendChild(p);
            var p = document.createElement("p");
            p.setAttribute("class", "edit-option");
            var data1 = document.createTextNode("Edit");
            p.appendChild(data1);
            div.appendChild(p);
            var p = document.createElement("p");
            var data1 = document.createTextNode("Delete");
            p.setAttribute("class", "edit-option");
            p.appendChild(data1);
            div.appendChild(p);
            elipsisImage.setAttribute("width", "15px");
            elipsisImage.setAttribute("class", "dots-image");
            modifyDetails.appendChild(elipsisImage);
            modifyDetails.appendChild(div);
        }
    }
    printEmployeesTable(data) {
        data.forEach(element => this.tableStructure(element));
    }
    applyFilterOnEmployees(removeFilter = false) {
        this.appliedFilter = true;
        var filteredEmployees = [];
        var dept = document.getElementById("dept").value;
        var loc = document.getElementById("location").value;
        var status = document.getElementById("status").value;
        if (this.alphabetEployeeData.length > 0 || this.alphabetFilter) {
            this.cureentEmployeeList = this.alphabetEployeeData;
        }
        else {
            this.cureentEmployeeList = this.employeesList;
        }
        if (!(dept == 'none' && loc == 'none' && status == 'none')) {
            this.deleteEmployees();
            for (var i = 0; i < this.cureentEmployeeList.length; i++) {
                if ((dept == this.cureentEmployeeList[i].department || dept == 'none') &&
                    (loc == this.cureentEmployeeList[i].location || loc == 'none') &&
                    (status == this.cureentEmployeeList[i].status || status == 'none')) {
                    this.tableStructure(this.cureentEmployeeList[i]);
                    filteredEmployees.push(this.cureentEmployeeList[i]);
                }
            }
            this.cureentEmployeeList = filteredEmployees;
        }
        else {
            if (this.alphabetEployeeData.length == 0 && removeFilter) {
                this.printEmployeesTable(this.employeesList);
            }
        }
    }
    isSorted(columnName) {
        this.deleteEmployees();
        for (var i = 0; i < this.cureentEmployeeList.length - 1; i++) {
            if ((this.cureentEmployeeList[i])[columnName] > (this.cureentEmployeeList[i + 1])[columnName]) {
                return false;
            }
        }
        return true;
    }
    sortDataByColumn(columnName) {
        var isAsec = this.isSorted(columnName);
        if (!isAsec) {
            this.cureentEmployeeList.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
        }
        else {
            this.cureentEmployeeList.sort((a, b) => (a[columnName] < b[columnName]) ? 1 : -1);
        }
        this.printEmployeesTable(this.cureentEmployeeList);
    }
    deleteEmployees() {
        var table = document.querySelector(".employee-table");
        var rowLength = table.rows.length;
        for (var i = 1; i < rowLength; i++) {
            table.deleteRow(1);
        }
    }
    resetFiltersOnEmployees() {
        this.appliedFilter = false;
        var status_reset = document.getElementById("status");
        status_reset.selectedIndex = 0;
        var location_reset = document.getElementById("location");
        location_reset.selectedIndex = 0;
        var department_reset = document.getElementById("dept");
        department_reset.selectedIndex = 0;
        var change_color = document.querySelector('.apply-btn');
        change_color.style.backgroundColor = "#ffabab";
        this.cureentEmployeeList = [];
        this.deleteEmployees();
        if (this.alphabetEployeeData.length == 0 && !this.alphabetFilter) {
            this.cureentEmployeeList = this.employeesList.slice();
            this.printEmployeesTable(this.cureentEmployeeList);
        }
        else {
            this.filterByAplhabet('filter', null);
            this.cureentEmployeeList = this.alphabetEployeeData;
        }
    }
    filterByAplhabet(name, className) {
        if (this.alphabetFilter) {
            this.alphabetFilter = false;
            this.alphabetEployeeData = [];
            this.applyFilterOnEmployees();
        }
        this.alphabetFilter = true;
        let alphabet;
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
        if (this.cureentEmployeeList.length || this.appliedFilter) {
            this.cureentEmployeeList.forEach(element => {
                if (element.firstName.charAt(0) == alphabet) {
                    this.alphabetEployeeData.push(element);
                }
            });
        }
        else {
            this.employeesList.forEach(element => {
                if (element.firstName.charAt(0) == alphabet) {
                    this.alphabetEployeeData.push(element);
                }
            });
        }
        this.deleteEmployees();
        this.printEmployeesTable(this.alphabetEployeeData);
    }
    activateButton(name) {
        let className;
        className = document.querySelector('.' + name);
        className.style.backgroundColor = "#F44848";
        className.style.color = "#ffffff";
    }
    convertToCSV() {
        var stringData = [];
        this.employeesList.forEach((ele) => {
            stringData.push(ele.toString());
        });
        const array = [Object.keys(this.cureentEmployeeList[0])].concat(stringData);
        return array.map(it => {
            return Object.values(it).toString();
        }).join('\n');
    }
    exportData() {
        var csvData = this.convertToCSV();
        const blob = new Blob([csvData], { type: 'csv' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'example.csv';
        link.click();
    }
    removeFilter() {
        document.getElementById("filter-icon").setAttribute('src', 'images/temp.svg');
        var liTags = document.getElementsByClassName('filter')[0].getElementsByTagName('li');
        for (var i = 0; i < liTags.length; i++) {
            if (liTags[i].style.backgroundColor == "rgb(244, 72, 72)") {
                liTags[i].style.backgroundColor = "#EAEBEE";
                liTags[i].children[0].style.color = "#919DAC";
            }
        }
        this.deleteEmployees();
        this.alphabetEployeeData = [];
        this.alphabetFilter = false;
        this.applyFilterOnEmployees(true);
    }
    selectCheckedRows(className) {
        var tableInputs = className.parentElement.parentElement.parentElement.parentElement;
        var inputs = tableInputs.getElementsByTagName('input');
        for (var i = 1; i < inputs.length; i++) {
            inputs[i].checked = className.checked;
            this.isAllSelected(className.checked);
        }
    }
    checkSelectedEmployees(className) {
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
        this.isAllSelected(allFalse);
    }
    isAllSelected(allFalse) {
        if (allFalse) {
            this.changeBgColor("delete-btn", "#F44848");
        }
        else {
            this.changeBgColor("delete-btn", "#F89191");
        }
    }
    changeBgColor(className, value) {
        document.getElementById(className).style.backgroundColor = value;
    }
    deleteRows() {
        var table = document.querySelector(".employee-table");
        var inputs = table.getElementsByTagName("input");
        var roleData = JSON.parse(localStorage.getItem("roleData"));
        if (confirm("Are you sure.You want to Delete the data")) {
            inputs = (Array.from(inputs).filter((input) => {
                if (input.checked) {
                    return true;
                }
                else {
                    return false;
                }
            }));
            var employeeNoList = [];
            Array.from(inputs).forEach(input => {
                employeeNoList.push((input.parentElement.parentElement).childNodes[5].innerHTML);
            });
            employeeNoList.forEach(No => {
                Array.from(this.employeesList).filter((ele) => {
                    if (ele.empNo != No) {
                        return ele;
                    }
                });
            });
            employeeNoList.forEach(No => {
                Array.from(this.employeesList).filter((ele) => {
                    if (ele.empNo == No) {
                        var index = this.employeesList.indexOf(ele);
                        if (index !== -1) {
                            this.employeesList.splice(index, 1);
                        }
                        if (roleData != null) {
                            roleData.forEach((role) => {
                                if (ele.jobTitle == role.designation) {
                                    role.employeesList = role.employeesList.filter(_ => {
                                        if (_.empNo != ele.empNo) {
                                            return ele.empNo;
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            });
            localStorage.setItem("data", JSON.stringify(this.employeesList));
            localStorage.setItem('roleData', JSON.stringify(roleData));
            this.deleteEmployees();
            this.printEmployeesTable(this.employeesList);
            if (inputs[0].checked) {
                inputs[0].checked = false;
            }
        }
        else {
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
            }
        }
        document.getElementById("delete-btn").style.backgroundColor = "#F89191";
    }
    createAplhabetFilter() {
        var ul = document.getElementById('create-li');
        if (ul) {
            for (var i = 65; i <= 90; i++) {
                var li = document.createElement("li");
                var a = document.createElement('a');
                a.setAttribute("href", '#');
                var char = document.createTextNode(String.fromCharCode(i));
                a.appendChild(char);
                li.appendChild(a);
                ul.appendChild(li);
            }
        }
    }
    editOptions(className) {
        if (this.previous == className.parentElement.children[1]) {
            className.parentElement.children[1].style.display = 'none';
            this.previous = null;
        }
        else {
            if (this.previous) {
                this.previous.style.display = "none";
            }
            className.parentElement.children[1].style.display = 'block';
            this.previous = className.parentElement.children[1];
        }
    }
    editEmployee(className) {
        var functionality = className.innerHTML;
        var empNo = className.parentElement.parentElement.parentElement;
        if (functionality == 'Delete') {
            empNo.firstChild.firstChild.checked = true;
            this.deleteRows();
        }
        else {
            var employeeNo = empNo.children[5].innerHTML;
            var obj = {
                'employeeNumber': employeeNo,
                'functionality': functionality,
                'isEdited': false
            };
            sessionStorage.setItem("updateDetails", JSON.stringify(obj));
            fetchEmployee(pages.addEmployee, styles.addEmployee);
        }
    }
}
