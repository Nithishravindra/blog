import React from 'react';
import classes from '../styles/home.module.css';

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerText}>
        <p>
          © Copyright 2020 <a href="https://nithishravindra.com">Nithish R</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
