import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

//http://localhost:3000/api/blogs
export async function GET(request) {

    const filePath = path.join(process.cwd(), 'blogsdata');
    //console.log(filePath);
    try {
      const data = await fs.readdir(filePath);
      
      console.log(data);
      // Using NextResponse.json() to return the JSON object directly
      return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading Dir or parsing JSON:', error);
        
        // Returning an error as a JSON object
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}