/**
 * Type declarations for JSON module imports
 */

declare module '@/app/data/*.json' {
  import { TideProject } from '@/types/tide-project';
  const value: TideProject | Record<string, unknown>;
  export default value;
}