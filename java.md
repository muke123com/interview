## Java

```java
//线程同步
synchronized
public synchronized void tell(){}
```

- 底层数据库（具体数据的存储）——>dao（实现从表中读数据）——>domain(讲表与实体进行关联，进行实体的定义，set,get方法的定义)——>service(逻辑的实现，进行数据关联，方便底层取数据)——>controller（方便为前端提供数据）。