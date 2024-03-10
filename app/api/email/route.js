import { NextResponse } from "next/server";
import crypto from "crypto";
import { clerkClient } from "@clerk/nextjs";
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs';

import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'enfuseorg@outlook.com',
    pass: process.env.NEXT_PUBLIC_SMTP_BREVO_PASS
  }
});



export async function POST(req, res) {

    const { recipientEmail, message } = req.body;
    const user = await auth.api.getUserByEmail(recipientEmail);
    const userRecord = await clerkClient.users.getUser(user.id);
    const userFullName = userRecord.fullName;
   
}
