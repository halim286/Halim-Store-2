async function savePayment() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

    // Validasi input
    if (!name || !address || !cardNumber || !expiry || !cvv) {
        alert('Harap isi semua kolom.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name, 
                address, 
                cardNumber, 
                expiry, 
                cvv,
                amount: 10000,  // Sesuaikan dengan harga produk
                currency: 'idr' 
            }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Pembayaran berhasil! ID Pembayaran: ' + result.paymentId);
            document.getElementById('paymentForm').reset();
            // Redirect atau lakukan aksi selanjutnya
            window.location.href = 'index.html';
        } else {
            alert('Pembayaran gagal: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal mengirim pembayaran. Periksa koneksi internet.');
    }
}