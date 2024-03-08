import { employeeDetails, RoleInformation } from "./model.js";
import { CommonOperations } from "./common.js";

if (!localStorage.getItem('data')) {
    var myObject: employeeDetails[] = [];
    localStorage.setItem('data', JSON.stringify(myObject));
}
enum sortBy{
    asec='asec',
    desc='desc'
};
export class EmployeeOperations {
    public employeesList: employeeDetails[] = JSON.parse(localStorage.getItem('data')!); //change name to employeesList
    public cureentEmployeeList = this.employeesList.slice(); //change name
    //window.onload = (): void =>{this.printEmployeesTable(this.employeesList)};
    public alphabetEployeeData: employeeDetails[] = [];
    public appliedFilter = false;
    public previous: HTMLElement | null | undefined;
    public alphabetFilter = false;
    constructor() {
    }
    


    tableStructure(element: employeeDetails) {
        var table: HTMLTableElement = document.querySelector(".employee-table")!;
        var row = table.insertRow(-1);
        // First td
        var checkBox = row.insertCell(0); //change name
        var inputElement = document.createElement("input")
        inputElement.setAttribute("type", "checkbox");
        inputElement.setAttribute('class', "check-selected");
        checkBox.appendChild(inputElement);
        //Second td
        var useDetails = row.insertCell(1);
        var path = "images/person1.jpg";
        var userNameMail = document.createElement("div");
        userNameMail.setAttribute("class", 'user-details user-width')
        var userImage = document.createElement("img");
        userImage.setAttribute('src', path)
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
    printEmployeesTable(data: employeeDetails[]) {
        data.forEach(element => this.tableStructure(element));
    }

    applyFilterOnEmployees(removeFilter = false) {

        this.appliedFilter = true;
        var filteredEmployees: employeeDetails[] = [];
        var dept = (document.getElementById("dept") as HTMLInputElement).value!;
        var loc = (document.getElementById("location") as HTMLInputElement).value;
        var status = (document.getElementById("status") as HTMLInputElement).value;
        if (this.alphabetEployeeData.length > 0 || this.alphabetFilter) {
            this.cureentEmployeeList = this.alphabetEployeeData;
        }
        else {
            this.cureentEmployeeList = this.employeesList;
        }

        //remove unwanted code
        if (!(dept == 'none' && loc == 'none' && status == 'none')) {
            this.deleteEmployees();
            for (var i = 0; i < this.cureentEmployeeList.length; i++) {
                //remove unwanted variable declaration

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
    isSorted(columnName: string) {
        this.deleteEmployees();
        for (var i = 0; i < this.cureentEmployeeList.length - 1; i++) {
            if ((this.cureentEmployeeList[i])[columnName] > (this.cureentEmployeeList[i + 1])[columnName]) {
                return false;
            }
        }
        return true;
    }
    sortDataByColumn(columnName: string) {
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
        var table: HTMLTableElement = document.querySelector(".employee-table")!;
        var rowLength = table.rows.length;
        for (var i = 1; i < rowLength; i++) {
            table.deleteRow(1);
        }
    }
    resetFiltersOnEmployees() {
        this.appliedFilter = false;
        var status_reset: HTMLSelectElement = (document.getElementById("status") as HTMLSelectElement)!;
        status_reset.selectedIndex = 0;
        var location_reset: HTMLSelectElement = document.getElementById("location") as HTMLSelectElement;
        location_reset.selectedIndex = 0;
        var department_reset: HTMLSelectElement = document.getElementById("dept") as HTMLSelectElement;
        department_reset.selectedIndex = 0;
        var change_color: HTMLElement = document.querySelector('.apply-btn')!;
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
    filterByAplhabet(name: string, className: HTMLElement | null) {
        if (this.alphabetFilter) {
            this.alphabetFilter = false;
            this.alphabetEployeeData = [];
            this.applyFilterOnEmployees();
        }
        this.alphabetFilter = true;
        let alphabet: string;
        var liTags = document.getElementsByClassName(name)[0].getElementsByTagName('li');
        for (var i = 0; i < liTags.length; i++) {
            if (liTags[i].style.backgroundColor == "rgb(244, 72, 72)") {
                if (!className) {
                    alphabet = (liTags[i]!.firstChild as HTMLElement).innerHTML;
                }
                else {
                    liTags[i].style.backgroundColor = "#EAEBEE";
                    (liTags[i].children[0] as HTMLElement).style.color = "#919DAC";
                }
            }
        }
        if (className) {
            className.style.backgroundColor = "#F44848";
            (className.children[0] as HTMLElement).style.color = "#ffffff";
            alphabet = (className.firstChild as HTMLElement).innerHTML;
        }
        document.getElementById("filter-icon")!.setAttribute('src', 'images/filter.svg');
        if (this.cureentEmployeeList.length || this.appliedFilter) {
            this.cureentEmployeeList.forEach(element => {
                if (element.firstName.charAt(0) == alphabet) { this.alphabetEployeeData.push(element); }
            });

        }
        else {
            this.employeesList.forEach(element => {
                if (element.firstName.charAt(0) == alphabet) { this.alphabetEployeeData.push(element); }
            });
        }



        this.deleteEmployees();
        this.printEmployeesTable(this.alphabetEployeeData);
    }
    activateButton(name: string) {
        let className: HTMLElement;
        className = document.querySelector('.' + name)!;
        className.style.backgroundColor = "#F44848";
        className.style.color = "#ffffff"
    }
    convertToCSV() {
        var stringData: string[] = [];
        this.employeesList.forEach((ele: employeeDetails) => {
            stringData.push(ele.toString());
        });
        const array = [Object.keys(this.cureentEmployeeList[0])].concat(stringData)

        return array.map(it => {
            return Object.values(it).toString()
        }).join('\n')
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

        document.getElementById("filter-icon")!.setAttribute('src', 'images/temp.svg');
        var liTags = document.getElementsByClassName('filter')[0].getElementsByTagName('li');
        for (var i = 0; i < liTags.length; i++) {
            if (liTags[i].style.backgroundColor == "rgb(244, 72, 72)") {
                liTags[i].style.backgroundColor = "#EAEBEE";
                (liTags[i].children[0] as HTMLElement).style.color = "#919DAC";
            }
        }
        this.deleteEmployees();
        this.alphabetEployeeData = [];
        this.alphabetFilter = false;
        this.applyFilterOnEmployees(true);

    }

    selectCheckedRows(className: HTMLInputElement) {
        var tableInputs = className.parentElement!.parentElement!.parentElement!.parentElement!;
        var inputs = tableInputs.getElementsByTagName('input');
        for (var i = 1; i < inputs.length; i++) {
            inputs[i].checked = className.checked;
            this.isAllSelected(className.checked);
        }
    }

    checkSelectedEmployees(className: HTMLInputElement) {
        var checkAllSelected = false, allFalse = false;

        var unselectCheckbox: HTMLInputElement = document.querySelector('.checkbox-btn')!;
        unselectCheckbox.checked = false;
        var table = className.parentElement!.parentElement!.parentElement!.parentElement!;
        var inputs = table.getElementsByTagName('input');
        for (var i = 1; i < inputs.length; i++) {
            if (inputs[i].checked) {
                allFalse = true;
            }
            else {
                checkAllSelected = true;
            }
        }
        if (!checkAllSelected) { unselectCheckbox.checked = true; }
        this.isAllSelected(allFalse);
    }
    isAllSelected(allFalse: boolean): void {
        if (allFalse) {
            this.changeBgColor("delete-btn", "#F44848");
        } else {
            this.changeBgColor("delete-btn", "#F89191");
        }

    }
    changeBgColor(className: string, value: string) {
        document.getElementById(className)!.style.backgroundColor = value
    }
    deleteRows() {
        var table: HTMLTableElement = document.querySelector(".employee-table")!;
        var inputs: HTMLCollectionOf<HTMLInputElement> = table.getElementsByTagName("input");
        var roleData: RoleInformation[] = JSON.parse(localStorage.getItem("roleData")!);
        if (confirm("Are you sure.You want to Delete the data")) {
            for (var i = 1; i < inputs.length; i++) {
                if (inputs[i].checked) {
                    var tr = inputs[i]!.parentElement!.parentElement!;
                    var employeeNo = (tr.childNodes[5] as HTMLElement).innerHTML;
                    this.employeesList.forEach(ele => {
                        if (ele.empNo == employeeNo) {
                            var index = this.employeesList.indexOf(ele);
                            if (index !== -1) {
                                this.employeesList.splice(index, 1);
                            }
                            if (roleData != null) {
                                roleData.forEach((role: RoleInformation) => {
                                    if (ele.jobTitle == role.designation) {
                                        (role.employeesList).forEach((employee: employeeDetails) => {
                                            if (employee.empNo == ele.empNo) {
                                                (role.employeesList).splice((role.employeesList).indexOf(employee), 1);
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    });
                }
            }
            localStorage.setItem("data", JSON.stringify(this.employeesList));
            localStorage.setItem('roleData', JSON.stringify(roleData));
            this.deleteEmployees();
            this.printEmployeesTable(this.employeesList);

            if (inputs[0].checked) {
                inputs[0].checked = false;
            }
        }
        else {
            for (var i = 1; i < inputs.length; i++) {
                inputs[i].checked = false;
            }
        }
        document.getElementById("delete-btn")!.style.backgroundColor = "#F89191";
    }
    createAplhabetFilter() {
        var ul = document.getElementById('create-li')!;
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
    editOptions(className: HTMLElement) {
        if (this.previous == className.parentElement!.children[1]) {
            (className.parentElement!.children[1] as HTMLElement).style.display = 'none';
            this.previous = null;

        }
        else {
            if (this.previous) {
                this.previous.style.display = "none";
            }
            (className.parentElement!.children[1] as HTMLElement).style.display = 'block';
            this.previous = (className.parentElement!.children[1] as HTMLElement);
        }

    }
    editEmployee(className: HTMLInputElement) {

        var functionality = className.innerHTML;
        var empNo = className.parentElement!.parentElement!.parentElement!;
        if (functionality == 'Delete') {
            (empNo.firstChild!.firstChild! as HTMLInputElement).checked = true;
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
            window.location.href = 'add-employee.html';
        }
    }
}
if (document.URL.includes('employees.html')) {
    var object = new EmployeeOperations();
    window.onload = (): void => { object.printEmployeesTable(object.employeesList); object.createAplhabetFilter(); };
    document.addEventListener('click', function (e) {
        var targetName = (e.target! as HTMLElement).nodeName;

        if ((e.target! as HTMLElement).tagName == 'LI') {
            object.filterByAplhabet('filter', e.target! as HTMLElement)
        }
        else if ((e.target! as HTMLElement).id == 'filter-icon') {
            object.removeFilter();
        }
        else if ((e.target! as HTMLElement).className == 'export-btn') {
            object.exportData();
        }
        else if ((e.target! as HTMLElement).className == 'apply-btn') {
            object.applyFilterOnEmployees();
        }
        else if ((e.target! as HTMLElement).className == 'reset-btn') {
            object.resetFiltersOnEmployees();
        }
        else if ((e.target! as HTMLElement).id == 'delete-btn') {
            object.deleteRows()
        }
        else if ((e.target! as HTMLElement).className == 'dots-image') {
            object.editOptions(e.target! as HTMLElement);
        }
        else if ((e.target! as HTMLElement).className == 'edit-option') {
            object.editEmployee(e.target! as HTMLInputElement);
        }
        else if ((e.target! as HTMLElement).className == 'sort-icon') {
            object.sortDataByColumn((e.target! as HTMLInputElement).id);
        }
        else if (((e.target!) as HTMLElement).className == 'handle') {
            new CommonOperations().toggleSideBar();
        }
        else if (targetName != "IMG" && targetName != "P") {
            if (object.previous) {
                object.previous.style.display = 'none';
                object.previous = null;
            }
        }

    }, true);

    document.addEventListener('change', function (e) {
        if ((e.target! as HTMLElement).id == 'status' || (e.target! as HTMLElement).id == 'location'
            || (e.target! as HTMLElement).id == 'dept') {
            object.activateButton('apply-btn');
        }
        else if ((e.target! as HTMLElement).className == 'checkbox-btn') {
            object.selectCheckedRows(e.target! as HTMLInputElement)
        }
        else if ((e.target! as HTMLElement).className == 'check-selected') {
            object.checkSelectedEmployees(e.target! as HTMLInputElement);
        }
    }, true);
}