import { cartObserver } from "./app/carts";
import { categoryListHandler, categoryRender } from "./app/categories";
import { productCardRender } from "./app/products";
import { products } from "./core/data";
import { delCartItemHandler, productListHandler, searchInputHandler, toggleCartBoxHandler } from "./core/handlers";
import { cardList,  cartBody,  cartOpenBtn, categoryList, closeBtn, searchInput } from "./core/selectors";

class Shop {
    observer(){
        cartObserver()
    }
    async initialRender(){
        const res = await fetch("http://localhost:3000/categories");
        const json = await res.json();
        categoryRender(json);
        const res2 = await fetch("http://localhost:3000/products");
        const json2 = await res2.json();
        productCardRender(json2);
    }
    
    listener(){
        cardList.addEventListener("click",productListHandler)
        cartOpenBtn.addEventListener("click",toggleCartBoxHandler);
        closeBtn.addEventListener("click",toggleCartBoxHandler);
        cartBody.addEventListener("click",delCartItemHandler)
        categoryList.addEventListener("click",categoryListHandler)
        searchInput.addEventListener("keyup",searchInputHandler)
    }
    init(){
        this.observer()
        this.initialRender()
        this.listener()
    }
}

export default Shop;