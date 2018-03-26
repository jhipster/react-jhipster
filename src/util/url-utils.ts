/**
 * Get base path from current window location
 */
export const getBasePath = (): string => window.location.href.split('#')[0];

/**
 * Parse the header link element and return all links inside.
 * @param header header of link
 */
export const parse = (header: string): any => {
  if (header.length === 0) {
    throw new Error('input must not be of zero length');
  }

  // Split parts by comma
  const parts: string[] = header.split(',');
  const links: any = {};

  // Parse each part into a named link
  parts.forEach(p => {
    const section: string[] = p.split(';');

    if (section.length !== 2) {
      throw new Error('section could not be split on ";"');
    }

    const url: string = section[0].replace(/<(.*)>/, '$1').trim();
    const queryString: any = {};

    url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => (queryString[$1] = $3));

    let page: any = queryString.page;

    if (typeof page === 'string') {
      page = parseInt(page, 10);
    }

    const name: string = section[1].replace(/rel="(.*)"/, '$1').trim();
    links[name] = page;
  });
  return links;
};
