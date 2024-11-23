<command>cat > src/pages/admin/CategoryManager.tsx << 'EOF'
import React, { useState } from 'react';
import { Plus, Edit2, Trash, Save, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Communication', description: 'Improve verbal and non-verbal communication' },
    { id: '2', name: 'Trust', description: 'Build and maintain trust in relationships' },
    { id: '3', name: 'Intimacy', description: 'Enhance emotional and physical connection' },
    { id: '4', name: 'Goals', description: 'Set and achieve relationship goals together' }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setNewCategory({ name: category.name, description: category.description });
  };

  const handleSave = () => {
    if (editingId) {
      setCategories(prev => prev.map(cat => 
        cat.id === editingId 
          ? { ...cat, name: newCategory.name, description: newCategory.description }
          : cat
      ));
      setEditingId(null);
    } else {
      setCategories(prev => [...prev, { 
        id: Date.now().toString(),
        name: newCategory.name,
        description: newCategory.description
      }]);
      setShowAddForm(false);
    }
    setNewCategory({ name: '', description: '' });
  };

  const handleDelete = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Milestone Categories</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul className="divide-y divide-gray-200">
          {categories.map((category) => (
            <li key={category.id} className="p-4">
              {editingId === category.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                    placeholder="Category name"
                  />
                  <input
                    type="text"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                    placeholder="Description"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-1 text-gray-400 hover:text-gray-500"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Category</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                placeholder="Category name"
              />
              <input
                type="text"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                placeholder="Description"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewCategory({ name: '', description: '' });
                  }}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
EOF</command>