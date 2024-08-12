import CardLink from '@/components/card-link/card-link';
import { NAV_DATA } from '@/content/nav';
import Image from 'next/image';

const NavPage = () => {
  return (
    <main className="container">
      {NAV_DATA.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {section.items.map((item) => (
              <CardLink
                key={item.link}
                href={item.link}
                target="_blank"
                className="p-6"
              >
                <div className="flex">
                  {/* {item.icon && (
                    <img src={item.icon} alt="" width={20} height={20} />
                  )} */}
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
        </section>
      ))}
    </main>
  );
};

export default NavPage;
