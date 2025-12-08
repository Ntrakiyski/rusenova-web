'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RefreshCw, Search, AlertCircle, CheckCircle2, ListFilter } from 'lucide-react';
import { Project } from '@/types/project';
import MLProjectsTabs from './MLProjectsTabs';
import MLProjectEditor from './MLProjectEditor';

export default function MLProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [search, setSearch] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'list' | 'table'>('list');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/ml-projects');
      if (!response.ok) {
        throw new Error('Failed to load ML projects');
      }
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
        if (data.data.length > 0 && !selectedProjectSlug) {
          setSelectedProjectSlug(data.data[0].slug);
        }
      } else {
        throw new Error(data.error || 'Failed to load ML projects');
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to load ML projects'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async (project: Project) => {
    const response = await fetch('/api/admin/ml-projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to save project');
    }

    const data = await response.json();
    if (data.success) {
      setProjects((prev) =>
        prev.map((p) => (p.slug === project.slug ? data.data : p))
      );
      setMessage({ type: 'success', text: 'Project saved successfully' });
    } else {
      throw new Error(data.error || 'Failed to save project');
    }
  };

  const filteredProjects = useMemo(() => {
    if (!search.trim()) return projects;
    return projects.filter((project) => {
      const haystack = `${project.title ?? ''} ${project.slug ?? ''} ${project.shortDescription ?? ''}`.toLowerCase();
      return haystack.includes(search.toLowerCase());
    });
  }, [projects, search]);

  const selectedProject = filteredProjects.find((p) => p.slug === selectedProjectSlug)
    || projects.find((p) => p.slug === selectedProjectSlug);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ML Projects Admin</h1>
            <p className="text-sm text-gray-600">Manage and edit machine learning projects</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={loadProjects} disabled={loading}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {message && (
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
        )}

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Search, select, and edit ML projects</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title or slug"
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as 'list' | 'table')} className="space-y-4">
              <TabsList className="grid grid-cols-2 md:w-[320px]">
                <TabsTrigger value="list">Tabs</TabsTrigger>
                <TabsTrigger value="table">
                  <ListFilter className="mr-2 h-4 w-4" />
                  Table
                </TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="space-y-4">
                {filteredProjects.length === 0 ? (
                  <div className="text-sm text-gray-600">No projects match your search.</div>
                ) : (
                  <MLProjectsTabs
                    projects={filteredProjects}
                    selectedProjectSlug={selectedProjectSlug}
                    onSelectProject={setSelectedProjectSlug}
                  />
                )}
              </TabsContent>

              <TabsContent value="table">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Short Description</TableHead>
                        <TableHead>Hero Title</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjects.map((project) => (
                        <TableRow
                          key={project.slug}
                          className={selectedProjectSlug === project.slug ? 'bg-orange-50' : ''}
                          onClick={() => setSelectedProjectSlug(project.slug)}
                        >
                          <TableCell className="font-medium">{project.id}</TableCell>
                          <TableCell>{project.slug}</TableCell>
                          <TableCell>{project.title}</TableCell>
                          <TableCell className="max-w-xs truncate">{project.shortDescription}</TableCell>
                          <TableCell>{project.heroTitle}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {loading ? (
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="py-12 text-center text-gray-600">Loading projects...</CardContent>
          </Card>
        ) : selectedProject ? (
          <MLProjectEditor
            project={selectedProject}
            onSave={saveProject}
            onRefresh={loadProjects}
          />
        ) : (
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="py-12 text-center text-gray-600">Select a project to edit.</CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

