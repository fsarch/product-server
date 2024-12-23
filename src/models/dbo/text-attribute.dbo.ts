import { AttributeDbo } from "./attribute.dbo.js";

export class TextAttributeDbo extends AttributeDbo {
  minLength: number;

  maxLength: number;
}
