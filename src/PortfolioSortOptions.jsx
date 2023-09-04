import './PortfolioSortOptions.css';

export default function PortfolioSortOptions({
  language,
  languages,
  sortOption,
  sortOptions,
  changeRequestParams,
}) {
  return (
    <div id="PortfolioSortOptions">
      <select
        value={language}
        onChange={(event) => {
          changeRequestParams({ language: event.target.value });
        }}
      >
        <option value="all">All Languages</option>
        {languages.map((language, i) => {
          return (
            <option
              key={i}
              value={language.slug}
            >{`${language.name} (${language.project_count})`}</option>
          );
        })}
      </select>

      <select
        value={sortOption}
        onChange={(event) => {
          changeRequestParams(sortOptions[+event.target.value]);
        }}
      >
        <option value="0">Newest first</option>
        <option value="1">Oldest first</option>
        <option value="2">Alphabetical A-Z</option>
        <option value="3">Alphabetical Z-A</option>
      </select>
    </div>
  );
}
