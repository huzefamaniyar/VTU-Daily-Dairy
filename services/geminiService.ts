import { GoogleGenAI, Type } from "@google/genai";
import { DiaryInputs, DiaryOutput, SessionType, BlockerMode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDiaryContent = async (inputs: DiaryInputs): Promise<DiaryOutput> => {
  const model = 'gemini-1.5-flash';

  // Parse exact skills user selected — AI must NEVER change this
  const exactSkills = inputs.skillsUsed
    .split(',')
    .map((s: string) => s.trim())
    .filter(Boolean);

  let blockersInstruction = '';
  let blockersPrompt = '';

  if (inputs.blockerMode === BlockerMode.NONE) {
    blockersInstruction = 'The "blockers" field must be exactly: "None".';
    blockersPrompt = 'Set blockers to "None".';
  } else if (inputs.blockerMode === BlockerMode.CUSTOM) {
    blockersInstruction = `The "blockers" field must be EXACTLY: "${inputs.blockerInput}". Copy it word for word.`;
    blockersPrompt = `Set blockers to exactly: "${inputs.blockerInput}"`;
  } else {
    blockersInstruction = `BLOCKERS RULE:
- Write ONE sentence, max 25 words, about a small problem faced during THIS task only.
- Must be about: "${inputs.topic}"
- Student style: "Some syntax was confusing at first." / "It took time to figure out why the output was wrong."
- Do NOT write "None". One sentence only.`;
    blockersPrompt = `Write one honest student sentence (max 25 words) about a small difficulty in: ${inputs.topic}`;
  }

  const systemInstruction = `
You are a VTU engineering student writing your daily internship diary. Tier-3 college. Sincere but normal student.

BANNED PHRASES — DO NOT USE ANY OF THESE EVER:
- "I gained a deeper understanding" / "I gained a better understanding"  
- "I successfully learned" / "I successfully implemented"
- "I achieved a better grasp" / "I achieved a deeper understanding"
- "I gained valuable insight" / "I was able to achieve"
- "I have developed a more systematic"
- "real-world behavior" / "evaluation criteria" / "automated test cases"
- "professional development" / "enhanced my skills" / "key takeaway"
- "I honed" / "I solidified" / "I reinforced" / "overall experience"
- "leveraged" / "delved" / "garnered" / "fostered" / "invaluable"
- "robust" / "seamlessly" / "streamline" / "pivotal" / "holistic"
- "furthermore" / "moreover" / "in conclusion" / "in summary"
- "it is worth noting" / "comprehensive" / "crucial"
- "this activity" / "this endeavour"

USE THESE PATTERNS INSTEAD:
- "Today I worked on..." / "I spent time on..." / "I tried to..."
- "It took me some time to..." / "I was not sure how... so I looked it up"
- "I ran the code and it gave an error, then I fixed it by..."
- "I think I understand this now" / "I want to practise this more"
- "There was some confusion at first, but..."
- "After trying a few times, it started making sense"
- "One thing I noticed was..."

RULES:
1. Simple clear English. Mix short and long sentences.
2. Never start two sentences in a row with the same word.
3. Include exactly ONE small confusion or struggle a real student faces.
4. Write ONLY about the given topic. Do NOT add tools, platforms, or tasks not in the topic.
5. Plain paragraph — no bullet points, no numbered lists, no bold text.
6. workSummary: MINIMUM 6 sentences.
7. learnings: MINIMUM 6 sentences.

${blockersInstruction}

Output: valid JSON only. Nothing outside JSON.
`;

  const prompt = `
Write a VTU internship diary entry for this student:

Date: ${inputs.date}
Topic done today: ${inputs.topic}
Hours Worked: ${inputs.hoursWorked}
Session Type: ${inputs.sessionType === SessionType.SELF_STUDY
    ? 'Self-Study (student worked alone)'
    : 'Conducted Session (mentor was present)'}
Reference Link: ${inputs.referenceLink || 'None'}

BEFORE WRITING — READ THESE CAREFULLY:
1. Write ONLY about "${inputs.topic}". If the topic says "Kotlin Playground", do not mention Android Studio, XML, or anything else not in the topic.
2. Do NOT use any banned phrase. Not even once.
3. workSummary must have one sentence about something that took time or was slightly confusing.
4. learnings must have one sentence about what the student wants to try or explore more.
5. Write like a real student — simple, honest, slightly imperfect sentences. Not like a report.

${blockersPrompt}

Return ONLY this JSON, nothing else:
{
  "title": "Daily Internship Diary – ${inputs.date}",
  "workSummary": "6+ sentence plain paragraph about what was done in '${inputs.topic}'. Student language. One small difficulty included. No invented tasks or tools.",
  "hoursWorked": "${inputs.hoursWorked}",
  "learnings": "6+ sentence plain paragraph about what was understood from '${inputs.topic}'. Mention what was hard and what to try more. Honest tone.",
  "blockers": "as instructed above",
  "skillsUsed": ${JSON.stringify(exactSkills)},
  "referenceLink": "${inputs.referenceLink || 'Add your submission, badge, or profile link here'}"
}
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 1.4,
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

    // HARD OVERRIDE: Always force user's selected skills — AI cannot change this
    result.skillsUsed = exactSkills;

    return result as DiaryOutput;
  } catch (error) {
    console.error("Error generating diary:", error);
    throw new Error("Failed to generate diary content. Please try again.");
  }
};
