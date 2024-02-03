export interface Evidence {
  _id?: string;
  caseId: string;
  locationFound: string;
  type: string;
  description: string;
  foundOn: string;
  foundBy: string;
  collectedBy: string;
  collectedOn: string;
  createdAt: string;
  __v?: number;
}
