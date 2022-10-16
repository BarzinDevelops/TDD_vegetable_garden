const log = console.log // own preference for short command of console.log()
//this also stops someone scrolling back and viewing sensitive data that may have been logged
process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
console.clear();
// ----------------------------------------------------------------------------//



const { getYieldForPlant, 
        getYieldForCrop, 
        getTotalYield, 
        getCostsForCrop, 
        getRevenueForCrop,
        getProfitForCrop,
        getTotalProfit
} = require("./farm");

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



