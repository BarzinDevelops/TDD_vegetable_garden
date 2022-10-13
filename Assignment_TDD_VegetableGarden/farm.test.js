const log = console.log // own preference for short command of console.log()
// ----------------------------------------------------------------------------//

const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop } = require("./farm");

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
/* describe("getCostsForCrop", () => {
    test("Calculate the cost of crop.", () => {
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
    test("Calculate the cost of different crops.", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 0.80
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
            { crop: corn, numCrops: 5 },
            { crop: peas, numCrops: 2 },
            { crop: lettuce, numCrops: 7 },
        ];
        expect(getCostsForCrop({crops})).toBe(21.03);
    });
    test("Calculate the cost of different crops with price set to null.", () => {
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
}); */

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
        expect(getRevenueForCrop({crops})).toBe(12);
    });
  /*   test("Calculate the cost of different crops.", () => {
        const corn = {
            name: "corn",
            yield: 3,
            price: 0.80
        };
        const peas = {
            name: "Peas",
            yield: 2,
            price: 1.12
        };
        const lettuce = {
            name: "Lettuce",
            yield: 1,
            price: 0.65
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: peas, numCrops: 2 },
            { crop: lettuce, numCrops: 7 },
        ];
        expect(getCostsForCrop({crops})).toBe(21.03);
    });
    test("Calculate the cost of different crops with price set to null.", () => {
        const corn = {
            name: "corn",
            yield: 3,
            price: null
        };
        const crops = [
            { crop: corn, numCrops: 5 },
        ];
        expect(getCostsForCrop({crops})).toBe(0);
    }); */
    
});

