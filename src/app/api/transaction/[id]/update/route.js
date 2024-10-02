import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../../../lib/mongodb";
import Transaction from "../../../../models/Transaction";

export async function GET(req, { params }) {
    const { id } = params;
    await connectToMongoDB;
    const transaction = await Transaction.findOne({ _id: id });
    return NextResponse.json(transaction, { status: 200 })
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { amount, date, type, note } = await req.json();
    await connectToMongoDB;
    await Transaction.findByIdAndUpdate(id, { amount, date, type, note })
    return NextResponse.json({ message: "Update Transaction Successfully" }, { status: 203 });
}