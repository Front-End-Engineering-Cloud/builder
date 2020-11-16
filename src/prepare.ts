/**
 * @file prepare behaviors
 * @author nighca <nighca@live.cn>
 */

import * as semver from 'semver'
import logger from './utils/logger'
import { findBuildConfig } from './utils/build-conf'

const packageInfo = require('../package.json')

export default async function prepare(){
  const buildConfig = await findBuildConfig()
  const builderVersionRange = buildConfig.engines && buildConfig.engines.builder
  if (typeof builderVersionRange === 'string') {
    const builderVersion = packageInfo.version as string
    if (!semver.satisfies(builderVersion, builderVersionRange)) {
      logger.warn(`builder version not satisfied, which may causes error (expected \`${builderVersionRange}\`, got \`${builderVersion}\`)`)
    }
  }
}