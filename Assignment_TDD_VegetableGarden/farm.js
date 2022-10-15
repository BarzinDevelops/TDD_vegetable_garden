
// testing purposes:
const log = console.log;

const getYieldForPlant = plant => plant.yield;
const getYieldForCrop = (crops) => crops.numCrops * getYieldForPlant(crops.crop);

const getTotalYield = (someCrop) => {
    let totalCrops = 0;
    someCrop.crops.forEach(cropObj =>totalCrops += cropObj.crop.yield * cropObj.numCrops);
    return totalCrops
}
const getCostsForCrop = (toCalCrop) => {
    totCostCrops = 0;
    toCalCrop.crops.forEach(cropObject => {
        const totalYield = getYieldForCrop(cropObject);
        const costPlant = cropObject.crop.cost;
        totCostCrops += costPlant * totalYield
    });
    return totCostCrops;
}

const getRevenueForCrop = (cropsObj) => {
    let totalRevenue = 0;
    const cropArr = cropsObj.crops
    cropArr.forEach(obj => {
        const salePrice = obj.crop.salePrice;               
        const totalYield = getYieldForCrop(obj);         
        totalRevenue += totalYield * salePrice;
    });
    return totalRevenue;
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    
}