const sequelize = require('../db')

const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    email: {type:DataTypes.STRING, unique:true,},
    password: {type:DataTypes.STRING},
    role: {type:DataTypes.STRING, defaultValue:"USER"},
})

const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
})

const BasketItem = sequelize.define('basket_items',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
})

const Item = sequelize.define('item',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING,unique:true,allowNull:false}
})

const Brand = sequelize.define('brand',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, allowNull:false, unique:true}
})

const ItemRating = sequelize.define('item_rating',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    rate: {type: DataTypes.INTEGER, allowNull:false,}
})

const ItemInfo = sequelize.define('item_info',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title: {type:DataTypes.STRING, allowNull:false},
    description: {type: DataTypes.STRING, allowNull:false}
})


const TypeBrand = sequelize.define('type_brand',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(ItemRating)
ItemRating.belongsTo(User)

Type.hasMany(Item)
Item.belongsTo(Type)
Brand.hasMany(Item)
Item.belongsTo(Brand)

Basket.hasMany(BasketItem)
BasketItem.belongsTo(Basket)

Item.hasMany(ItemRating)
ItemRating.belongsTo(Item)

Item.hasMany(BasketItem)
BasketItem.belongsTo(Item)

Item.hasMany(ItemInfo,{as:'info'})
ItemInfo.belongsTo(Item)

Type.belongsToMany(Brand , {through: TypeBrand})
Brand.belongsToMany(Type , {through: TypeBrand})

module.exports = {
    User,Basket,BasketItem,Item,ItemRating,ItemInfo,Brand,Type,TypeBrand
}