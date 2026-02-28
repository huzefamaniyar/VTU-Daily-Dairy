import { GoogleGenAI, Type } from "@google/genai";
import { DiaryInputs, DiaryOutput, SessionType, BlockerMode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDiaryContent = async (inputs: DiaryInputs): Promise<DiaryOutput> => {
  const model = 'gemini-2.5-flash-preview-05-20';

  // Determine blockers content based on mode
  let blockersInstruction = '';
  let blockersPrompt = '';

  if (inputs.blockerMode === BlockerMode.NONE) {
    blockersInstruction = 'The "blockers" field must be exactly: "None".';
    blockersPrompt = 'Set blockers to "None".';
  } else if (inputs.blockerMode === BlockerMode.CUSTOM) {
    blockersInstruction = `The "blockers" field must contain exactly this text: "${inputs.blockerInput}"`;
    blockersPrompt = `Set blockers to: "${inputs.blockerInput}"`;
  } else {
    blockersInstruction = `BLOCKERS & RISKS RULES:
    - Must be a single sentence describing one realistic minor challenge faced during THIS specific task.
    - Must be directly related to "${inputs.topic}" — do not write generic blockers.
    - Write it as a past-tense observation, e.g., "Understanding the difference between X and Y took more time than expected."
    - Do NOT write "None". Do NOT list multiple blockers. Do NOT use bullet points.
    - Keep it under 30 words.`;
    blockersPrompt = `Write one realistic, specific minor challenge faced while working on: ${inputs.topic}.`;
  }

  const systemInstruction = `
You are a VTU engineering intern writing your own daily training diary. You are a real student — not an AI, not a corporate writer.

YOUR WRITING STYLE:
- Formal but not stiff. Write like a sincere, hardworking student would write.
- Use simple, clear sentences. Mix short and long sentences naturally.
- Do NOT use these words ever: "leveraged", "delved", "garnered", "fostered", "invaluable", "robust", "seamlessly", "comprehensive", "crucial", "streamline", "furthermore", "moreover", "in conclusion", "in summary", "it is worth noting".
- Do NOT start multiple sentences in a row with the same word.
- Mix active and passive voice naturally throughout the text.
- Add small, realistic observations — something a student would genuinely notice, like a small confusion, a realization, or a minor difficulty encountered.
- Use transitional phrases like: "While working on...", "At one point...", "It was noted that...", "During this process...", "This helped in understanding...", "There was some initial confusion regarding..."
- Every entry must feel unique and specific to the topic. Do not reuse generic sentences.

STRICT FORMAT RULES:
- workSummary: MINIMUM 6 full sentences. Must describe ONLY what was actually done for the given topic. No imaginary extra tasks.
- learnings: MINIMUM 6 full sentences. Must describe what was understood, practiced, or realized from THIS specific topic.
- Both fields must be plain paragraphs — NO bullet points, NO numbered lists, NO bold text, NO headers inside the text.
- Output must be valid JSON only.

${blockersInstruction}
  `;

  const prompt = `
Write a VTU internship diary entry for the following:

Date: ${inputs.date}
Topic / Task Done Today: ${inputs.topic}
Hours Worked: ${inputs.hoursWorked}
Skills Used: ${inputs.skillsUsed}
Session Type: ${inputs.sessionType === SessionType.SELF_STUDY ? 'Self-Study (student studied/worked independently)' : 'Conducted Session (mentor or trainer led the session)'}
Reference Link: ${inputs.referenceLink || 'None provided'}

IMPORTANT: Write the diary based ONLY on the topic above. Do not add tasks or activities that were not mentioned.

${blockersPrompt}

Return a JSON object with this exact structure:
{
  "title": "Daily Internship Diary – ${inputs.date}",
  "workSummary": "A paragraph of at least 6 sentences describing what was done today related to '${inputs.topic}'. Must sound like a real student wrote it. Include one small observation or minor difficulty.",
  "hoursWorked": "${inputs.hoursWorked}",
  "learnings": "A paragraph of at least 6 sentences describing what was learned or understood from '${inputs.topic}' today. Be specific, not generic. Include what clicked, what was practiced, and what still needs more work.",
  "blockers": "${inputs.blockerMode === BlockerMode.CUSTOM ? inputs.blockerInput : (inputs.blockerMode === BlockerMode.NONE ? 'None' : 'One specific minor challenge related to the topic, written in one sentence under 30 words.')}",
  "skillsUsed": ${JSON.stringify(inputs.skillsUsed.split(',').map((s: string) => s.trim()).filter(Boolean))},
  "referenceLink": "${inputs.referenceLink || 'Add your submission, badge, or profile link here'}"
}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 1.2,
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
