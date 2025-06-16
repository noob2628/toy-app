//src: app/toys/page.js
"use client";
import { useState, useEffect } from 'react';

export default function ToyList() {
  const [toys, setToys] = useState([]);
  const [newToy, setNewToy] = useState({ name: '', color: '' });
  const [editingToy, setEditingToy] = useState(null);

  // Fetch all toys on page load
  useEffect(() => {
    fetchToys();
  }, []);

  const fetchToys = () => {
    fetch('/api/toys')
      .then(res => res.json())
      .then(data => setToys(data));
  };

  // Add new toy
  const addToy = async () => {
    const res = await fetch('/api/toys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newToy),
    });
    if (res.ok) {
      alert('Toy added!');
      setNewToy({ name: '', color: '' });
      fetchToys();
    }
  };

  // Update toy
  const updateToy = async () => {
    const res = await fetch(`/api/toys/${editingToy.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newToy),
    });
    if (res.ok) {
      alert('Toy updated!');
      setEditingToy(null);
      setNewToy({ name: '', color: '' });
      fetchToys();
    }
  };

  // Delete toy
  const deleteToy = async (id) => {
    if (!confirm("Remove this toy forever?")) return;
    const res = await fetch(`/api/toys/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Toy removed!');
      fetchToys();
    }
  };

  // Start editing a toy
  const startEditing = (toy) => {
    setEditingToy(toy);
    setNewToy({ name: toy.name, color: toy.color });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🎮 My Toy Collection</h1>
      
      {/* Add/Edit Toy Form */}
      <div style={{ marginBottom: '20px' }}>
        <input
          value={newToy.name}
          onChange={e => setNewToy({ ...newToy, name: e.target.value })}
          placeholder="Toy name"
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          value={newToy.color}
          onChange={e => setNewToy({ ...newToy, color: e.target.value })}
          placeholder="Color"
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button 
          onClick={editingToy ? updateToy : addToy} 
          style={{ padding: '8px 15px', background: editingToy ? '#4CAF50' : '#2196F3', color: 'white' }}
        >
          {editingToy ? 'Update Toy' : 'Add Toy'}
        </button>
        {editingToy && (
          <button 
            onClick={() => {
              setEditingToy(null);
              setNewToy({ name: '', color: '' });
            }}
            style={{ marginLeft: '10px', padding: '8px 15px', background: '#f44336', color: 'white' }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Toy List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {toys.map(toy => (
          <li key={toy.id} style={{ 
            margin: '10px 0', 
            padding: '10px', 
            border: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div>
              <strong>{toy.name}</strong> - {toy.color}
            </div>
            <div>
              <button 
                onClick={() => startEditing(toy)}
                style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', marginRight: '5px' }}
              >
                Edit
              </button>
              <button 
                onClick={() => deleteToy(toy.id)}
                style={{ background: '#ff6b6b', color: 'white', border: 'none', padding: '5px 10px' }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}