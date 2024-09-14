"use client";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

export const QueryAdmin = () => {
  //fetch multiple queries
  const queries = api.useQueries((t) => [t.user.getUserSession()]);

  return (
    <div className="grid grid-cols-1 gap-4">
      {queries.map((query, id) => (
        <div className="overflow-auto border-4 border-violet-400 p-3" key={id}>
          <h1>Query {id}</h1>
          <p className="whitespace-pre">{JSON.stringify(query.data, null, 2)}</p>
        </div>
      ))}
    </div>
  );
};
export const QueryPeserta = () => {
  //fetch multiple queries
  const queries = api.useQueries((t) => [t.user.getUserSession(), t.tugasPeserta.getLeaderboardData()]);

  return (
    <div className="grid grid-cols-1 gap-4">
      {queries.map((query, id) => (
        <div className="overflow-auto border-4 border-violet-400 p-3" key={id}>
          <h1>Query {id}</h1>
          <p className="whitespace-pre">{JSON.stringify(query.data, null, 2)}</p>
        </div>
      ))}
    </div>
  );
};
