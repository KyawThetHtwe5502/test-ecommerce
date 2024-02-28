import { createCartItem, decrementQuantity, incrementQuantity } from "../app/carts";
import { products } from "./data";
import { app, cartBody, cartBox } from "./selectors";

export const productListHandler = (event) => {
    if(event.target.classList.contains("add-to-cart")){
        const currentProductCard = event.target.closest(".product-card");
        const currentProductId = currentProductCard.getAttribute("product-id");
        const currentProduct = products.find(el => el.id == currentProductId);
        const  currentAddToCartBtn = currentProductCard.querySelector(".add-to-cart");
        
        
        cartBody.append(createCartItem(currentProduct));
        currentAddToCartBtn.classList.add("bg-neutral-600","text-white");
        currentAddToCartBtn.innerText = "Added"
        currentAddToCartBtn.disabled = true;
        
        
    }
}

export const toggleCartBoxHandler = () => {
    cartBox.classList.toggle("translate-x-full");
    cartBox.classList.add("duration-200")
} 

export const delCartItemHandler = (event) => {
    if(event.target.classList.contains("del-cart-item")){
        const currentCartItem = event.target.closest(".cart-item");
        const currentProductId = currentCartItem.getAttribute("item-id");
        currentCartItem.remove();

        const currentProductCard = app.querySelector(`[product-id= '${currentProductId}']`)
        const  currentAddToCartBtn = currentProductCard.querySelector(".add-to-cart");

        
        currentAddToCartBtn.classList.remove("bg-neutral-600","text-white");
        currentAddToCartBtn.innerText = "Add to Cart"
        currentAddToCartBtn.disabled = false;
    }else if(event.target.classList.contains("cart-item-quantity-increment")){
        const currentCartItem = event.target.closest(".cart-item");
        const currentProductId = currentCartItem.getAttribute("item-id");
        incrementQuantity(currentProductId)
    }else if(event.target.classList.contains("cart-item-quantity-decrement")){
        const currentCartItem = event.target.closest(".cart-item");
        const currentProductId = currentCartItem.getAttribute("item-id");
        decrementQuantity(currentProductId)
    }
}