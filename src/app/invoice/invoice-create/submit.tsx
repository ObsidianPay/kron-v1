'use client'
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Invoice sent successfully!');

export default function SubmitButton() {
    const [notifySuccess, color] = useState(false);

    function handleClick() {
        color(true);
        notify();
    }

    return (
        <div>
        <button
            onClick={handleClick}
            className={`flex w-full justify-center rounded bg-${notifySuccess ? "success" : "primary"} p-3 font-medium text-gray hover:bg-opacity-90`}
        >
            Send Invoice
        </button>
        <Toaster />
        </div>
    );
}