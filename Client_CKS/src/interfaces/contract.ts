export default interface Contract {
  contractNumber: string;
  mcasNumber: string;
  cif: string;
  fullName: string;
  email: string;
  mobile: string;
  identityNumber: string;
  authChannel: string;
  status: string;
  lastUpdated: string; // hoặc Date nếu bạn muốn parse về Date
  actions: string[];
}
