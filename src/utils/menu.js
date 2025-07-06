import axios from 'axios';

/**
 * @typedef {Object} MenuItem
 * @property {number} id
 * @property {string} title
 * @property {string} url
 * @property {string} slug
 * @property {number} parent
 * @property {number} order
 */

// Static menu items as provided by the user
const staticMenuItems = [
  {
    id: 1,
    title: 'Home',
    url: '/',
    slug: 'home',
    parent: 0,
    order: 1
  },
  {
    id: 2,
    title: 'Chi Siamo',
    url: '/chi-siamo/',
    slug: 'chi-siamo',
    parent: 0,
    order: 2
  },
  {
    id: 3,
    title: 'I Nostri Corsi',
    url: '/i-nostri-corsi/',
    slug: 'i-nostri-corsi',
    parent: 0,
    order: 3
  },
  {
    id: 4,
    title: 'Workshop ed Eventi',
    url: '/workshop-ed-eventi/',
    slug: 'workshop-ed-eventi',
    parent: 0,
    order: 4
  },
  {
    id: 5,
    title: 'Gli Spazi',
    url: '/gli-spazi/',
    slug: 'gli-spazi',
    parent: 0,
    order: 5
  },
  {
    id: 6,
    title: 'Contatti',
    url: '/contatti/',
    slug: 'contatti',
    parent: 0,
    order: 6
  },
  {
    id: 7,
    title: 'News',
    url: '/news/',
    slug: 'news',
    parent: 0,
    order: 7
  }
];

/**
 * Fetch menu from WordPress.com API
 * @returns {Promise<Array>}
 */
export async function fetchMenuFromWordPress() {
  // For now, we'll use static menu items since WordPress.com pages API might not be available
  // In the future, this could be enhanced to fetch from WordPress.com API if needed
  console.log('Using static menu items');
  return staticMenuItems;
}

/**
 * Build hierarchical menu structure
 * @param {Array} menuItems
 * @returns {Array}
 */
export function buildMenuHierarchy(menuItems) {
  const menuMap = new Map();
  const rootItems = [];

  // Create a map of all items
  menuItems.forEach(item => {
    menuMap.set(item.id, { ...item, children: [] });
  });

  // Build hierarchy
  menuItems.forEach(item => {
    if (item.parent === 0) {
      rootItems.push(menuMap.get(item.id));
    } else {
      const parent = menuMap.get(item.parent);
      if (parent) {
        parent.children.push(menuMap.get(item.id));
      }
    }
  });

  return rootItems;
} 