import * as myCluster from "./myCluster.mdx";
import * as clusterApps from "./developingClusterApps.mdx";
import * as terraformModules from "./terraformModules.mdx";
import * as gitDescribe from "./gitDescribe.mdx";
import * as crossCompile from "./rustCrossCompile.mdx";
import * as updateDiscord from "./discordAutoUpdate.mdx";

/**
 * This is where posts can be published or unpublished. All posts in the array
 * below are published.
 */
export const allPosts = [
  crossCompile,
  updateDiscord,
  terraformModules,
  gitDescribe,
  myCluster,
  clusterApps,
];
