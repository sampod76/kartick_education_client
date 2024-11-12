'use client';
import Image from 'next/image';
import { useState } from 'react';
import styles from './HoverBook.module.css';

const HoverBook = ({ text, image }: { text: string; image: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.book}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className="ml-11 text-sm">{text}</p>
      <div className={`${styles.cover} ${hovered ? styles.coverHover : ''}`}>
        <Image
          className="h-full w-full rounded-xl"
          src={image}
          alt={text}
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default HoverBook;
