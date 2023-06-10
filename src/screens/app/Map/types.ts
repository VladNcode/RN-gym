interface GymInfo {
  name: string;
  description: string;
  info: string;
  address: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  latitude: number;
  longitude: number;
}

export type { GymInfo };
