import { Component } from 'react';
import ProductoItem from './ProductoItem';
import CarritoResumen from './CarritoResumen';

class CatalogoProductos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productos: [
        { id: 1, nombre: 'Teclado Mecánico RGB', precio: 45000, img: 'https://media.falabella.com/falabellaCL/149525800_01/' },
        { id: 2, nombre: 'Mouse Inalámbrico Gamer', precio: 28000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS_jD2DeO_Mcq7D4JdZ-k88ST6i7LZMH803ko9pL1ZSeu8RDnIVNyxDiQB&s=10' },
        { id: 3, nombre: 'Monitor 24" 144Hz IPS', precio: 135000, img: 'https://assets.pcfactory.cl/public/foto/55092/google_1000.jpg' },
        { id: 4, nombre: 'Audifonos con Micrófono', precio: 32000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpl4oJPmnWfqNEzb1YC-Bs51BPyaX1Kr8t-NqUOK6CSA&s' }
      ],
      carrito: []
    };

    this.handleAgregarAlCarrito = this.handleAgregarAlCarrito.bind(this);
    this.handleVaciarCarrito = this.handleVaciarCarrito.bind(this);
  }

  handleAgregarAlCarrito(producto) {
    this.setState((prevState) => {
      const existeIndex = prevState.carrito.findIndex((item) => item.id === producto.id);

      if (existeIndex !== -1) {
        const nuevoCarrito = [...prevState.carrito];
        nuevoCarrito[existeIndex] = {
          ...nuevoCarrito[existeIndex],
          cantidad: nuevoCarrito[existeIndex].cantidad + 1
        };
        return { carrito: nuevoCarrito };
      }

      return {
        carrito: [...prevState.carrito, { ...producto, cantidad: 1 }]
      };
    });
  }

  handleVaciarCarrito() {
    this.setState({
      carrito: []
    });
  }

  render() {
    const { productos, carrito } = this.state;

    return (
      <div className="container my-4">
        <h2 className="mb-4">Ejercicio 1: Catálogo y Carrito</h2>
        <div className="row">
          <div className="col-md-7">
            <h4 className="mb-3">Productos Disponibles</h4>
            {productos.map((prod) => (
              <ProductoItem
                key={prod.id}
                producto={prod}
                onAgregarAlCarrito={this.handleAgregarAlCarrito}
              />
            ))}
          </div>

          <div className="col-md-5">
            <CarritoResumen
              carrito={carrito}
              onVaciarCarrito={this.handleVaciarCarrito}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CatalogoProductos;