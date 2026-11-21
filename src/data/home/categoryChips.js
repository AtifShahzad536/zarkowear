import { FaFootballBall, FaBasketballBall, FaRunning, FaHatCowboy, FaShoppingBag } from 'react-icons/fa';
import { MdSportsHockey, MdSportsRugby } from 'react-icons/md';
import { GiCricketBat, GiTennisRacket, GiWeightLiftingUp, GiRunningShoe, GiGloves } from 'react-icons/gi';

export const categoryChips = [
  { to: '/custom-football-uniforms', label: 'Football', Icon: FaFootballBall, tagline: 'Club & academy kits' },
  { to: '/custom-cricket-uniforms', label: 'Cricket', Icon: GiCricketBat, tagline: 'Match + training wear' },
  { to: '/custom-basketball-uniforms', label: 'Basketball', Icon: FaBasketballBall, tagline: 'Court-ready sets' },
  { to: '/custom-wrestling-singlets', label: 'Wrestling', Icon: FaRunning, tagline: 'Singlets & gear' },
  { to: '/custom-ice-hockey-uniforms', label: 'Hockey', Icon: MdSportsHockey, tagline: 'Ice & field apparel' },
  { to: '/custom-rugby-uniforms', label: 'Rugby', Icon: MdSportsRugby, tagline: 'Contact proof kits' },
  { to: '/custom-tennis-apparel', label: 'Tennis', Icon: GiTennisRacket, tagline: 'Court performance' },
  { to: '/custom-running-apparel', label: 'Running', Icon: FaRunning, tagline: 'Lightweight layers' },
  { to: '/custom-gym-fitness-wear', label: 'Gym', Icon: GiWeightLiftingUp, tagline: 'Training essentials' },
  { to: '/shoes', label: 'Shoes', Icon: GiRunningShoe, tagline: 'Traction & support' },
  { to: '/gloves', label: 'Gloves', Icon: GiGloves, tagline: 'Grip & protection' },
  { to: '/caps', label: 'Caps', Icon: FaHatCowboy, tagline: 'Team headwear' },
  { to: '/bags', label: 'Bags', Icon: FaShoppingBag, tagline: 'Travel-ready packs' },
];
