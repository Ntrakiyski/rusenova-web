'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface ContactEditorProps {
  contact: {
    title: string;
    subtitle: string;
    email: string;
    linkedin: string;
    opportunities: string[][];
  };
  onChange: (contact: any) => void;
}

export default function ContactEditor({ contact, onChange }: ContactEditorProps) {
  const handleInputChange = (field: string, value: string) => {
    onChange({ ...contact, [field]: value });
  };

  const handleOpportunityGroupChange = (groupIndex: number, itemIndex: number, value: string) => {
    const newOpportunities = [...contact.opportunities];
    newOpportunities[groupIndex][itemIndex] = value;
    onChange({ ...contact, opportunities: newOpportunities });
  };

  const addOpportunityGroup = () => {
    onChange({ ...contact, opportunities: [...contact.opportunities, ['New Opportunity']] });
  };

  const removeOpportunityGroup = (groupIndex: number) => {
    const newOpportunities = contact.opportunities.filter((_, i) => i !== groupIndex);
    onChange({ ...contact, opportunities: newOpportunities });
  };

  const addOpportunityItem = (groupIndex: number) => {
    const newOpportunities = [...contact.opportunities];
    newOpportunities[groupIndex] = [...newOpportunities[groupIndex], 'New Opportunity'];
    onChange({ ...contact, opportunities: newOpportunities });
  };

  const removeOpportunityItem = (groupIndex: number, itemIndex: number) => {
    const newOpportunities = [...contact.opportunities];
    newOpportunities[groupIndex] = newOpportunities[groupIndex].filter((_, i) => i !== itemIndex);
    onChange({ ...contact, opportunities: newOpportunities });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={contact.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Want to talk about your project?"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Section Subtitle</Label>
        <Textarea
          id="subtitle"
          value={contact.subtitle}
          onChange={(e) => handleInputChange('subtitle', e.target.value)}
          placeholder="Message me on LinkedIn or send me an email"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Link</Label>
        <Input
          id="email"
          value={contact.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="mailto:gloriarusenovaa@gmail.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn Profile</Label>
        <Input
          id="linkedin"
          value={contact.linkedin}
          onChange={(e) => handleInputChange('linkedin', e.target.value)}
          placeholder="https://www.linkedin.com/in/gloriarusenova/"
        />
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Opportunities</h4>
          <Button onClick={addOpportunityGroup} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Group
          </Button>
        </div>

        <div className="space-y-6">
          {contact.opportunities.map((group, groupIndex) => (
            <div key={groupIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Opportunity Group {groupIndex + 1}</h5>
                <Button
                  onClick={() => removeOpportunityGroup(groupIndex)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {group.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => handleOpportunityGroupChange(groupIndex, itemIndex, e.target.value)}
                      placeholder="Opportunity"
                      className="flex-1"
                    />
                    <Button
                      onClick={() => removeOpportunityItem(groupIndex, itemIndex)}
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => addOpportunityItem(groupIndex)}
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Opportunity
              </Button>
            </div>
          ))}
        </div>

        {contact.opportunities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No opportunity groups added yet. Click "Add Group" to create your first group.</p>
          </div>
        )}
      </Card>

      
    </div>
  );
}
