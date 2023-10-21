const userRepository = require('../repository/user');

class UserService {
  async getAllUsers() {
    try {
      return await userRepository.getAllUsers();
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      return await userRepository.getUserById(id);
    } catch (error) {
      throw error;
    }
  }

  async createUser(id, email, gender, password, role) {
    try {
      return await userRepository.createUser(id, email, gender, password, role);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, email, gender, password, role) {
    try {
      return await userRepository.updateUser(id, email, gender, password, role);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      return await userRepository.deleteUser(id);
    } catch (error) {
      throw error;
    }
  }

  async getUsersPaginate(page, limit) {
    try {
      return await userRepository.getUsersPaginate(page, limit);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
