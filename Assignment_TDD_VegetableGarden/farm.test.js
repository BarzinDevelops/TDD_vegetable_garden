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

// 3. calculate the profit for a crop (without environmental factors). Calculation-> (revenue - cost)
/* describe("getProfitForCrop", ()=>{
    test(`Testing profit for one crop (without environmental factors)`, ()=>{
        const corn = {
            "name": "corn", 
            yield: 3,
            cost: 0.80,
            salePrice: 1.10,
          };
        const peas = {
            name: "Peas",
            yield: 2,
            cost: 1.12
        };
        const lettuce = {
            name: "Lettuce",
            yield: 1,
            cost: 0.65
        };
        const crops = [
          { crop: corn, numCrops: 2 },   //(2x3= 6 * )
          { crop: peas, numCrops: 2 },
          { crop: lettuce, numCrops: 2 },
        ];
        
          expect(getProfitForCrop({crops})).toBe(1.80)
        });
}); */

