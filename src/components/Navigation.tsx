
import { Search, Home, Music, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold text-white hover:text-accent transition-colors">
            AEFSONGS
          </Link>
          
          <div className="flex-1 max-w-xl hidden md:flex items-center gap-2">
            <Input
              type="search"
              placeholder="Buscar artistas, álbumes o canciones..."
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button variant="outline" className="shrink-0">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/music">
              <Button variant="ghost" size="icon">
                <Music className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
