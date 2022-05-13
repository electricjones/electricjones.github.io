// To add new symbol, add an class to it's HTML container element, get relative path to the file containing the HTML to get for the symbol, and add new object to the array below maintaining formatting.

const symbols = [
  {
    class: ".header",
    url:"../includes/header.html",
    callback: function(el){
      // callback script, if any

      window.addEventListener('load', function() {
        const loadedElement = fetch("../includes/tags.html")
        .then(data => data.text())
        .then(data => 
          setTimeout(function(){
            document.querySelector(".header").querySelector(".tags").innerHTML = data
          }, 250)
          );

      })

    
    }
  },
  {
    class: ".footer",
    url:"../includes/footer.html",
    callback: function(){
      // callback script, if any

      window.addEventListener('load', function() {

        const loadedElement = fetch("../includes/tags.html")
        .then(data => data.text())
        .then(data => 
          setTimeout(function(){
            document.querySelector(".footer").querySelector(".tags").innerHTML = data
          }, 250)
          );

      })
    }
  },
  {
    class: ".tags",
    url:"../includes/tags.html",
    callback: function(){
    }
  },
  {
    class: ".code-block",
    url:"../includes/hugo-test.html",
    callback: function(){
      // callback script, if any
    }
  }
];

LoadElements = (url, elements, callback) => {
  elements.forEach(element => {
    const loadedElement = fetch(url)
    .then(data => data.text())
    .then(data => (element.innerHTML = data))
    .then(() => {
      if (callback === undefined) {
        return;
      } else {
        callback();
      }
    });
  })

};

symbols.forEach(el => {
  LoadElements(el.url,document.querySelectorAll(el.class),el.callback(el));
})

