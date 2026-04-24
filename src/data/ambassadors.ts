export type Ambassador = {
  id: string;
  name: string;
  bio: string;
  /** Instagram username without @ */
  instagram: string;
  /** Replace with a PNG/WebP cutout on transparent background when you have assets */
  image: string;
  achievemnets: string[]
  instaUrl: string
};

export const ambassadors: Ambassador[] = [
  {
    id: 'Haitham-sadiq',
    name: 'Haitham sadiq',
    bio: 'NPC Pro qualifier — Georgia Ahmed Ali Diamond Cup',
    instagram: '@haithamsadiq',
    instaUrl: 'https://www.instagram.com/haithamsadiq?igsh=MTA4MzgwbnJ0NjM4cQ==',
    image: '/ambassadors/haitham-sadiq-2.png',
    achievemnets: [
      "1-Mr Olympia Las Vegas classic physique final",
      "2- 2times mr Olympia amateur",
      "Fiji pro",
      "Mr word",
      "Mr Oman"
    ]
  },
  {
    id: 'ifbb-pro-muneer',
    name: 'Ifbb pro muneer',
    bio: '2022 Toronto Pro — 4th place',
    instagram: '@ifbbpro_muneer',
    instaUrl: 'https://www.instagram.com/ifbbpro_muneer?igsh=cHd6YmgxbmRvaHRq',
    image: '/ambassadors/Ifbb-pro-muneer-2.png',
    achievemnets: ['Ifbb pro card holder', '1 in Saudi pro']
  },
  {
    id: 'ifbb-pro-abbas-alari',
    name: 'Ifbb pro Abbas alari iran',
    bio: '2022 Toronto Pro — 4th place',
    instagram: '',
    instaUrl: 'https://www.instagram.com/abassalariii_?igsh=MWRiMHdnY21nbHZxeQ==',
    image: '/ambassadors/ifbb-pro-abbas-alari-iran.png',
    achievemnets: ['Mr iran gold', 'Mr world overall']
  },
];
