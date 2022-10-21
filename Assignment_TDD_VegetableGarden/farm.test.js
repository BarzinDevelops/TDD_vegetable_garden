const log = console.log // own preference for short command of console.log()
//this also stops someone scrolling back and viewing sensitive data that may have been logged
process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
console.clear();
// ----------------------------------------------------------------------------//

// import { getYieldForCrop } from "./farm";

const { getYieldForPlant, 
        getYieldForCrop, 
        getTotalYield, 
        getCostsForCrop, 
        getRevenueForCrop,
        getProfitForCrop,
        getTotalProfit
} = require("./farm");

/*  */
describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };
    const carrot = {
        name: "carrot",
        yield: 14,
    };

    test("Get yield for plant (Corn) with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
    test("Get yield for plant (Carrot) with no environment factors", () => {
        expect(getYieldForPlant(carrot)).toBe(14);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 }
        ];
        expect(getTotalYield({crops})).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

// 1. calculate the cost for a crop: getCostsForCrop.
describe("getCostsForCrop", () => {
    test("Calculate the cost of one crop species.", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 0.80
        };
        const crops = [
            { crop: corn, numCrops: 5 },
        ];
        expect(getCostsForCrop({crops})).toBe(12);
    });
    test("Testing the cost of one crop when crop cost is set to null.", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: null
        };
        const crops = [
            { crop: corn, numCrops: 5 },
        ];
        expect(getCostsForCrop({crops})).toBe(0);
    });
});

// 2. calculate the revenue for a crop (without environmental factors): 
describe("getRevenueForCrop", () => {
    test("calculate the revenue for a crop (without environmental factors).", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 0.80,
            salePrice: 1.10
        };
        const crops = [
            { crop: corn, numCrops: 5 },
        ];
        expect(getRevenueForCrop({crops})).toBe(16.50);
    });
    test("calculate the revenue with 'null' saleprice and 0 yield (without environmental factors).", () => {
        const corn = {
            name: "corn",
            yield: 0,
            cost: 0.80,
            salePrice: null
        };
        const crops = [
            { crop: corn, numCrops: 5 },
        ];
        expect(getRevenueForCrop({crops})).toEqual(0);
    });
});

// 3. calculate the profit for a crop (without environmental factors). 
// Calculation-> (is revenue - costs)
describe("getProfitForCrop", ()=>{
    test(`Testing profit for one crop (without environmental factors)`, ()=>{
        const corn = {
            "name": "corn", 
            yield: 3,
            cost: 0.80,
            salePrice: 1.10,
          };
        const crops = [ { crop: corn, numCrops: 2 } ];
        expect(getProfitForCrop({crops})).toBe(1.80)
    });
    test(`Testing profit for one crop with no crops amount (without environmental factors)`, ()=>{
        const corn = {
            "name": "corn", 
            yield: 3,
            cost: 0.80,
            salePrice: 1.10,
          };
        const crops = [ { crop: corn, numCrops: 0 } ];
        expect(getProfitForCrop({crops})).toBe(0)
    });
});

// 4. Calculate the profit for multiple crops (without environmental factors): 
describe("getTotalProfit", ()=>{
    test(`Testing the profit for multiple crops (without environmental factors).`, ()=>{
        const corn = {
            "name": "corn", 
            yield: 3,
            cost: 0.80,
            salePrice: 1.10,
          };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            cost: 1.00,
            salePrice: 1.65,
        };
        const carrot = {
            name: "carrot",
            yield: 5,
            cost: 0.40,
            salePrice: 0.75,
        };
        const crops = [ 
            { crop: corn, numCrops: 6 }, 
            { crop: pumpkin, numCrops: 4 }, 
            { crop: carrot, numCrops: 3 }, 
        ];
        expect(getTotalProfit({crops})).toBe(21.05);
    });
    test(`Testing the profit for multiple crops with zero crops amount (without environmental factors).`, ()=>{
        const corn = {
            "name": "corn", 
            yield: 3,
            cost: 0.80,
            salePrice: 1.10,
          };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            cost: 1.00,
            salePrice: 1.65,
        };
        const carrot = {
            name: "carrot",
            yield: 5,
            cost: 0.40,
            salePrice: 0.75,
        };
        const crops = [ 
            { crop: corn, numCrops: 0 }, 
            { crop: pumpkin, numCrops: 0 }, 
            { crop: carrot, numCrops: 0 }, 
        ];
        expect(getTotalProfit({crops})).toBe(0);
    });
});





