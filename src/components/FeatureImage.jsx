import './FeatureImage.css';

// Helper function to decode HTML entities (server-side compatible)
const decodeHtmlEntities = (text) => {
  if (typeof text !== 'string') return text;
  
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '…')
    .replace(/&nbsp;/g, ' ');
};

const FeatureImage = ({ imageUrl, title, fallbackImage = '/il-dedalo_mg_3323.jpg' }) => {
  const imageSrc = imageUrl || fallbackImage;
  const decodedTitle = decodeHtmlEntities(title);
  
  return (
    <div className="feature-image-container">
      <div 
        className="feature-image"
        style={{
          backgroundImage: `url(${imageSrc})`
        }}
      >
        <div className="feature-image-overlay">
          <div className="feature-image-content">
            <h1 className="feature-title">{decodedTitle}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureImage; 