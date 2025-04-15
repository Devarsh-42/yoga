const fs = require('fs');
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection URI 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@krushnampriya-yog.31aeypu.mongodb.net/?retryWrites=true&w=majority&appName=krushnampriya-yog`;

const client = new MongoClient(uri);

async function importData() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    // Select database and collections
    const database = client.db("krushnampriya-yog");
    const userCollection = database.collection("users");
    const classesCollection = database.collection("classes");
    const cartCollection = database.collection("cart");
    const enrolledCollection = database.collection("enrolled");
    const paymentCollection = database.collection("payments");
    const herbalCollection = database.collection("herbals");
    const therapyCollection = database.collection("therapies");
    
    // Read JSON files
    const usersData = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
    const classesData = JSON.parse(fs.readFileSync('./classes.json', 'utf8'));
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8')); // for cart, enrolled, payments
    const herbalsData = JSON.parse(fs.readFileSync('./herbal.json', 'utf8'));
    const therapiesData = JSON.parse(fs.readFileSync('./therapy.json', 'utf8'));

    // Import users
    if (usersData && usersData.length > 0) {
      const users = usersData.map(user => {
        if (user._id && typeof user._id === 'string') {
          user._id = new ObjectId(user._id);
        }
        return user;
      });
      const result = await userCollection.insertMany(users);
      console.log(`👤 ${result.insertedCount} users imported successfully`);
    }

    // Import classes
    if (classesData && classesData.length > 0) {
      const classes = classesData.map(classItem => {
        if (classItem._id && typeof classItem._id === 'string') {
          classItem._id = new ObjectId(classItem._id);
        }
        if (classItem.availableSeats && typeof classItem.availableSeats === 'string') {
          classItem.availableSeats = parseInt(classItem.availableSeats);
        }
        if (classItem.totalEnrolled && typeof classItem.totalEnrolled === 'string') {
          classItem.totalEnrolled = parseInt(classItem.totalEnrolled);
        }
        return classItem;
      });
      const result = await classesCollection.insertMany(classes);
      console.log(`🧘 ${result.insertedCount} classes imported successfully`);
    }

    // Import cart items
    if (data.cart && data.cart.length > 0) {
      const cartItems = data.cart.map(item => {
        if (item._id && typeof item._id === 'string') {
          item._id = new ObjectId(item._id);
        }
        return item;
      });
      const result = await cartCollection.insertMany(cartItems);
      console.log(`🛒 ${result.insertedCount} cart items imported successfully`);
    }

    // Import enrolled data
    if (data.enrolled && data.enrolled.length > 0) {
      const enrolledData = data.enrolled.map(item => {
        if (item._id && typeof item._id === 'string') {
          item._id = new ObjectId(item._id);
        }
        if (item.classesId && Array.isArray(item.classesId)) {
          item.classesId = item.classesId.map(classIdObj => {
            const index = Object.keys(classIdObj)[0];
            const value = classIdObj[index];
            return new ObjectId(value);
          });
        }
        return item;
      });
      const result = await enrolledCollection.insertMany(enrolledData);
      console.log(`📚 ${result.insertedCount} enrolled records imported successfully`);
    }

    // Import payment data
    if (data.payments && data.payments.length > 0) {
      const paymentData = data.payments.map(payment => {
        if (payment._id && typeof payment._id === 'string') {
          payment._id = new ObjectId(payment._id);
        }
        if (payment.classesId && Array.isArray(payment.classesId)) {
          payment.classesId = payment.classesId.map(classIdObj => {
            const index = Object.keys(classIdObj)[0];
            const value = classIdObj[index];
            return new ObjectId(value);
          });
        }
        if (payment.date && typeof payment.date === 'string') {
          payment.date = new Date(payment.date);
        }
        return payment;
      });
      const result = await paymentCollection.insertMany(paymentData);
      console.log(`💳 ${result.insertedCount} payment records imported successfully`);
    }

    // Import herbal data
    if (herbalsData && herbalsData.length > 0) {
      const herbalItems = herbalsData.map(item => {
        if (item._id && typeof item._id === 'string') {
          item._id = new ObjectId(item._id);
        }
        // Make sure quantity is a number
        if (item.quantity && typeof item.quantity === 'string') {
          item.quantity = parseInt(item.quantity);
        }
        // Make sure price is a number
        if (item.price && typeof item.price === 'string') {
          item.price = parseFloat(item.price);
        }
        return item;
      });
      const result = await herbalCollection.insertMany(herbalItems);
      console.log(`🌿 ${result.insertedCount} herbal products imported successfully`);
    }

    // Import therapy data
    if (therapiesData && therapiesData.length > 0) {
      const therapyItems = therapiesData.map(item => {
        if (item._id && typeof item._id === 'string') {
          item._id = new ObjectId(item._id);
        }
        // Make sure price is a number
        if (item.price && typeof item.price === 'string') {
          item.price = parseFloat(item.price);
        }
        // Make sure duration is a number
        if (item.duration && typeof item.duration === 'string') {
          item.duration = parseInt(item.duration);
        }
        return item;
      });
      const result = await therapyCollection.insertMany(therapyItems);
      console.log(`🧠 ${result.insertedCount} therapy services imported successfully`);
    }

    console.log('🎉 Data import completed successfully');
  } catch (error) {
    console.error('❌ Error importing data:', error);
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

importData();

// const fs = require('fs');
// require('dotenv').config();
// const { MongoClient, ObjectId } = require('mongodb');

// // MongoDB connection URI 
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@krushnampriya-yog.31aeypu.mongodb.net/?retryWrites=true&w=majority&appName=krushnampriya-yog`;

