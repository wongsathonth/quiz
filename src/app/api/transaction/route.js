import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../lib/mongodb";
import Transaction from "../../models/Transaction";

export async function POST(req) {
    try {
        const { amount, date, type, note, userId } = await req.json();

        await connectToMongoDB();

        const transaction = new Transaction({ amount, date, type, note, userId });
        transaction.save();

        return NextResponse.json({ message: "Create Transaction Successfully" }, { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: err }, { status: 500 });
    }
}