
const About = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Acerca de AEFSONGS</h1>
        <p className="text-lg text-white/80">
          Una wiki musical moderna para descubrir y explorar música
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Nuestro Proyecto</h2>
        <p className="text-white/80 leading-relaxed">
          AEFSONGS es una plataforma dedicada a conectar a los amantes de la música con sus artistas favoritos. 
          Nuestro objetivo es proporcionar una experiencia de usuario limpia y eficiente para explorar música, 
          descubrir nuevos artistas y compartir la pasión por la música.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-6">
            <h3 className="font-semibold">Desarrollo</h3>
            <p className="text-white/80">Equipo de desarrollo full-stack</p>
          </div>
          <div className="bg-card rounded-lg p-6">
            <h3 className="font-semibold">Diseño</h3>
            <p className="text-white/80">Equipo de diseño UI/UX</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Contacto</h2>
        <div className="bg-card rounded-lg p-6">
          <p className="text-white/80">
            Para cualquier consulta o sugerencia, no dudes en contactarnos:
            <br />
            <a href="mailto:contact@aefsongs.com" className="text-accent hover:underline">
              contact@aefsongs.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
