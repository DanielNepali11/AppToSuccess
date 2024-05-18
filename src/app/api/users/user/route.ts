import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModal";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){
    try{
        const userId = await getDataFromToken(request);
       const loggedInUser = await User.findOne({_id: userId}).select("-password");
       return NextResponse.json({
        message: "User data found.",
        data: loggedInUser,
       });
    } catch(error:any){
        return NextResponse.json({error:error.message},
            {status:400}
        );
    }
}