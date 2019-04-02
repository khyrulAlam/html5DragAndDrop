__dragMe = document.querySelectorAll(".dragMe");
__dropMeHere = document.querySelector("#dropMeHere");
__dropMeThere = document.querySelector("#dropMeThere");

__dragMe.forEach((element, index) => {
  element.setAttribute("dd", "foo-" + index);
  element.ondragstart = function(event) {
    let todoIndex = element.getAttribute("dd");
    event.dataTransfer.setData("Text", todoIndex);
  };
});

__dropMeHere.ondrop = function(event) {
  let todoIndex = event.dataTransfer.getData("text");
  let domNote = document.querySelector(`[dd=${todoIndex}]`);
  __dropMeHere.appendChild(domNote);
};
__dropMeHere.ondragover = function(event) {
  return false;
};
__dropMeThere.ondrop = function(event) {
  let todoIndex = event.dataTransfer.getData("text");
  let domNote = document.querySelector(`[dd=${todoIndex}]`);
  __dropMeThere.appendChild(domNote);
};
__dropMeThere.ondragover = function(event) {
  return false;
};
