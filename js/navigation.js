let xDesktop = window.matchMedia("(min-width: 1001px)")
let xMobile = window.matchMedia("(max-width: 1000px)")

function navFunction() {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const nav = document.querySelector(".nav");
    const megaMenu = document.querySelector(".mega-menu");
    const searchIcon = document.querySelector(".search_icon");
    const searchModal = document.querySelector(".search_input-wrap");

    toggleNav = () => {
        if(megaMenu.classList.contains("open")) {
            megaMenu.classList.toggle("open");
        }
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("open");
        if(xMobile.matches){
            document.body.classList.toggle("no-scroll");
        }

    }

    navToggle.addEventListener("click", e => {
       toggleNav();
    })

    nav.addEventListener("click", e => {
        if (e.target.classList.contains("nav_item") && !e.target.classList.contains("mega-menu_trigger")) {
            toggleNav();
        };
        if (e.target.classList.contains("mega-menu_trigger")) {
            megaMenu.classList.toggle("open");
        }
    })

    let mobileBack = document.createElement("div");
    mobileBack.className = "mega-menu_back";
    mobileBack.innerHTML = "< Back"
    megaMenu.prepend(mobileBack);

    mobileBack.addEventListener("click", e => {
        megaMenu.classList.toggle("open");
    })

    toggleSearch = () => {
        searchModal.classList.toggle("open");
        if(searchModal.classList.contains("open")){
            searchIcon.src = "../images/x-bold.svg";
        } else {
            searchIcon.src = "../images/search.svg";
        }
        document.body.addEventListener("click", e =>{
            if (e.target.classList.contains("search_input") || e.target.classList.contains("search_input-wrap") || e.target.classList.contains("search_icon")){
                return;
            } else{
                toggleSearch();
            }
        })
    }

    // search toggle
    searchIcon.addEventListener("click", e => {
        toggleSearch();
    })
    
}

setTimeout(() => {
    navFunction();
}, 1000);

