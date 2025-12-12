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

const ALLOWED_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];

/**
 * Санітизує URL, дозволяючи лише безпечні протоколи.
 * @param url - Вхідна URL-адреса.
 * @returns Безпечний URL або null/undefined, якщо він недійсний.
 */
const sanitizeHref = (url: string | undefined): string | undefined => {
  if (!url) {
    return undefined;
  }

  try {
    const urlObject = new URL(url);

    if (ALLOWED_PROTOCOLS.includes(urlObject.protocol)) {
      return url;
    }
  } catch (e) {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
  }

  return undefined;
};

export const getOperatorContacts = (operator: IOperator) => {
  const websiteHref = sanitizeHref(operator.website);

  return [
    {
      label: "Телефон",
      href: operator.phone ? `tel:${operator.phone}` : undefined,
      value: operator.phone || undefined,
      id: 1,
    },
    {
      label: "Email",
      href: operator.email ? `mailto:${operator.email}` : undefined,
      value: operator.email || undefined,
      id: 2,
    },
    {
      label: "Вебсайт",
      href: websiteHref || undefined,
      value: operator.website,
      id: 3,
    },
  ];
};
