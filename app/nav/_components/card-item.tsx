import CardLink from '@/components/card-link/card-link';
import { NavItem } from '@/content/nav';
import Image from 'next/image';

export interface NavItemsProps {
  items: NavItem[];
}

const NavItems = ({ items }: NavItemsProps) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <CardLink
          key={item.title}
          href={item.link}
          target="_blank"
          className="p-6"
        >
          <div className="flex items-center space-x-2">
            {item.icon && (
              <Image src={`/nav/${item.icon}`} alt="" width={32} height={32} />
            )}
            <h3 className="text-[#0074de] text-lg font-medium group-hover:text-[var(--ds-gray-1000)]">
              {item.title}
            </h3>
          </div>
          <p className="text-sm text-[var(--ds-gray-900)] font-normal">
            {item.desc}
          </p>
        </CardLink>
      ))}
    </div>
  );
};

export default NavItems;
