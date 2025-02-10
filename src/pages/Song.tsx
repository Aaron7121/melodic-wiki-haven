
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const Song = () => {
  const { id } = useParams();
  
  const { data: song, isLoading } = useQuery({
    queryKey: ["song", id],
    queryFn: async () => {
      const response = await fetch(`/api/songs/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="h-64 bg-secondary/50 rounded-lg animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 w-48 bg-secondary/50 rounded animate-pulse" />
          <div className="h-4 w-32 bg-secondary/50 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{song?.title}</h1>
        <div className="flex items-center justify-center gap-2 text-white/80">
          <Link to={`/artist/${song?.artists[0]._id}`} className="hover:text-accent">
            {song?.artists[0].name}
          </Link>
          <span>•</span>
          <Link to={`/album/${song?.album._id}`} className="hover:text-accent">
            {song?.album.name}
          </Link>
        </div>
        <a
          href={song?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent hover:text-accent/80"
        >
          Escuchar en Spotify
          <ExternalLink className="h-4 w-4" />
        </a>
      </section>

      {song?.lyrics && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Letra</h2>
          <div className="bg-card rounded-lg p-6">
            <pre className="whitespace-pre-wrap font-sans text-white/80">
              {song.lyrics}
            </pre>
          </div>
        </section>
      )}
    </div>
  );
};

export default Song;
