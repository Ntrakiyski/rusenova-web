'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Home as HomeIcon, Brain, LayoutGrid } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle } from 'lucide-react';

import HeroEditor from './HeroEditor';
import ServicesEditor from './ServicesEditor';
import FeaturesEditor from './FeaturesEditor';
import MLPreviewEditor from './MLPreviewEditor';
import PDPreviewEditor from './PDPreviewEditor';
import AboutEditor from './AboutEditor';
import ContactEditor from './ContactEditor';
import FooterEditor from './FooterEditor';
import ImagesEditor from './ImagesEditor';
import PDProjectsTabs from './PDProjectsTabs';
import PDProjectEditor from './PDProjectEditor';
import MLProjectsTabs from './MLProjectsTabs';
import MLProjectEditor from './MLProjectEditor';

import { HomeContent, Project } from '@/types/project';

export default function AdminPanel() {
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [originalContent, setOriginalContent] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'ml' | 'pd'>('home');

  // PD Projects state
  const [pdProjects, setPdProjects] = useState<Project[]>([]);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string>('');
  const [loadingPD, setLoadingPD] = useState(false);

  // ML Projects state
  const [mlProjects, setMlProjects] = useState<Project[]>([]);
  const [selectedMLProjectSlug, setSelectedMLProjectSlug] = useState<string>('');
  const [loadingML, setLoadingML] = useState(false);

  useEffect(() => {
    loadHomeContent();
    if (activeView === 'pd') {
      loadPDProjects();
    } else if (activeView === 'ml') {
      loadMLProjects();
    }
  }, [activeView]);

  const loadHomeContent = async () => {
    try {
      const response = await fetch('/api/admin/home-content');
      if (!response.ok) throw new Error('Failed to load home content');

      const data = await response.json();
      setHomeContent(data);
      setOriginalContent(JSON.parse(JSON.stringify(data))); // Deep copy
    } catch (error) {
      console.error('Error loading home content:', error);
      setMessage({ type: 'error', text: 'Failed to load home content' });
    } finally {
      setLoading(false);
    }
  };

  const loadMLProjects = async () => {
    setLoadingML(true);
    try {
      const response = await fetch('/api/admin/ml-projects');
      if (!response.ok) throw new Error('Failed to load ML projects');

      const data = await response.json();
      if (data.success) {
        setMlProjects(data.data);
        if (data.data.length > 0 && !selectedMLProjectSlug) {
          setSelectedMLProjectSlug(data.data[0].slug);
        }
      } else {
        throw new Error(data.error || 'Failed to load ML projects');
      }
    } catch (error) {
      console.error('Error loading ML projects:', error);
      setMessage({ type: 'error', text: 'Failed to load ML projects' });
    } finally {
      setLoadingML(false);
    }
  };

  const saveMLProject = async (project: Project) => {
    try {
      const response = await fetch('/api/admin/ml-projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save project');
      }

      const data = await response.json();
      if (data.success) {
        setMlProjects(prev => prev.map(p => p.slug === project.slug ? data.data : p));
      } else {
        throw new Error(data.error || 'Failed to save project');
      }
    } catch (error) {
      throw error;
    }
  };

  const loadPDProjects = async () => {
    setLoadingPD(true);
    try {
      const response = await fetch('/api/admin/pd-content');
      if (!response.ok) throw new Error('Failed to load PD projects');

      const data = await response.json();
      if (data.success) {
        setPdProjects(data.data);
        if (data.data.length > 0 && !selectedProjectSlug) {
          setSelectedProjectSlug(data.data[0].slug);
        }
      } else {
        throw new Error(data.error || 'Failed to load PD projects');
      }
    } catch (error) {
      console.error('Error loading PD projects:', error);
      setMessage({ type: 'error', text: 'Failed to load PD projects' });
    } finally {
      setLoadingPD(false);
    }
  };

  const savePDProject = async (project: Project) => {
    try {
      const response = await fetch('/api/admin/pd-content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save project');
      }

      const data = await response.json();
      if (data.success) {
        // Update local state
        setPdProjects(prev => prev.map(p => p.slug === project.slug ? data.data : p));
      } else {
        throw new Error(data.error || 'Failed to save project');
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSave = async () => {
    if (!homeContent) return;

    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/home-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(homeContent),
      });

      if (!response.ok) throw new Error('Failed to save home content');

      setOriginalContent(JSON.parse(JSON.stringify(homeContent)));
      setMessage({ type: 'success', text: 'Home content saved successfully!' });
      
      // Dispatch custom event to refresh the home page
      window.dispatchEvent(new CustomEvent('refresh-home-content'));
    } catch (error) {
      console.error('Error saving home content:', error);
      setMessage({ type: 'error', text: 'Failed to save home content' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (originalContent) {
      setHomeContent(JSON.parse(JSON.stringify(originalContent)));
      setMessage({ type: 'success', text: 'Changes reset to last saved state' });
    }
  };

  const hasChanges = () => {
    if (!homeContent || !originalContent) return false;
    return JSON.stringify(homeContent) !== JSON.stringify(originalContent);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!homeContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load home content. Please refresh the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <SidebarProvider>
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-1000">Home Page Admin</h1>
              <p className="text-sm text-gray-600">Edit and manage home page content</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={!hasChanges() || saving}
              >
                Reset Changes
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges() || saving}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Message Alert */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <Alert className={message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
            {message.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="flex min-h-screen" style={{ '--sidebar-width': '0px' } as React.CSSProperties}>
        <Sidebar collapsible="none" className="border-r bg-white text-gray-1000">
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={activeView==='home'} onClick={() => setActiveView('home')}>
                    <HomeIcon className="mr-2" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={activeView==='ml'} onClick={() => setActiveView('ml')}>
                    <Brain className="mr-2" />
                    <span>ML Projects</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={activeView==='pd'} onClick={() => setActiveView('pd')}>
                    <LayoutGrid className="mr-2" />
                    <span>PD Projects</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8" style={{ maxWidth: 'none' }}>
        {activeView==='home' && (
          <Tabs defaultValue="hero" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-2 bg-white">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="ml-preview">ML Preview</TabsTrigger>
              <TabsTrigger value="pd-preview">PD Preview</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="footer">Footer</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>


            <TabsContent value="hero">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                  <CardDescription>Edit the main hero section content</CardDescription>
                </CardHeader>
                <CardContent>
                  <HeroEditor
                    hero={homeContent.hero}
                    onChange={(hero) => setHomeContent({ ...homeContent, hero })}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Services Section</CardTitle>
                  <CardDescription>Edit the services you offer</CardDescription>
                </CardHeader>
                <CardContent>
                  <ServicesEditor
                    services={homeContent.services}
                    onChange={(services) => setHomeContent({ ...homeContent, services })}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Features Section</CardTitle>
                  <CardDescription>Edit the AI/ML features section</CardDescription>
                </CardHeader>
                <CardContent>
                  <FeaturesEditor
                    features={homeContent.features}
                    onChange={(features) => setHomeContent({ ...homeContent, features })}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ml-preview">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>ML Projects Preview</CardTitle>
                  <CardDescription>Edit the machine learning projects preview section</CardDescription>
                </CardHeader>
                <CardContent>
                  {homeContent.mlPreview && (
                    <MLPreviewEditor
                      mlPreview={homeContent.mlPreview}
                      onChange={(mlPreview) => setHomeContent({ ...homeContent, mlPreview })}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pd-preview">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Product Design Projects Preview</CardTitle>
                  <CardDescription>Edit the product design projects preview section</CardDescription>
                </CardHeader>
                <CardContent>
                  {homeContent.pdPreview && (
                    <PDPreviewEditor
                      pdPreview={homeContent.pdPreview}
                      onChange={(pdPreview) => setHomeContent({ ...homeContent, pdPreview })}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>About Section</CardTitle>
                  <CardDescription>Edit the about section content</CardDescription>
                </CardHeader>
                <CardContent>
                  <AboutEditor
                    about={homeContent.about}
                    onChange={(about) => setHomeContent({ ...homeContent, about })}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Contact Section</CardTitle>
                  <CardDescription>Edit the contact section content</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactEditor
                    contact={homeContent.contact}
                    onChange={(contact) => setHomeContent({ ...homeContent, contact })}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="footer">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Footer Section</CardTitle>
                  <CardDescription>Edit the footer content</CardDescription>
                </CardHeader>
                <CardContent>
                  <FooterEditor
                    footer={homeContent.footer}
                    onChange={(footer) => setHomeContent({ ...homeContent, footer })}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Images</CardTitle>
                  <CardDescription>Upload images and view the public library</CardDescription>
                </CardHeader>
                <CardContent>
                  <ImagesEditor />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
        {activeView==='ml' && (
          <div className="space-y-6">
            {loadingML ? (
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading ML projects...</p>
                  </div>
                </CardContent>
              </Card>
            ) : mlProjects.length === 0 ? (
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>ML Projects</CardTitle>
                  <CardDescription>No ML projects found</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={loadMLProjects} variant="outline">
                    Refresh
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <MLProjectsTabs
                  projects={mlProjects}
                  selectedProjectSlug={selectedMLProjectSlug}
                  onSelectProject={setSelectedMLProjectSlug}
                />
                {selectedMLProjectSlug && (
                  <MLProjectEditor
                    project={mlProjects.find(p => p.slug === selectedMLProjectSlug)!}
                    onSave={saveMLProject}
                    onRefresh={loadMLProjects}
                  />
                )}
              </>
            )}
          </div>
        )}
        {activeView==='pd' && (
          <div className="space-y-6">
            {loadingPD ? (
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading PD projects...</p>
                  </div>
                </CardContent>
              </Card>
            ) : pdProjects.length === 0 ? (
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>PD Projects</CardTitle>
                  <CardDescription>No PD projects found</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={loadPDProjects} variant="outline">
                    Refresh
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <PDProjectsTabs
                  projects={pdProjects}
                  selectedProjectSlug={selectedProjectSlug}
                  onSelectProject={setSelectedProjectSlug}
                  onRefresh={loadPDProjects}
                />
                {selectedProjectSlug && (
                  <PDProjectEditor
                    project={pdProjects.find(p => p.slug === selectedProjectSlug)!}
                    onSave={savePDProject}
                    onRefresh={loadPDProjects}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
        </SidebarInset>
      </div>
    </div>
    </SidebarProvider>
  );
}
