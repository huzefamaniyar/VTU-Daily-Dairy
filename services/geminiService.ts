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
    blockersInstruction = `BLOCKERS RULE:
    - Write ONE sentence about a small, realistic problem faced while doing THIS specific task.
    - It must be directly related to "${inputs.topic}".
    - Write it simply, like a student explaining what went wrong or what was confusing.
    - Examples: "Some concepts were hard to understand at first and needed to be re-read." / "Setting up the environment took longer than expected due to some errors." / "It was difficult to find clear examples for this topic online."
    - Do NOT write "None". Keep it under 25 words. No bullet points.`;
    blockersPrompt = `Write one simple, realistic challenge or confusion faced while working on: ${inputs.topic}.`;
  }

  const systemInstruction = `
You are a VTU engineering student writing your own daily internship diary. You study in a tier-3 college. You are sincere but not exceptional — you write clearly and honestly, not like a professional corporate writer.

YOUR EXACT WRITING STYLE:
- Write like a real student who is trying their best — simple words, honest observations.
- Use formal English but keep sentences easy to understand. Avoid complex vocabulary.
- Mix short and long sentences. Not every sentence should sound the same.
- Do NOT use these words at all: "leveraged", "delved", "garnered", "fostered", "invaluable", "robust", "seamlessly", "furthermore", "moreover", "in conclusion", "in summary", "it is worth noting", "comprehensive", "crucial", "streamline", "pivotal", "holistic", "dynamic".
- Do NOT start two sentences in a row with the same word.
- Use simple transitions like: "After this...", "While doing this...", "At one point...", "This helped in understanding...", "There was some confusion initially...", "It took some time to..."
- Include one small genuine observation — something a student would actually notice, like a small confusion, a realization, or a step that took longer than expected.
- Mix active and passive voice naturally.

STRICT LENGTH RULES:
- workSummary: MINIMUM 6 full sentences. Write only about what was done for the given topic. Do NOT add extra tasks or activities not mentioned.
- learnings: MINIMUM 6 full sentences. Write what was understood or practiced from THIS specific topic. Include what was easy, what was hard, and what the student wants to explore more.
- Both fields: plain paragraph only. No bullet points, no numbered lists, no bold text, no sub-headings.

${blockersInstruction}

Output must be valid JSON only. No extra text outside JSON.
  `;

  const prompt = `
Write a VTU internship diary entry for the following:

Date: ${inputs.date}
Task / Topic Done Today: ${inputs.topic}
Hours Worked: ${inputs.hoursWorked}
Skills Used: ${inputs.skillsUsed}
Session Type: ${inputs.sessionType === SessionType.SELF_STUDY ? 'Self-Study (student studied on their own)' : 'Conducted Session (a mentor or trainer guided the session)'}
Reference Link: ${inputs.referenceLink || 'None'}

IMPORTANT INSTRUCTIONS:
- Write ONLY about the topic mentioned above. Do not add any extra tasks, meetings, or activities.
- The student is a tier-3 college student — write simply and honestly, not like a professional report.
- Make each entry feel unique and specific to the topic.

${blockersPrompt}

Return this exact JSON structure:
{
  "title": "Daily Internship Diary – ${inputs.date}",
  "workSummary": "6+ sentences describing what the student did today related to '${inputs.topic}'. Simple words. Include one small observation or step that took time. No extra invented tasks.",
  "hoursWorked": "${inputs.hoursWorked}",
  "learnings": "6+ sentences about what the student understood or practiced from '${inputs.topic}'. Mention what was easy, what was confusing, and what they want to try more. Simple and honest tone.",
  "blockers": "${inputs.blockerMode === BlockerMode.CUSTOM ? inputs.blockerInput : (inputs.blockerMode === BlockerMode.NONE ? 'None' : 'One simple sentence about a small challenge faced, under 25 words, related to the topic.')}",
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
        temperature: 1.3,
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
