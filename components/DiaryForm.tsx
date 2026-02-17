
import React, { useState, useEffect } from 'react';
import { DiaryInputs, SessionType, BlockerMode } from '../types';
import { AVAILABLE_SKILLS, matchSkillsFromTopic } from '../constants';

interface DiaryFormProps {
  inputs: DiaryInputs;
  setInputs: (inputs: DiaryInputs) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const DiaryForm: React.FC<DiaryFormProps> = ({ inputs, setInputs, onGenerate, isLoading }) => {
  const [skillSearch, setSkillSearch] = useState('');
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const skillSearchRef = React.useRef<HTMLDivElement>(null);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (skillSearchRef.current && !skillSearchRef.current.contains(event.target as Node)) {
        setShowSkillSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedInputs = { ...inputs, [name]: value };
    
    // Auto-match skills when topic changes
    if (name === 'topic') {
      const matchedSkills = matchSkillsFromTopic(value);
      updatedInputs.skillsUsed = matchedSkills.join(', ');
    }
    
    setInputs(updatedInputs);
  };

  const handleSkillToggle = (skill: string) => {
    const selectedSkills = inputs.skillsUsed ? inputs.skillsUsed.split(', ') : [];
    const skillIndex = selectedSkills.indexOf(skill);
    
    if (skillIndex > -1) {
      selectedSkills.splice(skillIndex, 1);
    } else {
      selectedSkills.push(skill);
    }
    
    setInputs({ ...inputs, skillsUsed: selectedSkills.join(', ') });
    setSkillSearch('');
  };

  const selectedSkills = inputs.skillsUsed ? inputs.skillsUsed.split(', ').filter(s => s) : [];
  const isFormValid = inputs.date && inputs.topic && inputs.hoursWorked && inputs.skillsUsed;

  // Filter skills based on search input
  const filteredSkills = skillSearch.trim() === ''
    ? []
    : AVAILABLE_SKILLS.filter(
        skill =>
          skill.toLowerCase().includes(skillSearch.toLowerCase()) &&
          !selectedSkills.includes(skill)
      );

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-lg font-semibold text-slate-800">Diary Entry Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Date of Entry</label>
          <input
            type="date"
            name="date"
            value={inputs.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Session Type</label>
          <select
            name="sessionType"
            value={inputs.sessionType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          >
            <option value={SessionType.CONDUCTED}>Conducted Session</option>
            <option value={SessionType.SELF_STUDY}>Self-Study</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">Topic / Task Description</label>
        <input
          type="text"
          name="topic"
          placeholder="e.g., Introduction to React Hooks and State Management"
          value={inputs.topic}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Hours Worked</label>
          <input
            type="number"
            name="hoursWorked"
            placeholder="e.g., 6"
            value={inputs.hoursWorked}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-3" ref={skillSearchRef}>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-700">Skills Used (Auto-detected)</label>
          <span className="text-xs text-slate-500">{selectedSkills.length} selected</span>
        </div>
        
        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedSkills.map((skill) => (
              <div
                key={skill}
                className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className="hover:text-indigo-900 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            placeholder="Search and add skills..."
            value={skillSearch}
            onChange={(e) => {
              setSkillSearch(e.target.value);
              setShowSkillSuggestions(true);
            }}
            onFocus={() => setShowSkillSuggestions(true)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />

          {showSkillSuggestions && filteredSkills.length > 0 && (
            <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
              {filteredSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => {
                    handleSkillToggle(skill);
                    setShowSkillSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 transition-colors text-sm"
                >
                  {skill}
                </button>
              ))}
            </div>
          )}
          
          {showSkillSuggestions && skillSearch.trim() !== '' && filteredSkills.length === 0 && (
            <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg p-3">
              <p className="text-sm text-slate-500">No skills found matching "{skillSearch}"</p>
            </div>
          )}
        </div>
        
        <p className="text-xs text-slate-500">Skills are auto-detected from your topic. You can add more skills using the search box above. Only selected skills will be included in the generated diary.</p>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">Blockers / Risks</label>
        
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setInputs({ ...inputs, blockerMode: BlockerMode.NONE, blockerInput: '' })}
            className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              inputs.blockerMode === BlockerMode.NONE
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            None
          </button>
          <button
            type="button"
            onClick={() => setInputs({ ...inputs, blockerMode: BlockerMode.CUSTOM })}
            className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              inputs.blockerMode === BlockerMode.CUSTOM
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Custom Input
          </button>
          <button
            type="button"
            onClick={() => setInputs({ ...inputs, blockerMode: BlockerMode.AI, blockerInput: '' })}
            className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              inputs.blockerMode === BlockerMode.AI
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            AI Auto-write
          </button>
        </div>

        {inputs.blockerMode === BlockerMode.CUSTOM && (
          <textarea
            name="blockerInput"
            placeholder="Enter custom blockers or risks..."
            value={inputs.blockerInput}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
            rows={4}
          />
        )}

        {inputs.blockerMode === BlockerMode.NONE && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600">
            No blockers will be added to the generated diary.
          </div>
        )}

        {inputs.blockerMode === BlockerMode.AI && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            Blockers will be auto-generated based on your task description.
          </div>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">Reference / Submission Link (Optional)</label>
        <input
          type="url"
          name="referenceLink"
          placeholder="https://github.com/your-repo"
          value={inputs.referenceLink}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
        />
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !isFormValid}
        className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${
          isLoading || !isFormValid ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Entry...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generate Daily Diary
          </>
        )}
      </button>
      {!isFormValid && (
        <p className="text-xs text-center text-slate-400">Please fill out all required fields marked with *</p>
      )}
    </div>
  );
};

export default DiaryForm;
