import { NextResponse } from "next/server";
import sharp from "sharp";

// ✅ تابع GET باید async باشد
export async function GET(request, { params }) {
  try {
    // ✅ ابتدا params را await کنید
    const resolvedParams = await params;
    const paramsArray = resolvedParams.params;

    let width = 600;
    let height = 400;
    let bgColor = "#cccccc";
    let textColor = "#333333";
    let text = "Image";

    // پردازش اندازه
    if (paramsArray && paramsArray[0]) {
      const size = paramsArray[0].split("x");
      if (size[0]) width = parseInt(size[0]);
      if (size[1]) height = parseInt(size[1]);
    }

    // پردازش رنگ پس‌زمینه
    if (paramsArray && paramsArray[1]) {
      bgColor = `#${paramsArray[1]}`;
    }

    // پردازش رنگ متن
    if (paramsArray && paramsArray[2]) {
      textColor = `#${paramsArray[2]}`;
    }

    // دریافت متن از query string
    const url = new URL(request.url);
    text = url.searchParams.get("text") || text;

    // ایجاد SVG
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bgColor}"/>
        <text x="50%" y="50%" font-family="Arial" font-size="24" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
      </svg>
    `;

    // تبدیل به PNG
    const buffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new NextResponse("Error generating image", { status: 500 });
  }
}
