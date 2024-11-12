import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pdfUrl = searchParams.get('url');
  console.log('🚀 ~ GET ~ pdfUrl:', pdfUrl);

  if (!pdfUrl) {
    return NextResponse.json({ error: 'No PDF URL provided' }, { status: 400 });
  }

  try {
    const response = await fetch(pdfUrl, {
      mode: 'no-cors',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch PDF');
    }

    const data = await response.arrayBuffer();

    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching PDF:', error);
    return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: 500 });
  }
}
