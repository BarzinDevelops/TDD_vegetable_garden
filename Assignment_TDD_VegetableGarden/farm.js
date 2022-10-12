const getYieldForPlant = plant => plant.yield;
const getYieldForCrop = (crops) => crops.numCrops * getYieldForPlant(crops.crop);

const getTotalYield = (someCrop) => {
    let totalCrops = 0;
    someCrop.crops.forEach(cropObj =>totalCrops += cropObj.crop.yield * cropObj.numCrops);
    return totalCrops
}


module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
}