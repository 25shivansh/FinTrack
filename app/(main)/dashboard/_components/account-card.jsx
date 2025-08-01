"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { Switch } from "@/components/ui/switch";
//import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";


import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/accounts";
import { toast } from "sonner";



export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;
  const {
    loading:updateDefaultloading,
    fn:updateDefaultfn,
    data:updateAccount,
    error,
  }=useFetch(updateDefaultAccount);
  const handleDefaultChange=async(event)=>{
    event.preventDefault();
    if(isDefault){
      toast.warning("You need atleast 1 default account");
      return ;//dont allow tagging off the default account
    }
    await updateDefaultfn(id)
  };
  useEffect(()=>{
    if(updateAccount?.success){
      toast.success("Default account updated succesfully");
    }
      
  },[updateAccount]);
  useEffect(()=>{
    if(error){
      toast.error(error.message||"Failed to update default account updated succesfully");
    }
  },[error])

  

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultloading}
          />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}