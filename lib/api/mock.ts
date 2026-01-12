import MockAdapter from "axios-mock-adapter";
import api from "./client";
import { v4 as uuidv4 } from "uuid";

type Entry = {
  id: string;
  title?: string;
  content?: string;
  metadata?: Record<string, unknown>;
};

// In-memory store keyed by `${frameworkSlug}::${grandchildId}`
const store = new Map<string, Entry[]>();

function key(frameworkSlug: string, grandchildId: string) {
  return `${frameworkSlug}::${grandchildId}`;
}

function ensure(frameworkSlug: string, grandchildId: string) {
  const k = key(frameworkSlug, grandchildId);
  if (!store.has(k)) {
    // seed with a couple of items
    store.set(k, [
      { id: uuidv4(), title: "Example item 1", content: "Seeded item" },
      { id: uuidv4(), title: "Example item 2", content: "Seeded item" },
    ]);
  }
  return store.get(k)!;
}

export default function setupMock() {
  const mock = new MockAdapter(api, { delayResponse: 150 });

  // List entries
  mock.onGet(new RegExp(`/frameworks/.+/grandchildren/.+/entries$`)).reply((cfg) => {
    const m = cfg.url?.match(/\/frameworks\/(.+?)\/grandchildren\/(.+?)\/entries$/);
    if (!m) return [400, { message: "bad request" }];
    const frameworkSlug = decodeURIComponent(m[1]);
    const grandchildId = decodeURIComponent(m[2]);
    const items = ensure(frameworkSlug, grandchildId);
    return [200, items];
  });

  // Create entry
  mock.onPost(new RegExp(`/frameworks/.+/grandchildren/.+/entries$`)).reply((cfg) => {
    const m = cfg.url?.match(/\/frameworks\/(.+?)\/grandchildren\/(.+?)\/entries$/);
    if (!m) return [400, { message: "bad request" }];
    const frameworkSlug = decodeURIComponent(m[1]);
    const grandchildId = decodeURIComponent(m[2]);
    const items = ensure(frameworkSlug, grandchildId);
    let payload: any = {};
    try { payload = JSON.parse(cfg.data || "{}"); } catch (e) {}
    const entry: Entry = { id: uuidv4(), title: payload.title || "New item", content: payload.content || "" , metadata: payload.metadata };
    items.unshift(entry);
    return [201, entry];
  });

  // Update entry
  mock.onPut(new RegExp(`/grandchild-entries/.+$`)).reply((cfg) => {
    const m = cfg.url?.match(/\/grandchild-entries\/(.+)$/);
    if (!m) return [400, { message: "bad request" }];
    const id = decodeURIComponent(m[1]);
    let payload: any = {};
    try { payload = JSON.parse(cfg.data || "{}"); } catch (e) {}
    let found = false;
    for (const items of store.values()) {
      const idx = items.findIndex((it) => it.id === id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...payload };
        found = true;
        return [200, items[idx]];
      }
    }
    return [404, { message: "not found" }];
  });

  // Delete entry
  mock.onDelete(new RegExp(`/grandchild-entries/.+$`)).reply((cfg) => {
    const m = cfg.url?.match(/\/grandchild-entries\/(.+)$/);
    if (!m) return [400, { message: "bad request" }];
    const id = decodeURIComponent(m[1]);
    for (const [k, items] of store.entries()) {
      const idx = items.findIndex((it) => it.id === id);
      if (idx !== -1) {
        items.splice(idx, 1);
        store.set(k, items);
        return [204];
      }
    }
    return [404, { message: "not found" }];
  });

  // Reorder
  mock.onPost(`/grandchild-entries/reorder`).reply((cfg) => {
    let body: any = {};
    try { body = JSON.parse(cfg.data || "{}"); } catch (e) {}
    const { frameworkSlug, grandchildId, orderedIds } = body || {};
    if (!frameworkSlug || !grandchildId || !Array.isArray(orderedIds)) return [400, { message: "bad request" }];
    const items = ensure(frameworkSlug, grandchildId);
    const next = orderedIds.map((id: string) => items.find((it) => it.id === id)).filter(Boolean) as Entry[];
    store.set(key(frameworkSlug, grandchildId), next);
    return [200, next];
  });

  return mock;
}
