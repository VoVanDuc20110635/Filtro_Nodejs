const Associations = require('../model/Associations');
const Flavor = require('../model/Flavor');
class FlavorService{
    constructor(){};
    async getFlavorList() {
        try {
          const flavorList = await Flavor.findAll({
            order: [['flavorName', 'ASC']], // Order by materialName in ascending order
          });
          return flavorList;
        } catch (error) {
          console.error('Error getting material list:', error);
          throw error;
        }
    }
}

module.exports = FlavorService;