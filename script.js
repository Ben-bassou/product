/* =========================================================
   MOROCCO HERITAGE
   PROFESSIONAL E-COMMERCE SCRIPT
========================================================= */


/* =========================================================
   PRODUITS
========================================================= */

const products = [

  {
    id: 1,
    name: "Huile d'Argan Premium",
    category: "Terroir",
    price: 180,
    badge: "BEST SELLER",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=85",
    description:
      "Huile d'argan marocaine sélectionnée avec soin, inspirée du savoir-faire traditionnel."
  },

  {
    id: 2,
    name: "Amlou Traditionnel",
    category: "Terroir",
    price: 95,
    badge: "POPULAIRE",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=85",
    description:
      "Délicieuse préparation traditionnelle aux amandes et à l'huile d'argan."
  },

  {
    id: 3,
    name: "Miel Marocain",
    category: "Terroir",
    price: 110,
    badge: "NOUVEAU",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=85",
    description:
      "Miel marocain sélectionné pour sa qualité et ses saveurs naturelles."
  },

  {
    id: 4,
    name: "Savon Noir Marocain",
    category: "Beauté",
    price: 45,
    badge: "NATUREL",
    image:
      "https://images.unsplash.com/photo-1607006344380-b6775a0824e7?w=800&q=85",
    description:
      "Savon noir traditionnel à base d'huile d'olive, inspiré des rituels du hammam."
  },

  {
    id: 5,
    name: "Ghassoul Naturel",
    category: "Beauté",
    price: 55,
    badge: "NATUREL",
    image:
      "https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=800&q=85",
    description:
      "Argile naturelle traditionnellement utilisée dans les soins marocains."
  },

  {
    id: 6,
    name: "Eau de Rose",
    category: "Beauté",
    price: 65,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=85",
    description:
      "Eau florale délicate inspirée des traditions de la vallée des roses."
  },

  {
    id: 7,
    name: "Panier Artisanal",
    category: "Artisanat",
    price: 120,
    badge: "ARTISANAL",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0c2f0f1b5d7?w=800&q=85",
    description:
      "Panier tressé à la main, inspiré du savoir-faire des artisans marocains."
  },

  {
    id: 8,
    name: "Tapis Marocain",
    category: "Maison",
    price: 850,
    badge: "PREMIUM",
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=85",
    description:
      "Tapis inspiré des motifs traditionnels berbères et de l'artisanat marocain."
  },

  {
    id: 9,
    name: "Babouche Marocaine",
    category: "Mode",
    price: 220,
    badge: "ARTISANAL",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=85",
    description:
      "Babouche traditionnelle avec finition inspirée du travail artisanal marocain."
  },

  {
    id: 10,
    name: "Coussin Berbère",
    category: "Maison",
    price: 190,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=85",
    description:
      "Coussin décoratif inspiré des motifs et couleurs de l'art berbère."
  },

  {
    id: 11,
    name: "Plateau Marocain",
    category: "Maison",
    price: 160,
    badge: "NOUVEAU",
    image:
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=800&q=85",
    description:
      "Plateau décoratif inspiré du travail traditionnel des artisans marocains."
  },

  {
    id: 12,
    name: "Sac Artisanal",
    category: "Mode",
    price: 280,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85",
    description:
      "Sac élégant inspiré des matières et du savoir-faire artisanal marocain."
  }

];


/* =========================================================
   VARIABLES
========================================================= */

let cart = [];

let currentFilter = "Tous";

let currentModalProduct = null;

let modalQuantity = 1;


/* =========================================================
   ELEMENTS
========================================================= */

const productsGrid =
  document.getElementById("products-grid");

const searchInput =
  document.getElementById("product-search");

const sortSelect =
  document.getElementById("sort-products");

const noProducts =
  document.getElementById("no-products");

const cartCount =
  document.getElementById("cart-count");

const cartModal =
  document.getElementById("cart-modal");

