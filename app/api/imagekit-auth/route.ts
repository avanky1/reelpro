import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});


export async function GET(req: Request) {
     try {
          return NextResponse.json(imagekit.getAuthenticationParameters());
     } catch (error) {
          return NextResponse.json({
               error: "imagekit auth failed"}, 
               {status: 500});
     }
};