
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
    let costsForCrop = 0;
    cropsObj.crops.forEach(obj => costsForCrop += obj.crop.cost * getYieldForCrop(obj)); 
    return costsForCrop;
}
const getRevenueForCrop = (cropsObj) => {
    let revenueForCrop = 0;
    cropsObj.crops.forEach(obj => revenueForCrop += obj.crop.salePrice * getYieldForCrop(obj)); 
    return revenueForCrop;
};

const getProfitForCrop = (cropsObj) =>{
    const cropRevenue = getRevenueForCrop(cropsObj);
    const cropCost = cropsObj.crops[0].crop.cost;
    const profitForCrop = parseFloat((cropRevenue - cropCost).toFixed(2));
    return profitForCrop < 0 ? 0 : profitForCrop;
}

const getTotalProfit = (cropsObj) =>{
    // loop through all crop species:
    // log(cropsObj.crops)
    // cropsObj.crops.forEach(obj => {

    // }) 
    // get revenue and cost of eacht crop species
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
}