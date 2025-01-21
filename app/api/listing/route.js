import dbConnect from "@/app/lib/dbConnect";
import listingModel from "@/app/models/listing.model";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        dbConnect();
        let list = await listingModel.find()
        return NextResponse.json({
            status:true,
            message:"Api call Successfull",
            list
        })
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            status:true,
            message:"Api call unSuccessfull",
            error
        })
    }
}


export async function POST(request) {
    try {
        const body = await request.json();
        
        dbConnect();
        let data = new listingModel(body);
        const res = await data.save();
        return NextResponse.json({
            status:true,
            res
        })
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            status:true,
            message:"Api call unSuccessfull",
            error
        })
    }
}