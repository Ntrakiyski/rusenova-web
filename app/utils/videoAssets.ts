// Video path utilities for ML projects
// This file can be used for video path validation or future enhancements

// Example usage:
// const videoPath = validateVideoPath('/meeting-agent-video.webm');

export function validateVideoPath(path: string): string {
  // Ensure path starts with slash for public folder access
  return path.startsWith('/') ? path : `/${path}`;
}
