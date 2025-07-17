import React from "react";
import { FiSearch } from "react-icons/fi";
import * as S from "./styles.ts";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  "aria-label"?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ id, ...props }) => {
  return (
    <S.Container>
      <FiSearch size={20} />
      <S.Input id={id} aria-label={props["aria-label"]} {...props} />
    </S.Container>
  );
};
