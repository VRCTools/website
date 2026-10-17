---
title: Boolean Operation
layout: component
description: Combines one or two boolean values using NOT, AND, OR, XOR, NAND, NOR or XNOR.
nav_order: 10
since: 0.3.0
kinds: [local, synchronized, persisted]
keywords: [and, or, not, xor, logic, gate]
components:
  - name: Boolean Operation Converter
    class: VRCTools.World.Values.Converters.BooleanOperationConverter
    menu: Values/Converters/Boolean Operation Converter
    prefab: Values/Converters/Boolean Operation.prefab
    file: Runtime/UdonScripts/Values/Converters/BooleanOperationConverter.cs
redirect_from:
  - /packages/world-utils/components/value/converters/boolean-operation.html
---

Evaluates a logical operation on two inputs **A** and **B** and writes the result into a target boolean whenever
either input changes.

## Operations

| Operation | Result            | `true` when ...                      |
|-----------|-------------------|--------------------------------------|
| `NOT`     | `!A`              | A is false (B is ignored)            |
| `AND`     | `A && B`          | both are true                        |
| `OR`      | `A \|\| B`        | at least one is true                 |
| `XOR`     | `A ^ B`           | exactly one is true                  |
| `NAND`    | `!(A && B)`       | not both are true                    |
| `NOR`     | `!(A \|\| B)`     | both are false                       |
| `XNOR`    | `!(A ^ B)`        | both are equal                       |

> In v0.7.0 `NAND` is evaluated like `NOR` (`true` only when both inputs are false). Until this is fixed, build a
> NAND from an `AND` converter followed by a `NOT` converter.
{: .danger }

## Parameters

| Section | Parameter  | Default  | Description                                                                 |
|---------|------------|----------|-----------------------------------------------------------------------------|
| Target  | Type       | `LOCAL`  | Kind of the target value.                                                   |
|         | Target     | *None*   | Boolean value receiving the result. **Required.**                           |
|         | Operation  | `NOT`    | The operation to evaluate.                                                  |
| A       | Type       | `STATIC` | Where input A is read from: `STATIC`, `LOCAL` or `SYNCHRONIZED`.            |
|         | Component  | `false`  | The constant (static) or value to read A from.                              |
| B       | Type       | `STATIC` | Where input B is read from.                                                 |
|         | Component  | `false`  | The constant (static) or value to read B from.                              |

## Usage

See [Owner-controlled features]({{ site.baseurl }}/docs/world-utils/guides/owner-feature-gate/) for a complete example that
lets the instance owner disable a feature globally while players can still opt out individually.

`NOT` is handy on its own: invert a boolean once and use the result in several places instead of ticking `Invert` on
every applicator.
