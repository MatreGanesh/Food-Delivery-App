const Order = require('../models/Orders');

// const orderData = async (req, res) => {
//     try {
//         let data = req.body.order_data;

//         await data.splice(0, 0, { Order_date: req.body.order_date })
//         // console.log("1231242343242354", req.body.email)

//         //if email not exisitng in db then create: else: InsertMany()
//         let eId = await Order.findOne({ 'email': req.body.email })
//         console.log(eId)
//         if (eId === null) {
//             try {
//                 console.log(data)
//                 // console.log("1231242343242354", req.body.email)
//                 await Order.create({
//                     email: req.body.email,
//                     order_data: [data]
//                 }).then(() => {
//                     return res.status(200).json({ success: true })
//                 })
//             } catch (error) {
//                 console.log('Server Error :', error);
//                 return res.status(500).json({ success: false, message: error });

//             }
//         }

//         else {
//             try {
//                 await Order.findOneAndUpdate({ email: req.body.email },
//                     { $push: { order_data: data } }).then(() => {
//                         return res.status(200).json({ success: true })
//                     })
//             } catch (error) {
//                 console.log('Server Error :', error);
//                 return res.status(500).json({ success: false, message: error });
//             }
//         }
//     } catch (error) {
//         console.log('Server Error :', error);
//         return res.status(500).json({ success: false, message: error });
//     }
// }


// const orderData = async (req, res) => {
//     try {
//         const { email, order_data, order_date } = req.body;

//         // Format the order_date string to match existing stored values (e.g., "Tue Jun 03 2025")
//         const todayDate = new Date(order_date).toDateString();

//         const existingUser = await Order.findOne({ email });

//         // If user doesn't exist, create a new document
//         if (!existingUser) {
//             const newOrder = {
//                 email,
//                 order_data: [[{ Order_date: todayDate }, ...order_data]]
//             };

//             await Order.create(newOrder);
//             return res.status(200).json({ success: true });
//         }

//         // If user exists, check if there's already an order for today's date
//         let orderUpdated = false;
//         const updatedOrderData = existingUser.order_data.map(orderArray => {
//             const existingDate = orderArray[0]?.Order_date;
//             if (existingDate === todayDate) {
//                 // Append to existing date
//                 orderUpdated = true;
//                 return [...orderArray, ...order_data];
//             }
//             return orderArray;
//         });

//         if (!orderUpdated) {
//             // No entry for today found; add a new entry
//             updatedOrderData.push([{ Order_date: todayDate }, ...order_data]);
//         }

//         // Update the document
//         await Order.findOneAndUpdate(
//             { email },
//             { order_data: updatedOrderData }
//         );

//         return res.status(200).json({ success: true });

//     } catch (error) {
//         console.log('Server Error :', error);
//         return res.status(500).json({ success: false, message: error });
//     }
// };

const orderData = async (req, res) => {
    try {
        const { email, order_data, order_date } = req.body;
        const todayDate = new Date(order_date).toDateString();

        const existingUser = await Order.findOne({ email });

        if (!existingUser) {
            const newOrder = {
                email,
                order_data: {
                    [todayDate]: order_data
                }
            };

            await Order.create(newOrder);
            return res.status(200).json({ success: true });
        }

        // If user exists
        const existingOrders = existingUser.order_data || {};

        if (existingOrders[todayDate]) {
            // Append new data to existing date's array
            existingOrders[todayDate] = [...existingOrders[todayDate], ...order_data];
        } else {
            // Add new date with order data
            existingOrders[todayDate] = order_data;
        }

        await Order.findOneAndUpdate(
            { email },
            { order_data: existingOrders }
        );

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


const myOrderData = async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        return res.status(200).json({ success: true, orderData: eId })
    } catch (error) {
        console.log('Server Error :', error);
        return res.status(500).json({ success: false, message: error });
    }
};

module.exports = { orderData, myOrderData };