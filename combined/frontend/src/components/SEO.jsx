import { Helmet } from 'react-helmet-async';

function SEO({ title, description, keywords, url, image }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}

export default SEO;