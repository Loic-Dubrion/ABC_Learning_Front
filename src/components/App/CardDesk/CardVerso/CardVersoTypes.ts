export interface Tool {
  tool_id: number;
  tool_name: string;
  level_id: number;
  level_name: string;
}

export interface ToolCategory {
  tool_category_id: number;
  tool_category_name: string;
  tools: Tool[];
}

export interface CardVersoData {
  card_id: number;
  card_name: string;
  activities: string[];
  tool_categories: ToolCategory[];
}
