let expect = require('chai').expect;
let _ = require('lodash');

let chunk_payments = require('../online_payments/chunk_payments.js');
let bans_to_be_charged = require('../online_payments/data/bans_to_be_charged.js');
let chunked_bans_to_be_charged = require('../online_payments/data/chunked_bans_to_be_charged.js');

describe('Online Payments', () => {

    it('Breaks up charges into parts', () => {
        let itemsAreInArr = _.reduce(chunk_payments(bans_to_be_charged), (finalArr, charge) => {
            let isInArr = false;

            _.each(chunked_bans_to_be_charged, (compare) => {
                if (_.isEqual(charge, compare)) {
                    isInArr = true;
                }
            });

            finalArr.push(isInArr);

            return finalArr;
        }, []);


        expect(_.every(itemsAreInArr)).to.eq(true);
    });
});
