import { checkName, render, selectFeature } from "../utils/init";

export default async function init(name: string): Promise<void> {
  let { projectPath } = checkName(name);
  const feature = await selectFeature();

  render(projectPath, feature);
}
