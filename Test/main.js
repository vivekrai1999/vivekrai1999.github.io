const product = "apple-iphone-11-clean"
const productURL = `https://afzal-test-shop.myshopify.com/products/${product}.json`;
const addonHandles = ["color_box","apple-iphone-11-pro","sienna","purar-air-mask-classic"]
const leftContainer = document.querySelector(".left-container")
const rightContainer = document.querySelector(".right-container")
const groupedObjects = []; 
let productData;
let productAddonsDataFiltered;
const textMatch = []
let cart = []
let addonCart = []
let quantity = 1;

const APP = {
    main: async ()=>{
        let SETTINGS = {
            getData: async (url)=>{
                productData = await fetch(url).then(res=>res.json()).then(data=>data)
            },
            generateThmbnailsData: ()=>{
                const imagesArray = productData.product.images
                for (let i = 0; i < imagesArray.length; i++) {
                     const currentObject = imagesArray[i];
                    
                    if (currentObject.variant_ids && currentObject.variant_ids.length > 0) {
                         groupedObjects.push({
                            variant_ids: currentObject.variant_ids,
                            src: [currentObject.src],
                        });
                    } else if (groupedObjects.length > 0) {
                        groupedObjects[groupedObjects.length - 1].src.push(currentObject.src);
                    } else {
                        groupedObjects.push({
                            variant_ids: [],
                            src: [currentObject.src],
                        });
                    }
                    }
            }
        }
        let CONFIG = {
            cookieCheck: navigator.cookieEnabled
        }
        let PRODUCT = {
            createProduct: ()=> {
                const product = productData.product
                const {title, vendor, options, variants} = product
                const allOptions = UI.generateOptions(options)
                const vendorElement = `<div class="container vendor">${vendor}</div>`
                const titleElement = `<div class="container title">${title}</div>`
                const priceElement = ` <div class="container price"><div class="original-price"></div><div class="discounted-price"></div><div class="sale-tag">Sale</div></div>`
                const varientElement = `<div class="container options-container">${allOptions}</div>`
                const quantityElement = `<div class="container quantity"><div class="quantity-text">Quantity</div><div class="sold-out">Sold Out</div><div class="quantity-button"><div class="remove">-</div><div class="count">${quantity}</div><div class="add">+</div></div></div>`
                const buyButtonsElement = `<div class="container buy-buttons"><div class="add-to-cart">Add to Cart</div><div class="buy-now">Buy Now</div></div>`
                const productAddonElement = `<div class="product-addons-container"><div>Product Addons Box</div><div class="addon-product-collection"></div></div>`
                const arr = [vendorElement,titleElement,priceElement, varientElement, quantityElement, buyButtonsElement, productAddonElement]
                leftContainer.innerHTML = `<div class="main-image"><img class="main-thumbnail" src=""></div><div class="thumbnail-container-main"><i class="thumbnail-left ri-arrow-left-s-line"></i><div class="thumbnail-container"></div><i class="thumbnail-right ri-arrow-right-s-line"></i></div></div>`
                const productDOM = arr.map((elem)=>elem).join("")
                rightContainer.innerHTML += productDOM
                document.querySelector(".addon-product-collection").innerHTML = ADDONS.generateAddons()
                PRODUCT.setDefaults(variants, product)
                UI.quantityToggle()
                ADDLISTENERS.addonSelectListener()
                ADDLISTENERS.addonCheckboxListener()
                ADDLISTENERS.addOptionsListener(variants, product)
                ADDLISTENERS.addThumbnailEvents()
                ADDLISTENERS.addthumbnailSliderEvent()
                ADDLISTENERS.addToCartListener(variants, product)

                
            },
            fetchPrice:(variants)=>{
                const selectors = ['.discounted-price', '.original-price', '.quantity-button', '.sold-out', '.sale-tag'];
                const [priceElement, originalPrice, quantityButton, soldOut, saleTag] = selectors.map(e=>document.querySelector(e))
                const filteredProduct = variants.filter((variant)=>variant.title===textMatch.join(" / "))[0]
                if(filteredProduct){
                    const {price, compare_at_price} = filteredProduct
                    const discountPrice = parseFloat(price).toLocaleString("en-US", {style: "decimal", minimumFractionDigits: 2})
                    const comparePrice = parseFloat(compare_at_price).toLocaleString("en-US", {style: "decimal", minimumFractionDigits: 2})
                    saleTag.style.display = comparePrice-discountPrice>0 ? "block" : "none"
                    originalPrice.textContent = comparePrice-discountPrice>0 ? `Rs. ${comparePrice}` : ""
                    priceElement.textContent = `Rs. ${discountPrice}`
                    quantityButton.style.display = "flex"
                    soldOut.style.display = "none";
                    quantityButton.style.opacity = "1";
                }
                else {
                    priceElement.textContent = "Sold Out";
                    quantityButton.style.display = "none";
                    soldOut.style.display = "block";
                }
            },
            setDefaults:(variants,product)=>{
                const temp = []
                const allOptions = document.querySelectorAll(".option");
                allOptions.forEach((option) => {
                    const buttons = option.lastElementChild.children;
                    const defaultButton = buttons[0];
                    Array.from(buttons).forEach((button) => {
                        button.classList.remove("selected");
                    });
                    defaultButton.classList.add("selected");
                    const position = defaultButton.dataset.buttonGroup;
                    textMatch[position] = defaultButton.textContent;
                    temp.push(buttons)
                })
                UI.generateThumbnails(variants)
                UI.generateMainImage(variants,product) 
                PRODUCT.fetchPrice(variants)
                
            }
        }
        let ADDONS = {
            getAddons: async ()=>{
                const productAddonsData = await Promise.allSettled(addonHandles.map(addon=>fetch(`https://afzal-test-shop.myshopify.com/products/${addon}.json`).then(res=>res.json())))
                productAddonsDataFiltered = productAddonsData.filter(e=>e.status==="fulfilled").map(e=>e.value.product)
            },
            generateOptions: (variant)=>{
                return variant.map(e=>`<option value="${e.id}">${e.title}</div>`).join("")
            },
            generateAddonImage: (id, productId) => (
                productAddonsDataFiltered.find(e => e.id === parseInt(productId))?.images.find(e => e.variant_ids.includes(parseInt(id)))?.src || 'assets/Out-of-stock-image.jpg'
            ),
            generateAddonPrice: (id, productId) => (
                (productAddonsDataFiltered.find(e => e.id === parseInt(productId))?.variants.find(e => e.id === parseInt(id)) || {}).price
            ),  
            generateSelect: (options, productId, variantId) => (
               `<select class="addon-select" name="select-option" id="select-${variantId}" data-product-id="select-product-${productId}">
                    ${ADDONS.generateOptions(options)}
                </select>`
            ),          
            generateAddons: ()=>(
                productAddonsDataFiltered.map(e=>`<div class="addon-product-card" id="card-${e.id}">
                <div class="addon-left-container">
                    <input type="checkbox" class="check-box" name="add-addon" id="check-${e.variants[0].id}" data-product-id="check-product-${e.id}">
                    <img class="addon-img" id="img-${e.variants[0].id}" src=${ADDONS.generateAddonImage(e.variants[0].id, e.id)} alt="">
                </div>
                <div class="addon-right-container">
                    <div class="addon-title">${e.title}</div>
                    <div class="addon-price" id="price-${e.variants[0].id}">Rs. ${ADDONS.generateAddonPrice(e.variants[0].id, e.id)}</div>
                    <div class="addon-option">
                        ${ADDONS.generateSelect(e.variants, e.id, e.variants[0].id)}
                    </div>
                    <div class="addon-quantity-container">
                    <input value=1 type="number" min="1" class="addon-quantity" id="quantity-${e.variants[0].id}" data-product-id="quantity-product-${e.id}">
                    </div>
                </div>
                </div>`
                ).join("")           
            ),
        }
        let UI = {
            generateOptions: (options) =>
                options.map((option) => `
                    <div class="option ${option.position}-container">
                        <div class="variants-text">${option.name}</div>
                        <div class="variant-buttons ${option.name}-button">
                            ${option.values.map((value) => `<div class="btn ${value}" data-button-group="${option.position-1}">${value}</div>`).join("")}
                        </div>
                    </div>`
                ).join(""),

            quantityToggle:()=>{
                const addQuantity = document.querySelector(".add")
                const removeQuantity = document.querySelector(".remove")
                const countQuantity = document.querySelector(".count")
                addQuantity.addEventListener("click",()=>updateQuantity(1))
                removeQuantity.addEventListener("click",()=>quantity>=2?updateQuantity(-1):null)
                function updateQuantity(change){
                    quantity += change
                    countQuantity.innerHTML = quantity
                }
            },
            generateThumbnails:async (variants)=>{
                const thumbnailsContainer = document.querySelector(".thumbnail-container")
                const filteredProduct = variants.find((variant)=>variant.title===textMatch.join(" / "))?.id
                const filteredImages = await groupedObjects.find(e=>e.variant_ids.includes(filteredProduct))
                const filteredthumbnails = filteredImages?.src
                thumbnailsContainer.innerHTML = ""
                if(filteredthumbnails){
                    thumbnailsContainer.innerHTML = filteredthumbnails.map((thumbnail, index)=>`<img class="thumbnail" src="${thumbnail}" data-index="${index}">`).join("")
                    document.querySelector(".thumbnail").style.border = "1px solid #000"
                    ADDLISTENERS.addThumbnailEvents()
                }
                else {
                    console.log("product unavilable");
                }
            },
            generateMainImage:(variants,product)=>{
                const mainThumbnail = document.querySelector(".main-thumbnail")
                const addToCart = document.querySelector(".add-to-cart")
                const filteredProduct = variants.find((variant)=>variant.title===textMatch.join(" / "))
                if(filteredProduct){
                    const variantId = filteredProduct.id
                    const filteredObject = product.images.find((imageObject)=>imageObject.variant_ids.includes(variantId))
                    if(filteredObject){
                        setupAddToCart(addToCart)
                        mainThumbnail.src = filteredObject.src
                        mainThumbnail.style.opacity = "1"
                    }
                    else {
                        setMainThumbnailDefault(mainThumbnail, "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png", "0.3");
                    }
                }
                else {
                    setMainThumbnailDefault(mainThumbnail, "assets/Out-of-stock-image.jpg", "0.3");
                }
                function setupAddToCart(addToCart) {
                    addToCart.innerHTML = "Add to Cart";
                    addToCart.style.backgroundColor = "#fff";
                    addToCart.style.color = "#000";
                    addToCart.style.pointerEvents = "auto";
                }
                
                function setMainThumbnailDefault(mainThumbnail, src, opacity) {
                    mainThumbnail.src = src;
                    mainThumbnail.style.opacity = opacity;
                }
            },
        }
        let ADDLISTENERS = {
            addonCheckboxListener: () => {
                document.querySelectorAll(".check-box").forEach(e => e.addEventListener("change", () => {
                    const productId = parseInt(e.getAttribute("data-product-id").split("-")[2]);
                    const variantId = parseInt(e.getAttribute("id").split("-")[1]);
                    const addonQuantity = parseInt(document.querySelector(`#quantity-${variantId}`).value)
                    const product = (productAddonsDataFiltered.find((e) => e.id === productId) || {});
                    const productVariant = product.variants.find(e => e.id === variantId);
                    const image = product.images.find(e => e.variant_ids.includes(variantId)).src;
                    const obj = { productId: productId ,variantTitle: product.title, variantId: productVariant?.id, variantName: productVariant?.title, variantQuantity: addonQuantity, price: productVariant?.price, imageLink: image };
                    e.checked ? addToAddonCart(obj) : removeFromAddonCart(variantId);
                }))
                function addToAddonCart(obj) {
                    const checkVariant = addonCart.findIndex((item) => item.variantId === obj.variantId);
                    checkVariant !== -1 ? (addonCart[checkVariant].variantQuantity = variantQuantity) : addonCart.push(obj);
                    console.log(addonCart);
                }   
                function removeFromAddonCart(variantId) {
                    addonCart = addonCart.filter((e) => e.variantId !== parseInt(variantId));
                    console.log(addonCart);
                }
            },   
            handleAddonSelectChange: (e) => {
                const productId = e.getAttribute("data-product-id").split("-")[2];
                const checkBox = e.parentNode.parentNode.parentNode.querySelector(".check-box")
                const addonPrice = e.parentNode.parentNode.parentNode.querySelector(".addon-price")
                const addonImage = e.parentNode.parentNode.parentNode.querySelector(".addon-img")
                const addonQuantity = e.parentNode.parentNode.parentNode.querySelector(".addon-quantity")
                e.id = `select-${e.value}`
                checkBox.id = `check-${e.value}`
                addonPrice.id = `price-${e.value}`
                addonImage.id = `img-${e.value}`
                addonQuantity.id = `quantity-${e.value}`
                document.getElementById(`check-${e.value}`).checked = false
                addonPrice.innerHTML = ADDONS.generateAddonPrice(e.value, productId)
                addonImage.src = ADDONS.generateAddonImage(e.value, productId)
            },      
            addonSelectListener: () => {
                const addonSelect = document.querySelectorAll(".addon-select")
                addonSelect.forEach(e => e.addEventListener("change", () => {
                    ADDLISTENERS.handleAddonSelectChange(e)
                }));
            },
            addOptionsListener:(variants, product)=>{
                const allOptions = document.querySelectorAll(".option")
                allOptions.forEach(option=>{
                    Array.from(option.lastElementChild.children).forEach(button=>{
                        button.addEventListener("click",()=>{
                            const position = button.getAttribute("data-button-group")
                            textMatch[position] = button.textContent
                            document.querySelectorAll(`[data-button-group='${position}']`).forEach((button=>{
                                button.classList.remove("selected");
                            }))
                            button.classList.add("selected")
                            quantity = 1
                            document.querySelector(".count").innerHTML = quantity
                            PRODUCT.fetchPrice(variants)
                            UI.generateThumbnails(variants)
                            UI.generateMainImage(variants, product)
                        })
                    })
                })
            },
            addThumbnailEvents: () => {
                document.querySelectorAll(".thumbnail").forEach(thumbnail => {
                    thumbnail.addEventListener("click", () => {
                        document.querySelectorAll(".thumbnail").forEach(elem => elem.style.border = "none");
                        thumbnail.style.border = "1px solid #000";
                        document.querySelector(".main-thumbnail").src = thumbnail.getAttribute("src");
                    });
                });
            },
            addthumbnailSliderEvent:()=>{
                const left = document.querySelector(".thumbnail-left")
                const right = document.querySelector(".thumbnail-right")
                const thumbnailContainer = document.querySelector(".thumbnail-container")
                left.addEventListener("click",()=>{thumbnailContainer.scrollBy({left: -thumbnailContainer.clientWidth/4})
                document.querySelectorAll(".thumbnail").forEach((thumbnail)=>{thumbnail.style.border = "none"})})
                right.addEventListener("click",()=>{thumbnailContainer.scrollBy({left: +thumbnailContainer.clientWidth/4})})  
            },
            addToCartListener:(variants, product)=>{
                const addToCart = document.querySelector(".add-to-cart")
                addToCart.addEventListener("click",()=>{
                    document.querySelectorAll(".check-box").forEach(check=>check.checked = false)
                    document.querySelector(".overlay").style.display = "block"
                    document.querySelector(".cart").style.display = "block"
                    const filteredProduct = variants.find((variant)=>variant.title===textMatch.join(" / "))
                    if(filteredProduct){
                        const variantId = filteredProduct.id
                        const filteredObject = product.images.find((imageObject)=>imageObject.variant_ids.includes(variantId))
                        const cartProductObj = {productId: product.id, variantTitle: product.title, variantId: filteredProduct.id,variantName: filteredProduct.title, variantQuantity: quantity, price: filteredProduct.price, imageLink: filteredObject.src||""}
                        // if cart has product then check if product already exist
                        if(cart.length>0){
                            const checkVariant = cart.findIndex((item)=>item.variantId===variantId)
                            checkVariant!==-1 ? cart[checkVariant].variantQuantity = quantity : cart.push(cartProductObj)
                        }
                        // if cart does not have products then add product directly
                        else {
                            cart.push(cartProductObj)
                        }
                    }
                    else {
                        addToCart.textContent = "Out of Stock"
                    }

                    addonCart.forEach(e=>{
                        if(cart.length>0){
                            const checkVariant = cart.findIndex((item)=>item.variantId===e.variantId)
                            checkVariant!==-1 ? cart[checkVariant].variantQuantity = e.variantQuantity : cart.push(e)
                        }
                        // if cart does not have products then add product directly
                        else {
                            cart.push(e)
                        }
                    })
                    CART.generateCart(variants)
                    addonCart = []
                })
            },
            deleteCartItemListener:()=>{
                document.querySelectorAll(".delete-cart-item i").forEach((btn)=>btn.addEventListener("click",(e)=>{
                    cart = cart.filter((product)=>product.variantId!=e.target.getAttribute("id"))
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
            clearCart: () => {
                const clearCart = document.querySelector(".clear-cart");
                clearCart.style.display = cart.length > 0 ? "block" : "none";
                clearCart.addEventListener("click", () => {
                    cart = [];
                    CART.generateCart();
                });
            },
            updateQuantityListener: () => {
                const updateCartItem = (event, increment) => {
                    const variantFind = cart.findIndex(item => item.variantId == event.target.getAttribute("data-variant"));
                    cart[variantFind].variantQuantity += increment;
                    if (cart[variantFind].variantQuantity <= 0) {
                        cart = cart.filter(item => item.variantQuantity !== 0);
                    }
                    CART.generateCart();
                };
                document.querySelectorAll(".cart-add").forEach(item => {
                    item.addEventListener("click", event => updateCartItem(event, 1));
                });
                document.querySelectorAll(".cart-remove").forEach(item => {
                    item.addEventListener("click", event => updateCartItem(event, -1));
                });
            },            
        }
        let STORAGE = {
            setLocalStorage: ()=>{
                localStorage.setItem("cart",JSON.stringify(cart))
            },
            getLocalStorage: ()=>{
                localStorage.getItem(JSON.parse("cart"))
            }
        }
        let CART = {
            generateCart: () => {
                const cartTotal = document.querySelector(".cart-total");
                const cartItems = cart.map(({ productId, variantTitle, variantId, variantName, variantQuantity, price, imageLink }) => {
                    const variant = productAddonsDataFiltered.find(e=>e.id===productId)?.variants || productData.product.variants
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
                            <div class="row-1">
                            </div>
                        </div>
                    </div>`}).join("");
            
                const total = cart.reduce((acc, { price, variantQuantity }) => acc + parseFloat(price) * variantQuantity, 0);
                cartTotal.textContent = `Rs. ${parseFloat(total).toLocaleString("en-US", { style: "decimal", minimumFractionDigits: 2 })}`;

                document.querySelector(".cart-items").innerHTML = cartItems;
                ADDLISTENERS.deleteCartItemListener();
                ADDLISTENERS.updateQuantityListener();
                ADDLISTENERS.closeCart();
                ADDLISTENERS.clearCart();
                ADDLISTENERS.overlayListener();
            },
            
        }
        if(CONFIG.cookieCheck){
            console.log("cookie enabled");
            await SETTINGS.getData(productURL)
            await ADDONS.getAddons()
            SETTINGS.generateThmbnailsData()
            PRODUCT.createProduct()
            ADDONS.generateAddons()
        }
        else{
            console.log("cookie diabled unable to load page");
        }
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    (()=>{
        APP.main()
    })();
})
