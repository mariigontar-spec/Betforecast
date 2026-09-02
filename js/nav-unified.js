document.addEventListener("DOMContentLoaded",function(){
  document.querySelectorAll(".header").forEach(function(header){
    var inner=header.querySelector(".header-inner"),nav=header.querySelector(".topbar-menu");
    if(!inner||!nav)return;
    var page=(location.pathname.split("/").pop()||"index.html").toLowerCase();
    nav.querySelectorAll("a").forEach(function(link){
      var target=(link.getAttribute("href")||"").split("?")[0].toLowerCase();
      link.classList.toggle("active",target===page||(page===""&&target==="index.html"));
    });
    var button=inner.querySelector(".bf-menu-button");
    if(!button){button=document.createElement("button");button.type="button";button.className="bf-menu-button";button.setAttribute("aria-label","Open menu");button.setAttribute("aria-expanded","false");button.innerHTML='<span></span><span></span><span></span><span class="sr-only">Open menu</span>';inner.insertBefore(button,nav)}
    button.addEventListener("click",function(){var open=nav.classList.toggle("is-open");button.setAttribute("aria-expanded",String(open));button.setAttribute("aria-label",open?"Close menu":"Open menu")});
  });
});
