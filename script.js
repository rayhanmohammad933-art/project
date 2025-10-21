document.getElementById('submitBtn').addEventListener('click', submitForm);

// Fungsi untuk menampilkan input tambahan jika "Ya" dipilih
document.querySelectorAll('input[name="pengalaman"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const medsosCuan = document.getElementById('medsosCuan');
        if (this.value === 'Ya') {
            medsosCuan.style.display = 'block';
        } else {
            medsosCuan.style.display = 'none';
        }
    });
});

function submitForm() {
    // Ambil nilai dari input
    const nama = document.getElementById('nama').value.trim();
    const kelas = document.getElementById('kelas').value.trim();
    const noHp = document.getElementById('noHp').value.trim();
    
    // Media sosial
    const medsosChecked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    const medsosLain = document.getElementById('medsosLain').value.trim();
    const medsos = medsosChecked.join(', ') + (medsosLain ? ', ' + medsosLain : '');
    
    // Pengalaman
    const pengalaman = document.querySelector('input[name="pengalaman"]:checked');
    const pengalamanValue = pengalaman ? pengalaman.value : '';
    const medsosCuanDetail = document.getElementById('medsosCuanDetail').value.trim();
    const pengalamanFull = pengalamanValue === 'Ya' ? `Ya, di: ${medsosCuanDetail}` : pengalamanValue;
    
    // Tim
    const tim = document.querySelector('input[name="tim"]:checked');
    const timValue = tim ? tim.value : '';
    
    // Aktif
    const aktif = document.querySelector('input[name="aktif"]:checked');
    const aktifValue = aktif ? aktif.value : '';
    
    // Validasi: Pastikan semua wajib diisi
    if (!nama || !kelas || !noHp || !medsos || !pengalamanValue || !timValue || !aktifValue) {
        alert('Isi semua pertanyaan dengan lengkap!');
        return;
    }
    
    // Buat pesan WhatsApp
    const message = `Pendaftaran Event:\nNama: ${nama}\nKelas: ${kelas}\nNo HP: ${noHp}\nMedia Sosial: ${medsos}\nPengalaman Mengelola Medsos: ${pengalamanFull}\nMampu Bekerja Tim: ${timValue}\nSiap Aktif: ${aktifValue}`;
    
    // Kirim ke WhatsApp
    const phoneNumber = '6285606914493'; // Ganti dengan nomor WhatsApp tujuan (tanpa +)
    const url = `https://wa.me/6285606914493${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
