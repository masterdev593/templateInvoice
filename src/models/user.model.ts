import mongoose from "mongoose";

interface IUser {
    _id? : mongoose.Types.ObjectId,
    firstName : string;
    lastName : string;
    email : string;
    emailVerified : Date;
    currency : string;
    createdAt? : Date;
    updatedAt? : Date;
}

const userSchema = new mongoose.Schema<IUser>({
     firstName : { type : String, default : null },
     lastName : { type : String, default : null },
     email : { type : String, required : true, unique : true },
     emailVerified : { type : Date, default : null },
     currency : { type : String, default : "USD" }
},{
    timestamps : true
})

const UserModel = mongoose.models.user || mongoose.model('user',userSchema)

export default UserModel