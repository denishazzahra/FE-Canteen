window.onload = function () {
    if (window.location.pathname == "/menu" || window.location.pathname == "/" || window.location.pathname == "") { 
        initializeMenuScript();
    }
};

function initializeMenuScript() {
    let x = window.matchMedia("(max-width: 768px)");

    function responsiveness() {
        let navbar = document.getElementById("navbar");
        let navbar1 = document.getElementById("header");
        const check = document.getElementById("check");

        if (!navbar || !navbar1 || !check) {
            console.error("Required elements not found!");
            return;
        }

        let sticky = navbar.offsetTop;
        let sticky1 = navbar1.offsetTop;

        if (!x.matches) {
            navbar1.classList.remove("sticky");
            check.innerHTML = "";
            window.onscroll = function () {
                if (window.scrollY > sticky) {
                    navbar.classList.add("sticky");
                } else {
                    navbar.classList.remove("sticky");
                }
            };
        } else {
            navbar.classList.remove("sticky");
            check.innerHTML = "<br><br><br><br>";
            window.onscroll = function () {
                if (window.scrollY > sticky1) {
                    navbar1.classList.add("sticky");
                } else {
                    navbar1.classList.remove("sticky");
                }
            };
        }
    }

    responsiveness();
    window.onresize = function () {
        responsiveness();
    };

    const navbarIcon = document.querySelector("#navbar-icon");
    const navbarGroup = document.querySelector("#navbar-group");

    if (navbarIcon && navbarGroup) {
        navbarIcon.addEventListener("click", function () {
            navbarGroup.classList.toggle("navbar-group-close");
        });

        navbarGroup.addEventListener("click", function () {
            navbarGroup.classList.toggle("navbar-group-close");
        });
    } else {
        console.error("Navbar elements not found!");
    }
}
