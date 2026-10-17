---
title: Getting Started
description: Add the VRCTools package repository to your package manager and install packages into a world project.
nav_exclude: true
---

## Requirements

- A VRChat **world** project (optimally managed by the [VRChat Creator Companion][vcc] (VCC) or a compatible package manager such
  as [ALCOM][alcom] or [vrc-get][vrc-get])
- Unity **{{ site.unity_version }}** (the version currently used by the VRChat SDK)
- VRChat Worlds SDK **3.7.0** or newer

## Add the package repository

All public VRCTools packages are published through a single VPM repository:

```text
{{ site.vpm_url }}
```

The quickest way is to let your browser hand the repository over to Creator Companion:

<p><a class="btn" href="vcc://vpm/addRepo?url={{ site.vpm_url | uri_escape }}">+ Add to VCC</a></p>

If the button does nothing (for example because VCC is not installed or the link handler is not registered):

1. Open Creator Companion and go to **Settings**
2. Select the **Packages** tab
3. Click **Add Repository**
4. Paste `{{ site.vpm_url }}` and click **Add**
5. Review the repository information and confirm with **I Understand, Add Repository**

Using the command line instead? With [vrc-get][vrc-get]:

```shell
$ vrc-get repo add {{ site.vpm_url }}
$ vrc-get install io.vrctools.world
```

## Install a package

Open your world project in Creator Companion, choose **Manage Project** and add the package you need, for example
**VRCTools - World Utilities**. Dependencies (such as the [Event System]({{ '/docs/event/' | relative_url }}) and the VRCTools
common library) are resolved and installed automatically.

> Pre-built `.unitypackage` files are also attached to each release on [GitHub](https://github.com/VRCTools). Manual
> installation does **not** install dependencies - you will need to import every required package yourself and keep
> them up to date.
{: .warning }

## Where to find things

Installed packages show up under the `Packages` section of Unity's project window, prefixed with `VRCTools -`
(for example `VRCTools - World Utilities`). On disk the folder is named after the package id (e.g.
`Packages/io.vrctools.world`). Every package follows the same layout:

```text
VRCTools - <package name>
├── Editor/                   custom inspectors, editor windows & menus
├── Runtime/
│   ├── Materials/            materials for 3D objects and UI elements
│   ├── Prefabs/              ready to use component setups
│   ├── Shaders/              shaders (where applicable)
│   ├── Textures/             UI textures, default & error images
│   ├── UdonScripts/          UdonSharp behaviours
│   └── VRCTools.<name>.asmdef
├── Samples/                  example scenes and assets
└── LICENSE
```

> The fastest way to learn a package is usually its sample scene. For World Utilities, open
> `Packages/VRCTools - World Utilities/Samples/Example.unity`.
{: .tip }

## Getting help

Stuck, found a bug or have an idea? Join the **[VRCTools Discord]({{ site.discord_url }})** - it's the place for
support, questions and feedback. Please read the [server rules]({{ site.baseurl }}/docs/project/discord-rules/) first. Bugs in a specific package can also be reported as an issue on its GitHub repository.

<p><a class="btn btn-ghost" href="{{ site.discord_url }}">discord --join</a></p>

## Next steps

<ul class="cards">
  <li><a href="{{ '/docs/world-utils/' | relative_url }}"><strong>World Utilities</strong><span>Values, converters, applicators and UI for your world.</span></a></li>
  <li><a href="{{ '/docs/world-utils/concepts/values/' | relative_url }}"><strong>Concepts: Values</strong><span>The building block every other component is wired to.</span></a></li>
  <li><a href="{{ '/docs/world-utils/guides/settings-menu/' | relative_url }}"><strong>Guide: Settings menu</strong><span>Build a world settings panel in ten minutes.</span></a></li>
</ul>

[vcc]: https://vcc.docs.vrchat.com/
[alcom]: https://vrc-get.anatawa12.com/alcom/
[vrc-get]: https://github.com/vrc-get/vrc-get
