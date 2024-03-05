"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalStorage = exports.setLocalStorage = exports.removeErrorMessage = exports.border_change = exports.createErrorMessage = exports.checkBorder = void 0;
var isSidebarToggled = false;
var mobileView = false;
exports.checkBorder = false;
var changeName = document.querySelector('.roles-or-user-management');
var rotateButton = document.querySelector('.handle');
var removeArrowRole = document.querySelector(".side-arrow-roles");
var removeArrowsUser = document.querySelector(".side-arrow-roles");
var reduceSidebarWidth = document.querySelector(".container");
var toogleBtn = document.querySelector(".horizantal-content");
function toggleSideBar() {
    if (!isSidebarToggled) {
        toogleBtn.classList.add("toggle");
        changeName.innerHTML = "Role";
        rotateButton.style.rotate = "180deg";
        rotateButton.style.left = "55px";
        removeArrowRole.style.display = "none";
        removeArrowsUser.style.display = "none";
        if (!mobileView) {
            reduceSidebarWidth.style.width = "calc(100% - 75px)";
        }
        else {
            toogleBtn.style.position = "static";
            reduceSidebarWidth.style.width = "calc(89% - 30px)";
            //document.getElementsByClassName('container')[0].style.paddingLeft="92px";
            rotateButton.style.left = "55px";
            rotateButton.style.top = "2%";
        }
        isSidebarToggled = true;
    }
    else {
        if (!mobileView) {
            onScreenToNormal();
        }
        else {
            toogleBtn.style.position = 'absolute';
            toogleBtn.style.backgroundColor = 'white';
            toogleBtn.style.zIndex = "10";
            reduceSidebarWidth.style.width = "calc(100% - 30px)";
            rotateButton.style.left = "175px";
            rotateButton.style.top = "2%";
            rotateButton.style.zIndex = "12";
        }
        toogleBtn.classList.remove("toggle");
        rotateButton.style.rotate = "0deg";
        isSidebarToggled = false;
    }
}
window.onresize = function () {
    if (window.screen.width < 665 && !mobileView) {
        toggleSideBar();
        mobileView = true;
    }
    else if (window.screen.width >= 665 && mobileView) {
        toggleSideBar();
        onScreenToNormal();
        mobileView = false;
    }
};
function onScreenToNormal() {
    toogleBtn.style.position = "static";
    reduceSidebarWidth.style.width = "calc(100% - 230px)";
    rotateButton.style.left = "175px";
    changeName.innerHTML = "ROLE/USER MANAGEMENT";
}
function createErrorMessage(text) {
    var span = document.createElement("span");
    var textNode = document.createTextNode(text);
    span.setAttribute("class", "warning");
    span.appendChild(textNode);
    return span;
}
exports.createErrorMessage = createErrorMessage;
function border_change(className) {
    if (!exports.checkBorder) {
        className.style.border = "2px solid rgb(0, 126, 252)";
        exports.checkBorder = true;
    }
    else {
        className.style.border = '2px solid #e2e2e2';
        exports.checkBorder = false;
    }
    removeErrorMessage(className);
}
exports.border_change = border_change;
function removeErrorMessage(className) {
    const x = (className.parentNode);
    var a = x.getElementsByTagName("span");
    if (a.length > 0) {
        a[0].remove();
    }
}
exports.removeErrorMessage = removeErrorMessage;
function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
exports.setLocalStorage = setLocalStorage;
function getLocalStorage(key) {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    }
    else {
        return [];
    }
}
exports.getLocalStorage = getLocalStorage;
