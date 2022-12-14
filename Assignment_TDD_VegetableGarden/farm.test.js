const log = console.log 
//clean console screen after each test:
process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
console.clear();
// -----------------------------ABOVE is Personal preference!!----------------------------------//

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
//      Calculation-> (is revenue - costs)
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


/* ##############################--WITH ENVIRONMENTAL FACTORS--####################################
    
        // Implement the following functionalities by modifying your previously written functions.
        // So don't write new functions. 
        // Check within the function whether there are relevant environmental factors that 
        // have been passed to the function. 
   
 ################################################################################################# */

// 1. Test getYieldForPlant -> including SINGLE environmental factor.
// formules:    if high -> yield + (yield * 50 / 100)
//              if low ->  yield - (-yield * 50 / 100)
//              if medium -> yield (nothing changes)
describe("1. getYieldForPlant (with ONE Environmental factor)", ()=>{
    test(`1A. Calculating the yield (in kilograms) of a plant (With SINGLE environmental factor).`, ()=>{
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
});

// 2. Test getYieldForPlant -> including MULTIPLE environmental factors.
// formules:    if high -> yield + (yield * 50 / 100)
//              if low ->  yield - (-yield * 50 / 100)
//              if medium -> yield (nothing changes)
describe("2. getYieldForPlant (with ONE Environmental factor)", ()=>{    
    test(`2A. Calculating the yield (in kilograms) of a plant (With MULTIPLE environmental factors).`, ()=>{
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
        expect(getYieldForPlant(crops)).toBe(3.15);//Only if sun: "high" and wind: "medium"
    }); 
});

// 3. Test getYieldForCrop -> Ignore irrelevant environmental factors in your calculations.
// formules:    if high -> yield + (yield * 50 / 100)
//              if low ->  yield - (-yield * 50 / 100)
//              if medium -> yield (nothing changes)
describe("3. getYieldForCrop only with relevant environmental factors", () => {
    test(`3A. Testing getYieldForCrop (With one IRRELEVANT environmental factor).`, ()=>{
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
            wind: "wind",
        };

        const input = {
            crop: corn,
            factors: environmentFactors,
            numCrops: 10,
        };
        //  environmental factor (wind: "high") shouldn't change the yield (=45) for this plant (corn)!
        expect(getYieldForCrop(input)).toBe(45);

    });

    test(`3B. Testing getYieldForCrop with more plants and With more IRRELEVANT environmental factors.`, ()=>{
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

        const input1 = {
            crop: corn,
            factors: environmentFactors,
            numCrops: 10,
        };
        const input2 = {
            crop: pumpkin,
            factors: environmentFactors,
            numCrops: 10,
        };
        //  environmental factor (wind: "medium") => shouldn't change the yield (=45) for corn     
        //                                           but should effect  yield of pumpkin (= )!
        expect(getYieldForCrop(input1)).toBe(45);
        /*  pumpkin yield plant-> will be 4.2 when (sun: "high" and wind: "medium")
            pumpkin total yield (yield plant * numCrops) => 4.2 * 10 =  42 */
        expect(getYieldForCrop(input2)).toBe(42);

    });

});

// 4.  Test getYieldForCrop -> for calculating the yield for crop, include environmental  
//      factors.
// formules:    if high -> yield + (yield * 50 / 100)
//              if low ->  yield - (-yield * 50 / 100)
//              if medium -> yield (nothing changes)
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
// formules:    if high -> yield + (yield * 50 / 100)
//              if low ->  yield - (-yield * 50 / 100)
//              if medium -> yield (nothing changes)
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
// formules:    if high -> yield + (yield * 50 / 100)
//              if low ->  yield - (-yield * 50 / 100)
//              if medium -> yield (nothing changes)
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
// formules:    if high -> yield + (yield * 50 / 100)
//              if low ->  yield - (-yield * 50 / 100)
//              if medium -> yield (nothing changes)
describe("7. getProfitForCrop with Environmental factors", () => {
    test(`7A. Calculate the profit of a crop (With SINGLE environmental factor).`, ()=>{
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
    test(`7B. Calculate the profit of a crop (With MULTIPLE environmental factors).`, ()=>{

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

// 8.  Test getTotalProfit -> for calculate the profit for multiple crops,
//  including environmental factors.
// formules:    if high -> yield + (yield * 50 / 100)
//              if low ->  yield - (-yield * 50 / 100)
//              if medium -> yield (nothing changes)
describe("8. getTotalProfit with Environmental factors", () => {
    test(`8A. Calculate profit for multiple crops (With SINGLE environmental factor).`, ()=>{
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
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            cost: 1.00,
            salePrice: 1.65,
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
            { crop: pumpkin, factors: environmentFactors, numCrops: 10 },
        ];

        /* corn yield plant -> will be 4.5 (with sun high)
            corn total yield => 4.5 * 5 =  22.5
            total revenue corn => 22.5  * 1.10 =  24.75
            total cost corn => 0.80 * 22.50 = 18
            total profit corn => 24.75 - 18 = 6.75
            -----------------------------------------------------
        /* pumpkin yield plant-> will be 6  (with sun high)
            pumpkin total yield (yield plant * numCrops) => 6 * 10 =  60
            total revenue pumpkin (total yield * saleprice plant)=> 60  * 1.65 =  99
            total cost pumpkin (total yield * cost plant) => 60 * 1.00 = 60.00
            total profit pumpkin (total revenue - total cost) => 99 - 60 = 39
            -------------------------------------------------------
            total profit all crops:  
                6.75 (total profit corn) + 39 (total profit pumpkin) = 45.75
        */
        expect(getTotalProfit({ crops })).toBe(45.75);

    });
    test(`8B. Calculate profit for multiple crops (With MULTIPLE environmental factors).`, ()=>
    {
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
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            cost: 1.00,
            salePrice: 1.65,
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
            { crop: corn, factors: environmentFactors, numCrops: 5 },
            { crop: pumpkin, factors: environmentFactors, numCrops: 10 },
        ];
        
        /* 
        corn yield plant -> will be 3.15 with (sun: "high" and wind: "medium")
            corn total yield (yield plant * numCrops) => 3.15 * 5 =  15.75
            total revenue corn (total yield * saleprice plant) => 15.75  * 1.10 =  17.325
            total cost corn (total yield * cost plant) => 15.75 * 0.80 = 12.6
            total profit corn (total revenue - total cost) => 17.325 - 12.6 = 4.725
            -----------------------------------------------------
        /* pumpkin yield plant-> will be 4.2 (sun: "high" and wind: "medium")
            pumpkin total yield (yield plant * numCrops) => 4.2 * 10 =  42
            total revenue pumpkin (total yield * saleprice plant)=> 42  * 1.65 =  69.3
            total cost pumpkin (total yield * cost plant) => 42 * 1.00 = 42.00
            total profit pumpkin (total revenue - total cost) => 69.3 - 42 = 27.3
            -------------------------------------------------------
            total profit all crops:  
                4.725 (total profit corn) + 27.3 (total profit pumpkin) = 32.025 (= 32.03)
         */
        expect(getTotalProfit({ crops })).toBe(32.03);

    });
    test(`Testing If the the factor that doesn't apply to a plant, gets ignored for that plant.`, ()=>
    {
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
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            cost: 1.00,
            salePrice: 1.65,
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
            { crop: corn, factors: environmentFactors, numCrops: 5 },
            { crop: pumpkin, factors: environmentFactors, numCrops: 10 },
        ];
        
        /* 
        corn yield plant -> will be 3.15 with (sun: "high" and wind: "medium")
            corn total yield (yield plant * numCrops) => 3.15 * 5 =  15.75
            total revenue corn (total yield * saleprice plant) => 15.75  * 1.10 =  17.325
            total cost corn (total yield * cost plant) => 15.75 * 0.80 = 12.6
            total profit corn (total revenue - total cost) => 17.325 - 12.6 = 4.725
            -----------------------------------------------------
        /* pumpkin yield plant-> will be 4.2 (sun: "high" and wind: "medium")
            pumpkin total yield (yield plant * numCrops) => 4.2 * 10 =  42
            total revenue pumpkin (total yield * saleprice plant)=> 42  * 1.65 =  69.3
            total cost pumpkin (total yield * cost plant) => 42 * 1.00 = 42.00
            total profit pumpkin (total revenue - total cost) => 69.3 - 42 = 27.3
            -------------------------------------------------------
            total profit all crops:  
                4.725 (total profit corn) + 27.3 (total profit pumpkin) = 32.025 (= 32.03)
         */
        expect(getTotalProfit({ crops })).toBe(32.03);

    });
});
