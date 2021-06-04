// Custum Cursor
const circleCursor = document.querySelector('.circle-cursor');
const body = document.querySelector('body');

if (document.documentElement.clientWidth > 1200) {
  
  gsap.set(circleCursor, { xPercent: -50, yPercent: -50 });
  
  const moveCircle = (e) => {
    gsap.to(circleCursor, .3, { x: e.clientX, y: e.clientY });
  }
  
  document.addEventListener('mousemove', moveCircle);
  
  document.addEventListener('click', () => {
    gsap.fromTo(circleCursor, { scale: 1, backgroundColor: '#ff7b002a' }, { scale: 2, duration: .2, backgroundColor: '#ff7b00' }).reverse(2)
  });
  
} else {
  body.removeChild(circleCursor);
}

// Loader
const loader = document.querySelector('.loader');

// Home Animation
const homeName = document.querySelector('.my-name');
const homeTitle = document.querySelector('h1');
const HomeSubTitle = document.querySelector('h2');
const navBtn = document.querySelector('.navigation-icon');
const logo = document.querySelector('.logo');
const homeScrollDownBtn = document.querySelector('.scroll-down a span');
const homeCtaBtn = document.querySelectorAll('.cta-btn');
const portfolioAnchors = document.querySelector('.portfolio-anchor');
const contactAnchor = document.querySelector('.contact-anchor');
const tlHome = gsap.timeline({ paused: true });

tlHome
  .from(homeName, { y: -50, autoAlpha: 0, ease: 'power3.out', duration: 1 })
  .from(homeTitle, { scaleX: 1.05, autoAlpha: 0, ease: 'power3.out', duration: 1 }, '-=.5')
  .from(HomeSubTitle, { rotationX: '360deg', autoAlpha: 0, ease: 'power3.out', duration: 1 }, '-=1')
  .staggerFrom(homeCtaBtn, 1, { autoAlpha: 0 }, .2)
  .from(logo, { x: -50, autoAlpha: 0, rotationY: 720, ease: 'power3.out', duration: 1 }, '-=.3')
  .from(navBtn, { x: 150, autoAlpha: 0, rotation: 720, ease: 'power3.out', duration: 1 }, '-=1')
  .from(homeScrollDownBtn, { autoAlpha: 0, ease: 'power3.out', duration: 1 }, '-=1')
  .to(loader, {autoAlpha: 0, display: 'none'})

portfolioAnchors.addEventListener('click', () => {
  window.location.href = '#portfolio';
})

contactAnchor.addEventListener('click', () => {
  window.location.href = '#contact';
})


const controller = new ScrollMagic.Controller();

// About Animation
const aboutSection = document.querySelector('#about');
const aboutTitle = document.querySelector('#about h3');
const aboutLeftSide = document.querySelector('.profil-img');
const aboutRigthSide = document.querySelectorAll('#about p');

const tlAbout = gsap.timeline();

tlAbout
  .from(aboutTitle, { y: -200, opacity: 0, zIndex: -1, duration: 1 })
  .from(aboutLeftSide, { x: -50, opacity: 0, duration: 1 }, '-=.5')
  .staggerFrom(aboutRigthSide, 1, { opacity: 0 }, .2, '-=.5')


const aboutScene = new ScrollMagic.Scene({
  triggerElement: aboutSection,
  triggerHook: .5,
  reverse: false
})
  .setTween(tlAbout)
  .addTo(controller)


// Portfolio Section & Animation
const portfolioContainer = document.querySelector('.portfolio-container');

const fetchProjects = () => {
  fetch('../../data/projects.json')
    .then(res => res.json())
    .then(projects => {

      projects.map(project => {

        let card = document.createElement('div');

        card.classList = 'card';
        card.id = project.id;
        card.innerHTML = `
            <div class="face-card front">
              <span class="card-title">${project.title}</span>
              <img src=${project.front_img} alt="illustration projet"/>
            </div>
            <div class="face-card back">
              <img src=${project.back_img} alt="illustration projet"/>
              <div class="icones">
                <a href="${project.project_link}" target="_blank" rel="noopener">
                  <i class="fas fa-search-plus" data-wenk="Voir le Projet"></i>
                </a>
                <a href=${project.github_source_code} target="_blank" rel="noopener">
                  <i class="fab fa-github" data-wenk="Code Source"></i>
                </a>
              </div>
            </div>`;

        portfolioContainer.appendChild(card);

      })

    })
    .catch(error => {
      console.error('Something went wrong with retrieving projects !');
      console.error(error);
    })
}
fetchProjects();


const portfolioSection = document.querySelector('#portfolio');
const portfolioTitle = document.querySelector('#portfolio h3');
const portfolioCards = document.querySelector('.portfolio-container');

const tlPortfolio = gsap.timeline();

tlPortfolio
  .from(portfolioTitle, { y: -200, opacity: 0, zIndex: -1, duration: 1 })
  .from(portfolioCards, { y: 100, opacity: 0, duration: 1 })


const portfolioScene = new ScrollMagic.Scene({
  triggerElement: portfolioSection,
  triggerHook: .5,
  reverse: false
})
  .setTween(tlPortfolio)
  .addTo(controller)


