import { cartBody, cartBodyCount, cartCostTotal, cartCountBudget, cartItem } from "../core/selectors";

export const createCartItem = ({id,title,price,image}) => {
    const clone = cartItem.content.cloneNode(true);
    const cartItemUi = clone.querySelector(".cart-item");
    const cartTitle = cartItemUi.querySelector(".cart-title");
    const cartPrice = cartItemUi.querySelector(".cart-price");
    const cartItemCost = cartItemUi.querySelector(".cart-item-cost");
    const cartImg = cartItemUi.querySelector(".cart-img");
    cartItemUi.setAttribute("item-id",id)
    cartImg.src = image;
    cartTitle.innerText  = title;
    cartPrice.innerText = price; 
    cartItemCost.innerText = price;

    return cartItemUi;

}

export const incrementQuantity = (id) => {
    const  currentCartItem = cartBody.querySelector(`[item-id='${id}']`);
    const quantity = currentCartItem.querySelector(".cart-item-quantity");
    const cost = currentCartItem.querySelector(".cart-item-cost");
    const price= currentCartItem.querySelector(".cart-price")
    quantity.innerText = parseInt(quantity.innerText) + 1;

    cost.innerText = (quantity.innerText * price.innerText).toFixed(2);
}
export const decrementQuantity = (id) => {
    const  currentCartItem = cartBody.querySelector(`[item-id='${id}']`);
    const quantity = currentCartItem.querySelector(".cart-item-quantity");
    const cost = currentCartItem.querySelector(".cart-item-cost");
    const price= currentCartItem.querySelector(".cart-price")
    if(quantity.innerText > 1 ) {quantity.innerText = parseInt(quantity.innerText) - 1;}
    

    cost.innerText = (quantity.innerText * price.innerText).toFixed(2);
}

export const cartTotalCost = () => {
    return [...cartBody.querySelectorAll(".cart-item-cost")].reduce((pv,cv) => pv+ parseFloat(cv.innerText),0);
}

export const cartItemCount = () => {
    return cartBody.querySelectorAll(".cart-item").length;
}

export const cartObserver = () => {
    const process = () => {
        cartCostTotal.innerText = cartTotalCost().toFixed(2);
        cartBodyCount.innerText = cartItemCount();
        cartCountBudget.innerText = cartItemCount();
    }

    const options  = {
        childList: true,
        subtree: true,
    };

    const observer = new MutationObserver(process);

    observer.observe(cartBody, options);
}