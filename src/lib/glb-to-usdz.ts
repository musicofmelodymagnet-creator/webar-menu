// Client-side only — dynamically imported so Three.js doesn't land in the main bundle.
export async function convertGlbToUsdz(glbFile: File): Promise<ArrayBuffer | null> {
  try {
    const [{ GLTFLoader }, { USDZExporter }] = await Promise.all([
      import("three/examples/jsm/loaders/GLTFLoader.js"),
      import("three/examples/jsm/exporters/USDZExporter.js"),
    ]);

    const buffer = await glbFile.arrayBuffer();

    const gltf = await new Promise<{ scene: import("three").Object3D }>(
      (resolve, reject) => {
        const loader = new GLTFLoader();
        loader.parse(buffer, "", resolve as never, reject);
      }
    );

    const exporter = new USDZExporter();
    const result = await exporter.parseAsync(gltf.scene);

    // Copy into a plain ArrayBuffer so it's accepted by the File constructor.
    const ab = new ArrayBuffer(result.byteLength);
    new Uint8Array(ab).set(result);
    return ab;
  } catch (err) {
    console.warn("[USDZ] Conversion failed — iOS Quick Look AR unavailable:", err);
    return null;
  }
}
