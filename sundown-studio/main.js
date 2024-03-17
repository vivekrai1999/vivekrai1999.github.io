document.querySelectorAll(".featured-project").forEach((element) => {
  element.addEventListener("mouseenter", (e) => {
    console.log(e);
    const index = e.target.dataset.index;
    const video = document.createElement("video");
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    // video.setAttribute("autoplay");
    // video.setAttribute("loop");
    // video.setAttribute("muted");

    switch (index) {
      case "1":
        video.setAttribute("src", "./assets/videos/1.mp4");

        document.querySelector(".project-video-container").innerHTML = "";
        document.querySelector(".project-video-container").appendChild(video);
        document.querySelector(".project-video-container").style.zIndex = "99";

        break;
      case "2":
        video.setAttribute("src", "./assets/videos/2.mp4");

        document.querySelector(".project-video-container").innerHTML = "";
        document.querySelector(".project-video-container").appendChild(video);
        document.querySelector(".project-video-container").style.zIndex = "99";

        break;
      case "3":
        video.setAttribute("src", "./assets/videos/3.mp4");

        document.querySelector(".project-video-container").innerHTML = "";
        document.querySelector(".project-video-container").appendChild(video);
        document.querySelector(".project-video-container").style.zIndex = "99";

        break;
      case "4":
        video.setAttribute("src", "./assets/videos/4.mp4");

        document.querySelector(".project-video-container").innerHTML = "";
        document.querySelector(".project-video-container").appendChild(video);
        document.querySelector(".project-video-container").style.zIndex = "99";

        break;
      case "5":
        video.setAttribute("src", "./assets/videos/1.mp4");

        document.querySelector(".project-video-container").innerHTML = "";
        document.querySelector(".project-video-container").appendChild(video);
        document.querySelector(".project-video-container").style.zIndex = "99";

        break;
      case "6":
        video.setAttribute("src", "./assets/videos/2.mp4");

        document.querySelector(".project-video-container").innerHTML = "";
        document.querySelector(".project-video-container").appendChild(video);
        document.querySelector(".project-video-container").style.zIndex = "99";

        break;
      case "7":
        video.setAttribute("src", "./assets/videos/3.mp4");

        document.querySelector(".project-video-container").innerHTML = "";
        document.querySelector(".project-video-container").appendChild(video);
        document.querySelector(".project-video-container").style.zIndex = "99";

        break;
    }

    document.querySelector(".project-video-container").style.opacity = "1";
  });
});

document.querySelectorAll(".featured-project").forEach((element) => {
  element.addEventListener("mouseleave", (e) => {
    //console.log(e.target.dataset.index);
    document.querySelector(".project-video-container").style.opacity = "0";
    document.querySelector(".project-video-container").style.zIndex = "-1";
  });
});

// const scroll = new LocomotiveScroll({
//   el: document.querySelector("[data-scroll-container]"),
//   smooth: true,
//   lerp: 0.1,
// });

const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  speed: 400,
  spaceBetween: 100,
});

document.querySelector(".swiper").addEventListener("mouseenter", (e) => {
  document.querySelector(".swiper").style.cursor = "none";
  document.querySelector(".cursor-big-round").style.transform = "scale(1)";
});

document.querySelector(".swiper").addEventListener("mousemove", (e) => {
  document.querySelector(".swiper").style.cursor = "none";
  document.querySelector(".cursor-big-round").style.left = `${
    e.clientX - 50
  }px`;
  document.querySelector(".cursor-big-round").style.top = `${e.clientY - 50}px`;
});

document.querySelector(".swiper").addEventListener("mouseleave", () => {
  document.querySelector(".swiper").style.cursor = "";
  document.querySelector(".cursor-big-round").style.transform = "scale(0)";
});

const services = {
  design: {
    text: "Our team works with our clients to refine an idea and concept into an executable design. We create a final design that encompasses the brand narrative to bring stories to life and provide end-to-end design solutions from concept, design, and architectural drawings to 3D renderings.",
    image:
      "https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15e1_Project.webp",
  },

  project: {
    text: "Once we have a design, our production team takes the lead in bringing it to life. We manage all stages of the project, from build specifications and technical drawings to site surveys, vendor management, and 2D & 3D production. We have an extensive network of partners to meet each unique design and project need.",
    image:
      "https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15d0_Project.webp",
  },

  execution: {
    text: "We’re with you every step of the way, from the project initiation to launch day. Our production and design teams are onsite to direct and guide the process down to the last point of completion, ensuring success across the built space and experience.",
    image:
      "https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15cd_Execution.webp",
  },
};

document.querySelectorAll(".services-option .option").forEach((element) =>
  element.addEventListener("click", (e) => {
    document
      .querySelectorAll(".services-option .option")
      .forEach((elem) => elem.classList.remove("active-service"));
    e.target.closest(".option").classList.add("active-service");
    if (e.target.textContent === "Design") {
      document.querySelector(".services-content p").innerHTML =
        services.design.text;
      document.querySelector(".service-image img").src = services.design.image;
    }

    if (e.target.textContent === "Project") {
      document.querySelector(".services-content p").innerHTML =
        services.project.text;
      document.querySelector(".service-image img").src = services.project.image;
    }
    if (e.target.textContent === "Execution") {
      document.querySelector(".services-content p").innerHTML =
        services.execution.text;
      document.querySelector(".service-image img").src =
        services.execution.image;
    }
  })
);