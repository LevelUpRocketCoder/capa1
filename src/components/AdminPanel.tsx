import React, { useState, useRef } from 'react';
import { X, Upload, Save, AlertCircle, Plus, List, Trash2 } from 'lucide-react';
import { ProductItem } from '../types';

interface AdminPanelProps {
  products: ProductItem[];
  onClose: () => void;
  onProductAdded: (product: ProductItem) => void;
  onProductDeleted: (id: string) => void;
}

export default function AdminPanel({ products, onClose, onProductAdded, onProductDeleted }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'galletas',
    division: 'galleteria',
    spec: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !imagePreview) {
      setError('Por favor completa todos los campos requeridos y selecciona una imagen.');
      return;
    }

    setLoading(true);
    setError(null);

    const newProduct = {
      id: `custom_${Date.now()}`,
      ...formData,
      imageData: imagePreview,
      image: '',
    };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error('Error al guardar el producto');

      const data = await response.json();
      onProductAdded(data.product);
      
      // Reset form and go back to list
      setFormData({
        name: '', description: '', category: 'galletas', division: 'galleteria', spec: ''
      });
      setImageFile(null);
      setImagePreview(null);
      setActiveTab('list');
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar');
      onProductDeleted(id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <h2 className="text-2xl font-accent font-bold text-white tracking-widest uppercase">
              Admin <span className="text-gold">Panel</span>
            </h2>
            <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setActiveTab('list')}
                className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${
                  activeTab === 'list' ? 'bg-gold text-black' : 'text-white/60 hover:text-white'
                }`}
              >
                <List size={16} /> Lista de Productos
              </button>
              <button
                onClick={() => setActiveTab('add')}
                className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${
                  activeTab === 'add' ? 'bg-gold text-black' : 'text-white/60 hover:text-white'
                }`}
              >
                <Plus size={16} /> Añadir Producto
              </button>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg flex items-start gap-3 mb-6">
              <AlertCircle className="shrink-0 mt-0.5" size={18} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {activeTab === 'list' ? (
            <div className="space-y-4">
              {products.length === 0 ? (
                <p className="text-white/50 text-center py-12">No hay productos. Añade uno nuevo.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((p) => (
                    <div key={p.id} className="bg-black/50 border border-white/10 rounded-xl p-4 flex gap-4 items-center group relative overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg bg-white/5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold truncate">{p.name}</h4>
                        <p className="text-xs text-white/50 uppercase tracking-widest mt-1">{p.division} / {p.category}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={loading}
                        className="text-white/30 hover:text-red-500 transition-colors p-2 disabled:opacity-50 z-10"
                        title="Eliminar producto"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Image */}
                <div className="space-y-2">
                  <label className="text-xs font-bold font-manrope text-white/50 uppercase tracking-widest">
                    Foto del Producto *
                  </label>
                  <div 
                    className={`border-2 border-dashed rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer transition-all ${
                      imagePreview ? 'border-gold/50 bg-gold/5' : 'border-white/20 bg-white/5 hover:border-gold/50 hover:bg-white/10'
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-full p-2">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <p className="text-white font-bold text-sm">Cambiar Foto</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-6">
                        <Upload className="mx-auto text-gold mb-3" size={32} />
                        <p className="text-white/70 text-sm font-medium">Haz clic para subir</p>
                        <p className="text-white/40 text-xs mt-1">PNG o JPG (Max. 5MB)</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageChange} 
                      accept="image/jpeg, image/png" 
                      className="hidden" 
                    />
                  </div>
                </div>

                {/* Right Column - Details */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold font-manrope text-white/50 uppercase tracking-widest">Nombre del Producto *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                      placeholder="Ej. Galleta Rellenita"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold font-manrope text-white/50 uppercase tracking-widest">División *</label>
                      <select 
                        name="division"
                        value={formData.division}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none"
                      >
                        <option value="galleteria">Galletería</option>
                        <option value="navidad">Navidad</option>
                        <option value="queques">Queques</option>
                      </select>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold font-manrope text-white/50 uppercase tracking-widest">Categoría *</label>
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none"
                      >
                        <option value="galletas">Galletas</option>
                        <option value="reposteria">Repostería</option>
                        <option value="wafer">Wafer</option>
                        <option value="rellenas">Rellenas</option>
                        <option value="panetones">Panetones</option>
                        <option value="roscas">Roscas</option>
                        <option value="queques">Queques</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold font-manrope text-white/50 uppercase tracking-widest">Presentación (Specs)</label>
                    <input 
                      type="text" 
                      name="spec"
                      value={formData.spec}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                      placeholder="Ej. Paquete 150g"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold font-manrope text-white/50 uppercase tracking-widest">Descripción *</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none"
                  placeholder="Describe el producto..."
                />
              </div>
              
              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-6 py-3 rounded-lg font-bold text-white hover:bg-white/5 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-gold hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>Guardando...</>
                  ) : (
                    <>
                      <Save size={18} />
                      Guardar Producto
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
