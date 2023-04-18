var modal = document.getElementById("modal");
var overlay = document.getElementById("overlay");
var popup_close_btn = document.querySelector(".popup__close button");

window.addEventListener("load", () => {
  var params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  console.log(params.submitted);

  var submitted = params.submitted;
  if (submitted === "true") {
    modal.style.display = "block";
  }
});

overlay.addEventListener("click", () => {
  modal.style.display = "none";
  window.history.replaceState({}, document.title, "/contract.html" + "");
});

popup_close_btn.addEventListener("click", () => {
  modal.style.display = "none";
  window.history.replaceState({}, document.title, "/contract.html" + "");
});
