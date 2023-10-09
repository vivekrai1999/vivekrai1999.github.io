document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://dummyjson.com/products?limit=15";

    function createHTMLElement(tagName, attributes = {}, styles = {}, parent) {
        const element = document.createElement(tagName);
        for (const key in attributes) {
          element.setAttribute(key, attributes[key]);
        }
        applyStyles(element, styles);
        if(parent) parent.appendChild(element);
        return element;
    }

    function applyStyles(element, styles) {
        for (const property in styles) {
          element.style[property] = styles[property];
        }
    }

    // create html structure
    const main = createHTMLElement('div',{class: 'main'},{
        height: "100%", 
        width: "100%" 
    })
    const navBar = createHTMLElement('div', {class: 'nav-bar'},{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "60px",
        backgroundColor: "#2874f0",
        gap: "1vw"
    }, main);

    const searchInput = createHTMLElement('input', {type: "text", id:"search-input", placeholder:"Search products"},{
        padding: "0.5vw",
        border: "none",
        borderRadius: "3px",
        width: "20vw",
        outline: "none"
    }, navBar);

    const searchButton = createHTMLElement('button', {id: 'search-button'},{
        padding: "0.5vw",
        border: "none",
        borderRadius: "3px",
        fontSize: "0.9vw"
    }, navBar);

    searchButton.textContent = 'Search'
    const clearSearch = createHTMLElement('button', {id: 'clear-search'},{
        padding: "0.5vw",
        border: "none",
        borderRadius: "3px",
        fontSize: "0.9vw"
    }, navBar);

    clearSearch.textContent = 'Clear Search'
    const mainContainer = createHTMLElement('div', {class: 'main-container'},{
        padding: "1vw",
        display: "flex",
        gap: "1vw",
        width: "100%",
        backgroundColor: "#f0f2f5"
    }, main)

    const filters = createHTMLElement('div', {class:'filters'},{
        width: "20%",
        backgroundColor: "#fff",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        padding: "2vw",
        display: "flex",
        flexDirection: "column",
        gap: "1vw"
    }, mainContainer)

    const productsContainer = createHTMLElement('div', {id: 'products-container'},{
        width: "80%",
        padding: "1vw",
        backgroundColor: "#fff",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
    }, mainContainer)

    const filterHeading = createHTMLElement('div', {class: 'filter-heading'},{
        display: "flex", 
        alignItems: "center", 
        gap: "1vw"
    },filters)

    const filterHeadingP = createHTMLElement('p',{},{
        fontSize: "1vw", 
        fontWeight: 500
    }, filterHeading)

    filterHeadingP.textContent = 'Categories'
    const clearCategory = createHTMLElement('button',{id: 'clear-categories'},{
        padding: "0.5vw",
        border: "none",
        borderRadius: "3px",
        fontSize: "0.9vw"
    }, filterHeading)

    clearCategory.textContent = 'Clear Category'
    const categoryContainer = createHTMLElement('div',{id: 'category-container'},{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1vw"
    }, filters)
    
    const sortButtons = createHTMLElement('div',{class: 'sort-buttons'},{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "1vw"
    }, productsContainer)

    const sortButtonP = createHTMLElement('p',{},{
        fontSize: "1vw", 
        fontWeight: 600
    }, sortButtons)
    sortButtonP.textContent = 'Sort By'

    const productContainer = createHTMLElement('div', {id: 'product-container'},{},productsContainer)

    const lowToHigh = createHTMLElement('button',{class:'btn', id:'sort-low-to-high'},{
        padding: "0.5vw 1vw",
        border: "none",
        borderRadius: "3px",
        color: "#fff",
        backgroundColor: "#2874f0",
        fontSize: "0.9vw"
    }, sortButtons)

    lowToHigh.textContent = 'Low to High'
    const highToLow = createHTMLElement('button',{class:'btn', id:'sort-high-to-low'},{
        padding: "0.5vw 1vw",
        border: "none",
        borderRadius: "3px",
        color: "#fff",
        backgroundColor: "#2874f0",
        fontSize: "0.9vw"
    }, sortButtons)

    highToLow.textContent = 'High to Low'
    const ratingSort = createHTMLElement('button',{class:'btn', id:'sort-by-rating'},{
        padding: "0.5vw 1vw",
        border: "none",
        borderRadius: "3px",
        color: "#fff",
        backgroundColor: "#2874f0",
        fontSize: "0.9vw"
    }, sortButtons)
    ratingSort.textContent = 'Rating'

    document.body.appendChild(main)

    function addEventListeners() {
        clearCategory.addEventListener('click', clearSelectedCategory);
        clearSearch.addEventListener('click', clearSearchResults);
        searchButton.addEventListener('click', searchProducts);
        lowToHigh.addEventListener('click', sortProductsByPriceLowToHigh);
        highToLow.addEventListener('click', sortProductsByPriceHighToLow);
        ratingSort.addEventListener('click', sortProductsByRatingHighToLow);
    }

    // Initialize event listeners
    addEventListeners();

    function fetchApi(url){
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json()
        })
        .then(data => {
            const products = data.products;
            // create and display product cards
            products.forEach(product => {
            const card = createProductCard(product);
            productContainer.appendChild(card);
            });
        }).catch((error) => {
            console.error(`Error fetching data: ${error.message}`);
        });
    }


    // function to create a product card element
    function createProductCard(product) {
        const card = createHTMLElement('div',{class:'product-card'},{
            display: "flex",
            padding: "3vw",
            borderBottom: "1px solid #292929",
            gap: "1vw"
        });
        // create product card elements
        const mainImage = createHTMLElement('img', {class: 'main-img', src: product.thumbnail, alt: product.title},{
            width: "18vw",
            height: "18vw",
            objectFit: "cover"
        })
        const title = createHTMLElement('h2')
        title.textContent = product.title;

        const price = createHTMLElement('p',{class: 'discounted-price'},{
            marginBottom: "0.5vw", 
            fontWeight: 500
        })
        
        const discountedPrice = product.price - (product.price * (product.discountPercentage / 100));
        price.textContent = `Price: $${discountedPrice.toFixed(2)}`;

        const originalPrice = createHTMLElement('span',{class: 'original-price'},{
            color: "grey",
            fontWeight: 400,
            fontSize: "1vw",
            marginRight: "0.5vw"
        })
        originalPrice.textContent = `$${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}`;
        originalPrice.style.textDecoration = 'line-through';

        const discountPercentage = createHTMLElement('span',{class: 'discount-percentage'},{
            color: "green", 
            fontWeight: 600, 
            fontSize: "1vw"
        })
        discountPercentage.textContent = `${product.discountPercentage}% Off`;

        const rating = createHTMLElement('p',{class: 'rating'},{
            fontSize: "1.2vw"
        })
        rating.textContent = `Rating: ${product.rating}`;

        const showDescriptionButton = createHTMLElement('button',{},{
            width: "25%",
            padding: "0.5vw 0.4vw",
            border: "none",
            borderRadius: "3px",
            color: "#fff",
            backgroundColor: "#2874f0",
            fontSize: "0.9vw"
        })
        showDescriptionButton.textContent = "Show Description";

        const lessDescriptionButton = createHTMLElement('button',{},{
            width: "25%",
            padding: "0.5vw 0.4vw",
            border: "none",
            borderRadius: "3px",
            color: "#fff",
            backgroundColor: "#2874f0",
            fontSize: "0.9vw"
        })
        lessDescriptionButton.textContent = "Show Less";
        lessDescriptionButton.style.display = "none"; // Initially hide "Show Less" button

        const description = createHTMLElement('div', {class: 'description'},{
            fontSize: "0.9vw",
            display: "none"
        })

        description.textContent = product.description;

        // add event listener for Show Description button
        showDescriptionButton.addEventListener("click", () => {
        description.style.display = "block";
        lessDescriptionButton.style.display = "block";
        showDescriptionButton.style.display = "none";
        });

        // add event listener for Show Less button
        lessDescriptionButton.addEventListener("click", () => {
        description.style.display = "none";
        lessDescriptionButton.style.display = "none";
        showDescriptionButton.style.display = "block";
        });


        const thumbnailContainer = createHTMLElement('div', {class: 'thumbnail-container'},{
            display: "flex", 
            gap: '1vw',
            flexWrap: "wrap"
        })

        // create thumbnail images
        function populatethumbnail(product){
            product.images.forEach((imageUrl, index) => {
                const thumbnailImage = createHTMLElement('img', {class: 'thumbnail', src: imageUrl, alt: `${product.title}`},{
                    height: "40px",
                    width: "40px",
                    objectFit: "cover"
                })
    
                // add click event listener to change the main image
                thumbnailImage.addEventListener("click", () => changeMainImage(imageUrl, product.title));
    
                // append thumbnails to the thumbnail container
                thumbnailContainer.appendChild(thumbnailImage);
            });
        }

        function changeMainImage(imageUrl,title){
            mainImage.src = imageUrl;
            mainImage.alt = title;
        }

        populatethumbnail(product);
        

        const imgDiv = createHTMLElement('div', {class: 'image-container'},{
            width: "30%"
        })
        imgDiv.append(mainImage, thumbnailContainer);

        const nameratingDiv = createHTMLElement('div', {class: 'namerating-container'},{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5vw"
        })
        nameratingDiv.append(title,rating,showDescriptionButton,description,lessDescriptionButton);
        const priceDiv = createHTMLElement('div', {class: 'price-container'})
        priceDiv.append(price,originalPrice,discountPercentage);
        
        // Append elements to the card
        card.append(imgDiv,nameratingDiv,priceDiv);
        return card;
    }


    // function to create a radio button for a category
    function createCategoryRadioButton(category) {
        const categoryItem = createHTMLElement('div',{class:'categoryItem'},{
            display: "flex", 
            gap: "1vw" 
        })
        const radioBtn = createHTMLElement('input',{id: category, type:'radio', name: 'category', value: category})
    
        const label = createHTMLElement('label',{},{
            fontWeight: 500,
            fontSize: "1vw",
            textTransform: "capitalize"
        })
        label.textContent = category;
        label.htmlFor= category;

        categoryItem.append(radioBtn,label);
    
        // add event listener to fetch and display products by category when a radio button is selected
        radioBtn.addEventListener('change', () => {
        const selectedCategory = document.querySelector('input[name="category"]:checked').value;
        fetchProductsByCategory(selectedCategory);
        });
    
        return categoryItem;
    }
  
    // function to fetch and display products by category
    function fetchProductsByCategory(category) {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = ''; // clear page
    
        // fetch products by category 
        fetchApi(`https://dummyjson.com/products/category/${category}`);
        
    }
    
  // function to clear selected category and display all products
    function clearSelectedCategory() {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = ''; // clear page
    
        // deselect all radio buttons
        const categoryRadioButtons = document.querySelectorAll('input[name="category"]');
        categoryRadioButtons.forEach(radioBtn => {
        radioBtn.checked = false;
        });
    
        // fetch and display all products
        fetchApi(apiUrl);
        
    }
  
  
    fetch('https://dummyjson.com/products/categories')
        .then(response => response.json())
        .then(categoriesData => {
        const categoryContainer = document.getElementById('category-container');
    
        // create and display radio buttons for each category
        categoriesData.forEach(category => {
            const categoryItem = createCategoryRadioButton(category);
            categoryContainer.appendChild(categoryItem);
        });
    });
  

    // function to fetch and display search results
    function searchProducts(searchText) {
        const productContainer = document.getElementById('product-container');
    
        // clear page
        productContainer.innerHTML = '';
    
        // fetch data using the search API URL
        fetchApi(`https://dummyjson.com/products/search?q=${searchText}`)
        
    }
  
    // function to clear search results and display products from Step 1
    function clearSearchResults() {
        const productContainer = document.getElementById('product-container');
        document.getElementById('search-input').value = '';
        // clear page
        productContainer.innerHTML = '';
    
        // fetch and display products from Step 1
        fetchApi('https://dummyjson.com/products?limit=15')
        
    }
  
    // add event listener for search button
    document.getElementById('search-button').addEventListener('click', () => {
        const searchText = document.getElementById('search-input').value;
        if (searchText.trim() !== '') {
        searchProducts(searchText);
        }
    });
  
    // fetch data from the API
    fetchApi(apiUrl);

    // function to sort product cards by price low to high
    function sortProductsByPriceLowToHigh() {
        const productContainer = document.getElementById('product-container');
        const productCards = Array.from(productContainer.getElementsByClassName('product-card'));
        
         // sort on numerical values using comparison function 
        productCards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price-container').textContent.split('$')[1]);
        const priceB = parseFloat(b.querySelector('.price-container').textContent.split('$')[1]);
        return priceA - priceB;
        });
        
        // clear the product container and append the sorted product cards
        productContainer.innerHTML = '';
        productCards.forEach(card => {
        productContainer.appendChild(card);
        });
    }
        
    // function to sort product cards by price high to low
    function sortProductsByPriceHighToLow() {
        const productContainer = document.getElementById('product-container');
        const productCards = Array.from(productContainer.getElementsByClassName('product-card'));
        
         // sort on numerical values using comparison function 
        productCards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price-container').textContent.split('$')[1]);
        const priceB = parseFloat(b.querySelector('.price-container').textContent.split('$')[1]);
        return priceB - priceA;
        });
        
        // clear the product container and append the sorted product cards
        productContainer.innerHTML = '';
        productCards.forEach(card => {
        productContainer.appendChild(card);
        });
    }
        
    // function to sort product cards by rating high to low
    function sortProductsByRatingHighToLow() {
        const productContainer = document.getElementById('product-container');
        const productCards = Array.from(productContainer.getElementsByClassName('product-card'));
        
        // sort on numerical values using comparison function 
        productCards.sort((a, b) => {
        const ratingA = parseFloat(a.querySelector('.rating').textContent.split(' ')[1]);
        const ratingB = parseFloat(b.querySelector('.rating').textContent.split(' ')[1]);
            return ratingB - ratingA;
        });
        
        // clear the product container and append the sorted product cards
        productContainer.innerHTML = '';
        productCards.forEach(card => {
        productContainer.appendChild(card);
        });
    }
});



