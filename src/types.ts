export interface IDCardData {
  fullName: string;
  role: string;
  idNumber: string;
  issueDate: string;
  expiryDate: string;
  bloodType: string;
  height: string;
  clearance: string; // Used for Favorite Kink
  grade: string; // New Grade field
  photoUrl: string | null;
  department: string;
  status: 'Owned' | 'Unowned';
  // Reverse side fields
  cupSize: string;
  tattoos: string;
  piercings: string;
  hypnoTrigger1: string;
  hypnoTrigger2: string;
  certification: string;
  orgasmDenial: string;
  favoriteToy: string;
  iqValue: string;
  bodyMods: string;
  bodyCount: string;
  vaginalGrade: string;
  analGrade: string;
  oralGrade: string;
  breastGrade: string;
  lactation: string;
  orgasmCount: string;
  sirsServed: string;
  safeword: string;
  kinks: string;
  personality: string;
  breastPhotoUrl: string | null;
  buttPhotoUrl: string | null;
  holesPhotoUrl: string | null;
  posePhotoUrl: string | null;
  photoPosition: { x: number; y: number; zoom: number };
  breastPhotoPosition: { x: number; y: number; zoom: number };
  buttPhotoPosition: { x: number; y: number; zoom: number };
  holesPhotoPosition: { x: number; y: number; zoom: number };
  posePhotoPosition: { x: number; y: number; zoom: number };
  enabledBackFields: {
    cupSize: boolean;
    tattoos: boolean;
    piercings: boolean;
    hypnoTrigger1: boolean;
    hypnoTrigger2: boolean;
    certification: boolean;
    orgasmDenial: boolean;
    favoriteToy: boolean;
    iqValue: boolean;
    bodyMods: boolean;
    bodyCount: boolean;
    vaginalGrade: boolean;
    analGrade: boolean;
    oralGrade: boolean;
    breastGrade: boolean;
    lactation: boolean;
    orgasmCount: boolean;
    sirsServed: boolean;
    safeword: boolean;
    kinks: boolean;
    personality: boolean;
  };
}

export const INITIAL_DATA: IDCardData = {
  fullName: 'Jane Doe',
  role: 'CUMSLUT',
  idNumber: 'Blue',
  issueDate: '2026.02.14',
  expiryDate: '2027.02.14',
  bloodType: '21',
  height: '172 CM',
  clearance: 'Brainwashing',
  grade: 'A-',
  photoUrl: null,
  department: 'Blonde',
  status: 'Owned',
  // Reverse side defaults
  cupSize: 'DD',
  tattoos: 'Spank Me',
  piercings: 'Both Nipples',
  hypnoTrigger1: 'Toy, Kneel',
  hypnoTrigger2: 'Toy, Edge',
  certification: 'Good Girl Academy',
  orgasmDenial: '365 Days',
  favoriteToy: 'Remote Vibrator',
  iqValue: '85',
  bodyMods: 'Breast Implants',
  bodyCount: '20',
  vaginalGrade: 'Wet',
  analGrade: 'Tight',
  oralGrade: 'Sloppy',
  breastGrade: 'Perky',
  lactation: 'True',
  orgasmCount: '0',
  sirsServed: '12',
  safeword: 'Eggplant',
  kinks: 'Denial, Hypno, Breeding',
  personality: 'INTJ',
  breastPhotoUrl: null,
  buttPhotoUrl: null,
  holesPhotoUrl: null,
  posePhotoUrl: null,
  photoPosition: { x: 50, y: 50, zoom: 1 },
  breastPhotoPosition: { x: 50, y: 50, zoom: 1 },
  buttPhotoPosition: { x: 50, y: 50, zoom: 1 },
  holesPhotoPosition: { x: 50, y: 50, zoom: 1 },
  posePhotoPosition: { x: 50, y: 50, zoom: 1 },
  enabledBackFields: {
    cupSize: true,
    tattoos: true,
    piercings: true,
    hypnoTrigger1: true,
    hypnoTrigger2: true,
    certification: true,
    orgasmDenial: true,
    favoriteToy: true,
    iqValue: true,
    bodyMods: true,
    bodyCount: true,
    vaginalGrade: true,
    analGrade: true,
    oralGrade: true,
    breastGrade: true,
    lactation: true,
    orgasmCount: true,
    sirsServed: true,
    safeword: true,
    kinks: true,
    personality: true,
  },
};
