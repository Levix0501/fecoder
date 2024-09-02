import { ReactNode } from 'react';
import ImageUploader from './_components/image-uploader';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <ImageUploader />
      {children}
    </div>
  );
};

export default Layout;
