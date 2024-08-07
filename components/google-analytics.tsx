import { GoogleAnalytics as _GoogleAnalytics } from '@next/third-parties/google';

export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

const GoogleAnalytics = () => {
  return (
    process.env.NODE_ENV === 'production' &&
    GTM_ID && <_GoogleAnalytics gaId={GTM_ID} />
  );
};

export default GoogleAnalytics;
