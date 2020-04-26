console.log('it works')


var acc = document.getElementsByClassName("accordion-title");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}


function addUser(){
            
  window.location.href = '/users/add';
}
function cancelAdd(){
  
  window.location.href = '/users';
}


