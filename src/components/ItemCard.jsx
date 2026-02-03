import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2, Package } from 'lucide-react';

const ItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-panel"
      style={{
        padding: '1.5rem',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '4px', 
        background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
        opacity: 0.8
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <div style={{ 
          background: 'rgba(139, 92, 246, 0.2)', 
          padding: '0.5rem', 
          borderRadius: '0.75rem',
          color: 'var(--accent-primary)'
        }}>
          <Package size={24} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => onEdit(item)} className="btn-icon" title="Edit">
            <Pencil size={18} />
          </button>
          <button onClick={() => onDelete(item.id)} className="btn-icon" title="Delete" style={{ color: '#ef4444' }}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
        {item.name}
      </h3>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.5', flexGrow: 1 }}>
        {item.description || 'No description provided.'}
      </p>

      <div style={{ 
        marginTop: '1rem', 
        paddingTop: '1rem', 
        borderTop: '1px solid var(--glass-border)',
        fontSize: '0.75rem',
        color: 'rgba(255, 255, 255, 0.4)'
      }}>
        Created {new Date(item.created_at || Date.now()).toLocaleDateString()}
      </div>
    </motion.div>
  );
};

export default ItemCard;
