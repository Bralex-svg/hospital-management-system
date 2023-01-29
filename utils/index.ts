import { v4 } from "uuid";

export function generateId() {
  const idParts = v4().toString().split("-");
  let id = "";
  idParts.forEach((i) => {
    id += i;
  });

  return id;
}
