 

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
//  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


// rotating an arrow in navbar
 
gsap.to(".tools .col", {
  opacity: 1, 
  scrollTrigger: {
    trigger: ".tools .col",
    scroller: "#main",
    // markers:true,
    start: "top 100%",
    end: "top 72%",
            scrub: 5,

  },
  y: 20,
  stagger: {
    amount: 1
  } 
}) 


gsap.from(".section-four .col-md-5", {
  scale: 0,
    opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".section-four .s-sub-heading",
    scroller: "#main",
    // markers:true,
    start: "top 72%",
    end: "top 27%",
      scrub: 1,
  } 
})


gsap.to(".circle", {
  transform: "scale(1)",
  scrollTrigger: {
    trigger: ".designer-txt",
    scroller: "#main",
      start: "top 10%",
    scrub: 2
  }
})


gsap.to(".getintouch-btn", {
  transform: "scale(1)",
  scrollTrigger: {
    trigger: ".section-ftr",
    scroller: "#main",
      start: "top 45%",
  }
})

gsap.from(".section-ftr .s-main-heading", {
  opacity: 0,
    duration: 5,
  scrollTrigger: {
    trigger: ".section-ftr",
    scroller: "#main",
    // markers:true,
    start: "top 72%",
    end: "top 36%",
      scrub: 5,
  },
  y: -90, 
})

gsap.from(".section-ftr .s-sub-heading", {
  opacity: 0, 
    duration: 5,
  scrollTrigger: {
    trigger: ".section-ftr",
    scroller: "#main",
    // markers:true,
    start: "top 72%",
    end: "top 27%",
      scrub: 5,
  },
  y: -90,  
})
 

gsap.to(".skills-roller", {
  transform: "translateX(calc(-100% - 2vw - 4px))",
  scrollTrigger: {
    trigger: ".skills-roller",
    scroller: "#main",
//     markers:true,
      start: "top 90%",
    scrub: 1
  }
})

gsap.from(".rd-gradient", {
    scale: 0,
    opacity: 0,
  scrollTrigger: {
    trigger: ".section-three .s-main-heading",
    scroller: "#main",
//     markers:true,
      start: "top 72%",
    scrub: 0.5
  }
})
 
gsap.to(".designer-txt", {
    scale: 0,
    opacity: 0,
  scrollTrigger: {
    trigger: ".section-one",
    scroller: "#main",
//     markers:true,
      start: "top 0%",
    scrub: 0,
  },
    y: -117, 
})

gsap.to(".section-one .animated-circle div", {
      opacity: 0,
    scale: 0.5,
  scrollTrigger: {
    trigger: ".section-one",
    scroller: "#main",
//     markers:true,
      start: "top 0%",
    scrub: 0,
  },
    y: -90, 
})
 
 