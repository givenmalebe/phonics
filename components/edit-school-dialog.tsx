'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Save, X } from 'lucide-react';

interface EditSchoolDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSchool: (schoolData: any) => void;
  school: any;
}

export default function EditSchoolDialog({ isOpen, onClose, onUpdateSchool, school }: EditSchoolDialogProps) {
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

  // Populate form with school data when dialog opens
  useEffect(() => {
    if (school && isOpen) {
      setFormData({
        name: school.name || '',
        address: school.address || '',
        principalName: school.principalName || '',
        principalEmail: school.principalEmail || '',
        principalPhone: school.principalPhone || '',
        district: school.district || '',
        province: school.province || '',
        schoolType: school.schoolType || 'primary',
        studentCapacity: school.studentCapacity?.toString() || '',
        contactEmail: school.contactEmail || '',
        contactPhone: school.contactPhone || '',
        website: school.website || '',
        description: school.description || ''
      });
    }
  }, [school, isOpen]);

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
      const updatedSchool = {
        ...school,
        ...formData,
        studentCapacity: parseInt(formData.studentCapacity) || school.studentCapacity,
        updatedDate: new Date().toISOString()
      };

      await onUpdateSchool(updatedSchool);
      onClose();
    } catch (error) {
      console.error('Error updating school:', error);
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

  if (!school) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit School Information
          </DialogTitle>
          <DialogDescription>
            Update the information for {school.name}.
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
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Physical Address *</Label>
                <Textarea 
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
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
                      <SelectValue />
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
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
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
                  required
                />
              </div>

              <div>
                <Label htmlFor="principalPhone">Principal Phone *</Label>
                <Input 
                  id="principalPhone"
                  value={formData.principalPhone}
                  onChange={(e) => handleInputChange('principalPhone', e.target.value)}
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
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">School Phone</Label>
                <Input 
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
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
              disabled={isSubmitting || !formData.name || !formData.address || !formData.principalName}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update School
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
