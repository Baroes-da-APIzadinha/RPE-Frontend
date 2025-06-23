import React from "react";
import { FiSearch } from "react-icons/fi";
import * as S from "./styles.ts";

interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput: React.FC<SearchInputProps> = ({ ...props }) => {
  return (
    <S.Container>
      <FiSearch size={20} />
      <S.Input {...props} />
    </S.Container>
  );
};
