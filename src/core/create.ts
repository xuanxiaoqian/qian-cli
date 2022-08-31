import { createModule, selectModule } from "../utils/create";

export default async function create(moduleName: string): Promise<void> {
  const moduleStr = await selectModule();

  createModule(moduleStr, moduleName);
}
