import React from "react";
import { ProgressBarWrapper, Progress, ProgressLabel } from "./styles.ts";

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, color, label }) => {
  return (
    <ProgressBarWrapper>
      <Progress $value={value} $color={color} />
      <ProgressLabel>{label ?? `${value}%`}</ProgressLabel>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
