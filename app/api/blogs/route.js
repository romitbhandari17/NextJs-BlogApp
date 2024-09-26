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
      const data = await fs.readdir(filePath);
      data = data.slice(0, count);
      //console.log(data);
      let i;
      let fileData;
      let allBlogs = [];
      for(i=0; i< data.length; i++){
        //console.log(filePath+'/'+data[i]);
        fileData = await fs.readFile(filePath+'/'+data[i], 'utf-8');
        //console.log(JSON.parse(fileData));
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