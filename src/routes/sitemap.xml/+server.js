// src/routes/sitemap.xml/+server.js

export async function GET() {
	// Here, we'll just use a static list of URLs for demonstration.
	// In a real application, you might fetch these from a database or other source.
	const urls = ['/', '/contact', '/faq', '/signup', '/login'];

	const urlElements = urls
		.map((url) => {
			return `
            <url>
                <loc>${new URL(url, 'https://www.byteplanter.com').href}</loc>
                <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
                <priority>0.85</priority>
            </url>
        `;
		})
		.join('');

	const sitemap = `
        <?xml version="1.0" encoding="UTF-8" ?>
        <urlset
            xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="https://www.w3.org/1999/xhtml"
            xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
            xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
            xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
            xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
        >
            ${urlElements}
        </urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
