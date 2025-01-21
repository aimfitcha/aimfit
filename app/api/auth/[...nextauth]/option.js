import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/user.model";


export const authOptions = {
    providers: [
        CredentialsProvider({
            id:'login',
            name:'login',
            credentials:{
                email:{lable:"Email",type:'text'},
                password:{lable:"password",type:'text'}
            },
            async authrize(credential){
                await dbConnect()
                try {
                   const UserData =  await User.findOne({
                        email:credential.identifier
                    })

                    if(!UserData){
                        throw new Error("No User Found")
                    }
                   const isPasswordCorrect= await bcrypt.compare(credential.password,UserData.password)
                   if(isPasswordCorrect){
                    console.log(UserData);
                    return UserData
                    
                   }
                } catch (error) {
                    throw new Error(error)
                }
            }
        })
    ]
}