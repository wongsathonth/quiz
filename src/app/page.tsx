"use client";

import Link from "next/link";
import axios from "axios";
import IncomeExpenseChart from "./components/IncomeExpenseChart";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface transactionsType {
  _id: string,
  amount: number,
  date: string,
  type: "income" | "expense",
  note: string,
}

export default function Home() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<transactionsType[]>([]);

  function formatDate(input: string): string {
    const date = new Date(input);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const deleteTransaction = async (id: string) => {
    if (confirm("Confirm to delete")) {
      try {
        const res = await axios.delete(`/api/transaction/${id}`);

        if (res.status === 200) {
          setTransactions(
            transactions.filter((transaction) => transaction._id !== id)
          );
        } else {
          console.log(`Failed to delete transaction: ${res.status}`);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
  };

  const getTransactions = async () => {
    if (session?.user?.id) {
      try {
        const res = await axios.get(`api/transaction/${session?.user?.id}`);
        setTransactions(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getTransactions();
  }, [session]);

  if (!session) {
    return (
      <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
        <div className="text-center">
          <p className="text-2xl font-semibold mb-4 text-gray-800">Please login</p>
          < Link className="inline-block px-6 py-2 bg-blue-600 text-white rounded transition duration-200 hover:bg-blue-700" href="/login">Login</Link>
          
          </div>
        </div>

        );
  } else {
    return (
        <div className="bg-gray-100 min-h-screen p-4">
          <p className="mb-5 text-xl font-semibold">Welcome, {session.user?.email}!</p>
          <div>
            <ul className="bg-white shadow-md rounded-lg">
              {
                transactions.map((transaction) => (
                  <li key={transaction._id} className="border-b last:border-b-0 p-4 flex justify-between items-center">
                    <div className="flex-grow">
                      <div className="text-lg font-bold">{transaction.amount}</div>
                      <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
                      <div className={`text-sm ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type}
                      </div>
                      <div className="text-sm text-gray-700">{transaction.note}</div>
                    </div>
                    <div className="space-x-2">
                      <Link
                        className="text-yellow-500 hover:text-yellow-600 underline"
                        href={`/edit/${transaction._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteTransaction(transaction._id)}
                        className="text-red-500 hover:text-red-600 underline"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
          <h2 className="text-xl font-semibold mt-6">แสดงกราฟรายรับรายจ่าย ใน 2 เดือนย้อนหลัง</h2>
          <div className="mt-4">
            <IncomeExpenseChart transactions={transactions} />
          </div>
          <div className="flex justify-between items-center mt-6">
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Logout
            </button>
            <Link className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all" href="/create">
              Create
            </Link>
          </div>
        </div>
        );
  }
}
