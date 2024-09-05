export const defaultCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

const getRandomChar = (chars: string) =>
  chars.charAt(Math.floor(Math.random() * chars.length));

export default function getUniqueId(
  prefix = "my-prefix",
  length = 8,
  characters = defaultCharacters,
) {
  const hash = [...Array(length)].map(() => getRandomChar(characters)).join("");

  return `${prefix ? `${prefix}-` : ""}${hash}}`;
}
