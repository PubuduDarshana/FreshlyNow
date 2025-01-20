const stripe = require('stripe')('your_stripe_secret_key'); // Replace with your secret key

exports.createPaymentIntent = async (req, res) => {
    try {
        const { totalAmount } = req.body; // Total amount for the order

        // Create a PaymentIntent with the amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100,  // Convert to cents (e.g., 5000 => $50)
            currency: 'usd',  // Use the correct currency for your region
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create payment intent' });
    }
};
