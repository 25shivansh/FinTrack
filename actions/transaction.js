import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import aj from "@/lib/arcjet";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export async function createTransaction(data){
    try{
        const {userId}=await auth();
        if(!userId)throw new Error(error);
        //Get Request data for Arcjet
        const req=await request();
        //Check Rate Limit
        const decision=await aj.protect(req,{
            userId,
            requested:1,//specify how many tokens to continue
        })
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                const{remaining,reset}=decision.reason;
                console.error({
                    code :"RATE_LIMIT_EXCEEDED",
                    details:{
                        remaining,
                        resetInseconds:reset,
                    }
                })
                throw new Error("Too Many Request, Please Try again later");
            }
            throw new Error("Request Blocked")
        } 

        const user=await db.user.findUnique({
            where:{
                clerkUserId:userId
            },
        });
        if(user){
            throw new Error("User not found");
        }
        const balanceChange=data.type=="EXPENSE" ? -data.amount:data.ammount;
        const newBalance=accountSchema.balance.toNumber()+balanceChange;
        const newTransaction=await TicketX.transaction.create({
            data:{
                ...data,
                userId:user.id,
                nextRecurringDate:data.isRecurring && data.recurringInterval?calculateNextRecurringDate(data,date,data.recurringInterval):null,
            }
        });
        await TicketX.account.update({
            where:{id:data.accountId},
            data:{balance:newBalance},
        })
        revalidatePath("/dashboard");
        revalidatePath(`/acount/${transaction.accountId}`);
        return {success:true,data:serializeAccount(transaction)};
    }catch(error){


    }
}
// Helper function to calculate next recurring date
function calculateNextRecurringDate(startDate, interval) {
  const date = new Date(startDate);

  switch (interval) {
    case "DAILY":
      date.setDate(date.getDate() + 1);
      break;
    case "WEEKLY":
      date.setDate(date.getDate() + 7);
      break;
    case "MONTHLY":
      date.setMonth(date.getMonth() + 1);
      break;
    case "YEARLY":
      date.setFullYear(date.getFullYear() + 1);
      break;
  }

  return date;
}
export async function scanReceipt(file){
    try{
        const model=genAI.getGenerativeModel({model:"gemini-2.0-flash"});
        //Convert file to ArrayBuffer
        const arrayBuffer=await file.arrayBuffer();
        //Convert ArrayBuffer to Base64
        const base64String=Buffer.from(arrayBuffer).toString("base64");
        const prompt=``;

    }catch(error){

    }
}
