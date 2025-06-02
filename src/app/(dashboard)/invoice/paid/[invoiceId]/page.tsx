"use client";
import Loading from "@/components/Loading";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IInvoice } from "@/models/invoice.model";
import { ArrowLeft, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PaidInvoicePage() {
  const [data, setData] = useState<IInvoice>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { invoiceId } = useParams();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/invoice?invoiceId=${invoiceId}`);
      const responseData = await response.json();

      if (response.status === 200) {
        const invoiceData = responseData.data[0];
        setData(invoiceData);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async()=>{
    try {
        setIsLoading(true)
        const response = await fetch('/api/invoice',{
            method : 'put',
            body : JSON.stringify({
                invoiceId,
                ...data,
                status : "PAID"
            })
        })
        const responseData = await response.json()

        if(response.status === 200){
            fetchData();
            toast.success("Invoice status updated")
        }else{
            toast.error("Something went wrong")
        }
    } catch (error) {
        console.log(error)
    }finally{
         setIsLoading(false)
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center  gap-4 relative z-10">
        <Link href={"/invoice"} className={buttonVariants({ size: "icon" })}>
          <ArrowLeft />
        </Link>
        <h1 className="text-xl font-semibold"> Invoice Status</h1>
      </div>

      <div className="min-h-[calc(100dvh-200px)] relative flex justify-center flex-col items-center">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <Card className="min-w-sm relative z-10">
          <CardHeader>
            <CardTitle>Invoice Status</CardTitle>
            <CardDescription>Make your invoice paid</CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            {isLoading ? (
              <Loading />
            ) : data?.status === "UNPAID" ? (
              <Button className="w-full" onClick={handleUpdate}>Make Invoice Paid</Button>
            ) : (
              <div
                className={cn(
                  "bg-green-50 text-green-600 font-semibold p-4 flex items-center gap-3"
                )}
              >
                <CheckIcon />
                <p>Your invoice payment done</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
