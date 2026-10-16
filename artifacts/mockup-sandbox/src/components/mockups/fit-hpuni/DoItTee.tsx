import { BoardShell } from "./_shared/BoardShell";
import { BoardBody, C } from "./_shared/doit";

export function DoItTee() {
  return <BoardShell code="B" concept="do IT" garment="Áo thun" accent={C.ink}><BoardBody /></BoardShell>;
}
