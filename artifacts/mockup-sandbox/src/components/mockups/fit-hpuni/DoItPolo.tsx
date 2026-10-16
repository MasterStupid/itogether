import { BoardShell } from "./_shared/BoardShell";
import { BoardBody, C } from "./_shared/doit";

export function DoItPolo() {
  return <BoardShell code="B" concept="do IT" garment="Áo polo" accent={C.ink}><BoardBody polo /></BoardShell>;
}
