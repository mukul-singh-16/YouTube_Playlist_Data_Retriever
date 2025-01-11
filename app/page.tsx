'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Video {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  channelTitle: string;
}

export default function PlaylistVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Replace with your actual endpoint to get all videos in the playlist
        const response = await axios.get('/api/playlist'); // API endpoint fetching videos
        setVideos(response.data.videos || []);
      } catch (error) {
        console.error('Error fetching playlist videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Playlist Videos</h1>
        
        {loading ? (
          <div className="text-center text-gray-600">Loading videos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-full aspect-video">
                  {/* Lazy load the iframe */}
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900 truncate">{video.title}</h2>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">{video.description}</p>
                  <div className="mt-4 text-gray-500 text-sm">
                    <p>
                      <strong>Published:</strong> {new Date(video.publishedAt).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Channel:</strong> {video.channelTitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
