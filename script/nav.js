const btnNav = document.querySelector('.navigation-icon');
const containerMenu = document.querySelector('.container-menu');
const b1 = document.querySelector('.b1');
const b2 = document.querySelector('.b2');
const b3 = document.querySelector('.b3');
const item = document.querySelectorAll('.item');
const menuItem = document.querySelectorAll('.menu-item');
let toggle = 0;


btnNav.addEventListener('click', () => {
  if (document.documentElement.clientWidth > 576) {

    if (toggle === 0) {
      toggle++;
      gsap.to(b2, { display: 'none', duration: .01 });
      gsap.to(b1, { top: 0, rotation: 225, duration: .1 });
      gsap.to(b3, { top: -2, rotation: -225, duration: .1 });
      gsap.to(containerMenu, { left: 0, ease: 'power4.easeInOut', width: '100%', height: '100%', duration: .5, opacity: 1 });
    } else {
      toggle--;
      gsap.to(b2, { delay: .25, display: 'block', duration: .01 });
      gsap.to(b1, { top: -10, rotation: 0, duration: .1 });
      gsap.to(b3, { top: 10, rotation: 0, duration: .1 });
      gsap.to(containerMenu, { left: '-100%', ease: 'power4.easeIn', width: 0, height: 0, duration: .5, opacity: 0 });
    }

  } else {

    if (toggle === 0) {
      toggle++;
      gsap.to(b2, { display: 'none', duration: .01 });
      gsap.to(b1, { top: 0, rotation: 225, duration: .1 });
      gsap.to(b3, { top: -2, rotation: -225, duration: .1 });
      gsap.to(containerMenu, { left: 0, ease: 'power4.easeInOut', width: '100%', height: '100%', duration: .5, opacity: 1 });
    } else {
      toggle--;
      gsap.to(b2, { delay: .25, display: 'block', duration: .01 });
      gsap.to(b1, { top: -5, rotation: 0, duration: .1 });
      gsap.to(b3, { top: 5, rotation: 0, duration: .1 });
      gsap.to(containerMenu, { left: '-100%', ease: 'power4.easeIn', width: 0, height: 0, duration: .5, opacity: 0 });
    }

  }
})


// Burst a word into letters (=> 1 letter per span)
for (let i = 0; i < item.length; i++) {
  charming(item[i]);
}


menuItem.forEach(item => item.addEventListener('mouseenter', (e) => {

  let letterFromItem = Array.from(e.target.childNodes[1].querySelectorAll('span'));

  // Burst effect
  for (let i = 0; i < letterFromItem.length; i++) {
    gsap.to(letterFromItem[i], {
      x: Math.floor(Math.random() * 100 - 50),
      y: Math.floor(Math.random() * 100 - 50),
      z: Math.floor(Math.random() * 100 - 50),
      rotation: Math.floor(Math.random() * 100 - 50),
      opacity: .3,
      ease: 'circ.easeOut',
      duration: 1
    })
  }

  // Replacement effect
  menuItem.forEach(item => item.addEventListener('mouseleave', () => {
    for (let j = 0; j < letterFromItem.length; j++) {
      gsap.to(letterFromItem[j], {
        x: 0,
        y: 0,
        z: 0,
        rotation: 0,
        opacity: 1,
        ease: 'circ.easeOut',
        duration: 1
      })
    }
  }))

}))

menuItem.forEach(item => item.addEventListener('click', () => {

  toggle--;

  if (document.documentElement.clientWidth > 576) {
    gsap.to(b2, { delay: .25, display: 'block', duration: .01 });
    gsap.to(b1, { top: -10, rotation: 0, duration: .1 });
    gsap.to(b3, { top: 10, rotation: 0, duration: .1 });
    gsap.to(containerMenu, { left: '-100%', ease: 'power4.easeIn', width: 0, height: 0, duration: .5 });
  } else {
    gsap.to(b2, { delay: .25, display: 'block', duration: .01 });
    gsap.to(b1, { top: -5, rotation: 0, duration: .1 });
    gsap.to(b3, { top: 5, rotation: 0, duration: .1 });
    gsap.to(containerMenu, { left: '-100%', ease: 'power4.easeIn', width: 0, height: 0, duration: .5 });
  }

}))