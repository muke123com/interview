[TOC]

# 安装

## 初始化

```bash
cnpm install -g typescript

tsc init
```

## tsconfig基本配置

```json
{
  "compilerOptions": {
     "lib": [
        "es5",
        "es6"
     ],
     "target": "es6",
     "module": "commonjs",
     "moduleResolution": "node",
     "outDir": "./build",
     "emitDecoratorMetadata": true,
     "experimentalDecorators": true,
     "sourceMap": true,
     "allowJs": true
  },
  "include": [
      "src/**/*"
   ]
}
```



## vscode 中使用ts-node调试配置

```json
{
  "name": "Current TS File",
  "type": "node",
  "request": "launch",
  "args": [
    "${workspaceRoot}/src/index.ts" // 入口文件
  ],
  "runtimeArgs": [
    "--nolazy",
    "-r",
    "ts-node/register"
  ],
  "sourceMaps": true,
  "cwd": "${workspaceRoot}",
  "protocol": "inspector",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

## typeorm



