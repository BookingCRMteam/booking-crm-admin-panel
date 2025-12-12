export type IOperator = {
  id: number;
  userId: number;

  createdAt: string;
  updatedAt: string;

  firstName: string;
  lastName: string;

  email: string;
  website: string;
  phone: string;

  status: "approved" | "rejected" | "pending";
  rejectionReason: string | null;

  companyName?: string;
  description?: string;
  philosophy?: string;
  photo?: string;
};
