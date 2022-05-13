const navItems = document.querySelectorAll(".hero_content_nav-link");
const navImgs = document.querySelectorAll(".hero_category");

navItems.forEach(item => {
    item.addEventListener("mouseover", e => {
        let index = [...navItems].indexOf(item);
        navItems.forEach(item =>{
            item.classList.remove("is-active");
        });
        item.classList.add("is-active");
        navImgs.forEach(img =>{
            img.classList.remove("is-visible");
        });
        navImgs[index].classList.add("is-visible");
    })
})