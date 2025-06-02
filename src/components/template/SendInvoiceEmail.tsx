import * as React from 'react';
import { Button, buttonVariants } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EmailTemplateProps {
  firstName: string;
  invoiceNo : string;
  dueDate : string;
  total : string;
  invoiceURL : string;
}

export const InvoiceTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  invoiceNo,
  dueDate,
  total,
  invoiceURL
}) => (
  <div >
    <h1>Welcome, {firstName}!</h1>

    <div>
      <p>Invoice No. : {invoiceNo}</p>
      <p>Due Date : { dueDate}</p>
      <p>Total  : {total}</p>
    </div>

    <a href={invoiceURL} className={cn(buttonVariants())}>
      Download Invoice
    </a>

  </div>
);

