import { cartObserver } from "./app/carts";
import { categoryListHandler, categoryRender } from "./app/categories";
import { productCardRender } from "./app/products";
import { products } from "./core/data";
import { delCartItemHandler, productListHandler, toggleCartBoxHandler } from "./core/handlers";
import { cardList,  cartBody,  cartOpenBtn, categoryList, closeBtn } from "./core/selectors";

class Shop {
    observer(){
        cartObserver()
    }
    initialRender(){
        categoryRender()
        productCardRender(products)
    }
    
    listener(){
        cardList.addEventListener("click",productListHandler)
        cartOpenBtn.addEventListener("click",toggleCartBoxHandler);
        closeBtn.addEventListener("click",toggleCartBoxHandler);
        cartBody.addEventListener("click",delCartItemHandler)
        categoryList.addEventListener("click",categoryListHandler)
    }
    init(){
        this.observer()
        this.initialRender()
        this.listener()
    }
}

export default Shop;