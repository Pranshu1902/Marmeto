const fetchData = async () => {
  const res = await fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  );
  const data = res.json();
  return data;
};

const truncateString = (string = "", maxLength = 50) =>
  string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

const displayProducts = (products) => {
  var productHTML = "";
  products.forEach((element) => {
    productHTML += `
    <div class="product">
      <img src=${element.image} alt="img" class="product-image" />
      <div class="line">
        <h3>${truncateString(element.title, 10)}</h3>
        <p>&#x2022;</p>
        <p>${element.vendor}</p>
      </div>
      <div class="line">
        <p class="price">Rs ${element.price}</p>
        <p class="old-price">${element.compare_at_price}</p>
        <p class="discount">50% Off</p>
      </div>
      <button class="cart-button">Add to Cart</button>
    </div>
  `;
  });
  document.getElementById("products").innerHTML = productHTML;
};

const updateCategoryTab = (category) => {
  var men = document.getElementById("men");
  var women = document.getElementById("women");
  var kids = document.getElementById("kids");

  men.className = "";
  women.className = "";
  kids.className = "";

  var currentCategory = document.getElementById(category);
  currentCategory.classList.add("active-category");
};

document.getElementById("men").addEventListener("click", async () => {
  const data = await fetchData();
  const products = data.categories.filter(
    (item) => item.category_name == "Men"
  )[0].category_products;

  displayProducts(products);
  updateCategoryTab("men");
});

document.getElementById("women").addEventListener("click", async () => {
  const data = await fetchData();
  const products = data.categories.filter(
    (item) => item.category_name == "Women"
  )[0].category_products;

  displayProducts(products);
  updateCategoryTab("women");
});

document.getElementById("kids").addEventListener("click", async () => {
  const data = await fetchData();
  const products = data.categories.filter(
    (item) => item.category_name == "Kids"
  )[0].category_products;

  displayProducts(products);
  updateCategoryTab("kids");
});
