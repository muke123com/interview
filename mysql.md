```sql
# 联表查询
SELECT
	a.fcg_name, b.fbiz_name, a.forder_no, b.forder_no
FROM
	j_diplomats_item a
LEFT JOIN j_diplomats_optimize b ON a.forder_no = b.forder_no ORDER BY a.forder_no
# --------------------------------------------------------------------------------
SELECT forder_no FROM j_diplomats_item
UNION
SELECT forder_no FROM j_diplomats_optimize
ORDER BY fitem_id ASC

# 分组
SELECT fbiz_name, COUNT(*) FROM j_diplomats_optimize
GROUP BY fbiz_name
# --------------------------------------------------------------------------------
SELECT
	fcontactName,
	COUNT(*) AS fcontactNum,
	SUM(fprice) AS fsumPrice,
	AVG(fprice) AS favgPrice
FROM
	t_order_intelligent
GROUP BY
	fcontactName
ORDER BY
	fsumPrice
	
# 查询条件
WHERE fcity LIKE "%北%"	  # 判断null
WHERE fcity IS NULL	  # 判断null
WHERE fcity REGEXP '^s$'  # 正则表达式	
```

```sql
show global variables like 'max_allowed_packet';

# 导入数据库时(2006, 'MySQL server has gone away')
set global max_allowed_packet=1024*1024*16;
```
