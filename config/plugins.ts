import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      security: {
        // Maximum file size in bytes (10MB)
        maxFileSize: 10 * 1024 * 1024,
        
        // Allowed file types for uploads
        allowedTypes: [
          // Images
          'image/jpeg',
          'image/jpg', 
          'image/png',
          'image/webp',
          'image/gif',
          'image/svg+xml',
          
          // Documents (if needed)
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          
          // Videos (if needed)
          'video/mp4',
          'video/webm',
          'video/ogg',
        ],
        
        // File name sanitization
        sanitizeFilename: true,
        
        // Additional security options
        breakpoints: {
          xlarge: 1920,
          large: 1000,
          medium: 750,
          small: 500,
          xsmall: 64
        },
        
        // Enable responsive formats
        responsiveDimensions: true,
        
        // Quality settings for image optimization
        quality: 80,
        
        // Progressive JPEG
        progressive: true,
      },
      
      // Provider configuration (local by default)
      provider: 'local',
      providerOptions: {
        sizeLimit: 10 * 1024 * 1024, // 10MB
      },
    },
  },
  
  // Optional: Configure other plugins here
  // Example: Email provider, etc.
});

export default config;
