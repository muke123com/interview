#### 正则表达式

- `.` 是任意字符 可以匹配任何单个字符;
- `*` 匹配0或多个正好在它之前的那个字符;
- `?` 匹配0或1个正好在它之前的那个字符;
- `^` 开头，`$` 结尾 

###### 示例
`[abc](123)` => `/\[.*\]\(.*\)/g`

#### replace 替换变量

```js
let key = 'aa';
let text = 'abcaadefaaghiaa'
let t = text.replace(new RegExp(key,'g'),`<i>${key}</i>`)
```

