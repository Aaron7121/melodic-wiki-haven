
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const GENRES = [
  "rap",
  "hip hop",
  "pop",
  "rock",
  "electronic",
  "latin",
  "r&b",
  "jazz",
];

interface Artist {
  _id: string;
  name: string;
  image: string;
  genres: string[];
}

const Music = () => {
  const { data: artistsByGenre, isLoading, error } = useQuery<Artist[]>({
    queryKey: ["artistsByGenre"],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:5000/api/artists/by-genre");
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
        <h1 className="text-4xl font-bold">Explorar por Género</h1>
        <div className="flex flex-wrap justify-center gap-2">
          {GENRES.map((genre) => (
            <Button
              key={genre}
              variant="secondary"
              className="capitalize"
            >
              {genre}
            </Button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-secondary/50 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {artistsByGenre?.map((artist) => (
              <Link
                key={artist._id}
                to={`/artist/${artist._id}`}
                className="group bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{artist.name}</h3>
                  <p className="text-sm text-white/60">
                    {artist.genres.join(", ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Music;
