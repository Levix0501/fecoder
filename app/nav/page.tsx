import CardLink from '@/components/card-link/card-link';
import { NAV_DATA } from '@/content/nav';

const NavPage = () => {
  return (
    <main className="container">
      {NAV_DATA.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {section.items.map((item) => (
              <CardLink key={item.link} href={item.link} target="_blank">
                <h3>{item.title}</h3>
                <p className="text-sm text-gray-900 font-normal">{item.desc}</p>
              </CardLink>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default NavPage;
