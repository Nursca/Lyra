import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { serviceOrigin } from "../src/origin.js";

const previous = process.env.LYRA_ORIGIN;

afterEach(() => {
  if (previous === undefined) delete process.env.LYRA_ORIGIN;
  else process.env.LYRA_ORIGIN = previous;
});

test("service origin prefers the listening server over the binding", () => {
  process.env.LYRA_ORIGIN = "https://server.internal/";
  assert.equal(serviceOrigin("http://127.0.0.1:9999"), "http://127.0.0.1:9999");
});

test("service origin uses the self binding when the process is not listening", () => {
  process.env.LYRA_ORIGIN = "https://server.internal/";
  assert.equal(serviceOrigin(undefined), "https://server.internal");
  assert.equal(serviceOrigin(""), "https://server.internal");
});

test("service origin falls back to the local API when no binding is set", () => {
  delete process.env.LYRA_ORIGIN;
  const port = process.env.PORT;
  delete process.env.PORT;
  try {
    assert.equal(serviceOrigin(undefined), "http://127.0.0.1:4020");
  } finally {
    if (port === undefined) delete process.env.PORT;
    else process.env.PORT = port;
  }
});
