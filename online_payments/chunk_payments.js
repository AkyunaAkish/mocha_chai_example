let dollars_to_cents = require('./helpers/dollars_to_cents.js');
let _ = require('lodash');

module.exports = (BANsToBeCharged) => {
    let maximum = dollars_to_cents(500000);

    let packagedArr = _.reduce(BANsToBeCharged, (finalArr, BAN) => {
        let amount_in_cents = dollars_to_cents(BAN.total_outstanding_balance__c);

        if (amount_in_cents <= maximum) {
            finalArr.push({
                charge: {
                    amount: dollars_to_cents(BAN.total_outstanding_balance__c),
                    currency: BAN.currencyisocode.toLowerCase(),
                    description: `Charge for billing account  ${BAN.billing_account_number__c}`,
                    receipt_email: BAN.customer_email,
                    customer: BAN.customer_stripe_id,
                    source: BAN.autopay_source_id,
                    metadata: {
                        auto_payment: true,
                        ban: BAN.sf_ban,
                        stripe_customer_PSQL_id: BAN.customer_id,
                        sf_contact_id: BAN.customer_contact_id || `unknown`,
                        email: BAN.customer_email || `unknown`
                    }
                },
                type: BAN.autopay_source_type
            });
        } else {
            let amounts_to_charge = [];

            while (amount_in_cents > 0) {
                if (amount_in_cents > maximum) {
                    amounts_to_charge.push({
                        amt: maximum
                    });
                    amount_in_cents -= maximum;
                } else if (amount_in_cents === maximum) {
                    amounts_to_charge.push({
                        amt: maximum
                    });
                    amount_in_cents -= maximum;
                } else if (amount_in_cents < maximum) {
                    amounts_to_charge.push({
                        amt: amount_in_cents
                    });
                    amount_in_cents -= amount_in_cents;
                }
            }

            _.each(amounts_to_charge, (charge) => {
                finalArr.push({
                    charge: {
                        amount: charge.amt,
                        currency: BAN.currencyisocode.toLowerCase(),
                        description: `Charge for billing account  ${BAN.billing_account_number__c}`,
                        receipt_email: BAN.customer_email,
                        customer: BAN.customer_stripe_id,
                        source: BAN.autopay_source_id,
                        metadata: {
                            auto_payment: true,
                            ban: BAN.sf_ban,
                            stripe_customer_PSQL_id: BAN.customer_id,
                            sf_contact_id: BAN.customer_contact_id || `unknown`,
                            email: BAN.customer_email || `unknown`
                        }
                    },
                    type: BAN.autopay_source_type
                });
            });
        }

        return finalArr;

    }, []);

    return packagedArr;
}
