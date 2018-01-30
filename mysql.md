```sql
# 联表查询
SELECT
	a.fcg_name, b.fbiz_name, a.forder_no, b.forder_no
FROM
	j_diplomats_item a
LEFT JOIN j_diplomats_optimize b ON a.forder_no = b.forder_no ORDER BY a.forder_no
```