const mongoose = require('mongoose');
const User = require('./models/User');

const connectDB = async () => {
    try {
        // Hardcoded for reliability in this specific script as per instructions
        // Using 127.0.0.1 to avoid ipv6 issues
        await mongoose.connect('mongodb://127.0.0.1:27017/mysterious-learn');
        console.log('MongoDB connecté');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const resetUsers = async () => {
    await connectDB();
    try {
        await User.deleteMany({});
        console.log('Tous les utilisateurs ont été supprimés avec succès.');
    } catch (err) {
        console.error('Erreur lors de la suppression des utilisateurs :', err);
    } finally {
        mongoose.connection.close();
        process.exit();
    }
};

resetUsers();
