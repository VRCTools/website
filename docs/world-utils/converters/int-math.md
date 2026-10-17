---
title: Int Math
layout: component
description: Adds, subtracts, multiplies, divides or takes the remainder of two int inputs.
nav_order: 50
since: 0.7.0
kinds: [local, synchronized, persisted]
keywords: [math, add, subtract, multiply, divide, modulo, remainder, arithmetic]
components:
  - name: Int Math Converter
    class: VRCTools.World.Values.Converters.IntMathConverter
    menu: Values/Converters/Int Math Converter
    file: Runtime/UdonScripts/Values/Converters/IntMathConverter.cs
---

The integer counterpart of [Float Math]({{ site.baseurl }}/docs/world-utils/converters/float-math/). Computes
`A <operation> B` whenever A or B change.

## Operations

| Operation  | Result   | Notes                                                      |
|------------|----------|------------------------------------------------------------|
| `ADD`      | `A + B`  |                                                            |
| `SUBTRACT` | `A - B`  |                                                            |
| `MULTIPLY` | `A * B`  |                                                            |
| `DIVIDE`   | `A / B`  | Integer division, rounds towards zero (`7 / 2 = 3`).       |
| `REM`      | `A % B`  | Remainder of the division (`7 % 2 = 1`), sign follows A.   |

## Parameters

| Section | Parameter | Default  | Description                                                     |
|---------|-----------|----------|-----------------------------------------------------------------|
| Target  | Type      | `LOCAL`  | Kind of the target value.                                       |
|         | Target    | *None*   | Int value receiving the result. **Required.**                   |
| Math    | Operation | `ADD`    | The operation to perform.                                       |
| A       | Type      | `STATIC` | `STATIC`, `LOCAL` or `SYNCHRONIZED`.                            |
|         | Value     | `1`      | The constant (static) or int value providing A.                 |
| B       | Type      | `STATIC` | `STATIC`, `LOCAL` or `SYNCHRONIZED`.                            |
|         | Value     | `1`      | The constant (static) or int value providing B.                 |

> Integer division or remainder by zero throws an exception, which halts the Udon behaviour. Never let B reach zero
> for `DIVIDE` and `REM` - restrict the source value's minimum to `1`.
{: .warning }

## Usage

`REM` is great for cycling: feed a counter that is incremented by a "next" button into `REM` with a static B of `5`
and the result loops through `0, 1, 2, 3, 4, 0, ...` - ready to select one of five options.
