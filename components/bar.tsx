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
        <div className="w-12 text-left my-auto text-xs">Self</div>
        {values.map((v, i) => {
          return (
            <div
              key={i}
              className={`h-4 my-auto border border-neutral-100 grow${
                i < self ? " bg-neutral-100" : ""
              }`}
            ></div>
          );
        })}
        <div className="w-12 text-right my-auto text-xs">
          {self.toFixed(1)}/10
        </div>
      </div>
      <div className="flex gap-x-1 grow my-auto">
        <div className="w-12 text-left my-auto text-xs">Others</div>
        {values.map((v, i) => {
          return (
            <div
              key={i}
              className={`h-4 my-auto border border-neutral-100 grow${
                i < average ? " bg-neutral-100" : ""
              }`}
            ></div>
          );
        })}
        <div className="w-12 text-right my-auto text-xs">
          {average.toFixed(1)}/10
        </div>
      </div>
    </div>
  );
}
