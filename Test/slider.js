<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Color Slider</title>
  <style>
    #slider {
      width: 80%;
      margin: auto;
      overflow: hidden;
    }

    #slides {
      display: flex;
      transition: transform 0.5s ease-in-out;
    }

    .slide {
      min-width: 25%; /* Set to 25% to show 4 images at a time */
      box-sizing: border-box;
      background-color: #3498db; /* Example color, replace with your own */
      padding: 20px;
      position: relative;
    }

    img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    #prev, #next {
      cursor: pointer;
      position: absolute;
      top: 50%;
      width: auto;
      padding: 16px;
      margin-top: -22px;
      color: #2ecc71; /* Example color, replace with your own */
      font-weight: bold;
      font-size: 18px;
      transition: 0.6s ease;
      border-radius: 0 3px 3px 0;
    }

    #next {
      right: 0;
      border-radius: 3px 0 0 3px;
    }

    #prev:hover, #next:hover {
      background-color: #2c3e50; /* Example color, replace with your own */
      color: #ecf0f1; /* Example color, replace with your own */
    }
  </style>
</head>
<body>

<div id="slider">
  <div id="slides">
    <div class="slide"><img src="https://via.placeholder.com/800x400" alt="Image 1"></div>
    <div class="slide"><img src="https://via.placeholder.com/800x400" alt="Image 2"></div>
    <div class="slide"><img src="https://via.placeholder.com/800x400" alt="Image 3"></div>
    <div class="slide"><img src="https://via.placeholder.com/800x400" alt="Image 4"></div>
    <!-- Add more slides as needed -->
  </div>
  <div id="prev" onclick="prevSlide()">❮</div>
  <div id="next" onclick="nextSlide()">❯</div>
</div>

<script>
  let currentIndex = 0;
  const totalSlides = document.querySelectorAll('.slide').length;

  function showSlide(index) {
    const slides = document.getElementById('slides');
    const slideWidth = document.querySelector('.slide').offsetWidth;
    const newPosition = -index * slideWidth;
    slides.style.transform = `translateX(${newPosition}px)`;
    currentIndex = index;
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }
</script>

</body>
</html>
