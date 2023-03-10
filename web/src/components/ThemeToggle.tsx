import React, { useState, useEffect } from 'react';

import { ReactComponent as MoonIcon } from '../assets/svg/moon.svg';
import { ReactComponent as SunIcon } from '../assets/svg/sun.svg';

const updateTheme = (isDarkEnabled: boolean) => {
  const styles = getComputedStyle(document.body);
  const black = styles.getPropertyValue('--black');
  const white = styles.getPropertyValue('--white');
  const docEl = document.documentElement;

  if (isDarkEnabled) {
    docEl.style.setProperty('--background', black);
    docEl.style.setProperty('--foreground', white);
    document.querySelector('html')?.classList.add('darkmode');
  } else {
    docEl.style.setProperty('--background', white);
    docEl.style.setProperty('--foreground', black);
    document.querySelector('html')?.classList.remove('darkmode');
  }
};

export default function ThemeToggle() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    updateTheme(isEnabled);
  }, [isEnabled]);

  const toggleState = () => {
    setIsEnabled((prevState) => !prevState);
  };

  return (
    <label className="toggle-wrapper" htmlFor="toggle">
      <div className={`toggle ${isEnabled ? 'enabled' : 'disabled'}`}>
        <span className="hidden">{isEnabled ? 'Enable Light Mode' : 'Enable Dark Mode'}</span>
        <div className="icons">
          <SunIcon />
          <MoonIcon />
        </div>
        <input id="toggle" name="toggle" type="checkbox" checked={isEnabled} onClick={toggleState} />
      </div>
    </label>
  );
}
