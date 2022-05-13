const animEls = document.querySelectorAll(".article, .hero_content_title, .hero_content_intro, .hero_content_gear, .section_title, .section_desc, .feature-image_wrap, .hero_content_nav-wrap, .article_body");

animEls.forEach(el => {
    el.setAttribute("data-aos", "");
})


window.addEventListener('load', function() {

document.body.classList.add("ready");
        
setTimeout(() => {
    const els = document.querySelectorAll("[data-aos]");
    // console.log(els)
    
    let options = { 
        rootMargin: "-15% 0% -15% 0%",
        
    };
    
    els.forEach((el) => {
    
    const aosObs = new IntersectionObserver((entries, aosObs) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting) {
            el.classList.add("anim");
            aosObs.unobserve;
        }
        });
    }, options);
    aosObs.observe(el);
    });
}, 700);
})