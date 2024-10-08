import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

//http://localhost:3000/api/blogs
export async function GET(request) {
  console.log("blogs api called");
  const filePath = path.join(process.cwd(), 'blogsdata');
  //console.log(filePath);
  try {
    const url = new URL(request.url);
    const count = url.searchParams.get('count');
    let data = await fs.readdir(filePath);
    if (data.length < count)
      data = [];
    else {
      const end = parseInt(count) + 2;
      data = data.slice(count, end);
    }

    //console.log(data);
    let i;
    let fileData;
    let allBlogs = [];
    for (i = 0; i < data.length; i++) {
      fileData = await fs.readFile(filePath + '/' + data[i], 'utf-8');
      allBlogs.push(JSON.parse(fileData))
    }

    // Using NextResponse.json() to return the JSON object directly
    return NextResponse.json(allBlogs);
  } catch (error) {
    console.error('Error reading Dir/File or parsing JSON:', error);

    // Returning an error as a JSON object
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}