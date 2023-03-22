import test from "ava";
import { spacesRegex } from "../src/utils";

test("spacesRegex", (t) => {
  const sample = "super username with spaces";

  t.true(spacesRegex.test(sample));
});
