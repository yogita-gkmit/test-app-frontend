import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ItemCard from './ItemCard';

const ItemList = ({ items, onEdit, onDelete }) => {
  if (!items || items.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem', 
        color: 'var(--text-secondary)',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '1rem',
        border: '1px dashed var(--glass-border)'
      }}>
        <p>No items found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
      gap: '2rem',
      padding: '1rem 0'
    }}>
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <ItemCard 
            key={item.id} 
            item={item} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ItemList;
