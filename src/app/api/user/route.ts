import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request : NextRequest){
    try{
        const { firstName, lastName, currency } = await request.json()

        const session = await auth()

        if(!session){
            return NextResponse.json({
                message : "Unauthorized access"
            },{
                status : 401
            })
        }
        //function connect to db
        await connectDB()
        
        const userDetails = await UserModel.findByIdAndUpdate(session.user?.id,{
            firstName,
            lastName,
            currency
        })

        return NextResponse.json({
            message : "User udated successfully",
            // data : userDetails optional
        })

    }catch(error : any){
        return NextResponse.json({
            message : error || error.message || "Something went wrong"
        },{
            status : 500
        })
    }
}