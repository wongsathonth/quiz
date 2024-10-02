"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Create() {
    const [amount, setAmount] = useState<number | string>("");
    const [date, setDate] = useState<string>("");
    const [type, setType] = useState<"income" | "expense">("income");
    const [note, setNote] = useState<string>("");
    const { data: session } = useSession();
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [message, setMessage] = useState("");

    const createTransaction = async () => {
        try {
            const res = await axios.post("api/transaction", {
                amount: Number(amount),
                date, type, note,
                userId: session?.user?.id,
            });
            console.log(res);
            if (res.status == 201) {
                setSuccessMessage(true);
            } else {
                setErrorMessage(true);
            }
            setMessage(res.data.message);
        } catch (err: any) {
            console.log(err);
            setErrorMessage(true);
            setMessage(err.response.data.message);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                {successMessage && (<p className='text-green-600 font-semibold'>{message}</p>)}
                {errorMessage && (<p className='text-red-600 font-semibold'>{message}</p>)}
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        onChange={(e) => setAmount(e.target.value)}
                        id="amount"
                        type="number"
                        placeholder="0"
                        value={amount}
                        className="border border-gray-300 rounded px-4 py-2 my-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        onChange={(e) => setDate(e.target.value)}
                        id="date"
                        type="date"
                        value={date}
                        className="border border-gray-300 rounded px-4 py-2 my-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                        onChange={(e) => setType(e.target.value as "income" | "expense")}
                        id="type"
                        value={type}
                        className="border border-gray-300 rounded px-4 py-2 my-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note</label>
                    <textarea
                        onChange={(e) => setNote(e.target.value)}
                        id="note"
                        value={note}
                        rows={3}
                        className="border border-gray-300 rounded px-4 py-2 my-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={createTransaction}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition-all"
                    >
                        Create
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <a href="/" className="text-blue-600 hover:underline">Back</a>
                </div>
            </div>
        </div>
    );
}
