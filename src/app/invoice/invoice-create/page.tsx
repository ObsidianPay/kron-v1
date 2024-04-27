import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { FormEvent } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

async function createInvoice(formData: FormData) {
  'use server'
  const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);

  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const amount = formData.get('amount') as unknown as number;
    const description = formData.get('description') as string;
    const accid = formData.get('accid') as string;
    const sendFlag = true;

    // console.log(name, email, address, phone, amount, description, accid, sendFlag);

    // Create the customer
    const customer = await stripe.customers.create({
        name: name,
        email: email,
    }, {
        stripeAccount: accid,
    });

    // Create the invoice
    const invoice = await stripe.invoices.create({
        customer: customer.id,
        auto_advance: true,
        collection_method: 'send_invoice',
        payment_settings: {
            payment_method_types: ['card'],
        },
        days_until_due: 30,
    }, {
        stripeAccount: accid,
    });

    const newInvoiceItem = await stripe.invoiceItems.create({
        amount: amount * 100,
        description: description,
        customer: customer.id,
        invoice: invoice.id,
    }, {
        stripeAccount: accid,
    });

    // Send the invoice if sendFlag is true
    if (sendFlag) {
        await stripe.invoices.sendInvoice(invoice.id, {stripeAccount: accid});
        console.log('Invoice sent successfully');
        const notifySuccess = () => toast.success('Invoice sent successfully', {
          position: "top-right",
        });
    } else {
        console.log('Invoice created successfully');
        const notifySuccess = () => toast.success('Invoice created successfully', {
          position: "top-right",
        });
    }        
} catch (error) {
    // Log the error
    console.error('Error creating invoice:', error);

    // Return error response
    console.error('An error occurred while creating the invoice');
}
  return(
  <DefaultLayout>
      <Breadcrumb pageName="Create Invoice" />

      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Customer Details
              </h3>
            </div>
            <form action={createInvoice}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    id="address"
                    name="address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Phone"
                    id="phone"
                    name="phone"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Invoice Details
                </h3>
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Amount
                  </label>
                  <input
                    type="text"
                    placeholder="Amount"
                    id="amount"
                    name="amount"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="Description"
                    id="description"
                    name="description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Account ID
                  </label>
                  <input
                    type="text"
                    placeholder="ID"
                    id="accid"
                    name="accid"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Send Invoice
                </button>
              </div>
            </form>
          </div>
        </div>

        
      </div>
      <ToastContainer />
    </DefaultLayout>)
}

export default createInvoice;
