import { NextResponse } from 'next/server';

export async function GET(req) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = 'PLgUwDviBIf0rAuz8tVcM0AymmhTRsfaLU'
//   'PL_h3QvbB7GdsFUA4FJQNVA38uZKzxJLZr'; // Replace with the correct playlist ID

  // Ensure the API key is available
  if (!apiKey) {
    return NextResponse.json({ error: 'API key is missing' }, { status: 400 });
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=100&key=${apiKey}`;

  try {
    // Fetch data from the YouTube API
    const response = await fetch(apiUrl);

    // Log the status code and response body for debugging
    // console.log(`YouTube API response status: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('YouTube API Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch videos', details: errorData }, { status: response.status });
    }

    const data = await response.json();

    // Log the raw data for debugging
    console.log('YouTube API response data:', data);

    // Ensure `data.items` is an array before calling `.map()`
    if (Array.isArray(data.items)) {
      // Format the response data to show important details
      const formattedVideos = data.items.map((video: any) => ({
        id: video.snippet.resourceId.videoId,
        title: video.snippet.title,
        description: video.snippet.description || 'No description available.',
        thumbnailUrl: video.snippet.thumbnails.medium.url,
        publishedAt: video.snippet.publishedAt,
        channelTitle: video.snippet.channelTitle,
      }));

      // Return the formatted video data
      return NextResponse.json({ videos: formattedVideos });
    } else {
      return NextResponse.json({ error: 'Invalid data format. `items` is not an array.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
