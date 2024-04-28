import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

function unixTimeToDate(unixTime: string) {
  return new Date(parseInt(unixTime) * 1000).toLocaleDateString();
}

async function listDisputes() {
  'use server'
  const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);

  const user = await currentUser();
  var userId = user?.id ?? '';
  userId = userId.toString();
  //console.log(userId);
  const stripeId = await clerkClient.users.getUser(userId);
  const stripeAcc = stripeId.privateMetadata.stripeAccId;

  const disputeData = await stripe.disputes.list({
    limit: 25,
  }, {
    stripeAccount: stripeAcc,
  });

  console.log(disputeData);

  const jsonData = JSON.parse(JSON.stringify(disputeData.data));

  console.log(jsonData);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Dispute ID
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Created date
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Charge
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {jsonData.map((data) => (
              // eslint-disable-next-line react/jsx-key
              <tr>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {data.id}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {unixTimeToDate(data.created)}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {data.amount}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      data.status === "paid"
                        ? "bg-success text-success"
                        : data.status === "warning_needs_response"
                          ? "bg-danger text-danger"
                          : "bg-warning text-warning"
                    }`}
                  >
                    {data.status}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      </div>
    </DefaultLayout>
  );
}

export default listDisputes;
