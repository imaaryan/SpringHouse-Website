

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




var h2data = document.querySelectorAll("#page2 h2");
h2data.forEach(function (elem) {
  var textData = elem.textContent;
  var splitedText = textData.split("");
  var clutter = "";
  splitedText.forEach(function (e) {
    clutter += `<span>${e}</span>`;
  });
  elem.innerHTML = clutter;
});

gsap.to("#page2 h2 span", {
  color: "#000",
  stagger: 90,
  scrollTrigger: {
    trigger: "#page2 h2 span",
    scroller: "#main",
    start: "top 50%",
    end: "top 20%",
    scrub: 1,
  },
});

gsap.from(".banner-video", {
  scale: 1.30,
  duration: 2,
  scrollTrigger: {
    trigger: "#page2",
    scroller: "#main",
//     markers:true,
    start: "top 22%",
    end: "top 0%",
      scrub: 2,
  } ,
    y: 0,
})


// gsap.from(".shape-bottom", {
//     opacity: 0,
//     transform: "translateX(-90px)",
//     duration: 3,
//   scrollTrigger: {
//     trigger: "#page2",
//     scroller: "#main",
//     start: "top 10%",
//     end: "top 0%",
//     scrub: 3,
//   }
// })


gsap.from(".row1", {
    opacity: 0,
    transform: "translateY(250px)",
    duration: 4,
    stagger: 90,
  scrollTrigger: {
    trigger: "#page2",
    scroller: "#main",
    start: "top 10%",
    end: "top 0%",
    scrub: 4,
  }
})



