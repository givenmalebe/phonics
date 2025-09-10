'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { School, Users, GraduationCap, MapPin, CheckCircle } from 'lucide-react';
import { useSchools } from '@/hooks/use-schools';

interface SchoolSelectorProps {
  selectedSchoolId?: string;
  onSchoolSelect: (schoolId: string) => void;
}

export default function SchoolSelector({ selectedSchoolId, onSchoolSelect }: SchoolSelectorProps) {
  const { schools, loading } = useSchools();
  const [showAllSchools, setShowAllSchools] = useState(false);

  if (!selectedSchoolId) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <School className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Select School</h1>
            <p className="text-gray-600">Choose a school to manage its students and tutors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Loading schools...</p>
              </div>
            ) : (
              schools.map((school) => (
              <Card 
                key={school.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300"
                onClick={() => onSchoolSelect(school.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{school.name}</CardTitle>
                    {school.isActive && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {school.district}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">{school.address}</p>
                    <p className="text-sm font-medium">Principal: {school.principalName}</p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-2xl font-bold text-blue-600">{school.studentCount}</span>
                        </div>
                        <p className="text-xs text-gray-500">Students</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <GraduationCap className="h-4 w-4 text-green-600" />
                          <span className="text-2xl font-bold text-green-600">{school.tutorCount}</span>
                        </div>
                        <p className="text-xs text-gray-500">Tutors</p>
                      </div>
                    </div>

                    <Button className="w-full mt-4" variant="outline">
                      Manage School
                    </Button>
                  </div>
                </CardContent>
              </Card>
              ))
            )}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="mr-4">
              Add New School
            </Button>
            <Button variant="ghost" onClick={() => setShowAllSchools(!showAllSchools)}>
              {showAllSchools ? 'Show Active Only' : 'Show All Schools'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const selectedSchool = schools.find(s => s.id === selectedSchoolId);

  return (
    <div className="bg-white border-b shadow-sm mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <School className="h-8 w-8 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{selectedSchool?.name}</h2>
              <p className="text-sm text-gray-600">{selectedSchool?.district}</p>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
              Active
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{selectedSchool?.studentCount}</p>
              <p className="text-xs text-gray-500">Students</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{selectedSchool?.tutorCount}</p>
              <p className="text-xs text-gray-500">Tutors</p>
            </div>
            
            <Select value={selectedSchoolId} onValueChange={onSchoolSelect}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Switch School" />
              </SelectTrigger>
              <SelectContent>
                {schools.map((school) => (
                  <SelectItem key={school.id} value={school.id}>
                    {school.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
