import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

//http://localhost:3000/api/blog?slug=learn-js
export async function GET(request) {
    console.log("blog api called");
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    if (!slug) {
        return new Response(JSON.stringify({ error: 'Slug is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const filePath = path.join(process.cwd(), 'blogsdata', `${slug}.json`);
    //console.log(filePath);
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(data); // Parsing the file content to a JSON object
        //console.log(jsonData);
        // Using NextResponse.json() to return the JSON object directly
        return NextResponse.json(jsonData);
    } catch (error) {
        console.error('Error reading file or parsing JSON:', error);

        // Returning an error as a JSON object
        return NextResponse.json({ error: 'File not found or invalid JSON' }, { status: 404 });
    }
}