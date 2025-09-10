'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { School, Save, X } from 'lucide-react';

interface AddSchoolDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSchool: (schoolData: any) => void;
}

export default function AddSchoolDialog({ isOpen, onClose, onAddSchool }: AddSchoolDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    principalName: '',
    principalEmail: '',
    principalPhone: '',
    district: '',
    province: '',
    schoolType: 'primary',
    studentCapacity: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate school ID from name
      const schoolId = formData.name.toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      const schoolData = {
        ...formData,
        id: schoolId,
        studentCount: 0,
        tutorCount: 0,
        isActive: true,
        createdDate: new Date().toISOString(),
        studentCapacity: parseInt(formData.studentCapacity) || 500
      };

      await onAddSchool(schoolData);
      
      // Reset form
      setFormData({
        name: '',
        address: '',
        principalName: '',
        principalEmail: '',
        principalPhone: '',
        district: '',
        province: '',
        schoolType: 'primary',
        studentCapacity: '',
        contactEmail: '',
        contactPhone: '',
        website: '',
        description: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error adding school:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const provinces = [
    'Gauteng',
    'Western Cape',
    'KwaZulu-Natal',
    'Eastern Cape',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Free State',
    'Northern Cape'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <School className="h-5 w-5" />
            Add New School
          </DialogTitle>
          <DialogDescription>
            Register a new school in the Stretch Education system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* School Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">School Information</h3>
              
              <div>
                <Label htmlFor="name">School Name *</Label>
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Skeen Primary School"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Physical Address *</Label>
                <Textarea 
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Education Street, City, Postal Code"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="district">District *</Label>
                  <Input 
                    id="district"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    placeholder="e.g., Johannesburg Central"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="province">Province *</Label>
                  <Select 
                    value={formData.province} 
                    onValueChange={(value) => handleInputChange('province', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="schoolType">School Type</Label>
                  <Select 
                    value={formData.schoolType} 
                    onValueChange={(value) => handleInputChange('schoolType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary School</SelectItem>
                      <SelectItem value="secondary">Secondary School</SelectItem>
                      <SelectItem value="combined">Combined School</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="studentCapacity">Student Capacity</Label>
                  <Input 
                    id="studentCapacity"
                    type="number"
                    value={formData.studentCapacity}
                    onChange={(e) => handleInputChange('studentCapacity', e.target.value)}
                    placeholder="500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of the school"
                  rows={3}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">Principal Information</h3>
              
              <div>
                <Label htmlFor="principalName">Principal Name *</Label>
                <Input 
                  id="principalName"
                  value={formData.principalName}
                  onChange={(e) => handleInputChange('principalName', e.target.value)}
                  placeholder="Dr. Jane Smith"
                  required
                />
              </div>

              <div>
                <Label htmlFor="principalEmail">Principal Email *</Label>
                <Input 
                  id="principalEmail"
                  type="email"
                  value={formData.principalEmail}
                  onChange={(e) => handleInputChange('principalEmail', e.target.value)}
                  placeholder="principal@school.edu"
                  required
                />
              </div>

              <div>
                <Label htmlFor="principalPhone">Principal Phone *</Label>
                <Input 
                  id="principalPhone"
                  value={formData.principalPhone}
                  onChange={(e) => handleInputChange('principalPhone', e.target.value)}
                  placeholder="+27 11 123 4567"
                  required
                />
              </div>

              <h3 className="font-medium text-lg border-b pb-2 mt-6">School Contact</h3>
              
              <div>
                <Label htmlFor="contactEmail">School Email</Label>
                <Input 
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="info@school.edu"
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">School Phone</Label>
                <Input 
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="+27 11 123 4567"
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://school.edu"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.name || !formData.address || !formData.principalName || !formData.principalEmail || !formData.district || !formData.province}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding School...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Add School
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
