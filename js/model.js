export class employeeDetails {
    status = "";
    empNo = "";
    firstName = "";
    lastName = "";
    dateOfBirth = "";
    emailId = "";
    mobileNo = "";
    joiningDate = "";
    location = "";
    jobTitle = "";
    department = "";
    assignManager = "";
    assignProject = "";
    constructor(employeeObject, status) {
        if (employeeObject) {
            this.empNo = employeeObject['empNo'];
            this.assignManager = employeeObject['assignManager'];
            this.assignProject = employeeObject['assignProject'];
            this.location = employeeObject['location'];
            this.lastName = employeeObject['lastName'];
            this.firstName = employeeObject['firstName'];
            this.dateOfBirth = employeeObject['dateOfBirth'];
            this.department = employeeObject['department'];
            this.mobileNo = employeeObject['mobileNo'];
            this.emailId = employeeObject['emailId'];
            this.joiningDate = employeeObject['joiningDate'];
            this.jobTitle = employeeObject['jobTitle'];
            this.status = status;
        }
    }
}
export class RoleInformation {
    id;
    designation;
    roleDepartment;
    description;
    roleLocation;
    assignEmployees;
    employeesList;
    constructor(obj, selectedEmployeesList) {
        this.id = obj['id'];
        this.designation = obj["designation"];
        this.roleDepartment = obj["role-department"];
        this.description = obj["description"];
        this.roleLocation = obj["role-location"];
        this.assignEmployees = obj["assign-employees"];
        this.employeesList = selectedEmployeesList;
    }
}
