'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { currencyOption } from "@/lib/utils";
import { onboardingSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UserEditProfile {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | null | undefined; 
  currency: string | undefined;
}

export default function UserEditProfile({
  firstName,
  lastName,
  email,
  currency,
}: UserEditProfile) {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<z.infer<typeof onboardingSchema>>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
          currency: currency,
          firstName : firstName,
          lastName : lastName,
        },
      });
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const router = useRouter()
    
      const onSubmit = async(data : z.infer<typeof onboardingSchema>)=>{
        try {
            setIsLoading(true)
            const response = await fetch('/api/user',{
                method : "put",
                body : JSON.stringify(data)
            })
            const responseData = await response.json()
    
            if(response.status === 200){
                router.refresh()
            }
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
      }
    
  return (
     <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label>First Name</Label>
              <Input
                placeholder="Joe"
                type="text"
                {...register("firstName", { required: true })}
                disabled={isLoading}
              />
              {
                errors.firstName && (
                    <p className="text-xs text-red-500">
                        {errors.firstName.message}
                    </p>
                )
              }
            </div>
            <div className="grid gap-2">
              <Label>Last Name</Label>
              <Input placeholder="Due" type="text"  {...register("lastName", { required: true })}    disabled={isLoading}/>
              {
                errors.lastName && (
                    <p className="text-xs text-red-500">
                        {errors.lastName.message}
                    </p>
                )
              }
            </div>
            <div className="grid gap-2">
              <Label>Select Currency</Label>
              <Select
                defaultValue="USD"
                {...register("currency")}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(currencyOption).map(
                    (item: string, index: number) => {
                      return (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      );
                    }
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
               placeholder="john.due@example.com" 
               type="email"
               value={email ?? ""}
               required    
               disabled={true}/>
            </div>
            <Button  disabled={isLoading}>
                {
                    isLoading ? "Please wait..." : "Update Profile"
                }
            </Button>
          </form>
  )
}
