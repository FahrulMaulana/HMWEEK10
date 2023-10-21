document.addEventListener('DOMContentLoaded', async () => {
    const userTable = document.getElementById('user-table');
    const userList = document.getElementById('user-list');
    const searchForm = document.getElementById('search-form');

    // Fungsi untuk menampilkan daftar pengguna
    const displayUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/user');
            const users = await response.json();

            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.email}</td>
                    <td>${user.gender}</td>
                    <td>${user.password}</td>
                    <td>${user.role}</td>
                `;
                userList.appendChild(row);
            });

        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Fungsi untuk mencari pengguna berdasarkan ID
    const searchUserById = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${id}`);
            const user = await response.json();

            if (user && user.id) {
                const result = `ID: ${user.id}, Email: ${user.email}, Gender: ${user.gender}, Password: ${user.password}, Role: ${user.role}`;
                alert(result);
            } else {
                alert('Pengguna tidak ditemukan');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Memanggil fungsi untuk menampilkan daftar pengguna
    displayUsers();

    // Menangani formulir pencarian
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchInput = document.getElementById('search-input');
        const id = parseInt(searchInput.value);

        if (!isNaN(id)) {
            searchUserById(id);
        } else {
            alert('ID harus berupa angka');
        }
    });
});
