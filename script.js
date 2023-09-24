// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });


var a = document.querySelector("#mini-circle");
document.addEventListener("mousemove",function(dets){
    a.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`
})

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