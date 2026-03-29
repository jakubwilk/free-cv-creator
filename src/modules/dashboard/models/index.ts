export interface CvEntry {
  id: string;
  name: string;
  templateId: string;
  updatedAt: string; // ISO 8601
  data: Record<string, unknown>;
}
