import { IOperator } from "@interfaces/operators";

export const getOperatorDetails = (operator: IOperator) => {
  const fullName = `${operator.firstName} ${operator.lastName}`;
  return [
    { label: "ID", value: operator.id ?? "-" },
    { label: "Повне ім'я", value: fullName },
    { label: "Компанія", value: operator.companyName ?? "-" },
    { label: "Опис", value: operator.description ?? "-" },
    { label: "Філософія", value: operator.philosophy ?? "-" },
  ];
};

export const getOperatorContacts = (operator: IOperator) => {
  return [
    { label: "Телефон", href: `tel:${operator.phone}`, value: operator.phone },
    { label: "Email", href: `mailto:${operator.email}`, value: operator.email },
    { label: "Вебсайт", href: operator.website, value: operator.website },
  ];
};
