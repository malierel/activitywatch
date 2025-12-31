import { useState } from 'react';
import { PageHeader } from '@/components/design-system/page-header';
import { Tabs } from '@/components/ui/tabs';
import { DataCard } from '@/components/design-system/data-card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { InlineState } from '@/components/design-system/inline-state';

const wizardSteps = [
  'What to match',
  'Match type',
  'Preview',
  'Assign category'
];

const SettingsPage = () => {
  const [tab, setTab] = useState('categorization');
  const [wizardStep, setWizardStep] = useState(0);
  const [openPreview, setOpenPreview] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Configure hosts, privacy, and categorization rules." breadcrumb={{ section: 'Next UI' }} />
      <Tabs
        options={[
          { id: 'general', label: 'General' },
          { id: 'privacy', label: 'Data & Privacy' },
          { id: 'categorization', label: 'Categorization' },
          { id: 'advanced', label: 'Advanced' }
        ]}
        value={tab}
        onChange={setTab}
      >
        {tab === 'categorization' ? (
          <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-4">
            <div className="space-y-2 p-4 rounded-xl border border-border bg-surface-2">
              {wizardSteps.map((step, idx) => (
                <div key={step} className={`flex items-center gap-2 ${idx === wizardStep ? 'font-semibold text-text' : 'text-muted'}`}>
                  <Badge variant={idx <= wizardStep ? 'success' : 'default'}>{idx + 1}</Badge>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <DataCard title="Rule builder" subtitle="Wizard-like flow with live preview">
                <div className="space-y-4">
                  {wizardStep === 0 && (
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-semibold">What to match</p>
                        <Select defaultValue="app">
                          <option value="app">Application</option>
                          <option value="title">Window title</option>
                          <option value="url">URL/Domain</option>
                          <option value="file">Editor file</option>
                        </Select>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Keyword</p>
                        <Input placeholder="e.g. slack, zoom.us" />
                      </div>
                    </div>
                  )}
                  {wizardStep === 1 && (
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-semibold">Match type</p>
                        <Select defaultValue="contains">
                          <option value="contains">Contains</option>
                          <option value="exact">Exact</option>
                          <option value="regex">Regex</option>
                        </Select>
                      </div>
                      <InlineState state="empty" description="Regex runs locally only; no cloud data." />
                    </div>
                  )}
                  {wizardStep === 2 && (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold">Live preview</p>
                      <Button variant="ghost" onClick={() => setOpenPreview(true)}>
                        Show matched examples
                      </Button>
                    </div>
                  )}
                  {wizardStep === 3 && (
                    <div className="grid gap-3 md:grid-cols-3">
                      <div>
                        <p className="text-sm font-semibold">Category</p>
                        <Input placeholder="e.g. Meetings" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Color</p>
                        <Input type="color" defaultValue="#2563eb" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Productivity score</p>
                        <Select defaultValue="neutral">
                          <option value="focus">Focus (+1)</option>
                          <option value="neutral">Neutral (0)</option>
                          <option value="distracting">Distracting (-1)</option>
                        </Select>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2">
                    <Button variant="ghost" onClick={() => setWizardStep((s) => Math.max(0, s - 1))}>
                      Back
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button variant="outline">Discard</Button>
                      <Button onClick={() => setWizardStep((s) => Math.min(wizardSteps.length - 1, s + 1))}>
                        {wizardStep === wizardSteps.length - 1 ? 'Save' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </div>
              </DataCard>
              <DataCard title="Danger zone" subtitle="Destructive actions">
                <Button variant="ghost" className="text-danger">
                  Delete all rules
                </Button>
              </DataCard>
            </div>
          </div>
        ) : (
          <InlineState state="empty" description="Choose a settings section to continue." />
        )}
      </Tabs>

      <Modal
        open={openPreview}
        onOpenChange={setOpenPreview}
        title="Matched examples"
        subtitle="Preview is generated locally"
        footer={<Button onClick={() => setOpenPreview(false)}>Close</Button>}
      >
        <ul className="space-y-2 text-sm text-muted">
          <li>Slack - Daily standup</li>
          <li>Zoom - Weekly sync</li>
          <li>VS Code - project/app.tsx</li>
        </ul>
      </Modal>
    </div>
  );
};

export default SettingsPage;
