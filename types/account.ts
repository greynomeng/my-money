export interface Account {
  _id: string;
  accNo: string;
  name: string;
  owner: string;
  type: string;
  openingBalanceCents: number;
  currentBalanceCents: number;
}
