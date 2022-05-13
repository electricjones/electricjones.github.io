// Constructor function for Parallax effect
Parallax = elements => {
    elements.forEach(element => {
      var items = document.querySelectorAll(element.class);
      items.forEach(item => {
        item.style.willChange = "transform";
        window.addEventListener("scroll", () => {
          window.requestAnimationFrame(() => {
            item.style.transform = `translate3d(0, ${window.scrollY *
              element.speed}px, 0)`;
          });
        });
      })
    });
  };
  