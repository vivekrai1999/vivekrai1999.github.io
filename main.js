const product = "apple-iphone-11-pro"
const productURL = `https://afzal-test-shop.myshopify.com/products/${product}.json`;
const leftContainer = document.querySelector(".left-container")
const rightContainer = document.querySelector(".right-container")
const textMatch = []
let cart = []
let quantity = 1;
let settings={
    addTocart:"vive"
}

const APP = {
    main: async ()=>{
        let CONFIG = {cookieCheck: navigator.cookieEnabled}
        let PRODUCT = {
            getData: async (url) => fetch(url).then((res) => res.json()),
            createProduct: async ( )=> {
                const myProduct = await PRODUCT.getData(productURL)
                const product = myProduct.product
                const {title, vendor, options, variants} = product
                const allOptions = UI.generateOptions(options)
                const vendorElement = `<div class="container vendor">${vendor}</div>`
                const titleElement = `<div class="container title">${title}</div>`
                const priceElement = ` <div class="container price">
                                                <div class="original-price"></div>
                                                <div class="discounted-price"></div>
                                                <div class="sale-tag">Sale</div>
                                            </div>`
                const varientElement = `<div class="container options-container">${allOptions}</div>`
                const quantityElement = `<div class="container quantity">
                                            <div class="quantity-text">Quantity</div>
                                            <div class="sold-out">Sold Out</div>
                                            <div class="quantity-button">
                                                <div class="remove">-</div>
                                                <div class="count">${quantity}</div>
                                                <div class="add">+</div>
                                            </div>
                                            </div>`
                const buyButtonsElement = `<div class="container buy-buttons">
                                                    <div class="add-to-cart">Add to Cart</div>
                                                    <div class="buy-now">Buy Now</div>
                                            </div>`

               
                const arr = [vendorElement,titleElement,priceElement, varientElement, quantityElement, buyButtonsElement]
                const newArr = arr.map((elem)=>elem).join("")
                leftContainer.innerHTML = 
                    `
                    <div class="main-image"><img class="main-thumbnail" src=""></div>
                   <div class="thumbnail-container-main">
                        <i class="thumbnail-left ri-arrow-left-s-line"></i>
                        <div class="thumbnail-container"></div>
                        <i class="thumbnail-right ri-arrow-right-s-line"></i>
                    </div>
                    </div>
                    `
                rightContainer.innerHTML += newArr
                PRODUCT.setDefaults(variants, product)
                UI.quantityToggle()
                ADDLISTENERS.addOptionsListener(variants, product)
                ADDLISTENERS.addThumbnailEvents()
                ADDLISTENERS.addthumbnailSliderEvent()
            },
            fetchPrice: (variants) => {
                const quantityButton = document.querySelector(".quantity-button");
                const soldOut = document.querySelector(".sold-out");
            
                const filteredProduct = variants.find((variant) => variant.title === textMatch.join(" / "));
                const priceElement = document.querySelector(".discounted-price");
                const originalPrice = document.querySelector(".original-price");
            
                if (!filteredProduct) return soldOut.style.display = 'block', quantityButton.style.display = "none";
            
                const { price, compare_at_price } = filteredProduct;
                document.querySelector(".sale-tag").style.display = compare_at_price - price > 0 ? "block" : "none";
                originalPrice.textContent = compare_at_price - price > 0 ? `RS. ${parseFloat(compare_at_price).toLocaleString("en-US", { style: "decimal", minimumFractionDigits: 2 })}` : "";
            
                priceElement.textContent = `RS. ${parseFloat(price).toLocaleString("en-US", { style: "decimal", minimumFractionDigits: 2 })}`;
                
                quantityButton.style.display = "flex";
                soldOut.style.display = 'none';
                quantityButton.style.opacity = "1";
            },
            setDefaults:(variants,product)=>{
                const temp = []
                const allOptions = document.querySelectorAll(".option");

                allOptions.forEach((option) => {
                    const buttons = option.lastElementChild.children;
                    const defaultButton = buttons[0];
                    // Remove existing selection
                    Array.from(buttons).forEach((button) => {
                        button.classList.remove("selected");
                });
                // Apply default selection
                defaultButton.classList.add("selected");
                // Update textMatch with default selection
                const position = defaultButton.dataset.buttonGroup;
                textMatch[position] = defaultButton.textContent;
                temp.push(buttons);
                const data = JSON.parse(localStorage.getItem("cart"))
                // for the first time to establish local Storage
                // if(data){
                //     cart = [...data]
                //     CART.generateCart()
                // }
                // else{
                //     localStorage.setItem("cart", JSON.stringify(cart))
                // }
                UI.imageGroup(product, variants)
                PRODUCT.fetchPrice(variants)
                UI.generateMainImage(variants,product) 
                ADDLISTENERS.addToCartListener(variants, product)
            }
            )}}

        let UI = {
            imageGroup:(product, variants)=>{
                const filteredthumbnails = []
                const searchString = textMatch.join(" / ")
                const filteredProduct = variants.filter((variant)=>variant.title===searchString)
                if(filteredProduct.length>0){
                    const variantId = filteredProduct[0].id
                    const imageData = product.images
                    for(let i=0; i<imageData.length; i++){
                        if(imageData[i].variant_ids.includes(variantId)){
                            filteredthumbnails.push(imageData[i].src)
                            for(let j=i+1; j<imageData.length; j++){
                                if(imageData[j].variant_ids.length==0){
                                    filteredthumbnails.push(imageData[j].src)
                                }
                                else{
                                    break
                                }
                            }
                        }
                    }
                    if(filteredthumbnails.length>0){
                        if(filteredthumbnails.length>4){
                            document.querySelector(".thumbnail-left").style.display = "flex"
                            document.querySelector(".thumbnail-right").style.display = "flex"
                        }
                        else {
                            document.querySelector(".thumbnail-left").style.display = "none"
                            document.querySelector(".thumbnail-right").style.display = "none"
                        }
                        UI.generateThumbnails(filteredthumbnails)
                        const addToCart = document.querySelector(".add-to-cart")
                        addToCart.innerHTML = "Add to Cart"
                        addToCart.style.pointerEvents = "auto"
                        addToCart.style.opacity = "1"
                    }
                    // if there are no related thumbnails available then push all images into the filteredThumbnails
                    else{
                        imageData.forEach((imageObj)=>{
                            filteredthumbnails.push(imageObj.src)
                        })
                        UI.generateThumbnails(filteredthumbnails)
                    }
                }
                // if the variant is not found
                else {
                    UI.generateThumbnails(false)
                    const addToCart = document.querySelector(".add-to-cart")
                    addToCart.innerHTML = "Out of Stock"
                    addToCart.style.opacity = "0.5"
                    addToCart.style.pointerEvents = "none"
                    console.log("product not available");
                }
                console.log("filtered thumbnails: ", filteredthumbnails);
            },
            generateOptions: (options) => options.map(option =>
                `<div class="option ${option.position}-container">
                    <div class="variants-text">${option.name}</div>
                    <div class="variant-buttons ${option.name}-button">
                        ${option.values.map(value => `<div class="btn ${value}" data-button-group="${option.position - 1}">${value}</div>`).join("")}
                    </div>
                </div>`
            ).join(""),
            quantityToggle: () => {
                const addQuantity = document.querySelector(".add");
                const removeQuantity = document.querySelector(".remove");
                const countQuantity = document.querySelector(".count");
                addQuantity.addEventListener("click", () => changeQuantity(1));
                removeQuantity.addEventListener("click", () => quantity >= 2 && changeQuantity(-1));
            
                function changeQuantity(delta) {
                    quantity += delta;
                    countQuantity.innerHTML = quantity;
                }
            },
            generateThumbnails: (filteredthumbnails) => {
                const thumbnailsContainer = document.querySelector(".thumbnail-container");
                thumbnailsContainer.innerHTML = filteredthumbnails
                    ? filteredthumbnails.map((thumbnail, index) => `<img class="thumbnail" src="${thumbnail}" data-index="${index}">`).join("")
                    : "";
            
                if (filteredthumbnails) {
                    const firstThumbnail = document.querySelector(".thumbnail");
                    firstThumbnail && (firstThumbnail.style.border = "1px solid #000");
                    ADDLISTENERS.addThumbnailEvents();
                } else {
                    console.log("product unavailable");
                }
            },
            generateMainImage: (variants, product) => {
                const filteredProduct = variants.find((variant) => variant.title === textMatch.join(" / "));
                const mainThumbnail = document.querySelector(".main-thumbnail");
                mainThumbnail.src = filteredProduct
                    ? product.images.find((imageObj) => imageObj.variant_ids.includes(filteredProduct.id))?.src || "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"
                    : "assets/Out-of-stock-image.jpg";
            
                mainThumbnail.style.opacity = filteredProduct ? "1" : "0.3";
            },
        }
        let ADDLISTENERS = {
            addOptionsListener:(variants, product)=>{
                const optionsContainer = document.querySelector(".options-container");

                optionsContainer.addEventListener("click", (event) => {
                const clickedButton = event.target;
                if (!clickedButton.classList.contains("btn")) return
                const position = clickedButton.dataset.buttonGroup;
                textMatch[position] = clickedButton.textContent;
                const buttonGroup = document.querySelectorAll(
                    `[data-button-group="${position}"]`
                );
                buttonGroup.forEach((button) => {
                    button.classList.remove("selected");
                });
                clickedButton.classList.add("selected");
                quantity = 1;
                document.querySelector(".count").innerHTML = quantity;
                PRODUCT.fetchPrice(variants);
                UI.imageGroup(product, variants);
                UI.generateMainImage(variants, product);
                });
            },
            addThumbnailEvents:()=>{
                const allThumbnails = document.querySelectorAll(".thumbnail")
                allThumbnails.forEach((thumbnail)=>{
                    thumbnail.addEventListener("click",()=>{
                        allThumbnails.forEach(elem=>{
                            elem.style.border = "none"
                        })
                        thumbnail.style.border = "1px solid #000"
                        const imageLink = thumbnail.getAttribute("src")
                        document.querySelector(".main-thumbnail").src = imageLink
                    })
                })
            },
            addthumbnailSliderEvent:()=>{
                const left = document.querySelector(".thumbnail-left")
                const right = document.querySelector(".thumbnail-right")
                const thumbnailContainer = document.querySelector(".thumbnail-container")
                left.addEventListener("click",()=>{
                    thumbnailContainer.scrollBy({
                        left: -thumbnailContainer.clientWidth/4
                    })
                    document.querySelectorAll(".thumbnail").forEach((thumbnail)=>{
                        thumbnail.style.border = "none"
                    })
                    
                })
                right.addEventListener("click",()=>{
                    thumbnailContainer.scrollBy({
                        left: +thumbnailContainer.clientWidth/4
                    })
                })
                
            },
            addToCartListener:(variants, product)=>{
                const addToCart = document.querySelector(".add-to-cart")
                addToCart.addEventListener("click",()=>{
                    document.querySelectorAll(".check-box").forEach(check=>check.checked = false)
                    document.querySelector(".overlay").style.display = "block"
                    document.querySelector(".cart").style.display = "block"
                    const filteredProduct = variants.filter((variant)=>variant.title===textMatch.join(" / "))
                    if(filteredProduct.length>0){
                        const variantId = filteredProduct[0].id
                        const productImageObject = product.images
                        const filteredObject = productImageObject.filter((imageObject)=>imageObject.variant_ids.includes(variantId))
                        const cartProductObj = {variantTitle: product.title, variantId: filteredProduct[0].id,variantName: filteredProduct[0].title, variantQuantity: quantity, price: filteredProduct[0].price, imageLink: filteredObject[0].src}
                        // if cart has product then check if product already exist
                        if(cart.length>0){
                            const checkVariant = cart.findIndex((item)=>item.variantId===variantId)
                            checkVariant!==-1 ? cart[checkVariant].variantQuantity += 1 : cart.push(cartProductObj)
                        }
                        // if cart does not have products then add product directly
                        else {
                            cart.push(cartProductObj)
                        }
                        CART.generateCart(variants)
                        localStorage.setItem("cart", JSON.stringify(cart))
                    }
                    else {
                        addToCart.textContent = "Out of Stock"
                    }
                    
                })
            },
            deleteCartItemListener:()=>{
                const delButtons = document.querySelectorAll(".delete-cart-item i")
                delButtons.forEach((btn)=>btn.addEventListener("click",(e)=>{
                    const toDelete = e.target.getAttribute("id")
                    cart = cart.filter((product)=>product.variantId!=toDelete)
                    CART.generateCart()
                }))
            },
            overlayListener: ()=>{
                document.querySelector(".overlay").addEventListener("click",()=>{
                    document.querySelector(".cart").style.display = "none"
                    document.querySelector(".overlay").style.display = "none"
                })  
            },
            closeCart: ()=>{
                document.querySelector(".close-cart").addEventListener("click",()=>{
                    document.querySelector(".cart").style.display = "none"
                    document.querySelector(".overlay").style.display = "none"  
                })
            },
            clearCart: ()=>{
                const clearCart = document.querySelector(".clear-cart")
                cart.length>0 ? clearCart.style.display = "block" : clearCart.style.display = "none"
                clearCart.addEventListener("click",()=>{
                    cart = cart.filter((item)=>2>5)
                    CART.generateCart()
                })
            },
            updateQuantityListener:()=>{
                const add = document.querySelectorAll(".cart-add")
                const remove = document.querySelectorAll(".cart-remove")
                const cartQuantity = document.querySelectorAll(".cart-count")
                add.forEach((item)=>{
                    item.addEventListener("click",(event)=>{
                        const variantFind = cart.findIndex((item)=>item.variantId==event.target.getAttribute("data-variant"))
                        cart[variantFind].variantQuantity += 1
                        localStorage.setItem("cart", JSON.stringify(cart))
                        CART.generateCart()
                    })
                })
                
                remove.forEach((item)=>{
                    item.addEventListener("click",(event)=>{
                        const variantFind = cart.findIndex((item)=>item.variantId==event.target.getAttribute("data-variant"))
                        if(cart[variantFind].variantQuantity>0){
                            cart[variantFind].variantQuantity -= 1
                            localStorage.setItem("cart", JSON.stringify(cart))
                            CART.generateCart()

                        }
                        if(cart[variantFind].variantQuantity==0){
                            cart = cart.filter(item=>item.variantQuantity!==0)
                            localStorage.setItem("cart", JSON.stringify(cart))
                            CART.generateCart()

                        }
                        
                       
                    })
                })
            }
        }
        let CART = {
            generateCart: ()=>{
                const cartDOM = cart.map(product=>{
                    console.log(product);
                    const {variantTitle, variantId, variantName, variantQuantity, price, imageLink} = product
                    return `
                    <div class="item-container">
                    <div class="item">
                        <div class="item-general-details">
                            <div class="item-image">
                                <img src="${imageLink}" alt="">
                            </div>
                            <div class="item-details">
                                <div class="item-name">${variantTitle}</div>
                                <div class="item-variant">${variantName}</div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="item-options">
                        <div class="row-0">
                            <div class="item-quantity">
                            <div class="cart-item-quantity">
                                <div class="cart-remove" data-variant=${variantId}>-</div>
                                <div class="cart-count">${variantQuantity}</div>
                                <div class="cart-add" data-variant=${variantId}>+</div>
                            </div>
                            </div>
                            <div class="delete-cart-item">
                                <i class="ri-delete-bin-7-fill" id=${variantId}></i>
                            </div>
                        </div>
                    </div>
                    
                </div>
                    `
                }).join("")
                const cartTotal = document.querySelector(".cart-total")
                const total = cart.reduce((acc, val)=>{
                    return acc + (parseFloat(val.price))*val.variantQuantity
                },0)
                cartTotal.textContent = `Rs. ${parseFloat(total).toLocaleString("en-US", {style: "decimal", minimumFractionDigits: 2})}`
                document.querySelector(".cart-items").innerHTML = cartDOM
                ADDLISTENERS.deleteCartItemListener()
                ADDLISTENERS.updateQuantityListener()
                ADDLISTENERS.closeCart()
                ADDLISTENERS.clearCart()
                ADDLISTENERS.overlayListener()
                
            },
        }
        if(CONFIG.cookieCheck){
            console.log("cookie enabled");
            await PRODUCT.createProduct(productURL)
           
        }
        else{
            console.log("cookie diabled unable to load page");
        }
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    (function(){
        APP.main()
    })();
})



