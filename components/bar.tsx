export default function Bar(props: { statName: string; value: number }) {
  const { statName, value } = props;
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
                i < value ? " bg-neutral-100" : ""
              }`}
            ></div>
          );
        })}
        <div>{value}/10</div>
      </div>
    </div>
  );
}
