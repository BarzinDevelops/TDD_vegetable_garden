
// testing purposes:
const log = console.log;

const getYieldForPlant = plant => plant.yield;
const getYieldForCrop = (singleCropObj) => singleCropObj.crop.yield * singleCropObj.numCrops;

const getTotalYield = (cropsObj) => {
    let totalCrops = 0;
    cropsObj.crops.forEach(obj => totalCrops += obj.crop.yield * obj.numCrops);
    return totalCrops
}

// calculate the cost of a crop (e.g. crop of corn, so only of one sepecies)
const getCostsForCrop = (cropsObj) => {
    const singleCropObj = cropsObj.crops[0] //getting one crop object
    const costPlant = cropsObj.crops[0].crop.cost; // cost of one plant species
    return costPlant * getYieldForCrop(singleCropObj);
}
const getRevenueForCrop = (cropsObj) => {
    const singleCropObj = cropsObj.crops[0] //getting one crop object
    const salePrice = cropsObj.crops[0].crop.salePrice; // salePrice of one plant species
    return salePrice * getYieldForCrop(singleCropObj);
};

const getProfitForCrop = (cropsObj) =>{
    const cropRevenue = getRevenueForCrop(cropsObj);
    const cropCost = cropsObj.crops[0].crop.cost;
    const profitForCrop = parseFloat((cropRevenue - cropCost).toFixed(2));
    return profitForCrop < 0 ? 0 : profitForCrop;
}


module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
}