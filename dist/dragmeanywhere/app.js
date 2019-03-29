__dragMeAnyWhere = document.querySelector("#dragMeAnyWhere");

__dragMeAnyWhere.onmousedown = event => {
  let __elementXPoint = __dragMeAnyWhere.getBoundingClientRect().width / 2;
  let __elementYPoint = __dragMeAnyWhere.getBoundingClientRect().height / 2;

  //(1) set initial style
  __dragMeAnyWhere.style.position = "absolute";
  __dragMeAnyWhere.style.zIndex = 9999;

  //(2) mouse move any set new position
  let setNewPosition = (x, y) => {
    __dragMeAnyWhere.style.left = x - __elementXPoint + "px";
    __dragMeAnyWhere.style.top = y - __elementYPoint + "px";
  };

  //(3) mouse move event change
  let onMouseMove = e => {
    setNewPosition(e.pageX, e.pageY);
  };
  document.addEventListener("mousemove", onMouseMove);

  //(4)leave mouse move event
  __dragMeAnyWhere.onmouseup = () => {
    document.removeEventListener("mousemove", onMouseMove);
    return null;
  };
};

//** save zone */
__dragMeAnyWhere.ondragmove = () => {
  return null;
};
