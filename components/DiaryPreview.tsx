
import React from 'react';
import { DiaryOutput } from '../types';

interface DiaryPreviewProps {
  diary: DiaryOutput | null;
  onCopy: () => void;
  onDownloadTxt: () => void;
  onDownloadPdf: () => void;
}

const DiaryPreview: React.FC<DiaryPreviewProps> = ({ diary, onCopy, onDownloadTxt, onDownloadPdf }) => {
  if (!diary) {
    return (
      <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-slate-600 font-semibold mb-1">No Diary Generated Yet</h3>
        <p className="text-slate-400 text-sm max-w-xs">Fill in the details on the left and click "Generate" to see your VTU compliant diary here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Preview Content</h3>
        <div className="flex gap-2">
          <button
            onClick={onCopy}
            className="px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy Text
          </button>
          <button
            onClick={onDownloadTxt}
            className="px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Text
          </button>
          <button
            onClick={onDownloadPdf}
            className="px-3 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>

      <div id="diary-content" className="p-8 flex-1 overflow-y-auto space-y-6 text-slate-800 leading-relaxed font-serif">
        <h2 className="text-xl font-bold border-b-2 border-indigo-600 pb-2 mb-8">{diary.title}</h2>
        
        <section>
          <h4 className="text-sm font-bold text-indigo-700 uppercase mb-2">Work Summary</h4>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{diary.workSummary}</p>
        </section>

        <section className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Hours Worked</h4>
            <p className="text-sm font-semibold">{diary.hoursWorked} Hours</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Status</h4>
            <p className="text-sm font-semibold">Completed</p>
          </div>
        </section>

        <section>
          <h4 className="text-sm font-bold text-indigo-700 uppercase mb-2">Learnings / Outcomes</h4>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{diary.learnings}</p>
        </section>

        <section>
          <h4 className="text-sm font-bold text-indigo-700 uppercase mb-2">Blockers / Risks</h4>
          <p className="text-sm italic text-slate-600">{diary.blockers}</p>
        </section>

        <section>
          <h4 className="text-sm font-bold text-indigo-700 uppercase mb-2">Skills Used</h4>
          <div className="flex flex-wrap gap-2">
            {diary.skillsUsed.map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded border border-slate-200">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-sm font-bold text-indigo-700 uppercase mb-2">Reference Links</h4>
          <p className="text-sm text-indigo-600 underline break-all">{diary.referenceLink}</p>
        </section>
      </div>
    </div>
  );
};

export default DiaryPreview;
