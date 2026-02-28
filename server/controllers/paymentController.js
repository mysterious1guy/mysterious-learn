const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

exports.createCheckoutSession = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id; // From authMiddleware (protect)

        if (courseId !== 'network-fondamentaux-reseaux') {
            return res.status(400).json({ message: 'Seul le cours Base Réseaux est actuellement disponible à l\'achat.' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Premium: Base Réseaux',
                            description: 'Débloquer l\'accès complet au cours Base Réseaux',
                            images: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop'],
                        },
                        unit_amount: 100, // 1.00 EUR
                    },
                    quantity: 1,
                },
            ],
            client_reference_id: userId.toString(),
            metadata: {
                userId: userId.toString(),
                courseId: courseId,
            },
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/learning-path?payment=success&course=${courseId}`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/learning-path?payment=cancel`,
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Erreur de création de session Stripe:', error);
        res.status(500).json({ message: 'Erreur lors de la création de la session de paiement.' });
    }
};

exports.webhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        // req.body is a Buffer since we pass it through express.raw
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`⚠️  Erreur de validation webhook Stripe.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const { userId, courseId } = session.metadata;

        if (userId && courseId) {
            try {
                await User.findByIdAndUpdate(userId, {
                    $addToSet: { unlockedCourses: courseId }
                });
                console.log(`✅ Paiement validé: le cours ${courseId} a été débloqué pour l'utilisateur ${userId}`);
            } catch (dbError) {
                console.error('Erreur d\'ajout du cours à l\'utilisateur:', dbError);
            }
        }
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send();
};
