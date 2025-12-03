'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface FooterEditorProps {
  footer: {
    backgroundColor: string;
    brand: {
      name: string;
      description: string;
    };
    social: Array<{
      platform: string;
      url: string;
      ariaLabel: string;
    }>;
    sections: Array<{
      title: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    }>;
    legal: {
      copyright: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    };
  };
  onChange: (footer: any) => void;
}

export default function FooterEditor({ footer, onChange }: FooterEditorProps) {
  const handleInputChange = (field: string, value: string) => {
    if (field === 'brand.name') {
      onChange({
        ...footer,
        brand: { ...footer.brand, name: value }
      });
    } else if (field === 'brand.description') {
      onChange({
        ...footer,
        brand: { ...footer.brand, description: value }
      });
    } else if (field === 'legal.copyright') {
      onChange({
        ...footer,
        legal: { ...footer.legal, copyright: value }
      });
    } else {
      onChange({ ...footer, [field]: value });
    }
  };

  const handleSocialChange = (index: number, field: string, value: string) => {
    const newSocial = [...footer.social];
    newSocial[index] = { ...newSocial[index], [field]: value };
    onChange({ ...footer, social: newSocial });
  };

  const addSocial = () => {
    const newSocial = {
      platform: 'github',
      url: 'https://github.com',
      ariaLabel: 'GitHub'
    };
    onChange({ ...footer, social: [...footer.social, newSocial] });
  };

  const removeSocial = (index: number) => {
    const newSocial = footer.social.filter((_, i) => i !== index);
    onChange({ ...footer, social: newSocial });
  };

  const handleSectionChange = (sectionIndex: number, field: string, value: string) => {
    const newSections = [...footer.sections];
    newSections[sectionIndex] = { ...newSections[sectionIndex], [field]: value };
    onChange({ ...footer, sections: newSections });
  };

  const addSection = () => {
    const newSection = {
      title: 'New Section',
      links: [{ label: 'New Link', href: '#' }]
    };
    onChange({ ...footer, sections: [...footer.sections, newSection] });
  };

  const removeSection = (index: number) => {
    const newSections = footer.sections.filter((_, i) => i !== index);
    onChange({ ...footer, sections: newSections });
  };

  const handleLinkChange = (sectionIndex: number, linkIndex: number, field: string, value: string) => {
    const newSections = [...footer.sections];
    const newLinks = [...newSections[sectionIndex].links];
    newLinks[linkIndex] = { ...newLinks[linkIndex], [field]: value };
    newSections[sectionIndex] = { ...newSections[sectionIndex], links: newLinks };
    onChange({ ...footer, sections: newSections });
  };

  const addLink = (sectionIndex: number) => {
    const newSections = [...footer.sections];
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      links: [...newSections[sectionIndex].links, { label: 'New Link', href: '#' }]
    };
    onChange({ ...footer, sections: newSections });
  };

  const removeLink = (sectionIndex: number, linkIndex: number) => {
    const newSections = [...footer.sections];
    const newLinks = newSections[sectionIndex].links.filter((_, i) => i !== linkIndex);
    newSections[sectionIndex] = { ...newSections[sectionIndex], links: newLinks };
    onChange({ ...footer, sections: newSections });
  };

  const handleLegalLinkChange = (linkIndex: number, field: string, value: string) => {
    const newLegal = { ...footer.legal };
    const newLinks = [...newLegal.links];
    newLinks[linkIndex] = { ...newLinks[linkIndex], [field]: value };
    newLegal.links = newLinks;
    onChange({ ...footer, legal: newLegal });
  };

  const addLegalLink = () => {
    const newLegal = { ...footer.legal };
    newLegal.links = [...newLegal.links, { label: 'New Link', href: '#' }];
    onChange({ ...footer, legal: newLegal });
  };

  const removeLegalLink = (linkIndex: number) => {
    const newLegal = { ...footer.legal };
    newLegal.links = newLegal.links.filter((_, i) => i !== linkIndex);
    onChange({ ...footer, legal: newLegal });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="backgroundColor">Background Color</Label>
        <div className="flex gap-2">
          <Input
            id="backgroundColor"
            type="color"
            value={footer.backgroundColor}
            onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
            className="w-16 h-10 p-1 border rounded cursor-pointer"
          />
          <Input
            type="text"
            value={footer.backgroundColor}
            onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
            className="flex-1"
            placeholder="#000000"
          />
        </div>
      </div>

      <Card className="p-4">
        <h4 className="font-medium mb-4">Brand Information</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Brand Name</Label>
            <Input
              value={footer.brand.name}
              onChange={(e) => handleInputChange('brand.name', e.target.value)}
              placeholder="Gloria"
            />
          </div>
          <div className="space-y-2">
            <Label>Brand Description</Label>
            <Textarea
              value={footer.brand.description}
              onChange={(e) => handleInputChange('brand.description', e.target.value)}
              placeholder="Building intelligent systems that bridge the gap between cutting-edge machine learning and delightful user experiences."
              rows={3}
            />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Social Links</h4>
          <Button onClick={addSocial} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Social
          </Button>
        </div>

        <div className="space-y-4">
          {footer.social.map((social, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h5 className="font-medium">Social Link {index + 1}</h5>
                <Button
                  onClick={() => removeSocial(index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Input
                    value={social.platform}
                    onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                    placeholder="github | linkedin | email"
                  />
                </div>

                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input
                    value={social.url}
                    onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>ARIA Label</Label>
                  <Input
                    value={social.ariaLabel}
                    onChange={(e) => handleSocialChange(index, 'ariaLabel', e.target.value)}
                    placeholder="Platform Name"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {footer.social.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No social links added yet. Click "Add Social" to create your first social link.</p>
          </div>
        )}
      </Card>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Footer Sections</h4>
          <Button onClick={addSection} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Section
          </Button>
        </div>

        <div className="space-y-6">
          {footer.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h5 className="font-medium">Section {sectionIndex + 1}</h5>
                <Button
                  onClick={() => removeSection(sectionIndex)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Section Title</Label>
                <Input
                  value={section.title}
                  onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
                  placeholder="Section Title"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Links</Label>
                  <Button
                    onClick={() => addLink(sectionIndex)}
                    size="sm"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Link
                  </Button>
                </div>

                <div className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <div key={linkIndex} className="border rounded p-3 space-y-3">
                      <div className="flex justify-between items-start">
                        <h6 className="font-medium">Link {linkIndex + 1}</h6>
                        <Button
                          onClick={() => removeLink(sectionIndex, linkIndex)}
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Link Label</Label>
                          <Input
                            value={link.label}
                            onChange={(e) => handleLinkChange(sectionIndex, linkIndex, 'label', e.target.value)}
                            placeholder="Link Label"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Link URL</Label>
                          <Input
                            value={link.href}
                            onChange={(e) => handleLinkChange(sectionIndex, linkIndex, 'href', e.target.value)}
                            placeholder="# or /path"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {section.links.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    <p>No links added yet. Click "Add Link" to create your first link.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {footer.sections.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No sections added yet. Click "Add Section" to create your first section.</p>
          </div>
        )}
      </Card>

      <Card className="p-4">
        <h4 className="font-medium mb-4">Legal Information</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Copyright Text</Label>
            <Input
              value={footer.legal.copyright}
              onChange={(e) => handleInputChange('legal.copyright', e.target.value)}
              placeholder="© 2025 Gloria. All rights reserved."
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Legal Links</Label>
              <Button
                onClick={addLegalLink}
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Link
              </Button>
            </div>

            <div className="space-y-3">
              {footer.legal.links.map((link, linkIndex) => (
                <div key={linkIndex} className="border rounded p-3 space-y-3">
                  <div className="flex justify-between items-start">
                    <h6 className="font-medium">Legal Link {linkIndex + 1}</h6>
                    <Button
                      onClick={() => removeLegalLink(linkIndex)}
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Link Label</Label>
                      <Input
                        value={link.label}
                        onChange={(e) => handleLegalLinkChange(linkIndex, 'label', e.target.value)}
                        placeholder="Privacy Policy"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Link URL</Label>
                      <Input
                        value={link.href}
                        onChange={(e) => handleLegalLinkChange(linkIndex, 'href', e.target.value)}
                        placeholder="# or /privacy-policy"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {footer.legal.links.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <p>No legal links added yet. Click "Add Link" to create your first link.</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      
    </div>
  );
}
