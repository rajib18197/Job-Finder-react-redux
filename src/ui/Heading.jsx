export default function Heading({ as, children }) {
  let Type;
  if (as === "h1") Type = "h1";
  if (as === "h2") Type = "h2";
  if (as === "h3") Type = "h3";
  if (as === "h4") Type = "h4";

  return <Type className="lws-section-title">{children}</Type>;
}
