import { products } from "../core/data";
import { cardList, cartBody, productCard } from "../core/selectors";


export const  star = (rate) => {
    let starUi = "";
    for(let i=1;i<=5;i++){
        starUi += `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 stroke-yellow-500 ${ i <= rate.toFixed(0) && 'fill-yellow-500'}">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>`;
    }
    return starUi;
}

export const createProduct = ({id,title,description,price,image,rating:{rate,count}}) => {
    const clone = productCard.content.cloneNode(true);
    const card = clone.querySelector(".product-card");
    const cardImg = card.querySelector(".card-img");
    const cardTitle = card.querySelector(".card-title");
    const cardDescription = card.querySelector(".card-description")
    const cardPrice = card.querySelector(".card-price");
    const cardRating = card.querySelector(".card-rating");
    const  cardStars = card.querySelector(".card-stars");
    const addToCartBtn = card.querySelector(".add-to-cart");
    card.setAttribute("product-id",id);
    cardImg.src = image;
    cardTitle.innerText = title;
    cardDescription.innerText = description;
    cardPrice.innerText = price;
    cardRating.innerText = `(${rate}/${count})`;
    cardStars.innerHTML = star(rate);

    const isExitProduct = cartBody.querySelector(`[item-id='${id}']`)
    if(isExitProduct){
        addToCartBtn.classList.add("bg-neutral-600","text-white");
        addToCartBtn.innerText = "Added"
        addToCartBtn.disabled = true;
    }
    return card;
    

};

export const productCardRender = (productArray) => {
    productArray.forEach((product) => {
        cardList.append(createProduct(product))
    })
}

