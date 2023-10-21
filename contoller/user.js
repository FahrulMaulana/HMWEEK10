const userService = require('../service/user');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users', error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam memperoleh data' });
  }
};

const getUserById = async (req, res) => {
  const idUser = req.params.id;

  try {
    const user = await userService.getUserById(idUser);
    if (!user) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by id', error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam memperoleh data' });
  }
};

const getUsersPaginate = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  try {
    const users = await userService.getUsersPaginate(page, limit);

    const result = {
      result: users
    };

    if (page > 1) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    if (users.length === limit) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching paginated users', error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam memperoleh data' });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { email, gender, password, role } = req.body;

  if (!email || !gender || !password || !role) {
    return res.status(400).json({ message: 'Semua kolom harus diisi' });
  }

  try {
    const updatedUser = await userService.updateUser(id, email, gender, password, role);

    if (!updatedUser) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    res.status(200).json({ message: 'Data berhasil diperbarui', data: updatedUser });
  } catch (error) {
    console.error('Error updating user', error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam memperbarui data' });
  }
};

const createUser = async (req, res) => {
  const { id, email, gender, password, role } = req.body;

  if (!id || !email || !gender || !password || !role) {
    return res.status(400).json({ message: 'Semua kolom harus diisi' });
  }

  try {
    const newUser = await userService.createUser(id, email, gender, password, role);
    res.status(201).json({ message: 'Pengguna baru telah dibuat', data: newUser });
  } catch (error) {
    console.error('Error creating user', error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam menyimpan data' });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    res.status(200).json({ message: 'Data berhasil dihapus', data: deletedUser });
  } catch (error) {
    console.error('Error deleting user', error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam menghapus data' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUsersPaginate,
  updateUser,
  createUser,
  deleteUser
};
