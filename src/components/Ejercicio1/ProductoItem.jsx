import { Component } from 'react';

class ProductoItem extends Component {
  render() {
    const { producto, onAgregarAlCarrito } = this.props;

    return (
      <div className="card mb-3 shadow-sm">
        <div className="row g-0 align-items-center">
          <div className="col-3 col-sm-2 text-center p-2">
            <img
              src={producto.img}
              alt={producto.nombre}
              className="img-fluid rounded"
              style={{ maxHeight: '80px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-9 col-sm-10">
            <div className="card-body d-flex justify-content-between align-items-center py-2">
              <div className="pe-2">
                <h5 className="card-title mb-1 fs-6 fs-sm-5">{producto.nombre}</h5>
                <p className="card-text text-muted mb-0 small">
                  Precio: ${producto.precio.toLocaleString('es-CL')}
                </p>
              </div>
              <button
                className="btn btn-primary d-inline-flex align-items-center justify-content-center px-3"
                onClick={() => onAgregarAlCarrito(producto)}
                title="Agregar al Carrito"
                aria-label="Agregar al Carrito"
              >
                <span className="d-inline d-md-none fw-bold fs-5 lh-1">+</span>
                <span className="d-none d-md-inline">Agregar al Carrito</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductoItem;