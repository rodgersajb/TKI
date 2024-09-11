import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

import connect from "@/app/lib/mongoose";


export const GET = handleAuth();

export default async function handler(req, res) {
  if (req.body === 'POST') {
    
  }
}