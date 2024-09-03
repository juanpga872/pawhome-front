import React from 'react';
import styles from '@/app/styles/HeroSection.module.css'; // Ajusta la ruta según sea necesario

export const HeroSection: React.FC = () => {  // Asegúrate de definir el tipo del componente
  return (
    <div className={styles['hero-section']}>
      <div className={styles['hero-text']}>
        <h1>You can make a difference in their lives</h1>
        <button>Adopt a pet</button>
      </div>
    </div>
  );
};



