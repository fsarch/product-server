import { AttributeDbo } from "./attribute.dbo.js";

export class NumberAttributeDbo extends AttributeDbo {
  minValue: number;

  maxValue: number;

  decimals: number;
}