const productModal =
  document.getElementById("product-modal");


/* =========================================================
   FORMAT PRIX
========================================================= */

function formatPrice(price) {

  return new Intl.NumberFormat(
    "fr-MA"
  ).format(price) + " DH";

}


/* =========================================================
   AFFICHER LES PRODUITS
========================================================= */

function renderProducts() {

  let list = [...products];


  /* FILTRE */

  if (currentFilter !== "Tous") {

    list = list.filter(
      product =>
        product.category === currentFilter
    );

  }


  /* RECHERCHE */

  const search =
    searchInput.value
      .toLowerCase()
      .trim();


  if (search !== "") {

    list = list.filter(product =>

      product.name
        .toLowerCase()
        .includes(search)

      ||

      product.category
        .toLowerCase()
        .includes(search)

      ||

      product.description
        .toLowerCase()
        .includes(search)

    );

  }


  /* TRI */

  switch (sortSelect.value) {

    case "price-low":

      list.sort(
        (a, b) =>
          a.price - b.price
      );

      break;


    case "price-high":

      list.sort(
        (a, b) =>
          b.price - a.price
      );

      break;


    case "name":

      list.sort(
        (a, b) =>
          a.name.localeCompare(
            b.name,
            "fr"
          )
      );

      break;

  }


  /* AUCUN RESULTAT */

  if (list.length === 0) {

    productsGrid.innerHTML = "";

    noProducts.style.display =
      "block";

    return;

  }


  noProducts.style.display =
    "none";


  /* CREATION HTML */

  productsGrid.innerHTML =
    list.map(product => `

      <article
        class="product-card"
      >

        <div
          class="product-image"
        >

          ${
            product.badge
              ? `
                <span
                  class="product-badge"
                >
                  ${product.badge}
                </span>
              `
              : ""
          }

          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
          >

        </div>


        <div
          class="product-info"
        >

          <span
            class="product-category"
          >
            ${product.category}
          </span>


          <h3>
            ${product.name}
          </h3>


          <p
            class="product-description"
          >
            ${product.description}
          </p>


          <div
            class="product-bottom"
          >

            <strong
              class="product-price"
            >
              ${formatPrice(product.price)}
            </strong>


            <div
              class="product-actions"
            >

              <button
                class="product-view"
                onclick="openProductModal(${product.id})"
                title="Voir le produit"
              >
                👁
              </button>


              <button
                class="product-add"
                onclick="addToCart(${product.id})"
              >
                Ajouter
              </button>

            </div>

          </div>

        </div>

      </article>

    `).join("");

}


/* =========================================================
   FILTRE CATEGORIE
========================================================= */

function setFilter(category) {

  currentFilter = category;


  document
    .querySelectorAll(".filter-button")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.filter === category
      );

    });


  renderProducts();


  document
    .getElementById("products")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =========================================================
   CATEGORIE DEPUIS LA SECTION CATEGORIES
========================================================= */

function selectCategory(category) {

  setFilter(category);

}


/* =========================================================
   RECHERCHE
========================================================= */

searchInput.addEventListener(
  "input",
  renderProducts
);


/* =========================================================
   TRI
========================================================= */

sortSelect.addEventListener(
  "change",
  renderProducts
);


/* =========================================================
   FILTRES
========================================================= */

document
  .querySelectorAll(".filter-button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        setFilter(
          button.dataset.filter
        );

      }
    );

  });


/* =========================================================
   AJOUT AU PANIER
========================================================= */

function addToCart(productId, quantity = 1) {

  const product =
    products.find(
      p => p.id === productId
    );


  if (!product) return;


  const existing =
    cart.find(
      item =>
        item.id === productId
    );


  if (existing) {

    existing.quantity += quantity;

  } else {

    cart.push({

      ...product,

      quantity: quantity

    });

  }


  updateCart();

  showToast(
    `${product.name} ajouté au panier`
  );

}


