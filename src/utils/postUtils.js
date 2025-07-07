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

  // Start fetching with global timeout protection
  const fetchPromise = performPostFetch(slug);
  fetchingPosts.set(slug, fetchPromise);
  
  // Add global timeout protection for serverless environment
  const globalTimeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Global timeout')), 2000); // 2 second global timeout
  });
  
  try {
    const result = await Promise.race([fetchPromise, globalTimeoutPromise]);
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
      timeout: 500, // 500ms timeout for serverless
      headers: {
        'Cache-Control': 'max-age=300'
      }
    }
  );

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('API timeout')), 400); // 400ms timeout
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

export async function fetchPosts(limit = 10) {
  console.log(`Fetching ${limit} posts from WordPress.com API`);
  
  // Create a race between API call and timeout
  const apiPromise = axios.get(
    `${WORDPRESS_API_BASE}/posts`,
    {
      timeout: 500, // 500ms timeout for serverless
      params: {
        number: limit,
        fields: 'ID,slug,title,excerpt,content,date,modified,author,featured_image'
      }
    }
  );

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('API timeout')), 400); // 400ms timeout
  });

  try {
    const { data: rawPosts } = await Promise.race([apiPromise, timeoutPromise]);

    if (rawPosts && rawPosts.posts) {
      // Convert WordPress.com API response to our format
      const posts = rawPosts.posts.map((post) => ({
        id: post.ID,
        slug: post.slug,
        title: {
          rendered: post.title || ''
        },
        excerpt: {
          rendered: post.excerpt || ''
        },
        content: {
          rendered: post.content || ''
        },
        date: post.date,
        modified: post.modified,
        author: post.author?.ID || 1,
        featured_media: post.featured_image ? 1 : 0,
        _embedded: post.featured_image ? {
          'wp:featuredmedia': [{
            id: 1,
            source_url: post.featured_image,
            alt_text: post.title || ''
          }]
        } : null
      }));

      console.log(`Successfully fetched ${posts.length} posts from WordPress.com API`);
      return posts;
    } else {
      console.log("No posts found, returning empty array");
      return [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    console.log("Returning empty array due to error");
    return [];
  }
} 