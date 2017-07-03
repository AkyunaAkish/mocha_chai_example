module.exports = (amount) => {
    if (typeof amount !== 'string' && typeof amount !== 'number') {
        return amount;
    }
    return Math.round(100 * parseFloat(typeof amount === 'string' ? amount.replace(/[$,]/g, '') : amount));
};
