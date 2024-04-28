'use client'
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Invoices fetched successfully!');

export default function ToastMsg() {
    useEffect(() => {
        notify();
    }, []);

    return (
        <div>
            <Toaster />
        </div>
    );
}
