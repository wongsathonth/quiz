import { connectToMongoDB } from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import User from "../../../models/User";
import bcrypt from "bcryptjs"

export async function POST(req) {

    const { email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 12);
    await connectToMongoDB();
    const user = new User({ email, password: hashedPassword });
    user.save();
    return NextResponse.json({ message: "success" }, { status: 201 });
}