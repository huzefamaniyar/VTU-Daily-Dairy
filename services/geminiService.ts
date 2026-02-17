
import { GoogleGenAI, Type } from "@google/genai";
import { DiaryInputs, DiaryOutput, SessionType, BlockerMode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDiaryContent = async (inputs: DiaryInputs): Promise<DiaryOutput> => {
  const model = 'gemini-3-flash-preview';

  // Determine blockers content based on mode
  let blockersInstruction = '';
  let blockersPrompt = '';

  if (inputs.blockerMode === BlockerMode.NONE) {
    blockersInstruction = 'The "blockers" field should be the exact string "None".';
    blockersPrompt = 'Set blockers to "None" (no blockers/risks).';
  } else if (inputs.blockerMode === BlockerMode.CUSTOM) {
    blockersInstruction = `The "blockers" field should contain exactly this custom user input: "${inputs.blockerInput}"`;
    blockersPrompt = `Set blockers to: "${inputs.blockerInput}"`;
  } else {
    blockersInstruction = `BLOCKERS & RISKS RULES:
    - MUST be realistic and directly related to the task/session topic.
    - DO NOT simply say "None" or "No blockers".
    - Focus on minor academic or technical hurdles.
    - Examples: "Initial difficulty in grasping abstract concepts," "Minor configuration errors in the development environment," "Time constraints due to the complexity of the topic," "Required additional research to resolve logical errors," or "Need for more practice to achieve proficiency."`;
    blockersPrompt = 'Generate realistic, minor academic or technical blockers/risks for this task.';
  }

  const systemInstruction = `
    You are an expert academic writer specialized in VTU (Visvesvaraya Technological University) internship documentation.
    Your task is to generate a professional, formal, and detailed daily internship diary entry.
    
    CRITICAL RULES:
    1. The "Work Summary" section must contain AT LEAST 6 FULL SENTENCES.
    2. The "Learnings / Outcomes" section must contain AT LEAST 6 FULL SENTENCES.
    3. Use simple, formal, and professional British English (standard in Indian universities).
    4. Avoid robotic or repetitive phrasing. Make it sound like it was written by a diligent human intern. 
    5. Each response must be unique and contextually relevant to the specific topic provided to avoid plagiarism detection.
    
    ${blockersInstruction}
    
    6. If the session type is "Self-Study", focus on independent research, documentation reading, and skill practice.
    7. If the session type is "Conducted Session", focus on attendance, mentorship, and organized tasks.
    8. The output MUST be in valid JSON format.
  `;

  const prompt = `
    Generate a unique VTU internship diary entry for the following data:
    Date: ${inputs.date}
    Topic: ${inputs.topic}
    Hours Worked: ${inputs.hoursWorked}
    Skills Used: ${inputs.skillsUsed}
    Session Type: ${inputs.sessionType}
    Reference Link: ${inputs.referenceLink || 'None provided'}

    Return a JSON object with this structure:
    {
      "title": "Daily Internship Diary – ${inputs.date}",
      "workSummary": "A detailed 6+ sentence unique summary of the day's work related to ${inputs.topic}.",
      "hoursWorked": "${inputs.hoursWorked}",
      "learnings": "A detailed 6+ sentence unique list/paragraph of learnings and outcomes from ${inputs.topic}.",
      "blockers": "${inputs.blockerMode === BlockerMode.CUSTOM ? inputs.blockerInput : (inputs.blockerMode === BlockerMode.NONE ? 'None' : 'A realistic, minor academic or technical risk/challenge faced during this specific task.')}",
      "skillsUsed": ["skill1", "skill2"],
      "referenceLink": "The link provided, or 'Add your submission, badge, or profile link here' if empty."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            workSummary: { type: Type.STRING },
            hoursWorked: { type: Type.STRING },
            learnings: { type: Type.STRING },
            blockers: { type: Type.STRING },
            skillsUsed: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            referenceLink: { type: Type.STRING }
          },
          required: ["title", "workSummary", "hoursWorked", "learnings", "blockers", "skillsUsed", "referenceLink"]
        }
      },
    });

    const result = JSON.parse(response.text || '{}');
    return result as DiaryOutput;
  } catch (error) {
    console.error("Error generating diary:", error);
    throw new Error("Failed to generate diary content. Please try again.");
  }
};
