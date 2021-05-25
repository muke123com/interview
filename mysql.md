[TOC]

## 数据库安装

```bash
yum install mariadb-server
systemctl start mariadb  # 开启服务
systemctl enable mariadb  # 设置为开机自启动服务
mysql_secure_installation

Enter current password for root (enter for none):  # 输入数据库超级管理员root的密码(注意不是系统root的密码)，第一次进入还没有设置密码则直接回车

Set root password? [Y/n]  # 设置密码，y

New password:  # 新密码
Re-enter new password:  # 再次输入密码

Remove anonymous users? [Y/n]  # 移除匿名用户， y

Disallow root login remotely? [Y/n]  # 拒绝root远程登录，n，不管y/n，都会拒绝root远程登录

Remove test database and access to it? [Y/n]  # 删除test数据库，y：删除。n：不删除，数据库中会有一个test数据库，一般不需要

Reload privilege tables now? [Y/n]  # 重新加载权限表，y。

mysql -u root -p

```



## 数据库优化

**技巧1  比较运算符能用 “=”就不用“<>”**

> “=”增加了索引的使用几率。

**技巧2  明知只有一条查询结果，那请使用 “LIMIT 1”**

> “LIMIT 1”可以避免全表扫描，找到对应结果就不会再继续扫描了。

**技巧3  为列选择合适的数据类型**

> 能用TINYINT就不用SMALLINT，能用SMALLINT就不用INT，道理你懂的，磁盘和内存消耗越小越好嘛。

**技巧4  将大的DELETE，UPDATE or INSERT 查询变成多个小查询**

> 能写一个几十行、几百行的SQL语句是不是显得逼格很高？然而，为了达到更好的性能以及更好的数据控制，你可以将他们变成多个小查询。

**技巧5  使用UNION ALL 代替 UNION，如果结果集允许重复的话**

> 因为 UNION ALL 不去重，效率高于 UNION。

**技巧6  为获得相同结果集的多次执行，请保持SQL语句前后一致**

> 这样做的目的是为了充分利用查询缓冲。

> 比如根据地域和产品id查询产品价格，第一次使用了：

```mysql
SELECT price FROM order WHERE id = 1 and region = 'BEIJING';
```

> 那么第二次同样的查询，请保持以上语句的一致性，比如不要将where语句里面的id和region位置调换顺序。

**技巧7  尽量避免使用 “SELECT \*”**

> 如果不查询表中所有的列，尽量避免使用 SELECT *，因为它会进行全表扫描，不能有效利用索引，增大了数据库服务器的负担，以及它与应用程序客户端之间的网络IO开销。

**技巧8  WHERE 子句里面的列尽量被索引**

> 只是“尽量”哦，并不是说所有的列。因地制宜，根据实际情况进行调整，因为**有时索引太多也会降低性能**。

**技巧9  JOIN 子句里面的列尽量被索引**

> 同样只是“尽量”哦，并不是说所有的列。

**技巧10  ORDER BY 的列尽量被索引**

> ORDER BY的列如果被索引，性能也会更好。

**技巧11  使用 LIMIT 实现分页逻辑**

> 不仅提高了性能，同时减少了不必要的数据库和应用间的网络传输。

**技巧12  使用 EXPLAIN 关键字去查看执行计划**

> EXPLAIN 可以检查索引使用情况以及扫描的行。
>
> ```mysql
> explain select * from test
> ```

```

一、MySQL数据库有几个配置选项可以帮助我们及时捕获低效SQL语句

1，slow_query_log
这个参数设置为ON，可以捕获执行时间超过一定数值的SQL语句。

2，long_query_time
当SQL语句执行时间超过此数值时，就会被记录到日志中，建议设置为1或者更短。

3，slow_query_log_file
记录日志的文件名。

4，log_queries_not_using_indexes
这个参数设置为ON，可以捕获到所有未使用索引的SQL语句，尽管这个SQL语句有可能执行得挺快。
```



## 笔记

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

# Union：对两个结果集进行并集操作，不包括重复行，同时进行默认规则的排序；
# Union All：对两个结果集进行并集操作，包括重复行，不进行排序；

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

# 排序
# 字符串数字排序，使用 +0
SELECT `name`,new_price FROM m_steam WHERE price != "[]" ORDER BY new_price+0 

# 分页查询
# page 页码(0开始)，pageSize 每页数量
select * from 'table' limit page offset page*pageSize;

```

### ON DUPLICATE KEY UPDATE

```mysql
# 如果在INSERT语句末尾指定了ON DUPLICATE KEY UPDATE，并且插入行后会导致在一个UNIQUE索引或PRIMARY KEY中出现重复值，则在出现重复值的行执行UPDATE；如果不会导致唯一值列重复的问题，则插入新行。

# 使用时要创建一个唯一索引 ， 插入或者更新时，以此为标准
CREATE TABLE `news_test` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `new_title` varchar(255) DEFAULT NULL,
  `new_abstr` varchar(255) DEFAULT NULL,
  `new_code` varchar(255) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `new_code_index` (`new_code`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

# 执行
insert into news_test(new_title, new_abstr, new_code, update_time, create_time) values('马刺','湖人',MD5(CONCAT('马刺','湖人')), NOW(), NOW()) on DUPLICATE key Update update_time=now(), create_time=now();

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

## 例题收藏

### 第二高的薪水

```mysql
select (select Salary from Employee limit 1 offset 1) SecondHighestSalary;
```

