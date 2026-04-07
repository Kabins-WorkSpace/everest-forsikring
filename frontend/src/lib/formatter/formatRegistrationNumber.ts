export const formatRegistrationNumber = (value: string) => {
  const cleaned = value.replace(/[^a-zA-Z0-9]/g, "");

  const letters = cleaned.slice(0, 2).toUpperCase();
  const numbers = cleaned.slice(2, 7);

  if (numbers.length > 0) {
    return `${letters} ${numbers}`;
  }

  return letters;
};

export const cleanRegistrationNumber = (value: string) => {
  return value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
};
