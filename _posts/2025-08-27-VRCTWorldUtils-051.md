---
title: "VRCTWorldUtils v0.5.1"
version: 0.5.1
package: world-utils
tags: [VRCTWorldUtils]

---

🔧 Changed
- Dependencies are now declared as version ranges (`com.vrchat.worlds` `^3.7.0`, `io.vrctools.event` `^0.1.0`) instead of exact versions

🐞 Fixed
- Creator Companion did not resolve the package's dependencies, as they were declared as `dependencies` instead of `vpmDependencies`
