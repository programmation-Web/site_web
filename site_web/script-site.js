
  const btn_a_propos = document.getElementById("aPropos");
  const sousmenu = document.querySelector(".sousmenu"); 
  
  btn_a_propos.addEventListener("click", function(e) {
      e.stopPropagation(); 
      sousmenu.classList.toggle("sousmenu-open"); 
  });
  
  document.addEventListener("click", function() {
      sousmenu.style.display = "none";
      sousmenu.classList.remove("sousmenu-open");
  });
  