// Parallax Section
const parallaxScene = new ScrollMagic.Scene({
  triggerElement: '.parallax',
  triggerHook: 1,
  duration: '150%',
  reverse: false
})
  .setTween(gsap.from('.bcg', { y: '-60%', ease: Power0.easeNone, duration: 1 }))
  .addTo(controller);


// Random Quotes & Anim
const texts = document.querySelector('.content p');
const authors = document.querySelector('.content span');
const content = document.querySelector('.content');

const tlQuote = gsap.timeline({ paused: true });

tlQuote
  .from(content, { scale: 2, opacity: 0, ease: 'power3.out', duration: 1 })

const displayQuote = () => {
  let index = Math.floor(Math.random() * data.length);
  let quote = `❝ ${data[index].text} ❞`;
  let author = `⏤ ${data[index].author} ⏤`;

  if (!author) {
    author = "Anonymous";
  }

  texts.innerText = quote;
  authors.innerText = author;
}


const fetchQuote = () => {
  fetch("https://type.fit/api/quotes")
    .then(res => res.json())
    .then(function (data) {
      this.data = data

      setInterval(() => {
        displayQuote()
        tlQuote.play()
        tlQuote.restart()
      }, 10000);
    })
    .catch(error => {
      console.error('Something went wrong with retrieving quotes !');
      console.error(error);
    })
}
fetchQuote();


// Contact Section Animation
const inputFields = document.querySelectorAll('input.inputs');

for (let i = 0; i < inputFields.length; i++) {
  let field = inputFields[i];

  field.addEventListener('input', (e) => {
    if (e.target.value !== "") {
      e.target.parentNode.classList.add('animation');
    } else if (e.target.value === "") {
      e.target.parentNode.classList.remove('animation');
    }
  })
}


const contactSection = document.querySelector('#contact');
const contactTitle = document.querySelector('#contact h3');
const contactForm = document.querySelector('.form-bloc');
const contactInfo = document.querySelector('.contact-info');

const tlContact = gsap.timeline();

tlContact
  .from(contactTitle, { y: -200, autoAlpha: 0, zIndex: -1, duration: 1 })
  .from(contactForm, { x: -50, autoAlpha: 0, duration: 1 }, '-=.5')
  .from(contactInfo, { x: 50, autoAlpha: 0, duration: 1 }, '-=1')


const contactScene = new ScrollMagic.Scene({
  triggerElement: contactSection,
  triggerHook: .5,
  reverse: false
})
  .setTween(tlContact)
  .addTo(controller)


// Paper Plane Anim
const plane = document.querySelector('#plane-anim');
const submitBtn = document.querySelector('.submit-btn');
const path = "M1 59.5L539.5 210.5L830.5 329.5L953.855 385.28C1025.31 417.592 1058.79 500.332 1029.9 573.24L1027.78 578.596C1009.67 624.296 968.468 656.79 919.807 663.742V663.742C893.504 667.499 866.677 663.526 842.593 652.306L835.146 648.837C700.434 586.079 711.284 391.051 852.124 343.621L973.27 302.824C1019.31 287.319 1069.74 291.769 1112.35 315.097L1245.68 388.08C1306.57 421.415 1381.45 415.363 1436.2 372.683L1913 1";

const tlPlane = new gsap.timeline({ paused: true });

tlPlane
  .to(plane, {
    motionPath: {
      path: path,
      autoRotate: true,
    },
    opacity: 1,
    ease: 'power1.in',
    duration: 3,
    left: -50,
    scale: 1.5
  })
  .to(plane, { opacity: 0, duration: .1, display: 'none' })


submitBtn.addEventListener('submit', () => {
  if (document.documentElement.clientWidth > 576) {
    tlPlane.play();
    tlPlane.restart();
  }
})

// Contact Form Submission
const sendingForm = document.querySelector('form');
const inputs = document.querySelectorAll('input.inputs');
const txtArea = document.querySelector('textarea.txt-area');
const succesMessage = 'Merci pour votre message 😃 ! La transmission à été un succès ✌🏼. Je vous répondrai sans tarder.';
const botField = document.querySelector('input[name="bot-field"]');

const handleSubmit = (e) => {
  e.preventDefault()
  let myForm = document.querySelector('form');
  let formData = new FormData(myForm);

  if (botField.value === '') {

    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then(() => {
        if (document.documentElement.clientWidth > 576) {
          inputs.forEach(input => input.value = '');
          txtArea.value = '';
          tlPlane.play();
          tlPlane.restart();

          setTimeout(() => {
            console.log('Form successfully submitted');
            alert(succesMessage);
          }, 3000);

        } else {
          inputs.forEach(input => input.value = '');
          txtArea.value = '';

          console.log('Form successfully submitted');
          alert(succesMessage);
        }
      })
      .catch((error) => alert(error))

  } else {

    console.log('Bot field filled !');
    alert('Votre message ne peut être envoyé car vous avez rempli le champ dédié aux robot 🤖 !')
    return;

  }
}

sendingForm.addEventListener('submit', handleSubmit);


window.addEventListener('load', () => {
  loader.className += ' hidden-loader';
  tlHome.play();
  tlPortfolio.play();
  tlQuote.play();
  tlContact.play();
})