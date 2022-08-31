import { checkName, render, selectFeature, Tips } from "../utils/init";

export default async function init(name: string): Promise<void> {
  let { projectPath,isCwd } = checkName(name);

  console.log(projectPath);
  
  const feature = await selectFeature();

  render(projectPath, feature);

  Tips(name,isCwd);
}
