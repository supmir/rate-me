import Navbar from "./navbar";

export default function Layout(props: any) {
  return (
    <div className="grid gap-y-2">
      <Navbar />
      <div className="w-full max-w-2xl mx-auto p-2">{props.children}</div>
    </div>
  );
}
