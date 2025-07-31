import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  noindex?: boolean;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'IPV4Bazaar',
  description = 'Your trusted partner for comprehensive intellectual property management services.',
  noindex = false,
  keywords = 'IP management, IP addresses, network management',
}) => {
  const siteTitle = `${title} | IPV4Bazaar`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  );
};

export default SEO;
