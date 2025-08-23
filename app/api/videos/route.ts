import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video"; // Update this path to your actual Video model file
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  
     try {
          await connectToDatabase();
          const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
          if(!videos || videos.length === 0){
               return NextResponse.json({ message: "No videos found" }, { status: 404 });
          }

          return NextResponse.json(videos);
     } catch (error) {
          return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
     }
}


export async function POST(request: NextRequest) {
     try {
          const session =  await getServerSession(authOptions);
          if (!session) {
               return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
          }

          await connectToDatabase();

          const body = await request.json();

          if(
               !body.title ||
               !body.description ||
               !body.videoUrl ||
               !body.thumbnailUrl
          ) {
               return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
          }

          const videoData = {
               ...body,
               controls: body.controls ?? true,
               transformation: {
                    height: 1920,
                    width: 1080,
                    quality: body.transformation?.quality ?? 100
               }
          }

          const newVideo = await Video.create(videoData);

          return NextResponse.json(newVideo, { status: 201 });

     } catch (error) {
          return NextResponse.json({ message: "Failed to create a video" }, { status: 500 });
     }
}