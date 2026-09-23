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

let stripeLen = 56;
let scrollY = 0;
let currScroll = 0;
let scroll = () => {
  let elements = document.getElementsByClassName("stripes");
  for (let e of elements) {
    if (scrollY - window.scrollY <= 0) {
      currScroll = (currScroll + (Math.sqrt(Math.abs(scrollY - window.scrollY)) / 3)) % stripeLen;
    } else {
      currScroll = (currScroll - (Math.sqrt(Math.abs(scrollY - window.scrollY)) / 2)) % stripeLen;
    }
    e.style.backgroundPositionX = currScroll + "px";
  }
  scrollY = window.scrollY;
}

let foreverScroll = () => {
  let elements = document.getElementsByClassName("stripes");
  currScroll = (currScroll + 1) % stripeLen;
  for (let e of elements) {
    e.style.backgroundPositionX = currScroll + "px";
  }
}
setInterval(foreverScroll, 40);

document.onscroll = scroll;

// inspired by tommie.computer
const titleElem = document.getElementsByTagName("title")[0];
let i = 0;
let changeTitle = () => {
  let title = titleElem.text;
  let change = Math.floor(Math.random() * titleElem.text.length);
  changed = title[change].toLowerCase();
  if (title[change] == title[change].toLowerCase()) {
    changed = title[change].toUpperCase();
  }
  // if (title[change] == '☆') {
  //   changed = "★"; 
  // } else if (title[change] == `★`) {
  //   changed = "☆"; 
  // }
  console.log(title)
  // strings are immutable lol
  titleElem.text = title.slice(0, change) + changed + title.slice(change + 1, title.length);
  
  setTimeout(changeTitle, 1000 + Math.random() * 10000);
};
setTimeout(changeTitle, 5000);