// const jsonData = {
//     "product": {
//     "id": 7227185168541,
//     "title": "Apple iPhone 11 Pro",
//     "body_html": "<div class=\"shogun-root\" data-shogun-id=\"5ee4828b408897004fff550b\" data-shogun-site-id=\"85433d4c-a0b5-4fc8-8cfc-899b069ea23c\" data-shogun-page-id=\"5ee4828b408897004fff550b\" data-shogun-page-version-id=\"5ee4830f3d558c00518862a0\" data-shogun-platform-type=\"shopify\" data-shogun-variant-id=\"5ee4830f3d558c00518862a4\" data-region=\"main\">\n  \n\n<div id=\"s-d18a1705-d254-45b3-9702-b0a6c96458ef\" class=\"shg-c  \">\n  <p></p>\n\n</div>\n\n\n</div>\n",
//     "vendor": "Easy Variant Images Demo",
//     "product_type": "",
//     "created_at": "2021-12-31T12:26:06+05:30",
//     "handle": "apple-iphone-11-pro",
//     "updated_at": "2023-11-17T08:27:32+05:30",
//     "published_at": "2021-12-31T12:25:56+05:30",
//     "template_suffix": "",
//     "published_scope": "web",
//     "tags": "crayola",
//     "variants": [],
//     "options": [],
//     "images": [
//     {
//     "id": 31683307962525,
//     "product_id": 7227185168541,
//     "position": 1,
//     "created_at": "2021-12-31T12:26:06+05:30",
//     "updated_at": "2021-12-31T12:26:06+05:30",
//     "alt": null,
//     "width": 1024,
//     "height": 1024,
//     "src": "https://cdn.shopify.com/s/files/1/0435/9530/1021/products/iphone_11-_Gold1.jpg?v=1640933766",
//     "variant_ids": [
//     41726647566493,
//     41726647632029,
//     41726647664797
//     ]
//     },
//     {
//     "id": 31683307995293,
//     "product_id": 7227185168541,
//     "position": 2,
//     "created_at": "2021-12-31T12:26:06+05:30",
//     "updated_at": "2021-12-31T12:26:06+05:30",
//     "alt": null,
//     "width": 1024,
//     "height": 1024,
//     "src": "https://cdn.shopify.com/s/files/1/0435/9530/1021/products/iphone_11-_Gold2.jpg?v=1640933766",
//     "variant_ids": []
//     },
//     {
//     "id": 31683308028061,
//     "product_id": 7227185168541,
//     "position": 3,
//     "created_at": "2021-12-31T12:26:06+05:30",
//     "updated_at": "2021-12-31T12:26:06+05:30",
//     "alt": null,
//     "width": 1024,
//     "height": 1024,
//     "src": "https://cdn.shopify.com/s/files/1/0435/9530/1021/products/iphone_11-_Gold3.jpg?v=1640933766",
//     "variant_ids": []
//     },
//     {
//     "id": 31683308093597,
//     "product_id": 7227185168541,
//     "position": 4,
//     "created_at": "2021-12-31T12:26:06+05:30",
//     "updated_at": "2021-12-31T12:26:06+05:30",
//     "alt": null,
//     "width": 1024,
//     "height": 1024,
//     "src": "https://cdn.shopify.com/s/files/1/0435/9530/1021/products/iphone_11-_Midnight_Green1.jpg?v=1640933766",
//     "variant_ids": [
//     41726647730333,
//     41726647959709
//     ]
//     },
//     {
//     "id": 31683308159133,
//     "product_id": 7227185168541,
//     "position": 5,
//     "created_at": "2021-12-31T12:26:06+05:30",
//     "updated_at": "2021-12-31T12:26:06+05:30",
//     "alt": null,
//     "width": 1024,
//     "height": 1024,
//     "src": "https://cdn.shopify.com/s/files/1/0435/9530/1021/products/iphone_11-_Midnight_Green3.jpg?v=1640933766",
//     "variant_ids": []
//     },
//     {
//     "id": 31683308191901,
//     "product_id": 7227185168541,
//     "position": 6,
//     "created_at": "2021-12-31T12:26:06+05:30",
//     "updated_at": "2021-12-31T12:26:06+05:30",
//     "alt": null,
//     "width": 1500,
//     "height": 1500,
//     "src": "https://cdn.shopify.com/s/files/1/0435/9530/1021/products/iphone_11-_Midnight_Green4.jpg?v=1640933766",
//     "variant_ids": []
//     },
//     {
//     "id": 31683308224669,
//     "product_id": 7227185168541,
//     "position": 7,
//     "created_at": "2021-12-31T12:26:06+05:30",
//     "updated_at": "2021-12-31T12:26:06+05:30",
//     "alt": null,
//     "width": 1024,
//     "height": 1024,
//     "src": "https://cdn.shopify.com/s/files/1/0435/9530/1021/products/iphone_11-_Silver1.jpg?v=1640933766",
//     "variant_ids": []
//     },
//     {
//     "id": 31683308257437,
//     "product_id": 7227185168541,
//     "position": 8,
//     "created_at": "2021-12-31T12:26:06+05:30",
//     "updated_at": "2021-12-31T12:26:06+05:30",
//     "alt": null,
//     "width": 1024,
//     "height": 1024,
//     "src": "https://cdn.shopify.com/s/files/1/0435/9530/1021/products/iphone_11-_Silver2.jpg?v=1640933766",
//     "variant_ids": [
//     41726647435421
//     ]
//     },
//     {
//     "id": 31683308290205,
//     "product_id": 7227185168541,
//     "position": 9,
//     "created_at": "2021-12-31T12:26:06+05:30",
//     "updated_at": "2021-12-31T12:26:06+05:30",
//     "alt": null,
//     "width": 1500,
//     "height": 1500,
//     "src": "https://cdn.shopify.com/s/files/1/0435/9530/1021/products/iphone_11-_Silver5.jpg?v=1640933766",
//     "variant_ids": [
//     41726647500957
//     ]
//     },
//     {
//     "id": 31683308322973,
//     "product_id": 7227185168541,
//     "position": 10,
//     "created_at": "2021-12-31T12:26:06+05:30",
//     "updated_at": "2021-12-31T12:26:06+05:30",
//     "alt": null,
//     "width": 1024,
//     "height": 1024,
//     "src": "https://cdn.shopify.com/s/files/1/0435/9530/1021/products/iphone_11-_Space_Grey1.jpg?v=1640933766",
//     "variant_ids": [
//     41726648090781,
//     41726648221853,
//     41726648451229
//     ]
//     },
//     {
//     "id": 31683308355741,
//     "product_id": 7227185168541,
//     "position": 11,
//     "created_at": "2021-12-31T12:26:06+05:30",
//     "updated_at": "2021-12-31T12:26:06+05:30",
//     "alt": null,
//     "width": 1024,
//     "height": 1024,
//     "src": "https://cdn.shopify.com/s/files/1/0435/9530/1021/products/iphone_11-_Space_Grey2.jpg?v=1640933766",
//     "variant_ids": []
//     },
//     {
//     "id": 31683308388509,
//     "product_id": 7227185168541,
//     "position": 12,
//     "created_at": "2021-12-31T12:26:06+05:30",
//     "updated_at": "2021-12-31T12:26:06+05:30",
//     "alt": null,
//     "width": 1500,
//     "height": 1500,
//     "src": "https://cdn.shopify.com/s/files/1/0435/9530/1021/products/iphone_11-_Space_Grey3.jpg?v=1640933766",
//     "variant_ids": []
//     }
//     ],
//     "image": {}
//     }
//     };
    
//     // Extract the "images" array from the JSON
//     const imagesArray = jsonData.product.images;
    
//     // Initialize an array to store the grouped objects
//     const groupedObjects = [];
    
//     // Iterate through the images array
//     for (let i = 0; i < imagesArray.length; i++) {
//         const currentObject = imagesArray[i];
    
//         // Check if the current object has non-empty "variant_ids"
//         if (currentObject.variant_ids && currentObject.variant_ids.length > 0) {
//             // Add the current object to the grouped objects array
//             groupedObjects.push({
//                 variant_ids: currentObject.variant_ids,
//                 src: [currentObject.src],
//             });
//         } else if (groupedObjects.length > 0) {
//             // Add the current object's src to the last grouped object
//             groupedObjects[groupedObjects.length - 1].src.push(currentObject.src);
//         } else {
//             // If there are no grouped objects yet, create a new one
//             groupedObjects.push({
//                 variant_ids: [],
//                 src: [currentObject.src],
//             });
//         }
//     }
    
//     // Log the result
//     console.log(groupedObjects);
    