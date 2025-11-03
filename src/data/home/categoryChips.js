import { FaFootballBall, FaBasketballBall, FaRunning, FaHatCowboy, FaShoppingBag } from 'react-icons/fa';
import { MdSportsHockey, MdSportsRugby } from 'react-icons/md';
import { GiCricketBat, GiTennisRacket, GiWeightLiftingUp, GiRunningShoe, GiGloves } from 'react-icons/gi';

export const categoryChips = [
  { to: '/football', label: 'Football', Icon: FaFootballBall, tagline: 'Club & academy kits' },
  { to: '/cricket', label: 'Cricket', Icon: GiCricketBat, tagline: 'Match + training wear' },
  { to: '/basketball', label: 'Basketball', Icon: FaBasketballBall, tagline: 'Court-ready sets' },
  { to: '/wrestling', label: 'Wrestling', Icon: FaRunning, tagline: 'Singlets & gear' },
  { to: '/hockey', label: 'Hockey', Icon: MdSportsHockey, tagline: 'Ice & field apparel' },
  { to: '/rugby', label: 'Rugby', Icon: MdSportsRugby, tagline: 'Contact proof kits' },
  { to: '/tennis', label: 'Tennis', Icon: GiTennisRacket, tagline: 'Court performance' },
  { to: '/running', label: 'Running', Icon: FaRunning, tagline: 'Lightweight layers' },
  { to: '/gym', label: 'Gym', Icon: GiWeightLiftingUp, tagline: 'Training essentials' },
  { to: '/shoes', label: 'Shoes', Icon: GiRunningShoe, tagline: 'Traction & support' },
  { to: '/gloves', label: 'Gloves', Icon: GiGloves, tagline: 'Grip & protection' },
  { to: '/caps', label: 'Caps', Icon: FaHatCowboy, tagline: 'Team headwear' },
  { to: '/bags', label: 'Bags', Icon: FaShoppingBag, tagline: 'Travel-ready packs' },
];
