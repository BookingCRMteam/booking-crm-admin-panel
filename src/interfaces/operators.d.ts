export type IOperator = {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  companyName: string;
  description: string;
  firstName: string;
  lastName: string;
  website: string;
  phone: string;
  status: "approved" | "rejected" | "pending";
  philosophy: string;
  photo: string;
  rejectionReason: string;
};
