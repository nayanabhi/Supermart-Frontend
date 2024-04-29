import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import Product from './Product';
import ProductDropdown from './SearchProduct';
import SelectedProducts from './SelectedProducts';
import LogIn from './LogIn';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/all" element={<ProductDropdown />} />
        <Route path="/products/selected" element={<SelectedProducts />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
  // const [todoItems, settodoItems] = useState([
  //   { id: 1, text: 'Learn React' },
  //   { id: 2, text: 'Build a to-do list' },
  //   { id: 3, text: 'Practice coding' }
  // ]);
  // const [newText, setNewText] = useState('')
  // function textOnChangeHandler(e) {
  //   const newText = e.target.value;
  //   setNewText(newText);
  // }
  // function onSumbitHandler(e) {
  //   e.preventDefault();
  //   settodoItems([...todoItems, { id: todoItems.length + 1, text: newText }]);
  //   setNewText('');
  // }
  // function deleteItemHandler(itemId) {
  //   settodoItems(todoItems.filter(item => item.id!== itemId));
  // }
  // return (
  //   <div className="App">
  //     <ul>
  //       {todoItems.map(item => (
  //         <li key={item.id}>{item.text} <button onClick={() => deleteItemHandler(item.id)}>Delete </button></li>
  //       ))}
  //     </ul>
  //     <form onSubmit={onSumbitHandler}>
  //       <input type="text" onChange={textOnChangeHandler} value = {newText} />
  //       <button type="submit">Submit</button>
  //     </form>
  //   </div>
  // );
}

export default App;
