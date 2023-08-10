import "./style.css";


import { useState, useEffect } from 'react';
import axios from 'axios';

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [randomJoke, setRandomJoke] = useState('');

  useEffect(() => {
    axios.get('https://api.chucknorris.io/jokes/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const fetchRandomJoke = () => {
    if (selectedCategory) {
      axios.get(`https://api.chucknorris.io/jokes/random?category=${selectedCategory}`)
        .then(response => {
          setRandomJoke(response.data.value);
        })
        .catch(error => {
          console.error('Error fetching random joke:', error);
        });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold underline">Chuck Norris Joke Categories</h1>
      <ul className="list-none pl-8">
        {categories.map(category => (
          <li
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="cursor-pointer text-blue-500 hover:underline mb-2 hover:text:blue"
          >
            {category}
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <div className="mt-4">
          <button
            onClick={fetchRandomJoke}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Get Random Joke
          </button>
          {randomJoke && <p className="mt-4">{randomJoke}</p>}
        </div>
      )}
    </div>
  );
};

export default ListCategories;
