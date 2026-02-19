/**
 * Multiply variable number of arguments
 */
const multiplyAll = (...numbers) => {

    if (!numbers.length)
        throw new Error("Provide at least one number");

    if (!numbers.every(Number.isFinite))
        throw new TypeError("All inputs must be numbers");

    return numbers.reduce((acc, num) => acc * num, 1);
};

// Test multiply function
console.log("Multiply Test:", multiplyAll(2,3,4));
