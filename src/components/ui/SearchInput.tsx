import { TextInput } from "flowbite-react";
import type React from "react";
import { useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchInput: React.FC = () => {
  const [searchParam] = useSearchParams();
  const initialKeyword = searchParam.get("keyword") || "";
  const [inputValue, setInputValue] = useState<string>(initialKeyword);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const keyword = inputValue.trim();
    const newSearchParams = new URLSearchParams();

    if (keyword) {
      newSearchParams.set("keyword", keyword);
    }

    navigate(`/posts?${newSearchParams.toString()}`);
    setInputValue("");

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="relative group">
        <TextInput
          id="search"
          type="text"
          placeholder="검색.."
          required
          className="pr-10"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rightIcon={HiSearch}
          ref={inputRef}
        />
      </div>
    </form>
  );
};

export default SearchInput;
