const Associations = require('../model/Associations');
const Category = require('../model/Category')
class CategoryService {
  constructor() { }
  async get5Categories() {
    try {
      const categories = await Category.findAll({
        order: [['id', 'ASC']], // Order by id in ascending order
        limit: 5, // Limit the result to 5 rows
      });
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryById(id) {
    try {
      const category = await Category.findByPk(id);
      return category;
    } catch (error) {
      console.error('Error finding category by ID:', error);
      throw error;
    }
  }

}

module.exports = CategoryService;