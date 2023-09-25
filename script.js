// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });


var a = document.querySelector("#mini-circle");
document.addEventListener("mousemove",function(dets){
    a.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`
})

var textanime = document.querySelector(".change-text");
// var textload = ()=>{
//     setTimeout(()=>{
//         textanime.textContent = "Website Developer"
//     },0);
//     setTimeout(()=>{
//         textanime.textContent = "Android Developer"
//     },4000)
// }

// textload();
// setInterval(textload,4000)

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
    .from(".cn-1",{
        y: 50,
        opacity: 0,
        duration: 3,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".cn-1",
            scroller: "body",
            // markers: true,
            start: "top 80%",
            end: "top 60%",
            scrub: 1
        }
    })
    
    .from(".cn-2",{
        y: 50,
        opacity: 0,
        duration: 3,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".cn-2",
            scroller: "body",
            // markers: true,
            start: "top 80%",
            end: "top 60%",
            scrub: 1
        }
    })
    .from(".cn-3",{
        y: 50,
        opacity: 0,
        duration: 3,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".cn-3",
            scroller: "body",
            // markers: true,
            start: "top 80%",
            end: "top 60%",
            scrub: 1
        }
    })
    .from("#skill-list i",{
        y: 80,
        opacity: 0,
        duration: 2,
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#skill-list i",
            scroller: "body",
            
            start: "top 75%",
            end: "top 65%",
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
    duration: 2,
    scrollTrigger: {
        trigger: ".quote-img-1",
        scroller: "body",
        start: "top 60%",
        end: "top 40%",
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
        end: "top 40%",
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
        end: "top 10%",
        scrub:3
    }
    
})
