
// testing purposes:
const log = console.log;
// ----------------------------------------------------------------------------//

// const getYieldForPlant = plant => plant.yield;
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
                        // log(`========case ${item} ==============`);
                        // log(`cropsFactorValue (${cropsFactorValue}) > 0  => `,cropsFactorValue > 0)
                        // log(`currentYield before calc: (${currentYield})`)
                        currentYield += (currentYield * cropsFactorValue / 100);
                        // log(`currentYield after calc: (${currentYield})`)
                    }
                    if(cropsFactorValue < 0){
                        // log(`========case ${item} ==============`);
                        // log(`cropsFactorValue (${cropsFactorValue}) < 0  => `,cropsFactorValue < 0)
                        // log(`currentYield before calc: (${currentYield})`)
                        currentYield -= (-currentYield * cropsFactorValue / 100);
                        // log(`currentYield after calc: (${currentYield})`)
                    }                        
                }
            }          
        }
    }
    
    return parseFloat(currentYield.toFixed(2));
}



const getYieldForCrop = (singleCropObj) => getYieldForPlant(singleCropObj) * singleCropObj.numCrops;


const getTotalYield = (cropsObj) => {
    let totalCrops = 0;
    // log(`cropsObj.crops => `,cropsObj.crops);

    cropsObj.crops.forEach(obj =>{
        if(obj.factors){
            totalCrops += getYieldForCrop(obj);
            // log(`=============================================================`)
            // log(`getYieldForCrop(obj)`, getYieldForCrop(obj))
            // log(`totalCrops(obj)`,totalCrops)
        } else {
            totalCrops += obj.crop.yield * obj.numCrops;
        }

    }); 

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