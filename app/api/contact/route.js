import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

//http://localhost:3000/api/contact - POST
export async function POST(request) {
    console.log("contact api called");
    let filePath = path.join(process.cwd(), 'contactsdata');
    //console.log(filePath);
    try {
        const contactData = await request.json()
        //console.log(contactData);

        const files = await fs.readdir(filePath, 'utf-8');
        console.log(files)
        const newfile = files.length+1;
        filePath = path.join(process.cwd(), 'contactsdata', newfile+'.json');
        await fs.writeFile(filePath, JSON.stringify(contactData));
         
        // Using NextResponse.json() to return the JSON object directly
        return NextResponse.json(contactData);
    } catch (error) {
        console.error('Error reading Dir/File or parsing JSON:', error);
        
        // Returning an error as a JSON object
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}