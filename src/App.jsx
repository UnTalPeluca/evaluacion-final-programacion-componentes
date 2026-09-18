import { Component } from 'react';
import CatalogoProductos from './components/Ejercicio1/CatalogoProductos';
import FormularioFirestore from './components/Ejercicio2/FormularioFirestore';
import ListaProductosInventario from './components/Ejercicio2/ListaProductosInventario';
import AuthStorage from './components/Ejercicio3/AuthStorage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vistaActual: 'ej1'
    };
  }

  render() {
    return (
      <div className="min-vh-100 d-flex flex-column bg-light">
        <nav className="navbar navbar-expand navbar-dark bg-dark shadow-sm">
          <div className="container">
            <span className="navbar-brand fw-bold">Evaluación Final</span>
            <div className="d-flex gap-2">
              <button
                className={`btn btn-sm ${this.state.vistaActual === 'ej1' ? 'btn-light fw-bold' : 'btn-outline-light'}`}
                onClick={() => this.setState({ vistaActual: 'ej1' })}
              >
                Ejercicio 1
              </button>
              <button
                className={`btn btn-sm ${this.state.vistaActual === 'ej2' ? 'btn-light fw-bold' : 'btn-outline-light'}`}
                onClick={() => this.setState({ vistaActual: 'ej2' })}
              >
                Ejercicio 2
              </button>
              <button
                className={`btn btn-sm ${this.state.vistaActual === 'ej3' ? 'btn-light fw-bold' : 'btn-outline-light'}`}
                onClick={() => this.setState({ vistaActual: 'ej3' })}
              >
                Ejercicio 3
              </button>
            </div>
          </div>
        </nav>

        <main className="container my-5 flex-grow-1">
          {this.state.vistaActual === 'ej1' && <CatalogoProductos />}
          {this.state.vistaActual === 'ej2' && (
            <>
              <FormularioFirestore />
              <ListaProductosInventario />
            </>
          )}
          {this.state.vistaActual === 'ej3' && <AuthStorage />}
        </main>
      </div>
    );
  }
}

export default App;