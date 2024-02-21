interface Props {
  title: string;
  query: string;
  category: string;
}

const Header = ({ title, query, category }: Props) => {
  if(query && category) {
    return (
      <h1 className="self-start text-white heading2">
        Search results for "{query}" in <span className="capitalize">{category}</span>
      </h1>
    )
  }

  if(query) {
    return (
      <h1 className="self-start text-white heading2">
        Search results for "{query}"
      </h1>
    )
  }

  if(category) {
    return (
      <span className="capitalize">{category}</span>
    )
  }

  return (
    <h1 className="self-start text-white heading2">No Results</h1>
  )
}

export default Header