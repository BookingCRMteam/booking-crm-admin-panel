import type { IOperator } from "./operators";

export type ITour = {
  id: number;
  operatorId: number;
  title: string;
  description: string;
  countryISO2Code: string;
  cityId: number;
  type: string;
  price: string;
  currency: string;
  startDate: string;
  endDate: string;
  availableSpots: number;
  conditions: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  photos: {
    id: number;
    tourId: number;
    url: string;
    isMain: boolean;
    description: string;
  }[];
  operator: IOperator;
  country: {
    id: number;
    iso2: string;
    iso3: string;
    translations: {
      id: number;
      countryIso2: string;
      languageCode: string;
      name: string;
    }[];
  };
  city: {
    id: number;
    countryIso2: string;
    translations: {
      id: number;
      cityId: number;
      languageCode: string;
      name: string;
    }[];
  };
};
