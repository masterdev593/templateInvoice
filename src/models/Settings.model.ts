import mongoose from "mongoose";

interface ISignature { 
    name : string;
    image : string
}

export interface ISettings {
    _id? : mongoose.Types.ObjectId;
    invoiceLogo? : string,
    signature? : ISignature
    userId : mongoose.Types.ObjectId;
    createdAt? : Date;
    updatedAt? : Date;
}

const signatureSchema = new mongoose.Schema<ISignature>({
    name : { type : String , default : null },
    image : { type : String , default : null }
},{
    _id : false
})

const settingsSchema =  new mongoose.Schema<ISettings>({
    invoiceLogo : { type : String, default : null },
    signature : signatureSchema,
    userId : { type : mongoose.Schema.ObjectId , ref : "user", required : true}
},{
    timestamps : true
})

const SettingModel = mongoose.models.setting || mongoose.model("setting",settingsSchema)

export default SettingModel




