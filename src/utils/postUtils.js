import axios from 'axios';
import { WORDPRESS_API_BASE } from '../config/wordpress.js';

// In-memory cache for individual posts
const postCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Flag to prevent multiple simultaneous API calls for the same slug
const fetchingPosts = new Map();

export async function fetchPost(slug) {
  // Check if we have valid cached data
  const cached = postCache.get(slug);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log(`Using cached post data for: ${slug}`);
    return cached.data;
  }

  // If already fetching this slug, wait for the existing promise
  if (fetchingPosts.has(slug)) {
    console.log(`Waiting for existing fetch to complete for: ${slug}`);
    return await fetchingPosts.get(slug);
  }

  // Start fetching with immediate fallback option
  const fetchPromise = performPostFetch(slug);
  fetchingPosts.set(slug, fetchPromise);
  
  try {
    const result = await fetchPromise;
    return result;
  } catch (error) {
    console.error(`Failed to fetch post ${slug}, throwing error for 404 redirect`);
    throw error; // Re-throw to trigger 404 redirect
  } finally {
    fetchingPosts.delete(slug);
  }
}

async function performPostFetch(slug) {
  console.log(`Fetching post with slug: ${slug}`);
  
  // Create a race between API call and timeout
  const apiPromise = axios.get(
    `${WORDPRESS_API_BASE}/posts/slug:${slug}`,
    {
      timeout: 1000, // 1 second timeout
      headers: {
        'Cache-Control': 'max-age=300'
      }
    }
  );

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('API timeout')), 800); // 800ms timeout
  });

  try {
    const { data: rawPost } = await Promise.race([apiPromise, timeoutPromise]);

    if (rawPost) {
      const postData = {
        ID: rawPost.ID,
        title: rawPost.title || "",
        content: rawPost.content || "",
        excerpt: rawPost.excerpt || "",
        date: rawPost.date,
        modified: rawPost.modified,
        slug: rawPost.slug,
        featured_image: rawPost.featured_image ?? "",
        type: "post",
        parent: rawPost.parent,
      };

      // Cache the result
      postCache.set(slug, {
        data: postData,
        timestamp: Date.now()
      });

      console.log(`Successfully fetched post with slug ${slug} from WordPress.com API`);
      return postData;
    } else {
      throw new Error('Post not found');
    }
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error.message);
    throw error; // Re-throw to let the calling code handle 404 redirects
  }
}

export function clearPostCache() {
  postCache.clear();
}

export function getCachedPost(slug) {
  const cached = postCache.get(slug);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }
  return null;
} 