/* Implement the following functionalities by modifying your previously written functions.
    So don't write new functions. Check within the function whether there are relevant environmental factors that have been passed to the function. */

// formules:    if low -> yield + (yield * 50 / 100)
//              if high ->  yield - (yield * 50 / 100)
//              if medium -> yield (nothing changes)
describe("getYieldForPlant with Environmental factors", ()=>{
    // 1. Include environmental factors in calculating the yield (in kilograms) of a plant in this function:        
    test(`1. Testing calculating the yield (in kilograms) of a plant (With SINGLE environmental factor).`, ()=>{
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            },
        };
            
        const environmentFactors = {
        sun: "high",
        };
        const crops = { crop: corn, factors: environmentFactors }
        expect(getYieldForPlant(crops)).toBe(4.5); //Only if sun: "high"
    });

    // 2.  calculating the yield (in kilograms) of a plant with multiple     
    //     environmental factors.: 
    test(`2. Testing calculating the yield (in kilograms) of a plant (With multiple environmental factors).`, ()=>{
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    lots: -60,
                    medium: -30,
                    little: 100,
                },
            },
        };
            
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };
        const crops = { crop: corn, factors: environmentFactors }
        // expect(getYieldForPlant(crops)).toBe(2.1); //Only if wind: "medium"
        expect(getYieldForPlant(crops)).toBe(3.15);//Only if sun: "high" and wind: "medium"
    });
});

// 4.  Test getYieldForCrop -> for calculating the yield for crop, include environmental  
//      factors.
describe("4. getYieldForCrop with Environmental factors", () => {
    test(`4A. Get getYieldForCrop (With SINGLE environmental factor).`, ()=>{
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            },
        };
            
        const environmentFactors = {
        sun: "high",
        };

        const input = {
            crop: corn,
            factors: environmentFactors,
            numCrops: 10,
        };

        expect(getYieldForCrop(input)).toBe(45);

    });

    test(`4B. Get getYieldForCrop (With MULTIPLE environmental factors).`, ()=>{

        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    lots: -60,
                    medium: -30,
                    little: 100,
                },
            },
        };
            
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };

        const input = {
            crop: corn,
            factors: environmentFactors,
            numCrops: 10,
        };

        //  the yield should be 3.15 with sun: "high" and wind: "medium"
        // so the crop should be:  3.15 * numCrops(10) = 31.5
        expect(getYieldForCrop(input)).toBe(31.5);

    });
});




// 5.  Test getTotalYield -> for calculating the total yield of multiple crops,
//  include environmental factors.
describe("5. getTotalYield with Environmental factors", () => {
    test(`5A. Test to get the total yield of multiple crops (With SINGLE environmental factor).`, ()=>{
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            },
        };
            
        const environmentFactors = {
        sun: "high",
        };

        const crops = [
            { crop: corn, factors: environmentFactors, numCrops: 5 },
            { crop: pumpkin, factors: environmentFactors, numCrops: 2 },
        ];

        /* corn -> will be 4.5 (with sun high) and pumpking -> will be 6
           corn total yield => 4.5 * 5 =  22.5 
           pumpkin total yield => 6 * 2 = 12 */
        expect(getTotalYield({ crops })).toBe(34.5);

    });
    test(`5B. Test to get the total yield of multiple crops  (With MULTIPLE environmental factors).`, ()=>{

        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    lots: -60,
                    medium: -30,
                    little: 100,
                },
            },
        };
            
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };

        const input = {
            crop: corn,
            factors: environmentFactors,
            numCrops: 10,
        };

        //  the yield should be 3.15 with sun: "high" and wind: "medium"
        // so the crop should be:  3.15 * numCrops(10) = 31.5
        expect(getYieldForCrop(input)).toBe(31.5);

    });

});




