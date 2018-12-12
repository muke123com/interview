```mysql
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

## 练习
```mysql
INSERT INTO checking (customer_id, balance1)
VALUES
	(10233277, 11);

UPDATE checking
SET customer_id = 100,
 balance1 = 00
WHERE
	id = 1;

CREATE TABLE tb1 (
	id INT (11) NOT NULL,
	username VARCHAR (20) UNIQUE,
	age TINYINT UNSIGNED,
	sex ENUM ('1', '2') DEFAULT '1',
	salary FLOAT (8, 2) UNSIGNED,
	pid INT,
	PRIMARY KEY (id),
	FOREIGN KEY (pid) REFERENCES tb1_province (id)
);

CREATE TABLE tb1_province (
	id INT (11) NOT NULL auto_increment,
	pname VARCHAR (20) NOT NULL,
	PRIMARY KEY (id)
) DROP TABLE tb1;

INSERT tb1 (
	username,
	PASSWORD,
	age,
	sex,
	salary
)
VALUES
	('BB', MD5(123), 20, 1, 100000);

INSERT tb1
SET username = 'CBA',
 age = 27;

UPDATE tb1
SET username = 'NBA'
WHERE
	id = 1;

UPDATE tb1
SET age = age - 1;

INSERT tb1_province (pname)
VALUES
	('xx省');

SHOW COLUMNS
FROM
	tb1;

#查看表结构
ALTER TABLE tb1 ADD PASSWORD VARCHAR (40) AFTER username;

#修改表结构
ALTER TABLE tb1 MODIFY age TINYINT (3);

#删除表结构
ALTER TABLE tb1 DROP info;

SELECT
	VERSION();

SELECT
	NOW();

SELECT
	*
FROM
	tb1
ORDER BY
	age,
	id DESC;

SELECT
	*, COUNT(1)
FROM
	tb1
GROUP BY
	age
HAVING
	age >= 20;

# 子查询 查询所有价格大于平均价格的商品
SELECT
	*
FROM
	tdb_goods
WHERE
	goods_price >= (
		SELECT
			ROUND(AVG(goods_price), 2)
		FROM
			tdb_goods
	);

# = ANY 或 = SOME 等价于 IN
SELECT
	*
FROM
	tdb_goods
WHERE
	goods_price <= ANY (
		SELECT
			goods_price
		FROM
			tdb_goods
		WHERE
			goods_cate = '超级本'
	);

# ANY SOME ALL  some是any的别名，用法相同
DESC tdb_goods;

INSERT tdb_goods_cates (cate_name)(
	SELECT
		goods_cate
	FROM
		tdb_goods
	GROUP BY
		goods_cate
);

# INSERT...SELECT 
UPDATE tdb_goods AS g
INNER JOIN tdb_goods_cates AS c ON g.goods_cate = c.cate_name
SET goods_cate = cate_id;

-- 多表更新
SELECT
	brand_name
FROM
	tdb_goods
GROUP BY
	brand_name;

CREATE TABLE tdb_goods_brands (
	-- 一步多表更新
	brand_id SMALLINT UNSIGNED PRIMARY KEY auto_increment,
	brand_name VARCHAR (40) NOT NULL
) SELECT
	brand_name
FROM
	tdb_goods
GROUP BY
	brand_name;

UPDATE tdb_goods AS g
INNER JOIN tdb_goods_brands AS b ON g.brand_name = b.brand_name
SET g.brand_name = b.brand_id;

ALTER TABLE tdb_goods CHANGE goods_cate cate_id SMALLINT UNSIGNED NOT NULL,
 CHANGE brand_name brand_id SMALLINT UNSIGNED NOT NULL;

SELECT
	g.goods_id,
	g.goods_name,
	c.cate_name,
	b.brand_name,
	g.goods_price
FROM
	tdb_goods AS g
LEFT JOIN tdb_goods_cates AS c ON g.cate_id = c.cate_id
LEFT JOIN tdb_goods_brands AS b ON g.brand_id = b.brand_id;

SELECT
	goods_id,
	goods_name,
	cate_name,
	brand_name,
	goods_price
FROM
	tdb_goods AS g
INNER JOIN tdb_goods_cates AS c ON g.cate_id = c.cate_id
INNER JOIN tdb_goods_brands AS b ON g.brand_id = b.brand_id;

# 无限级分类
# 一张表进行多表查询
SELECT
	s.type_id,
	s.type_name,
	p.type_name
FROM
	tdb_goods_types AS s
LEFT JOIN tdb_goods_types AS p ON s.parent_id = p.type_id;

SELECT
	p.type_id,
	p.type_name,
	COUNT(s.type_name) child_count
FROM
	tdb_goods_types AS p
LEFT JOIN tdb_goods_types AS s ON p.type_id = s.parent_id
GROUP BY
	p.type_name
ORDER BY
	p.type_id;

# 一张表进行多表删除
SELECT
	goods_id,
	goods_name
FROM
	tdb_goods
GROUP BY
	goods_name
HAVING
	COUNT(goods_name) >= 2;

DELETE t1
FROM
	tdb_goods AS t1
LEFT JOIN (
	SELECT
		goods_id,
		goods_name
	FROM
		tdb_goods
	GROUP BY
		goods_name
	HAVING
		COUNT(goods_name) >= 2
) AS t2 ON t1.goods_name = t2.goods_name
WHERE
	t1.goods_id > t2.goods_id;

SELECT
	CONCAT_WS('-', goods_name, goods_price)
FROM
	tdb_goods;

SELECT
	FORMAT(goods_price, 2)
FROM
	tdb_goods;

SELECT
	FORMAT(AVG(goods_price), 2)
FROM
	tdb_goods;


```


```mysql
show global variables like 'max_allowed_packet';

# 导入数据库时(2006, 'MySQL server has gone away')
set global max_allowed_packet=1024*1024*16;
```
