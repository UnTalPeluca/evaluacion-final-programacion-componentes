import { Component } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

class ListaProductosInventario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      cargando: true,
      error: null
    };
    this.unsubscribe = null;
  }

  componentDidMount() {
    try {
      const q = query(
        collection(db, 'productos_inventario'),
        orderBy('fechaCreacion', 'desc')
      );

      this.unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const lista = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          this.setState({ productos: lista, cargando: false });
        },
        (err) => {
          console.error('Error al escuchar Firestore:', err);
          this.setState({ error: 'No se pudo cargar el inventario.', cargando: false });
        }
      );
    } catch (err) {
      console.error('Error inicializando Firestore listener:', err);
      this.setState({ error: 'Error de conexión.', cargando: false });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { productos, cargando, error } = this.state;

    return (
      <div className="card shadow-sm p-4 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Productos en Inventario</h5>
          <span className="badge bg-secondary">{productos.length} items</span>
        </div>

        {cargando && (
          <div className="text-center py-3">
            <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
            <span className="text-muted small">Cargando inventario desde Firestore...</span>
          </div>
        )}

        {error && <div className="alert alert-danger py-2">{error}</div>}

        {!cargando && !error && productos.length === 0 && (
          <p className="text-muted mb-0 small">No hay productos registrados todavía.</p>
        )}

        {!cargando && productos.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light small">
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th className="text-end">Precio</th>
                  <th className="text-center">Stock</th>
                </tr>
              </thead>
              <tbody className="small">
                {productos.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="fw-semibold">{item.nombreProducto}</div>
                      {item.descripcion && (
                        <div className="text-muted text-truncate" style={{ maxWidth: '220px' }}>
                          {item.descripcion}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {item.categoria}
                      </span>
                    </td>
                    <td className="text-end fw-semibold">
                      ${Number(item.precio).toLocaleString('es-CL')}
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge ${
                          item.stock > 0 ? 'bg-success' : 'bg-danger'
                        }`}
                      >
                        {item.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default ListaProductosInventario;