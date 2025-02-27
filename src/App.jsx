import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
 
function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBooks] = useState({ title: '', author: '', image_url: '' });
  const [editBook, setEditBook] = useState(null); // For editing a book
 
  const uri = 'https://cautious-dollop-4jv6v574x5q5hqpvx-5001.app.github.dev/';
 
  useEffect(() => {
    fetchBooks();
  }, []);
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBooks({ ...newBook, [name]: value });
  };
 
  const handleInputBook = async () => {
    if (!newBook.title.trim() || !newBook.author.trim() || !newBook.image_url.trim()) {
      alert('Please enter complete information');
      return;
    }
 
    try {
      const response = await axios.post(`${uri}/books`, newBook);
      setBooks([...books, response.data]);
      setNewBooks({ title: '', author: '', image_url: '' });
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };
 
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${uri}/books`);
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
 
  const handleEditBook = (book) => {
    setEditBook(book);
    setNewBooks({ title: book.title, author: book.author, image_url: book.image_url });
  };
 
  const handleUpdateBook = async () => {
    if (!newBook.title.trim() || !newBook.author.trim() || !newBook.image_url.trim()) {
      alert('Please enter complete information');
      return;
    }
 
    try {
      const response = await axios.put(`${uri}/books/${editBook.id}`, newBook);
      const updatedBooks = books.map((book) =>
        book.id === editBook.id ? response.data : book
      );
      setBooks(updatedBooks);
      setNewBooks({ title: '', author: '', image_url: '' });
      setEditBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };
 
  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${uri}/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
 
  return (
    <div>
      <h1>Book List</h1>
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
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td><img src={book.image_url} alt={book.title} width="50" /></td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => handleEditBook(book)}>Edit</button>
                <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
      <h2>{editBook ? 'Update Book' : 'Add New Book'}</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newBook.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={newBook.author}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="image_url"
        placeholder="Image URL"
        value={newBook.image_url}
        onChange={handleInputChange}
      />
      {editBook ? (
        <button onClick={handleUpdateBook}>Update </button>
      ) : (
        <button onClick={handleInputBook}>Create </button>
      )}
    </div>
  );
}
 
export default App;