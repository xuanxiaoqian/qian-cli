import { checkName, render, selectFeature, Tips } from "../utils/init";

export default async function init(name: string): Promise<void> {
  let { projectPath,isCwd } = checkName(name);
  
  const feature = await selectFeature();

  await render(projectPath, feature);

  Tips(name,isCwd);
  
}
