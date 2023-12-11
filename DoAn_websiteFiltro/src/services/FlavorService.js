const Associations = require('../model/Associations');
const Flavor = require('../model/Flavor');
const NotExecuteException = require('../Exception/NotExecuteException');
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
    async getListAllFlavor() {
      const listFlavor = await Flavor.findAll({
          
      });
      return listFlavor;
    }
    async updateFlavor(flavorName, flavorDescription, status, flavorId) {
      try {
          const tempFlavor = await Flavor.findOne({
              where: {
                flavorId: flavorId,
              },
          });
          // Hash the password
          tempFlavor.flavorName = flavorName;
          tempFlavor.flavorDescription = flavorDescription;
          if(status === 'active'){
            tempFlavor.status = 1;
          } else{
            tempFlavor.status = 0;
          }
          await tempFlavor.save();
      } catch (err){
          throw new NotExecuteException('Không thể cập nhật!');
      }
    }

    async createFlavor(flavorName, flavorDescription, status) {
      try {
        let tempStatus;
        if (status === 'active'){
          tempStatus = 1;
        } else{
          tempStatus = 0;
        }
          const tempFlavor = await Flavor.create({
            flavorName: flavorName,
            flavorDescription:  flavorDescription,
            status:tempStatus
          });
          // Hash the password
          
      } catch (err){
          throw new NotExecuteException('Không thể thêm mới!');
      }
      
  
    }

}

module.exports = FlavorService;