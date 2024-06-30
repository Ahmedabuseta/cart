let cartIcon = document.getElementById('cart-icon');
let cart     = document.getElementById('cart');
let closeCart= document.querySelector('.btn-close');
let prdctcnr = document.querySelector('#product-counter')
let products = document.querySelectorAll('.add');
let toastContainer = document.getElementById("toastContainer");
let cartCOntainer = document.getElementById('cart-added-products');
let removeProductFromCart = document.querySelector('.remove-product-from-cart')
let showTotalPrice  = document.getElementById('total');
let itemNum = document.getElementById('item-num')
const controlsContainer = document.getElementById("controls");
let totalPrice = 1.49 ;


// open close cart
cartIcon.addEventListener("click",function(){
  if(cart.style.display === 'none'){
      cart.style.setProperty("display", "flex", "important");}
      else{
        cart.style.setProperty("display", "none", "important")
      }
})
closeCart.onclick = function(){
    cart.style.setProperty("display", "none", "important");
}
// go to cart page
let cartPage = document.querySelector("#checkOut")
cartPage.addEventListener("click",function goTOCart(){
  location="cart.htm"
})

// productmarketdata
let productsData = [
  { name: "green onion | بصل",
    price: "9.99",
    id: "1",
    priceBefore:"14.99",
    img:"./img/top-view-cut-green-onion-cutting-board-with-other-onions-around-wooden-background.jpg" },
{ name: "broccli | بروكلي",
  price: "9.99",
  id: "2",
  priceBefore:"18.99",
  img:"./img/fresh-broccoli-cutting-board-table.jpg" },
{ name: " lettuce | خس",
  price: "5.99",
  id: "3",
  priceBefore:"8.99",
  img:"./img/close-up-photo-leaves-lettuce-grey-background.jpg" },
{ name: "cauliflower | كرنب", 
  price: "11.99",
  id: "4",
  priceBefore:"15.99" ,
  img:"./img/front-view-fresh-cauliflower-with-greens-grey-desk.jpg"},
{ name: "watercress | جرجير",
  price: "11.99",
  id: "5",
  priceBefore:"20.99",
  img: "./img/washed-spinach-leaves-bowl-wooden-table.jpg"},
{ name: "kozbra | كزبره", 
  price: "4.99",
  id: "6",
  priceBefore:"9.99",
  img:"./img/top-view-fresh-greens-white-background.jpg" },
{ name: "carrot | جزر",  
  price: "8.49",
  id: "7",
  priceBefore:"12.49",
  img:"./img/stack-carrots-bowl-marble.jpg"},
{ name: "green mint | نعناع اخضر",
price: "3.49",
id: "8",
priceBefore:"6.99"
,img:"./img/essential-oil-peppermint-bottle-with-fresh-green-peppermint.jpg"}
];
let allProductsContainer = document.querySelector("#products");

  // draw pageProduct
function drawData (arr){
  allProductsContainer.innerHTML =''
arr.map(function (ele){
  if(Math.floor(ele.priceBefore/ele.price) ===2){
    allProductsContainer.innerHTML +=`
          <div class=" bg-dark product border border-muted p-3 rounded  col-lg-3   col-m-6 col-xs-12" style="width:350px;" price=${ele.price} id=${ele.id}>
            <div  class="img-div rounded position-relative" >
              <div  class="position-absolute top-0 end-0 bg-danger p-2 rounded">
                <i class="fa fa-money-bill-1 "> </i>
                <span id="widge" class="ms-3 d-none " >50%OFF</span>
              </div>
              <img src=${ele.img}  style="width: 100%;" class="rounded" width="290"height='250' alt="product" class="product-img">
            </div><!-- /img-div -->
            <div class="product-info d-flex mt-3 ">
              <p class="p-3 border-end">
              <span class="text-decoration-line-through text-mute">${ele.priceBefore}</span>
              <span class="d-block text-danger price" price = ${ele.price}>${ele.price}</span> L.E</p>
              <p class="ms-3 ">
                <span class="fs-5 product-title">${ele.name}</span>
                <span class="text-success d-block ">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star-half-stroke"></i>
                </span>
              </p>
            </div><!-- /product-info -->
            <hr class="mt-1 ">
            <button  class="btn bg-success m-auto d-block w-50 add"onClick="checkExist(${ele.id})">add to cart</button>
          </div><!-- /broduct -->`
  }else{
    allProductsContainer.innerHTML +=`
          <div class=" bg-dark product border border-muted p-3 rounded  col-lg-3   col-m-6 col-xs-12" style="width:350px;" price=${ele.price} id=${ele.id}>
            <div  class="img-div rounded position-relative" >
              <div  class="position-absolute top-0 end-0 bg-danger p-2 rounded">
              <i class="fa fa-bomb "> </i>
              <span id="widge" class="ms-3 d-none " >SALE</span></div>
              <img src=${ele.img}  style="width: 100%;" class="rounded" width="290"height='250' alt="product" class="product-img">
            </div><!-- /img-div -->
            <div class="product-info d-flex mt-3 ">
              <p class="p-3 border-end">
              <span class="text-decoration-line-through text-mute">${ele.priceBefore}</span>
              <span class="d-block text-danger price" price = ${ele.price}>${ele.price}</span> L.E</p>
              <p class="ms-3 ">
                <span class="fs-5 product-title">${ele.name}</span>
                <span class="text-success d-block ">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star-half-stroke"></i>
                </span>
              </p>
            </div><!-- /product-info -->
            <hr class="mt-1 ">
            <button class="btn bg-success m-auto d-block w-50 add" onClick="checkExist(${ele.id})"   >add to cart</button>
          </div><!-- /broduct -->`
  }
})
// Enable or disable prev and next buttons
// if( currentPage == 1){
//   prevButton.disabled =true;
// }
// else{
//   prevButton.classList.add("disabled")

// }
}
// drawData();

