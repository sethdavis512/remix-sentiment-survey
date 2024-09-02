import * as RadioGroup from "@radix-ui/react-radio-group";
import {
  AngryIcon,
  FrownIcon,
  LaughIcon,
  MehIcon,
  SmileIcon,
} from "lucide-react";
import { SentimentType } from "@prisma/client";
import { getUniqueId } from "~/utils/general";

export default function SentimentGroup({
  ariaLabel,
  name,
}: {
  ariaLabel: string;
  name: string;
}) {
  const radioItemProps = {
    className: "",
  };

  const indicatorProps = {
    className:
      "flex items-center justify-center w-full h-full relative after:block after:h-4 after:w-4 after:rounded-full after:bg-green-500",
  };

  const randomVeryNegativeID = getUniqueId("veryNegativeRadio");
  const randomNegativeID = getUniqueId("negativeRadio");
  const randomNeutralID = getUniqueId("neutralRadio");
  const randomPositiveID = getUniqueId("posititveRadio");
  const randomVeryPositiveID = getUniqueId("veryPositiveRadio");

  return (
    <RadioGroup.Root
      aria-label={ariaLabel}
      className="flex gap-4"
      name={name}
      // defaultValue={SentimentType.NEUTRAL}
    >
      <div>
        <RadioGroup.Item
          id={randomVeryNegativeID}
          value={SentimentType.VERY_NEGATIVE}
          {...radioItemProps}
        >
          <RadioGroup.Indicator {...indicatorProps} />
        </RadioGroup.Item>
        <label htmlFor={randomVeryNegativeID}>
          <AngryIcon />
          {"Very negative"}
        </label>
      </div>
      <div>
        <RadioGroup.Item
          id={randomNegativeID}
          value={SentimentType.NEGATIVE}
          {...radioItemProps}
        >
          <RadioGroup.Indicator {...indicatorProps} />
        </RadioGroup.Item>
        <label htmlFor={randomNegativeID}>
          <FrownIcon />
          {"Negative"}
        </label>
      </div>
      <div>
        <RadioGroup.Item
          id={randomNeutralID}
          value={SentimentType.NEUTRAL}
          {...radioItemProps}
        >
          <RadioGroup.Indicator {...indicatorProps} />
        </RadioGroup.Item>
        <label htmlFor={randomNeutralID}>
          <MehIcon />
          {"Neutral"}
        </label>
      </div>
      <div>
        <RadioGroup.Item
          id={randomPositiveID}
          value={SentimentType.POSITIVE}
          {...radioItemProps}
        >
          <RadioGroup.Indicator {...indicatorProps} />
        </RadioGroup.Item>
        <label htmlFor={randomPositiveID}>
          <SmileIcon />
          {"Positive"}
        </label>
      </div>
      <div>
        <RadioGroup.Item
          id={randomVeryPositiveID}
          value={SentimentType.VERY_POSITIVE}
          {...radioItemProps}
        >
          <RadioGroup.Indicator {...indicatorProps} />
        </RadioGroup.Item>
        <label htmlFor={randomVeryPositiveID}>
          <LaughIcon />
          {"Very positive"}
        </label>
      </div>
    </RadioGroup.Root>
  );
}
