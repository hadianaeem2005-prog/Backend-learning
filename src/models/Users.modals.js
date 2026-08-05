import mongoose from "mongoose";
import jwt from "jsonwebtoken";                
import bcrypt from "bcrypt";


const userSchema= new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            index:true,
            trim:true
        },
         email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
         fullname:{
            type:String,
            required:true,
            index:true,
            trim:true
        },
        avatar:{
            type:String,    // cloudinary url
            required:true
        },
        coverImage:{
            type:String
        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,"password is required"]
        },
        refreshTokens:{
            type:String
        }
    },{timestamps:true});

    //--------------------------------------------------      modify data 
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))      return next()

        this.password=await bcrypt.hash(this.password,10)
        next()
})

    // -------------------------------------------------    compare actual and modified data
userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)
}

   // -------------------------------------------------- token generater and refresher
userSchema.methods.generateAccessToken=function(){
    return  jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expireIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken=function(){
    return  jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expireIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}




export const User=mongoose.model("User",userSchema);