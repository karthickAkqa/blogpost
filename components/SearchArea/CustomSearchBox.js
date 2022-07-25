import { connectSearchBox } from "react-instantsearch-dom";

function SearchBox({ refine }) {
  return (
    <form action="" role="search">
      <input
        id="articles"
        type="search"
        placeholder="Search articles"
        onChange={(e) => refine(e.currentTarget.value)}
      />
    </form>
  );
}

export default connectSearchBox(SearchBox);