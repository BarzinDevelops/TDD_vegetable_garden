const log = console.log;
// ----------ABOVE is Personal preference!!-----------//

const getYieldForPlant = (cropsObj) => {
    //Only return Yield if the object received contains no Environmental factors.
    if(cropsObj.yield) return cropsObj.yield;
   
    // ============== CALCULATIONS when Environmental factors received: ==============
     // Getting the current yield value:
     let currentYield = cropsObj.crop.yield
     // Getting all objects in crop factors object 
     const cropFactors = cropsObj.crop.factor
     // Getting environmentFactors object
     const environmentFactors = cropsObj.factors
     // looping cropFactors to find match in environment factors
    for(let factor in cropFactors){
        if (factor in environmentFactors){ 
            for(let item in cropFactors[factor]){    
                if(item === environmentFactors[factor]) {                                            
                    const cropsFactorValue = cropFactors[factor][item];
                    if(cropsFactorValue > 0){
                        currentYield += (currentYield * cropsFactorValue / 100);
                    }
                    if(cropsFactorValue < 0){
                        currentYield -= (-currentYield * cropsFactorValue / 100);
                    }                        
                }
            }          
        }
    }
    
    return parseFloat(currentYield.toFixed(2));
}

// calculate total yield of ONE plant based on crop amount:
const getYieldForCrop = (singleCropObj) => getYieldForPlant(singleCropObj) * singleCropObj.numCrops;

// calculate a total yield of all plants (which is sum of total yield of each plant)
const getTotalYield = (cropsObj) => {
    let totalCrops = 0;
    cropsObj.crops.forEach(obj => obj.factors ?
                                    totalCrops += getYieldForCrop(obj) : 
                                    totalCrops += obj.crop.yield * obj.numCrops); 
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
    return parseFloat(revenueForCrop.toFixed(2));
};

// calculate the profit of a crop (e.g. crop of corn, so only for one sepecies)
const getProfitForCrop = (cropsObj) =>{
    const profitForCrop = getRevenueForCrop(cropsObj) - getCostsForCrop(cropsObj);
    return profitForCrop < 0 ? 0 : parseFloat(profitForCrop.toFixed(2));
}

// calculate the total profit of a all crops (so sum of profit of each plant sepecies in the cropsObj).
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