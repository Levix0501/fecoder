import '@/styles/404.css';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <main className="h-screen relative text-center">
      <Image
        src="/404/bg_purple.png"
        fill
        alt=""
        sizes="100vw"
        className="object-cover"
        priority
      />
      <Image
        src="/404/overlay_stars.svg"
        fill
        alt=""
        sizes="100vw"
        className="object-cover"
      />
      <div className="objects">
        <Image
          className="object_rocket"
          src="/404/rocket.svg"
          width={40}
          height={40}
          alt=""
        />
        <div className="earth-moon">
          <Image
            className="object_earth"
            src="/404/earth.svg"
            width={100}
            height={100}
            alt=""
          />
          <Image
            className="object_moon"
            src="/404/moon.svg"
            width={80}
            height={80}
            alt=""
          />
        </div>
        <div className="box_astronaut">
          <Image
            className="object_astronaut"
            src="/404/astronaut.svg"
            width={140}
            height={140}
            alt=""
          />
        </div>
      </div>
      <div className="glowing_stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>

      <div className="central-body flex flex-col items-center">
        <Image
          className="image-404"
          src="/404/404.svg"
          width={300}
          height={300}
          alt=""
        />
        <Link href="/" className="btn-go-home">
          返回首页
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
