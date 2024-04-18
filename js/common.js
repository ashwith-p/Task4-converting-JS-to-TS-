export class CommonOperations {
    isSidebarToggled = false;
    mobileView = false;
    checkBorder = false;
    changeName = document.querySelector('.roles-or-user-management');
    rotateButton = document.querySelector('.handle');
    removeArrowRole = document.querySelector(".side-arrow-roles");
    removeArrowsUser = document.querySelector(".side-arrow-roles");
    reduceSidebarWidth = document.querySelector(".container");
    toogleBtn = document.querySelector(".horizantal-content");
    toggleSideBar() {
        if (!this.isSidebarToggled) {
            this.toogleBtn.classList.add("toggle");
            this.changeName.innerHTML = "Role";
            if (!this.mobileView) {
                this.reduceSidebarWidth.style.width = "calc(100% - 75px)";
            }
            else {
                this.toogleBtn.style.position = "static";
                this.reduceSidebarWidth.style.width = "calc(89% - 30px)";
                this.rotateButton.style.top = "2%";
            }
            this.isSidebarToggled = true;
        }
        else {
            if (!this.mobileView) {
                this.onScreenToNormal();
            }
            else {
                this.toogleBtn.style.position = 'absolute';
                this.toogleBtn.style.backgroundColor = 'white';
                this.toogleBtn.style.zIndex = "10";
                this.reduceSidebarWidth.style.width = "calc(100% - 30px)";
                this.rotateButton.style.left = "175px";
                this.rotateButton.style.top = "2%";
                this.rotateButton.style.zIndex = "12";
            }
            this.toogleBtn.classList.remove("toggle");
            this.isSidebarToggled = false;
        }
    }
    onScreenToNormal() {
        this.toogleBtn.style.position = "static";
        this.reduceSidebarWidth.style.width = "calc(100% - 230px)";
        this.rotateButton.style.left = "175px";
        this.changeName.innerHTML = "ROLE/USER MANAGEMENT";
    }
    createErrorMessage(text) {
        var span = document.createElement("span");
        var textNode = document.createTextNode(text);
        span.setAttribute("class", "warning");
        span.appendChild(textNode);
        return span;
    }
    border_change(className) {
        if (!this.checkBorder) {
            className.style.border = "2px solid rgb(0, 126, 252)";
            this.checkBorder = true;
        }
        else {
            className.style.border = '2px solid #e2e2e2';
            this.checkBorder = false;
        }
        this.removeErrorMessage(className);
    }
    removeErrorMessage(className) {
        const node = (className.parentNode);
        var spanList = node.getElementsByTagName("span");
        if (spanList.length > 0) {
            spanList[0].remove();
        }
        className.style.border = "";
    }
    setLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    getLocalStorage(key) {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key));
        }
        else {
            return [];
        }
    }
}
var commonObject = new CommonOperations();
window.onresize = function () {
    if (window.screen.width < 665 && !commonObject.mobileView) {
        commonObject.toggleSideBar();
        commonObject.mobileView = true;
    }
    else if (window.screen.width >= 665 && commonObject.mobileView) {
        commonObject.toggleSideBar();
        commonObject.onScreenToNormal();
        commonObject.mobileView = false;
    }
};
document.querySelector('.handle').addEventListener('click', function () {
    commonObject.toggleSideBar();
});
