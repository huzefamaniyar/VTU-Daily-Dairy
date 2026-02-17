
export enum SessionType {
  CONDUCTED = 'Conducted Session',
  SELF_STUDY = 'Self-Study'
}

export enum BlockerMode {
  NONE = 'none',
  CUSTOM = 'custom',
  AI = 'ai'
}

export interface DiaryInputs {
  date: string;
  topic: string;
  hoursWorked: string;
  skillsUsed: string;
  referenceLink: string;
  sessionType: SessionType;
  blockerMode: BlockerMode;
  blockerInput: string;
}

export interface DiaryOutput {
  title: string;
  workSummary: string;
  hoursWorked: string;
  learnings: string;
  blockers: string;
  skillsUsed: string[];
  referenceLink: string;
}

export interface SavedDiary extends DiaryOutput {
  id: string;
  dateCreated: string;
}
