import { useEffect, useState } from "react";

interface Repo {
  name: string;
  description: string;
}

export function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/diego3g/repos")
      .then((response) => response.json())
      .then((data) => setRepos(data));
  }, []);

  const filteredRepos =
    search.length > 0 ? repos.filter((repo) => repo.name.includes(search)) : [];

  return (
    <div>
      <input
        name="search"
        type="text"
        placeholder="Buscar..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      {search.length > 0 ? (
        <ul>
          {filteredRepos.map((repo) => (
            <li key={repo.name}>{repo.name}</li>
          ))}
        </ul>
      ) : (
        <ul>
          {repos.map((repo) => (
            <li key={repo.name}>{repo.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