/* =========================================================
   UPDATE PANIER
========================================================= */

function updateCart() {

  const totalItems =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );


  cartCount.textContent =
    totalItems;


  renderCart();

}


/* =========================================================
   RENDRE PANIER
========================================================= */

function renderCart() {

  const cartItems =
    document.getElementById(
      "cart-items"
    );

  const cartEmpty =
    document.getElementById(
      "cart-empty"
    );

  const cartSummary =
    document.getElementById(
      "cart-summary"
    );


  if (cart.length === 0) {

    cartItems.innerHTML = "";

    cartEmpty.style.display =
      "block";

    cartSummary.style.display =
      "none";

    return;

  }


  cartEmpty.style.display =
    "none";

  cartSummary.style.display =
    "block";


  cartItems.innerHTML =
    cart.map(item => `

      <div class="cart-item">

        <div
          class="cart-item-image"
        >

          <img
            src="${item.image}"
            alt="${item.name}"
          >

        </div>


        <div
          class="cart-item-info"
        >

          <h4>
            ${item.name}
          </h4>

          <p>
            ${formatPrice(item.price)}
          </p>


          <div
            class="cart-quantity"
          >

            <button
              onclick="changeCartQuantity(${item.id}, -1)"
            >
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              onclick="changeCartQuantity(${item.id}, 1)"
            >
              +
            </button>

          </div>

        </div>


        <button
          class="remove-cart"
          onclick="removeFromCart(${item.id})"
          title="Supprimer"
        >
          ×
        </button>

      </div>

    `).join("");


  const subtotal =
    getSubtotal();


  const shipping =
    subtotal === 0
      ? 0
      : 30;


  const total =
    subtotal + shipping;


  document.getElementById(
    "cart-subtotal"
  ).textContent =
    formatPrice(subtotal);


  document.getElementById(
    "cart-shipping"
  ).textContent =
    formatPrice(shipping);


  document.getElementById(
    "cart-total"
  ).textContent =
    formatPrice(total);

}


/* =========================================================
   TOTAL
========================================================= */

function getSubtotal() {

  return cart.reduce(

    (total, item) =>

      total +
      item.price *
      item.quantity,

    0

  );

}


/* =========================================================
   CHANGER QUANTITE
========================================================= */

function changeCartQuantity(
  productId,
  change
) {

  const item =
    cart.find(
      product =>
        product.id === productId
    );


  if (!item) return;


  item.quantity += change;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        product =>
          product.id !== productId
      );

  }


  updateCart();

}


/* =========================================================
   SUPPRIMER
========================================================= */

function removeFromCart(productId) {

  cart =
    cart.filter(
      product =>
        product.id !== productId
    );


  updateCart();


  showToast(
    "Produit supprimé du panier"
  );

}


/* =========================================================
   OUVRIR PANIER
========================================================= */

function openCart() {

  cartModal.classList.add(
    "active"
  );

  document.body.style.overflow =
    "hidden";

  renderCart();

}


/* =========================================================
   FERMER PANIER
========================================================= */

function closeCart(event) {

  if (
    event &&
    event.target !== cartModal
  ) {

    return;

  }


  cartModal.classList.remove(
    "active"
  );

  document.body.style.overflow =
    "";

}


/* =========================================================
   MODAL PRODUIT
========================================================= */

function openProductModal(productId) {

  const product =
    products.find(
      p => p.id === productId
    );


  if (!product) return;


  currentModalProduct =
    product;

  modalQuantity = 1;


  document.getElementById(
    "modal-product-image"
  ).src =
    product.image;


  document.getElementById(
    "modal-product-image"
  ).alt =
    product.name;


  document.getElementById(
    "modal-product-category"
  ).textContent =
    product.category;


  document.getElementById(
    "modal-product-name"
  ).textContent =
    product.name;


  document.getElementById(
    "modal-product-price"
  ).textContent =
    formatPrice(product.price);


  document.getElementById(
    "modal-product-description"
  ).textContent =
    product.description;


  document.getElementById(
    "modal-quantity"
  ).textContent =
    modalQuantity;


  updateModalWhatsApp();


  productModal.classList.add(
    "active"
  );

  document.body.style.overflow =
    "hidden";

}


