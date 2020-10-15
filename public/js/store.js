// Checking if the page is done loading //

if(document.readyState == 'loading') {
    document.addEventListener('DOMContent', doneLoading);
} else {
    doneLoading();
}

// Even when the page isn't done loading the remove buttons will still work //

function doneLoading() {
    var removeBasketItemButton = document.querySelectorAll('.remove-btn');

for (let i = 0; i < removeBasketItemButton.length; i++) {
    var button = removeBasketItemButton[i];

    button.addEventListener('click', removeBasketItem);
}

var quantityValue = document.querySelectorAll('.item-quantity');

for (let i = 0; i < quantityValue.length; i++) {
    var quantityInput = quantityValue[i];

    quantityInput.addEventListener('change', quantityChanged);
    
}

var addToBasket = document.querySelectorAll('.add-btn');

for (let i = 0; i < addToBasket.length; i++) {
    var addButton = addToBasket[i];
   addButton.addEventListener('click', addToBasketItem);
}

document.querySelectorAll('.btn-checkout')[0].addEventListener('click', checkout);

}
 // Get the modal

 function checkoutModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
   // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
 }
}

// This function displays when a product is already added to the basket 
function productModal() {
    var modal = document.getElementById("productModal");
    modal.style.display = "block";
   // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[1];

    // When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
 }
}

function checkout() {

    checkoutModal();
    // alert('Thank for shopping with us');
    
    var basketContent = document.querySelectorAll('.basket-content')[0]

    while(basketContent.hasChildNodes()) {
        basketContent.removeChild(basketContent.firstChild);

    }
    
    updateBasketTotal();
}

// Add To Basket Button //
function addToBasketItem(event) {

    var addBtn = event.target;

    var basketItem = addBtn.parentElement.parentElement;

    var title = basketItem.querySelectorAll('.item-name')[0].innerText;

    var price = basketItem.querySelectorAll('.item-cost')[0].innerText;

    var imageSrc = basketItem.querySelectorAll('.item-image')[0].src;

    console.log(price, title, imageSrc);

    addProductToBasket(title, price, imageSrc);

    updateBasketTotal();

}

function addProductToBasket(title, price, imageSrc) {

    var itemInBasket = document.createElement('div');

    itemInBasket.classList.add('basket-items');

    var basketContent = document.querySelectorAll('.basket-content')[0]

    var  cardItemNames = basketContent.querySelectorAll('.item-name');

    for (let i = 0; i < cardItemNames.length; i++) {

        if(cardItemNames[i].innerText == title) {
            // alert('Product already added to the basket');
            productModal();
            return
        }
        
    }

    var itemsContent = `<div class="item-info">
          <img src="${imageSrc}" alt="nike">
          <h2 class="item-name">${title}</h2>
      </div>
    <div>
          <h3 class="item-price">${price}</h3>
       </div>
      <div>
          <input class="item-quantity" type="number" value="1" >
          
      </div>
      
      <a class="remove-btn" type="button">Remove</a>`

      itemInBasket.innerHTML = itemsContent;

    basketContent.append(itemInBasket);

    itemInBasket.querySelectorAll('.remove-btn')[0].addEventListener('click', removeBasketItem);

    itemInBasket.querySelectorAll('.item-quantity')[0].addEventListener('change', quantityChanged);
}

// Remove Item in the Basket //

function removeBasketItem(event) {
    var buttonPressed = event.target;

        buttonPressed.parentElement.remove();

        updateBasketTotal();
}

// Update the quantity once the input value is changed //

function quantityChanged(event) {
    var input = event.target;

    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updateBasketTotal();
}






// Updating the Total Amount in the basket once an item is removed //

function updateBasketTotal() {
    var basketContent = document.querySelectorAll('.basket-content')[0];

    var basketItems = basketContent.querySelectorAll('.basket-items');

    var total = 0

    for (var i = 0; i < basketItems.length; i++) {
        var basketItem = basketItems[i];

        var itemPrice = basketItem.querySelectorAll('.item-price')[0];
        var itemQuantity = basketItem.querySelectorAll('.item-quantity')[0];

        var price = itemPrice.innerText.replace('zk', '');
        var quantity = itemQuantity.value;

        total = total + (price * quantity)
        
    }

    total = Math.round(total * 100) / 100;

    document.querySelectorAll('.basket-total-price')[0].innerText = 'zk' + ' ' + total;

}

