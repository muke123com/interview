[TOC]

```css
html,body,h1,h2,h3,h4,h5,h6,hr,p,ul,ol,li,span,a,form,input,select,textarea,div,i,dd,dl
```



## 布局

#### flex

```css
.box{	
	display: flex | inline-flex;
    flex-direction: row | row-reverse | column | column-reverse;
    flex-wrap: nowrap | wrap | wrap-reverse;
    flex-flow: <flex-direction> || <flex-wrap>;  
    /* flex-flow是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。*/
    /* justify-content属性定义了项目在主轴上的对齐方式。*/
    justify-content: flex-start | flex-end | center | space-between | space-around;
    align-items: flex-start | flex-end | center | baseline | stretch;
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

以下6个属性设置在项目上。

> - `order`
> - `flex-grow`
> - `flex-shrink`
> - `flex-basis`
> - `flex`
> - `align-self`

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

#### 伪类，伪元素

伪类

```css
:active, :focus, :hover, :link, :visited, :first-child
```

伪元素

```css
::first-letter, ::first-line, ::before, ::after
```

推荐：伪类用一个冒号来表示，而伪元素则用两个冒号来表示

#### 选择符

```css
/* 紧接在另一个元素后的元素，而且二者有相同的父元素 */
div+p {
	background-color:yellow;
}
```

```css
/* 紧接在另一个元素后的所有相邻兄弟元素，而且二者有相同的父元素 */
div~p {
	background-color:yellow;
}
```

