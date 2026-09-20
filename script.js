/* =========================================================
   MOROCCO HERITAGE - SCRIPT.JS
   ========================================================= */


/* =========================================================
   PANIER
   ========================================================= */

let cart = [];


/* Ajouter un produit */

function addToCart(name, price) {

  const existingProduct = cart.find(
    product => product.name === name
  );

  if (existingProduct) {

    existingProduct.quantity++;

  } else {

    cart.push({
      name: name,
      price: price,
      quantity: 1
    });

  }

  updateCart();

  showNotification(
    "Produit ajouté au panier ✓"
  );

}


/* =========================================================
   METTRE À JOUR LE PANIER
   ========================================================= */

function updateCart() {

  const cartCount =
    document.getElementById("cart-count");

  const cartItems =
    document.getElementById("cart-items");

  const cartTotal =
    document.getElementById("cart-total");


  /* Nombre total de produits */

  let totalQuantity = 0;

  cart.forEach(product => {

    totalQuantity += product.quantity;

  });


  cartCount.textContent = totalQuantity;


  /* Panier vide */

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-msg">
        Votre panier est vide.
      </p>
    `;

    cartTotal.textContent = "0.00 DH";

    return;
  }


  /* Affichage des produits */

  cartItems.innerHTML = "";


  cart.forEach((product, index) => {

    const item = document.createElement("div");

    item.className = "cart-item";


    item.innerHTML = `

      <div class="cart-item-info">

        <h4>
          ${product.name}
        </h4>

        <p>
          ${product.price.toFixed(2)} DH
          ×
          ${product.quantity}
        </p>

      </div>

      <button
        class="remove-item"
        onclick="removeFromCart(${index})">

        ×

      </button>

    `;


    cartItems.appendChild(item);

  });


  /* Calcul du total */

  let total = 0;


  cart.forEach(product => {

    total +=
      product.price *
      product.quantity;

  });


  cartTotal.textContent =
    total.toFixed(2) + " DH";

}


/* =========================================================
   SUPPRIMER UN PRODUIT
   ========================================================= */

function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();

}


/* =========================================================
   OUVRIR / FERMER LE PANIER
   ========================================================= */

function toggleCart() {

  const modal =
    document.getElementById("cart-modal");


  if (modal.style.display === "flex") {

    modal.style.display = "none";

  } else {

    modal.style.display = "flex";

  }

}


/* =========================================================
   FERMER AVEC ESC
   ========================================================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      const modal =
        document.getElementById("cart-modal");

      modal.style.display = "none";

    }

  }
);


/* =========================================================
   FILTRER LES PRODUITS
   ========================================================= */

function filterProducts(category) {

  const products =
    document.querySelectorAll(
      ".product-card"
    );


  const buttons =
    document.querySelectorAll(
      ".filters button"
    );


  /* Bouton actif */

  buttons.forEach(button => {

    button.classList.remove("active");

    if (
      button.textContent.trim()
      === category
    ) {

      button.classList.add("active");

    }

  });


  /* Affichage */

  products.forEach(product => {

    const productCategory =
      product.dataset.category;


    if (
      category === "Tous" ||
      productCategory === category
    ) {

      product.style.display = "block";

    } else {

      product.style.display = "none";

    }

  });

}


/* =========================================================
   RECHERCHE
   ========================================================= */

function searchProducts() {

  const searchInput =
    document
      .getElementById("search")
      .value
      .toLowerCase()
      .trim();


  const products =
    document.querySelectorAll(
      ".product-card"
    );


  products.forEach(product => {

    const productName =
      product.dataset.name.toLowerCase();

    const productCategory =
      product.dataset.category.toLowerCase();


    if (
      productName.includes(searchInput) ||
      productCategory.includes(searchInput)
    ) {

      product.style.display = "block";

    } else {

      product.style.display = "none";

    }

  });

}


/* =========================================================
   NOTIFICATION
   ========================================================= */

function showNotification(message) {

  const notification =
    document.createElement("div");


  notification.textContent =
    message;


  notification.style.position =
    "fixed";

  notification.style.top =
    "95px";

  notification.style.right =
    "25px";

  notification.style.zIndex =
    "5000";

  notification.style.background =
    "#123c32";

  notification.style.color =
    "white";

  notification.style.padding =
    "14px 20px";

  notification.style.borderRadius =
    "8px";

  notification.style.fontSize =
    "13px";

  notification.style.fontWeight =
    "600";

  notification.style.boxShadow =
    "0 10px 30px rgba(0,0,0,.2)";


  document.body.appendChild(
    notification
  );


  setTimeout(() => {

    notification.style.opacity =
      "0";

    notification.style.transition =
      "0.4s";


    setTimeout(() => {

      notification.remove();

    }, 400);

  }, 1800);

}


/* =========================================================
   COMMANDE WHATSAPP
   ========================================================= */

function checkout() {

  if (cart.length === 0) {

    alert(
      "Votre panier est vide."
    );

    return;

  }


  let message =
    "Bonjour, je souhaite passer une commande :\n\n";


  let total = 0;


  cart.forEach(product => {

    const subtotal =
      product.price *
      product.quantity;


    total += subtotal;


    message +=
      "• " +
      product.name +
      " × " +
      product.quantity +
      " = " +
      subtotal.toFixed(2) +
      " DH\n";

  });


  message +=
    "\nTotal : " +
    total.toFixed(2) +
    " DH";


  /*
    IMPORTANT :
    Remplacez 212600000000
    par votre vrai numéro WhatsApp.

    Exemple Maroc :
    +212 6 XX XX XX XX
    devient :
    2126XXXXXXXX
  */


  const phone =
    "212600000000";


  const whatsappURL =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(message);


  window.open(
    whatsappURL,
    "_blank"
  );

}


/* =========================================================
   FERMER LE PANIER EN CLIQUANT À L'EXTÉRIEUR
   ========================================================= */

document
  .getElementById("cart-modal")
  .addEventListener(
    "click",
    function(event) {

      if (
        event.target === this
      ) {

        this.style.display =
          "none";

      }

    }
  );


/* =========================================================
   INITIALISATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    updateCart();

  }
);
