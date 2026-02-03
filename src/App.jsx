import React, { useState, useEffect } from 'react';
import { Plus, Search, Layers } from 'lucide-react';
import api from './services/api';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

function App() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await api.get('/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = async (data) => {
    try {
      const response = await api.post('/items', data);
      setItems([...items, response.data]);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleUpdate = async (data) => {
    if (!editingItem) return;
    try {
      const response = await api.patch(`/items/${editingItem.id}`, data);
      setItems(items.map((item) => (item.id === editingItem.id ? response.data : item)));
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/items/${id}`);
        setItems(items.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '3rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', 
            padding: '0.75rem', 
            borderRadius: '1rem',
            boxShadow: '0 4px 15px var(--accent-glow)'
          }}>
            <Layers color="white" size={32} />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: 1 }}>
              Item<span style={{ color: 'var(--accent-secondary)' }}>Manager</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Elegant inventory management</p>
          </div>
        </div>

        <button onClick={openCreateModal} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} />
          <span>New Item</span>
        </button>
      </header>

      <div style={{ marginBottom: '2rem', position: 'relative' }}>
        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={20} />
        <input 
          type="text" 
          placeholder="Search items..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field"
          style={{ paddingLeft: '3rem' }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>Loading...</div>
      ) : (
        <ItemList 
          items={filteredItems} 
          onEdit={openEditModal} 
          onDelete={handleDelete} 
        />
      )}

      <ItemForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={editingItem ? handleUpdate : handleCreate}
        initialData={editingItem}
      />
    </div>
  );
}

export default App;
