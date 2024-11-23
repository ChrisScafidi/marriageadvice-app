import React, { useState } from 'react';
import { CheckCircle, MessageCircle, BookOpen, Plus, ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddMilestoneModal from './AddMilestoneModal';

interface Milestone {
  id: string;
  title: string;
  progress: number;
  total: number;
  category: 'Communication' | 'Trust' | 'Intimacy' | 'Goals';
  description?: string;
  steps: Array<{
    id: string;
    text: string;
    completed: boolean;
  }>;
}

const milestones: Milestone[] = [
  {
    id: '1',
    title: 'Complete Daily Check-ins',
    progress: 5,
    total: 7,
    category: 'Communication',
    steps: [
      { id: '1-1', text: 'Monday Check-in', completed: true },
      { id: '1-2', text: 'Tuesday Check-in', completed: true },
      { id: '1-3', text: 'Wednesday Check-in', completed: true },
      { id: '1-4', text: 'Thursday Check-in', completed: true },
      { id: '1-5', text: 'Friday Check-in', completed: true },
      { id: '1-6', text: 'Saturday Check-in', completed: false },
      { id: '1-7', text: 'Sunday Check-in', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Practice Active Listening',
    progress: 3,
    total: 5,
    category: 'Trust',
    steps: [
      { id: '2-1', text: 'Learn HEAR technique', completed: true },
      { id: '2-2', text: 'Practice with partner', completed: true },
      { id: '2-3', text: 'Reflect on conversation', completed: true },
      { id: '2-4', text: 'Get partner feedback', completed: false },
      { id: '2-5', text: 'Maintain for a week', completed: false }
    ]
  }
];

export default function ProgressTracker() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localMilestones, setLocalMilestones] = useState<Milestone[]>(milestones);
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);

  const categories = ['all', 'Communication', 'Trust', 'Intimacy', 'Goals'];

  const filteredMilestones = activeCategory === 'all' 
    ? localMilestones 
    : localMilestones.filter(m => m.category.toLowerCase() === activeCategory.toLowerCase());

  const handleAddMilestone = (newMilestone: {
    title: string;
    category: string;
    total: number;
    description?: string;
  }) => {
    const milestone: Milestone = {
      id: Date.now().toString(),
      title: newMilestone.title,
      progress: 0,
      total: newMilestone.total,
      category: newMilestone.category as 'Communication' | 'Trust' | 'Intimacy' | 'Goals',
      description: newMilestone.description,
      steps: Array.from({ length: newMilestone.total }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        text: `Step ${i + 1}`,
        completed: false
      }))
    };

    setLocalMilestones(prev => [...prev, milestone]);
  };

  const toggleStep = (milestoneId: string, stepId: string) => {
    setLocalMilestones(prev => prev.map(milestone => {
      if (milestone.id === milestoneId) {
        const updatedSteps = milestone.steps.map(step => 
          step.id === stepId ? { ...step, completed: !step.completed } : step
        );
        return {
          ...milestone,
          steps: updatedSteps,
          progress: updatedSteps.filter(step => step.completed).length
        };
      }
      return milestone;
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Progress Tracker</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary py-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Milestone
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-rose-50 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-rose-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Milestones</p>
              <p className="text-2xl font-bold text-rose-600">12/15</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <MessageCircle className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Chat Sessions</p>
              <p className="text-2xl font-bold text-purple-600">24</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Resources</p>
              <p className="text-2xl font-bold text-blue-600">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeCategory === category
                ? 'bg-rose-100 text-rose-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {filteredMilestones.map((milestone) => (
          <div 
            key={milestone.id} 
            className="border border-gray-200 rounded-lg hover:border-rose-200 transition-colors"
          >
            <div 
              className="p-4 cursor-pointer"
              onClick={() => setExpandedMilestone(
                expandedMilestone === milestone.id ? null : milestone.id
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                  <span className="text-sm text-gray-500">{milestone.category}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {milestone.progress}/{milestone.total}
                </span>
              </div>
              {milestone.description && (
                <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
              )}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-rose-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(milestone.progress / milestone.total) * 100}%` }}
                />
              </div>
            </div>

            {/* Expanded Steps */}
            {expandedMilestone === milestone.id && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Steps</h4>
                <div className="space-y-2">
                  {milestone.steps.map((step) => (
                    <div
                      key={step.id}
                      className="flex items-center space-x-3"
                    >
                      <button
                        onClick={() => toggleStep(milestone.id, step.id)}
                        className={`flex items-center justify-center w-5 h-5 rounded-full border ${
                          step.completed
                            ? 'bg-rose-500 border-rose-500 text-white'
                            : 'border-gray-300 hover:border-rose-500'
                        }`}
                      >
                        {step.completed && <Check className="w-3 h-3" />}
                      </button>
                      <span className={`text-sm ${
                        step.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View All Link */}
      <Link 
        to="/progress"
        className="mt-6 flex items-center justify-center text-sm text-rose-600 hover:text-rose-700"
      >
        View Detailed Progress
        <ChevronRight className="h-4 w-4 ml-1" />
      </Link>

      {/* Add Milestone Modal */}
      <AddMilestoneModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddMilestone}
      />
    </div>
  );
}