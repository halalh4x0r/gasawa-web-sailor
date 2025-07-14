# Gasawa Shipping - HTML/CSS/JS Version

## Setup Instructions

1. **Create a folder structure:**
   ```
   your-project/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── videos/
   │   └── your-video.mp4
   └── README-HTML.md
   ```

2. **Add your background video:**
   - Create a `videos` folder in the same directory as your HTML file
   - Put your video file in the `videos` folder
   - Update the video source in `index.html` line 31:
   ```html
   <source src="videos/your-video-name.mp4" type="video/mp4">
   ```

3. **Supported video formats:**
   - MP4 (recommended)
   - WebM
   - OGV

4. **Video recommendations:**
   - Keep file size under 50MB for better loading
   - Use 1920x1080 or similar resolution
   - Compress for web use

## Features

- Responsive design
- Mobile navigation
- Smooth scrolling
- Contact form
- Video background with fallback
- Scroll animations
- Modern CSS animations

## To run:
Simply open `index.html` in your web browser.

## Video Fallback
If the video fails to load, the background will automatically switch to a blue gradient.