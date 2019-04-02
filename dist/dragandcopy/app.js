let __dragAll = document.querySelectorAll(".dragMe");
let __dropHere = document.querySelector(".dropHere");

let finalObj = [];

__dragAll.forEach(drag => {
  let eventPageY = 0;
  let eventPageX = 0;
  let domNote;

  drag.ondragstart = function(event) {
    console.log("-- drag started --");
    domNote = event.target.cloneNode(true);
    eventPageY = event.pageY;
    eventPageX = event.pageX;
  };
  drag.ondrag = function(e) {
    console.log("-- drag init --");
    if (e.pageX > 0 || e.pageY > 0) {
      eventPageY = e.pageY;
      eventPageX = e.pageX;
    }
    // console.log(eventPageX,eventPageY);
  };
  drag.ondragend = function() {
    console.log("-- end --");
    let highestTop =
      __dropHere.getBoundingClientRect().height -
      drag.getBoundingClientRect().height;
    let highestLeft =
      __dropHere.getBoundingClientRect().width -
      drag.getBoundingClientRect().width;

    let elementTop =
      eventPageY -
      (drag.offsetHeight / 2 + __dropHere.getBoundingClientRect().top);
    console.log(eventPageX, eventPageY);
    let elementLeft =
      eventPageX -
      (drag.offsetWidth / 2 + __dropHere.getBoundingClientRect().left);

    //   debugger;
    if (
      elementTop < 0 ||
      elementLeft < 0 ||
      highestLeft < elementLeft ||
      highestTop < elementTop
    ) {
      console.log("**element out of drop box !!");
      return false;
    } else {
      //
      __dropHere.appendChild(domNote);
      domNote.style.position = "absolute";
      domNote.style.zIndex = 9999;
      domNote.style.top =
        eventPageY -
        (drag.offsetHeight / 2 + __dropHere.getBoundingClientRect().top) +
        "px";
      domNote.style.left =
        eventPageX -
        (drag.offsetWidth / 2 + __dropHere.getBoundingClientRect().left) +
        "px";
      domNote.setAttribute("dgbInside", "alu");
      let obj = {
        elementName: domNote.textContent,
        top: eventPageY,
        left: eventPageX
      };
      finalObj.push(obj);
      console.log("-- init Obj --", finalObj);
      insideDrag();
    }
  };
});

function insideDrag() {
  let insideDragAll = document.querySelectorAll("[dgbInside=alu]");
  insideDragAll.forEach((drag, i) => {
    drag.onmousedown = function(event) {
      // (1) start the process
      let finalLeft = 0;
      let finalTop = 0;
      let highestTop =
        __dropHere.getBoundingClientRect().height -
        drag.getBoundingClientRect().height;
      let highestLeft =
        __dropHere.getBoundingClientRect().width -
        drag.getBoundingClientRect().width;

      // moveAt(event.pageX, event.pageY);
      // (**) move pointer catch
      function moveAt(pageX, pageY) {
        drag.style.left =
          pageX -
          (drag.offsetWidth / 2 + __dropHere.getBoundingClientRect().left) +
          "px";
        drag.style.top =
          pageY -
          (drag.offsetHeight / 2 + __dropHere.getBoundingClientRect().top) +
          "px";
        // -----
        finalLeft =
          pageX -
          (drag.offsetWidth / 2 + __dropHere.getBoundingClientRect().left);
        finalTop =
          pageY -
          (drag.offsetHeight / 2 + __dropHere.getBoundingClientRect().top);
      }
      // (**) Mouse move event
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }
      // (3) move the dragMe on mousemove
      document.addEventListener("mousemove", onMouseMove);
      // (4) drop the dragMe, remove unneeded handlers
      document.onmouseup = function() {
        document.removeEventListener("mousemove", onMouseMove);
        document.onmouseup = null;
        if (
          finalTop < 0 ||
          finalLeft < 0 ||
          highestLeft < finalLeft ||
          highestTop < finalTop
        ) {
          drag.parentNode.removeChild(drag);
          finalObj.splice(i, 1);
          console.log("-- finalObj --", finalObj);
        } else {
          finalObj[i].top = finalTop;
          finalObj[i].left = finalLeft;
          console.log("-- finalObj --", finalObj);
        }
      };
    };
    drag.ondragstart = function() {
      return false;
    };
  });
}
