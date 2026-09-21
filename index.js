let star = (x, y) => {
  const newStar = document.createElement("div");
  // ★ \u2605 ☆ \u2606  ✦ \u2726 ✧ \u2727
  newStar.textContent = "\u2726";
  // drop shadow doesnt look as nice :/
  // newStar.style.textShadow = "0px 0px 1px DarkGoldenrod";
  newStar.style.position = "absolute";
  newStar.style.left = x + window.scrollX + "px";
  newStar.style.top = y + window.scrollY + "px";
  newStar.style.color = "yellow";
  newStar.style.fontSize = "32px";
  // this was very helpfull, before I had user-select: none which meant the divs would often get in the way
  newStar.style.pointerEvents = "none";
  newStar.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(newStar);
  return newStar;
}

let lastStar = {
  "x": 0,
  "y": 0
};

let mouse = {
  "x": 0,
  "y": 0
};

document.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  const x = event.clientX; 
  const y = event.clientY;
  if (Math.hypot(lastStar.x - x, lastStar.y - y) > 8) {
    lastStar.x = x;
    lastStar.y = y;
    // make sure stars dont appear at cursor and if moving slowly no stars
    setTimeout(() => {
      if (Math.hypot(mouse.x - x, mouse.y - y) > 4) {
        const newStar = star(x,y);
        setTimeout(() => {newStar.remove()}, 100);
      }
    }, 25);
  }
});

// let scrollY = 0;
// let currScroll = 0;
// let scroll = () => {
//   let elements = document.getElementsByClassName("stripes");
//   currScroll += 1;
//   for (let e of elements) {
//     e.style.backgroundPositionX = currScroll + "px";
//     for (let i = 0; i < Math.abs(scrollY - window.scrollY); i+= 1) {
//       console.log(i);
//       currScroll += 1;
//       e.style.backgroundPositionX = currScroll + "px";
//     }
//   }
//   scrollY = window.scrollY;
//   setTimeout(() => {scroll()}, 100);
// }

// scroll();