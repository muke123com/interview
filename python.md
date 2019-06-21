[TOC]

## 基础

```ini
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple xlwings

## 永久修改
linux下，修改 ~/.pip/pip.conf (没有就创建一个)， 修改 index-url至tuna，内容如下：

 [global]
 index-url = https://pypi.tuna.tsinghua.edu.cn/simple

windows下，直接在user目录中创建一个pip目录，如：C:\Users\xx\pip，新建文件pip.ini，内容如下
 [global]
##  index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```



## 库

```python
import xlwings  # 操纵excel
import pandas as pd   # 数据处理 
import pymysql  # 数据库
import time     # 时间戳
import matplotlib   # 图表


pd.pivot_table # pandas透视表处理数据

# SciKit learn的简称是SKlearn,是一个python库,专门用于机器学习的模块
# Tensorflow
```

