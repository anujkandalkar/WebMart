import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="container mt-4">
      <h2>Your Shopping Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {cart.map((item, index) => (
            <div className="card mb-3 p-3 flex-row align-items-center" key={index}>
              <img src={item.image} style={{width: '80px'}} alt={item.title}/>
              <div className="ms-3 flex-grow-1">
                <h5>{item.title}</h5>
                <p className="fw-bold">₹{item.price}</p>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4>Total: ₹{total}</h4>
            <button className="btn btn-warning w-100 fw-bold mt-2">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}