
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

const Artist = () => {
  const { id } = useParams();
  
  const { data: artist, isLoading } = useQuery({
    queryKey: ["artist", id],
    queryFn: async () => {
      const response = await fetch(`/api/artists/${id}`);
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
      <section className="relative h-64 rounded-lg overflow-hidden">
        <img
          src={artist?.image}
          alt={artist?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="p-8">
            <h1 className="text-4xl font-bold">{artist?.name}</h1>
            <p className="text-lg text-white/80">
              {artist?.genres.join(", ")}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Álbumes</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artist?.albums.map((album: { _id: string; image: string; name: string; releaseDate: string }) => (
            <Link
              key={album._id}
              to={`/album/${album._id}`}
              className="group bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={album.image}
                  alt={album.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold line-clamp-2">{album.name}</h3>
                <p className="text-sm text-white/60">
                  {new Date(album.releaseDate).getFullYear()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Artist;
