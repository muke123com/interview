#### 正则表达式

- `.` 是任意字符 可以匹配任何单个字符;
- `*` 匹配0或多个正好在它之前的那个字符;
- `?` 匹配0或1个正好在它之前的那个字符;

###### 示例
`[abc](123)` => `/\[.*\]\(.*\)/g`