import React, { useState, useEffect } from "react";

interface Item {
  id: number;
  name: string;
}

const App = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    // Example of fetching data from a server
    fetch("https://localhost/crud")
      .then(res => res.json())
      .then(data => {
        setItems(data.map((item: any) => ({ id: item.id, name: item.title })));
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setItems([...items, { id: items.length + 1, name }]);
    setName("");
  };

  const handleUpdate = (id: number) => {
    setItems(
      items.map(item =>
        item.id === id
          ? { id: item.id, name: prompt("Enter new name", item.name) || item.name }
          : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleUpdate(item.id)}>Update</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
