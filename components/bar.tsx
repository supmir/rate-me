export default function Bar(props: {
  statName: string;
  self: number;
  average: number;
}) {
  const { statName, self, average } = props;
  const values = Array.from(Array(10).keys());

  return (
    <div className="grid gap-y-1">
      <div className="mx-auto">{statName}</div>
      <div className="flex gap-x-1 grow my-auto">
        {values.map((v, i) => {
          return (
            <div
              key={i}
              className={`h-8 border border-neutral-100 grow${
                i < average ? " bg-neutral-100" : ""
              }`}
            ></div>
          );
        })}
        <div className="w-12">{average}/10</div>
      </div>
      <div className="flex gap-x-1 grow my-auto">
        {values.map((v, i) => {
          return (
            <div
              key={i}
              className={`h-8 border border-neutral-100 grow${
                i < self ? " bg-neutral-100" : ""
              }`}
            ></div>
          );
        })}
        <div className="w-12">{self}/10</div>
      </div>
    </div>
  );
}