// prevButton.disabled =true;




// cartData

// show toast
function showToast(){
  const newToast = document.createElement("div");
  newToast.classList.add("toast", "show");
  newToast.innerHTML = `<div class="toast-body bg bg-success">your order added to cart.</div>`;
  toastContainer.appendChild(newToast);
  setTimeout(function () {
      newToast.classList.remove("show");
  }, 2000);
}
let productsCartData =[];
let existIds = [];
let localStorageData = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
window.addEventListener("load",()=>{
    localStorageData.forEach((obj)=>{
    productsCartData.push({name:obj.name,id:obj.id,price:obj.price,photo:obj.photo,quantity:obj.quantity})
    existIds.push(obj.id);
  });
  addToCart();
  getallQuantity()
  console.log(productsCartData,existIds)
})

function handleStorageChange(event) {
  if (event.key === 'products') {
    location.reload();
  }
}
window.addEventListener('storage', handleStorageChange)

// function add to cart
function addToCart(){
  cartCOntainer.innerHTML= ""
  let newProductsCartData = [];
  productsCartData.forEach(function(itm){
    newProductsCartData.push(itm);
  })
  // console.log(newProductsCartData)
  for(let i=0 ; i<newProductsCartData.length ; i++){
  const addProduct = document.createElement('div');
  addProduct.innerHTML = `
  <div class="cart-product p-1 d-flex justify-content-between position-relative flex-row border-bottom mb-3 align-items-center " id=${newProductsCartData[i].id}>
      <div id="product-cart-info" class="d-flex gap-2 align-items-center justify-content-between flex-row w-75 h-50">
          <div class=" border-end pe-2 " style="width: 161px; height: 108px;">
              <img id="cart-img" src=${newProductsCartData[i].photo} alt="product" class="  rounded  w-100 h-100">
          </div>
          <div  class="d-flex flex-column  flex-grow-1 gap-2"> 
              <p id="product-cart-name">${newProductsCartData[i].name}</p>
              <div id="controls" idC=${newProductsCartData[i].id}>
                  <span id="munise-one" class=" text-success " style="cursor: pointer;">-</span>
                  <span id="item-num" class="p-2">${productsCartData[i].quantity}</span>
                  <span id="pluse-one" class=" text-success" style="cursor: pointer;">+</span>
              </div>
          </div>
      </div>
      <p > <span id="price" class="one-product-price" price = "${newProductsCartData[i].price}">${newProductsCartData[i].price}</span> L.E</p>
      <button type="button" class="btn-close position-absolute top-0 end-0 btn bg-danger rounded-circle remove-product-from-cart" aria-label="Close"></button>
  </div>`
  cartCOntainer.appendChild(addProduct);
  pricequantties(i)
}

getTotalPrice();
}
// function check product in the cart or not 
function checkExist(id){
    let choosenItm =productsData.find((item)=> item.id === `${id}`);
    if(existIds.includes(`${id}`)){
      let index = productsCartData.findIndex((object)=> object.id === `${id}` );
      let quantitySpan =document.querySelectorAll("#controls")[index].querySelector("#item-num")
      console.log(index)
      productsCartData[index].quantity +=1;
      quantitySpan.textContent = productsCartData[index].quantity;
      pricequantties(index);
      getTotalPrice();
      showToast()
      getallQuantity()
      localStorage.setItem("products",JSON.stringify(productsCartData))
    }else{
      productsCartData.push({name:choosenItm.name,id:choosenItm.id,price:choosenItm.price,photo:choosenItm.img,quantity:1})
      existIds.push(`${id}`);
      localStorage.setItem("products",JSON.stringify(productsCartData))
      addToCart();
      showToast()
      // getTotalPrice()
      getallQuantity()
    }
  // quantitySpan.textContent = productsCartData[index].quantity;
}
// pricequantties
function pricequantties(index){
  let oneprice =parseFloat(document.querySelectorAll("#price")[index].getAttribute("price"));
  let quantityPrice = productsCartData[index].quantity*oneprice
  document.querySelectorAll("#price")[index].textContent = quantityPrice;
}
  // function getTotalPrice
  function getTotalPrice(){
    totalPrice=1.49;
    for(let j=0 ; j<productsCartData.length ; j++){
      totalPrice += parseFloat(productsCartData[j].price)*(productsCartData[j].quantity);
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
        let index = productsCartData.map((obj)=> obj.id).indexOf(idOfRemovedProduct);
        if(index!==-1){
          productsCartData.splice(index,1);
          existIds.splice(index,1);
          addToCart()
          localStorage.setItem("products",JSON.stringify(productsCartData))
          getallQuantity()
        }
        }
        removalToast()
      }
    }

    // get allQuantity
    function getallQuantity(){
      let allQuantityArr= productsCartData.map((obj)=> obj.quantity)
      let allQuantity   = allQuantityArr.reduce((acc,current)=> acc + current,0)
      console.log(allQuantity);
      prdctcnr.innerHTML =allQuantity;
    }

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
});
// Function to update the quantity of items in the cart product
function updateQuantity(event) {
    const target = event.target;
    const quantitySpan = target.parentElement.querySelector("#item-num");
    let index = productsCartData.map((obj)=> obj.id).indexOf(target.parentElement.getAttribute("idC"));
    // pluse
    if (target.id === "pluse-one") {
      productsCartData[index].quantity +=1;
      getallQuantity()
      localStorage.setItem("products",JSON.stringify(productsCartData))
      // minuse
    } else if (target.id === "munise-one") {
      if (productsCartData[index].quantity > 0) {
        productsCartData[index].quantity -=1;
        getallQuantity()
        localStorage.setItem("products",JSON.stringify(productsCartData))
        // if quantity =0 remove
      if (productsCartData[index].quantity === 0){
        console.log(productsCartData)
        if(index!==-1){
          productsCartData.splice(index,1);
          existIds.splice(index,1);
          addToCart()
          getallQuantity()
          localStorage.setItem("products",JSON.stringify(productsCartData))
        }
        removalToast()
      }}
    }
    // Update the content of the "item-num" span with the new quantity
    if (quantitySpan) {
      quantitySpan.textContent = productsCartData[index].quantity;
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
// show numper of product in the page
let allProducts = document.querySelectorAll(".product"); 
// Function to update pagination buttons
let currentPage = 1;
let itemsPerPage = 4;
let totalPages = Math.ceil(productsData.length / itemsPerPage);
let paginationContainer = document.querySelector(".pagination");
// Function to update pagination buttons
function updatePaginationButtons() {
  paginationContainer.innerHTML = `
      <button class="pagination-btn prev-btn" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
      ${Array.from({length: totalPages}, (_, i) => 
          `<button class="pagination-btn page-btn ${currentPage === i + 1 ? 'active' : ''}">${i + 1}</button>`
      ).join('')}
      <button class="pagination-btn next-btn" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
  `;
}
// Function to update displayed products
function updateDisplayedProducts() {
  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  let displayedProducts = productsData.slice(start, end);
  console.log(displaedProdecuts,productsData);
  drawData(displayedProducts);
}

// Function to handle pagination
function handlePagination(e) {
  const target = e.target;
  
  if (target.classList.contains('page-btn')) {
      currentPage = parseInt(target.textContent);
  } else if (target.classList.contains('prev-btn') && currentPage > 1) {
      currentPage--;
  } else if (target.classList.contains('next-btn') && currentPage < totalPages) {
      currentPage++;
  }

  updateDisplayedProducts();
  updatePaginationButtons();
}

// Initial setup
updateDisplayedProducts();
updatePaginationButtons();

// Event listener for pagination
paginationContainer.addEventListener("click", handlePagination);
