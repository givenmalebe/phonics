'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Shield, 
  Upload, 
  Download, 
  BookOpen, 
  Database, 
  Server, 
  Wifi, 
  HardDrive, 
  Activity, 
  Users, 
  Bell, 
  Mail, 
  Globe, 
  Key,
  AlertTriangle,
  CheckCircle,
  Clock,
  Monitor,
  Smartphone,
  Tablet,
  RefreshCw,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function EnhancedSystem() {
  // Sample system metrics data
  const systemMetrics = [
    { time: '00:00', cpu: 45, memory: 62, network: 28, storage: 68 },
    { time: '04:00', cpu: 32, memory: 58, network: 15, storage: 68 },
    { time: '08:00', cpu: 78, memory: 72, network: 65, storage: 69 },
    { time: '12:00', cpu: 85, memory: 78, network: 82, storage: 70 },
    { time: '16:00', cpu: 92, memory: 85, network: 75, storage: 71 },
    { time: '20:00', cpu: 67, memory: 71, network: 45, storage: 71 },
  ];

  const userActivityData = [
    { hour: '6AM', users: 12 },
    { hour: '8AM', users: 45 },
    { hour: '10AM', users: 78 },
    { hour: '12PM', users: 95 },
    { hour: '2PM', users: 87 },
    { hour: '4PM', users: 92 },
    { hour: '6PM', users: 65 },
    { hour: '8PM', users: 32 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Management</h2>
          <p className="text-gray-600">Monitor and configure your education platform</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* System Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">System Status</p>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-lg font-semibold text-green-600">Healthy</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">All systems operational</p>
                  </div>
                  <Server className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <div className="flex items-center mt-2">
                      <Activity className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-lg font-semibold">127</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">+15% from yesterday</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Response Time</p>
                    <div className="flex items-center mt-2">
                      <Clock className="h-4 w-4 text-orange-500 mr-2" />
                      <span className="text-lg font-semibold">47ms</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Average API response</p>
                  </div>
                  <Wifi className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Storage Used</p>
                    <div className="flex items-center mt-2">
                      <HardDrive className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="text-lg font-semibold">68%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">2.1TB of 3TB</p>
                  </div>
                  <Database className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Real-time resource utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={systemMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Area type="monotone" dataKey="cpu" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="CPU %" />
                    <Area type="monotone" dataKey="memory" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Memory %" />
                    <Area type="monotone" dataKey="network" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Network %" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Active users throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Device Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Device & Platform Analytics</CardTitle>
              <CardDescription>User access patterns by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <Monitor className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900">Desktop</p>
                    <p className="text-2xl font-bold text-blue-600">65%</p>
                    <p className="text-sm text-blue-700">82 users</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <Tablet className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">Tablet</p>
                    <p className="text-2xl font-bold text-green-600">25%</p>
                    <p className="text-sm text-green-700">32 users</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
                  <Smartphone className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="font-semibold text-orange-900">Mobile</p>
                    <p className="text-2xl font-bold text-orange-600">10%</p>
                    <p className="text-sm text-orange-700">13 users</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent value="configuration" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>Basic system configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input id="siteName" defaultValue="Stretch Education Platform" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input id="siteUrl" defaultValue="https://stretch-education.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeZone">Time Zone</Label>
                  <Select defaultValue="africa/johannesburg">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="africa/johannesburg">Africa/Johannesburg</SelectItem>
                      <SelectItem value="africa/cape_town">Africa/Cape Town</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                  <Switch id="maintenance" />
                </div>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>

            {/* Email Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Configuration
                </CardTitle>
                <CardDescription>SMTP and notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input id="smtpHost" placeholder="smtp.gmail.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">Port</Label>
                    <Input id="smtpPort" placeholder="587" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpSecurity">Security</Label>
                    <Select defaultValue="tls">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input id="fromEmail" placeholder="noreply@stretch-education.com" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <Switch id="emailNotifications" defaultChecked />
                </div>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Update Email Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          {/* Real-time Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">CPU Usage</p>
                    <p className="text-2xl font-bold">76%</p>
                  </div>
                  <Progress value={76} className="w-16" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Memory</p>
                    <p className="text-2xl font-bold">8.2GB</p>
                  </div>
                  <Progress value={68} className="w-16" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Disk I/O</p>
                    <p className="text-2xl font-bold">142MB/s</p>
                  </div>
                  <Activity className="h-6 w-6 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Network</p>
                    <p className="text-2xl font-bold">45Mbps</p>
                  </div>
                  <Wifi className="h-6 w-6 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Status */}
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
              <CardDescription>Current status of all system components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Web Server', status: 'online', uptime: '99.9%' },
                  { name: 'Database', status: 'online', uptime: '99.8%' },
                  { name: 'API Gateway', status: 'online', uptime: '99.9%' },
                  { name: 'File Storage', status: 'online', uptime: '99.7%' },
                  { name: 'Background Jobs', status: 'online', uptime: '99.5%' },
                  { name: 'Email Service', status: 'maintenance', uptime: '98.2%' },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === 'online' ? 'bg-green-500' : 
                        service.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={service.status === 'online' ? 'default' : 'secondary'}>
                        {service.status}
                      </Badge>
                      <span className="text-sm text-gray-600">{service.uptime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Configure platform security options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
                  </div>
                  <Switch id="twoFactor" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sessionTimeout">Auto Session Timeout</Label>
                    <p className="text-sm text-gray-600">Automatically log out inactive users</p>
                  </div>
                  <Switch id="sessionTimeout" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionDuration">Session Duration (minutes)</Label>
                  <Input id="sessionDuration" type="number" defaultValue="30" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ipRestriction">IP Restriction</Label>
                    <p className="text-sm text-gray-600">Limit access to specific IP addresses</p>
                  </div>
                  <Switch id="ipRestriction" />
                </div>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Update Security Settings
                </Button>
              </CardContent>
            </Card>

            {/* Recent Security Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Security Events
                </CardTitle>
                <CardDescription>Recent security-related activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'success', message: 'Admin login successful', time: '2 minutes ago', ip: '192.168.1.100' },
                    { type: 'warning', message: 'Failed login attempt', time: '15 minutes ago', ip: '10.0.0.45' },
                    { type: 'info', message: 'Password changed', time: '1 hour ago', ip: '192.168.1.100' },
                    { type: 'success', message: '2FA enabled', time: '2 hours ago', ip: '192.168.1.100' },
                    { type: 'warning', message: 'Multiple failed attempts', time: '3 hours ago', ip: '203.0.113.1' },
                  ].map((event, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        event.type === 'success' ? 'bg-green-500' :
                        event.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{event.message}</p>
                        <p className="text-xs text-gray-500">{event.time} • {event.ip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Backup & Restore */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup & Restore
                </CardTitle>
                <CardDescription>Manage system backups and data recovery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Automatic Backups</Label>
                    <p className="text-sm text-gray-600">Daily automated backups at 2:00 AM</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Last Backup</Label>
                  <p className="text-sm">January 15, 2025 at 2:00 AM (Success)</p>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Create Manual Backup
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Restore from Backup
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  System Updates
                </CardTitle>
                <CardDescription>Platform updates and maintenance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">System Up to Date</span>
                  </div>
                  <p className="text-sm text-blue-700">Version 2.3.1 - Latest stable release</p>
                </div>
                <div className="space-y-2">
                  <Label>Auto Updates</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Install security updates automatically</span>
                    <Switch defaultChecked />
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Check for Updates
                </Button>
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Update History
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
