export type BoxTypes = 'code' | 'text';

export interface Box {
  id: string;
  type: BoxTypes;
  content: string;
}
