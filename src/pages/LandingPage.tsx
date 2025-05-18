
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-kindergarten-primary text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                La plataforma perfecta para la gestión de tu jardín infantil
              </h1>
              <p className="text-lg opacity-90">
                Administra tu kindergarten de manera eficiente con nuestra plataforma integral. Calendario, anuncios, evaluaciones y más en un solo lugar.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-kindergarten-primary hover:bg-gray-100">
                  <Link to="/register">Comenzar Ahora</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/login">Iniciar Sesión</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000" 
                alt="Niños felices en kindergarten" 
                className="rounded-lg shadow-xl max-h-96 object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Todo lo que necesitas para tu kindergarten</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nuestra plataforma de gestión está diseñada específicamente para las necesidades de las instituciones de educación preescolar.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-kindergarten-background p-6 rounded-lg shadow-md">
              <div className="bg-kindergarten-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestión de Calendario</h3>
              <p className="text-gray-600">
                Organiza eventos, actividades y fechas importantes en un calendario centralizado y accesible para todo el personal.
              </p>
            </div>
            
            <div className="bg-kindergarten-background p-6 rounded-lg shadow-md">
              <div className="bg-kindergarten-secondary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Anuncios y Comunicaciones</h3>
              <p className="text-gray-600">
                Comunícate eficazmente con el personal y los padres mediante anuncios y notificaciones centralizadas.
              </p>
            </div>
            
            <div className="bg-kindergarten-background p-6 rounded-lg shadow-md">
              <div className="bg-kindergarten-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Evaluación de Estudiantes</h3>
              <p className="text-gray-600">
                Registra y haz seguimiento del progreso de los estudiantes con nuestro sistema integral de evaluación.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 px-4 bg-kindergarten-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros usuarios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Directores y educadores que transformaron la gestión de sus instituciones con nuestra plataforma.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "Esta plataforma ha revolucionado la forma en que gestionamos nuestro kindergarten. La organización de eventos y la comunicación con los padres nunca había sido tan sencilla."
              </p>
              <div className="flex items-center">
                <div className="mr-4 bg-kindergarten-primary rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                  MG
                </div>
                <div>
                  <h4 className="font-semibold">María González</h4>
                  <p className="text-sm text-gray-500">Directora, Jardín Infantil El Principito</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "Como educador, la función de evaluación de estudiantes me permite hacer un seguimiento detallado del progreso de cada niño y compartir información valiosa con los padres."
              </p>
              <div className="flex items-center">
                <div className="mr-4 bg-kindergarten-secondary rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                  JR
                </div>
                <div>
                  <h4 className="font-semibold">Juan Rodríguez</h4>
                  <p className="text-sm text-gray-500">Coordinador, Jardín de Infantes Arcoiris</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-4 bg-kindergarten-primary text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para transformar tu kindergarten?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Únete a cientos de instituciones que ya confían en nuestra plataforma para la gestión diaria de sus jardines infantiles.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-kindergarten-primary hover:bg-gray-100">
              <Link to="/register">Registrarse</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/login">Iniciar Sesión</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-kindergarten-dark text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">KinderCRM</h3>
              <p className="text-gray-400">
                Plataforma integral para la gestión de jardines infantiles y centros de educación preescolar.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Inicio</Link></li>
                <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Características</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Precios</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Contacto</h3>
              <address className="text-gray-400 not-italic">
                <p>Email: info@kindercrm.com</p>
                <p>Teléfono: +1 (555) 123-4567</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} KinderCRM. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
