import { Button, TextInput } from "flowbite-react";
import type React from "react";
import { HiSearch } from "react-icons/hi";

const SearchInput: React.FC = () => {
  return (
    <div className="relative group">
      <TextInput
        id="search"
        type="text"
        placeholder="검색.."
        required
        className="pr-10"
      />
      <Button
        type="submit"
        className="absolute inset-y-0 right-0 z-10 flex items-center p-2"
      >
        <HiSearch className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchInput;
