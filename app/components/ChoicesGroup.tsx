import { RadioCards } from "@radix-ui/themes";

interface ChoicesGroupItem {
  id: string;
  label: string;
  value: string;
}

interface ChoicesGroupProps {
  ariaLabel: string;
  choices: ChoicesGroupItem[];
  name: string;
  defaultValue?: string;
}

export default function ChoicesGroup({
  ariaLabel,
  choices,
  defaultValue,
  name,
}: ChoicesGroupProps) {
  return (
    <RadioCards.Root
      aria-label={ariaLabel}
      name={name}
      defaultValue={defaultValue}
      columns={{ initial: "1", sm: "8" }}
    >
      {choices
        .map((choice) => {
          return (
            <RadioCards.Item key={choice.id} id={choice.id} value={choice.id}>
              {choice.label}
            </RadioCards.Item>
          );
        })
        .reverse()}
    </RadioCards.Root>
  );
}
