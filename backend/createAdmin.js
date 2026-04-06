const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        const existingAdmin = await User.findOne({ email: 'admin@omvik.com' });
        if (existingAdmin) {
            console.log('Admin already exists! You can log in with: admin@omvik.com / admin');
            process.exit(0);
        }

        await User.create({
            name: 'OMVIK Admin',
            email: 'admin@omvik.com',
            password: 'admin',
            role: 'admin'
        });

        console.log('Admin user created successfully! You can log in with: admin@omvik.com / admin');
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