// const client = new MongoClient(uri);

// async function importData() {
//   try {
//     // Connect to MongoDB
//     await client.connect();
//     console.log('✅ Connected to MongoDB');
    
//     // Select database and collections
//     const database = client.db("krushnampriya-yog");
//     const userCollection = database.collection("users");
//     const classesCollection = database.collection("classes");
//     const cartCollection = database.collection("cart");
//     const enrolledCollection = database.collection("enrolled");
//     const paymentCollection = database.collection("payments");
    
//     // Read JSON files
//     const usersData = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
//     const classesData = JSON.parse(fs.readFileSync('./classes.json', 'utf8'));
//     const data = JSON.parse(fs.readFileSync('./data.json', 'utf8')); // for cart, enrolled, payments

//     // Import users
//     if (usersData && usersData.length > 0) {
//       const users = usersData.map(user => {
//         if (user._id && typeof user._id === 'string') {
//           user._id = new ObjectId(user._id);
//         }
//         return user;
//       });
//       const result = await userCollection.insertMany(users);
//       console.log(`👤 ${result.insertedCount} users imported successfully`);
//     }

//     // Import classes
//     if (classesData && classesData.length > 0) {
//       const classes = classesData.map(classItem => {
//         if (classItem._id && typeof classItem._id === 'string') {
//           classItem._id = new ObjectId(classItem._id);
//         }
//         if (classItem.availableSeats && typeof classItem.availableSeats === 'string') {
//           classItem.availableSeats = parseInt(classItem.availableSeats);
//         }
//         if (classItem.totalEnrolled && typeof classItem.totalEnrolled === 'string') {
//           classItem.totalEnrolled = parseInt(classItem.totalEnrolled);
//         }
//         return classItem;
//       });
//       const result = await classesCollection.insertMany(classes);
//       console.log(`🧘 ${result.insertedCount} classes imported successfully`);
//     }

//     // Import cart items
//     if (data.cart && data.cart.length > 0) {
//       const cartItems = data.cart.map(item => {
//         if (item._id && typeof item._id === 'string') {
//           item._id = new ObjectId(item._id);
//         }
//         return item;
//       });
//       const result = await cartCollection.insertMany(cartItems);
//       console.log(`🛒 ${result.insertedCount} cart items imported successfully`);
//     }

//     // Import enrolled data
//     if (data.enrolled && data.enrolled.length > 0) {
//       const enrolledData = data.enrolled.map(item => {
//         if (item._id && typeof item._id === 'string') {
//           item._id = new ObjectId(item._id);
//         }
//         if (item.classesId && Array.isArray(item.classesId)) {
//           item.classesId = item.classesId.map(classIdObj => {
//             const index = Object.keys(classIdObj)[0];
//             const value = classIdObj[index];
//             return new ObjectId(value);
//           });
//         }
//         return item;
//       });
//       const result = await enrolledCollection.insertMany(enrolledData);
//       console.log(`📚 ${result.insertedCount} enrolled records imported successfully`);
//     }

//     // Import payment data
//     if (data.payments && data.payments.length > 0) {
//       const paymentData = data.payments.map(payment => {
//         if (payment._id && typeof payment._id === 'string') {
//           payment._id = new ObjectId(payment._id);
//         }
//         if (payment.classesId && Array.isArray(payment.classesId)) {
//           payment.classesId = payment.classesId.map(classIdObj => {
//             const index = Object.keys(classIdObj)[0];
//             const value = classIdObj[index];
//             return new ObjectId(value);
//           });
//         }
//         if (payment.date && typeof payment.date === 'string') {
//           payment.date = new Date(payment.date);
//         }
//         return payment;
//       });
//       const result = await paymentCollection.insertMany(paymentData);
//       console.log(`💳 ${result.insertedCount} payment records imported successfully`);
//     }

//     console.log('🎉 Data import completed successfully');
//   } catch (error) {
//     console.error('❌ Error importing data:', error);
//   } finally {
//     await client.close();
//     console.log('🔌 MongoDB connection closed');
//   }
// }

// importData();
