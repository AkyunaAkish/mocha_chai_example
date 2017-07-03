let dollars_to_cents = require('../helpers/dollars_to_cents.js');

module.exports = [{
        charge: {
            amount: dollars_to_cents(500000),
            currency: 'usd',
            description: 'Charge for billing account  86659',
            receipt_email: 'akyuna.akish@zayo.com',
            customer: 111,
            source: 999,
            metadata: {
                auto_payment: true,
                ban: 86659,
                stripe_customer_PSQL_id: 8989,
                sf_contact_id: 22,
                email: 'akyuna.akish@zayo.com'
            }
        },
        type: 'card'
    },
    {
        charge: {
            amount: dollars_to_cents(500000),
            currency: 'usd',
            description: 'Charge for billing account  86659',
            receipt_email: 'akyuna.akish@zayo.com',
            customer: 111,
            source: 999,
            metadata: {
                auto_payment: true,
                ban: 86659,
                stripe_customer_PSQL_id: 8989,
                sf_contact_id: 22,
                email: 'akyuna.akish@zayo.com'
            }
        },
        type: 'card'
    },
    {
        charge: {
            amount: dollars_to_cents(100000),
            currency: 'usd',
            description: 'Charge for billing account  86659',
            receipt_email: 'akyuna.akish@zayo.com',
            customer: 111,
            source: 999,
            metadata: {
                auto_payment: true,
                ban: 86659,
                stripe_customer_PSQL_id: 8989,
                sf_contact_id: 22,
                email: 'akyuna.akish@zayo.com'
            }
        },
        type: 'card'
    }];
