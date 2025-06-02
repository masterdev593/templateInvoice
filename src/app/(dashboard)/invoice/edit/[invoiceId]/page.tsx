'use client'

import CreateEditInvoice from "@/app/(dashboard)/_component/CreateEditInvoice";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditInvoicePage(){
    const { invoiceId } = useParams()

    console.log("invoiceId",invoiceId)
    return(
        <div className="p-4">
      <div className="flex items-center  gap-4">
        <Link href={"/invoice"} className={buttonVariants({ size: "icon" })}>
          <ArrowLeft />
        </Link>
        <h1 className="text-xl font-semibold">Edit Invoice</h1>
      </div>
      <CreateEditInvoice
         invoiceId={invoiceId as string}
        // firstName={session?.user.firstName}
        // lastName={session?.user.lastName}
        // email={session?.user.email}
        // currency={session?.user.currency}
      />
    </div>
    )
}