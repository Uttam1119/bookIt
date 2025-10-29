export type Slot = {
  date: string;
  slotId: string;
  time: string;
  capacity: number;
};

export type Experience = {
  _id?: string;
  id?: string;
  title: string;
  location?: string;
  description?: string;
  price: number;
  image?: string;
  slots: Slot[];
};
