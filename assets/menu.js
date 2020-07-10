$(document).ready(() => {
    const menuBtn = $(".menu-btn");
    const burger = $(".menu-btn-burger");
    const nav = $(".nav");
    const menuNav = $(".menu-nav");
    const navItems = document.querySelectorAll(".menu-nav-item");
    let showMenu = false;

    menuBtn.on("click", toggleMenu);

    function toggleMenu() {
        if(!showMenu) {
            burger.addClass("open");
            nav.addClass("open");
            menuNav.addClass("open");
            navItems.forEach(item => item.classList.add("open"));
            showMenu = true;
        } else {
            burger.removeClass("open");
            nav.removeClass("open");
            menuNav.removeClass("open");
            navItems.forEach(item => item.classList.remove("open"));
            showMenu= false;
        }
    }
});