
// testing purposes:
const log = console.log;

const getYieldForPlant = plant => plant.yield;
const getYieldForCrop = (singleCropObj) => {
    // log(`=======================getYieldForCrop==================================`);
    // log(`cropsObj =>`, cropsObj);
    // log(`cropsObj =>`, cropsObj);
    return singleCropObj.crop.yield * singleCropObj.numCrops;
    // log(`=========================================================`);
} 

const getTotalYield = (cropsObj) => {
    let totalCrops = 0;
    cropsObj.crops.forEach(obj => totalCrops += obj.crop.yield * obj.numCrops);
    return totalCrops
}

// calculate the cost of a crop (e.g. crop of corn, so only of one sepecies)
const getCostsForCrop = (cropsObj) => {
    let costsForCrop = 0;
    // cropsObj.crops.forEach(obj => costsForCrop += obj.crop.cost * getYieldForCrop(obj));
    
    cropsObj.crops.forEach(obj =>{

        // log(`=======================COSTS==================================`);
        
        // log(`obj =>`, obj);
        // log(`getYieldForCrop(obj) =>`, getYieldForCrop(obj));
        // log(`obj.crop.cost =>`, obj.crop.cost);
        costsForCrop += obj.crop.cost * getYieldForCrop(obj);
        // log(`costsForCrop =>`, costsForCrop);
        // revenueForCrop += obj.crop.salePrice * getYieldForCrop(obj);
        // log(`=========================================================`);
    });  

    return costsForCrop;
}
const getRevenueForCrop = (cropsObj) => {
    // log(`cropsObj in getRevenueForCrop ==> `,cropsObj)
    let revenueForCrop = 0;
    cropsObj.crops.forEach(obj =>{
        // log(`==========================REVENUE===============================`);
        revenueForCrop += obj.crop.salePrice * getYieldForCrop(obj);
        // log(`=========================================================`);
    });  
    return revenueForCrop;
};

const getProfitForCrop = (cropsObj) =>{
    const profitForCrop = getRevenueForCrop(cropsObj) - getCostsForCrop(cropsObj);
    return profitForCrop < 0 ? 0 : profitForCrop; 
    // log(`getRevenueForCrop(cropsObj) =>`, getRevenueForCrop(cropsObj));
    // log(` getCostsForCrop(cropsObj) =>`, getCostsForCrop(cropsObj));
    // log(` getRevenueForCrop(cropsObj) - getCostsForCrop(cropsObj) =>`, getRevenueForCrop(cropsObj) - getCostsForCrop(cropsObj));

}

const getTotalProfit = (cropsObj) =>{
  
    // cropsObj.crops.forEach(obj=>{
        log(`==========================TOTAL PROFIT=========================`);
        // const crops = [obj];
        // log(`{newObj} =>`, {crops});
        // log(`getProfitForCrop({newObj}) =>`, getProfitForCrop({crops}));
        // log(` =>`, );
        // log(` =>`, );
    // })
    log(`=========================================================`);
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