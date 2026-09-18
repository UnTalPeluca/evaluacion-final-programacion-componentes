import { Component } from 'react';

class CarritoResumen extends Component {
  render() {
    const { carrito, onVaciarCarrito } = this.props;
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return (
      <div className="card shadow-sm border-primary">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Carrito de Compras</h5>
          <span className="badge bg-light text-dark">{totalItems} items</span>
        </div>
        <div className="card-body">
          {carrito.length === 0 ? (
            <p className="text-muted mb-0">El carrito está vacío.</p>
          ) : (
            <>
              <ul className="list-group list-group-flush mb-3">
                {carrito.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center px-0"
                  >
                    <div>
                      <span>{item.nombre}</span>
                      {item.cantidad > 1 && (
                        <span className="badge bg-secondary ms-2">x{item.cantidad}</span>
                      )}
                    </div>
                    <strong>${(item.precio * item.cantidad).toLocaleString('es-CL')}</strong>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between align-items-center border-top pt-2">
                <span className="fs-5">Total:</span>
                <span className="fs-5 fw-bold text-success">
                  ${totalPrecio.toLocaleString('es-CL')}
                </span>
              </div>
              <button
                className="btn btn-outline-danger btn-sm w-100 mt-3"
                onClick={onVaciarCarrito}
              >
                Vaciar Carrito
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default CarritoResumen;