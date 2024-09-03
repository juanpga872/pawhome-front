// Header.tsx
"use client"
import { useState } from 'react';
import styles from '@/app/styles/Header.module.css';
import React from 'react';
import Link from 'next/link';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">Home</Link>
        </div>
        <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
          <li>
            <Link href="/adopt-a-pet">Adopt a pet</Link>
          </li>
          <li>
            <Link href="/how-it-works">How it works</Link>
          </li>
          <li>
            <Link href="/help-us">Help us</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <span className={styles.hamburgerIcon}>&#9776;</span>
        </div>
      </nav>
    </header>
  );
};
