let cart = [];

function toggleCart() {
  const modal = document.getElementById('cart-modal');
  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
}

function updateCartUI() {
  document.getElementById('cart-count').innerText = cart.length;
  
  const container = document.getElementById('cart-items');
  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-msg">Votre panier est vide.</p>';
    document.getElementById('cart-total').innerText = '0.00';
    return;
  }
  
  let html = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    html += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.price.toFixed(2)} €</small>
        </div>
        <button onclick="removeFromCart(${index})" style="background:none;border:none;color:red;cursor:pointer;">Supprimer</button>
      </div>
    `;
  });
  
  container.innerHTML = html;
  document.getElementById('cart-total').innerText = total.toFixed(2);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function checkout() {
  if (cart.length === 0) {
    alert("Votre panier est vide !");
    return;
  }
  alert("Redirection vers le paiement sécurisé...");
}
