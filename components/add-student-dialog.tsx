'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UserPlus, Save, X } from 'lucide-react';

interface Tutor {
  id: string;
  firstName: string;
  lastName: string;
  schoolId: string;
}

interface AddStudentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (studentData: any) => void;
  tutors: Tutor[];
  selectedSchoolId: string;
}

export default function AddStudentDialog({ 
  isOpen, 
  onClose, 
  onAddStudent, 
  tutors, 
  selectedSchoolId 
}: AddStudentDialogProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    studentId: '',
    grade: '',
    dateOfBirth: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    address: '',
    medicalInfo: '',
    assignedTutor: '',
    startingLevel: 'PINK',
    emergencyContact: '',
    emergencyPhone: ''
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
      // Generate student ID if not provided
      const studentId = formData.studentId || `${selectedSchoolId.toUpperCase().slice(0, 3)}${Date.now().toString().slice(-6)}`;
      
      const studentData = {
        ...formData,
        id: `student-${Date.now()}`,
        studentId,
        schoolId: selectedSchoolId,
        enrollmentDate: new Date().toISOString(),
        currentLevel: formData.startingLevel,
        progress: 0,
        isActive: true,
        absence: 0
      };

      await onAddStudent(studentData);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        studentId: '',
        grade: '',
        dateOfBirth: '',
        guardianName: '',
        guardianPhone: '',
        guardianEmail: '',
        address: '',
        medicalInfo: '',
        assignedTutor: '',
        startingLevel: 'PINK',
        emergencyContact: '',
        emergencyPhone: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error adding student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter tutors for selected school
  const schoolTutors = tutors.filter(tutor => tutor.schoolId === selectedSchoolId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New Student
          </DialogTitle>
          <DialogDescription>
            Add a new student to the system and assign them to a tutor.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">Student Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input 
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input 
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input 
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                    placeholder="Auto-generated if empty"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input 
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="grade">Grade *</Label>
                  <Select 
                    value={formData.grade} 
                    onValueChange={(value) => handleInputChange('grade', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3A">Grade 3A</SelectItem>
                      <SelectItem value="3B">Grade 3B</SelectItem>
                      <SelectItem value="3C">Grade 3C</SelectItem>
                      <SelectItem value="3D">Grade 3D</SelectItem>
                      <SelectItem value="3E">Grade 3E</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="startingLevel">Starting Level *</Label>
                  <Select 
                    value={formData.startingLevel} 
                    onValueChange={(value) => handleInputChange('startingLevel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PINK">PINK</SelectItem>
                      <SelectItem value="BLUE">BLUE</SelectItem>
                      <SelectItem value="YELLOW">YELLOW</SelectItem>
                      <SelectItem value="PURPLE">PURPLE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="assignedTutor">Assign Tutor *</Label>
                <Select 
                  value={formData.assignedTutor} 
                  onValueChange={(value) => handleInputChange('assignedTutor', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tutor" />
                  </SelectTrigger>
                  <SelectContent>
                    {schoolTutors.map((tutor) => (
                      <SelectItem key={tutor.id} value={tutor.id}>
                        {tutor.firstName} {tutor.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">Guardian Information</h3>
              
              <div>
                <Label htmlFor="guardianName">Guardian Name *</Label>
                <Input 
                  id="guardianName"
                  value={formData.guardianName}
                  onChange={(e) => handleInputChange('guardianName', e.target.value)}
                  placeholder="Jane Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="guardianPhone">Guardian Phone *</Label>
                  <Input 
                    id="guardianPhone"
                    value={formData.guardianPhone}
                    onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                    placeholder="+27 82 123 4567"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="guardianEmail">Guardian Email</Label>
                  <Input 
                    id="guardianEmail"
                    type="email"
                    value={formData.guardianEmail}
                    onChange={(e) => handleInputChange('guardianEmail', e.target.value)}
                    placeholder="jane.doe@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Home Address</Label>
                <Textarea 
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Main Street, City, 1234"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input 
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    placeholder="Emergency contact name"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                  <Input 
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    placeholder="+27 82 987 6543"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="medicalInfo">Medical Information</Label>
                <Textarea 
                  id="medicalInfo"
                  value={formData.medicalInfo}
                  onChange={(e) => handleInputChange('medicalInfo', e.target.value)}
                  placeholder="Any medical conditions, allergies, or special needs"
                  rows={3}
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
              disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.grade || !formData.guardianName || !formData.guardianPhone || !formData.assignedTutor}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding Student...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Add Student
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
