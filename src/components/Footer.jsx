import React from 'react';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem 0', background: '#f5f5f5' }}>
      <p>&copy; {new Date().getFullYear()} ArtifexAI. All rights reserved.</p>
    </footer>
  );
};

export default Footer;