// 6.  Test getTotalYield -> for calculating the total yield of multiple crops,
//  include environmental factors.
describe("6. getRevenueForCrop with Environmental factors", () => {
    test(`6A. Calculate the income (Revenue) of a crop (With SINGLE environmental factor).`, ()=>{
        const corn = {
            name: "corn",
            yield: 3,
            cost: 0.80,
            salePrice: 1.10,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            },
        };            
        const environmentFactors = {
        sun: "high",
        };

        const crops = [
            { crop: corn, factors: environmentFactors, numCrops: 5 },
        ];

        /* corn -> will be 4.5 (with sun high) and pumpking -> will be 6
           corn total yield => 4.5 * 5 =  22.5
            total revenue corn => 22.5  * 1.10 =  24.75
        */
        expect(getRevenueForCrop({ crops })).toBe(24.75);

    });
    test(`6B. Calculate the income (Revenue) of a crop (With MULTIPLE environmental factors).`, ()=>{

        const corn = {
            name: "corn",
            yield: 3,
            cost: 0.80,
            salePrice: 1.10,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    lots: -60,
                    medium: -30,
                    little: 100,
                },
            },
        };
            
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };

        const crops = [
            { crop: corn, factors: environmentFactors, numCrops: 10 },
        ];
        
        /* 
            the yield should be 3.15 with sun: "high" and wind: "medium"
            so the crop should be:  3.15 * numCrops(10) = 31.5
            -------------------------------------------------------
            corn -> will be 3.15 (with sun: "high" and wind: "medium")
            corn total yield => 3.15 * numCrops(10) = 31.5
            total revenue corn => 31.5  * 1.10 = 34,65
         */
        expect(getRevenueForCrop({ crops })).toBe(34.65);

    });

});





// 7.  Test getTotalYield -> for calculating the total yield of multiple crops,
//  include environmental factors.
describe("6. getProfitForCrop with Environmental factors", () => {
    test(`6A. Calculate the profit of a crop (With SINGLE environmental factor).`, ()=>{
        const corn = {
            name: "corn",
            yield: 3,
            cost: 0.80,
            salePrice: 1.10,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            },
        };            
        const environmentFactors = {
        sun: "high",
        };

        const crops = [
            { crop: corn, factors: environmentFactors, numCrops: 5 },
        ];

        /* corn -> will be 4.5 (with sun high) and pumpking -> will be 6
           corn total yield => 4.5 * 5 =  22.5
            total revenue corn => 22.5  * 1.10 =  24.75
            total cost corn => 0.80 * 22.50 = 18
            total profit corn => 24.75 - 18 = 6.75
        */
        expect(getProfitForCrop({ crops })).toBe(6.75);

    });
    test(`6B. Calculate the profit of a crop (With MULTIPLE environmental factors).`, ()=>{

        const corn = {
            name: "corn",
            yield: 3,
            cost: 0.80,
            salePrice: 1.10,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    lots: -60,
                    medium: -30,
                    little: 100,
                },
            },
        };
            
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };

        const crops = [
            { crop: corn, factors: environmentFactors, numCrops: 10 },
        ];
        
        /* 
            the yield should be 3.15 with sun: "high" and wind: "medium"
            so the crop should be:  3.15 * numCrops(10) = 31.5
            -------------------------------------------------------
            corn yield-> will be 3.15 (with sun: "high" and wind: "medium")
            corn total yield => 3.15 * numCrops(10) = 31.5
            total revenue corn => 31.5  * 1.10 = 34,65
            total cost corn => 0.80 * 31.5 = 25,2
            total profit corn => 34,65- 25,2 = 6.3
         */
        expect(getProfitForCrop({ crops })).toBe(9.45);

    });

});