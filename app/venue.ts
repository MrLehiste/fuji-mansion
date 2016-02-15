export interface Venue {
  id: string;
  name: string;
  formattedAddress?: string;
  icon?: string;
  bestPhoto?: string;
  canonicalUrl?: string;
  rating?: string;
  ratingColor?: string;
  ratingSignals?: string;
}

/*
export class Venue {
  constructor(
    public id: string,
    public name: string,
    public formattedAddress: string,
    public icon: string,
    public bestPhoto: string
  ){}
}
*/