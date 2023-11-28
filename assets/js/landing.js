let scrollpos = window.scrollY;
const header = document.querySelector(".navbar");
const header_height = header.offsetHeight;

const add_class_on_scroll = () => header.classList.add("navbar__scrolledbg");
const remove_class_on_scroll = () =>
  header.classList.remove("navbar__scrolledbg");

window.addEventListener("scroll", function () {
  scrollpos = window.scrollY;

  if (scrollpos >= header_height) {
    add_class_on_scroll();
  } else {
    remove_class_on_scroll();
  }
});

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  var t = 1;
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    reveals[i].style.transition = t + "s all ease";
    t += 0.5;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

var sideBarOpen = false;

function openMenu() {
  if (!sideBarOpen) {
    document.querySelector("#hamburgermenu").classList.add("w--open");
    document.querySelector("#navlist").style =
      "display: block; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;";
    sideBarOpen = true;
  } else if (sideBarOpen) {
    document.querySelector("#hamburgermenu").classList.remove("w--open");
    document.querySelector("#navlist").style =
      "display: none; transform: translate3d(0px, -100vh, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;";
    sideBarOpen = false;
  }
}
