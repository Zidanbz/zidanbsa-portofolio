import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'Zidanbz';
  const year = searchParams.get('year') || 'last';

  try {
    const url =
      year && year !== 'last'
        ? `https://github.com/users/${username}/contributions?from=${year}-01-01&to=${year}-12-31`
        : `https://github.com/users/${username}/contributions`;

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `GitHub response status: ${response.status}` },
        { status: response.status }
      );
    }

    const html = await response.text();

    // Extract total contributions count (e.g., "314 contributions in the last year")
    const totalMatch = html.match(/([\d,]+)\s+contributions/i);
    const totalCount = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;

    // Map tooltips by target ID
    const tooltips = new Map<string, string>();
    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/gi;
    let ttMatch: RegExpExecArray | null;
    while ((ttMatch = tooltipRegex.exec(html)) !== null) {
      tooltips.set(ttMatch[1], ttMatch[2].trim());
    }

    // Extract days
    const contributions: Array<{ date: string; count: number; level: number }> = [];
    const dayRegex = /<td[^>]*data-date="([^"]+)"[^>]*id="([^"]+)"[^>]*data-level="(\d+)"[^>]*>/gi;
    let dayMatch: RegExpExecArray | null;
    while ((dayMatch = dayRegex.exec(html)) !== null) {
      const date = dayMatch[1];
      const id = dayMatch[2];
      const level = parseInt(dayMatch[3], 10);
      const tipText = tooltips.get(id) || '';

      let count = 0;
      if (tipText.includes('No contribution')) {
        count = 0;
      } else {
        const countM = tipText.match(/([\d,]+)\s+contribution/i);
        if (countM) {
          count = parseInt(countM[1].replace(/,/g, ''), 10);
        } else {
          count = level > 0 ? level : 0;
        }
      }

      contributions.push({ date, count, level });
    }

    // Fallback parser if TD format varies
    if (contributions.length === 0) {
      const fallbackRegex = /data-date="([^"]+)"[\s\S]*?data-level="(\d+)"/gi;
      let fbMatch: RegExpExecArray | null;
      while ((fbMatch = fallbackRegex.exec(html)) !== null) {
        const levelVal = parseInt(fbMatch[2], 10);
        contributions.push({
          date: fbMatch[1],
          count: levelVal,
          level: levelVal,
        });
      }
    }

    return NextResponse.json({
      total: { [year]: totalCount },
      contributions,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch contribution data' },
      { status: 500 }
    );
  }
}
