
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const Album = () => {
  const { id } = useParams();
  
  const { data: album, isLoading } = useQuery({
    queryKey: ["album", id],
    queryFn: async () => {
      const response = await fetch(`/api/albums/${id}`);
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
    <div className="space-y-8 animate-fadeIn">
      <section className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src={album?.image}
            alt={album?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{album?.name}</h1>
          <p className="text-lg text-white/80">
            {new Date(album?.releaseDate).toLocaleDateString()}
          </p>
          <p className="text-white/60">
            {album?.totalTracks} canciones
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Canciones</h2>
        <div className="space-y-2">
          {album?.songs.map((song: any, index: number) => (
            <Link
              key={song._id}
              to={`/song/${song._id}`}
              className="flex items-center justify-between p-4 bg-card rounded-lg hover:bg-card/80 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-white/60 w-8">{index + 1}</span>
                <div>
                  <h3 className="font-medium">{song.title}</h3>
                  <p className="text-sm text-white/60">
                    {Math.floor(song.duration / 60000)}:
                    {String(Math.floor((song.duration % 60000) / 1000)).padStart(2, "0")}
                  </p>
                </div>
              </div>
              <a
                href={song.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Album;
