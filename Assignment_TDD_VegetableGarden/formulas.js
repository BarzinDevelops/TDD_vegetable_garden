
/*  log(`cropsObj => `, cropsObj)
    log(`cropsObj.crops => `, cropsObj.crops)
    log(`cropsObj.crops[0] => `, cropsObj.crops[0])
    log(`cropsObj.crops[0].crop => `, cropsObj.crops[0].crop)
    log(`cropsObj.crops[0].crop.cost => `, cropsObj.crops[0].crop.cost) */


// getYieldForPlant(plant) => the yield value of that plant
// getYieldForCrop(crops)

// "crop" is a collection of plants of the same species, so for example a field of corn.
// const getYieldForCrop = (crops) => crops.numCrops * getYieldForPlant(crops.crop);


// "costs" is the cost of sowing one plant.
// "yield" is the yield of one plant or one crop (in kilograms).
// "sale price" is the selling price of a type of fruit or vegetable per kilo.
// "revenue" is saleprice of one kilo of fruit or vegetables.
// "profits" is profit, so that is revenue - costs.
// "factor" in this context is an environmental factor that influences the yield.


/* How to calculate Revenue:
    Each plant has a "sale price". That is how many euros you earn with one kilo of fruit or vegetables from that plant.
    If apples have a sale price of 2 euros and we sell 5 kilos of apples, then the revenue is 10 euros. 

    formula for calculating revenu of one crop species:
    saleprice * 
*/




    // log('revenue corn = salesPrice * totalYield ->', 1.10 * 18)
    // log('costs corn = salesPrice * totalYield ->', 0.80 * 18)
    // log('revenue pumpkin = salesPrice * totalYield ->', 1.65 * 8)
    // log('costs pumpkin = salesPrice * totalYield ->', 1 * 8)
    // log('revenue carrot = salesPrice * totalYield ->',0.75 * 15)
    // log('costs carrot = salesPrice * totalYield ->',0.40 * 15) 
    log('===================================================') 
    // const profitCorn = (1.10 * 18)-( 0.80 * 18)
    // const profitPumpkin =(1.65 * 8)-( 1 * 8)
    // const profitCarrot = (0.75 * 15)-(0.40 * 15)
    // const totalProfitAllCrops = profitCorn + profitPumpkin + profitCarrot
    // log('total profit corn = revenue - costs ->',(1.10 * 18)-( 0.80 * 18))
    // log('total profit pumpkin = revenue - costs ->',((1.65 * 8)-( 1 * 8)).toFixed(2))
    // log('total profit carrot = revenue - costs ->',(0.75 * 15)-(0.40 * 15))
    // log('totalProfitAllCrops ->',totalProfitAllCrops)






    /* 
    
    // get total revenue of all crop species
    const totalCropsRevenue = getRevenueForCrop(cropsObj);
    log(`totalCropsRevenue =>`,totalCropsRevenue );
   
    // get total costz of all crop species 
    const totalCropsCost = getCostsForCrop(cropsObj);
    log(`totalCropsCost =>`, totalCropsCost);

    // get total profit of aal crop species:
    const totalCropsProfit = totalCropsRevenue - totalCropsCost;
    log(`totalCropsProfit =>`, totalCropsProfit);
    
    
    */


    /* 
    
    Yield from one plant
    Each plant has a standard yield in kilograms. If no environmental factors play a role, then that is the yield.

    Each plant can have zero, one, or more environmental factors. Every environmental factor has a value, that value is the percentage influence on the yield.

    We can take an avocado and the sun as an environmental factor as an example. If an avocado gets a certain amount of sun, the yield will be different:

    lots of sun: +50% yield
    medium sun: 100% yield
    little sun: -20% yield
    Let's say an avocado plant has a standard yield of 3 kilos. In addition, let's say that there is a lot of sun. Then that plant will yield 3 kg* 150% = 4.5 kg of avocados.

    But suppose there is another factor: wind.

    lots of wind: -60% yield
    medium wind: -30% yield
    little wind: 100% yield
    And let's say there's not only a lot of sun now, but also a lot of wind. Then we can calculate the yield like this: 3kg * 150% * 40% = 1.8 kg.

    If there is a factor that does not influence a certain plant species, you do not have to take that into account. Example:

    The growth of avocado plants is not affected by the soil type. If the avocado plant grows on clay, that factor has no influence on how many kilograms of avocados an avocado plant produces. If other plants grow in the vegetable garden that are affected by this, you must of course take this into account.
    
    
    */