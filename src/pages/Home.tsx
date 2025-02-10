
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Artist {
  _id: string;
  name: string;
  image: string;
  genres: string[];
}

const Home = () => {
  const { data: topArtists, isLoading, error } = useQuery<Artist[]>({
    queryKey: ["topArtists"],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:5000/api/artists/top");
        if (!response.ok) {
          throw new Error("Error fetching artists");
        }
        return response.json();
      } catch (err) {
        console.error("Error fetching artists:", err);
        toast.error("Error loading artists. Please try again later.");
        throw err;
      }
    },
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-red-400">
          Error loading artists. Please try again later.
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Bienvenido a AEFSONGS</h1>
        <p className="text-lg text-white/80">
          Explora música, descubre artistas y comparte tu pasión
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Artistas Destacados</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-secondary/50 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topArtists?.map((artist) => (
              <Link
                key={artist._id}
                to={`/artist/${artist._id}`}
                className="group relative overflow-hidden rounded-lg aspect-video"
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-xl font-semibold">{artist.name}</h3>
                    <p className="text-sm text-white/80">
                      {artist.genres.join(", ")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
