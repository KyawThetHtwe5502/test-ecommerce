import { categories, products } from "../core/data";
import { app, cardList, categoryBtn, categoryList } from "../core/selectors"
import { productCardRender } from "./products";

export const createCategory = (text) => {
    const clone = categoryBtn.content.cloneNode(true);
    const category = clone.querySelector(".category-btn");
    category.innerText  = text;
    return category;
}

export const categoryRender = () => {
    categories.forEach(el => categoryList.append(createCategory(el)))
}
export const categoryListHandler = (event) => {
    if(event.target.classList.contains("category-btn")){
        app.querySelector(".active").classList.remove("active")
        event.target.classList.add("active");
        cardList.innerHTML = "";
        const currentCategory = event.target.innerText;
       const  currentProduct = products.filter((el) => el.category === currentCategory || currentCategory === "All" );
        productCardRender(currentProduct);
    }
}

