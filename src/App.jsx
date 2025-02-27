import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const [books, setBooks]=useState([]);
  const [newBook,setNewBooks]=useState({title:'',author:'',imafe_url:''}); 
  const uri='https://supreme-bassoon-x5pxp7w6jx7wcpjr7-5001.app.github.dev/';

  useEffect(()=>{
    fetchBooks();
  },[]);

  const handleInputChange = (event)=>{
    const {name,value} = event.target;
    setNewBooks({...newBook,[name]:value});
}
const handleInputBook = async ()=>{
  try{
    const response = await axios.post(`${uri}/books`,newbook);
    setBooks([...books,response.data]);
    setNewBook({title:'',author:'',image_url:''});
  }catch(error){
    console.error('Error creating book:',error);
  }
}  

  const fetchBooks = async ()=>{
    try{
      const response=await axios.get(`${uri}/books`);
      setBooks(response.data.books);
    }catch(error){
      console.error( ' Error fetching books: ',error);
    }
  }
  return (
    <div><h1>Book List </h1>
    <table>
    <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Title</th>
          <th>Author</th>
          <th>Actions</th>
        </tr>
  </thead>
  <tbody>
  {
    books.map((book)=>(
      <tr key={book.id}>
      <td>{book.id}</td>
      <img src={book.image_url} alt={book.title} width="50"/>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <button>Edit</button>
      <button>Delete</button>
      </tr>
    ))
    }
  </tbody>
      </table>
      <h2>Add New Book </h2>
      <input type= "text" name="title" placeholder="Title"
      value={newBook.title} onChange={handleInputChange}/> 
      <input type= "text" name="author" placeholder="Author"
      value={newBook.author} onChange={handleInputChange}/>
      <input type= "text" name="image_url" placeholder="Image URL"
      value={newBook.image_url} onChange={handleInputChange}/>
      <button onClick={handleInputBook}>Create</button>
      </div>
  );
}

export default App;