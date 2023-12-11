const Associations = require('../model/Associations');
const Category = require('../model/Category')
const NotExecuteException = require('../Exception/NotExecuteException');
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
  async getListAllCategory() {
    const listAccount = await Category.findAll({
        
    });
    return listAccount;
  }
  async updateCategory(categoryName, status, categoryId) {
    try {
        const tempCategory = await Category.findOne({
            where: {
                id: categoryId,
            },
        });
        // Hash the password
        tempCategory.categoryName = categoryName;
        if(status === 'active'){
          tempCategory.status = 1;
        } else{
          tempCategory.status = 0;
        }
        await tempCategory.save();
    } catch (err){
        throw new NotExecuteException('Không thể cập nhật!');
    }
    

  }

  async createCategory(categoryName, status) {
    try {
      let tempStatus;
      if (status === 'active'){
        tempStatus = 1;
      } else{
        tempStatus = 0;
      }
        const tempCategory = await Category.create({
            categoryName: categoryName,
            status:tempStatus
        });
        // Hash the password
        
    } catch (err){
        throw new NotExecuteException('Không thể thêm mới!');
    }
    

  }

}

module.exports = CategoryService;