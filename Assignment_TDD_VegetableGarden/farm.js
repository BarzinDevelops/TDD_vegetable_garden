const getYieldForPlant = plant => plant.yield;
const getYieldForCrop = (crops) => crops.numCrops * getYieldForPlant(crops.crop);



module.exports = {
    getYieldForPlant,
    getYieldForCrop,
}