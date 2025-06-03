const FoodCategoryName = require("../models/FoodCategory.js");
const FoodMenuData = require("../models/FoodMenuData.js");


//Set Food Category
const createCategoryItem = async (req, res) => {
    try {
        const { categoryName, image } = req.body;

        if (!categoryName || !image) {
            return res.status(400).json({ error: 'Fill the all Details!' });
        }

        const category = new FoodCategoryName({
            categoryName, image
        })

        const alreadyExists = await FoodCategoryName.findOne({
            categoryName: category.categoryName
        });

        if (alreadyExists) {
            return res.status(409).json({ success: false, message: 'Category already exists!' });
        }

        const categorysave = await category.save()

        return res.status(200).json({ success: true, data: categorysave });

    } catch (error) {
        console.log('Server Error', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//fetch Food Category
const getFoodCategory = async (req, res) => {
    try {

        const category = await FoodCategoryName.find({});
        console.log(category);

        res.status(200).json({ success: true, message: 'Category Fetch Successfully!', category });

    } catch (error) {
        console.log('Server Error : ', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//Set Food Items Menu
const createFoodItem = async (req, res) => {
    try {
        const { category, name, img, options, description } = req.body;

        console.log(category, name, img, options, description)

        if (!category || !name || !img || !options || !description) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate that the category exists in the FoodCategory collection
        const categoryExists = await FoodCategoryName.findOne({ categoryName: category });
        if (!categoryExists) {
            return res.status(400).json({ error: 'Invalid category name' });
        }

        //if Menu is alredy exist
        const existingMenu = await FoodMenuData.findOne({ name });
        if (existingMenu) {
            return res.status(400).json({ error: `${name} menu is alredy exist` });
        }

        const foodItem = new FoodMenuData({
            category,
            name,
            img,
            options,
            description
        });

        const savedItem = await foodItem.save();
        res.status(201).json({ message: 'Food item created', data: savedItem });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//Get All Food Items
const getFoodMenu = async (req, res) => {
    try {

        console.log("hhhhh");
        const foodCategory = await FoodCategoryName.find({});
        const foodItem = await FoodMenuData.find({});

        // console.log(foodCategory);
        // console.log("All food items:", foodItem);

        // foodItem.Array((err, data) => {
        //     global.restaurent = data;
        //     console.log(global.restaurent)
        // })

        return res.status(200).json({ success: true, data: [foodItem, foodCategory] });

    } catch (error) {

        console.log('Server Error :', error);
        return res.status(500).json({ success: false, message: error });

    }
}


module.exports = {
    createFoodItem, createCategoryItem, getFoodMenu, getFoodCategory
};                                                            
