// script.js for MieVerse
document.addEventListener('DOMContentLoaded', function() {
  // Menu page: attach event to order buttons that redirect with params
  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const name = encodeURIComponent(this.dataset.name);
      const price = encodeURIComponent(this.dataset.price);
      window.location.href = `checkout.html?name=${name}&price=${price}`;
    });
  });

  // Checkout page: read params and populate summary
  if (window.location.pathname.endsWith('checkout.html')) {
    const params = new URLSearchParams(window.location.search);
    const itemName = params.get('name') || '';
    const itemPrice = params.get('price') || '0';
    const priceNum = parseInt(itemPrice, 10) || 0;

    document.getElementById('orderName').textContent = decodeURIComponent(itemName);
    document.getElementById('orderPrice').textContent = formatRupiah(priceNum);
    document.getElementById('orderPriceInput').value = priceNum;
    document.getElementById('orderTotal').textContent = formatRupiah(priceNum);

    // payment method change could add fees, but simple now
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('buyerName').value.trim();
      const phone = document.getElementById('buyerPhone').value.trim();
      const address = document.getElementById('buyerAddress').value.trim();
      const payment = document.querySelector('input[name="paymentMethod"]:checked');
      if (!name || !phone || !address || !payment) {
        alert('Tolong isi semua field dengan lengkap.');
        return;
      }
      alert('Pembayaran berhasil!\nTerima kasih ' + name + '.\nPesanan: ' + decodeURIComponent(itemName) + ' - ' + formatRupiah(priceNum));
      form.reset();
      // optional: redirect to thank you or home
      window.location.href = 'index.html';
    });
  }

  // Contact page form alert
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      if (!name) { alert('Tolong isi nama Anda.'); return; }
      alert('Terima kasih, ' + name + '! Pesan Anda telah terkirim.');
      contactForm.reset();
    });
  }

  // util: format number to Rupiah
  function formatRupiah(n) {
    return 'Rp ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
});