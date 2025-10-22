import React from 'react';

export const TreeOfLifeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 150"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.5"
    {...props}
  >
    {/* Sefirot (Circles) */}
    <circle cx="50" cy="10" r="5" /> {/* Keter */}
    <circle cx="30" cy="30" r="5" /> {/* Chokmah */}
    <circle cx="70" cy="30" r="5" /> {/* Binah */}
    <circle cx="30" cy="60" r="5" /> {/* Chesed */}
    <circle cx="70" cy="60" r="5" /> {/* Geburah */}
    <circle cx="50" cy="80" r="5" /> {/* Tiferet */}
    <circle cx="30" cy="100" r="5" /> {/* Netzach */}
    <circle cx="70" cy="100" r="5" /> {/* Hod */}
    <circle cx="50" cy="120" r="5" /> {/* Yesod */}
    <circle cx="50" cy="140" r="5" /> {/* Malkuth */}

    {/* Paths */}
    <line x1="50" y1="15" x2="50" y2="75" /> {/* Keter -> Tiferet */}
    <line x1="30" y1="35" x2="30" y2="55" /> {/* Chokmah -> Chesed */}
    <line x1="70" y1="35" x2="70" y2="55" /> {/* Binah -> Geburah */}
    <line x1="30" y1="65" x2="30" y2="95" /> {/* Chesed -> Netzach */}
    <line x1="70" y1="65" x2="70" y2="95" /> {/* Geburah -> Hod */}
    <line x1="50" y1="85" x2="50" y2="115" /> {/* Tiferet -> Yesod */}
    <line x1="50" y1="125" x2="50" y2="135" /> {/* Yesod -> Malkuth */}

    {/* Horizontal & Diagonal Paths */}
    <line x1="35" y1="30" x2="65" y2="30" /> {/* Chokmah -> Binah */}
    <line x1="35" y1="60" x2="65" y2="60" /> {/* Chesed -> Geburah */}
    <line x1="35" y1="100" x2="65" y2="100" /> {/* Netzach -> Hod */}

    <line x1="50" y1="15" x2="35" y2="28" /> {/* Keter -> Chokmah */}
    <line x1="50" y1="15" x2="65" y2="28" /> {/* Keter -> Binah */}

    <line x1="30" y1="35" x2="48" y2="75" /> {/* Chokmah -> Tiferet */}
    <line x1="70" y1="35" x2="52" y2="75" /> {/* Binah -> Tiferet */}
    
    <line x1="30" y1="35" x2="65" y2="58" /> {/* Chokmah -> Geburah */}
    <line x1="70" y1="35" x2="35" y2="58" /> {/* Binah -> Chesed */}

    <line x1="30" y1="65" x2="48" y2="75" /> {/* Chesed -> Tiferet */}
    <line x1="70" y1="65" x2="52" y2="75" /> {/* Geburah -> Tiferet */}

    <line x1="30" y1="105" x2="48" y2="115" /> {/* Netzach -> Yesod */}
    <line x1="70" y1="105" x2="52" y2="115" /> {/* Hod -> Yesod */}

    <line x1="30" y1="105" x2="65" y2="100" /> {/* Netzach -> Hod */}
    <line x1="30" y1="65" x2="65" y2="98" /> {/* Chesed -> Hod */}
    <line x1="70" y1="65" x2="35" y2="98" /> {/* Geburah -> Netzach */}

    <line x1="30" y1="105" x2="48" y2="85" /> {/* Netzach -> Tiferet */}
    <line x1="70" y1="105" x2="52" y2="85" /> {/* Hod -> Tiferet */}
  </svg>
);
