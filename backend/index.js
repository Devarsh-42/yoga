const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const crypto = require('crypto');
// razor pay integration:
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});
// Middleware
app.use(cors());
app.use(express.json());

// solving cors related issue
// Add this to your server.js or index.js

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Routes
// SET TOKEN .
const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'Unauthorize access' })
    }
    const token = authorization?.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ error: true, message: 'forbidden user or token has expired' })
        }
        req.decoded = decoded;
        next()
    })
}

// MONGO DB ROUTES connection. saved data in .env
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@krushnampriya-yog.31aeypu.mongodb.net/?retryWrites=true&w=majority&appName=krushnampriya-yog`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const database = client.db("krushnampriya-yog");
        const userCollection = database.collection("users");
        const classesCollection = database.collection("classes");
        const cartCollection = database.collection("cart");
        const enrolledCollection = database.collection("enrolled");
        const paymentCollection = database.collection("payments");
        const appliedCollection = database.collection("applied");
        // PHASE2 CHANGES
        const therapyCollection = database.collection("therapies");
        const herbalProductsCollection = database.collection("herbals");
        //client.connect();

        // Verify admin
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            if (user.role === 'admin') {
                next()
            }
            else {
                return res.status(401).send({ error: true, message: 'Unauthorize access' })
            }
        }

        const verifyInstructor = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            if (user.role === 'instructor' || user.role === 'admin') {
                next()
            }
            else {
                return res.status(401).send({ error: true, message: 'Unauthorize access' })
            }
        }


        app.post('/new-user', async (req, res) => {
            const newUser = req.body;

            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })
        app.post('/api/set-token', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: '24h' })
            res.send({ token })
        })


        // GET ALL USERS
        app.get('/users', async (req, res) => {
            const users = await userCollection.find({}).toArray();
            res.send(users);
        })
        // GET USER BY ID
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ message: 'Invalid ID format' });
            }
            const query = { _id: new ObjectId(id) };
            const user = await userCollection.findOne(query);
            res.send(user);
        })
        // GET USER BY EMAIL
        app.get('/user/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await userCollection.findOne(query);
            res.send(result);
        })
        // Delete a user

        app.delete('/delete-user/:id', verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
        // UPDATE USER
        app.put('/update-user/:id', verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.option,
                    address: updatedUser.address,
                    phone: updatedUser.phone,
                    about: updatedUser.about,
                    photoUrl: updatedUser.photoUrl,
                    skills: updatedUser.skills ? updatedUser.skills : null,
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })


        // ! CLASSES ROUTES


        app.post('/new-class', verifyJWT, verifyInstructor, async (req, res) => {
            const newClass = req.body;
            newClass.availableSeats = parseInt(newClass.availableSeats)
            const result = await classesCollection.insertOne(newClass);
            res.send(result);
        });

        // GET ALL CLASSES ADDED BY INSTRUCTOR
        app.get('/classes/:email', verifyJWT, verifyInstructor, async (req, res) => {
            const email = req.params.email;
            const query = { instructorEmail: email };
            const result = await classesCollection.find(query).toArray();
            res.send(result);
        })

        // GET ALL CLASSES
        app.get('/classes', async (req, res) => {
            const query = { status: 'approved' };
            const result = await classesCollection.find(query).toArray();
            res.send(result);
        })
        app.get('/classes-manage', async (req, res) => {
            const result = await classesCollection.find().toArray();
            res.send(result);
        })

        // Change status of a class
        app.put('/change-status/:id', verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const status = req.body.status;
            console.log(req.body)
            const reason = req.body.reason;
            const filter = { _id: new ObjectId(id) };
            console.log("🚀 ~ file: index.js:180 ~ app.put ~ reason:", reason)
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: status,
                    reason: reason
                }
            }
            const result = await classesCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        // * GET APPROVED CLASSES
        app.get('/approved-classes', async (req, res) => {
            const query = { status: 'approved' };
            const result = await classesCollection.find(query).toArray();
            res.send(result);
        })

        // GET ALL INSTRUCTORS
        app.get('/instructors', async (req, res) => {
            const query = { role: 'instructor' };
            const result = await userCollection.find(query).toArray();
            res.send(result);
        })

        // Update a class
        app.put('/update-class/:id', verifyJWT, verifyInstructor, async (req, res) => {
            const id = req.params.id;
            const updatedClass = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedClass.name,
                    description: updatedClass.description,
                    price: updatedClass.price,
                    availableSeats: parseInt(updatedClass.availableSeats),
                    videoLink: updatedClass.videoLink,
                    status: 'pending'
                }
            }
            const result = await classesCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })


        // Get single class by id for details page
        app.get('/class/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await classesCollection.findOne(query);
            res.send(result);
        })
            // ! THERAPY ROUTES

// GET ALL THERAPIES
app.get('/therapies', async (req, res) => {
    try {
        const result = await therapyCollection.find().toArray();
        res.send(result);
    } catch (error) {
        console.error("Error fetching therapies:", error);
        res.status(500).send({ error: true, message: "Failed to fetch therapies" });
    }
});

// GET THERAPY BY ID
app.get('/therapies/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid ID format' });
        }
        const query = { _id: new ObjectId(id) };
        const result = await therapyCollection.findOne(query);
        res.send(result);
    } catch (error) {
        console.error("Error fetching therapy:", error);
        res.status(500).send({ error: true, message: "Failed to fetch therapy" });
    }
});

// ADD NEW THERAPY (for admin)
app.post('/therapies', verifyJWT, verifyAdmin, async (req, res) => {
    try {
        const newTherapy = req.body;
        const result = await therapyCollection.insertOne(newTherapy);
        res.send(result);
    } catch (error) {
        console.error("Error adding therapy:", error);
        res.status(500).send({ error: true, message: "Failed to add therapy" });
    }
});

// UPDATE THERAPY
app.put('/therapies/:id', verifyJWT, verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedTherapy = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
            $set: updatedTherapy
        };
        const result = await therapyCollection.updateOne(filter, updateDoc, options);
        res.send(result);
    } catch (error) {
        console.error("Error updating therapy:", error);
        res.status(500).send({ error: true, message: "Failed to update therapy" });
    }
});

// DELETE THERAPY
app.delete('/therapies/:id', verifyJWT, verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await therapyCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        console.error("Error deleting therapy:", error);
        res.status(500).send({ error: true, message: "Failed to delete therapy" });
    }
});

// ! HERBAL PRODUCTS ROUTES

// GET ALL HERBAL PRODUCTS
app.get('/herbal_products', async (req, res) => {
    try {
        const result = await herbalProductsCollection.find().toArray();
        res.send(result);
    } catch (error) {
        console.error("Error fetching herbal products:", error);
        res.status(500).send({ error: true, message: "Failed to fetch herbal products" });
    }
});

// GET HERBAL PRODUCT BY ID
app.get('/herbal_products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid ID format' });
        }
        const query = { _id: new ObjectId(id) };
        const result = await herbalProductsCollection.findOne(query);
        res.send(result);
    } catch (error) {
        console.error("Error fetching herbal product:", error);
        res.status(500).send({ error: true, message: "Failed to fetch herbal product" });
    }
});

// ADD NEW HERBAL PRODUCT (for admin)
app.post('/herbal_products', verifyJWT, verifyAdmin, async (req, res) => {
    try {
        const newProduct = req.body;
        const result = await herbalProductsCollection.insertOne(newProduct);
        res.send(result);
    } catch (error) {
        console.error("Error adding herbal product:", error);
        res.status(500).send({ error: true, message: "Failed to add herbal product" });
    }
});

// UPDATE HERBAL PRODUCT
app.put('/herbal_products/:id', verifyJWT, verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProduct = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
            $set: updatedProduct
        };
        const result = await herbalProductsCollection.updateOne(filter, updateDoc, options);
        res.send(result);
    } catch (error) {
        console.error("Error updating herbal product:", error);
        res.status(500).send({ error: true, message: "Failed to update herbal product" });
    }
});

// DELETE HERBAL PRODUCT
app.delete('/herbal_products/:id', verifyJWT, verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await herbalProductsCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        console.error("Error deleting herbal product:", error);
        res.status(500).send({ error: true, message: "Failed to delete herbal product" });
    }
});
        // ! CART ROUTES

        // ADD TO CART
        app.post('/add-to-cart', verifyJWT, async (req, res) => {
            const newCartItem = req.body;
            const result = await cartCollection.insertOne(newCartItem);
            res.send(result);
        })
        // Get cart item id for checking if a class is already in cart
        app.get('/cart-item/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const email = req.query.email;
            const query = { classId: id, userMail: email };
            const projection = { classId: 1 };
            const result = await cartCollection.findOne(query, { projection: projection });
            res.send(result);
        })

        app.get('/cart/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            const query = { userMail: email };
            const projection = { classId: 1 };
            const carts = await cartCollection.find(query, { projection: projection }).toArray();
            const classIds = carts.map(cart => new ObjectId(cart.classId));
            const query2 = { _id: { $in: classIds } };
            const result = await classesCollection.find(query2).toArray();
            res.send(result);
        })

        // Delete a item form cart
        app.delete('/delete-cart-item/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const query = { classId: id };
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        })
   //  PAYMENT ROUTES

    app.post('/create-payment-intent', verifyJWT, async (req, res) => {
    try {
        const { price } = req.body;
        const amount = parseInt(price);
        
        // Razorpay expects amount in smallest currency unit (paise for INR)
        // So multiply by 100 if your price is in rupees
        const options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",       // or your preferred currency
            receipt: "order_rcptid_" + Date.now(),
            payment_capture: 1     // auto capture
        };
        
        const order = await razorpay.orders.create(options);
        
        res.send({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).send({ error: 'Failed to create payment order' });
    }
});

app.post('/payment-info', verifyJWT, async (req, res) => {
    const paymentInfo = req.body;
    
    // Update these fields to match Razorpay's response structure
    // Razorpay uses different field names for the transaction details
    const classesId = paymentInfo.classesId;
    const userEmail = paymentInfo.userEmail;
    const singleClassId = req.query.classId;
    
    // Store Razorpay-specific payment details
    const razorpayPaymentInfo = {
        ...paymentInfo,
        // Rename transactionId to match Razorpay's payment_id
        transactionId: paymentInfo.razorpay_payment_id,
        // Add other Razorpay-specific fields
        razorpay_order_id: paymentInfo.razorpay_order_id,
        razorpay_signature: paymentInfo.razorpay_signature,
        // Keep your existing fields
        userEmail: paymentInfo.userEmail,
        classesId: paymentInfo.classesId,
        price: paymentInfo.price,
        date: paymentInfo.date || new Date()
    };
    
    let query;
    if (singleClassId) {
        query = { classId: singleClassId, userMail: userEmail };
    } else {
        query = { classId: { $in: classesId } };
    }
    
    const classesQuery = { _id: { $in: classesId.map(id => new ObjectId(id)) } }
    const classes = await classesCollection.find(classesQuery).toArray();
    
    const newEnrolledData = {
        userEmail: userEmail,
        classesId: classesId.map(id => new ObjectId(id)),
        transactionId: razorpayPaymentInfo.transactionId,
    }
    
    const updatedDoc = {
        $set: {
            totalEnrolled: classes.reduce((total, current) => total + (current.totalEnrolled || 0), 0) + 1,
            availableSeats: classes.reduce((total, current) => total + current.availableSeats, 0) - 1 || 0,
        }
    }
    
    try {
        const updatedResult = await classesCollection.updateMany(classesQuery, updatedDoc, { upsert: true });
        const enrolledResult = await enrolledCollection.insertOne(newEnrolledData);
        const deletedResult = await cartCollection.deleteMany(query);
        const paymentResult = await paymentCollection.insertOne(razorpayPaymentInfo);
        
        res.send({ 
            success: true,
            paymentResult, 
            deletedResult, 
            enrolledResult, 
            updatedResult 
        });
    } catch (error) {
        console.error("Payment processing error:", error);
        res.status(500).send({ 
            success: false, 
            message: "Failed to process payment information",
            error: error.message
        });
    }
});

// TRENDING ROUTES
// Get trending classes based on enrollment count
app.get('/trending/classes', async (req, res) => {
    try {
      // Find classes and sort by totalEnrolled in descending order
      const trendingClasses = await classesCollection
        .find({ status: 'approved' })
        .sort({ totalEnrolled: -1 })
        .limit(6)
        .toArray();
      
      res.status(200).json(trendingClasses);
    } catch (error) {
      console.error('Error fetching trending classes:', error);
      res.status(500).json({ message: 'Failed to fetch trending classes', error: error.message });
    }
  });
  
  // Get trending instructors based on student count and classes
  app.get('/trending/instructors', async (req, res) => {
    try {
      // First get instructors
      const instructors = await userCollection
        .find({ role: 'instructor' })
        .toArray();
      
      // For each instructor, calculate their popularity metrics
      const instructorPromises = instructors.map(async (instructor) => {
        // Get classes by this instructor
        const instructorClasses = await classesCollection
          .find({ instructorEmail: instructor.email })
          .toArray();
        
        // Calculate total students enrolled in this instructor's classes
        const classIds = instructorClasses.map(cls => cls._id);
        
        let totalStudents = 0;
        if (classIds.length > 0) {
          // Get all enrolled records that contain any of this instructor's classes
          const enrollments = await enrolledCollection.find({
            'classesId': { $elemMatch: { $in: classIds } }
          }).toArray();
          
          totalStudents = enrollments.length;
        }
        
        return {
          ...instructor,
          totalClasses: instructorClasses.length,
          totalStudents: totalStudents,
          // Calculate popularity score based on student count and class count
          popularityScore: (totalStudents * 3) + (instructorClasses.length * 1)
        };
      });
      
      // Resolve all instructor promises
      const instructorsWithMetrics = await Promise.all(instructorPromises);
      
      // Sort by popularity score and return top 8
      const trendingInstructors = instructorsWithMetrics
        .sort((a, b) => b.popularityScore - a.popularityScore)
        .slice(0, 8);
      
      res.status(200).json(trendingInstructors);
    } catch (error) {
      console.error('Error fetching trending instructors:', error);
      res.status(500).json({ message: 'Failed to fetch trending instructors', error: error.message });
    }
  });
  
  // Get trending herbal products
  app.get('/trending/herbals', async (req, res) => {
    try {
      // Get all herbal products
      const herbalProducts = await herbalProductsCollection.find({}).toArray();
      
      // For each product, calculate how many times it was purchased
      const herbalPromises = herbalProducts.map(async (product) => {
        // Count occurrences in cart
        const cartCount = await cartCollection.countDocuments({
          itemType: 'herbal',
          itemId: product._id.toString()
        });
        
        // Count occurrences in payments (actual purchases)
        const paymentCount = await paymentCollection.countDocuments({
          'items.itemType': 'herbal',
          'items.itemId': product._id.toString()
        });
        
        // Calculate popularity score (purchases are weighted more than cart additions)
        const soldCount = paymentCount;
        const popularityScore = (paymentCount * 5) + (cartCount * 1);
        
        return {
          ...product,
          soldCount,
          popularityScore
        };
      });
      
      // Resolve all herbal promises
      const herbalsWithMetrics = await Promise.all(herbalPromises);
      
      // Sort by popularity score and return top 8
      const trendingHerbals = herbalsWithMetrics
        .sort((a, b) => b.popularityScore - a.popularityScore)
        .slice(0, 8);
      
      res.status(200).json(trendingHerbals);
    } catch (error) {
      console.error('Error fetching trending herbals:', error);
      res.status(500).json({ message: 'Failed to fetch trending herbal products', error: error.message });
    }
  });
  
  // Get trending therapy services
  app.get('/trending/therapies', async (req, res) => {
    try {
      // Get all therapy services
      const therapyServices = await therapyCollection.find({}).toArray();
      
      // For each therapy, calculate booking count
      const therapyPromises = therapyServices.map(async (therapy) => {
        // Count bookings in payments
        const bookingCount = await paymentCollection.countDocuments({
          'items.itemType': 'therapy',
          'items.itemId': therapy._id.toString()
        });
        
        return {
          ...therapy,
          bookingCount,
          popularityScore: bookingCount
        };
      });
      
      // Resolve all therapy promises
      const therapiesWithMetrics = await Promise.all(therapyPromises);
      
      // Sort by booking count and return top 6
      const trendingTherapies = therapiesWithMetrics
        .sort((a, b) => b.popularityScore - a.popularityScore)
        .slice(0, 6);
      
      res.status(200).json(trendingTherapies);
    } catch (error) {
      console.error('Error fetching trending therapies:', error);
      res.status(500).json({ message: 'Failed to fetch trending therapy services', error: error.message });
    }
  });

app.post('/verify-payment', verifyJWT, async (req, res) => {
    try {
        const { paymentId, orderId, signature, cartItm } = req.body;
        const userEmail = req.user.email; // Assuming verifyJWT middleware sets req.user
        
        // Verify Razorpay signature
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(orderId + "|" + paymentId)
            .digest('hex');
            
        if (generatedSignature !== signature) {
            return res.status(400).send({
                success: false,
                message: 'Invalid payment signature'
            });
        }
        
        // Fetch payment details from Razorpay to get amount and other details
        const payment = await razorpay.payments.fetch(paymentId);
        
        // Prepare payment info for database
        const paymentInfo = {
            userEmail: userEmail,
            classesId: Array.isArray(cartItm) ? cartItm : [cartItm],
            razorpay_payment_id: paymentId,
            razorpay_order_id: orderId,
            razorpay_signature: signature,
            price: payment.amount / 100, // Convert from paise to rupees
            date: new Date(),
            status: payment.status
        };
        
        // Call your existing payment-info endpoint to process the payment
        const classesQuery = { _id: { $in: paymentInfo.classesId.map(id => new ObjectId(id)) } };
        const classes = await classesCollection.find(classesQuery).toArray();
        
        const newEnrolledData = {
            userEmail: paymentInfo.userEmail,
            classesId: paymentInfo.classesId.map(id => new ObjectId(id)),
            transactionId: paymentInfo.razorpay_payment_id,
        };
        
        const updatedDoc = {
            $set: {
                totalEnrolled: classes.reduce((total, current) => total + (current.totalEnrolled || 0), 0) + 1,
                availableSeats: classes.reduce((total, current) => total + current.availableSeats, 0) - 1 || 0,
            }
        };
        
        let query;
        if (paymentInfo.classesId.length === 1) {
            query = { classId: paymentInfo.classesId[0], userMail: paymentInfo.userEmail };
        } else {
            query = { classId: { $in: paymentInfo.classesId } };
        }
        
        // Process database operations
        const updatedResult = await classesCollection.updateMany(classesQuery, updatedDoc, { upsert: true });
        const enrolledResult = await enrolledCollection.insertOne(newEnrolledData);
        const deletedResult = await cartCollection.deleteMany(query);
        const paymentResult = await paymentCollection.insertOne(paymentInfo);
        
        res.send({ 
            success: true,
            paymentResult, 
            deletedResult, 
            enrolledResult, 
            updatedResult 
        });
        
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).send({ 
            success: false, 
            message: "Failed to verify payment",
            error: error.message
        });
    }
});


        app.get('/payment-history/:email', async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const result = await paymentCollection.find(query).sort({ date: -1 }).toArray();
            res.send(result);
        })


        app.get('/payment-history-length/:email', async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const total = await paymentCollection.countDocuments(query);
            res.send({ total });
        })


        // ! ENROLLED ROUTES

        app.get('/popular_classes', async (req, res) => {
            const result = await classesCollection.find().sort({ totalEnrolled: -1 }).limit(6).toArray();
            res.send(result);
        })
        app.get('/popular_therapies', async (req, res) => {
            const result = await therapyCollection.find().sort({ popularity: -1 }).limit(6).toArray();
            res.send(result);
        });
        
        app.get('/popular_herbal_products', async (req, res) => {
            const result = await herbalProductsCollection.find().sort({ sales: -1 }).limit(6).toArray();
            res.send(result);
        });


        app.get('/popular-instructors', async (req, res) => {
            const pipeline = [
                {
                    $group: {
                        _id: "$instructorEmail",
                        totalEnrolled: { $sum: "$totalEnrolled" },
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id",
                        foreignField: "email",
                        as: "instructor"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        instructor: {
                            $arrayElemAt: ["$instructor", 0]
                        },
                        totalEnrolled: 1
                    }
                },
                {
                    $sort: {
                        totalEnrolled: -1
                    }
                },
                {
                    $limit: 6
                }
            ]
            const result = await classesCollection.aggregate(pipeline).toArray();
            res.send(result);

        })

        // Admins stats 
        app.get('/admin-stats', verifyJWT, verifyAdmin, async (req, res) => {
            // Get approved classes and pending classes and instructors 
            const approvedClasses = (await classesCollection.find({ status: 'approved' }).toArray()).length;
            const pendingClasses = (await classesCollection.find({ status: 'pending' }).toArray()).length;
            const instructors = (await userCollection.find({ role: 'instructor' }).toArray()).length;
            const totalClasses = (await classesCollection.find().toArray()).length;
            const totalEnrolled = (await enrolledCollection.find().toArray()).length;
            // const totalRevenue = await paymentCollection.find().toArray();
            // const totalRevenueAmount = totalRevenue.reduce((total, current) => total + parseInt(current.price), 0);
            const totalTherapies = (await therapyCollection.find().toArray()).length;
            const totalHerbalProducts = (await herbalProductsCollection.find().toArray()).length;
            const result = {
                approvedClasses,
                pendingClasses,
                instructors,
                totalClasses,
                totalEnrolled,
                totalTherapies,
                totalHerbalProducts
                // totalRevenueAmount
            }
            res.send(result);

        })

        // !GET ALL INSTrUCTOR  

        app.get('/instructors', async (req, res) => {
            const result = await userCollection.find({ role: 'instructor' }).toArray();
            res.send(result);
        })




        app.get('/enrolled-classes/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const pipeline = [
                {
                    $match: query
                },
                {
                    $lookup: {
                        from: "classes",
                        localField: "classesId",
                        foreignField: "_id",
                        as: "classes"
                    }
                },
                {
                    $unwind: "$classes"
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "classes.instructorEmail",
                        foreignField: "email",
                        as: "instructor"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        classes: 1,
                        instructor: {
                            $arrayElemAt: ["$instructor", 0]
                        }
                    }
                }

            ]
            const result = await enrolledCollection.aggregate(pipeline).toArray();
            // const result = await enrolledCollection.find(query).toArray();
            res.send(result);
        })

        // Applied route 
        app.post('/as-instructor', async (req, res) => {
            const data = req.body;
            const result = await appliedCollection.insertOne(data);
            res.send(result);
        })
        app.get('/applied-instructors/:email',   async (req, res) => {
            const email = req.params.email;
            const result = await appliedCollection.findOne({email});
            res.send(result);
        });
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Welcome to Krushnampriya yog ,its just backend server :)');
})


// Listen
app.listen(port, () => {
    console.log(`Server is running on port  ${port}`);
})

