
import React, { useState } from 'react';
import Header from './components/Header';
import DiaryForm from './components/DiaryForm';
import DiaryPreview from './components/DiaryPreview';
import Developer from './components/Developer';
import { DiaryInputs, DiaryOutput, SessionType, BlockerMode } from './types';
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

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generated = await generateDiaryContent(inputs);
      setDiary(generated);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!diary) return;
    const text = `
${diary.title}

Work Summary:
${diary.workSummary}

Hours Worked: ${diary.hoursWorked}

Learnings / Outcomes:
${diary.learnings}

Blockers / Risks:
${diary.blockers}

Skills Used:
${diary.skillsUsed.join(', ')}

Reference Links:
${diary.referenceLink}
    `;
    navigator.clipboard.writeText(text.trim());
    alert('Copied to clipboard!');
  };

  const handleDownloadTxt = () => {
    if (!diary) return;
    const text = `
${diary.title}
---------------------------------------
WORK SUMMARY:
${diary.workSummary}

HOURS WORKED: ${diary.hoursWorked}

LEARNINGS / OUTCOMES:
${diary.learnings}

BLOCKERS / RISKS:
${diary.blockers}

SKILLS USED:
${diary.skillsUsed.join(', ')}

REFERENCE LINKS:
${diary.referenceLink}
    `;
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Diary_${inputs.date}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadPdf = () => {
    if (!diary) return;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const margin = 20;
    const width = 170;
    let y = 20;

    // Header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(diary.title, margin, y);
    y += 10;
    doc.setDrawColor(79, 70, 229); // Indigo-600
    doc.setLineWidth(1);
    doc.line(margin, y, margin + width, y);
    y += 15;

    // Helper for multiline text
    const addSection = (title: string, content: string) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(79, 70, 229);
      doc.text(title.toUpperCase(), margin, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 41, 59);
      const splitText = doc.splitTextToSize(content, width);
      doc.text(splitText, margin, y);
      y += (splitText.length * 5) + 10;
    };

    addSection('Work Summary', diary.workSummary);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text('HOURS WORKED', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.text(`: ${diary.hoursWorked} Hours`, margin + 35, y);
    y += 15;

    addSection('Learnings / Outcomes', diary.learnings);
    addSection('Blockers / Risks', diary.blockers);
    addSection('Skills Used', diary.skillsUsed.join(', '));
    addSection('Reference Links', diary.referenceLink);

    doc.save(`Diary_${inputs.date}.pdf`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-5 space-y-6 z-0">
            <div className="bg-indigo-600 p-6 rounded-xl text-white shadow-lg overflow-hidden relative">
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-1">Generate Your Daily Diary</h2>
                <p className="text-indigo-100 text-sm opacity-90">
                  Ensure your internship documentation is professional and consistent with just a few clicks.
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
                  <p className="font-bold">Error Occurred</p>
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
