// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });


var a = document.querySelector("#mini-circle");
document.addEventListener("mousemove",function(dets){
    a.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`
})

function firstpageAnimation(){
    var tl = gsap.timeline();
    tl.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 0.5,
        ease: Expo.easeInOut
    })
    .from("#hero-text",{
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: Expo.easeInout,
        stagger: 0.2,
    })
    .from("#hero-social-icons",{
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: Expo.easeInout,
        stagger: 0.2
    })
    .from("#interest-container",{
        y: 30,
        opacity: 0,
        duration: 3,
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#interest-container",
            scroller: "body",
            // markers: true,
            start: "top 80%",
            end: "top 81%",
            scrub: 1
        }
    })
}

firstpageAnimation();

var clicked = false;

document.querySelector("#mobile-nav-icon").addEventListener("click",function(){
    var menu = document.querySelector("#mobile-nav-item-list")
    if(clicked==true){
        menu.style.display = `flex`
        clicked= false
    }
    else{
        clicked = true
        menu.style.display = `none`
    }
})

gsap.from(".quote-img-1",{
    y: -30,
    x: -30,
    
    scrollTrigger: {
        trigger: ".quote-img-1",
        scroller: "body",
        start: "top 60%",
        end: "top 58%",
        scrub: 1,
    }
})

gsap.from(".quote-img-2",{
    y: 30,
    x: 30,
   
    scrollTrigger: {
        trigger: ".quote-img-1",
        scroller: "body",
        start: "top 60%",
        end: "top 58%",
        scrub: 1,
    }

})

gsap.from(".bg-img",{
    y: -200,
    duration: 10,
    opacity: 0,
    duration: 5,
    stagger: 5,
    scrollTrigger: {
        trigger: ".bg-img",
        scroller: "body",
        start: "top 60%",
        end: "top 58%",
        scrub:3
    }
    
})
