import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import DiaryForm from './components/DiaryForm';
import DiaryPreview from './components/DiaryPreview';
import Developer from './components/Developer';
import { DiaryInputs, DiaryOutput, SessionType, BlockerMode, SavedDiary } from './types';
import { generateDiaryContent } from './services/geminiService';

declare global {
  interface Window {
    jspdf: any;
  }
}

const App: React.FC = () => {
  const [inputs, setInputs] = useState<DiaryInputs>({
    date: new Date().toISOString().split('T')[0],
    topic: '',
    hoursWorked: '',
    skillsUsed: '',
    referenceLink: '',
    sessionType: SessionType.CONDUCTED,
    blockerMode: BlockerMode.AI,
    blockerInput: '',
  });

  const [diary, setDiary] = useState<DiaryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [history, setHistory] = useState<SavedDiary[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generated = await generateDiaryContent(inputs);
      setDiary(generated);
      // Save to history
      const saved: SavedDiary = {
        ...generated,
        id: Date.now().toString(),
        dateCreated: inputs.date,
      };
      setHistory(prev => [saved, ...prev].slice(0, 10)); // keep last 10
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const buildPlainText = (d: DiaryOutput) => `
${d.title}

Work Summary:
${d.workSummary}

Hours Worked: ${d.hoursWorked}

Learnings / Outcomes:
${d.learnings}

Blockers / Risks:
${d.blockers}

Skills Used:
${d.skillsUsed.join(', ')}

Reference Links:
${d.referenceLink}
  `.trim();

  const handleCopy = () => {
    if (!diary) return;
    navigator.clipboard.writeText(buildPlainText(diary));
    showToast('✓ Copied to clipboard!');
  };

  const handleDownloadTxt = () => {
    if (!diary) return;
    const text = buildPlainText(diary);
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Diary_${inputs.date}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('✓ Text file downloaded!');
  };

  const handleDownloadPdf = () => {
    if (!diary) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - margin * 2;
    let y = 20;

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        y = 20;
      }
    };

    // Title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(diary.title, margin, y);
    y += 8;
    doc.setDrawColor(79, 70, 229);
    doc.setLineWidth(0.8);
    doc.line(margin, y, margin + contentWidth, y);
    y += 12;

    const addSection = (title: string, content: string) => {
      checkPageBreak(20);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(79, 70, 229);
      doc.text(title.toUpperCase(), margin, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(content, contentWidth);
      lines.forEach((line: string) => {
        checkPageBreak(6);
        doc.text(line, margin, y);
        y += 5;
      });
      y += 8;
    };

    addSection('Work Summary', diary.workSummary);

    // Hours row
    checkPageBreak(14);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text('HOURS WORKED', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.text(`: ${diary.hoursWorked} Hours`, margin + 38, y);
    y += 14;

    addSection('Learnings / Outcomes', diary.learnings);
    addSection('Blockers / Risks', diary.blockers);
    addSection('Skills Used', diary.skillsUsed.join(', '));
    addSection('Reference Links', diary.referenceLink);

    doc.save(`Diary_${inputs.date}.pdf`);
    showToast('✓ PDF downloaded!');
  };

  const loadFromHistory = (item: SavedDiary) => {
    setDiary(item);
    setShowHistory(false);
    showToast('✓ Loaded from history');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header onHistoryClick={() => setShowHistory(s => !s)} historyCount={history.length} />

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-sm px-5 py-2.5 rounded-full shadow-lg transition-all">
          {toast}
        </div>
      )}

      {/* History Panel */}
      {showHistory && history.length > 0 && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-start justify-end" onClick={() => setShowHistory(false)}>
          <div className="bg-white w-full max-w-sm h-full overflow-y-auto shadow-2xl p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-base">Recent Entries</h3>
              <button onClick={() => setShowHistory(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">×</button>
            </div>
            <div className="space-y-3">
              {history.map(item => (
                <button
                  key={item.id}
                  onClick={() => loadFromHistory(item)}
                  className="w-full text-left p-3 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg transition-all"
                >
                  <p className="text-xs font-semibold text-indigo-600">{item.dateCreated}</p>
                  <p className="text-sm text-slate-700 mt-0.5 line-clamp-2">{item.workSummary.slice(0, 80)}...</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Form Side */}
          <div className="lg:col-span-5 space-y-6 z-0">
            <div className="bg-indigo-600 p-6 rounded-xl text-white shadow-lg overflow-hidden relative">
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-1">Generate Your Daily Diary</h2>
                <p className="text-indigo-100 text-sm opacity-90">
                  Fill in the details below and generate a VTU-compliant internship diary entry in seconds.
                </p>
              </div>
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 bg-indigo-500 rounded-full opacity-50"></div>
              <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-indigo-400 rounded-full opacity-30"></div>
            </div>

            <DiaryForm
              inputs={inputs}
              setInputs={setInputs}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm">
                  <p className="font-bold">Error</p>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl text-xs text-slate-500 flex flex-col gap-2">
              <p className="font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submission Checklist
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Min 6 sentences in Work Summary</li>
                <li>Min 6 sentences in Learnings/Outcomes</li>
                <li>Daily entry must be unique and descriptive</li>
                <li>Formal language only</li>
                <li>Relevant academic risks included</li>
              </ul>
            </div>
          </div>

          {/* Preview Side */}
          <div className="lg:col-span-7 h-full sticky top-24">
            <DiaryPreview
              diary={diary}
              onCopy={handleCopy}
              onDownloadTxt={handleDownloadTxt}
              onDownloadPdf={handleDownloadPdf}
            />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Developer />
        </div>
      </footer>
    </div>
  );
};

export default App;
