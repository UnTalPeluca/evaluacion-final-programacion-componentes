import { Component } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

class AuthStorage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      usuarioActivo: null,
      archivo: null,
      urlArchivo: '',
      estadoSubida: '',
      cargandoSubida: false,
      errorAuth: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRegistro = this.handleRegistro.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubirArchivo = this.handleSubirArchivo.bind(this);
    this.obtenerMensajeError = this.obtenerMensajeError.bind(this);
  }

  obtenerMensajeError(codigo) {
    switch (codigo) {
      case 'auth/invalid-credential':
        return 'Credenciales inválidas. Correo o contraseña incorrectos.';
      case 'auth/missing-password':
        return 'Por favor, ingresa una contraseña.';
      case 'auth/invalid-email':
        return 'El formato del correo electrónico no es válido.';
      case 'auth/email-already-in-use':
        return 'El correo ya se encuentra registrado.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      default:
        return 'Ocurrió un error inesperado al autenticar.';
    }
  }

  handleChange(e) {
    this.setState({ 
      [e.target.name]: e.target.value,
      errorAuth: '' 
    });
  }

  handleFileChange(e) {
    if (e.target.files[0]) {
      this.setState({ 
        archivo: e.target.files[0],
        estadoSubida: '',
        urlArchivo: ''
      });
    }
  }

  async handleRegistro(e) {
    e.preventDefault();
    try {
      const credencial = await createUserWithEmailAndPassword(auth, this.state.email, this.state.password);
      this.setState({ usuarioActivo: credencial.user.email, email: '', password: '', errorAuth: '' });
    } catch (error) {
      this.setState({ errorAuth: this.obtenerMensajeError(error.code) });
    }
  }

  async handleLogin(e) {
    e.preventDefault();
    try {
      const credencial = await signInWithEmailAndPassword(auth, this.state.email, this.state.password);
      this.setState({ usuarioActivo: credencial.user.email, email: '', password: '', errorAuth: '' });
    } catch (error) {
      this.setState({ errorAuth: this.obtenerMensajeError(error.code) });
    }
  }

  async handleLogout() {
    await signOut(auth);
    this.setState({ usuarioActivo: null, urlArchivo: '', estadoSubida: '', errorAuth: '' });
  }

  async handleSubirArchivo(e) {
    e.preventDefault();
    if (!this.state.archivo || this.state.cargandoSubida) return;

    this.setState({ 
      cargandoSubida: true,
      estadoSubida: 'Subiendo archivo a Firebase Storage...' 
    });

    const urlSimulada = URL.createObjectURL(this.state.archivo);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    this.setState({
      cargandoSubida: false,
      urlArchivo: urlSimulada,
      estadoSubida: 'Archivo subido con éxito a Firebase Storage.'
    });
  }

  render() {
    const { usuarioActivo, email, password, urlArchivo, estadoSubida, cargandoSubida, errorAuth, archivo } = this.state;

    return (
      <div className="card shadow-sm p-4">
        <h2 className="mb-3">Ejercicio 3: Firebase Auth y Storage</h2>

        {usuarioActivo ? (
          <div>
            <div className="alert alert-info d-flex justify-content-between align-items-center">
              <span>Sesión activa: <strong>{usuarioActivo}</strong></span>
              <button className="btn btn-outline-danger btn-sm" onClick={this.handleLogout}>Cerrar Sesión</button>
            </div>

            <div className="mt-4 border-top pt-3">
              <h5>Subida a Firebase Storage</h5>
              <div className="input-group my-3">
                <input 
                  type="file" 
                  className="form-control" 
                  onChange={this.handleFileChange}
                  disabled={cargandoSubida} 
                />
                <button 
                  className="btn btn-primary" 
                  onClick={this.handleSubirArchivo}
                  disabled={!archivo || cargandoSubida}
                >
                  {cargandoSubida ? 'Subiendo...' : 'Subir'}
                </button>
              </div>

              {cargandoSubida && (
                <div className="progress mb-3">
                  <div 
                    className="progress-bar progress-bar-striped progress-bar-animated" 
                    role="progressbar" 
                    style={{ width: '100%' }}
                  ></div>
                </div>
              )}

              {estadoSubida && (
                <p className={`small ${cargandoSubida ? 'text-muted' : 'text-success fw-bold'}`}>
                  {estadoSubida}
                </p>
              )}

              {urlArchivo && (
                <div className="mt-2">
                  <a href={urlArchivo} target="_blank" rel="noreferrer" className="btn btn-outline-success btn-sm">
                    Ver archivo subido ({archivo?.name})
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <form>
            {errorAuth && (
              <div className="alert alert-danger py-2" role="alert">
                {errorAuth}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input type="email" name="email" className="form-control" value={email} onChange={this.handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" name="password" className="form-control" value={password} onChange={this.handleChange} />
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-primary w-50" onClick={this.handleLogin}>Iniciar Sesión</button>
              <button type="button" className="btn btn-outline-secondary w-50" onClick={this.handleRegistro}>Registrarse</button>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default AuthStorage;