import { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

class FormularioFirestore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombreProducto: '',
      categoria: '',
      precio: '',
      stock: '',
      descripcion: '',
      mensajeExito: false
    };

    this.validator = new SimpleReactValidator({
      messages: {
        required: 'Este campo es obligatorio.',
        numeric: 'Debe ser un número válido.',
        min: 'El valor no cumple el mínimo requerido.',
        max: 'Supera el límite permitido.'
      }
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.validator.allValid()) {
      try {
        await addDoc(collection(db, 'productos_inventario'), {
          nombreProducto: this.state.nombreProducto,
          categoria: this.state.categoria,
          precio: Number(this.state.precio),
          stock: Number(this.state.stock),
          descripcion: this.state.descripcion,
          fechaCreacion: new Date()
        });

        this.setState({
          nombreProducto: '',
          categoria: '',
          precio: '',
          stock: '',
          descripcion: '',
          mensajeExito: true
        });
        this.validator.hideMessages();
      } catch (error) {
        console.error("Error al guardar en Firestore:", error);
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className="card shadow-sm p-4">
        <h2 className="mb-3">Ejercicio 2: Registro de Producto (Firestore)</h2>

        {this.state.mensajeExito && (
          <div className="alert alert-success">Producto registrado con éxito en la base de datos.</div>
        )}

        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre del Producto</label>
            <input
              type="text"
              name="nombreProducto"
              className="form-control"
              value={this.state.nombreProducto}
              onChange={this.handleChange}
            />
            <span className="text-danger small">
              {this.validator.message('nombreProducto', this.state.nombreProducto, 'required|min:3')}
            </span>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Categoría</label>
              <select
                name="categoria"
                className="form-select"
                value={this.state.categoria}
                onChange={this.handleChange}
              >
                <option value="">Seleccione una categoría...</option>
                <option value="Periféricos">Periféricos</option>
                <option value="Hardware">Hardware</option>
                <option value="Audio">Audio</option>
                <option value="Accesorios">Accesorios</option>
              </select>
              <span className="text-danger small">
                {this.validator.message('categoria', this.state.categoria, 'required')}
              </span>
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">Precio ($)</label>
              <input
                type="number"
                name="precio"
                className="form-control"
                value={this.state.precio}
                onChange={this.handleChange}
              />
              <span className="text-danger small">
                {this.validator.message('precio', this.state.precio, 'required|numeric|min:100,num')}
              </span>
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">Stock Inicial</label>
              <input
                type="number"
                name="stock"
                className="form-control"
                value={this.state.stock}
                onChange={this.handleChange}
              />
              <span className="text-danger small">
                {this.validator.message('stock', this.state.stock, 'required|numeric|min:0,num')}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              name="descripcion"
              rows="3"
              className="form-control"
              value={this.state.descripcion}
              onChange={this.handleChange}
            />
            <span className="text-danger small">
              {this.validator.message('descripcion', this.state.descripcion, 'required|max:200')}
            </span>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Guardar Producto
          </button>
        </form>
      </div>
    );
  }
}

export default FormularioFirestore;