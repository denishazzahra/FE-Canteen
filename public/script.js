let x = window.matchMedia("(max-width: 600px)")

function responsiveness(){
    let navbar = document.getElementById("navbar");
    let sticky = navbar.offsetTop;
    let navbar1 = document.getElementById("header");
    let sticky1 = navbar1.offsetTop;
    const check=document.getElementById("check");
    if(!x.matches){
        navbar1.classList.remove("sticky");
        check.innerHTML="";
        window.onscroll = function() {myFunction()};
        function myFunction() {
            if (window.scrollY > sticky) {
                navbar.classList.add("sticky")
            } else {
                navbar.classList.remove("sticky");
            }
        }
    }
    else{
        navbar.classList.remove("sticky");
        check.innerHTML="<br><br><br><br>";
        window.onscroll = function() {myFunction1()};
        function myFunction1() {
            if (window.scrollY > sticky1) {
                navbar1.classList.add("sticky")
            } else {
                navbar1.classList.remove("sticky");
            }
        }
    }
}
responsiveness();
window.onresize=function(event){
    responsiveness();
};
const navbarIcon = document.querySelector("#navbar-icon");
navbarIcon.addEventListener("click", function () {
    const navbarGroup = document.querySelector("#navbar-group");
    navbarGroup.classList.toggle("navbar-group-close");
});
const navbarItem = document.querySelector("#navbar-group");
navbarItem.addEventListener("click", function () {
    const navbarGroup = document.querySelector("#navbar-group");
    navbarGroup.classList.toggle("navbar-group-close");
});
