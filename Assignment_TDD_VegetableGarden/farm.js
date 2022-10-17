
// testing purposes:
const log = console.log;
// ----------------------------------------------------------------------------//

const getYieldForPlant = plant => plant.yield;



const getYieldForCrop = (singleCropObj) => singleCropObj.crop.yield * singleCropObj.numCrops;

const getTotalYield = (cropsObj) => {
    let totalCrops = 0;
    cropsObj.crops.forEach(obj => totalCrops += obj.crop.yield * obj.numCrops);
    return totalCrops;
}

// calculate the cost of a crop (e.g. crop of corn, so only of one sepecies)
const getCostsForCrop = (cropsObj) => {
    let costsForCrop = 0;
    cropsObj.crops.forEach(obj => costsForCrop += obj.crop.cost * getYieldForCrop(obj));  
    return  costsForCrop;
}

// calculate the revenue of a crop (e.g. crop of corn, so only of one sepecies)
const getRevenueForCrop = (cropsObj) => {
    let revenueForCrop = 0;
    cropsObj.crops.forEach(obj => revenueForCrop += obj.crop.salePrice * getYieldForCrop(obj));  
    return revenueForCrop;
};

const getProfitForCrop = (cropsObj) =>{
    const profitForCrop = getRevenueForCrop(cropsObj) - getCostsForCrop(cropsObj);
    return profitForCrop < 0 ? 0 : parseFloat(profitForCrop.toFixed(2));
}

const getTotalProfit = (cropsObj) =>{
    let totalProfit = 0;
    let crops = [];
    cropsObj.crops.forEach(obj=>{
        crops = [obj];
        totalProfit += getProfitForCrop({crops});
    });
    return parseFloat(totalProfit.toFixed(2));
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