/* =========================================================
   FERMER MODAL PRODUIT
========================================================= */

function closeProductModal(event) {

  if (
    event &&
    event.target !== productModal
  ) {

    return;

  }


  productModal.classList.remove(
    "active"
  );

  document.body.style.overflow =
    "";

}


/* =========================================================
   QUANTITE MODAL
========================================================= */

function changeModalQuantity(change) {

  modalQuantity += change;


  if (modalQuantity < 1) {

    modalQuantity = 1;

  }


  if (modalQuantity > 99) {

    modalQuantity = 99;

  }


  document.getElementById(
    "modal-quantity"
  ).textContent =
    modalQuantity;


  updateModalWhatsApp();

}


/* =========================================================
   AJOUTER PRODUIT MODAL
========================================================= */

function addModalProductToCart() {

  if (!currentModalProduct) {
    return;
  }


  addToCart(
    currentModalProduct.id,
    modalQuantity
  );


  closeProductModal();

}


/* =========================================================
   WHATSAPP PRODUIT
========================================================= */

function updateModalWhatsApp() {

  if (!currentModalProduct) {
    return;
  }


  const phone =
    "212600000000";


  const message =
    `Bonjour, je souhaite commander :

${currentModalProduct.name}
Quantité : ${modalQuantity}
Prix : ${formatPrice(
      currentModalProduct.price *
      modalQuantity
    )}

Merci.`;


  document.getElementById(
    "modal-whatsapp"
  ).href =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(message);

}


/* =========================================================
   COMMANDER PANIER WHATSAPP
========================================================= */

function checkoutWhatsApp() {

  if (cart.length === 0) {

    showToast(
      "Votre panier est vide"
    );

    return;

  }


  const phone =
    "212600000000";


  let message =
    "Bonjour, je souhaite passer une commande :\n\n";


  cart.forEach(item => {

    const subtotal =
      item.price *
      item.quantity;


    message +=
      `• ${item.name}
Quantité : ${item.quantity}
Prix : ${formatPrice(subtotal)}

`;

  });


  const subtotal =
    getSubtotal();


  const shipping =
    30;


  const total =
    subtotal + shipping;


  message +=
    `Sous-total : ${formatPrice(subtotal)}
Livraison : ${formatPrice(shipping)}
TOTAL : ${formatPrice(total)}

Merci.`;


  const url =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(message);


  window.open(
    url,
    "_blank"
  );

}


/* =========================================================
   RECHERCHE HEADER
========================================================= */

function focusSearch() {

  document
    .getElementById("products")
    .scrollIntoView({
      behavior: "smooth"
    });


  setTimeout(() => {

    searchInput.focus();

  }, 600);

}


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {

  document
    .getElementById("mobile-menu")
    .classList.toggle("active");

}


function closeMobileMenu() {

  document
    .getElementById("mobile-menu")
    .classList.remove("active");

}


/* =========================================================
   GO SHOP
========================================================= */

function goToShop() {

  closeCart();


  document
    .getElementById("products")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =========================================================
   CONTACT FORM
========================================================= */

function submitContact(event) {

  event.preventDefault();


  showToast(
    "Merci ! Votre message a bien été préparé."
  );


  event.target.reset();

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(() => {

      toast.classList.remove(
        "show"
      );

    }, 2500);

}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      productModal.classList.remove(
        "active"
      );

      cartModal.classList.remove(
        "active"
      );

      document.body.style.overflow =
        "";

    }

  }
);


/* =========================================================
   INITIALISATION
========================================================= */

renderProducts();

updateCart();
