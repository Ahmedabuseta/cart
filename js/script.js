// let allProduct = document.querySelectorAll('li');
// let content    = document.querySelector('.content');
// var btn        = document.querySelector('#btn1')
// let price      = document.querySelector('.price');
// let totalPrice = 0 ;

// allProduct.forEach(function(item){
//     item.onclick = function (){
//         totalPrice += parseInt(item.getAttribute('price'));

//         content.innerHTML += item.textContent+' /////// ';

//         if(content.innerHTML !=""){
//             btn.style.display = 'block';
//             btn.style.color='red';
//         }

//     }
// })
// btn.onclick = function(){
//     price.innerHTML = totalPrice;
// }

// content.innerHTML += item.textContent;
// content.innerHTML = content.innerHTML + item.textContent
//    x +=6        x = x+6


// string to intger................
// 01--> +(item.getAttribute('price'))
// 02--> paresInt(item.getAttribute('price'))
// 03--> number(item.getAttribute('price'))
// 04-->

let cartIcon = document.getElementById('cart-icon');
let cart     = document.getElementById('cart');
let closeCart= document.querySelector('.btn-close');
let prdctcnr = document.querySelector('#product-counter')
let products = document.querySelectorAll('.add');
let toastContainer = document.getElementById("toastContainer");
let cartCOntainer = document.getElementById('cart-added-products');
let removeProductFromCart = document.querySelector('.remove-product-from-cart')
let showTotalPrice  = document.getElementById('total');
let counter = 1 ;
let totalPrice = 1.49 ;

cartIcon.onclick = function(){
    cart.style.setProperty("display", "flex", "important");
}
closeCart.onclick = function(){
    cart.style.setProperty("display", "none", "important");
}


products.forEach(function(item){
    item.onclick = function(){
        prdctcnr.innerHTML = +(prdctcnr.innerHTML) +1 ;

        // show products in cart 
        // Get the parent div (photo-container)
        const prdctContainer = this.parentNode;
      // Find the image element inside the div
        const photo = prdctContainer.querySelector("img").src;
        const price = prdctContainer.querySelector('.price').textContent;
        const title = prdctContainer.querySelector('.product-title').textContent;

        const addProduct = document.createElement('div');
        addProduct.innerHTML = `
        <div class="cart-product p-1 d-flex justify-content-between position-relative flex-row border-bottom mb-3 align-items-center ">
            <div id="product-cart-info" class="d-flex gap-2 align-items-center flex-row w-50 h-50">
                <div class=" border-end pe-2 " >
                    <img id="cart-img" src=${photo} alt="product" class="  rounded  w-100 h-100">
                </div>
                <div  class="d-flex flex-column gap-2"> 
                    <p id="product-cart-name">${title}</p>
                    <div id="controls">
                        <span id="munise-one" class=" text-success " style="cursor: pointer;">-</span>
                        <span id="item-num" class="p-2">1</span>
                        <span id="pluse-one" class=" text-success" style="cursor: pointer;">+</span>
                    </div>
                </div>
            </div>
            <p > <span id="price" class="one-product-price" price = "${price}">${price}</span> L.E</p>
            <button type="button" class="btn-close position-absolute top-0 end-0 btn bg-danger rounded-circle remove-product-from-cart" aria-label="Close"></button>
        </div>`
        
            cartCOntainer.appendChild(addProduct);
        
        // Add an event listener to the new child element
            //total--------
            
            totalPrice += parseFloat(price) ;
            showTotalPrice.textContent = totalPrice.toFixed(2);
          
        // show toast
        const newToast = document.createElement("div");
        newToast.classList.add("toast", "show");
        // Set the content of the toast
        newToast.innerHTML = `
        <div class="toast-body bg bg-success">
            your order added to cart.
        </div>
        `;
        // Append the new toast to the container
        toastContainer.appendChild(newToast);
        // Hide the toast after 2 seconds (2000 milliseconds)
        setTimeout(function () {
            newToast.classList.remove("show");
        }, 2000);
}})
// Function to remove a product from the cart
function removeFromCart(event) {
    const removeButton = event.target.closest(".remove-product-from-cart");
    if (removeButton) {
        const cartProduct = removeButton.closest(".cart-product");
        if (cartProduct) {
        cartProduct.remove();
        prdctcnr.innerHTML = parseInt(prdctcnr.innerHTML) - 1;
        
        // Show the toast notification for removal
        const newToast = document.createElement("div");
        newToast.classList.add("toast", "show");
        newToast.innerHTML = `
            <div class="toast-body bg-danger text-light">
            Item removed from cart.
            </div>
        `;
        toastContainer.appendChild(newToast);
        // Hide the toast after 2 seconds (2000 milliseconds)
        setTimeout(function () {
        newToast.classList.remove("show");
        }, 1200);
      }
    }
  }
  
  // Add event listener to the cart container for removing items
  cartCOntainer.addEventListener("click", function(){
    removeFromCart(event);
    
  });
 

const controlsContainer = document.getElementById("controls");
let numItem = 1; // Initialize the item number to 1

// ... Your existing code ...

// Function to update the quantity of items in the cart product
function updateQuantity(event) {
    const target = event.target;
    const quantitySpan = target.parentElement.querySelector("#item-num");
  
    if (target.id === "pluse-one") {
      numItem++;
      prdctcnr.innerHTML = parseInt(prdctcnr.innerHTML) + 1;
    } else if (target.id === "munise-one") {
      if (numItem > 1) {
        numItem--;
        prdctcnr.innerHTML = parseInt(prdctcnr.innerHTML) - 1;
      }
    }
  
    // Update the content of the "item-num" span with the new quantity
    if (quantitySpan) {
      quantitySpan.textContent = numItem;

    }
  }
  
  // Add event listener to the cart container for updating items' quantity
  cartCOntainer.addEventListener("click", function (event) {
    const target = event.target;
    if (target.id === "pluse-one" || target.id === "munise-one") {
      updateQuantity(event);
    }
  });
  


