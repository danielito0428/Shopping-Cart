import { useState } from "react";
import "./App.css";

const items = [
  { id: 1, name: "Taco Seasoning", price: 2.25, qty: 2 },
  { id: 2, name: "Pinto Beans", price: 1.99, qty: 3 },
  { id: 3, name: "Sour Cream", price: 3.5, qty: 1 },
];

function App() {
  const [itemList, setItemList] = useState(items);
  const [shoppingList, setShoppingList] = useState([]);

  function handleAddItemToShoppingCart(newItem) {
    if (isItemInTheCart(shoppingList, newItem.id)) {
      console.log(`${newItem.name} already in the cart`);
      handleUpdate(newItem.id);
    } else {
      setShoppingList((shoppingList) => [...shoppingList, newItem]);
    }
  }
  function isItemInTheCart(shoppingCart, itemId) {
    return shoppingCart.some((item) => item.id === itemId);
  }

  function handleUpdate(itemId) {
    setShoppingList((shoppingList) =>
      shoppingList.map((item) =>
        item.id === itemId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }

  function handleDelete(itemId) {
    setShoppingList((shoppingList) =>
      shoppingList.filter((item) => item.id !== itemId)
    );
  }

  return (
    <div>
      <ItemList itemList={itemList} onAdd={handleAddItemToShoppingCart} />
      <ShoppingCart
        shoppingList={shoppingList}
        items={itemList}
        onDelete={handleDelete}
      />
    </div>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

function ItemList({ itemList, onAdd }) {
  return (
    <ul>
      {itemList.map((item) => (
        <Item item={item} key={item.id} onAdd={onAdd} />
      ))}
    </ul>
  );
}
function Item({ item, onAdd }) {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [id, setId] = useState(item.id);
  const [qty, setQty] = useState(1);
  function addItem() {
    const newItem = { id, name, price, qty: qty };

    onAdd(newItem);
  }
  if (item.qty === 0) return;
  return (
    <li>
      <h3>{item.name}</h3>
      <p>Price: {item.price}$</p>
      <p>Quantity: {item.qty}</p>
      <Button onClick={() => addItem(item)}>Add</Button>
    </li>
  );
}

function ShoppingCart({ shoppingList, onDelete, isItemInTheCart }) {
  return (
    <div>
      <h3>Shopping Cart</h3>

      <ul>
        {shoppingList.map((item) => (
          <li key={item.id}>
            <p>
              {item.name} x{item.qty}
            </p>
            <p>{item.price}$ p/u</p>
            <Button onClick={() => onDelete(item.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
