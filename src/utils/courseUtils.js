import axios from 'axios';
import { WORDPRESS_API_BASE } from '../config/wordpress.js';
import { cleanTextInArray } from './htmlUtils.js';

// In-memory cache for the current function instance
let subpagesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Flag to prevent multiple simultaneous API calls
let isFetching = false;
let fetchPromise = null;

// Static fallback data for courses
const STATIC_COURSES = [
  {
    id: 141,
    title: "Wildflowers",
    excerpt: "",
    slug: "wildflowers",
    featured_image: "",
    date: "2022-02-19T19:52:34+01:00",
    modified: "2025-07-03T15:42:37+02:00"
  },
  {
    id: 147,
    title: "Pilates Matwork",
    excerpt: "",
    slug: "pilates-matwork",
    featured_image: "",
    date: "2022-02-19T21:50:35+01:00",
    modified: "2025-07-02T17:40:12+02:00"
  },
  {
    id: 150,
    title: "Vinyasa Yoga",
    excerpt: "",
    slug: "vinyasa-yoga",
    featured_image: "",
    date: "2022-02-19T21:51:20+01:00",
    modified: "2025-07-02T17:38:48+02:00"
  },
  {
    id: 152,
    title: "Hata Yoga",
    excerpt: "",
    slug: "hata-yoga",
    featured_image: "",
    date: "2022-02-19T21:52:15+01:00",
    modified: "2025-07-02T17:38:24+02:00"
  },
  {
    id: 370,
    title: "Anukalana Yoga Inspired",
    excerpt: "",
    slug: "anukalana",
    featured_image: "",
    date: "2022-09-08T18:54:48+02:00",
    modified: "2025-07-02T17:53:38+02:00"
  },
  {
    id: 448,
    title: "Yoga Dolce",
    excerpt: "",
    slug: "yoga-dolce",
    featured_image: "",
    date: "2022-09-19T17:04:25+02:00",
    modified: "2024-07-18T16:08:25+02:00"
  },
  {
    id: 1076,
    title: "Incanti – Laboratorio Corale",
    excerpt: "",
    slug: "incanti-laboratorio-corale",
    featured_image: "",
    date: "2024-07-17T16:20:08+02:00",
    modified: "2025-07-02T18:29:14+02:00"
  },
  {
    id: 1406,
    title: "Una Tribù che canta!",
    excerpt: "",
    slug: "una-tribu-che-canta",
    featured_image: "",
    date: "2025-04-29T19:00:27+02:00",
    modified: "2025-04-29T19:02:04+02:00"
  }
];

export async function fetchSubpages() {
  // Check if we have valid cached data
  if (subpagesCache && cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
    console.log("Using cached subpages data");
    return subpagesCache;
  }

  // If already fetching, wait for the existing promise
  if (isFetching && fetchPromise) {
    console.log("Waiting for existing fetch to complete...");
    return await fetchPromise;
  }

  // Start fetching
  isFetching = true;
  fetchPromise = performFetch();
  
  try {
    const result = await fetchPromise;
    return result;
  } finally {
    isFetching = false;
    fetchPromise = null;
  }
}

async function performFetch() {
  console.log("Fetching subpages with parent_id=33...");
  
  // Create a race between API call and timeout
  const apiPromise = axios.get(
    `${WORDPRESS_API_BASE}/posts/?type=page&parent_id=33&per_page=20`,
    {
      timeout: 2000, // 2 second timeout for faster fallback
      headers: {
        'Cache-Control': 'max-age=300'
      }
    }
  );

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('API timeout')), 1500); // 1.5 second timeout
  });

  try {
    const { data: subpagesResponse } = await Promise.race([apiPromise, timeoutPromise]);

    if (subpagesResponse && subpagesResponse.posts) {
      const processedSubpages = cleanTextInArray(
        subpagesResponse.posts
          .map((page) => ({
            id: page.ID,
            title: page.title || "",
            excerpt: page.excerpt || "",
            slug: page.slug,
            featured_image: page.featured_image || "",
            date: page.date || "",
            modified: page.modified || "",
          }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      );

      // Cache the result
      subpagesCache = processedSubpages;
      cacheTimestamp = Date.now();

      console.log(`Found ${processedSubpages.length} subpages with parent_id=33`);
      
      // Only log details in development
      if (import.meta.env.DEV) {
        processedSubpages.forEach((page) => {
          console.log(`- ${page.title} (ID: ${page.id}, Slug: ${page.slug})`);
        });
      }

      return processedSubpages;
    } else {
      console.log("No subpages found with parent_id=33, using static fallback");
      return STATIC_COURSES;
    }
  } catch (error) {
    console.error("Error fetching subpages:", error.message);
    console.log("Using static fallback data");
    return STATIC_COURSES;
  }
}

export function getStaticCourses() {
  return STATIC_COURSES;
} 