import { products } from "./data.js";
const productBox = document.querySelector(".products-box");
const cartBox = document.querySelector(".cart-box");
const total = document.querySelector(".total");

let cart = [];

const totalPrice = () => {
  total.innerHTML = cart.reduce((a, b) => a + b.userPrice, 0) + " $";
};

const renderProduct = (props) => {
  if (props == "product") {
    return (productBox.innerHTML = products
      .map(
        (item) => `
      <div class="card">
      <div>
        <img src="${item.img}" height="150" width="150" alt="" />
      </div>
      <div>
        <h2>${item.name}</h2>
        <h3>${item.price} $</h3>
        <button class="add_button" data-product="${item.id}">${(cartBox.count =
          0 ? "remove" : "add")}</button>
      </div>
      </div>
    `
      )
      .join(""));
  }
  cartBox.innerHTML = cart.map(
    (item) =>
      `  
    <div class="card">
        <div>
          <img src="${item.img}" height="150" width="150" alt="" />
        </div>
        <div>
          <h2>${item.name}</h2>
          <h3>${item.userPrice} $</h3>
          <button class="minus" data-remove="${item.id}">${
        item.count == 1 ? "X" : "-"
      }</button>
          <span>${item.count}</span>
          <button class="plyus" data-add="${item.id}">+</button>
        </div>
      </div>`
  );
  let myObj = JSON.stringify(products)

  localStorage.setItem("myObj", myObj)
  let myObj_serialized = JSON.parse(localStorage.getItem("myObj"));
  console.log(myObj_serialized);
};

renderProduct ("product");

productBox.addEventListener("click", (e) => {
  const { dataset } = e.target;
  const product = cart.find((p) => p.id == dataset.product);
  if (!product) {
    for (let i of products) {
      if (i.id == dataset.product) {
        cart.push({ ...i, count: 1, userPrice: i.price });
      }
    }
  }
  totalPrice();
  renderProduct("cart");
});

cartBox.addEventListener("click", (e) => {
  const { dataset } = e.target;
  if (dataset.add) {
    for (let i of cart) {
      if (i.id == dataset.add) {
        i.count += 1;
        i.userPrice = i.price * i.count;
      }
    }
  }
  if (dataset.remove) {
    for (let i of cart) {
      if (i.id == dataset.remove && i.count > 0) {
        i.count -= 1;
        i.userPrice = i.price * i.count;
      }

      if (i.count == 0) {
        cart = cart.filter((item) => item.id !== i.id);
      }
    }
  }
  totalPrice();
  renderProduct("cart");
});
