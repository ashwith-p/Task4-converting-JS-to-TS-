import { keyBasedIndexing } from "./addEmployee.js";

export class employeeDetails implements keyBasedIndexing {
    public status: string = "";
    public empNo: string = "";
    public firstName: string = "";
    public lastName: string = "";
    public dateOfBirth: string = "";
    public emailId: string = "";
    public mobileNo: string = "";
    public joiningDate: string = "";
    public location: string = "";
    public jobTitle: string = "";
    public department: string = "";
    public assignManager: string = "";
    public assignProject: string = "";
    constructor(employeeObject: keyBasedIndexing, status: string) {
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

    [key: string]: string;
}

export class RoleInformation{
    public id:string;
    public designation:string;
    public roleDepartment:string;
    public description:string;
    public roleLocation:string;
    public assignEmployees:string;
    public employeesList:employeeDetails[];

    constructor(obj:keyBasedIndexing,selectedEmployeesList:employeeDetails[])
    {
        this.id=obj['id'];
        this.designation=obj["designation"];
        this.roleDepartment=obj["role-department"]
        this.description=obj["description"];
        this.roleLocation=obj["role-location"];
        this.assignEmployees=obj["assign-employees"];
        this.employeesList=selectedEmployeesList;
    }
}