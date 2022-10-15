
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

const getProfitForCrop = (cropsObj2) =>{
    // get array of crop objects:
    const cropArr = cropsObj2.crops;
    // get total crop revenue (sale price of total crop)
    const totalCropRevenue = getRevenueForCrop(cropsObj2);
    log(`totalCropRevenue`, totalCropRevenue);
    // get total crop costs:
    const totalCropCost = getCostsForCrop(cropsObj2);
    log(`totalCropCost`, totalCropCost); 
    const totalCropProfit = totalCropRevenue - totalCropCost;
    // log(`totalCropProfit`, totalCropProfit); 
    log(`totalCropProfit`, totalCropProfit.toFixed(2)); 
    // return totalCropRevenue - totalCropCost;
}


module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
}