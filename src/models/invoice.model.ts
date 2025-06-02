import mongoose from "mongoose";

interface IUserInvoice {
    name : string;
    email : string;
    address1 : string;
    address2? : string;
    address3? : string;
}

interface IItem {
    item_name : string;
    quantity : number;
    price : number;
    total : number
}

export interface IInvoice {
    _id? : mongoose.Types.ObjectId;
    invoice_no : string; 
    invoice_date : Date;
    due_date : Date;
    currency : string

    //from ( current user )
    from : IUserInvoice;

    //to (client)
    to : IUserInvoice;

    //items
    items : IItem[]

    sub_total : number;
    discount? : number;

    //tax details
    tax_percentage? : number | null

    total : number;

    notes? : string | null;

    status : string;

    userId : mongoose.Types.ObjectId;

    createdAt ? : Date;
    updatedAt? : Date;
}

const Status = [
    "PAID",
    "UNPAID",
    "CANCEL"
]

const userInvoiceSchema = new mongoose.Schema<IUserInvoice>({
    name : { type : String, required : true },
    email : { type : String, required : true},
    address1 : { type : String, required : true},
    address2 : { type : String , default : null },
    address3 : { type : String , default : null }
},{
    _id : false
})

const itemSchema = new mongoose.Schema<IItem>({
    item_name : { type : String, default : null , required : true },
    quantity : { type :  Number , required : true},
    price : { type : Number , required : true},
    total : { type : Number , required : true }
},{
    _id : false
})


const InvoiceSchema = new mongoose.Schema<IInvoice>({
    invoice_no : { type : String , required : true},
    invoice_date : { type : Date, required : true},
    due_date : { type : Date, required : true},
    currency : { type : String, required : true},
    from : { type : userInvoiceSchema ,  required : true },
    to : { type : userInvoiceSchema , required : true },

    items : { type : [itemSchema], required : true },

    sub_total : { type : Number, required : true },
    discount : { type : Number, default : 0 },

    tax_percentage : { type : Number , default : 0},

    total : { type : Number, default : 0 , required : true},

    notes : { type : String, default : null},

    status : { type : String, enum : Status },

    userId : { type : mongoose.Schema.ObjectId, ref : "user"}
},{
    timestamps : true
})

const InvoiceModel = mongoose.models.invoice || mongoose.model('invoice',InvoiceSchema)


export default InvoiceModel
