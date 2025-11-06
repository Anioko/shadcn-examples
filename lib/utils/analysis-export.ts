import mockData from '@/lib/mock-data/capability-options-analysis.json';

export interface Analysis {
  id: string;
  name: string;
  capability: string;
  selectedOptions: string[];
  status: string;
  createdDate: string;
  lastModified: string;
  createdBy: string;
  scores: Record<string, Record<string, number>>;
  notes?: string;
  recommendation?: string;
}

// Calculate weighted score for an option
function calculateWeightedScore(scores: Record<string, number>): number {
  let totalWeighted = 0;
  mockData.evaluationCriteria.forEach(criterion => {
    const score = scores[criterion.id] || 0;
    totalWeighted += (score * criterion.weight) / 100;
  });
  return totalWeighted;
}

// Export to JSON
export function exportToJSON(analysis: Analysis): void {
  const dataStr = JSON.stringify(analysis, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  downloadFile(blob, `${analysis.name}_analysis.json`);
}

// Export to CSV
export function exportToCSV(analysis: Analysis): void {
  const capability = mockData.capabilities.find(c => c.id === analysis.capability);
  const options = (mockData.applicationOptions as any)[analysis.capability] || [];
  const selectedOptions = analysis.selectedOptions.map((optionId: string) =>
    options.find((opt: any) => opt.id === optionId)
  ).filter(Boolean);

  // CSV Header
  let csv = 'Analysis Export\n\n';
  csv += `Name,${analysis.name}\n`;
  csv += `Capability,${capability?.name || analysis.capability}\n`;
  csv += `Status,${analysis.status}\n`;
  csv += `Created By,${analysis.createdBy}\n`;
  csv += `Created Date,${new Date(analysis.createdDate).toLocaleDateString()}\n`;
  csv += `Last Modified,${new Date(analysis.lastModified).toLocaleDateString()}\n\n`;

  // Scoring Matrix
  csv += 'Evaluation Criteria,Weight';
  selectedOptions.forEach((option: any) => {
    csv += `,${option.name}`;
  });
  csv += '\n';

  mockData.evaluationCriteria.forEach(criterion => {
    csv += `${criterion.name},${criterion.weight}%`;
    selectedOptions.forEach((option: any) => {
      const score = analysis.scores[option.id]?.[criterion.id] || 0;
      csv += `,${score}`;
    });
    csv += '\n';
  });

  // Weighted Scores
  csv += '\nWeighted Total Score,';
  selectedOptions.forEach((option: any) => {
    const weightedScore = calculateWeightedScore(analysis.scores[option.id] || {});
    csv += `,${weightedScore}`;
  });
  csv += '\n';

  if (analysis.notes) {
    csv += `\nNotes,"${analysis.notes.replace(/"/g, '""')}"\n`;
  }

  if (analysis.recommendation) {
    csv += `\nRecommendation,"${analysis.recommendation.replace(/"/g, '""')}"\n`;
  }

  const blob = new Blob([csv], { type: 'text/csv' });
  downloadFile(blob, `${analysis.name}_analysis.csv`);
}

// Export to Markdown
export function exportToMarkdown(analysis: Analysis): void {
  const capability = mockData.capabilities.find(c => c.id === analysis.capability);
  const options = (mockData.applicationOptions as any)[analysis.capability] || [];
  const selectedOptions = analysis.selectedOptions.map((optionId: string) =>
    options.find((opt: any) => opt.id === optionId)
  ).filter(Boolean);

  let md = `# ${analysis.name}\n\n`;
  md += `## Analysis Overview\n\n`;
  md += `- **Capability**: ${capability?.name || analysis.capability}\n`;
  md += `- **Status**: ${analysis.status}\n`;
  md += `- **Created By**: ${analysis.createdBy}\n`;
  md += `- **Created**: ${new Date(analysis.createdDate).toLocaleDateString()}\n`;
  md += `- **Last Modified**: ${new Date(analysis.lastModified).toLocaleDateString()}\n\n`;

  md += `## Capability Context\n\n`;
  if (capability) {
    md += `**${capability.name}**\n\n`;
    md += `${capability.description}\n\n`;
    md += `- **Category**: ${capability.category}\n`;
    md += `- **Current State**: ${capability.currentState}\n`;
    md += `- **Strategic Importance**: ${capability.strategicImportance}\n\n`;
  }

  md += `## Applications Under Evaluation\n\n`;
  selectedOptions.forEach((option: any) => {
    md += `### ${option.name}\n\n`;
    md += `- **Vendor**: ${option.vendor}\n`;
    md += `- **Type**: ${option.type}\n`;
    md += `- **Description**: ${option.description}\n\n`;
  });

  md += `## Evaluation Scores\n\n`;
  md += `| Criteria (Weight) | ${selectedOptions.map((o: any) => o.name).join(' | ')} |\n`;
  md += `| --- | ${selectedOptions.map(() => '---').join(' | ')} |\n`;

  mockData.evaluationCriteria.forEach(criterion => {
    md += `| ${criterion.name} (${criterion.weight}%) | `;
    md += selectedOptions.map((option: any) => {
      const score = analysis.scores[option.id]?.[criterion.id] || 0;
      return score;
    }).join(' | ');
    md += ' |\n';
  });

  md += `| **Weighted Total** | `;
  md += selectedOptions.map((option: any) => {
    const weightedScore = calculateWeightedScore(analysis.scores[option.id] || {});
    return `**${weightedScore}**`;
  }).join(' | ');
  md += ' |\n\n';

  if (analysis.recommendation) {
    md += `## Recommendation\n\n`;
    md += `${analysis.recommendation}\n\n`;
  }

  if (analysis.notes) {
    md += `## Notes\n\n`;
    md += `${analysis.notes}\n\n`;
  }

  md += `---\n\n`;
  md += `*Generated with Claude Code Options Analysis Tool*\n`;

  const blob = new Blob([md], { type: 'text/markdown' });
  downloadFile(blob, `${analysis.name}_analysis.md`);
}

// Export to Excel (XLSX) using SheetJS approach
export function exportToExcel(analysis: Analysis): void {
  const capability = mockData.capabilities.find(c => c.id === analysis.capability);
  const options = (mockData.applicationOptions as any)[analysis.capability] || [];
  const selectedOptions = analysis.selectedOptions.map((optionId: string) =>
    options.find((opt: any) => opt.id === optionId)
  ).filter(Boolean);

  // Create a simple TSV format that Excel can open
  let tsv = 'Analysis Export\t\t\t\n\n';
  tsv += `Name\t${analysis.name}\t\t\n`;
  tsv += `Capability\t${capability?.name || analysis.capability}\t\t\n`;
  tsv += `Status\t${analysis.status}\t\t\n`;
  tsv += `Created By\t${analysis.createdBy}\t\t\n`;
  tsv += `Created Date\t${new Date(analysis.createdDate).toLocaleDateString()}\t\t\n`;
  tsv += `Last Modified\t${new Date(analysis.lastModified).toLocaleDateString()}\t\t\n\n`;

  // Applications section
  tsv += 'Applications Under Evaluation\t\t\t\n';
  tsv += 'Application\tVendor\tType\tDescription\n';
  selectedOptions.forEach((option: any) => {
    tsv += `${option.name}\t${option.vendor}\t${option.type}\t${option.description}\n`;
  });
  tsv += '\n';

  // Scoring Matrix
  tsv += 'Evaluation Criteria\tWeight';
  selectedOptions.forEach((option: any) => {
    tsv += `\t${option.name}`;
  });
  tsv += '\n';

  mockData.evaluationCriteria.forEach(criterion => {
    tsv += `${criterion.name}\t${criterion.weight}%`;
    selectedOptions.forEach((option: any) => {
      const score = analysis.scores[option.id]?.[criterion.id] || 0;
      tsv += `\t${score}`;
    });
    tsv += '\n';
  });

  // Weighted Scores
  tsv += '\nWeighted Total Score\t';
  selectedOptions.forEach((option: any) => {
    const weightedScore = calculateWeightedScore(analysis.scores[option.id] || {});
    tsv += `\t${weightedScore}`;
  });
  tsv += '\n\n';

  if (analysis.recommendation) {
    tsv += `Recommendation\t${analysis.recommendation}\n\n`;
  }

  if (analysis.notes) {
    tsv += `Notes\t${analysis.notes}\n`;
  }

  const blob = new Blob([tsv], { type: 'application/vnd.ms-excel' });
  downloadFile(blob, `${analysis.name}_analysis.xls`);
}

// Helper function to trigger file download
function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Get all analyses from both mock data and localStorage
export function getAllAnalyses(): Analysis[] {
  const mockAnalyses = mockData.savedAnalyses as Analysis[];

  if (typeof window === 'undefined') {
    return mockAnalyses;
  }

  const storedAnalyses = localStorage.getItem('userAnalyses');
  const userAnalyses = storedAnalyses ? JSON.parse(storedAnalyses) : [];

  return [...mockAnalyses, ...userAnalyses];
}

// Delete analysis from localStorage
export function deleteAnalysis(analysisId: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const storedAnalyses = localStorage.getItem('userAnalyses');
  if (!storedAnalyses) {
    return false;
  }

  const userAnalyses = JSON.parse(storedAnalyses) as Analysis[];
  const filteredAnalyses = userAnalyses.filter(a => a.id !== analysisId);

  if (filteredAnalyses.length === userAnalyses.length) {
    // Analysis not found in localStorage (might be from mock data)
    return false;
  }

  localStorage.setItem('userAnalyses', JSON.stringify(filteredAnalyses));
  return true;
}

// Duplicate analysis
export function duplicateAnalysis(analysis: Analysis): Analysis {
  const newAnalysis: Analysis = {
    ...analysis,
    id: `analysis-${Date.now()}`,
    name: `${analysis.name} (Copy)`,
    status: 'Draft',
    createdDate: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    createdBy: analysis.createdBy
  };

  if (typeof window !== 'undefined') {
    const storedAnalyses = localStorage.getItem('userAnalyses');
    const userAnalyses = storedAnalyses ? JSON.parse(storedAnalyses) : [];
    userAnalyses.push(newAnalysis);
    localStorage.setItem('userAnalyses', JSON.stringify(userAnalyses));
  }

  return newAnalysis;
}

// Generate shareable link
export function generateShareableLink(analysisId: string): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const baseUrl = window.location.origin;
  return `${baseUrl}/dashboard/options-analysis/${analysisId}`;
}
