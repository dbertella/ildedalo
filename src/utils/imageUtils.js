import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Helper to download images
export async function downloadImage(url, localPath) {
  try {
    const writer = fs.createWriteStream(localPath);
    const response = await axios.get(url, { responseType: 'stream' });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve());
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Failed to download image:', url, error);
    throw error;
  }
}

// Helper to process images in content
export async function processImagesInContent(content) {
  // In serverless environment, don't try to download images
  // Just return the content as-is to avoid filesystem errors
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    console.log('Skipping image processing in serverless environment');
    return content;
  }
  
  const imgRegex = /<img[^>]+src=["']([^"'>]+)["'][^>]*>/g;
  let match;
  let newContent = content;
  
  while ((match = imgRegex.exec(content)) !== null) {
    const imgUrl = match[1];
    const imgName = path.basename(imgUrl.split('?')[0]);
    const localPath = path.join(process.cwd(), 'public', imgName);
    const publicPath = `/${imgName}`;
    
    // Download if not already present
    if (!fs.existsSync(localPath)) {
      try {
        await downloadImage(imgUrl, localPath);
        console.log(`Downloaded image: ${imgName}`);
      } catch (e) {
        console.error('Failed to download image:', imgUrl, e);
      }
    }
    
    // Replace src in content
    newContent = newContent.replace(new RegExp(imgUrl, 'g'), publicPath);
  }
  
  return newContent;
} 