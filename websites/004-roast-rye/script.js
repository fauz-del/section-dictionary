const hero = document.querySelector('.hero-scroll');
const canvas = document.querySelector('.hero-canvas');
const ctx = canvas.getContext('2d');
const reveal = document.querySelector('.hero-reveal');

const totalFrames = 84;
const frames = [];

let loadedFrames = 0;
let currentFrame = -1;
let canvasReady = false;


/* =========================
   LOAD FRAMES
========================= */

function loadFrames() {
  for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();

    img.src =
      `assets/img/hero/frames/frame-${String(i).padStart(3, '0')}.jpg`;

    img.onload = () => {
      loadedFrames++;

      if (loadedFrames === totalFrames) {
        canvasReady = true;

        resizeCanvas();
        drawFrame(0);
      }
    };

    frames.push(img);
  }
}


/* =========================
   CANVAS SIZE
========================= */

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

  if (currentFrame >= 0) {
    drawFrame(currentFrame);
  }
}


/* =========================
   DRAW FRAME
========================= */

function drawFrame(index) {
  const img = frames[index];

  if (!img || !img.complete) return;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  const imageRatio = img.width / img.height;
  const canvasRatio = width / height;

  let drawWidth;
  let drawHeight;
  let offsetX;
  let offsetY;

  /*
    Cover behavior
  */

  if (imageRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = height * imageRatio;

    offsetX = (width - drawWidth) / 2;
    offsetY = 0;

  } else {
    drawWidth = width;
    drawHeight = width / imageRatio;

    offsetX = 0;
    offsetY = (height - drawHeight) / 2;
  }

  ctx.clearRect(0, 0, width, height);

  ctx.drawImage(
    img,
    offsetX,
    offsetY,
    drawWidth,
    drawHeight
  );
}

/* =====================================================
   COFFEE COLLECTION INTERACTION
===================================================== */

const coffeeTrack = document.querySelector('.coffee-track');
const coffeeCards = document.querySelectorAll('.coffee-card');
const nextCoffee = document.querySelector('.coffee-next');
const prevCoffee = document.querySelector('.coffee-prev');
const progressBar = document.querySelector('.coffee-progress-bar');


/* Open / close cards */

coffeeCards.forEach(card => {

  const trigger = card.querySelector('.product-trigger');
  const close = card.querySelector('.reveal-close');

  trigger.addEventListener('click', () => {

    coffeeCards.forEach(otherCard => {
      if (otherCard !== card) {
        otherCard.classList.remove('is-open');
      }
    });

    card.classList.toggle('is-open');

  });


  close.addEventListener('click', (event) => {

    event.stopPropagation();

    card.classList.remove('is-open');

  });

});


/* =====================================================
   SLIDER
===================================================== */

const getCardWidth = () => {

  const card = coffeeCards[0];

  if (!card) return 250;

  return card.offsetWidth + 16;

};


nextCoffee?.addEventListener('click', () => {

  coffeeTrack.scrollBy({
    left: getCardWidth(),
    behavior: 'smooth'
  });

});


prevCoffee?.addEventListener('click', () => {

  coffeeTrack.scrollBy({
    left: -getCardWidth(),
    behavior: 'smooth'
  });

});


/* =====================================================
   PROGRESS
===================================================== */

function updateCoffeeProgress() {

  if (!coffeeTrack || !progressBar) return;

  const maxScroll =
    coffeeTrack.scrollWidth -
    coffeeTrack.clientWidth;

  if (maxScroll <= 0) {
    progressBar.style.width = '100%';
    return;
  }

  const progress =
    coffeeTrack.scrollLeft / maxScroll;

  progressBar.style.width =
    `${Math.max(25, progress * 100)}%`;

}


coffeeTrack?.addEventListener(
  'scroll',
  updateCoffeeProgress,
  { passive: true }
);

updateCoffeeProgress();



const bakeryTrack = document.querySelector('[data-bakery-track]');
const bakeryPrev = document.querySelector('[data-bakery-prev]');
const bakeryNext = document.querySelector('[data-bakery-next]');

if (bakeryTrack && bakeryPrev && bakeryNext) {
  bakeryNext.addEventListener('click', () => {
    bakeryTrack.scrollBy({
      left: 310,
      behavior: 'smooth'
    });
  });

  bakeryPrev.addEventListener('click', () => {
    bakeryTrack.scrollBy({
      left: -310,
      behavior: 'smooth'
    });
  });
}

const experienceItems = document.querySelectorAll(
  '.experience-main-image, .experience-small-image, .experience-side-copy, .experience-stamp'
);

if (experienceItems.length) {
  const experienceObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15
    }
  );

  experienceItems.forEach(item => {
    experienceObserver.observe(item);
  });
}
/* =========================
   SCROLL
========================= */

function updateHero() {
  if (!canvasReady) return;

  const rect = hero.getBoundingClientRect();

  const scrollDistance =
    hero.offsetHeight - window.innerHeight;

  const progress = Math.min(
    Math.max(-rect.top / scrollDistance, 0),
    1
  );


  /*
    VIDEO / FRAME SEQUENCE
    0% → 70%
  */

  const frameProgress =
    Math.min(progress / 0.7, 1);

  const frameIndex = Math.min(
    Math.floor(frameProgress * (totalFrames - 1)),
    totalFrames - 1
  );

  if (frameIndex !== currentFrame) {
    currentFrame = frameIndex;
    drawFrame(currentFrame);
  }


  /*
    CAFÉ IMAGE
    70% → 100%
  */

  const revealProgress = Math.max(
    (progress - 0.7) / 0.3,
    0
  );

  reveal.style.transform =
    `translateY(${(1 - revealProgress) * 100}%)`;
}


/* =========================
   EVENTS
========================= */

window.addEventListener(
  'scroll',
  updateHero,
  { passive: true }
);

window.addEventListener(
  'resize',
  () => {
    resizeCanvas();
    updateHero();
  }
);


/* =========================
   START
========================= */

loadFrames();