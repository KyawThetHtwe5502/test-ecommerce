import {
  createCartItem,
  decrementQuantity,
  incrementQuantity,
} from "../app/carts";
import { productCardRender } from "../app/products";
import { products } from "./data";
import { app, cartBody, cartBox, cartOpenBtn, searchInput } from "./selectors";

export const productListHandler = (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const currentProductCard = event.target.closest(".product-card");
    const currentProductId = currentProductCard.getAttribute("product-id");
    const currentImage = currentProductCard.querySelector(".card-img");
    const currentProduct = products.find((el) => el.id == currentProductId);
    const currentAddToCartBtn =
      currentProductCard.querySelector(".add-to-cart");
    const imagePosition = currentImage.getBoundingClientRect();
    const cartBtnPosition = cartOpenBtn.getBoundingClientRect();
    const cartItemPosition = document
      .querySelector(".cart-item:last-child")
      ?.getBoundingClientRect();
    const aniLeft = cartItemPosition
      ? cartItemPosition.left + 10
      : cartBody.getBoundingClientRect().left;
    const aniTop = cartItemPosition
      ? cartItemPosition.top + 10
      : cartBody.getBoundingClientRect().top;
    const img = new Image();
    img.classList.add("fixed", "h-28", "z-50");
    img.style.top = imagePosition.top + "px";
    img.style.left = imagePosition.left + "px";
    img.src = currentImage.src;
    app.append(img);

    let keyframe;
    if (cartBox.classList.contains("translate-x-full")) {
      keyframe = [
        {
          top: `${imagePosition.top + "px"}`,
          left: `${imagePosition.left + "px"}`,
        },
        {
          top: `${cartBtnPosition.top + 10 + "px"}`,
          left: `${cartBtnPosition.left + 10 + "px"}`,
          height: 10 + "px",
          rotate: "2turn",
        },
      ];
    } else {
      keyframe = [
        {
          top: `${imagePosition.top + "px"}`,
          left: `${imagePosition.left + "px"}`,
        },
        {
          top: `${aniTop + "px"}`,
          left: `${aniLeft + "px"}`,
          height: 10 + "px",
          rotate: "2turn",
        },
      ];
    }

    const options = {
      duration: 500,
      iterations: 1,
      fill: "both",
    };

    const imgAnimation = img.animate(keyframe, options);
    imgAnimation.addEventListener("finish", () => {
      cartOpenBtn.classList.add("animate__tada");
      cartOpenBtn.addEventListener("animationend", () => {
        cartOpenBtn.classList.remove("animate__tada");
      });
      img.remove();
      cartBody.append(createCartItem(currentProduct));
    });
    currentAddToCartBtn.classList.add("bg-neutral-600", "text-white");
    currentAddToCartBtn.innerText = "Added";
    currentAddToCartBtn.disabled = true;
  }
};

export const toggleCartBoxHandler = () => {
  cartBox.classList.toggle("translate-x-full");
  cartBox.classList.add("duration-200");
};

export const delCartItemHandler = (event) => {
  if (event.target.classList.contains("del-cart-item")) {
    const currentCartItem = event.target.closest(".cart-item");
    const currentProductId = currentCartItem.getAttribute("item-id");
    currentCartItem.classList.add("animate__animated", "animate__hinge");
    currentCartItem.addEventListener("animationend", () => {
      currentCartItem.remove();

      const currentProductCard = app.querySelector(
        `[product-id= '${currentProductId}']`
      );
      const currentAddToCartBtn =
        currentProductCard.querySelector(".add-to-cart");

      currentAddToCartBtn.classList.remove("bg-neutral-600", "text-white");
      currentAddToCartBtn.innerText = "Add to Cart";
      currentAddToCartBtn.disabled = false;
    });
  } else if (event.target.classList.contains("cart-item-quantity-increment")) {
    const currentCartItem = event.target.closest(".cart-item");
    const currentProductId = currentCartItem.getAttribute("item-id");
    incrementQuantity(currentProductId);
  } else if (event.target.classList.contains("cart-item-quantity-decrement")) {
    const currentCartItem = event.target.closest(".cart-item");
    const currentProductId = currentCartItem.getAttribute("item-id");
    decrementQuantity(currentProductId);
  }
};

export const searchInputHandler = (event) => {
  const keyword = searchInput.value;
  
   const currentProduct =  products.filter(
      (el) =>
        el.title.search(keyword) != -1
    )
  productCardRender(currentProduct);
};
