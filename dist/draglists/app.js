__dragMe = document.querySelectorAll(".dragMe");
__dropMeHere = document.querySelector("#dropMeHere");

__dragMe.forEach(element => {
  element.onmousedown = event => {
    let highestTop =
      __dropMeHere.getBoundingClientRect().height -
      element.getBoundingClientRect().height;
    let highestLeft =
      __dropMeHere.getBoundingClientRect().width -
      element.getBoundingClientRect().width;

    // (2) prepare to moving: make absolute and top by z-index
    element.style.position = "absolute";
    element.style.zIndex = 1000;

    let moveAt = (pageX, pageY) => {
      element.style.left = pageX - element.offsetWidth / 2 + "px";
      element.style.top = pageY - element.offsetHeight / 2 + "px";
    };

    let onMouseMove = event => {
      moveAt(event.pageX, event.pageY);
    };
    moveAt(event.pageX, event.pageY);

    // (3) move the dragMe on mousemove
    document.addEventListener("mousemove", onMouseMove);

    // (4) drop the dragMe, remove unneeded handlers
    element.onmouseup = function() {
      document.removeEventListener("mousemove", onMouseMove);
      element.onmouseup = null;
      let elementTop =
        element.getBoundingClientRect().top -
        __dropMeHere.getBoundingClientRect().top;
      let elementLeft =
        element.getBoundingClientRect().left -
        __dropMeHere.getBoundingClientRect().left;
      if (
        elementLeft < 0 ||
        elementTop < 0 ||
        highestLeft < elementLeft ||
        highestTop < elementTop
      ) {
        console.log("-- out of box --");
      }
    };
    element.ondragstart = function() {
      return false;
    };
  };
});
