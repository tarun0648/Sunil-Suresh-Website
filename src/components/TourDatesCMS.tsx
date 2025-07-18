import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  MapPin, 
  Clock, 
  X,
  Save,
  GripVertical,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  addTourDate, 
  updateTourDate, 
  deleteTourDate,
  TourEvent,
  tourDatesData
} from '@/data/tourDatesCMS';
import { useTourDates } from '@/contexts/TourDatesContext';

const TourDatesCMS = () => {
  const { tourDates, refreshTourDates } = useTourDates();
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<TourEvent>>({});
  const [isReordering, setIsReordering] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      date: '',
      venue: '',
      location: '',
      time: '',
      status: 'Available'
    });
  };

  const handleEdit = (tourDate: TourEvent) => {
    setIsEditing(tourDate.id);
    setFormData(tourDate);
  };

  const handleSave = () => {
    if (isAdding) {
      addTourDate(formData as Omit<TourEvent, 'id'>);
      refreshTourDates();
      setIsAdding(false);
    } else if (isEditing) {
      updateTourDate(isEditing, formData);
      refreshTourDates();
      setIsEditing(null);
    }
    setFormData({});
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this tour date?')) {
      deleteTourDate(id);
      refreshTourDates();
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({});
  };

  const handleReorder = () => {
    setIsReordering(!isReordering);
  };

  const moveTourDate = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    
    const newOrder = [...tourDates];
    const [movedItem] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedItem);
    
    // Update the tourDatesData array with new order
    tourDatesData.length = 0;
    tourDatesData.push(...newOrder);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('tourDatesData', JSON.stringify(newOrder));
    }
    
    refreshTourDates();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-500';
      case 'Limited': return 'bg-amber-500';
      case 'Sold Out': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tour Dates CMS</h1>
        <div className="flex gap-2">
          <Button 
            onClick={handleReorder} 
            variant={isReordering ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <GripVertical size={16} />
            {isReordering ? "Done Reordering" : "Reorder"}
          </Button>
          <Button onClick={handleAdd} className="flex items-center gap-2">
            <Plus size={16} />
            Add Tour Date
          </Button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || isEditing) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {isAdding ? 'Add New Tour Date' : 'Edit Tour Date'}
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X size={16} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="Sept 20, 2025"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <Input
                    value={formData.time || ''}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="8:00 PM"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Venue</label>
                  <Input
                    value={formData.venue || ''}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="Venue name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={formData.status || 'Available'}
                    onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Limited">Limited</SelectItem>
                      <SelectItem value="Sold Out">Sold Out</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save size={16} />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Tour Dates List */}
      <div className="grid gap-4">
        {tourDates.map((tourDate, index) => (
          <motion.div
            key={tourDate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group"
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {isReordering && (
                        <div className="flex flex-col gap-1 mr-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveTourDate(index, Math.max(0, index - 1))}
                            disabled={index === 0}
                            className="h-6 w-6 p-0"
                          >
                            <ArrowUp size={12} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveTourDate(index, Math.min(tourDates.length - 1, index + 1))}
                            disabled={index === tourDates.length - 1}
                            className="h-6 w-6 p-0"
                          >
                            <ArrowDown size={12} />
                          </Button>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        {isReordering && (
                          <GripVertical size={16} className="text-muted-foreground cursor-move" />
                        )}
                        <h3 className="text-xl font-semibold">{tourDate.venue}</h3>
                        <Badge className={getStatusColor(tourDate.status)}>
                          {tourDate.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {tourDate.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {tourDate.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {tourDate.location}
                      </div>
                    </div>
                  </div>
                  <div className={`flex gap-2 ${isReordering ? 'opacity-50' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(tourDate)}
                      disabled={isReordering}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(tourDate.id)}
                      className="text-red-500 hover:text-red-700"
                      disabled={isReordering}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {tourDates.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No tour dates yet</h3>
          <p>Add your first tour date to get started.</p>
        </div>
      )}
    </div>
  );
};

export default TourDatesCMS; 