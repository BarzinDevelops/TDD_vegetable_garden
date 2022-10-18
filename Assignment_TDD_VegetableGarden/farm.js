
// testing purposes:
const log = console.log;
// ----------------------------------------------------------------------------//

// const getYieldForPlant = plant => plant.yield;
const getYieldForPlant = (cropsObj) => {
    log(`==============Getting the current yield value:===========================`);
    let currentYield = cropsObj.crop.yield
    log(`currentYield => ${currentYield} with type of: ${typeof currentYield}`);
    log(`==============Getting all objects in crop factors object=============`); 
    const cropFactors = cropsObj.crop.factor
    log(`cropFactors`, cropFactors);
    log(`==============Getting environmentFactors object ================`);
    const environmentFactors = cropsObj.factors
    log(environmentFactors)
    log(`=======looping cropFactors to find match in environment factors:=======`);
    //  loop through crop factors and find matching environment factor and show
    // value:
    // log(`is cropFactors array: `, Array.isArray(cropFactors))
    // log(`is cropFactors object: `, typeof cropFactors === 'object')
    // log(`wat is cropFactors dan: `, typeof cropFactors)
    for(let factor in cropFactors){
      
        // log(`cropFactors[factor]: `, cropFactors[factor])
        // log(`cropFactors[factor].low: `, cropFactors[factor].low)
        // for(let item in cropFactors[factor])
        //     if(item === 'low') log(`this must be ${item} and value is:`,cropFactors[factor][item] )
        if (factor in environmentFactors){
            let environmentFactorsValue = environmentFactors[factor];
            // log(`sun value in environment factor: ${environmentFactorsValue}`)
            // log(`Object.entries(factor)`, Object.entries(factor))
            for(let item in cropFactors[factor]){
                if(item === environmentFactors[factor]) {
                    // log(`this must be "${item}" and value is:`,cropFactors[factor][item] )
                    // log(`item is ${item} of type: ${typeof item}`)
                    const cropsFactorValue = cropFactors[factor][item];
                    // log(`cropsFactorValue => ${cropsFactorValue} with type: ${typeof cropsFactorValue}`)
                    switch(item){
                        case "low":
                            // currentYield += (currentYield * cropsFactorValue / 100)
                            log(`currentYield was => ${currentYield}`);
                            log(`cropsFactorValue was => ${cropsFactorValue}`);
                            currentYield -= (-currentYield * cropsFactorValue / 100)
                            log(`currentYield is now => ${currentYield}`);
                            break;
                        case "high":
                            // currentYield += (currentYield * cropsFactorValue / 100)
                            log(`currentYield was => ${currentYield}`);
                            log(`cropsFactorValue was => ${cropsFactorValue}`);
                            currentYield += (currentYield * cropsFactorValue / 100)
                            log(`currentYield is now => ${currentYield}`);
                            break;
                        case "medium":
                            // currentYield += (currentYield * cropsFactorValue / 100)
                            log(`currentYield was => ${currentYield}`);
                            log(`cropsFactorValue was => ${cropsFactorValue}`);
                            // currentYield += (currentYield * cropsFactorValue / 100)
                            log(`currentYield is now => ${currentYield}`);
                            break;
                    }
                    
                }
            }

            
        }else log(`factor ${factor} not fount in environmentFactors `)
    }
    return currentYield;
}



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