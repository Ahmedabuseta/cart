let cart     = document.getElementById('cart');
let toastContainer = document.getElementById("toastContainer");
let removeProductFromCart = document.querySelector('.remove-product-from-cart')
let showTotalPrice  = document.getElementById('total');
let itemNum = document.getElementById('item-num')
const controlsContainer = document.getElementById("controls");
let totalPrice = 1.49 ;

// logout
let logoutBtn = document.querySelector('#logout-link');
logoutBtn.addEventListener("click",function(){
  localStorage.clear();
  location="loginRIgesiter.htm";

  // logoutBtn.remove();
})
// whenlogin
let loginBtn = document.querySelector('#login-register-link');
let userInfo = document.querySelector('.userInfo');
let userData =document.querySelector('#userData');
// if(localStorage.getItem('userName')){
//   loginBtn.remove();
//   userInfo.style.setProperty("display", "block", 'important');
//   userData.innerHTML = localStorage.getItem("userName")
//   logoutBtn.parentElement.style.setProperty("display", "block", 'important');
// }

let cartCOntainer = document.getElementById('cart-added-products');
let productsLocalStorage =JSON.parse(localStorage.getItem("products") ) ;
function drawData(){
  let i=0;
  cartCOntainer.innerHTML ="";
productsLocalStorage.map(function (ele){
  cartCOntainer.innerHTML +=`
  <div class="cart-product p-3 d-flex justify-content-between position-relative flex-row border-bottom mb- align-items-center " id=${ele.id}>
      <div id="product-cart-info" class="d-flex gap-2 align-items-center justify-content-between flex-row w-75 h-50">
          <div class=" border-end pe-2 me-4 " style="width: 161px; height: 108px;">
              <img id="cart-img" src=${ele.photo} alt="product" class="  rounded  w-100 h-100">
          </div>
          <div  class="d-flex flex-column  flex-grow-1 gap-2"> 
              <p id="product-cart-name">${ele.name}</p>
              <div id="controls" idC=${ele.id}>
                  <span id="munise-one" class=" text-success " style="cursor: pointer;">-</span>
                  <span id="item-num" class="p-2">${ele.quantity}</span>
                  <span id="pluse-one" class=" text-success" style="cursor: pointer;">+</span>
              </div>
          </div>
      </div>
      <p > <span id="price" class="one-product-price" price = "${ele.price}">${ele.price}</span> L.E</p>
      <button type="button" class="btn-close position-absolute top-0 end-0 btn bg-danger rounded-circle remove-product-from-cart" aria-label="Close" style="transform:translateY(50%)"></button>
  </div>`;
  pricequantties(i)
  i++;
})}

function pricequantties(index){
  let oneprice =parseFloat(document.querySelectorAll("#price")[index].getAttribute("price"));
  let quantityPrice = productsLocalStorage[index].quantity*oneprice
  document.querySelectorAll("#price")[index].textContent = quantityPrice;
}
drawData();
getTotalPrice()
  // function getTotalPrice
  function getTotalPrice(){
    totalPrice=1.49;
    for(let j=0 ; j<productsLocalStorage.length ; j++){
      totalPrice += parseFloat(productsLocalStorage[j].price)*(productsLocalStorage[j].quantity);
    }
    console.log(totalPrice.toFixed(2))
    showTotalPrice.textContent = totalPrice.toFixed(2);
  }
// Function to remove a product from the cart
function removeFromCart(event) {
    const removeButton = event.target.closest(".remove-product-from-cart");
    if (removeButton) {
        const cartProduct = removeButton.closest(".cart-product");
        if (cartProduct) {
        let idOfRemovedProduct = cartProduct.getAttribute("id")
        let index = productsLocalStorage.map((obj)=> obj.id).indexOf(idOfRemovedProduct);
        if(index!==-1){
          productsLocalStorage.splice(index,1);
          localStorage.setItem("products",JSON.stringify(productsLocalStorage))
          drawData()
        }
        // console.log(productsCartData.map((obj)=> obj.id))
        // console.log(index)
        }
        removalToast()

      }
    }
    function handleStorageChange(event) {
      if (event.key === 'products') {
        location.reload();
      }
    }
    window.addEventListener('storage', handleStorageChange)
// Show the toast notification for removal
function removalToast(){
  const newToast = document.createElement("div");
  newToast.classList.add("toast", "show");
  newToast.innerHTML = `<div class="toast-body bg-danger text-light">Item removed from cart.</div>`;
  toastContainer.appendChild(newToast);
  setTimeout(function () {
  newToast.classList.remove("show");
  }, 1200);
}
// Add event listener to the cart container for removing items
cartCOntainer.addEventListener("click", function(){
  removeFromCart(event);
  getTotalPrice();
});
// Function to update the quantity of items in the cart product
function updateQuantity(event) {
    const target = event.target;
    const quantitySpan = target.parentElement.querySelector("#item-num");
    let index = productsLocalStorage.map((obj)=> obj.id).indexOf(target.parentElement.getAttribute("idC"));
    // pluse
    if (target.id === "pluse-one") {
      productsLocalStorage[index].quantity +=1;
      localStorage.setItem("products",JSON.stringify(productsLocalStorage))
      // minuse
    } else if (target.id === "munise-one") {
      if (productsLocalStorage[index].quantity > 0) {
        productsLocalStorage[index].quantity -=1;
        localStorage.setItem("products",JSON.stringify(productsLocalStorage))
        // if quantity =0 remove
      if (productsLocalStorage[index].quantity === 0){
        console.log(productsLocalStorage)
        if(index!==-1){
          productsLocalStorage.splice(index,1);
          localStorage.setItem("products",JSON.stringify(productsLocalStorage))
          //.splice(index,1);
          drawData()
        }
        removalToast()
      }}

    }
    // Update the content of the "item-num" span with the new quantity
    if (quantitySpan) {
      quantitySpan.textContent = productsLocalStorage[index].quantity;
      pricequantties(index);
    }
  }
  // Add event listener to the cart container for updating items' quantity
  cartCOntainer.addEventListener("click", function (event) {
    const target = event.target;
    if (target.id === "pluse-one" || target.id === "munise-one") {
      updateQuantity(event);
      getTotalPrice();
    }
  });
  
