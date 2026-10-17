---
title: Float Math
layout: component
description: Adds, subtracts, multiplies or divides two float inputs and writes the result into a float value.
nav_order: 40
since: 0.7.0
kinds: [local, synchronized, persisted]
keywords: [math, add, subtract, multiply, divide, scale, arithmetic]
components:
  - name: Float Math Converter
    class: VRCTools.World.Values.Converters.FloatMathConverter
    menu: Values/Converters/Float Math Converter
    file: Runtime/UdonScripts/Values/Converters/FloatMathConverter.cs
---

Computes `A <operation> B` whenever A or B change. Typical uses are scaling a slider into a different range,
combining a global and a personal multiplier, or offsetting one value by another.

## Operations

| Operation  | Result   |
|------------|----------|
| `ADD`      | `A + B`  |
| `SUBTRACT` | `A - B`  |
| `MULTIPLY` | `A * B`  |
| `DIVIDE`   | `A / B`  |

## Parameters

| Section | Parameter | Default  | Description                                                     |
|---------|-----------|----------|-----------------------------------------------------------------|
| Target  | Type      | `LOCAL`  | Kind of the target value.                                       |
|         | Target    | *None*   | Float value receiving the result. **Required.**                 |
| Math    | Operation | `ADD`    | The operation to perform.                                       |
| A       | Type      | `STATIC` | `STATIC`, `LOCAL` or `SYNCHRONIZED`.                            |
|         | Value     | `1`      | The constant (static) or float value providing A.               |
| B       | Type      | `STATIC` | `STATIC`, `LOCAL` or `SYNCHRONIZED`.                            |
|         | Value     | `1`      | The constant (static) or float value providing B.               |

The inspector shows the resulting formula below the operation so you can double-check the setup at a glance.

> Dividing by zero produces `Infinity` (or `NaN` for `0 / 0`). If B can reach zero, restrict its value or make sure the
> consumer can handle it.
{: .warning }

## Usage

*Master volume × music volume:* create a `Synchronized Float` for the instance owner's master volume and a
`Persisted Float` for each player's music volume. Multiply both into a `Local Float` and hand that to your audio
script. The target value's restrictions still apply, so you can clamp the result there.
