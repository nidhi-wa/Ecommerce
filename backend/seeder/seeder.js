import connectDB from "../config/db"
connectDB()

import categoryData from "./categories"
import { map } from "./products"
import reviewData from "./reviews"
import userData from "./users"
import orderData from "./orders"

import { collection, insertMany } from "../models/CategoryModel"
import { collection as _collection, insertMany as _insertMany } from "../models/ProductModel"
import { collection as __collection, insertMany as __insertMany } from "../models/ReviewModel"
import { collection as ___collection, insertMany as ___insertMany } from "../models/UserModel"
import { collection as ____collection, insertMany as ____insertMany } from "../models/OrderModel"

const importData = async () => {
    try {
        await collection.dropIndexes()
        await _collection.dropIndexes()

        await collection.deleteMany({})
        await _collection.deleteMany({})
        await __collection.deleteMany({})
        await ___collection.deleteMany({})
        await ____collection.deleteMany({})

        await insertMany(categoryData)
        const reviews = await __insertMany(reviewData)
        const sampleProducts = map((product) => {
            reviews.map((review) => {
                product.reviews.push(review._id)
            })
            return {...product}
        })
        await _insertMany(sampleProducts)
        await ___insertMany(userData)
        await ____insertMany(orderData)

        console.log("Seeder data proceeded successfully")
        process.exit()
    } catch (error) {
        console.error("Error while proccessing seeder data", error)
        process.exit(1);
    }
}
importData()