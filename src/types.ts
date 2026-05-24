export interface PromptItem {
  id: string;
  title: string;
  description: string;
  prompt: string;
  tip: string;
  category: string;
  isCustom?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface UserCustomPrompt {
  id: string;
  title: string;
  description?: string;
  prompt: string;
  tip: string;
  category: string;
}

export interface TestExecutionResult {
  promptText: string;
  responseText?: string;
  loading?: boolean;
  error?: string;
  timestamp?: string;
}
